# Study Buddy

完整的本地英语学习网站。原生 HTML / CSS / JavaScript + Node.js 24，无第三方运行依赖。未修改 D:/study buddy/index.html，未发布外网。

## 启动

在此目录打开终端：

```powershell
npm start
```

打开 http://127.0.0.1:3000 。保持终端运行，Ctrl+C 停止。需要 Node.js 22 或更新版本。也可双击 start.cmd。不要直接双击 public/index.html（ES module 与 AI 后端需要 HTTP）。

## 已实现

- 响应式五页导航、概览、每日词汇和 10 次每日练习目标。
- 18 个本地词汇，3 个主题，搜索、翻卡、浏览器朗读、掌握状态、筛选。
- 简单间隔复习：再练 10 分钟；连续掌握后 1/3/7/14 天。不宣称科学个性化算法。
- 12 道本地语法题，即时正误与解析、错题巩固。
- 当前浏览器 localStorage 保存学习记录；最近 7 天统计、连续学习、JSON 导出和重置。没有账号或云同步。
- 真实服务端 AI 转发：输入限制、超时、错误处理、密钥不出现在前端；未配置时不模拟回答。
- 每条 AI 提问独立，聊天内容仅保留在页面内存，不持久化。

## 模型接入

先复制 `.env.example` 为 `.env`，编辑后重启服务器。不要提交 `.env`。

### Ollama 本地开源模型

先从 https://ollama.com 安装 Ollama。下载模型需要网络、磁盘和足够内存，本项目没有执行下载。官方模型库提供 DeepSeek-R1 及其蒸馏模型；1.5b 下载约 1.1GB，实际运行内存高于文件大小，小模型质量有限。

```powershell
ollama pull deepseek-r1:1.5b
ollama serve
```

如果桌面 Ollama 已运行，不需要重复 serve。然后设置：

```dotenv
AI_BASE_URL=http://127.0.0.1:11434/v1
AI_MODEL=deepseek-r1:1.5b
AI_API_KEY=
```

### DeepSeek 在线接口（可选，有费用）

使用自己的平台密钥，写入本地 `.env`：

```dotenv
AI_BASE_URL=https://api.deepseek.com
AI_MODEL=deepseek-flash
AI_API_KEY=你的密钥
```

2026-10-28 查阅官方文档时，快速入门列出 deepseek-flash 和 deepseek-v4-pro。模型名称可能更新，应以官方模型列表为准，不沿用过期名称。本站支持可配置 OpenAI 兼容 `/chat/completions`，也可以指向其他兼容服务。只有实际返回回答才算连通；配置状态不是健康检查。

- DeepSeek 官方快速入门：https://api-docs.deepseek.com/
- 模型列表接口：https://api-docs.deepseek.com/api/list-models/
- Ollama 兼容接口：https://docs.ollama.com/api/openai-compatibility
- 开源模型库：https://ollama.com/library/deepseek-r1

当前没有配置真实模型、没有下载权重、没有验证真实推理。在线提问会发送给配置的服务商。本地小模型推理可能超过 90 秒；当前上限为 1800 输出 tokens，推理模型可能耗尽预算而无正文，页面会提示错误，可在 server.js 调整或换模型。

## 文件结构

```text
public/index.html  页面骨架、侧边栏
public/style.css   全站视觉、响应式布局
public/data.js     人工编写的词汇与语法数据
public/app.js      交互、路由、复习、存储、AI 界面
server.js          静态文件服务与 AI 代理
server.test.js     后端集成测试（模拟上游，不是真实 AI）
.env.example      服务端配置示例
start.cmd         Windows 启动入口
```

## 验证

`npm test` 检查无配置降级、静态资源、敏感文件不可访问、输入校验及模拟上游协议。浏览器实际检查翻卡、掌握保存、刷新保留、语法错误解析、错题纠正、统计和 AI 未配置提示。模拟上游测试不代表真实模型连通。

本地监听 127.0.0.1，有 Host/Origin 检查，不是面向互联网的多用户生产服务。数据导出用于留存，本版不含导入功能。浏览器语音质量取决于系统已装语音。
