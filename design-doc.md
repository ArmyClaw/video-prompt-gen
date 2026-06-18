# 风格参数设计文档

## 概述
为video-prompt-gen项目完善风格参数系统，增加更多电影术语，支持AI视频生成的精确风格控制。

## 设计目标
- 建立完整的电影风格参数体系
- 增加专业电影术语，提高专业性
- 支持多种流派的风格组合
- 与现有参数系统无缝集成

## 参数设计

### 1. 电影流派 (Film Genres)
```javascript
filmGenres: [
    {
        type: "Sci-Fi",
        name: "科幻",
        keywords: ["futuristic", "technology", "space", "robots", "cyberpunk"],
        visual: ["neon", "glowing", "metallic", "digital"],
        atmosphere: "epic, visionary, technological wonder"
    },
    {
        type: "Noir",
        name: "黑色电影",
        keywords: ["mystery", "crime", "shadow", "rain", "detective"],
        visual: ["high contrast", "low key lighting", "venetian blinds", "wet streets"],
        atmosphere: "dark, cynical, suspenseful"
    },
    {
        type: "Documentary",
        name: "纪录片",
        keywords: ["real", "authentic", "raw", "unfiltered", "observational"],
        visual: ["natural lighting", "handheld", "real locations", "talking heads"],
        atmosphere: "objective, factual, intimate"
    },
    {
        type: "Anime",
        name: "动画",
        keywords: ["anime", "manga", "japanese", "cel-shaded", "exaggerated"],
        visual: ["bright colors", "expressive", "speed lines", "dramatic angles"],
        atmosphere: "dynamic, emotional, stylized"
    },
    {
        type: "Wuxia",
        name: "武侠",
        keywords: ["martial arts", "ancient china", "kung fu", "wuxia", "legendary"],
        visual: ["traditional costumes", "bamboo forests", "mountain temples", "clouds"],
        atmosphere: "poetic, heroic, mystical"
    },
    {
        type: "Horror",
        name: "恐怖",
        keywords: ["scary", "fear", "jump scare", "paranormal", "tension"],
        visual: ["dark", "spooky", "gore", "shadows", "unsteady"],
        atmosphere: "terrifying, suspenseful, disturbing"
    },
    {
        type: "Romance",
        name: "爱情",
        keywords: ["love", "romantic", "passion", "intimate", "emotional"],
        visual: ["soft focus", "warm colors", "close ups", "breezy", "beautiful"],
        atmosphere: "tender, dreamy, heartwarming"
    },
    {
        type: "Action",
        name: "动作",
        keywords: ["exciting", "intense", "fast", "explosive", "adventure"],
        visual: ["dynamic", "movement", "close combat", "explosions", "stunts"],
        atmosphere: "thrilling, energetic, spectacular"
    },
    {
        type: "Western",
        name: "西部",
        keywords: ["cowboy", "frontier", "desert", "horse", "saloon"],
        visual: ["wide landscapes", "sunset", "dusty", "wooden buildings", "horses"],
        atmosphere: "adventurous, rugged, classic"
    },
    {
        type: "Fantasy",
        name: "奇幻",
        keywords: ["magic", "dragons", "castles", "sword", "wizard"],
        visual: ["mystical", "epic", "ancient", "enchanted", "mythical"],
        atmosphere: "wonderful, magical, epic"
    }
]
```

### 2. 灯光风格 (Lighting Styles)
```javascript
lightingStyles: [
    {
        type: "Natural",
        name: "自然光",
        description: "模拟自然光线，真实感强",
        scenarios: ["户外拍摄", "日间场景", "真实记录"],
        characteristics: ["soft shadows", "natural colors", "time-based", "directional"],
        value: "natural lighting"
    },
    {
        type: "Neon",
        name: "霓虹灯",
        description: "城市夜景，科技感强",
        scenarios: ["夜晚街道", "夜店", "未来城市", "赛博朋克"],
        characteristics: ["bright colors", "glowing effects", "high contrast", "urban"],
        value: "neon lighting"
    },
    {
        type: "Dramatic",
        name: "戏剧性",
        description: "强烈的光影对比，戏剧效果",
        scenarios: ["关键场景", "重要对话", "情绪高潮", "内心戏"],
        characteristics: ["high contrast", "chiaroscuro", "emotional", "focused"],
        value: "dramatic lighting"
    },
    {
        type: "Soft",
        name: "柔光",
        description: "柔和光线，降低阴影强度",
        scenarios: ["浪漫场景", "温馨氛围", "美丽特写", "柔美效果"],
        characteristics: ["low contrast", "smooth transitions", "flattering", "gentle"],
        value: "soft lighting"
    },
    {
        type: "Backlight",
        name: "逆光",
        description: "光源在主体后方，营造轮廓感",
        scenarios: ["轮廓特写", "剪影效果", "神秘氛围", "浪漫场景"],
        characteristics: ["rim light", "silhouette", "mysterious", "glowing edges"],
        value: "backlighting"
    },
    {
        type: "Studio",
        name: "摄影棚",
        description: "专业的摄影棚灯光，均匀明亮",
        scenarios: ["访谈", "产品展示", "室内场景", "专业制作"],
        characteristics: ["even illumination", "professional", "controlled", "clean"],
        value: "studio lighting"
    },
    {
        type: "Candle",
        name: "烛光",
        description: "温暖柔光，营造浪漫氛围",
        scenarios: ["晚餐场景", "卧室", "复古", "温馨时刻"],
        characteristics: ["warm", "flickering", "intimate", "romantic"],
        value: "candle lighting"
    },
    {
        type: "Fire",
        name: "火光",
        description: "篝火、烛火等光源，温暖动态",
        scenarios: ["篝火晚会", "聚会", "温暖场景", "夜晚"],
        characteristics: ["dynamic", "warm", "dancing", "intimate"],
        value: "fire lighting"
    }
]
```

### 3. 调色方案 (Color Grading)
```javascript
colorGrading: [
    {
        type: "Warm",
        name: "暖调",
        description: "偏暖色调，温馨舒适",
        characteristics: ["orange tint", "golden hour", "warm emotions", "nostalgic"],
        scenarios: ["日落", "黄昏", "怀旧场景", "温馨时刻"],
        value: "warm color grading"
    },
    {
        type: "Cool",
        name: "冷调",
        description: "偏冷色调，清新冷静",
        characteristics: ["blue tint", "winter", "professional", "calm"],
        scenarios: ["夜晚", "科技", "专业", "冷峻"],
        value: "cool color grading"
    },
    {
        type: "Desaturated",
        name: "去饱和",
        description: "色彩饱和度降低，复古质感",
        characteristics: ["muted colors", "vintage", "retro", "emotional"],
        scenarios: ["回忆", "历史", "情感", "岁月"],
        value: "desaturated color grading"
    },
    {
        type: "High Contrast",
        name: "高对比度",
        description: "强烈对比，戏剧性效果",
        characteristics: ["deep blacks", "bright whites", "bold", "impactful"],
        scenarios: ["高潮", "紧张", "震撼", "强烈"],
        value: "high contrast color grading"
    },
    {
        type: "Pastel",
        name: "粉彩色",
        description: "柔和粉色调，甜美梦幻",
        characteristics: ["soft", "dreamy", "gentle", "sweet"],
        scenarios: ["童话", "梦幻", "柔美", "温馨"],
        value: "pastel color grading"
    },
    {
        type: "Vibrant",
        name: "鲜艳",
        description: "色彩鲜艳，活力四射",
        characteristics: ["saturated", "energetic", "bold", "eye-catching"],
        scenarios: ["活力", "年轻", "现代", "鲜艳"],
        value: "vibrant color grading"
    },
    {
        type: "Monochrome",
        name: "单色",
        description: "黑白或单一色调",
        characteristics: ["black and white", "dramatic", "artistic", "timeless"],
        scenarios: ["经典", "艺术", "复古", "深刻"],
        value: "monochrome color grading"
    },
    {
        type: "Sepia",
        name: "褐色调",
        description: "复古褐色调，怀旧质感",
        characteristics: ["brown tones", "vintage", "old photos", "nostalgic"],
        scenarios: ["历史", "回忆", "复古", "温暖"],
        value: "sepia color grading"
    }
]
```

### 4. 胶片质感 (Film Texture)
```javascript
filmTexture: [
    {
        type: "Film Grain",
        name: "胶片颗粒",
        description: "经典胶片质感，颗粒感强",
        characteristics: ["visible grain", "vintage", "organic", "authentic"],
        scenarios: ["怀旧", "经典", "纪录片", "真实感"],
        value: "film grain texture"
    },
    {
        type: "Digital Sharp",
        name: "数码锐利",
        description: "数字高清，清晰锐利",
        characteristics: ["sharp", "clean", "modern", "precise"],
        scenarios: ["现代", "科技", "清晰", "专业"],
        value: "digital sharp texture"
    },
    {
        type: "VHS",
        name: "复古VHS",
        description: "VHS磁带质感，模拟老旧录像",
        characteristics: ["glitch", "tracking lines", "blurry", "nostalgic"],
        scenarios: ["复古", "80年代", "录像", "模拟"],
        value: "VHS texture"
    },
    {
        type: "Film Reel",
        name: "胶片卷",
        description: "老式胶片卷转盘效果",
        characteristics: ["circular", "vintage", "mechanical", "classic"],
        scenarios: ["电影制作", "复古", "工艺", "经典"],
        value: "film reel texture"
    },
    {
        type: "Lomo",
        name: "LOMO风格",
        description: "LOMO相机特色，随意自然",
        characteristics: ["oversaturated", "vignette", "unexpected", "artistic"],
        scenarios: ["艺术", "创意", "随意", "特色"],
        value: "lomo texture"
    },
    {
        type: "Cinematic",
        name: "电影质感",
        description: "专业电影级质感",
        characteristics: ["rich", "professional", "theatrical", "polished"],
        scenarios: ["专业", "电影", "高质量", "精致"],
        value: "cinematic texture"
    },
    {
        type: "Watercolor",
        name: "水彩画",
        description: "水彩画风，柔和流畅",
        characteristics: ["soft", "flowing", "artistic", "painterly"],
        scenarios: ["艺术", "梦幻", "柔美", "创意"],
        value: "watercolor texture"
    },
    {
        type: "Sketch",
        name: "素描",
        description: "铅笔素描质感，手绘感",
        characteristics: ["hand-drawn", "sketchy", "artistic", "illustrative"],
        scenarios: ["艺术", "创意", "手绘", "独特"],
        value: "sketch texture"
    }
]
```

## 集成方案

### 扩展现有数据结构
在data.js中添加以下四个新的参数组：

```javascript
// 添加到 videoParams 对象中
filmGenres: [...],     // 电影流派
lightingStyles: [...], // 灯光风格  
colorGrading: [...],   // 调色方案
filmTexture: [...]     // 胶片质感
```

### 更新currentSelection对象
```javascript
let currentSelection = {
    cameraMovement: null,
    cameraAngle: null,
    shotSize: null,
    movementSpeed: null,
    template: null,
    // 新增风格选择
    filmGenre: null,
    lightingStyle: null,
    colorGrade: null,
    filmTexture: null
};
```

### 更新模板系统
为每个预定义模板添加风格参数，使模板更加丰富和专业。

## 使用示例
```javascript
// 组合示例：科幻片 + 霓虹灯光 + 高对比度调色 + 数码锐利质感
const sciFiPrompt = {
    filmGenre: "Sci-Fi",
    lightingStyle: "Neon", 
    colorGrade: "High Contrast",
    filmTexture: "Digital Sharp",
    // 结合现有参数
    cameraMovement: "Push",
    cameraAngle: "Low Angle",
    shotSize: "Medium Close Up"
};
```

这个设计为video-prompt-gen项目建立了完整的电影风格参数体系，通过专业术语和细致的分类，能够生成更精确、更专业的AI视频提示词。