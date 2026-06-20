// Video Prompt Generator - 参数数据结构
const videoParams = {
    // 为了向后兼容，添加module.exports
    __esModule: true,
    default: videoParams,
    videoParams: videoParams,
    
    // 相机运动参数
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
    
    // 镜头角度参数
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
            psychological: "弱小，压抑，俯视",
            value: "high angle"
        },
        {
            type: "Dutch Angle",
            name: "斜角",
            effect: "倾斜拍摄",
            psychological: "紧张，混乱，不安",
            value: "dutch angle"
        },
        {
            type: "Over the Shoulder",
            name: "过肩",
            effect: "从角色肩后拍摄",
            psychological: "亲密，对话关系",
            value: "over the shoulder"
        },
        {
            type: "Bird's Eye",
            name: "鸟瞰",
            effect: "从正上方拍摄",
            psychological: "宏观，上帝视角",
            value: "bird's eye"
        },
        {
            type: "Worm's Eye",
            name: "仰视",
            effect: "从正下方拍摄",
            psychological: "敬畏，高大",
            value: "worm's eye"
        }
    ],
    
    // 景别参数
    shotSize: [
        {
            type: "Extreme Long Shot",
            name: "大远景",
            ratio: "1:20",
            scenario: "展示环境，营造氛围",
            value: "extreme long shot"
        },
        {
            type: "Long Shot",
            name: "远景",
            ratio: "1:6",
            scenario: "展示主体与环境关系",
            value: "long shot"
        },
        {
            type: "Medium Long Shot",
            name: "中远景",
            ratio: "1:3",
            scenario: "腰部以上，展现环境细节",
            value: "medium long shot"
        },
        {
            type: "Medium Shot",
            name: "中景",
            ratio: "1:2",
            scenario: "腰部到胸部，对话场景",
            value: "medium shot"
        },
        {
            type: "Medium Close Up",
            name: "中近景",
            ratio: "1:1",
            scenario: "胸部以上，情感表达",
            value: "medium close up"
        },
        {
            type: "Close Up",
            name: "近景",
            ratio: "1:1",
            scenario: "头部，面部表情",
            value: "close up"
        },
        {
            type: "Extreme Close Up",
            name: "大特写",
            ratio: "1:1",
            scenario: "眼睛，细节，强调",
            value: "extreme close up"
        }
    ],
    
    // 运动速度参数
    movementSpeed: [
        {
            type: "Slow Motion",
            name: "慢动作",
            framerate: "24-30fps",
            emotional: "优雅，浪漫，史诗感",
            value: "slow motion"
        },
        {
            type: "Normal",
            name: "正常",
            framerate: "30-60fps",
            emotional: "自然，日常，真实",
            value: "normal"
        },
        {
            type: "Fast Motion",
            name: "快动作",
            framerate: "60-120fps",
            emotional: "紧张，兴奋，活力",
            value: "fast motion"
        },
        {
            type: "Time Lapse",
            name: "延时",
            framerate: "1-2fps",
            emotional: "变化，时光流逝，壮观",
            value: "time lapse"
        }
    ],
    
    // 预设模板
    templates: [
        {
            name: "电影风格",
            style: "cinematic",
            description: "专业的电影拍摄风格，注重构图和光影",
            parameters: {
                cameraMovement: "Dolly",
                cameraAngle: "Eye Level",
                shotSize: "Medium Shot",
                movementSpeed: "Normal"
            }
        },
        {
            name: "纪录片风格",
            style: "documentary",
            description: "真实自然的纪录片拍摄风格",
            parameters: {
                cameraMovement: "Handheld",
                cameraAngle: "Eye Level",
                shotSize: "Long Shot",
                movementSpeed: "Normal"
            }
        },
        {
            name: "音乐视频",
            style: "music video",
            description: "动感强烈的音乐视频风格",
            parameters: {
                cameraMovement: "Track",
                cameraAngle: "Dynamic",
                shotSize: "Medium Close Up",
                movementSpeed: "Fast Motion"
            }
        },
        {
            name: "广告风格",
            style: "commercial",
            description: "精美的广告拍摄风格",
            parameters: {
                cameraMovement: "Dolly",
                cameraAngle: "Low Angle",
                shotSize: "Medium Close Up",
                movementSpeed: "Slow Motion"
            }
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
    filmTexture: null,
    // Phase 2: 风格预设
    stylePreset: null
};

// 平台映射配置
const platformMapping = {
    'sora': {
        name: 'Sora 2 (OpenAI)',
        maxTokens: 400,
        promptTemplate: (shot) => {
            const cameraInfo = `camera ${shot.camera.movement}, ${shot.camera.angle}, ${shot.camera.shotSize}`;
            const contentInfo = `${shot.content.subject}, ${shot.content.mood}, ${shot.content.atmosphere}`;
            return `${shot.title}: ${cameraInfo}, ${contentInfo}, ${shot.style || 'realistic'}`;
        },
        description: '支持15-25秒视频，物理引擎优秀，适合自然场景'
    },
    'kling': {
        name: 'Kling 3.0',
        maxTokens: 300,
        promptTemplate: (shot) => {
            const cameraInfo = `${shot.camera.movement} camera, ${shot.camera.angle} angle`;
            const timeControl = `${shot.duration} seconds`;
            return `Scene: ${shot.title}, ${cameraInfo}, ${timeControl}, ${shot.style || 'high quality'}`;
        },
        description: '支持4K视频，角色一致性优秀，按秒计费'
    },
    'runway': {
        name: 'Runway Gen-4',
        maxTokens: 350,
        promptTemplate: (shot) => {
            const cameraInfo = `Camera: ${shot.camera.movement} with ${shot.camera.angle} angle`;
            const style = shot.style || 'cinematic';
            return `${shot.title}: ${cameraInfo}, Style: ${style}, Duration: ${shot.duration}s`;
        },
        description: '支持多种视频风格，专业编辑工具，实时预览'
    },
    'veo': {
        name: 'Google Veo 3.1',
        maxTokens: 450,
        promptTemplate: (shot) => {
            const cameraInfo = `${shot.camera.movement}, ${shot.camera.shotSize} shot`;
            const content = `${shot.content.subject} in ${shot.content.atmosphere}`;
            return `${shot.title}: ${content}, ${cameraInfo}, ${shot.style || 'realistic'}`;
        },
        description: 'Google新一代视频生成器，理解能力强，高质量输出'
    },
    'pika': {
        name: 'Pika Labs 1.0',
        maxTokens: 300,
        promptTemplate: (shot) => {
            const cameraInfo = `${shot.camera.movement} ${shot.camera.angle} ${shot.camera.shotSize}`;
            return `${shot.title}: ${cameraInfo}, ${shot.content.subject}, ${shot.style || 'anime'}`;
        },
        description: '专业动画风格支持，快速生成，多镜头同步'
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { videoParams, platformMapping };
}