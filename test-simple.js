// 简单测试脚本，验证风格系统

const fs = require('fs');

// 检查data.js文件
function checkDataFile() {
    console.log('=== 检查 data.js 文件 ===');
    
    try {
        const content = fs.readFileSync('data.js', 'utf8');
        
        // 检查关键组件
        const components = {
            'stylePresets': content.includes('stylePresets: ['),
            'filmGenres': content.includes('filmGenres: ['),
            'lightingStyles': content.includes('lightingStyles: ['),
            'colorGrading': content.includes('colorGrading: ['),
            'filmTexture': content.includes('filmTexture: ['),
            'templates': content.includes('templates: ['),
            'currentSelection': content.includes('currentSelection = {')
        };
        
        let allGood = true;
        Object.entries(components).forEach(([name, exists]) => {
            if (exists) {
                console.log(`✅ ${name}: 存在`);
            } else {
                console.log(`❌ ${name}: 缺失`);
                allGood = false;
            }
        });
        
        return allGood;
    } catch (error) {
        console.log('❌ 无法读取 data.js:', error.message);
        return false;
    }
}

// 检查app.js文件
function checkAppFile() {
    console.log('\n=== 检查 app.js 文件 ===');
    
    try {
        const content = fs.readFileSync('app.js', 'utf8');
        
        // 检查关键功能
        const features = {
            'renderParameterSelectors': content.includes('renderParameterSelectors'),
            'updateResult': content.includes('updateResult'),
            'selectParameter': content.includes('selectParameter'),
            'selectTemplate': content.includes('selectTemplate'),
            'generatePromptFromParams': content.includes('generatePromptFromParams'),
            'generatePromptFromTemplate': content.includes('generatePromptFromTemplate'),
            'copyPrompt': content.includes('copyPrompt')
        };
        
        let allGood = true;
        Object.entries(features).forEach(([name, exists]) => {
            if (exists) {
                console.log(`✅ ${name}: 存在`);
            } else {
                console.log(`❌ ${name}: 缺失`);
                allGood = false;
            }
        });
        
        return allGood;
    } catch (error) {
        console.log('❌ 无法读取 app.js:', error.message);
        return false;
    }
}

// 检查HTML文件
function checkHTMLFile() {
    console.log('\n=== 检查 index.html 文件 ===');
    
    try {
        const content = fs.readFileSync('index.html', 'utf8');
        
        // 检查关键元素
        const elements = {
            'parameterGrid': content.includes('id="parameterGrid"'),
            'resultOutput': content.includes('id="resultOutput"'),
            'copyBtn': content.includes('class="copy-btn"'),
            'data.js引用': content.includes('src="data.js"'),
            'app.js引用': content.includes('src="app.js"')
        };
        
        let allGood = true;
        Object.entries(elements).forEach(([name, exists]) => {
            if (exists) {
                console.log(`✅ ${name}: 存在`);
            } else {
                console.log(`❌ ${name}: 缺失`);
                allGood = false;
            }
        });
        
        return allGood;
    } catch (error) {
        console.log('❌ 无法读取 index.html:', error.message);
        return false;
    }
}

// 创建一个简单的测试页面
function createTestPage() {
    console.log('\n=== 创建测试页面 ===');
    
    const testHTML = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Prompt Generator - 测试页面</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .test-result { margin: 10px 0; padding: 10px; border-radius: 5px; }
        .pass { background-color: #d4edda; color: #155724; }
        .fail { background-color: #f8d7da; color: #721c24; }
        button { padding: 10px 20px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
        #testOutput { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🎬 Video Prompt Generator - 功能测试</h1>
    
    <div>
        <button onclick="runTests()">运行测试</button>
        <button onclick="testPresets()">测试预设加载</button>
        <button onclick="testCustom()">测试自定义修改</button>
        <button onclick="testGeneration()">测试提示词生成</button>
    </div>
    
    <div id="testOutput"></div>
    
    <script src="data.js"></script>
    <script src="app.js"></script>
    <script>
        function log(message, type = 'info') {
            const output = document.getElementById('testOutput');
            const div = document.createElement('div');
            div.className = 'test-result ' + type;
            div.textContent = message;
            output.appendChild(div);
        }
        
        function runTests() {
            document.getElementById('testOutput').innerHTML = '';
            
            log('🚀 开始运行测试...', 'info');
            
            // 测试预设加载
            testPresets();
            
            // 测试自定义修改
            testCustom();
            
            // 测试提示词生成
            testGeneration();
            
            log('✅ 所有测试完成！', 'pass');
        }
        
        function testPresets() {
            log('=== 测试预设加载功能 ===', 'info');
            
            if (typeof videoParams !== 'undefined' && videoParams.stylePresets) {
                log(\`✅ 发现 \${videoParams.stylePresets.length} 个预设\`, 'pass');
                
                videoParams.stylePresets.forEach((preset, index) => {
                    if (preset.name && preset.filmGenre) {
                        log(\`✅ 预设 \${index}: \${preset.name}\`, 'pass');
                    } else {
                        log(\`❌ 预设 \${index} 结构不完整\`, 'fail');
                    }
                });
            } else {
                log('❌ stylePresets 未定义', 'fail');
            }
        }
        
        function testCustom() {
            log('=== 测试自定义修改功能 ===', 'info');
            
            if (typeof videoParams !== 'undefined') {
                const requiredParams = ['filmGenres', 'lightingStyles', 'colorGrading', 'filmTexture'];
                let allValid = true;
                
                requiredParams.forEach(param => {
                    if (videoParams[param] && Array.isArray(videoParams[param])) {
                        log(\`✅ \${param}: \${videoParams[param].length} 个选项\`, 'pass');
                    } else {
                        log(\`❌ \${param} 不存在或不是数组\`, 'fail');
                        allValid = false;
                    }
                });
                
                if (allValid) {
                    log('✅ 所有自定义参数都有效', 'pass');
                } else {
                    log('❌ 部分自定义参数无效', 'fail');
                }
            } else {
                log('❌ videoParams 未定义', 'fail');
            }
        }
        
        function testGeneration() {
            log('=== 测试提示词生成 ===', 'info');
            
            if (typeof currentSelection !== 'undefined') {
                log('✅ currentSelection 对象存在', 'pass');
                
                // 测试基本功能
                if (typeof updateResult === 'function') {
                    log('✅ updateResult 函数存在', 'pass');
                } else {
                    log('❌ updateResult 函数不存在', 'fail');
                }
                
                if (typeof generatePromptFromParams === 'function') {
                    log('✅ generatePromptFromParams 函数存在', 'pass');
                } else {
                    log('❌ generatePromptFromParams 函数不存在', 'fail');
                }
                
                if (typeof generatePromptFromTemplate === 'function') {
                    log('✅ generatePromptFromTemplate 函数存在', 'pass');
                } else {
                    log('❌ generatePromptFromTemplate 函数不存在', 'fail');
                }
            } else {
                log('❌ currentSelection 未定义', 'fail');
            }
        }
    </script>
</body>
</html>
`;
    
    fs.writeFileSync('test.html', testHTML);
    console.log('✅ 测试页面已创建: test.html');
    return true;
}

// 运行所有检查
function runChecks() {
    console.log('🚀 开始 Video Prompt Generator 系统检查\n');
    
    const results = [
        checkDataFile(),
        checkAppFile(),
        checkHTMLFile(),
        createTestPage()
    ];
    
    const passed = results.filter(r => r).length;
    const total = results.length;
    
    console.log(`\n📊 检查结果: ${passed}/${total} 通过`);
    
    if (passed === total) {
        console.log('🎉 所有检查通过！系统文件完整');
        return true;
    } else {
        console.log('❌ 部分检查失败');
        return false;
    }
}

// 如果直接运行此文件
if (require.main === module) {
    runChecks();
}