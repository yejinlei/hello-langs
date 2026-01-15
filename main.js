// Hello 编程语言网站主要JavaScript功能

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initP5Background();
    initCodeCarousel();
    initStatsCounter();
    initScrollAnimations();
    initLanguageSelector();
    initProgressTracker();
});

// 初始化页面动画
function initAnimations() {
    // 维特根斯坦部分动画（现在位于主标题上方，需要先显示）
    anime({
        targets: '#wittgenstein',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 300
    });
    
    // 主标题动画
    anime({
        targets: '#main-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 700
    });
    
    // 副标题动画
    anime({
        targets: '#subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 1100
    });
    
    // 按钮动画
    anime({
        targets: '#hero-buttons',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutExpo',
        delay: 1500
    });
    
    // 统计数据动画
    anime({
        targets: '#stats',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 1600
    });
}

// 初始化P5.js背景动画
function initP5Background() {
    const sketch = (p) => {
        let drops = [];
        let numDrops = 100;
        
        p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('p5-canvas-container');
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');
            
            // 创建代码雨
            for (let i = 0; i < numDrops; i++) {
                drops.push({
                    x: p.random(p.width),
                    y: p.random(-500, 0),
                    speed: p.random(2, 8),
                    length: p.random(10, 30),
                    opacity: p.random(50, 150)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            // 绘制代码雨
            p.fill(6, 182, 212, 100);
            p.textSize(14);
            p.textFont('monospace');
            
            for (let drop of drops) {
                // 绘制字符
                const chars = '01';
                const text = chars[Math.floor(p.random(chars.length))];
                p.text(text, drop.x, drop.y);
                
                // 更新位置
                drop.y += drop.speed;
                
                // 重置位置
                if (drop.y > p.height + 50) {
                    drop.y = p.random(-100, -50);
                    drop.x = p.random(p.width);
                }
            }
        };
        
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    };
    
    // 只在主页初始化P5背景
    if (document.getElementById('p5-canvas-container')) {
        new p5(sketch);
    }
}

// 初始化代码轮播
function initCodeCarousel() {
    if (document.getElementById('code-carousel')) {
        new Splide('#code-carousel', {
            type: 'loop',
            perPage: 1,
            autoplay: true,
            interval: 4000,
            arrows: false,
            pagination: true,
            gap: '2rem'
        }).mount();
    }
}

// 初始化统计数字计数器
function initStatsCounter() {
    const statsNumbers = document.querySelectorAll('.stats-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.dataset.count);
                const hasPlusSign = target.innerHTML.includes('+');
                
                anime({
                    targets: target,
                    innerHTML: [0, finalValue],
                    duration: 2000,
                    easing: 'easeOutExpo',
                    round: 1,
                    complete: function() {
                        if (hasPlusSign) {
                            target.innerHTML += '+';
                        }
                    }
                });
                
                observer.unobserve(target);
            }
        });
    });
    
    statsNumbers.forEach(stat => observer.observe(stat));
}

// 初始化滚动动画
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card-hover, .testimonial-card, .syntax-card, .resource-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 600,
                    easing: 'easeOutExpo',
                    delay: anime.stagger(100)
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// 初始化语言选择器
function initLanguageSelector() {
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLang = this.value;
            console.log('Language changed to:', selectedLang);
            
            // 这里可以添加语言切换逻辑
            showNotification('语言切换功能开发中...');
        });
    }
}

// 学习进度追踪器
const ProgressTracker = {
    // 初始化进度数据
    init: function() {
        const progress = localStorage.getItem('hello-programming-progress');
        if (!progress) {
            this.resetProgress();
        }
    },
    
    // 重置进度
    resetProgress: function() {
        const initialProgress = {
            chapters: {
                'variables': { completed: false, progress: 0 },
                'control-structures': { completed: false, progress: 0 },
                'functions': { completed: false, progress: 0 },
                'data-structures': { completed: false, progress: 0 },
                'oop': { completed: false, progress: 0 },
                'error-handling': { completed: false, progress: 0 },
                'file-operations': { completed: false, progress: 0 },
                'advanced': { completed: false, progress: 0 }
            },
            languages: {
                'python': { completed: false, exercises: 0 },
                'javascript': { completed: false, exercises: 0 },
                'java': { completed: false, exercises: 0 },
                'cpp': { completed: false, exercises: 0 },
                'go': { completed: false, exercises: 0 },
                'rust': { completed: false, exercises: 0 }
            },
            overallProgress: 0,
            totalRuns: 0,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('hello-programming-progress', JSON.stringify(initialProgress));
    },
    
    // 更新章节进度
    updateChapterProgress: function(chapterId, progress) {
        const progressData = JSON.parse(localStorage.getItem('hello-programming-progress'));
        progressData.chapters[chapterId] = {
            completed: progress >= 100,
            progress: Math.min(progress, 100),
            lastUpdated: new Date().toISOString()
        };
        
        // 计算总体进度
        const chapters = Object.values(progressData.chapters);
        const totalProgress = chapters.reduce((sum, chapter) => sum + chapter.progress, 0);
        progressData.overallProgress = Math.round(totalProgress / chapters.length);
        progressData.lastUpdated = new Date().toISOString();
        
        localStorage.setItem('hello-programming-progress', JSON.stringify(progressData));
        this.updateProgressUI();
    },
    
    // 更新语言进度
    updateLanguageProgress: function(language, exercisesCompleted) {
        const progressData = JSON.parse(localStorage.getItem('hello-programming-progress'));
        progressData.languages[language] = {
            completed: exercisesCompleted >= 10,
            exercises: exercisesCompleted,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('hello-programming-progress', JSON.stringify(progressData));
        this.updateProgressUI();
    },
    
    // 获取进度数据
    getProgress: function() {
        return JSON.parse(localStorage.getItem('hello-programming-progress'));
    },
    
    // 更新进度UI
    updateProgressUI: function() {
        const progressData = this.getProgress();
        const progressBars = document.querySelectorAll('.progress-fill');
        const progressTexts = document.querySelectorAll('.progress-text');
        
        progressBars.forEach(bar => {
            const chapterId = bar.dataset.chapter;
            if (chapterId && progressData.chapters[chapterId]) {
                const progress = progressData.chapters[chapterId].progress;
                bar.style.width = progress + '%';
            } else if (chapterId === 'overall') {
                bar.style.width = progressData.overallProgress + '%';
            }
        });
        
        progressTexts.forEach(text => {
            const chapterId = text.dataset.chapter;
            if (chapterId && progressData.chapters[chapterId]) {
                const progress = progressData.chapters[chapterId].progress;
                text.textContent = progress + '%';
            } else if (chapterId === 'overall') {
                text.textContent = progressData.overallProgress + '%';
            }
        });
    }
};

// 初始化进度追踪器
function initProgressTracker() {
    ProgressTracker.init();
}

// 语法高亮功能
const SyntaxHighlighter = {
    // 简单的语法高亮
    highlight: function(code, language) {
        // 这里可以实现更复杂的语法高亮逻辑
        // 目前只是简单的关键字着色
        const keywords = {
            python: ['def', 'if', 'else', 'elif', 'for', 'while', 'import', 'from', 'return', 'class', 'try', 'except', 'with', 'as'],
            javascript: ['function', 'if', 'else', 'for', 'while', 'return', 'var', 'let', 'const', 'class', 'extends', 'import', 'export', 'async', 'await'],
            java: ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'if', 'else', 'for', 'while', 'return', 'try', 'catch', 'throw'],
            cpp: ['int', 'float', 'double', 'char', 'void', 'if', 'else', 'for', 'while', 'return', 'class', 'struct', 'namespace', 'using', 'const', 'static', 'virtual'],
            go: ['func', 'if', 'else', 'for', 'range', 'return', 'var', 'const', 'type', 'struct', 'interface', 'import', 'package'],
            rust: ['fn', 'let', 'mut', 'if', 'else', 'for', 'while', 'loop', 'match', 'return', 'struct', 'enum', 'impl', 'trait', 'use']
        };
        
        if (!keywords[language]) return code;
        
        let highlightedCode = code;
        keywords[language].forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlightedCode = highlightedCode.replace(regex, `<span class="text-cyan-400">${keyword}</span>`);
        });
        
        return highlightedCode;
    }
};

// 代码执行模拟器
const CodeSimulator = {
    // 模拟执行Python代码
    runPython: function(code) {
        // 简单的Python代码模拟执行
        if (code.includes('print(')) {
            const match = code.match(/print\(["'](.*?)["']\)/);
            if (match) {
                return { output: match[1], success: true };
            }
        }
        
        if (code.includes('print')) {
            return { output: 'Hello, World!', success: true };
        }
        
        return { output: '程序执行完成', success: true };
    },
    
    // 模拟执行JavaScript代码
    runJavaScript: function(code) {
        // 简单的JavaScript代码模拟执行
        if (code.includes('console.log(')) {
            const match = code.match(/console\.log\(["'](.*?)["']\)/);
            if (match) {
                return { output: match[1], success: true };
            }
        }
        
        return { output: 'Hello, World!', success: true };
    },
    
    // 模拟执行Java代码
    runJava: function(code) {
        // 简单的Java代码模拟执行
        if (code.includes('System.out.println(')) {
            const match = code.match(/System\.out\.println\(["'](.*?)["']\)/);
            if (match) {
                return { output: match[1], success: true };
            }
        }
        
        return { output: 'Hello, World!', success: true };
    },
    
    // 模拟执行C++代码
    runCpp: function(code) {
        // 简单的C++代码模拟执行
        if (code.includes('cout <<')) {
            const match = code.match(/cout << ["'](.*?)["']/);
            if (match) {
                return { output: match[1], success: true };
            }
        }
        
        return { output: 'Hello, World!', success: true };
    },
    
    // 模拟执行Go代码
    runGo: function(code) {
        // 简单的Go代码模拟执行
        if (code.includes('fmt.Println(')) {
            const match = code.match(/fmt\.Println\(["'](.*?)["']\)/);
            if (match) {
                return { output: match[1], success: true };
            }
        }
        
        return { output: 'Hello, World!', success: true };
    },
    
    // 模拟执行Rust代码
    runRust: function(code) {
        // 简单的Rust代码模拟执行
        if (code.includes('println!(')) {
            const match = code.match(/println!\(["'](.*?)["']\)/);
            if (match) {
                return { output: match[1], success: true };
            }
        }
        
        return { output: 'Hello, World!', success: true };
    }
};

// 工具函数
const Utils = {
    // 生成随机数组
    generateRandomArray: function(size, min = 1, max = 100) {
        return Array.from({length: size}, () => Math.floor(Math.random() * (max - min + 1)) + min);
    },
    
    // 数组是否已排序
    isSorted: function(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    },
    
    // 格式化数字
    formatNumber: function(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },
    
    // 复制到剪贴板
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('代码已复制到剪贴板');
        }).catch(() => {
            showNotification('复制失败，请手动复制');
        });
    },
    
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 获取语言文件扩展名
    getFileExtension: function(language) {
        const extensions = {
            python: 'py',
            javascript: 'js',
            java: 'java',
            cpp: 'cpp',
            go: 'go',
            rust: 'rs',
            csharp: 'cs',
            swift: 'swift',
            kotlin: 'kt',
            dart: 'dart',
            ruby: 'rb',
            typescript: 'ts',
            c: 'c'
        };
        return extensions[language] || 'txt';
    }
};

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-cyan-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 导出全局函数
window.showNotification = showNotification;
window.ProgressTracker = ProgressTracker;
window.SyntaxHighlighter = SyntaxHighlighter;
window.CodeSimulator = CodeSimulator;
window.Utils = Utils;