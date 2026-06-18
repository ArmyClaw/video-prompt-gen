// Video Prompt Generator - 应用主逻辑
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderParameterSelectors();
    updateResult();
}

// 渲染参数选择器
function renderParameterSelectors() {
    const parameterGrid = document.getElementById('parameterGrid');
    parameterGrid.innerHTML = '';

    // 渲染相机运动
    createParameterGroup('cameraMovement', '相机运动 (Camera Movement)', '📹');
    
    // 渲染镜头角度
    createParameterGroup('cameraAngle', '镜头角度 (Camera Angle)', '🎯');
    
    // 渲染景别
    createParameterGroup('shotSize', '景别 (Shot Size)', '📷');
    
    // 渲染运动速度
    createParameterGroup('movementSpeed', '运动速度 (Movement Speed)', '⚡');
    
    // 渲染模板
    createTemplateGroup('预设模板 (Templates)', '🎬');
}

// 创建参数组
function createParameterGroup(category, title, icon) {
    const parameterGrid = document.getElementById('parameterGrid');
    
    const group = document.createElement('div');
    group.className = 'parameter-group';
    
    const titleElement = document.createElement('h3');
    titleElement.innerHTML = `${icon} ${title}`;
    group.appendChild(titleElement);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'parameter-grid';
    
    const params = videoParams[category];
    params.forEach(param => {
        const option = document.createElement('div');
        option.className = 'param-option';
        option.setAttribute('data-category', category);
        option.setAttribute('data-value', param.value);
        
        const title = document.createElement('h4');
        title.textContent = `${param.name} (${param.type})`;
        
        const description = document.createElement('p');
        
        if (category === 'cameraMovement') {
            description.innerHTML = `${param.description}<br><small>场景: ${param.scenario}</small>`;
        } else if (category === 'cameraAngle') {
            description.innerHTML = `${param.effect}<br><small>心理: ${param.psychological}</small>`;
        } else if (category === 'shotSize') {
            description.innerHTML = `${param.ratio} - ${param.scenario}`;
        } else if (category === 'movementSpeed') {
            description.innerHTML = `${param.framerate} - ${param.emotional}`;
        }
        
        option.appendChild(title);
        option.appendChild(description);
        
        option.addEventListener('click', () => selectParameter(category, param, option));
        optionsContainer.appendChild(option);
    });
    
    group.appendChild(optionsContainer);
    parameterGrid.appendChild(group);
}

// 创建模板组
function createTemplateGroup(title, icon) {
    const parameterGrid = document.getElementById('parameterGrid');
    
    const group = document.createElement('div');
    group.className = 'parameter-group';
    
    const titleElement = document.createElement('h3');
    titleElement.innerHTML = `${icon} ${title}`;
    group.appendChild(titleElement);
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'template-grid';
    
    videoParams.templates.forEach(template => {
        const option = document.createElement('div');
        option.className = 'template-option';
        option.setAttribute('data-template', template.name);
        
        const name = document.createElement('h4');
        name.textContent = template.name;
        
        const style = document.createElement('p');
        style.innerHTML = `<strong>风格:</strong> ${template.style}<br><small>${template.description}</small>`;
        
        option.appendChild(name);
        option.appendChild(style);
        
        option.addEventListener('click', () => selectTemplate(template, option));
        optionsContainer.appendChild(option);
    });
    
    group.appendChild(optionsContainer);
    parameterGrid.appendChild(group);
}

// 选择参数
function selectParameter(category, param, element) {
    // 清除同组其他选中状态
    const group = element.parentElement;
    group.querySelectorAll('.param-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 选中当前项
    element.classList.add('selected');
    
    // 更新当前选择
    currentSelection[category] = param;
    currentSelection.template = null; // 选择具体参数时清除模板选择
    
    // 清除模板选中状态
    document.querySelectorAll('.template-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    updateResult();
}

// 选择模板
function selectTemplate(template, element) {
    // 清除其他模板选中状态
    document.querySelectorAll('.template-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 选中当前模板
    element.classList.add('selected');
    
    // 更新当前选择
    currentSelection.template = template;
    
    // 清除具体参数选中状态
    document.querySelectorAll('.param-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    updateResult();
}

// 更新结果输出
function updateResult() {
    const resultOutput = document.getElementById('resultOutput');
    
    if (currentSelection.template) {
        // 使用模板生成
        const template = currentSelection.template;
        const prompt = generatePromptFromTemplate(template);
        resultOutput.textContent = prompt;
        resultOutput.classList.remove('empty');
    } else if (currentSelection.cameraMovement || currentSelection.cameraAngle || 
               currentSelection.shotSize || currentSelection.movementSpeed) {
        // 使用自定义参数生成
        const prompt = generatePromptFromParams();
        resultOutput.textContent = prompt;
        resultOutput.classList.remove('empty');
    } else {
        // 空状态
        resultOutput.textContent = '请选择参数组合来生成提示词...';
        resultOutput.classList.add('empty');
    }
}

// 从模板生成提示词
function generatePromptFromTemplate(template) {
    const basePrompt = `AI视频提示词 - ${template.name}风格模板`;
    
    let detailedPrompt = `使用${template.name}模板生成视频提示词：
运动: ${template.movement}
角度: ${template.angle}
景别: ${template.shotSize}
速度: ${template.speed}
风格: ${template.style}

具体描述: ${template.description}

完整提示词:`;

    // 添加模板对应的具体参数值
    const movement = videoParams.cameraMovement.find(m => m.type === template.movement);
    const angle = videoParams.cameraAngle.find(a => a.type === template.angle);
    const shot = videoParams.shotSize.find(s => s.type === template.shotSize);
    const speed = videoParams.movementSpeed.find(s => s.type === template.speed);
    
    if (movement) detailedPrompt += `\n- ${movement.value}: ${movement.description}`;
    if (angle) detailedPrompt += `\n- ${angle.value}: ${angle.effect}`;
    if (shot) detailedPrompt += `\n- ${shot.value}: ${shot.scenario}`;
    if (speed) detailedPrompt += `\n- ${speed.value}: ${speed.emotional}`;
    
    return `${basePrompt}\n\n${detailedPrompt}`;
}

// 从参数生成提示词
function generatePromptFromParams() {
    let prompt = 'AI视频提示词:\n\n';
    let hasAnyParam = false;
    
    if (currentSelection.cameraMovement) {
        const movement = currentSelection.cameraMovement;
        prompt += `📹 相机运动: ${movement.value}\n`;
        prompt += `   描述: ${movement.description}\n`;
        prompt += `   适用场景: ${movement.scenario}\n\n`;
        hasAnyParam = true;
    }
    
    if (currentSelection.cameraAngle) {
        const angle = currentSelection.cameraAngle;
        prompt += `🎯 镜头角度: ${angle.value}\n`;
        prompt += `   视觉效果: ${angle.effect}\n`;
        prompt += `   心理影响: ${angle.psychological}\n\n`;
        hasAnyParam = true;
    }
    
    if (currentSelection.shotSize) {
        const shot = currentSelection.shotSize;
        prompt += `📷 景别: ${shot.value}\n`;
        prompt += `   画面比例: ${shot.ratio}\n`;
        prompt += `   适用场景: ${shot.scenario}\n\n`;
        hasAnyParam = true;
    }
    
    if (currentSelection.movementSpeed) {
        const speed = currentSelection.movementSpeed;
        prompt += `⚡ 运动速度: ${speed.value}\n`;
        prompt += `   帧率: ${speed.framerate}\n`;
        prompt += `   情绪效果: ${speed.emotional}\n\n`;
        hasAnyParam = true;
    }
    
    if (!hasAnyParam) {
        prompt += '请至少选择一个参数...';
    }
    
    return prompt;
}

// 复制提示词
function copyPrompt() {
    const resultOutput = document.getElementById('resultOutput');
    const promptText = resultOutput.textContent;
    
    if (promptText && !promptOutput.classList.contains('empty')) {
        navigator.clipboard.writeText(promptText).then(() => {
            const copyBtn = document.querySelector('.copy-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '已复制!';
            copyBtn.style.background = '#48bb78';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制');
        });
    }
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c') {
            e.preventDefault();
            copyPrompt();
        }
    }
});