# 部署说明

当前项目不是纯静态页，而是一个轻量 Node 服务，因此更适合部署到支持长期运行进程的平台。

## 推荐部署方式

优先推荐：

1. Render
2. Railway
3. 任意支持 Docker 的云主机

不建议直接部署到纯静态平台的原因：

- 项目包含 `/api/redeem/check`
- 项目包含 `/api/redeem/consume`
- 项目包含 `/api/submissions`
- 需要服务端读写 `data/` 目录

## 方式一：Render

仓库根目录已提供 [render.yaml](D:/360MoveData/Users/admin1/Documents/New%20project/render.yaml)。

### 步骤

1. 把项目推到 Git 仓库
2. 在 Render 新建 `Blueprint`
3. 选择该仓库
4. Render 会自动识别 `render.yaml`
5. 部署完成后即可获得公网链接

### 当前配置说明

- 服务类型：`Web Service`
- 运行环境：`Node`
- 启动命令：`npm start`
- 已挂载持久化磁盘到 `/opt/render/project/src/data`

这意味着：

- 兑换码数据不会因为重启而立刻丢失
- 提交记录会保存在挂载的 `data` 目录里

## 方式二：Docker

项目根目录已提供 [Dockerfile](D:/360MoveData/Users/admin1/Documents/New%20project/Dockerfile)。

### 本地构建

```bash
docker build -t yujian-mvp .
```

### 本地运行

```bash
docker run -p 4173:4173 yujian-mvp
```

访问：

[http://127.0.0.1:4173](http://127.0.0.1:4173)

## 上线前检查

上线前建议确认：

1. [data/codes.json](D:/360MoveData/Users/admin1/Documents/New%20project/data/codes.json) 里的演示兑换码是否需要重置
2. [data/submissions.json](D:/360MoveData/Users/admin1/Documents/New%20project/data/submissions.json) 是否需要清空
3. 商品页里的价格、套餐、发货文案是否与你最终店铺一致
4. 结果页文案是否已经是最终公开版本

## 上线后建议

当前版本适合做：

- 演示链接
- MVP 测试
- 小范围商品验证

如果准备正式售卖，建议继续升级：

1. 批量生成兑换码
2. 后台查看使用记录
3. 订单号与兑换码绑定
4. 更正式的数据库存储
5. 分享海报与 PDF 报告
