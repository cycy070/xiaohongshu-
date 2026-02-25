import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateResult } from '../src/assessmentEngine.js';

function makeAnswer(id, option) {
  return {
    questionId: id,
    questionText: `Question ${id}`,
    responseTimeMs: option.responseTimeMs ?? 2400,
    selectedOption: option,
  };
}

test('extreme case: all positive high-weight options push top dimensions high', () => {
  const option = {
    id: 'A',
    label: 'A',
    questionWeight: 1.5,
    minReadingTimeMs: 2000,
    factors: [
      { dimension: 'spiritual_independence', weight: 0.8, impact: 'positive' },
      { dimension: 'emotional_resilience', weight: 0.7, impact: 'positive' },
    ],
  };

  const answers = [makeAnswer('q1', option), makeAnswer('q2', option), makeAnswer('q3', option)];
  const result = calculateResult(answers);

  assert.ok(result.scores.spiritual_independence > 90);
  assert.ok(result.scores.emotional_resilience > 90);
  assert.equal(result.reliability.isLowReliability, false);
});

test('random fast-clicking should be marked low reliability', () => {
  const answers = [
    makeAnswer('q1', {
      id: 'o1',
      label: 'o1',
      minReadingTimeMs: 2200,
      responseTimeMs: 400,
      factors: [{ dimension: 'social_intuition', weight: 0.3, impact: 'positive' }],
    }),
    makeAnswer('q2', {
      id: 'o2',
      label: 'o2',
      minReadingTimeMs: 2200,
      responseTimeMs: 500,
      factors: [{ dimension: 'subconscious_shadow', weight: 0.5, impact: 'negative' }],
    }),
    makeAnswer('q3', {
      id: 'o3',
      label: 'o3',
      minReadingTimeMs: 2200,
      responseTimeMs: 450,
      factors: [{ dimension: 'aesthetic_sensitivity', weight: 0.4, impact: 'positive' }],
    }),
  ];

  const result = calculateResult(answers);
  assert.equal(result.reliability.isLowReliability, true);
  assert.ok(result.reliability.fastAnswerRatio >= 0.35);
});

test('long hesitation triggers easter egg sentence', () => {
  const answers = [
    makeAnswer('q1', {
      id: 'o1',
      label: 'o1',
      minReadingTimeMs: 2200,
      responseTimeMs: 15000,
      tags: ['关系边界'],
      factors: [{ dimension: 'social_intuition', weight: 0.4, impact: 'positive' }],
    }),
  ];

  const result = calculateResult(answers);
  assert.ok(result.easterEgg?.includes('犹豫了很久'));
  assert.ok(result.easterEgg?.includes('关系边界'));
});
