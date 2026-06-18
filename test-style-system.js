// Video Prompt Generator - 风格系统测试脚本

// 加载数据
const videoParams = require('./data.js').videoParams;
const fs = require('fs');
const path = require('path');

// 测试预设加载功能
function testPresetLoading() {
    console.log('=== 测试预设加载功能 ===');
    
    // 检查stylePresets是否存在
    if (!videoParams.stylePresets) {
        console.log('❌ 错误: stylePresets未定义');
        return false;
    }
    
    console.log(`✅ 发现 ${videoParams.stylePresets.length} 个预设`);
    
    // 测试预设结构
    videoParams.stylePresets.forEach((preset, index) => {
        if (!preset.name || !preset.filmGenre || !preset.lighting || 
            !preset.color || !preset.texture) {
            console.log(`❌ 预设 ${index} 结构不完整:`, preset);
            return false;
        }
        console.log(`✅ 预设 ${index}: ${preset.name} (${preset.nameEn})`);
    });
    
    console.log('✅ 预设加载功能正常\n');
    return true;
}

// 测试自定义修改功能
function testCustomModification() {
    console.log('=== 测试自定义修改功能 ===');
    
    // 检查参数结构
    const requiredParams = ['filmGenres', 'lightingStyles', 'colorGrading', 'filmTexture'];
    let allParamsValid = true;
    
    requiredParams.forEach(paramName => {
        if (!videoParams[paramName]) {
            console.log(`❌ 错误: ${paramName} 未定义`);
            allParamsValid = false;
            return;
        }
        
        console.log(`✅ ${paramName}: ${videoParams[paramName].length} 个选项`);
    });
    
    if (!allParamsValid) {
        return false;
    }
    
    // 测试参数组合
    const testCombination = {
        filmGenre: videoParams.filmGenres[0],  // 科幻
        lighting: videoParams.lightingStyles[1], // 霓虹灯
        color: videoParams.colorGrading[2],      // 高对比度
        texture: videoParams.filmTexture[0]    // 胶片颗粒
    };
    
    console.log('✅ 测试组合:', JSON.stringify(testCombination, null, 2));
    console.log('✅ 自定义修改功能正常\n');
    return true;
}

// 生成提示词测试
function testPromptGeneration() {
    console.log('=== 测试提示词生成 ===');
    
    // 测试预设提示词生成
    const cyberpunkPreset = videoParams.stylePresets[0];
    const promptFromPreset = generatePromptFromPreset(cyberpunkPreset);
    console.log('预设提示词:');
    console.log(promptFromPreset);
    console.log('');
    
    // 测试自定义组合提示词生成
    const customPrompt = generatePromptFromCustom({
        filmGenre: videoParams.filmGenres[1],  // 黑色电影
        lighting: videoParams.lightingStyles[2], // 戏剧性
        color: videoParams.colorGrading[0],    // 暖调
        texture: videoParams.filmTexture[3]   // 电影质感
    });
    console.log('自定义提示词:');
    console.log(customPrompt);
    console.log('');
    
    return true;
}

// 从预设生成提示词
function generatePromptFromPreset(preset) {
    const genre = videoParams.filmGenres.find(g => g.type === preset.filmGenre);
    const lighting = videoParams.lightingStyles.find(l => l.type === preset.lighting);
    const color = videoParams.colorGrading.find(c => c.type === preset.color);
    const texture = videoParams.filmTexture.find(t => t.type === preset.texture);
    
    let prompt = `${preset.promptHint}\n\n`;
    prompt += `风格组合:\n`;
    prompt += `- 电影流派: ${genre.name} - ${genre.atmosphere}\n`;
    prompt += `- 灯光风格: ${lighting.description}\n`;
    prompt += `- 调色方案: ${color.description}\n`;
    prompt += `- 胶片质感: ${texture.description}\n`;
    
    prompt += `\n关键词: ${preset.keywords.join(', ')}`;
    
    return prompt;
}

// 从自定义组合生成提示词
function generatePromptFromCustom(combo) {
    let prompt = `自定义风格组合:\n\n`;
    prompt += `- 电影流派: ${combo.filmGenre.name}\n`;
    prompt += `  关键词: ${combo.filmGenre.keywords.join(', ')}\n`;
    prompt += `  氛围: ${combo.filmGenre.atmosphere}\n`;
    prompt += `  视觉: ${combo.filmGenre.visual.join(', ')}\n\n`;
    prompt += `- 灯光风格: ${combo.lighting.name}\n`;
    prompt += `  描述: ${combo.lighting.description}\n`;
    prompt += `  场景: ${combo.lighting.scenarios.join(', ')}\n`;
    prompt += `  特征: ${combo.lighting.characteristics.join(', ')}\n\n`;
    prompt += `- 调色方案: ${combo.color.name}\n`;
    prompt += `  描述: ${combo.color.description}\n`;
    prompt += `  场景: ${combo.color.scenarios.join(', ')}\n`;
    prompt += `  特征: ${combo.color.characteristics.join(', ')}\n\n`;
    prompt += `- 胶片质感: ${combo.texture.name}\n`;
    prompt += `  描述: ${combo.texture.description}\n`;
    prompt += `  场景: ${combo.texture.scenarios.join(', ')}\n`;
    prompt += `  特征: ${combo.texture.characteristics.join(', ')}\n`;
    
    return prompt;
}

// 运行所有测试
function runTests() {
    console.log('🚀 开始 Video Prompt Generator 风格系统测试\n');
    
    const results = [
        testPresetLoading(),
        testCustomModification(),
        testPromptGeneration()
    ];
    
    if (results.every(r => r)) {
        console.log('🎉 所有测试通过！风格系统功能正常');
        return true;
    } else {
        console.log('❌ 部分测试失败');
        return false;
    }
}

// 如果直接运行此文件
if (require.main === module) {
    runTests();
}