# 平台参数映射设计文档

## 概述
为video-prompt-gen项目建立完整的AI视频生成平台参数映射系统，支持Sora 2、Kling 3.0、Runway Gen-4、Google Veo 3.1等主流平台的提示词格式转换和参数限制适配。

## 设计目标
- 建立平台特定的参数映射规则
- 支持自动化的提示词格式转换
- 处理不同平台的参数限制
- 提供平台优化的生成策略
- 确保跨平台兼容性和最佳效果

## 平台特性分析

### 1. Sora 2 (OpenAI)
**核心特点：**
- 视频长度：免费用户15秒，Pro用户25秒
- 支持同步音频自动生成
- 新增Sora Extensions：无缝扩展现有视频
- 支持Image to Video with People
- 新风格：Handheld、Retro、Festive、Golden

**参数限制：**
- 最大提示词长度：约400 tokens
- 复杂场景理解能力强
- 物理引擎优秀，适合自然场景
- 人物一致性相对较弱

**提示词语法：**
```
主体描述 + 风格 + 镜头语言 + 构图 + 灯光 + 色彩 + 运动效果
```

### 2. Kling 3.0
**核心特点：**
- 多镜头生成：支持完整故事序列
- 原生4K (3840x2160) at 60fps
- 集成音频：运动和声音同步生成
- 角色一致性：保持整个视频中角色外观
- 场景编辑：明确的场景结构，3-15秒/场景

**参数限制：**
- 按秒计费：$0.08/秒（标准），$0.15/秒（高质量）
- 需要精确的起始和结束帧控制
- OmniEdit：文本驱动的视频编辑

**提示词语法：**
```
场景描述 + 镜头参数 + 时间控制 + 运动描述 + 质量要求
```

### 3. Runway Gen-4
**核心特点：**
- 最快渲染速度：接近实时
- 最佳主体稳定性：角色不漂移
- 自然平滑的相机运动
- 专业电影级构图
- 节点工作流：链式AI模型组合

**参数限制：**
- 月费$15+
- 约10秒视频长度
- 支持4K（ upscale）
- 需要Act-One进行多镜头叙事

**提示词语法：**
```
视觉描述 + 运动控制 + 参考图像 + 风格化指令 + 编辑指令
```

### 4. Google Veo 3.1
**核心特点：**
- 原生垂直视频 (9:16)：针对YouTube Shorts等
- 强大的视觉一致性
- 原生音频支持
- SynthID水印自动嵌入
- Google生态集成

**参数限制：**
- 约8秒视频长度
- 1080p/4K输出
- 通过Gemini API访问
- 免费 tier 通过Gemini提供

**提示词语法：**
```
主体描述 + 场景理解 + 风格指导 + 音频描述 + 平台适配
```

## 参数映射系统

### 1. 通用参数映射表

| 参数类型 | 通用值 | Sora 2 | Kling 3.0 | Runway Gen-4 | Veo 3.1 |
|---------|--------|---------|-----------|--------------|---------|
| 视频长度 | 灵活 | 15-25s | 3-15s/场景 | ~10s | ~8s |
| 分辨率 | 1080p | HD | 4K/60fps | HD-4K | 1080p/4K |
| 宽高比 | 16:9 | 16:9 | 灵活 | 16:9 | 9:16(垂直) |
| 音频支持 | 是 | 原生 | 原生 | 需插件 | 原生 |
| 多镜头 | 支持 | 弱 | 强 | 极强 | 中等 |
| 价格 | 按平台 | $20/mo | $0.08/s | $15+/m | 免费 |

### 2. 相机参数映射

```javascript
const cameraParamsMapping = {
    cameraMovement: {
        generic: ["Static", "Push", "Pull", "Pan", "Tilt", "Dolly", "Zoom"],
        sorafy: {
            "Static": "static camera",
            "Push": "push in", "Pull": "pull out", 
            "Pan": "pan horizontally", "Tilt": "tilt vertically",
            "Dolly": "dolly movement", "Zoom": "zoom effect"
        },
        klingify: {
            "Static": "camera static",
            "Push": "camera push movement",
            "Pull": "camera pull movement", 
            "Pan": "camera pan",
            "Tilt": "camera tilt",
            "Dolly": "smooth dolly tracking",
            "Zoom": "zoom transition"
        },
        runwayify: {
            "Static": "static shot",
            "Push": "push shot",
            "Pull": "pull shot", 
            "Pan": "pan shot",
            "Tilt": "tilt shot",
            "Dolly": "dolly shot",
            "Zoom": "zoom shot"
        },
        veoify: {
            "Static": "stationary camera",
            "Push": "camera push", "Pull": "camera pull",
            "Pan": "camera pan", "Tilt": "camera tilt", 
            "Dolly": "smooth dolly",
            "Zoom": "camera zoom"
        }
    },
    
    shotSize: {
        generic: ["Extreme Wide", "Wide", "Medium", "Close Up", "Extreme Close"],
        sorafy: {
            "Extreme Wide": "extreme wide shot, establishing shot",
            "Wide": "wide shot", "Medium": "medium shot",
            "Close Up": "close up", "Extreme Close": "extreme close up"
        },
        klingify: {
            "Extreme Wide": "extreme wide establishing shot",
            "Wide": "wide shot", "Medium": "medium shot", 
            "Close Up": "close up shot",
            "Extreme Close": "extreme close up detail"
        },
        runwayify: {
            "Extreme Wide": "extreme wide",
            "Wide": "wide", "Medium": "medium",
            "Close Up": "close up", "Extreme Close": "extreme close"
        },
        veoify: {
            "Extreme Wide": "wide establishing",
            "Wide": "wide shot", "Medium": "medium shot",
            "Close Up": "close up", "Extreme Close": "extreme close"
        }
    }
};
```

### 3. 风格参数映射

```javascript
const styleParamsMapping = {
    filmGenre: {
        generic: ["Sci-Fi", "Noir", "Documentary", "Anime", "Wuxia", "Horror", "Romance", "Action"],
        sorafy: {
            "Sci-Fi": "futuristic, sci-fi aesthetic",
            "Noir": "noir style, dark and mysterious",
            "Documentary": "documentary style, realistic",
            "Anime": "anime style, animated",
            "Wuxia": "wuxia style, martial arts",
            "Horror": "horror genre, scary",
            "Romance": "romantic style, tender",
            "Action": "action genre, exciting"
        },
        klingify: {
            "Sci-Fi": "science fiction genre",
            "Noir": "black film genre", 
            "Documentary": "documentary style",
            "Anime": "anime aesthetic",
            "Wuxia": "martial arts film",
            "Horror": "horror movie genre",
            "Romance": "romantic film style",
            "Action": "action movie genre"
        },
        runwayify: {
            "Sci-Fi": "sci-fi cinematic",
            "Noir": "noir film",
            "Documentary": "documentary",
            "Anime": "anime cinematic",
            "Wuxia": "wuxia film",
            "Horror": "horror film", 
            "Romance": "romance film",
            "Action": "action film"
        },
        veoify: {
            "Sci-Fi": "sci-fi",
            "Noir": "noir style",
            "Documentary": "documentary",
            "Anime": "anime",
            "Wuxia": "wuxia", 
            "Horror": "horror",
            "Romance": "romance",
            "Action": "action"
        }
    },
    
    lightingStyle: {
        generic: ["Natural", "Neon", "Dramatic", "Soft", "Backlight", "Studio", "Candle", "Fire"],
        sorafy: {
            "Natural": "natural lighting, realistic",
            "Neon": "neon lighting, urban",
            "Dramatic": "dramatic lighting, high contrast",
            "Soft": "soft lighting, gentle",
            "Backlight": "backlighting, rim light",
            "Studio": "studio lighting, professional",
            "Candle": "candle lighting, warm intimate",
            "Fire": "fire lighting, warm glowing"
        },
        klingify: {
            "Natural": "natural lighting",
            "Neon": "neon city lights", 
            "Dramatic": "dramatic lighting",
            "Soft": "soft gentle lighting",
            "Backlight": "backlight illumination",
            "Studio": "studio lighting setup",
            "Candle": "candle light flickering",
            "Fire": "fire light dancing"
        },
        runwayify: {
            "Natural": "natural light",
            "Neon": "neon lighting",
            "Dramatic": "dramatic lighting",
            "Soft": "soft light",
            "Backlight": "backlight",
            "Studio": "studio light",
            "Candle": "candlelight",
            "Fire": "firelight"
        },
        veoify: {
            "Natural": "natural light",
            "Neon": "neon lighting",
            "Dramatic": "dramatic lighting", 
            "Soft": "soft lighting",
            "Backlight": "backlighting",
            "Studio": "studio lighting",
            "Candle": "candlelight",
            "Fire": "firelight"
        }
    }
};
```

## 平台优化策略

### 1. 提示词长度优化
```javascript
const promptLengthOptimization = {
    sorafy: {
        maxTokens: 400,
        strategy: "focus on key visual elements",
        structure: "subject + style + camera + lighting + composition"
    },
    klingify: {
        maxTokens: 300,
        strategy: "precise scene description with timing",
        structure: "scene + camera + duration + movement + quality"
    },
    runwayify: {
        maxTokens: 500,
        strategy: "detailed creative control",
        structure: "visual + reference + motion + editing + style"
    },
    veoify: {
        maxTokens: 350,
        strategy: "mobile-optimized descriptions",
        structure: "subject + scene + mood + platform + audio"
    }
};
```

### 2. 分辨率适配
```javascript
const resolutionAdaptation = {
    sorafy: {
        default: "1280x720",
        pro: "1920x1080",
        strategy: "scale based on user subscription"
    },
    klingify: {
        default: "3840x2160",
        highQuality: "3840x2160@60fps",
        strategy: "native 4K output"
    },
    runwayify: {
        default: "1280x720",
        highQuality: "1920x1080",
        upscale: "3840x2160",
        strategy: "progressive quality scaling"
    },
    veoify: {
        default: "1920x1080",
        mobile: "1080x1920",
        highQuality: "3840x2160",
        strategy: "vertical first, horizontal second"
    }
};
```

### 3. 音频适配
```javascript
const audioAdaptation = {
    sorafy: {
        support: "native sync",
        features: ["music", "sfx", "dialogue"],
        strategy: "automated audio generation"
    },
    klingify: {
        support: "integrated", 
        features: ["micro-sounds", "ambient", "motion-sync"],
        strategy: "motion + sound co-generation"
    },
    runwayify: {
        support: "plugin required",
        features: ["TTS", "SFX", "voice conversion"],
        strategy: "separate audio processing"
    },
    veoify: {
        support: "native",
        features: ["synced audio", "natural sound"],
        strategy: "audio-first optimization"
    }
};
```

## 实现方案

### 1. 平台检测与选择
```javascript
function detectPlatform(targetPlatform) {
    const platforms = {
        sorafy: { name: "Sora 2", maxDuration: 25, supportsAudio: true },
        klingify: { name: "Kling 3.0", maxDuration: 15, supportsMultiShot: true },
        runwayify: { name: "Runway Gen-4", maxDuration: 10, isFast: true },
        veoify: { name: "Veo 3.1", maxDuration: 8, isVertical: true }
    };
    
    return platforms[targetPlatform] || platforms.sorafy; // fallback to Sora
}
```

### 2. 参数转换器
```javascript
function convertParameters(params, targetPlatform) {
    const mapping = {
        camera: cameraParamsMapping.cameraMovement[targetPlatform],
        shotSize: cameraParamsMapping.shotSize[targetPlatform],
        style: styleParamsMapping.filmGenre[targetPlatform],
        lighting: styleParamsMapping.lightingStyle[targetPlatform]
    };
    
    return {
        prompt: generatePrompt(params, mapping),
        duration: optimizeDuration(params.duration, targetPlatform),
        resolution: resolutionAdaptation[targetPlatform].default,
        audio: optimizeAudio(params.audio, targetPlatform)
    };
}
```

### 3. 提示词生成器
```javascript
function generatePrompt(params, mapping) {
    const { camera, shotSize, style, lighting } = mapping;
    
    const prompt = [
        params.subject || "main subject",
        style[params.filmGenre] || "",
        lighting[params.lightingStyle] || "",
        `${shotSize[params.shotSize]} ${camera[params.cameraMovement]}`,
        params.composition || "standard composition"
    ].filter(Boolean).join(", ");
    
    return prompt;
}
```

## 使用示例

### 基础使用
```javascript
const userInput = {
    subject: "futuristic city skyline",
    filmGenre: "Sci-Fi",
    lightingStyle: "Neon",
    shotSize: "Wide",
    cameraMovement: "Push",
    duration: 10
};

// 转换为不同平台格式
const soraFormat = convertParameters(userInput, 'sorafy');
const klingFormat = convertParameters(userInput, 'klingify');
const runwayFormat = convertParameters(userInput, 'runwayify');
const veoFormat = convertParameters(userInput, 'veoify');

console.log('Sora 2:', soraFormat.prompt);
console.log('Kling 3.0:', klingFormat.prompt);
console.log('Runway Gen-4:', runwayFormat.prompt);
console.log('Veo 3.1:', veoFormat.prompt);
```

### 输出示例
```
Sora 2: futuristic city skyline, sci-fi aesthetic, neon lighting, wide shot push in, natural lighting, realistic

Kling 3.0: futuristic city skyline, science fiction genre, neon city lights, wide shot camera push movement, natural lighting

Runway Gen-4: futuristic city skyline, sci-fi cinematic, neon lighting, wide shot push shot, dramatic lighting, high contrast

Veo 3.1: futuristic city skyline, sci-fi, neon lighting, wide shot camera push, natural light
```

## 部署计划

### Phase 1: 基础映射
1. 实现核心参数映射表
2. 创建平台检测系统
3. 建立基础提示词转换器

### Phase 2: 高级优化
1. 添加长度限制优化
2. 实现分辨率自适应
3. 集成音频适配策略

### Phase 3: 用户体验
1. 添加平台选择UI
2. 实现实时预览
3. 提供多平台对比功能

## 总结

这个平台参数映射系统将为video-prompt-gen用户提供跨平台AI视频生成的完整解决方案。通过智能参数转换和平台优化，用户可以轻松生成适合不同AI视频生成平台的高质量提示词，实现一次设计、多平台生成的 workflow。