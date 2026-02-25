import { motion } from 'framer-motion';

export function QuestionCard({
  question,
  index,
  total,
  onSelect,
  progress,
}) {
  const pick = (option) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(8);
    onSelect(option);
  };

  return (
    <motion.section
      key={question.id}
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -36, filter: 'blur(8px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex min-h-[100svh] w-full max-w-xl flex-col px-6 pb-[calc(env(safe-area-inset-bottom)+28px)] pt-20"
    >
      <div className="fixed inset-x-0 top-0 z-20 h-px bg-white/40">
        <motion.div
          className="h-px bg-charcoal/70"
          animate={{ width: `${Math.max(progress, (index / total) * 100)}%` }}
        />
      </div>

      <p className="mb-4 font-sansBody text-xs uppercase tracking-[0.18em] text-charcoal/45">Question {index + 1}</p>
      <h2 className="mb-10 font-serifDisplay text-3xl leading-tight tracking-airy text-charcoal">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => pick(option)}
            className="w-full rounded-2xl border border-white/40 bg-white/20 px-5 py-4 text-left font-sansBody tracking-airy text-charcoal shadow-glass backdrop-blur-luxe"
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}
