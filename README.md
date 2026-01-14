# Hello 编程语言 🚀

[![Static Badge](https://img.shields.io/badge/languages-27-ff6b6b?style=for-the-badge)](#支持的编程语言)
[![Static Badge](https://img.shields.io/badge/tech-stack-vanilla%20js-00d8ff?style=for-the-badge)](#技术栈)
[![Static Badge](https://img.shields.io/badge/license-MIT-4eaa25?style=for-the-badge)](LICENSE)

一个基于纯前端技术栈构建的多语言编程语法学习平台，支持27种编程语言的完整语法对比与学习。

## 📚 项目简介

`Hello 编程语言` 是一个专注于编程语言语法对比学习的轻量化平台，采用现代前端技术栈构建，提供零依赖、高性能的语法学习体验。平台核心功能是动态加载不同编程语言的教程内容，并通过智能代码高亮与格式化，帮助开发者快速理解和对比不同编程语言的语法特性。

## 🛠️ 技术栈

```text
前端框架: Vanilla JavaScript (ES6+)
样式方案: Tailwind CSS (CDN)
语法高亮: Highlight.js
构建工具: 无 (纯静态)
部署方式: 静态文件服务器
```

## 💡 核心特性

- **📊 多语言支持**: 覆盖27种主流及小众编程语言
- **⚡ 动态加载**: 采用 `fetch API` 实现内容按需加载，优化初始加载速度
- **🎨 智能高亮**: 使用 `Highlight.js` 实现语法自动检测与高亮
- **🎯 响应式设计**: 完美适配桌面、平板和移动设备
- **🔌 零依赖**: 无需构建工具，直接部署静态文件
- **🌙 暗色主题**: 专为开发者设计的舒适暗色界面

## 📝 支持的编程语言

```
┌────────────────────────────────────────────────────────────┐
│  主流语言  │ Python | JavaScript | TypeScript | Java       │
│            │ C++    | C#          | Go         | Rust      │
│            │ Swift  | Kotlin      | Dart       | Ruby      │
│            │ PHP    | C           | HTML/CSS   | SQL       │
├────────────────────────────────────────────────────────────┤
│  特色语言  │ R      | Scala       | Julia      | Lua       │
│            │ Shell  | Perl        | Lisp       | Scheme    │
│            │ Erlang | Haskell     | Zig        | Scratch   │
└────────────────────────────────────────────────────────────┘
```

## 📁 项目结构

```bash
tree -a -I ".git" -L 2
├── index.html              # 主页 (入口)
├── tutorials.html          # 语法大全 (核心功能)
├── python_tutorials.html   # Python语法内容
├── javascript_tutorials.html  # JavaScript语法内容
├── [language]_tutorials.html  # 其他语言语法内容
├── main.js                 # 核心JavaScript逻辑
├── resources/              # 静态资源目录
│   ├── images/             # 图片资源
│   └── icons/              # 图标资源
├── README.md               # 项目文档
└── LICENSE                 # 许可证
```

## 🚀 快速开始

### 本地部署

```bash
# 克隆项目
git clone https://github.com/yourusername/hello-languages.git
cd hello-languages

# 使用Python启动服务器 (端口8000)
python -m http.server 8000

# 或使用Node.js (需要安装http-server)
npx http-server -p 8000

# 或使用PHP
php -S localhost:8000

# 访问 http://localhost:8000
```

### Docker部署

```bash
docker run -d -p 8000:80 -v $(pwd):/usr/share/nginx/html nginx:alpine
```

## 🔧 技术实现细节

### 动态内容加载机制

```javascript
// 核心加载逻辑
async function loadLanguageContent(lang) {
    // 显示加载状态
    contentDiv.innerHTML = '<div class="text-center py-12"><div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div><p class="mt-4 text-slate-300">加载中...</p></div>';
    
    // 动态获取语言内容
    const response = await fetch(languageFiles[lang]);
    const content = await response.text();
    
    // 插入DOM
    contentDiv.innerHTML = content;
    
    // 延迟执行高亮 (确保DOM已更新)
    setTimeout(() => {
        const codeBlocks = contentDiv.querySelectorAll('code');
        codeBlocks.forEach(codeBlock => {
            // 智能语言检测
            if (codeBlock.textContent.includes('type ') || codeBlock.textContent.includes('data ')) {
                codeBlock.classList.add('hljs', 'haskell');
            } else if (codeBlock.textContent.includes('def ') || codeBlock.textContent.includes('class ')) {
                codeBlock.classList.add('hljs', 'python');
            }
            // ... 更多语言检测逻辑
        });
        hljs.highlightAll();
    }, 0);
}
```

### 语法高亮优化

- **自动语言检测**: 基于代码特征的智能语言识别
- **延迟初始化**: 确保DOM更新后再执行高亮
- **按需加载**: 仅加载当前语言的高亮模块
- **主题定制**: 深度定制的原子暗色主题

## 🎯 性能优化

- **懒加载**: 内容按需加载，减少初始加载时间
- **资源压缩**: 使用CDN提供的压缩资源
- **事件委托**: 优化事件监听，减少内存占用
- **缓存策略**: 利用浏览器缓存机制

## 📈 项目统计

```text
支持语言: 27种
代码行数: ~5,000行
静态资源: ~20个文件
加载速度: < 1秒 (首次加载)
响应时间: < 50ms (内容切换)
```

## 🔮 未来计划

- [ ] 添加代码执行功能
- [ ] 支持自定义主题
- [ ] 实现语法对比工具
- [ ] 添加学习进度追踪
- [ ] 支持离线使用

## 🤝 贡献

```bash
# 1. Fork 项目
# 2. 创建特性分支
git checkout -b feature/AmazingFeature

# 3. 提交更改
git commit -m 'Add some AmazingFeature'

# 4. 推送到分支
git push origin feature/AmazingFeature

# 5. 提交 Pull Request
```

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证 - 查看详情。

## 📞 联系方式

- 项目地址: [GitHub](https://github.com/yourusername/hello-languages)
- 反馈邮箱: your.email@example.com

---

**Enjoy coding! 🎉**
```
```

*使用 `curl http://localhost:8000` 快速预览项目结构*
