// Video Prompt Generator - 参数数据结构
const videoParams = {
    cameraMovement: [
        {
            type: "Push",
            name: "推",
            description: "相机向被摄主体方向移动",
            scenario: "强调主体，营造紧张感",
            value: "push shot"
        },
        {
            type: "Pull",
            name: "拉",
            description: "相机远离被摄主体",
            scenario: "展现环境，营造距离感",
            value: "pull shot"
        },
        {
            type: "Pan",
            name: "摇",
            description: "相机水平转动",
            scenario: "展现场景横向范围",
            value: "pan shot"
        },
        {
            type: "Tilt",
            name: "移",
            description: "相机垂直转动",
            scenario: "展示垂直空间关系",
            value: "tilt shot"
        },
        {
            type: "Dolly",
            name: "跟",
            description: "相机沿轨道平移",
            scenario: "平稳跟随主体运动",
            value: "dolly shot"
        },
        {
            type: "Zoom",
            name: "变焦",
            description: "镜头焦距变化，位置不变",
            scenario: "改变画面构图，强调细节",
            value: "zoom shot"
        },
        {
            type: "Track",
            name: "跟拍",
            description: "相机跟随主体移动",
            scenario: "动态视角，沉浸感强",
            value: "tracking shot"
        },
        {
            type: "Crane",
            name: "升降",
            description: "相机垂直升降",
            scenario: "改变视角高度，展示层次",
            value: "crane shot"
        },
        {
            type: "Orbit",
            name: "环绕",
            description: "围绕主体旋转360度",
            scenario: "展现主体全方位",
            value: "orbit shot"
        },
        {
            type: "Handheld",
            name: "手持",
            description: "手持设备拍摄",
            scenario: "真实感，纪录片风格",
            value: "handheld shot"
        }
    ],
    
    cameraAngle: [
        {
            type: "Eye Level",
            name: "平角",
            effect: "与眼睛同高",
            psychological: "真实，平等感",
            value: "eye level angle"
        },
        {
            type: "Low Angle",
            name: "仰角",
            effect: "从下方拍摄",
            psychological: "权威，高大，力量",
            value: "low angle"
        },
        {
            type: "High Angle",
            name: "俯角",
            effect: "从上方拍摄",
            psychological: "弱小，被控制，全局视角",
            value: "high angle"
        },
        {
            type: "Bird's Eye",
            name: "鸟瞰",
            effect: "垂直正上方",
            psychological: "上帝视角，空间布局",
            value: "birds eye view"
        },
        {
            type: "Dutch Angle",
            name: "荷兰角",
            effect: "倾斜角度",
            psychological: "不稳定，紧张，不安",
            value: "dutch angle"
        },
        {
            type: "Overhead",
            name: "顶拍",
            effect: "垂直向下",
            psychological: "平面感，设计感",
            value: "overhead shot"
        }
    ],
    
    shotSize: [
        {
            type: "Extreme Long Shot",
            name: "大远景",
            ratio: "< 5%",
            scenario: "展示环境，建立场景",
            value: "extreme long shot"
        },
        {
            type: "Long Shot",
            name: "远景",
            ratio: "5-10%",
            scenario: "全身，展示人物与环境关系",
            value: "long shot"
        },
        {
            type: "Full Shot",
            name: "全景",
            ratio: "15-25%",
            scenario: "全身，人物完整姿态",
            value: "full shot"
        },
        {
            type: "Medium Shot",
            name: "中景",
            ratio: "25-50%",
            scenario: "腰部以上，上半身动作",
            value: "medium shot"
        },
        {
            type: "Medium Close Up",
            name: "中近景",
            ratio: "50-65%",
            scenario: "胸部以上，表情细节",
            value: "medium close up"
        },
        {
            type: "Close Up",
            name: "近景",
            ratio: "65-85%",
            scenario: "肩部以上，面部表情",
            value: "close up"
        },
        {
            type: "Extreme Close Up",
            name: "大特写",
            ratio: "> 85%",
            scenario: "眼睛等局部细节",
            value: "extreme close up"
        }
    ],
    
    movementSpeed: [
        {
            type: "Ultra Slow",
            name: "超慢",
            framerate: "24fps以下",
            emotional: "艺术感，电影感",
            value: "ultra slow motion"
        },
        {
            type: "Slow",
            name: "慢",
            framerate: "24-30fps",
            emotional: "沉思，优雅",
            value: "slow motion"
        },
        {
            type: "Normal",
            name: "正常",
            framerate: "30-60fps",
            emotional: "标准，平衡",
            value: "normal speed"
        },
        {
            type: "Fast",
            name: "快",
            framerate: "60-120fps",
            emotional: "动感，紧张",
            value: "fast motion"
        },
        {
            type: "Ultra Fast",
            name: "超快",
            framerate: "120fps以上",
            emotional: "动态模糊，能量感",
            value: "ultra fast motion"
        },
        {
            type: "Variable",
            name: "变速",
            framerate: "混合速度",
            emotional: "叙事节奏变化",
            value: "variable speed"
        }
    ],
    
    // Phase 2: 电影风格系统
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
        }
    ],
    
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
        }
    ],
    
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
        }
    ],
    
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
            type: "Cinematic",
            name: "电影质感",
            description: "专业电影级质感",
            characteristics: ["rich", "professional", "theatrical", "polished"],
            scenarios: ["专业", "电影", "高质量", "精致"],
            value: "cinematic texture"
        }
    ],
    
    templates: [
        {
            name: "经典叙事",
            movement: "Push",
            angle: "Eye Level",
            shotSize: "Medium Shot",
            speed: "Normal",
            style: "标准，平衡",
            filmGenre: "Documentary",
            lighting: "Natural",
            color: "Normal",
            texture: "Digital Sharp",
            description: "传统的叙事视角，适合大多数场景"
        },
        {
            name: "科幻动作",
            movement: "Dolly",
            angle: "Low Angle",
            shotSize: "Medium Close Up",
            speed: "Fast",
            style: "动感，紧张",
            filmGenre: "Sci-Fi",
            lighting: "Neon",
            color: "High Contrast",
            texture: "Digital Sharp",
            description: "科幻电影风格，充满未来科技感"
        },
        {
            name: "恐怖悬疑",
            movement: "Handheld",
            angle: "Dutch Angle",
            shotSize: "Close Up",
            speed: "Slow",
            style: "不安，压抑",
            filmGenre: "Horror",
            lighting: "Dramatic",
            color: "Cool",
            texture: "Film Grain",
            description: "不稳定视角营造紧张恐怖氛围"
        },
        {
            name: "浪漫爱情",
            movement: "Zoom",
            angle: "Eye Level",
            shotSize: "Close Up",
            speed: "Slow",
            style: "浪漫，亲密",
            filmGenre: "Romance",
            lighting: "Soft",
            color: "Warm",
            texture: "Cinematic",
            description: "细腻浪漫的特写镜头，突出情感表达"
        },
        {
            name: "武侠奇幻",
            movement: "Crane",
            angle: "Bird's Eye",
            shotSize: "Extreme Long Shot",
            speed: "Ultra Slow",
            style: "艺术性，诗意",
            filmGenre: "Wuxia",
            lighting: "Natural",
            color: "Warm",
            texture: "Film Grain",
            description: "富有艺术美感的鸟瞰视角，适合武侠场景"
        }
    ]
};

// 当前选择的参数
let currentSelection = {
    cameraMovement: null,
    cameraAngle: null,
    shotSize: null,
    movementSpeed: null,
    template: null,
    // Phase 2: 风格选择
    filmGenre: null,
    lightingStyle: null,
    colorGrade: null,
    filmTexture: null
};