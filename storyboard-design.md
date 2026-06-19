# 分镜数据模型设计文档

## 概述
为video-prompt-gen项目设计完整的分镜（Storyboard）数据结构，包括Shot（镜头）、Sequence（序列）、Timeline（时间线）三个核心层次，支持专业的视频分镜编排和AI提示词生成。

## 设计目标
- 建立层次化的分镜数据结构
- 支持复杂的镜头序列编排
- 提供时间线管理和版本控制
- 集成现有的电影参数系统
- 支持导出到各种AI视频生成平台

## 数据结构设计

### 1. Shot（镜头）数据结构

```javascript
/**
 * 单个镜头数据结构
 */
const Shot = {
    id: "shot_001",
    sequenceId: "seq_001",
    order: 1,
    
    // 基础信息
    title: "开场远景",
    description: "城市天际线远景镜头",
    duration: 5.0, // 秒
    startTime: 0.0, // 在时间线中的开始时间
    endTime: 5.0,   // 在时间线中的结束时间
    
    // 相机参数
    camera: {
        movement: "Static", // 静态/推/拉/摇/移/跟/升/降
        angle: "Eye Level", // 平视/仰视/俯视/鸟瞰/荷兰角
        shotSize: "Wide Shot", // 远景/全景/中景/近景/特写
        speed: "Normal", // 缓慢/中速/快速/变速
        focus: "Auto", // 自动/手动
        aperture: 2.8 // 光圈值
    },
    
    // 构图参数
    composition: {
        framing: "Rule of Thirds", // 三分法/中心/黄金分割/对称
        leadingLines: ["buildings", "roads"], // 引导线
        symmetry: false,
        depth: "Medium", // 浅景深/中景深/深景深
        colorScheme: "Urban Cool" // 色彩方案
    },
    
    // 内容信息
    content: {
        subject: "City Skyline",
        background: "Modern cityscape",
        foreground: null,
        mood: "Epic, Grand",
        atmosphere: "Futuristic",
        lighting: "Golden Hour" // 灯光风格
    },
    
    // 角色信息（可选）
    characters: [
        {
            id: "char_001",
            name: "Main Character",
            position: "Center Right",
            action: "Standing observing",
            emotion: "Awe",
            size: "Medium" // 在画面中的大小
        }
    ],
    
    // 运动信息
    movement: {
        primary: "Static",
        secondary: null,
        speed: 0.0,
        direction: null,
        path: null
    },
    
    // 风格参数
    style: {
        filmGenre: "Sci-Fi",
        lightingStyle: "Natural",
        colorGrading: "Warm",
        filmTexture: "Digital Sharp",
        visualEffects: [] // 特效列表
    },
    
    // 音频信息（可选）
    audio: {
        music: "Epic Orchestral",
        soundEffects: ["Ambient City", "Wind"],
        dialogue: null,
        volume: 0.7
    },
    
    // 标记和注释
    metadata: {
        status: "Draft", // Draft/Approved/Completed
        priority: "High",
        notes: "建立场景氛围，展示城市规模",
        tags: ["opening", "establishing", "wide"],
        created: "2026-06-19T09:00:00Z",
        modified: "2026-06-19T09:30:00Z",
        version: 1
    }
};
```

### 2. Sequence（序列）数据结构

```javascript
/**
 * 镜头序列数据结构
 */
const Sequence = {
    id: "seq_001",
    timelineId: "timeline_001",
    order: 1,
    
    // 基础信息
    title: "开场序列",
    description: "建立场景和角色的介绍序列",
    duration: 30.0, // 序列总时长
    shotCount: 6,   // 包含的镜头数量
    
    // 结构信息
    structure: {
        type: "Linear", // Linear/Parallel/Montage/Cross-cut
        pacing: "Slow", // Slow/Medium/Fast/Variable
        flow: "Continuous", // Continuous/Cutaway/Jump Cut
        transitions: ["Fade In", "Hard Cut", "Fade Out"]
    },
    
    // 镜头列表
    shots: [
        "shot_001", "shot_002", "shot_003", 
        "shot_004", "shot_005", "shot_006"
    ],
    
    // 整体风格
    overallStyle: {
        filmGenre: "Sci-Fi",
        lightingStyle: "Natural",
        colorGrading: "Warm to Cool",
        filmTexture: "Digital Sharp",
        mood: "Wonderful",
        atmosphere: "Futuristic"
    },
    
    // 叙事要素
    narrative: {
        purpose: "Establish", // Establish/Develop/Resolve/Transition
        focus: "Setting", // Setting/Character/Plot/Emotion
        tension: "Low", // Low/Medium/High
        emotionalArc: "Curious" → "Awe"
    },
    
    // 音频整体规划
    audio: {
        music: "Epic Orchestral",
        volume: 0.8,
        progression: "Building", // Building/Constant/Diminishing
        keyMoments: [0, 15, 30] // 时间点标记
    },
    
    // 标记和注释
    metadata: {
        status: "Draft",
        priority: "High",
        notes: "建立世界观，引入主要角色",
        tags: ["opening", "establishing", "character-intro"],
        created: "2026-06-19T09:00:00Z",
        modified: "2026-06-19T09:30:00Z",
        version: 1
    }
};
```

### 3. Timeline（时间线）数据结构

```javascript
/**
 * 时间线数据结构
 */
const Timeline = {
    id: "timeline_001",
    projectId: "video_prompt_gen",
    version: "1.0.0",
    
    // 基础信息
    title: "科幻短片分镜",
    description: "5分钟科幻短片完整分镜设计",
    duration: 300.0, // 总时长（秒）
    createdAt: "2026-06-19T09:00:00Z",
    updatedAt: "2026-06-19T09:30:00Z",
    
    // 序列列表
    sequences: [
        {
            id: "seq_001",
            title: "开场序列",
            startTime: 0.0,
            endTime: 30.0,
            duration: 30.0
        },
        {
            id: "seq_002", 
            title: "角色引入",
            startTime: 30.0,
            endTime: 60.0,
            duration: 30.0
        },
        {
            id: "seq_003",
            title: "冲突建立",
            startTime: 60.0,
            endTime: 120.0,
            duration: 60.0
        }
        // 更多序列...
    ],
    
    // 全局设置
    globalSettings: {
        resolution: "1920x1080",
        frameRate: 30,
        aspectRatio: "16:9",
        format: "MP4",
        quality: "High"
    },
    
    // 整体风格
    overallStyle: {
        filmGenre: "Sci-Fi",
        lightingStyle: "Natural",
        colorGrading: "Cool",
        filmTexture: "Digital Sharp",
        mood: "Tense",
        atmosphere: "Futuristic"
    },
    
    // 叙事结构
    narrative: {
        structure: "Three Act", // Three Act/Linear/Non-linear
        acts: [
            {
                name: "Setup",
                start: 0,
                end: 60,
                sequences: ["seq_001", "seq_002"]
            },
            {
                name: "Confrontation", 
                start: 60,
                end: 240,
                sequences: ["seq_003", "seq_004", "seq_005"]
            },
            {
                name: "Resolution",
                start: 240,
                end: 300,
                sequences: ["seq_006", "seq_007"]
            }
        ]
    },
    
    // 关键帧
    keyframes: [
        {
            time: 0.0,
            type: "Scene Start",
            description: "影片开始",
            shotId: "shot_001"
        },
        {
            time: 15.0,
            type: "Character Intro",
            description: "主角首次出现", 
            shotId: "shot_003"
        },
        {
            time: 60.0,
            type: "Inciting Incident",
            description: "冲突开始",
            shotId: "shot_008"
        }
    ],
    
    // 导出配置
    exportConfig: {
        formats: ["Runway ML", "Pika Labs", "Kling", "Sora"],
        includeMetadata: true,
        includeAudio: true,
        timelineMarkers: true
    },
    
    // 元数据
    metadata: {
        status: "Draft",
        priority: "High",
        author: "AI Assistant",
        tags: ["sci-fi", "short-film", "storyboard"],
        version: "1.0.0"
    }
};
```

### 4. 关系和引用

```javascript
/**
 * Shot到Sequence的关系
 */
const ShotToSequence = {
    shotId: "shot_001",
    sequenceId: "seq_001",
    order: 1, // 在序列中的位置
    transitionType: "Hard Cut", // 切换方式
    connection: "Temporal", // Temporal/Spatial/Thematic
    notes: "自然过渡"
};

/**
 * Sequence到Timeline的关系  
 */
const SequenceToTimeline = {
    sequenceId: "seq_001",
    timelineId: "timeline_001", 
    startTime: 0.0,
    endTime: 30.0,
    duration: 30.0,
    structure: "Opening"
};
```

## 数据存储结构

### 文件结构
```
data/
├── timelines/
│   ├── timeline_001.json
│   └── timeline_002.json
├── sequences/
│   ├── seq_001.json
│   └── seq_002.json
└── shots/
    ├── shot_001.json
    └── shot_002.json
```

### 数据验证
```javascript
// Shot验证规则
const ShotSchema = {
    required: ["id", "sequenceId", "title", "duration", "camera"],
    camera: {
        required: ["movement", "angle", "shotSize"],
        enum: {
            movement: ["Static", "Push", "Pull", "Pan", "Tilt", "Tracking", "Follow", "Crane", "Dolly"],
            angle: ["Eye Level", "Low Angle", "High Angle", "Bird's Eye", "Dutch Angle"],
            shotSize: ["Extreme Wide", "Wide Shot", "Full Shot", "Medium Shot", "Close Up", "Extreme Close Up"]
        }
    }
};

// Sequence验证规则
const SequenceSchema = {
    required: ["id", "timelineId", "title", "shots"],
    structure: {
        type: ["Linear", "Parallel", "Montage", "Cross-cut"],
        pacing: ["Slow", "Medium", "Fast", "Variable"]
    }
};

// Timeline验证规则
const TimelineSchema = {
    required: ["id", "title", "duration", "sequences"],
    globalSettings: {
        resolution: "string",
        frameRate: "number",
        aspectRatio: "string"
    }
};
```

## 功能接口设计

### 1. 创建操作
```javascript
// 创建新镜头
function createShot(shotData) {
    // 生成唯一ID
    const shotId = generateId("shot_");
    
    // 验证数据
    validateShot(shotData);
    
    // 设置默认值
    const shot = {
        ...defaultShot,
        ...shotData,
        id: shotId,
        metadata: {
            ...defaultShot.metadata,
            created: new Date().toISOString(),
            version: 1
        }
    };
    
    // 保存文件
    saveShot(shot);
    
    return shot;
}

// 创建新序列
function createSequence(sequenceData) {
    // 验证镜头引用
    sequenceData.shots.forEach(shotId => {
        if (!shotExists(shotId)) {
            throw new Error(`Shot ${shotId} does not exist`);
        }
    });
    
    return createEntity(sequenceData, "sequences");
}

// 创建时间线
function createTimeline(timelineData) {
    // 验证序列引用
    timelineData.sequences.forEach(seq => {
        if (!sequenceExists(seq.id)) {
            throw new Error(`Sequence ${seq.id} does not exist`);
        }
    });
    
    return createEntity(timelineData, "timelines");
}
```

### 2. 查询操作
```javascript
// 获取镜头详情
function getShot(shotId) {
    return loadShot(shotId);
}

// 获取序列详情
function getSequence(sequenceId) {
    const sequence = loadSequence(sequenceId);
    
    // 加载关联的镜头
    sequence.shots = sequence.shots.map(shotId => loadShot(shotId));
    
    return sequence;
}

// 获取时间线详情
function getTimeline(timelineId) {
    const timeline = loadTimeline(timelineId);
    
    // 加载关联的序列
    timeline.sequences = timeline.sequences.map(seq => {
        const sequence = loadSequence(seq.id);
        sequence.shots = sequence.shots.map(shotId => loadShot(shotId));
        return sequence;
    });
    
    return timeline;
}

// 搜索功能
function searchShots(query) {
    return searchFiles("shots", query, ["title", "description", "content.subject"]);
}

function searchSequences(query) {
    return searchFiles("sequences", query, ["title", "description", "narrative.purpose"]);
}

function searchTimelines(query) {
    return searchFiles("timelines", query, ["title", "description", "metadata.tags"]);
}
```

### 3. 更新操作
```javascript
// 更新镜头
function updateShot(shotId, updates) {
    const existingShot = getShot(shotId);
    const updatedShot = {
        ...existingShot,
        ...updates,
        metadata: {
            ...existingShot.metadata,
            modified: new Date().toISOString(),
            version: existingShot.metadata.version + 1
        }
    };
    
    validateShot(updatedShot);
    saveShot(updatedShot);
    
    return updatedShot;
}

// 更新序列
function updateSequence(sequenceId, updates) {
    const sequence = getSequence(sequenceId);
    
    // 检查新增的镜头是否存在
    if (updates.shots) {
        updates.shots.forEach(shotId => {
            if (!shotExists(shotId)) {
                throw new Error(`Shot ${shotId} does not exist`);
            }
        });
    }
    
    return updateEntity(sequenceId, updates, "sequences");
}

// 更新时间线
function updateTimeline(timelineId, updates) {
    const timeline = getTimeline(timelineId);
    
    // 检查新增的序列是否存在
    if (updates.sequences) {
        updates.sequences.forEach(seq => {
            if (!sequenceExists(seq.id)) {
                throw new Error(`Sequence ${seq.id} does not exist`);
            }
        });
    }
    
    return updateEntity(timelineId, updates, "timelines");
}
```

### 4. 删除操作
```javascript
// 删除镜头
function deleteShot(shotId) {
    // 检查是否有序列引用
    const referencingSequences = findSequencesByShot(shotId);
    if (referencingSequences.length > 0) {
        throw new Error(`Shot ${shotId} is referenced by ${referencingSequences.length} sequences`);
    }
    
    deleteFile("shots", shotId);
}

// 删除序列
function deleteSequence(sequenceId) {
    // 检查是否有时间线引用
    const referencingTimelines = findTimelinesBySequence(sequenceId);
    if (referencingTimelines.length > 0) {
        throw new Error(`Sequence ${sequenceId} is referenced by ${referencingTimelines.length} timelines`);
    }
    
    // 删除关联的镜头文件
    const sequence = loadSequence(sequenceId);
    sequence.shots.forEach(shotId => {
        try {
            deleteShot(shotId);
        } catch (error) {
            console.warn(`Could not delete shot ${shotId}: ${error.message}`);
        }
    });
    
    deleteFile("sequences", sequenceId);
}

// 删除时间线
function deleteTimeline(timelineId) {
    // 删除关联的序列和镜头
    const timeline = loadTimeline(timelineId);
    timeline.sequences.forEach(seq => {
        try {
            deleteSequence(seq.id);
        } catch (error) {
            console.warn(`Could not delete sequence ${seq.id}: ${error.message}`);
        }
    });
    
    deleteFile("timelines", timelineId);
}
```

### 5. 导出功能
```javascript
// 导出为不同AI平台的格式
function exportForPlatform(timelineId, platform) {
    const timeline = getTimeline(timelineId);
    
    switch (platform) {
        case "runway":
            return exportForRunway(timeline);
        case "pika":
            return exportForPika(timeline);
        case "kling":
            return exportForKling(timeline);
        case "sora":
            return exportForSora(timeline);
        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
}

// 导出时间线摘要
function exportTimelineSummary(timelineId) {
    const timeline = getTimeline(timelineId);
    
    return {
        title: timeline.title,
        duration: timeline.duration,
        sequenceCount: timeline.sequences.length,
        totalShots: timeline.sequences.reduce((total, seq) => total + seq.shots.length, 0),
        overallStyle: timeline.overallStyle,
        narrative: timeline.narrative,
        keyMoments: timeline.keyframes
    };
}

// 导出分镜报告
function exportStoryboardReport(timelineId) {
    const timeline = getTimeline(timelineId);
    
    return {
        metadata: timeline.metadata,
        overview: exportTimelineSummary(timelineId),
        sequences: timeline.sequences.map(seq => ({
            id: seq.id,
            title: seq.title,
            duration: seq.duration,
            shotCount: seq.shots.length,
            structure: seq.structure,
            narrative: seq.narrative
        })),
        technical: timeline.globalSettings,
        export: timeline.exportConfig
    };
}
```

## 集成方案

### 1. 与现有参数系统集成
```javascript
// 扩展现有的currentSelection对象
const storyboardSelection = {
    // 现有参数
    cameraMovement: null,
    cameraAngle: null,
    shotSize: null,
    movementSpeed: null,
    template: null,
    
    // 新增的分镜参数
    currentShot: null,
    currentSequence: null,
    currentTimeline: null,
    
    // 分镜工具
    storyboardMode: "edit", // edit/view/preview
    autoTransition: true,
    snapToGrid: true,
    showGuides: true
};

// 与风格参数系统连接
const styleConnection = {
    shotStyle: {
        filmGenre: null,
        lightingStyle: null,
        colorGrading: null,
        filmTexture: null
    },
    sequenceStyle: {
        filmGenre: null,
        lightingStyle: null,
        colorGrading: null,
        filmTexture: null
    },
    timelineStyle: {
        filmGenre: null,
        lightingStyle: null,
        colorGrading: null,
        filmTexture: null
    }
};
```

### 2. 界面集成
```javascript
// 分镜编辑器界面状态
const storyboardUI = {
    mode: "timeline", // timeline/sequence/shot
    selected: null,
    zoom: 1.0,
    pan: { x: 0, y: 0 },
    grid: { enabled: true, size: 10 },
    rulers: { enabled: true },
    markers: { enabled: true },
    layers: {
        video: true,
        audio: true,
        effects: true,
        notes: true
    }
};
```

## 使用示例

### 1. 创建简单的分镜
```javascript
// 创建开场镜头
const openingShot = createShot({
    title: "城市远景",
    description: "未来城市天际线",
    duration: 5,
    camera: {
        movement: "Static",
        angle: "Eye Level", 
        shotSize: "Wide Shot",
        speed: "Normal"
    },
    content: {
        subject: "City Skyline",
        mood: "Epic",
        atmosphere: "Futuristic"
    },
    style: {
        filmGenre: "Sci-Fi",
        lightingStyle: "Golden Hour",
        colorGrading: "Warm",
        filmTexture: "Digital Sharp"
    }
});

// 创建序列
const openingSequence = createSequence({
    title: "开场序列",
    description: "建立世界观",
    duration: 30,
    structure: {
        type: "Linear",
        pacing: "Slow"
    },
    shots: [openingShot.id],
    overallStyle: {
        filmGenre: "Sci-Fi",
        lightingStyle: "Natural",
        colorGrading: "Warm"
    }
});

// 创建时间线
const timeline = createTimeline({
    title: "科幻短片",
    description: "5分钟科幻短片",
    duration: 300,
    sequences: [{
        id: openingSequence.id,
        title: "开场序列",
        startTime: 0,
        endTime: 30,
        duration: 30
    }],
    overallStyle: {
        filmGenre: "Sci-Fi",
        lightingStyle: "Natural",
        colorGrading: "Cool"
    }
});
```

### 2. 导出到AI平台
```javascript
// 导出到Runway ML
const runwayPrompt = exportForPlatform(timeline.id, "runway");

// 输出格式示例
{
    "prompts": [
        {
            "startTime": 0,
            "endTime": 5,
            "prompt": "Wide shot of futuristic city skyline at golden hour, natural lighting, warm color grading, digital sharp texture, epic mood"
        },
        {
            "startTime": 5,
            "endTime": 10,
            "prompt": "Medium shot of main character standing in awe, eye level angle, static camera, natural lighting"
        }
    ],
    "style": {
        "filmGenre": "Sci-Fi",
        "lightingStyle": "Natural",
        "colorGrading": "Warm to Cool",
        "overallMood": "Epic, Tense"
    }
}
```

这个分镜数据模型设计为video-prompt-gen项目提供了完整的分镜编排能力，支持从单个镜头到复杂序列的时间线管理，能够满足专业视频分镜的需求，并支持导出到各种AI视频生成平台。