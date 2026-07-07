// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      if (fs.statSync(dirFile).isDirectory()) {
        filelist = walkSync(dirFile, filelist);
      } else {
        if (dirFile.endsWith('.tsx') || dirFile.endsWith('.css')) {
          filelist.push(dirFile);
        }
      }
    } catch (err) { }
  });
  return filelist;
}

const files = [...walkSync('app'), ...walkSync('components')];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  
  // Replace the inline style in IndustriesMarquee.tsx
  content = content.replace(/style=\{\s*item\.outlined\s*\?\s*\{\s*WebkitTextStroke:\s*"1\.67px black"\s*\}\s*:\s*\{\}\s*\}/g, '');
  content = content.replace(/className=\{\`text-5xl(.*?)lowercase text-nowrap \$\{\s*item\.outlined\s*\?\s*"text-transparent"\s*:\s*"text-brand dark:text-zinc-50"\s*\}\`\}/g, (match, p1) => {
    return 'className={`text-5xl' + p1 + 'lowercase text-nowrap ${item.outlined ? "font-fenwick text-[#111111] dark:text-white" : "text-brand dark:text-zinc-50"}`}';
  });

  // Replace text-transparent [-webkit-text-stroke:1.2px_#111111] font-black
  content = content.replace(/text-transparent\s+\[-webkit-text-stroke:[^\]]+\]\s*(?:sm:\[-webkit-text-stroke:[^\]]+\]\s*)?(?:font-black\s*)?/g, (match) => {
    let colorMatch = match.match(/_(#[0-9a-fA-F]{3,6})/);
    let color = colorMatch ? colorMatch[1] : '#111111';
    return `font-fenwick text-[${color}] `;
  });
  
  // Clean up DeliveringStatement.tsx hover
  content = content.replace(/hover:\[-webkit-text-stroke-color:([^\]]+)\]/g, 'hover:text-[$1]');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated', f);
  }
});
