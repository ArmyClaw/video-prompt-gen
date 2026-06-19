#!/usr/bin/env node

// 多镜头生成和导出功能测试脚本
const fs = require('fs');
const path = require('path');

console.log('🎬 开始测试 Video Prompt Gen 多镜头生成和导出功能...\n');

// 模拟多镜头数据
const testShots = [
    {
        id: 'shot_1',
        title: '开场远景',
        description: '建立场景氛围，展示城市规模',
        duration: 5,
        startTime: 0,
        endTime: 5,
        camera: {
            movement: 'Static',
            angle: 'Eye Level',
            shotSize: 'Extreme Wide',
            speed: 'Normal'
        },
        content: {
            subject: '现代城市天际线',
            mood: '壮观、现代',
            atmosphere: '黄昏时分的高楼大厦'
        },
        style: {
            filmGenre: 'Drama',
            lightingStyle: 'Golden Hour',
            colorGrading: 'Warm'
        }
    },
    {
        id: 'shot_2', 
        title: '角色近景',
        description: '介绍主角表情和反应',
        duration: 3,
        startTime: 5,
        endTime: 8,
        camera: {
            movement: 'Push',
            angle: 'Eye Level',
            shotSize: 'Close Up',
            speed: 'Slow'
        },
        content: {
            subject: '主角惊讶的表情',
            mood: '惊讶、期待',
            atmosphere: '人物特写，突出情绪'
        },
        style: {
            filmGenre: 'Thriller',
            lightingStyle: 'Dramatic',
            colorGrading: 'High Contrast'
        }
    },
    {
        id: 'shot_3',
        title: '中景对话',
        description: '角色间的互动对话',
        duration: 8,
        startTime: 8,
        endTime: 16,
        camera: {
            movement: 'Dolly',
            angle: 'Eye Level',
            shotSize: 'Medium Shot',
            speed: 'Normal'
        },
        content: {
            subject: '两人对话场景',
            mood: '紧张、神秘',
            atmosphere: '办公室环境，侧面拍摄'
        },
        style: {
            filmGenre: 'Crime',
            lightingStyle: 'Film Noir',
            colorGrading: 'Desaturated'
        }
    }
];

// 测试1: 验证镜头数据结构
console.log('📝 测试1: 验证镜头数据结构');
testShots.forEach((shot, index) => {
    console.log(`镜头 ${index + 1}: ${shot.title}`);
    console.log(`  时长: ${shot.duration}秒`);
    console.log(`  时间: ${shot.startTime}s - ${shot.endTime}s`);
    console.log(`  相机: ${shot.camera.movement}, ${shot.camera.angle}, ${shot.camera.shotSize}`);
    console.log(`  内容: ${shot.content.subject} | ${shot.content.mood}`);
    console.log(`  风格: ${shot.style.filmGenre} (${shot.style.lightingStyle})`);
    console.log('');
});

// 测试2: 生成AI提示词
console.log('🤖 测试2: 生成AI提示词');
testShots.forEach((shot, index) => {
    const cameraInfo = `camera ${shot.camera.movement}, ${shot.camera.angle}, ${shot.camera.shotSize}`;
    const contentInfo = `${shot.content.subject}, ${shot.content.mood}, ${shot.content.atmosphere}`;
    const styleInfo = `style ${shot.style.filmGenre}, ${shot.style.lightingStyle}, ${shot.style.colorGrading}`;
    
    const prompt = `${shot.title}: ${cameraInfo}, ${contentInfo}, ${styleInfo}`;
    console.log(`镜头 ${index + 1} 提示词: ${prompt}`);
    console.log('');
});

// 测试3: 验证导出功能
console.log('💾 测试3: 验证导出功能');
const exportData = {
    title: 'Video Prompt Gen 分镜导出',
    createdAt: new Date().toISOString(),
    duration: testShots.reduce((total, shot) => total + shot.duration, 0),
    shots: testShots.map((shot, index) => ({
        id: shot.id,
        order: index + 1,
        title: shot.title,
        description: shot.description,
        duration: shot.duration,
        startTime: shot.startTime,
        endTime: shot.endTime,
        camera: shot.camera,
        content: shot.content,
        style: shot.style
    })),
    prompts: testShots.map(shot => {
        const cameraInfo = `camera ${shot.camera.movement}, ${shot.camera.angle}, ${shot.camera.shotSize}`;
        const contentInfo = `${shot.content.subject}, ${shot.content.mood}, ${shot.content.atmosphere}`;
        return `${shot.title}: ${cameraInfo}, ${contentInfo}`;
    })
};

console.log(`总时长: ${exportData.duration}秒`);
console.log(`镜头数量: ${exportData.shots.length}`);
console.log(`导出时间: ${exportData.createdAt}`);
console.log('');

// 测试4: 验证导出文件
console.log('📁 测试4: 验证导出文件');
const exportFilePath = '/tmp/test_storyboard.json';
fs.writeFileSync(exportFilePath, JSON.stringify(exportData, null, 2));

// 验证文件是否创建成功
if (fs.existsSync(exportFilePath)) {
    const fileStats = fs.statSync(exportFilePath);
    console.log(`✅ 导出文件创建成功: ${exportFilePath}`);
    console.log(`📏 文件大小: ${(fileStats.size / 1024).toFixed(2)} KB`);
    
    // 验证文件内容
    const fileContent = JSON.parse(fs.readFileSync(exportFilePath, 'utf8'));
    console.log(`🔍 验证文件内容:`);
    console.log(`  - 标题: ${fileContent.title}`);
    console.log(`  - 时长: ${fileContent.duration}秒`);
    console.log(`  - 镜头数量: ${fileContent.shots.length}`);
    console.log(`  - 提示词数量: ${fileContent.prompts.length}`);
    
    // 验证最后一个镜头
    const lastShot = fileContent.shots[fileContent.shots.length - 1];
    console.log(`  - 最后镜头: ${lastShot.title} (${lastShot.duration}秒)`);
} else {
    console.log('❌ 导出文件创建失败');
}

console.log('\n🎉 多镜头生成和导出功能测试完成!');
console.log('\n🔧 测试建议:');
console.log('1. 在浏览器中访问 http://localhost:8000/test.html 运行界面测试');
console.log('2. 使用分镜编辑器创建并导出多镜头项目');
console.log('3. 检查导出的JSON文件是否包含完整的多镜头数据');