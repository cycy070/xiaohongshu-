/**
 * MirrorSoul - Phase 2 Logic Layer
 * Core weighted matrix engine + preprocessing for AI report input.
 */

const DEFAULT_DIMENSIONS = [
  'spiritual_independence',
  'emotional_resilience',
  'social_intuition',
  'aesthetic_sensitivity',
  'subconscious_shadow',
];

const CONTRADICTION_LABELS = {
  'social_intuition|emotional_resilience': '外向型孤独',
  'spiritual_independence|relationship_control': '自由与控制拉扯',
  'aesthetic_sensitivity|subconscious_shadow': '美感防御机制',
  'emotional_resilience|subconscious_shadow': '理性外壳下的暗涌',
};

function signedImpact(impact) {
  if (impact === 'negative') return -1;
  if (impact === 'neutral') return 0;
  return 1;
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

export class AssessmentEngine {
  constructor(config = {}) {
    this.dimensions = config.dimensions || DEFAULT_DIMENSIONS;
    this.minReliabilityReadingMs = config.minReliabilityReadingMs || 1800;
    this.lowReliabilityFastAnswerRatio = config.lowReliabilityFastAnswerRatio || 0.35;
    this.longHesitationMs = config.longHesitationMs || 12000;
    this.coolShiftTrigger = config.coolShiftTrigger || 2;
    this.reset();
  }

  reset() {
    this.answers = [];
    this.dimensionRawScores = Object.fromEntries(this.dimensions.map((d) => [d, 0]));
    this.dimensionAbsTotals = Object.fromEntries(this.dimensions.map((d) => [d, 0]));
    this.consecutiveNegativeCount = 0;
    this.fastAnswerCount = 0;
    this.totalDurationMs = 0;
    this.longestHesitation = null;
    this.keyOptionFeatures = [];
  }

  addAnswer({ questionId, questionText, selectedOption, responseTimeMs }) {
    const questionWeight = selectedOption.questionWeight ?? 1;
    const expectedMinMs = selectedOption.minReadingTimeMs ?? this.minReliabilityReadingMs;

    if (responseTimeMs < expectedMinMs) {
      this.fastAnswerCount += 1;
    }

    this.totalDurationMs += responseTimeMs;

    if (!this.longestHesitation || responseTimeMs > this.longestHesitation.responseTimeMs) {
      this.longestHesitation = {
        questionId,
        questionText,
        responseTimeMs,
        tags: selectedOption.tags || [],
      };
    }

    let hasNegativeTone = false;

    for (const factor of selectedOption.factors || []) {
      if (!this.dimensionRawScores.hasOwnProperty(factor.dimension)) continue;

      const sign = signedImpact(factor.impact);
      const contribution = sign * (factor.weight || 0) * questionWeight;

      this.dimensionRawScores[factor.dimension] += contribution;
      this.dimensionAbsTotals[factor.dimension] += Math.abs((factor.weight || 0) * questionWeight);

      if (sign < 0) hasNegativeTone = true;
    }

    this.consecutiveNegativeCount = hasNegativeTone ? this.consecutiveNegativeCount + 1 : 0;

    this.keyOptionFeatures.push({
      questionId,
      optionId: selectedOption.id,
      optionLabel: selectedOption.label,
      tags: selectedOption.tags || [],
      responseTimeMs,
      emotionalTone: selectedOption.emotionalTone || 'neutral',
    });

    this.answers.push({ questionId, questionText, responseTimeMs, selectedOption });

    return {
      coolShift: this.getVisualFeedback().coolShift,
      consecutiveNegativeCount: this.consecutiveNegativeCount,
    };
  }

  getVisualFeedback() {
    const intensity = clamp(
      (this.consecutiveNegativeCount - this.coolShiftTrigger + 1) / 3,
      0,
      1,
    );

    return {
      coolShift: intensity > 0,
      backgroundHueShiftDeg: -8 * intensity,
      saturationDelta: -0.08 * intensity,
      overlayOpacity: 0.06 + 0.1 * intensity,
    };
  }

  getNormalizedScores() {
    const normalized = {};

    for (const d of this.dimensions) {
      const raw = this.dimensionRawScores[d];
      const absTotal = this.dimensionAbsTotals[d];

      if (absTotal === 0) {
        normalized[d] = 50;
        continue;
      }

      const min = -absTotal;
      const max = absTotal;
      normalized[d] = Number((((raw - min) / (max - min)) * 100).toFixed(2));
    }

    return normalized;
  }

  getReliability() {
    const total = this.answers.length || 1;
    const fastRatio = this.fastAnswerCount / total;
    return {
      fastAnswerCount: this.fastAnswerCount,
      fastAnswerRatio: Number(fastRatio.toFixed(3)),
      isLowReliability: fastRatio >= this.lowReliabilityFastAnswerRatio,
    };
  }

  getCoreConflict(scores) {
    const entries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topA = entries[0];
    const topB = entries[1];
    const bottom = entries[entries.length - 1];

    const pairKey = [topA[0], bottom[0]].sort().join('|');
    const pairKey2 = [topB[0], bottom[0]].sort().join('|');

    const label =
      CONTRADICTION_LABELS[pairKey] ||
      CONTRADICTION_LABELS[pairKey2] ||
      `${topA[0]} 高驱动 × ${bottom[0]} 低能量`;

    return {
      topDimensions: [topA, topB].map(([dimension, score]) => ({ dimension, score })),
      lowestDimension: { dimension: bottom[0], score: bottom[1] },
      contradictionLabel: label,
    };
  }

  buildAiPayload({ userId = null, sessionId = null } = {}) {
    const scores = this.getNormalizedScores();
    const reliability = this.getReliability();
    const conflict = this.getCoreConflict(scores);

    const easterEgg =
      this.longestHesitation && this.longestHesitation.responseTimeMs >= this.longHesitationMs
        ? `你在关于「${(this.longestHesitation.tags && this.longestHesitation.tags[0]) || this.longestHesitation.questionText || '某个议题'}」的选择上犹豫了很久，这说明你内心深处仍有未被说出的不甘。`
        : null;

    return {
      product: 'MirrorSoul',
      sessionId,
      userId,
      completion: {
        answeredCount: this.answers.length,
        totalDurationMs: this.totalDurationMs,
        averagePerQuestionMs: this.answers.length
          ? Math.round(this.totalDurationMs / this.answers.length)
          : 0,
      },
      scores,
      reliability,
      conflict,
      keyOptionFeatures: this.keyOptionFeatures.slice(-8),
      visualFeedback: this.getVisualFeedback(),
      easterEgg,
      generatedAt: new Date().toISOString(),
    };
  }
}

export function calculateResult(answers, config = {}, metadata = {}) {
  const engine = new AssessmentEngine(config);
  for (const answer of answers) {
    engine.addAnswer(answer);
  }
  return engine.buildAiPayload(metadata);
}

export function toLLMInputJSONString(payload) {
  return JSON.stringify(payload, null, 2);
}
