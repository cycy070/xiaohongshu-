# MirrorSoul Phase 2 - 核心交互逻辑与计算引擎

## 1) 核心代码
- `src/assessmentEngine.js`
  - `AssessmentEngine`：多维权重累加、0-100 归一化、答题速度信度判定。
  - `calculateResult`：统一入口。
  - `toLLMInputJSONString`：LLM 输入 JSON 字符串组装。
- `src/flowStateMachine.js`
  - `IDLE -> VALIDATING -> TESTING -> ANALYZING -> COMPLETED` 状态机。
  - SessionStorage 进度保存与恢复，结果完成后自动清理缓存。

## 2) 题目配置 JSON 示例
见 `data/sample-questions.json`。

核心字段：
- `questionWeight`：支持权重题/干扰题。
- `factors[]`：多维度影响，含 `dimension/weight/impact`。
- `minReadingTimeMs`：最小阅读时间，用于防作弊。
- `tags`：用于特征提取与“长时间犹豫”彩蛋文案。

## 3) 输出给 AI 的结构示例
```json
{
  "product": "MirrorSoul",
  "sessionId": "sess_xxx",
  "completion": {
    "answeredCount": 12,
    "totalDurationMs": 74200,
    "averagePerQuestionMs": 6183
  },
  "scores": {
    "spiritual_independence": 82.4,
    "emotional_resilience": 41.2,
    "social_intuition": 76.3,
    "aesthetic_sensitivity": 68.0,
    "subconscious_shadow": 57.5
  },
  "reliability": {
    "fastAnswerCount": 1,
    "fastAnswerRatio": 0.083,
    "isLowReliability": false
  },
  "conflict": {
    "topDimensions": [
      { "dimension": "spiritual_independence", "score": 82.4 },
      { "dimension": "social_intuition", "score": 76.3 }
    ],
    "lowestDimension": { "dimension": "emotional_resilience", "score": 41.2 },
    "contradictionLabel": "外向型孤独"
  },
  "keyOptionFeatures": [],
  "visualFeedback": {
    "coolShift": true,
    "backgroundHueShiftDeg": -4,
    "saturationDelta": -0.04,
    "overlayOpacity": 0.11
  },
  "easterEgg": "你在关于「关系边界」的选择上犹豫了很久，这说明你内心深处仍有未被说出的不甘。"
}
```

## 4) 单元测试建议（稳健性）
已在 `tests/assessmentEngine.test.js` 给出三类覆盖：
1. **极端高分**：全选高权重正向选项，确保得分拉升合理。
2. **随机乱选/过快点击**：触发低信度标记。
3. **长时间停留**：触发彩蛋文案，增强情绪击中点。
