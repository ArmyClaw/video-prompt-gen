// Platform Export Test - 验证各平台导出格式正确
const fs = require('fs');
const path = require('path');

// 读取主应用文件
const appContent = fs.readFileSync('app.js', 'utf8');
const dataContent = fs.readFileSync('data.js', 'utf8');

console.log('=== Platform Export Test Started ===\n');

// 测试1: 验证平台映射完整性
function testPlatformMapping() {
    console.log('1. 测试平台映射完整性');
    
    // 从data.js中提取platformMapping
    const platformMappingMatch = dataContent.match(/const platformMapping = ({[\s\S]*?});/);
    if (!platformMappingMatch) {
        console.log('❌ platformMapping 未找到');
        return false;
    }
    
    let platformMapping;
    try {
        platformMapping = eval(`(${platformMappingMatch[1]})`);
    } catch (e) {
        console.log('❌ platformMapping 解析失败:', e.message);
        return false;
    }
    
    const requiredPlatforms = ['sora', 'kling', 'runway', 'veo', 'pika'];
    let allPlatformsExist = true;
    
    requiredPlatforms.forEach(platform => {
        if (platformMapping[platform]) {
            console.log(`✅ ${platform}: 存在`);
            checkPlatformConfig(platformMapping[platform], platform);
        } else {
            console.log(`❌ ${platform}: 缺失`);
            allPlatformsExist = false;
        }
    });
    
    return allPlatformsExist;
}

// 检查平台配置
function checkPlatformConfig(platform, name) {
    const requiredFields = ['name', 'maxTokens', 'promptTemplate', 'description'];
    let allFieldsExist = true;
    
    requiredFields.forEach(field => {
        if (platform[field] !== undefined) {
            console.log(`   ✅ ${field}: 存在`);
        } else {
            console.log(`   ❌ ${field}: 缺失`);
            allFieldsExist = false;
        }
    });
    
    // 验证promptTemplate是否为函数
    if (typeof platform.promptTemplate !== 'function') {
        console.log(`   ❌ promptTemplate: 不是函数`);
        allFieldsExist = false;
    }
    
    // 验证maxTokens为数字
    if (typeof platform.maxTokens !== 'number' || platform.maxTokens <= 0) {
        console.log(`   ❌ maxTokens: 无效值 ${platform.maxTokens}`);
        allFieldsExist = false;
    }
    
    return allFieldsExist;
}

// 测试2: 验证导出函数存在
function testExportFunction() {
    console.log('\n2. 测试导出函数');
    
    if (appContent.includes('exportStoryboard()')) {
        console.log('✅ exportStoryboard 函数存在');
        return true;
    } else {
        console.log('❌ exportStoryboard 函数不存在');
        return false;
    }
}

// 测试3: 验证promptTemplate生成功能
function testPromptTemplateGeneration() {
    console.log('\n3. 测试promptTemplate生成');
    
    // 从data.js中提取platformMapping
    const platformMappingMatch = dataContent.match(/const platformMapping = ({[\s\S]*?});/);
    if (!platformMappingMatch) {
        console.log('❌ 无法获取platformMapping');
        return false;
    }
    
    let platformMapping;
    try {
        platformMapping = eval(`(${platformMappingMatch[1]})`);
    } catch (e) {
        console.log('❌ platformMapping 解析失败:', e.message);
        return false;
    }
    
    // 模拟shot数据
    const testShot = {
        title: '测试镜头',
        duration: 10,
        camera: {
            movement: 'push',
            angle: 'eye level',
            shotSize: 'medium'
        },
        content: {
            subject: '人物',
            mood: 'happy',
            atmosphere: 'sunny'
        },
        style: 'cinematic'
    };
    
    let allTemplatesWork = true;
    
    Object.entries(platformMapping).forEach(([platformName, config]) => {
        try {
            const prompt = config.promptTemplate(testShot);
            console.log(`✅ ${platformName}: 生成成功 - "${prompt}"`);
            
            // 验证prompt不为空
            if (!prompt || prompt.trim().length === 0) {
                console.log(`   ❌ ${platformName}: 生成的prompt为空`);
                allTemplatesWork = false;
            }
            
            // 验证prompt包含基本元素
            if (!prompt.includes(testShot.title)) {
                console.log(`   ❌ ${platformName}: 生成的prompt缺少标题`);
                allTemplatesWork = false;
            }
            
        } catch (e) {
            console.log(`❌ ${platformName}: 生成失败 - ${e.message}`);
            allTemplatesWork = false;
        }
    });
    
    return allTemplatesWork;
}

// 测试4: 验证JSON导出结构
function testJSONExportStructure() {
    console.log('\n4. 测试JSON导出结构');
    
    // 验证是否有JSON生成代码
    if (appContent.includes('JSON.stringify')) {
        console.log('✅ JSON.stringify 存在');
        
        // 检查是否包含必要的导出字段
        const requiredExportFields = ['title', 'createdAt', 'duration', 'shots', 'prompts', 'metadata'];
        let allFieldsExist = true;
        
        requiredExportFields.forEach(field => {
            if (appContent.includes(field)) {
                console.log(`✅ ${field}: 存在`);
            } else {
                console.log(`❌ ${field}: 缺失`);
                allFieldsExist = false;
            }
        });
        
        return allFieldsExist;
    } else {
        console.log('❌ JSON.stringify 不存在');
        return false;
    }
}

// 运行所有测试
function runAllTests() {
    const testResults = [
        testPlatformMapping(),
        testExportFunction(),
        testPromptTemplateGeneration(),
        testJSONExportStructure()
    ];
    
    const passedTests = testResults.filter(result => result).length;
    const totalTests = testResults.length;
    
    console.log('\n=== 测试结果汇总 ===');
    console.log(`通过: ${passedTests}/${totalTests}`);
    
    if (passedTests === totalTests) {
        console.log('🎉 所有测试通过！平台导出格式正确。');
        return true;
    } else {
        console.log('⚠️ 部分测试失败，需要修复。');
        return false;
    }
}

// 执行测试
const allPassed = runAllTests();

// 退出状态码
process.exit(allPassed ? 0 : 1);