// DOM元素获取
console.log("✅ script.js 加载成功！");
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const enterExhibition = document.getElementById('enter-exhibition');
const panorama = document.getElementById('panorama');
const panoramaImage = document.querySelector('.panorama-image');
const closeBtn = document.querySelector('.close-btn');
const markers = document.querySelectorAll('.marker');
const markerInfo = document.getElementById('marker-info');
const closeInfo = document.querySelector('.close-info');
const brickDoll = document.getElementById('brick-doll');
const knowledgePopup = document.getElementById('knowledge-popup');
const knowledgeContent = document.getElementById('knowledge-content');
const closeKnowledge = document.querySelector('.close-knowledge');
const guidePopup = document.getElementById('guide-popup');
const guideContent = document.getElementById('guide-content');
const closeGuide = document.querySelector('.close-guide');
const backToTop = document.getElementById('back-to-top');

// 导航栏切换
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 360°全景展厅
let isDragging = false;
let startX = 0;
let currentPosition = 0;

enterExhibition.addEventListener('click', () => {
    panorama.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    panorama.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// 鼠标拖动全景
panoramaImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

panoramaImage.addEventListener('mouseleave', () => {
    isDragging = false;
});

panoramaImage.addEventListener('mouseup', () => {
    isDragging = false;
});

panoramaImage.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.clientX - startX;
    currentPosition += deltaX;
    // 限制拖动范围，确保全景图始终可见
    const maxPosition = panoramaImage.offsetWidth - window.innerWidth;
    if (currentPosition > 0) currentPosition = 0;
    if (currentPosition < -maxPosition) currentPosition = -maxPosition;
    panoramaImage.style.transform = `translateX(${currentPosition}px)`;
    startX = e.clientX;
});

// 触摸拖动全景
panoramaImage.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});

panoramaImage.addEventListener('touchend', () => {
    isDragging = false;
});

panoramaImage.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.touches[0].clientX - startX;
    currentPosition += deltaX;
    // 限制拖动范围，确保全景图始终可见
    const maxPosition = panoramaImage.offsetWidth - window.innerWidth;
    if (currentPosition > 0) currentPosition = 0;
    if (currentPosition < -maxPosition) currentPosition = -maxPosition;
    panoramaImage.style.transform = `translateX(${currentPosition}px)`;
    startX = e.touches[0].clientX;
});

// 标注点点击事件
markers.forEach(marker => {
    marker.addEventListener('click', () => {
        const info = JSON.parse(marker.dataset.info);
        document.getElementById('info-title').textContent = info.title;
        document.getElementById('info-description').textContent = info.description;
        markerInfo.classList.add('active');
    });
});

closeInfo.addEventListener('click', () => {
    markerInfo.classList.remove('active');
});

// 砖雕小知识
const knowledgeList = [
    '临夏砖雕是中国非物质文化遗产之一。',
    '砖雕制作需要经过36道工序，每一道都需要精心操作。',
    '临夏砖雕与徽州砖雕并称中国砖雕艺术的南北双绝。',
    '砖雕作品通常采用青砖作为材料，因为青砖质地细腻，适合雕刻。',
    '传统砖雕技艺主要通过师徒传承的方式传递。',
    '临夏砖雕的题材广泛，包括人物、花卉、动物等。',
    '砖雕作品在建筑中主要用于装饰墙壁、门窗、屋脊等部位。',
    '现代砖雕艺术家正在探索将传统工艺与现代设计相结合的新途径。'
];

// 可互动砖雕小人
// 原始的点击事件功能
if (brickDoll) {
    // 确保砖雕小人始终可见
    brickDoll.style.display = 'block';
    brickDoll.style.zIndex = '9999';
    
    // 添加点击事件监听器
    brickDoll.addEventListener('click', (e) => {
        // 阻止默认行为和事件冒泡
        e.preventDefault();
        e.stopPropagation();
        
        console.log('砖雕小人被点击了！');
        
        // 显示砖雕小知识
        const randomKnowledge = knowledgeList[Math.floor(Math.random() * knowledgeList.length)];
        knowledgeContent.textContent = randomKnowledge;
        knowledgePopup.classList.add('active');
        
        // 确保知识弹窗可见（通过类控制，不使用内联样式）
        knowledgePopup.style.zIndex = '1100';
    });
}

closeKnowledge.addEventListener('click', (e) => {
    // 阻止事件冒泡
    e.stopPropagation();
    console.log('关闭按钮被点击了！');
    knowledgePopup.classList.remove('active');
    // 确保弹窗被隐藏
    knowledgePopup.style.display = 'none';
});

// 拖动砖雕小人
let isDraggingDoll = false;
let dollStartX = 0;
let dollStartY = 0;

brickDoll.addEventListener('mousedown', (e) => {
    isDraggingDoll = true;
    dollStartX = e.clientX - brickDoll.getBoundingClientRect().left;
    dollStartY = e.clientY - brickDoll.getBoundingClientRect().top;
    // 阻止model-viewer的默认行为
    e.stopPropagation();
});

window.addEventListener('mouseup', () => {
    isDraggingDoll = false;
});

window.addEventListener('mousemove', (e) => {
    if (!isDraggingDoll) return;
    e.preventDefault();
    const x = e.clientX - dollStartX;
    const y = e.clientY - dollStartY;
    brickDoll.style.left = `${x}px`;
    brickDoll.style.top = `${y}px`;
    brickDoll.style.bottom = 'auto';
    brickDoll.style.right = 'auto';
});

// 触摸拖动砖雕小人
brickDoll.addEventListener('touchstart', (e) => {
    isDraggingDoll = true;
    dollStartX = e.touches[0].clientX - brickDoll.getBoundingClientRect().left;
    dollStartY = e.touches[0].clientY - brickDoll.getBoundingClientRect().top;
    // 阻止model-viewer的默认行为
    e.stopPropagation();
});

window.addEventListener('touchend', () => {
    isDraggingDoll = false;
});

window.addEventListener('touchmove', (e) => {
    if (!isDraggingDoll) return;
    e.preventDefault();
    const x = e.touches[0].clientX - dollStartX;
    const y = e.touches[0].clientY - dollStartY;
    brickDoll.style.left = `${x}px`;
    brickDoll.style.top = `${y}px`;
    brickDoll.style.bottom = 'auto';
    brickDoll.style.right = 'auto';
});

// 页面滚动时的引导
const sections = document.querySelectorAll('.section');
let currentSection = '';

window.addEventListener('scroll', () => {
    // 显示/隐藏回到顶部按钮
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }

    // 检测当前滚动到的板块
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
            if (currentSection !== section.id) {
                currentSection = section.id;
                showGuide(currentSection);
            }
        }
    });
});

// 显示引导信息
function showGuide(sectionId) {
    let guideText = '';
    switch (sectionId) {
        case 'history':
            guideText = '这里介绍了临夏砖雕的历史渊源，从秦汉起源到明清鼎盛，展现了砖雕艺术的发展历程。';
            break;
        case 'craftsman':
            guideText = '这里展示了临夏砖雕的工匠精神，包括36道工序、选料、制坯、画稿、雕刻、打磨等环节。';
            break;
        case 'works':
            guideText = '这里展示了临夏砖雕的代表作品，包括红园、东公馆、八坊十三巷等，以及经典纹样。';
            break;
        case 'heritage':
            guideText = '这里介绍了临夏砖雕的传承与创新，包括师徒传承、学校教育、文创产品、3D扫描数字化等。';
            break;
        case 'contact':
            guideText = '这里提供了联系我们的方式，欢迎您了解更多关于临夏砖雕的信息。';
            break;
        default:
            guideText = '';
    }

    if (guideText) {
        guideContent.textContent = guideText;
        guidePopup.classList.add('active');
        
        // 自动关闭引导弹窗
        setTimeout(() => {
            guidePopup.classList.remove('active');
        }, 5000);
    }
}

closeGuide.addEventListener('click', () => {
    guidePopup.classList.remove('active');
});

// 回到顶部按钮
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // 关闭移动导航菜单
            navLinks.classList.remove('active');
        }
    });
});

// 作品卡片交互功能（合并翻转和放大）
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close-modal');
const workCards = document.querySelectorAll('.work-card');

// 为每个作品卡片添加点击事件
workCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. 执行3D翻转显示简介
        card.classList.toggle('flipped');
        
        // 2. 执行放大对应作品图片
        const cardImage = card.querySelector('.card-image');
        const imageUrl = window.getComputedStyle(cardImage).backgroundImage;
        // 提取URL
        const url = imageUrl.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
        
        // 设置模态框图片
        modalImage.src = url;
        // 显示模态框
        imageModal.style.display = 'block';
        // 禁止页面滚动
        document.body.style.overflow = 'hidden';
    });
});

// 关闭模态框
closeModal.addEventListener('click', () => {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 点击模态框背景关闭
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 初始化
window.addEventListener('DOMContentLoaded', () => {
    // 初始化页面
    console.log('临夏砖雕网页加载完成');
});

// 网页朗读 + 自动高亮
function readAndHighlight() {
  // 找到页面里所有正文段落（section 和 .card 下的 p 标签）
  const paragraphs = document.querySelectorAll("section p, .card p");

  if (paragraphs.length === 0) {
    alert("没找到可朗读的正文内容哦！");
    return;
  }

  let currentIndex = 0;
  const synth = window.speechSynthesis;

  // 停止之前可能在播放的语音
  synth.cancel();

  // 核心：逐段朗读 + 移动数字人
  function readNext() {
    // 读完所有段落就停止
    if (currentIndex >= paragraphs.length) {
      document.querySelectorAll(".highlight").forEach(el => el.classList.remove("highlight"));
      return;
    }

    // 1. 先拿到当前要读的段落
    const el = paragraphs[currentIndex];

    // 2. 让数字人跟着当前朗读段落移动
    const doll = document.getElementById('brick-doll');
    if (doll) {
      const rect = el.getBoundingClientRect();
      // 确保数字人不会消失，设置合理的位置
      const newTop = Math.max(20, rect.top + window.scrollY + rect.height / 2 - 230);
      doll.style.bottom = 'auto';
      
      doll.style.right = '20px';
      // 确保数字人始终可见
      doll.style.display = 'block';
      doll.style.zIndex = '9999';
      
      // 确保model-viewer正常显示
    }

    // 3. 页面平滑滚动到当前段落
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // 4. 原来的朗读 + 高亮逻辑
    const text = el.innerText.trim();
    document.querySelectorAll(".highlight").forEach(e => e.classList.remove("highlight"));
    el.classList.add("highlight");

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "zh-CN";
    utter.rate = 0.95;

    utter.onend = () => {
      currentIndex++;
      readNext(); // 读完自动读下一段
    };
    synth.speak(utter);
  }

  // 开始朗读
  readNext();
}

// 为砖雕小人添加朗读功能
if (brickDoll) {
  // 再添加一个点击事件监听器来处理朗读功能
  brickDoll.addEventListener("click", function(e) {
    // 执行朗读功能
    readAndHighlight();
  });
}