import { useState, ImgHTMLAttributes } from 'react';

const FALLBACK =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23E6E8F2"/><text x="50%25" y="50%25" font-family="sans-serif" font-size="16" fill="%238A91B4" text-anchor="middle" dominant-baseline="middle">Image</text></svg>';

export function SafeImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [err, setErr] = useState(false);
  const { src, alt, ...rest } = props;
  return <img {...rest} src={err || !src ? FALLBACK : (src as string)} alt={alt ?? ''} onError={() => setErr(true)} />;
}
