import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  '正在剥离社交伪装...',
  '正在检索潜意识深处...',
  '正在拟合情绪颗粒模型...',
  '正在重组你的灵魂关键词...',
];

export function LoadingAnimation() {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setLineIndex((prev) => (prev + 1) % LINES.length), 1800);
    return () => clearInterval(t);
  }, []);

  const gradients = useMemo(
    () => [
      'radial-gradient(circle at 30% 30%, rgba(229,225,218,0.85), rgba(179,163,148,0.15) 45%, transparent 70%)',
      'radial-gradient(circle at 65% 55%, rgba(179,163,148,0.6), rgba(74,73,71,0.1) 50%, transparent 80%)',
      'radial-gradient(circle at 55% 25%, rgba(74,73,71,0.32), transparent 60%)',
    ],
    [],
  );

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#ECE7DF] px-6 pb-[calc(env(safe-area-inset-bottom)+18px)]">
      <div className="relative h-48 w-48">
        {gradients.map((background, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full mix-blend-multiply"
            style={{ background }}
            animate={{ rotate: 360, scale: [0.92, 1.06, 0.95] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <div className="absolute inset-[18%] rounded-full border border-white/40" style={{ animation: 'nebulaSpin 6s linear infinite' }} />
      </div>

      <motion.p
        key={lineIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="absolute bottom-[calc(env(safe-area-inset-bottom)+40px)] text-sm tracking-[0.12em] text-charcoal/70"
      >
        {LINES[lineIndex]}
      </motion.p>
    </main>
  );
}
