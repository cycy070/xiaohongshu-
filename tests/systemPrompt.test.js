import test from 'node:test';
import assert from 'node:assert/strict';
import { MIRRORSOUL_SYSTEM_PROMPT, buildReportPrompt } from '../src/llm/systemPrompt.js';

test('system prompt contains required output modules', () => {
  assert.ok(MIRRORSOUL_SYSTEM_PROMPT.includes('【灵魂侧写 The Profile】'));
  assert.ok(MIRRORSOUL_SYSTEM_PROMPT.includes('【镜像解析 The Mirror】'));
  assert.ok(MIRRORSOUL_SYSTEM_PROMPT.includes('【防线与阴影 The Shadow】'));
  assert.ok(MIRRORSOUL_SYSTEM_PROMPT.includes('【光影处方 The Prescription】'));
});

test('system prompt includes xiaohongshu keyword matrix and safety constraints', () => {
  assert.ok(MIRRORSOUL_SYSTEM_PROMPT.includes('内核、能量、磁场、松弛感、精神内耗'));
  assert.ok(MIRRORSOUL_SYSTEM_PROMPT.includes('禁止诊断、贴病理标签、宿命论'));
  assert.ok(MIRRORSOUL_SYSTEM_PROMPT.includes('400-600'));
});

test('buildReportPrompt appends json payload text', () => {
  const payload = JSON.stringify({ scores: { social_intuition: 88 } }, null, 2);
  const text = buildReportPrompt({ jsonPayloadString: payload });

  assert.ok(text.includes('用户输入 JSON：'));
  assert.ok(text.includes('social_intuition'));
  assert.ok(text.includes('88'));
});
