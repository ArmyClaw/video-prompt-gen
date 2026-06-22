# 🎬 Video Prompt Gen — AI视频提示词生成器

> 专业级AI视频提示词编排工具。相机运动、电影风格、镜头语言、分镜序列、多平台导出，选完一键生成。

## 在线地址

**https://army-yorozuya.art/study/video-prompt/**

> ✅ 完整可交互应用，打开即用，无需注册。

## 功能

### 提示词生成
- 📹 **相机运动** — 推、拉、摇、移、跟、升、降、环绕、手持、FPV
- 🎯 **镜头角度** — 平角、仰角、俯角、鸟瞰、荷兰角、过肩
- 📷 **景别** — 远景、全景、中景、近景、特写、大特写
- ⚡ **运动速度** — 缓慢、中速、快速、变速、定格
- 🎬 **预设模板** — 快速套用经典电影风格

### 分镜编辑器
- 多镜头时间线
- 添加/删除镜头
- 分镜序列编排
- 镜头转场设计

### 多平台导出
- **Sora 2** (OpenAI)
- **Kling 3.0** (快手)
- **Runway Gen-4**
- **Google Veo 3.1**
- **Pika Labs 1.0**
- **通用格式**

## 完成进度

| 阶段 | 内容 | 状态 |
|---|---|---|
| Phase 1 | 核心参数体系（相机/角度/景别/速度） | ✅ 完成 |
| Phase 2 | 电影风格系统（流派/灯光/调色/胶片） | ✅ 完成 |
| Phase 3 | 分镜序列（时间线/转场/模板） | ✅ 完成 |
| Phase 4 | 平台适配（5个平台格式导出） | ✅ 完成 |

## 源码结构

```
video-prompt-gen/
├── index.html          # 入口页面
├── app.js              # 主逻辑（参数选择、生成、分镜）
├── data.js             # 参数数据库 + 平台映射
├── styles.css          # 主样式
├── storyboard.css     # 分镜编辑器样式
├── transitions.js      # 转场效果
├── test.html           # 测试页面
└── test-*.js           # 各功能模块测试
```

## 技术栈

- **纯前端**: HTML + CSS + JavaScript
- **无需后端**: 所有生成逻辑在客户端完成
- **无需注册**: 打开即用
- **部署**: 静态页面，CDN 友好

## 本地开发

```bash
cd ~/projects/video-prompt-gen

# 用任意静态服务器打开
python3 -m http.server 8080
# 打开 http://localhost:8080

# 运行测试
node test-simple.js
node test-platform-export.js
node test-multishot.js
```

## 使用方法

1. 打开 https://army-yorozuya.art/study/video-prompt/
2. 选择相机运动、镜头角度、景别、速度等参数
3. 输入主体描述和额外细节
4. 选择目标平台（Sora/Kling/Runway 等）
5. 点击 **GENERATE** 生成提示词
6. 点击 **COPY** 复制到剪贴板
7. 粘贴到对应平台的视频生成工具中使用

🌱 2026-06-17 开工
