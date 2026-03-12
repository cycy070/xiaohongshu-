# 愈见 · 情感复原力测试

这是一个面向小红书女性用户审美的 MVP 产品，当前已经包含：

- 品牌化商品页
- 20 道情感复原力测试
- 五维雷达图与阶段结果报告
- 用户评价与套餐展示区
- 兑换码输入入口
- 本地 Node 服务与兑换码校验接口
- 结果提交记录

## 本地运行

在项目目录执行：

```bash
npm run dev
```

启动后访问：

[http://127.0.0.1:4173](http://127.0.0.1:4173)

## 演示兑换码

可用于本地接口联调的兑换码在 [data/codes.json](D:/360MoveData/Users/admin1/Documents/New%20project/data/codes.json)：

- `YJ-2026-8888`
- `YJ-2026-9999`

## 批量生成兑换码

默认生成 10 个完整版兑换码：

```bash
npm run codes:generate
```

自定义数量、套餐和次数：

```bash
node scripts/generate-codes.js --count=50 --plan=完整版 --uses=5
```

## 当前后端能力

### 兑换码校验

- `GET /api/redeem/check?code=兑换码`

### 兑换码消耗

- `POST /api/redeem/consume`

请求体：

```json
{
  "code": "YJ-2026-8888"
}
```

### 结果提交

- `POST /api/submissions`

请求体示例：

```json
{
  "code": "YJ-2026-8888",
  "totalScore": 62,
  "stage": "觉察启动期",
  "scores": {
    "recoverySpeed": 12,
    "boundaryClarity": 11
  }
}
```

## 数据文件

- 兑换码库存：[data/codes.json](D:/360MoveData/Users/admin1/Documents/New%20project/data/codes.json)
- 结果记录：[data/submissions.json](D:/360MoveData/Users/admin1/Documents/New%20project/data/submissions.json)

## 现在适合做什么

当前版本已经适合：

- 本地演示产品链路
- 截图给设计或运营确认方向
- 测试商品页结构和交付方式
- 继续接入云端部署

## 下一步建议

建议优先做这三项：

1. 把兑换码接口迁移到真实线上服务
2. 部署到公网域名，生成真正的演示链接
3. 输出小红书商品详情图和发货自动回复文案
