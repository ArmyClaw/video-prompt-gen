// 测试风格预设系统
const { videoParams } = require('./data.js');

console.log('=== 风格预设系统测试 ===\n');

// 测试1: 检查风格预设数据是否存在
console.log('1. 检查风格预设数据:');
console.log(`风格预设数量: ${videoParams.stylePresets.length}`);
console.log(`预设类别: ${[...new Set(videoParams.stylePresets.map(p => p.category))].join(', ')}\n`);

// 测试2: 检查各个风格预设
console.log('2. 检查各风格预设:');
videoParams.stylePresets.forEach((preset, index) => {
    console.log(`${index + 1}. ${preset.name} (${preset.category})`);
    console.log(`   描述: ${preset.description}`);
    console.log(`   关键元素: ${preset.keyElements.slice(0, 3).join(', ')}...`);
    console.log(`   色彩: ${preset.colorScheme}`);
    console.log(`   氛围: ${preset.mood}\n`);
});

// 测试3: 检查风格预设按类别分组
console.log('3. 按类别分组的风格预设:');
const presetsByCategory = {};
videoParams.stylePresets.forEach(preset => {
    if (!presetsByCategory[preset.category]) {
        presetsByCategory[preset.category] = [];
    }
    presetsByCategory[preset.category].push(preset.name);
});

Object.keys(presetsByCategory).forEach(category => {
    console.log(`${category}: ${presetsByCategory[category].join(', ')}`);
});

// 测试4: 检查特定的风格预设
console.log('\n4. 详细检查特定风格预设:');
const cyberpunk = videoParams.stylePresets.find(p => p.id === 'cyberpunk');
if (cyberpunk) {
    console.log('赛博朋克风格预设:');
    console.log(`- 名称: ${cyberpunk.name}`);
    console.log(`- 类别: ${cyberpunk.category}`);
    console.log(`- 描述: ${cyberpunk.description}`);
    console.log(`- 关键元素: ${cyberpunk.keyElements.join(', ')}`);
    console.log(`- 色彩方案: ${cyberpunk.colorScheme}`);
    console.log(`- 光影效果: ${cyberpunk.lighting}`);
    console.log(`- 氛围: ${cyberpunk.mood}`);
    console.log(`- 典型镜头: ${cyberpunk.typicalShots.join(', ')}`);
    console.log(`- 参考案例: ${cyberpunk.examples}`);
}

console.log('\n=== 测试完成 ===');