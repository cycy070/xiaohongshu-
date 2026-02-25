# MirrorSoul Phase 4 - AI 深度解析引擎 System Prompt

已将后端可直接使用的系统提示词落地在：
- `src/llm/systemPrompt.js`
  - `MIRRORSOUL_SYSTEM_PROMPT`: 完整 System Prompt（含 Input Parsing / Few-shot / Safety Constraints）
  - `buildReportPrompt({ jsonPayloadString })`: 拼接系统提示词与用户 JSON 输入

## 设计达成点
1. **去 AI 腔**：明确禁止典型模板话术，并强制第二人称叙事。
2. **四段结构**：Profile / Mirror / Shadow / Prescription 固定模块。
3. **输入解析规则**：给出 0-100 分段语义映射、信度处理、easterEgg 触发规则。
4. **小红书语境词库**：要求按语义选 4-7 个关键词自然嵌入。
5. **长度约束**：总字数 400-600。
6. **安全边界**：禁止病理化、宿命化、冒犯与负面诱导，保持疗愈和成长导向。
7. **Few-shot**：提供 3 个高质量示例，覆盖不同分数结构与行为线索。

## 接入示例
```js
import { buildReportPrompt } from './llm/systemPrompt.js';

const payload = {
  scores: { social_intuition: 84, emotional_resilience: 36 },
  reliability: { isLowReliability: false },
  conflict: { contradictionLabel: '外向型孤独' },
};

const prompt = buildReportPrompt({
  jsonPayloadString: JSON.stringify(payload, null, 2),
});

// 把 prompt 作为 system prompt / 或 system+user 组合发送给 LLM
```
