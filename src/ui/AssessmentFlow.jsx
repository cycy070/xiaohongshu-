import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { LandingPage } from './LandingPage.jsx';
import { LoadingAnimation } from './LoadingAnimation.jsx';
import { QuestionCard } from './QuestionCard.jsx';

/**
 * Minimal flow sample to demonstrate AnimatePresence transitions.
 */
export function AssessmentFlow({ questions = [], onFinish }) {
  const [stage, setStage] = useState('landing');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[index];
  const progress = useMemo(() => ((index + 1) / Math.max(questions.length, 1)) * 100, [index, questions.length]);

  const validateCode = async (code) => {
    await new Promise((r) => setTimeout(r, 700));
    const ok = code.length >= 6;
    if (ok) setStage('testing');
    return ok;
  };

  const selectOption = (option) => {
    const nextAnswers = [...answers, { questionId: currentQuestion.id, selectedOption: option }];
    setAnswers(nextAnswers);
    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }
    setStage('loading');
    setTimeout(() => {
      setStage('completed');
      onFinish?.(nextAnswers);
    }, 3000);
  };

  return (
    <AnimatePresence mode="wait">
      {stage === 'landing' && <LandingPage key="landing" onValidateCode={validateCode} />}

      {stage === 'testing' && currentQuestion && (
        <motion.div key={`q-${currentQuestion.id}`} className="min-h-[100svh] bg-[#ECE7DF]">
          <QuestionCard
            question={currentQuestion}
            index={index}
            total={questions.length}
            progress={progress}
            onSelect={selectOption}
          />
        </motion.div>
      )}

      {stage === 'loading' && <LoadingAnimation key="loading" />}

      {stage === 'completed' && (
        <motion.main
          key="done"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex min-h-[100svh] items-center justify-center bg-[#ECE7DF] text-charcoal"
        >
          报告已生成
        </motion.main>
      )}
    </AnimatePresence>
  );
}
