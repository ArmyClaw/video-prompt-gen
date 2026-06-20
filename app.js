// Video Prompt Generator - 应用主逻辑
// 导入参数数据和平台映射
const { videoParams, platformMapping } = videoParams;
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderParameterSelectors();
    updateResult();
    
    // 默认进入提示词生成模式
    switchMode('prompt');
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

// ======== 分镜编辑器功能 ========

// 全局变量
let currentMode = 'prompt';
let shots = [];
let selectedShot = null;
let shotIdCounter = 1;

// 切换模式
function switchMode(mode) {
    currentMode = mode;
    
    // 更新按钮状态
    document.getElementById('promptMode').classList.toggle('active', mode === 'prompt');
    document.getElementById('storyboardMode').classList.toggle('active', mode === 'storyboard');
    
    // 显示/隐藏对应的界面
    document.getElementById('promptSection').style.display = mode === 'prompt' ? 'block' : 'none';
    document.getElementById('storyboardSection').style.display = mode === 'storyboard' ? 'block' : 'none';
    document.getElementById('resultSection').style.display = mode === 'prompt' ? 'block' : 'none';
    
    if (mode === 'storyboard') {
        initializeStoryboard();
    }
}

// 初始化分镜编辑器
function initializeStoryboard() {
    // 初始化一些示例镜头
    if (shots.length === 0) {
        addNewShot('开场远景', 5, '建立场景氛围，展示城市规模');
        addNewShot('角色近景', 3, '介绍主角表情和反应');
        addNewShot('中景对话', 8, '角色间的互动对话');
    }
    
    renderShots();
    setupDragAndDrop();
}

// 添加新镜头
function addNewShot(title = '', duration = 5, description = '') {
    const shot = {
        id: `shot_${shotIdCounter++}`,
        title: title || `镜头${shotIdCounter - 1}`,
        description: description || '',
        duration: duration,
        startTime: shots.reduce((total, shot) => total + shot.duration, 0),
        camera: {
            movement: 'Static',
            angle: 'Eye Level',
            shotSize: 'Medium Shot',
            speed: 'Normal'
        },
        content: {
            subject: '',
            background: '',
            foreground: '',
            mood: '',
            atmosphere: ''
        },
        style: {
            filmGenre: 'Drama',
            lightingStyle: 'Natural',
            colorGrading: 'Neutral'
        }
    };
    
    shots.push(shot);
    renderShots();
    return shot;
}

// 渲染镜头
function renderShots() {
    const container = document.getElementById('videoShots');
    container.innerHTML = '';
    
    shots.forEach((shot, index) => {
        const shotElement = document.createElement('div');
        shotElement.className = 'shot';
        shotElement.draggable = true;
        shotElement.dataset.shotId = shot.id;
        shotElement.dataset.index = index;
        
        shotElement.innerHTML = `
            <div class="shot-title">${shot.title}</div>
            <div class="shot-duration">${shot.duration}s</div>
        `;
        
        shotElement.addEventListener('click', () => selectShot(shot.id));
        
        container.appendChild(shotElement);
    });
    
    updateTimeline();
}

// 选择镜头
function selectShot(shotId) {
    // 移除之前的选中状态
    document.querySelectorAll('.shot').forEach(el => el.classList.remove('selected'));
    
    // 添加新的选中状态
    const shotElement = document.querySelector(`[data-shot-id="${shotId}"]`);
    if (shotElement) {
        shotElement.classList.add('selected');
    }
    
    selectedShot = shots.find(shot => shot.id === shotId);
    showShotDetails(selectedShot);
}

// 显示镜头详情
function showShotDetails(shot) {
    const detailsContainer = document.getElementById('shotDetailsContent');
    
    if (!shot) {
        detailsContainer.innerHTML = '<p>选择一个镜头查看详情</p>';
        return;
    }
    
    detailsContainer.innerHTML = `
        <form id="shotDetailsForm" onsubmit="updateShotDetails(event)">
            <div class="form-group">
                <label for="shotTitle">标题</label>
                <input type="text" id="shotTitle" value="${shot.title}" required>
            </div>
            
            <div class="form-group">
                <label for="shotDuration">时长 (秒)</label>
                <input type="number" id="shotDuration" value="${shot.duration}" min="1" required>
            </div>
            
            <div class="form-group">
                <label for="shotDescription">描述</label>
                <textarea id="shotDescription" placeholder="镜头描述...">${shot.description}</textarea>
            </div>
            
            <div class="form-group">
                <label for="cameraMovement">相机运动</label>
                <select id="cameraMovement">
                    <option value="Static" ${shot.camera.movement === 'Static' ? 'selected' : ''}>静态</option>
                    <option value="Push" ${shot.camera.movement === 'Push' ? 'selected' : ''}>推</option>
                    <option value="Pull" ${shot.camera.movement === 'Pull' ? 'selected' : ''}>拉</option>
                    <option value="Pan" ${shot.camera.movement === 'Pan' ? 'selected' : ''}>摇</option>
                    <option value="Tilt" ${shot.camera.movement === 'Tilt' ? 'selected' : ''}>移</option>
                    <option value="Dolly" ${shot.camera.movement === 'Dolly' ? 'selected' : ''}>跟</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="cameraAngle">镜头角度</label>
                <select id="cameraAngle">
                    <option value="Eye Level" ${shot.camera.angle === 'Eye Level' ? 'selected' : ''}>平视</option>
                    <option value="Low Angle" ${shot.camera.angle === 'Low Angle' ? 'selected' : ''}>仰视</option>
                    <option value="High Angle" ${shot.camera.angle === 'High Angle' ? 'selected' : ''}>俯视</option>
                    <option value="Bird's Eye" ${shot.camera.angle === 'Bird\'s Eye' ? 'selected' : ''}>鸟瞰</option>
                    <option value="Dutch Angle" ${shot.camera.angle === 'Dutch Angle' ? 'selected' : ''}>荷兰角</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="shotSize">景别</label>
                <select id="shotSize">
                    <option value="Extreme Wide" ${shot.camera.shotSize === 'Extreme Wide' ? 'selected' : ''}>远景</option>
                    <option value="Wide Shot" ${shot.camera.shotSize === 'Wide Shot' ? 'selected' : ''}>全景</option>
                    <option value="Full Shot" ${shot.camera.shotSize === 'Full Shot' ? 'selected' : ''}>中远景</option>
                    <option value="Medium Shot" ${shot.camera.shotSize === 'Medium Shot' ? 'selected' : ''}>中景</option>
                    <option value="Close Up" ${shot.camera.shotSize === 'Close Up' ? 'selected' : ''}>近景</option>
                    <option value="Extreme Close Up" ${shot.camera.shotSize === 'Extreme Close Up' ? 'selected' : ''}>特写</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="subject">主体</label>
                <input type="text" id="subject" value="${shot.content.subject}" placeholder="画面主体...">
            </div>
            
            <div class="form-group">
                <label for="mood">氛围</label>
                <input type="text" id="mood" value="${shot.content.mood}" placeholder="氛围描述...">
            </div>
            
            <div class="form-group">
                <label for="atmosphere">环境</label>
                <input type="text" id="atmosphere" value="${shot.content.atmosphere}" placeholder="环境描述...">
            </div>
            
            <button type="submit">保存修改</button>
        </form>
    `;
}

// 更新镜头详情
function updateShotDetails(event) {
    event.preventDefault();
    
    if (!selectedShot) return;
    
    const form = document.getElementById('shotDetailsForm');
    const formData = new FormData(form);
    
    // 更新镜头数据
    selectedShot.title = document.getElementById('shotTitle').value;
    selectedShot.duration = parseInt(document.getElementById('shotDuration').value);
    selectedShot.description = document.getElementById('shotDescription').value;
    selectedShot.camera.movement = document.getElementById('cameraMovement').value;
    selectedShot.camera.angle = document.getElementById('cameraAngle').value;
    selectedShot.camera.shotSize = document.getElementById('shotSize').value;
    selectedShot.content.subject = document.getElementById('subject').value;
    selectedShot.content.mood = document.getElementById('mood').value;
    selectedShot.content.atmosphere = document.getElementById('atmosphere').value;
    
    // 重新渲染镜头
    renderShots();
    
    // 显示保存成功的提示
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '已保存!';
    submitBtn.style.background = '#48bb78';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
    }, 1500);
}

// 设置拖拽功能
function setupDragAndDrop() {
    const container = document.getElementById('videoShots');
    
    container.addEventListener('dragstart', function(e) {
        if (e.target.classList.contains('shot')) {
            e.target.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', e.target.innerHTML);
            e.dataTransfer.setData('shotIndex', e.target.dataset.index);
        }
    });
    
    container.addEventListener('dragend', function(e) {
        if (e.target.classList.contains('shot')) {
            e.target.style.opacity = '';
        }
    });
    
    container.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        const afterElement = getDragAfterElement(container, e.clientX);
        const dragging = document.querySelector('.dragging');
        
        if (afterElement == null) {
            container.appendChild(dragging);
        } else {
            container.insertBefore(dragging, afterElement);
        }
    });
    
    container.addEventListener('drop', function(e) {
        e.preventDefault();
        
        const draggedIndex = parseInt(e.dataTransfer.getData('shotIndex'));
        const dropTarget = e.target;
        
        // 找到放置目标的位置
        let targetIndex = parseInt(dropTarget.dataset.index);
        
        // 如果拖拽到空白区域，移动到末尾
        if (!dropTarget.classList.contains('shot')) {
            targetIndex = shots.length;
        }
        
        // 重新排列镜头
        if (draggedIndex !== targetIndex) {
            const draggedShot = shots[draggedIndex];
            shots.splice(draggedIndex, 1);
            shots.splice(targetIndex, 0, draggedShot);
            
            // 更新镜头的起始时间
            let currentTime = 0;
            shots.forEach((shot, index) => {
                shot.startTime = currentTime;
                currentTime += shot.duration;
            });
            
            renderShots();
        }
    });
}

// 获取拖拽后的位置
function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.shot:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// 更新时间线显示
function updateTimeline() {
    const timeline = document.getElementById('storyboardTimeline');
    let currentTime = 0;
    
    // 更新时间标签
    const timeLabels = timeline.querySelectorAll('.timeline-header .track-content');
    timeLabels.forEach((label, index) => {
        label.textContent = `${index * 10}s`;
    });
}

// 清空时间线
function clearTimeline() {
    if (confirm('确定要清空所有镜头吗？此操作不可恢复。')) {
        shots = [];
        shotIdCounter = 1;
        selectedShot = null;
        renderShots();
        showShotDetails(null);
    }
}

// 导出分镜
function exportStoryboard() {
    if (shots.length === 0) {
        alert('没有可导出的镜头！');
        return;
    }
    
    // 生成导出数据
    const exportData = {
        title: 'Video Prompt Gen 分镜导出',
        createdAt: new Date().toISOString(),
        duration: shots.reduce((total, shot) => total + shot.duration, 0),
        shots: shots.map((shot, index) => ({
            id: shot.id,
            order: index + 1,
            title: shot.title,
            description: shot.description,
            duration: shot.duration,
            startTime: shot.startTime,
            endTime: shot.startTime + shot.duration,
            camera: shot.camera,
            content: shot.content,
            style: shot.style
        })),
        prompts: shots.map(shot => {
            // 生成AI提示词
            const cameraInfo = `camera ${shot.camera.movement}, ${shot.camera.angle}, ${shot.camera.shotSize}`;
            const contentInfo = `${shot.content.subject}, ${shot.content.mood}, ${shot.content.atmosphere}`;
            return `${shot.title}: ${cameraInfo}, ${contentInfo}`;
        })
    };
    
    // 创建下载链接
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `storyboard_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    // 显示成功消息
    alert(`成功导出 ${shots.length} 个镜头的分镜数据！`);
}

// 多平台导出功能
function exportPlatformPrompts() {
    if (shots.length === 0) {
        alert('没有可导出的镜头！');
        return;
    }
    
    const selectedPlatform = document.getElementById('platformSelect').value;
    const platform = platformMapping[selectedPlatform];
    
    if (!platform) {
        alert('无效的平台选择！');
        return;
    }
    
    // 生成针对特定平台的提示词
    const platformData = {
        platform: platform.name,
        platformId: selectedPlatform,
        createdAt: new Date().toISOString(),
        totalDuration: shots.reduce((total, shot) => total + shot.duration, 0),
        shots: shots.map((shot, index) => {
            const prompt = platform.promptTemplate(shot);
            return {
                id: shot.id,
                order: index + 1,
                title: shot.title,
                duration: shot.duration,
                prompt: prompt,
                originalPrompt: generateOriginalPrompt(shot)
            };
        }),
        metadata: {
            maxTokens: platform.maxTokens,
            description: platform.description,
            totalPrompts: shots.length
        }
    };
    
    // 创建下载链接
    const dataStr = JSON.stringify(platformData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedPlatform}_prompts_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    // 显示成功消息
    alert(`成功导出 ${shots.length} 个镜头的${platform.name}提示词！`);
}

// 生成原始提示词的辅助函数
function generateOriginalPrompt(shot) {
    const cameraInfo = `camera ${shot.camera.movement}, ${shot.camera.angle}, ${shot.camera.shotSize}`;
    const contentInfo = `${shot.content.subject}, ${shot.content.mood}, ${shot.content.atmosphere}`;
    return `${shot.title}: ${cameraInfo}, ${contentInfo}${shot.style ? ', ' + shot.style : ''}`;
}