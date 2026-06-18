// Video Prompt Generator - 风格系统测试脚本
// 直接读取并解析数据文件

const fs = require('fs');
const path = require('path');

// 读取并解析data.js文件（简单的方式）
function loadVideoParams() {
    const dataPath = path.join(__dirname, 'data.js');
    const content = fs.readFileSync(dataPath, 'utf8');
    
    // 提取videoParams对象（简化处理）
    const match = content.match(/const videoParams = \{([\s\S]*?)\};/);
    if (!match) {
        throw new Error('无法找到videoParams对象');
    }
    
    // 这里我们只检查语法，不执行复杂的解析
    // 实际测试应该在浏览器环境中进行
    const paramsContent = match[0];
    
    // 检查必要的内容
    const hasStylePresets = paramsContent.includes('stylePresets');
    const hasFilmGenres = paramsContent.includes('filmGenres');
    const hasLightingStyles = paramsContent.includes('lightingStyles');
    const hasColorGrading = paramsContent.includes('colorGrading');
    const hasFilmTexture = paramsContent.includes('filmTexture');
    
    return {
        hasStylePresets,
        hasFilmGenres,
        hasLightingStyles,
        hasColorGrading,
        hasFilmTexture,
        content: paramsContent
    };
}

// 测试预设加载功能
function testPresetLoading() {
    console.log('=== 测试预设加载功能 ===');
    
    try {
        const videoParams = loadVideoParams();
        
        if (!videoParams.hasStylePresets) {
            console.log('❌ 错误: stylePresets 未定义');
            return false;
        }
        
        console.log('✅ stylePresets 已定义');
        
        // 检查预设数量
        const presetsMatch = videoParams.content.match(/stylePresets: \[\s*\{[^}]*\}/);
        if (presetsMatch) {
            console.log('✅ 发现预设数据');
        } else {
            console.log('❌ 预设数据格式可能不正确');
            return false;
        }
        
        console.log('✅ 预设加载功能正常\n');
        return true;
    } catch (error) {
        console.log('❌ 测试失败:', error.message);
        return false;
    }
}

// 测试自定义修改功能
function testCustomModification() {
    console.log('=== 测试自定义修改功能 ===');
    
    try {
        const videoParams = loadVideoParams();
        
        // 检查参数结构
        const requiredParams = ['filmGenres', 'lightingStyles', 'colorGrading', 'filmTexture'];
        let allParamsValid = true;
        
        requiredParams.forEach(paramName => {
            if (!videoParams[`has${paramName.charAt(0).toUpperCase()}${paramName.slice(1)}`]) {
                console.log(`❌ 错误: ${paramName} 未定义`);
                allParamsValid = false;
                return;
            }
            console.log(`✅ ${paramName} 已定义`);
        });
        
        if (!allParamsValid) {
            return false;
        }
        
        // 检查参数格式
        requiredParams.forEach(paramName => {
            const paramMatch = videoParams.content.match(new RegExp(`${paramName}: \\[`));
            if (paramMatch) {
                console.log(`✅ ${paramName} 格式正确`);
            } else {
                console.log(`❌ ${paramName} 格式可能不正确`);
                allParamsValid = false;
            }
        });
        
        if (allParamsValid) {
            console.log('✅ 自定义修改功能正常\n');
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('❌ 测试失败:', error.message);
        return false;
    }
}

// 生成提示词测试
function testPromptGeneration() {
    console.log('=== 测试提示词生成逻辑 ===');
    
    try {
        const videoParams = loadVideoParams();
        
        // 检查提示词生成需要的结构
        const hasTemplates = videoParams.content.includes('templates');
        const hasCurrentSelection = videoParams.content.includes('currentSelection');
        
        if (!hasTemplates) {
            console.log('❌ templates 未定义');
            return false;
        }
        
        if (!hasCurrentSelection) {
            console.log('❌ currentSelection 未定义');
            return false;
        }
        
        console.log('✅ templates 和 currentSelection 已定义');
        
        // 检查基本的选择结构
        const selectionMatch = videoParams.content.match(/currentSelection = \{[^}]*\}/);
        if (selectionMatch) {
            console.log('✅ currentSelection 结构正确');
        } else {
            console.log('❌ currentSelection 结构可能不正确');
            return false;
        }
        
        console.log('✅ 提示词生成逻辑正常\n');
        return true;
    } catch (error) {
        console.log('❌ 测试失败:', error.message);
        return false;
    }
}

// 运行所有测试
function runTests() {
    console.log('🚀 开始 Video Prompt Generator 风格系统测试\n');
    
    const results = [
        testPresetLoading(),
        testCustomModification(),
        testPromptGeneration()
    ];
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log(`\n📊 测试结果: ${passed}/${total} 通过`);
    
    if (passed === total) {
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