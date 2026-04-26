// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 语言切换功能
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'zh'; // 默认中文

    // 切换语言函数
    function toggleLanguage() {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';

        // 更新按钮文本
        langToggle.textContent = currentLang === 'zh' ? '中文' : 'English';

        // 更新所有带有data属性的元素
        const elements = document.querySelectorAll('[data-zh][data-en]');
        elements.forEach(element => {
            element.textContent = currentLang === 'zh' ? element.dataset.zh : element.dataset.en;
        });

        // 更新导航菜单文字
        const navItems = document.querySelectorAll('.nav-menu a');
        navItems.forEach(item => {
            item.textContent = currentLang === 'zh' ? item.dataset.zh : item.dataset.en;
        });

        // 更新logo文字
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.textContent = currentLang === 'zh' ? logo.dataset.zh : logo.dataset.en;
        }

        // 保存语言偏好到本地存储
        localStorage.setItem('preferredLanguage', currentLang);
    }

    // 检查本地存储中的语言偏好
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
        langToggle.textContent = currentLang === 'zh' ? '中文' : 'English';

        // 应用保存的语言设置
        const elements = document.querySelectorAll('[data-zh][data-en]');
        elements.forEach(element => {
            element.textContent = currentLang === 'zh' ? element.dataset.zh : element.dataset.en;
        });

        const navItems = document.querySelectorAll('.nav-menu a');
        navItems.forEach(item => {
            item.textContent = currentLang === 'zh' ? item.dataset.zh : item.dataset.en;
        });

        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.textContent = currentLang === 'zh' ? logo.dataset.zh : logo.dataset.en;
        }
    }

    // 为语言切换按钮添加事件监听器
    langToggle.addEventListener('click', toggleLanguage);

    // 平滑滚动导航
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // 导航栏透明度变化
        const navbar = document.querySelector('.navbar');
        const scrollPosition = window.scrollY;

        if (scrollPosition > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        }
    });

    // 滚动时显示动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll(
        '.info-card, .timeline-item, .card, .project-card, .award-card, .skill-category, .interest-category, .note-card'
    );

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // 为项目卡片添加点击放大效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    // 添加页面加载动画
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + L 切换语言
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            toggleLanguage();
        }
    });
});

// 实用工具函数
const utils = {
    // 获取元素距离顶部的距离
    getOffsetTop: (element) => {
        let offsetTop = 0;
        while (element) {
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        return offsetTop;
    },

    // 节流函数
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // 防抖函数
    debounce: (func, delay) => {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        }
    }
};

// 性能优化：对滚动事件使用节流
window.addEventListener('scroll', utils.throttle(() => {
    // 视差滚动逻辑
}, 20));

// 页面可见性API - 优化后台标签页性能
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面隐藏时减少动画或暂停某些功能
        document.body.classList.add('paused');
    } else {
        // 页面可见时恢复功能
        document.body.classList.remove('paused');
    }
});