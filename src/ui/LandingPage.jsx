import { useState } from 'react';
import { motion } from 'framer-motion';

export function LandingPage({ onValidateCode }) {
  const [code, setCode] = useState('');
  const [focused, setFocused] = useState(false);
  const [status, setStatus] = useState('idle');

  const submit = async () => {
    if (!code.trim()) return;
    setStatus('validating');
    const ok = await onValidateCode(code.trim());
    setStatus(ok ? 'success' : 'error');
  };

  return (
    <motion.main
      initial={{ opacity: 0, scale: 1.02 }}
      animate={status === 'success' ? { opacity: 0, scale: 0.9, z: -100 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[100svh] overflow-hidden text-charcoal breathing-gradient noise-paper"
    >
      <section className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-xl flex-col items-center justify-center px-8">
        <h1 className="mb-10 text-center font-serifDisplay text-4xl tracking-airy text-charcoal/90">
          镜像灵魂
        </h1>

        <div className="relative w-full">
          {focused && (
            <span className="pointer-events-none absolute inset-0 rounded-2xl border border-charcoal/25" style={{ animation: 'ripplePulse 1.2s ease-out infinite' }} />
          )}
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="输入你的 Access Code"
            className="w-full rounded-2xl border border-charcoal/20 bg-linen/50 px-5 py-4 text-center font-sansBody tracking-airy text-charcoal placeholder:text-charcoal/45 backdrop-blur-luxe outline-none"
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={submit}
          disabled={status === 'validating'}
          className="mt-5 w-full rounded-2xl border border-white/45 bg-white/35 py-3 font-sansBody tracking-airy text-charcoal backdrop-blur-luxe disabled:opacity-60"
        >
          {status === 'validating' ? '正在校验...' : '开启灵魂镜像'}
        </motion.button>

        {status === 'error' && (
          <p className="mt-4 text-sm tracking-airy text-charcoal/65">激活码无效或已失效，请重试。</p>
        )}
      </section>
    </motion.main>
  );
}
