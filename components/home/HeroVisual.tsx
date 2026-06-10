import { motion } from 'motion/react';
import { PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Globe } from 'lucide-react';

const pieData = [
  { name: 'Yes', v: 64 },
  { name: 'No', v: 22 },
  { name: 'Maybe', v: 14 },
];
const barData = [38, 62, 45, 78, 54, 70, 88].map((v, i) => ({ i, v }));

const dots: Array<[number, number]> = [
  [12, 38], [16, 32], [20, 36], [24, 30], [28, 34], [32, 40],
  [40, 30], [44, 36], [48, 32], [52, 38], [56, 42],
  [62, 28], [66, 34], [70, 30], [74, 40], [78, 36],
  [82, 44], [86, 48], [22, 52], [30, 58], [38, 54],
  [46, 62], [54, 56], [62, 64], [70, 58], [78, 62],
  [18, 46], [26, 44], [50, 48], [58, 50], [74, 52],
];
const highlights = [[28, 34], [50, 38], [70, 30], [62, 64], [40, 30]];

export function HeroVisual() {
  return (
    <div className="relative aspect-[4/4] w-full">
      {/* World map dot grid */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-gradient-to-br from-white to-[var(--brand-soft)]">
        <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full">
          {dots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="0.6" fill="var(--ink)" opacity="0.18" />
          ))}
          {highlights.map(([x, y], i) => (
            <g key={`h-${i}`}>
              <circle cx={x} cy={y} r="1.4" fill="var(--brand)">
                <animate attributeName="r" values="1.4;2.2;1.4" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
              </circle>
              <circle cx={x} cy={y} r="0.6" fill="var(--accent)" />
            </g>
          ))}
          {highlights.slice(0, 4).map(([x1, y1], i) => {
            const [x2, y2] = highlights[i + 1];
            return (
              <line key={`l-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--brand)" strokeWidth="0.15" strokeDasharray="0.5 0.8" opacity="0.5" />
            );
          })}
        </svg>
      </div>

      {/* Floating dashboard - top right */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="glass absolute right-3 top-3 w-[58%] rounded-2xl p-4 sm:right-6 sm:top-6"
      >
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--ink-soft)]">
          <span>Response trend</span>
          <span className="inline-flex items-center gap-1 text-[var(--accent)]">
            <TrendingUp size={12} /> +24%
          </span>
        </div>
        <div className="mt-2 h-20 w-full">
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={barData}>
              <Bar dataKey="v" fill="var(--brand)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Floating pie - bottom left */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="glass absolute bottom-4 left-3 w-[55%] rounded-2xl p-4 sm:bottom-8 sm:left-6"
      >
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 shrink-0">
            <ResponsiveContainer width={64} height={64}>
              <PieChart>
                <Pie data={pieData} dataKey="v" innerRadius={18} outerRadius={28} paddingAngle={2}>
                  {['var(--brand)', 'var(--accent)', 'var(--amber)'].map((c, i) => (
                    <Cell key={i} fill={c} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="text-xs font-semibold text-[var(--ink-soft)]">Brand recall</div>
            <div className="text-2xl font-bold">64%</div>
          </div>
        </div>
      </motion.div>

      {/* Floating respondent chip */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass absolute right-6 bottom-8 flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold"
      >
        <Users size={14} style={{ color: 'var(--brand)' }} />
        2,481 live
      </motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass absolute left-6 top-1/3 flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold"
      >
        <Globe size={14} style={{ color: 'var(--accent)' }} />
        50+ countries
      </motion.div>
    </div>
  );
}
