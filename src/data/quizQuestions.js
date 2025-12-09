// 问答题数据存储 - 按分类组织
export const quizQuestionsByCategory = {
    'HTML': [
        {
            id: 'html1',
            title: 'HTML5 新增的语义化标签',
            difficulty: 'Easy',
            category: 'HTML',
            question: `请列举 HTML5 中新增的语义化标签，并说明它们的作用。`,
            tags: ['HTML5', '语义化', '标签'],
            points: 10,
            referenceAnswer: `**HTML5 新增的语义化标签：**

1. **<header>**：定义页面或区域的头部
2. **<nav>**：定义导航链接
3. **<article>**：定义独立的内容
4. **<section>**：定义文档中的节
5. **<aside>**：定义侧边栏内容
6. **<footer>**：定义页面或区域的底部
7. **<main>**：定义文档的主要内容
8. **<figure>**：定义图片、图表等媒体内容
9. **<figcaption>**：定义 figure 的标题

**作用：**
- 提高代码可读性
- 有利于 SEO 优化
- 方便屏幕阅读器解析
- 便于维护和协作`,
            keywords: ['header', 'nav', 'article', 'section', 'aside', 'footer', 'main'],
            hints: [
                'header、nav、footer',
                'article、section、aside',
                '语义化有利于 SEO'
            ]
        },
        {
            id: 'html2',
            title: '块级元素和11行内元素的区别',
            difficulty: 'Easy',
            category: 'HTML',
            question: `请说明块级元素和行内元素的区别，并各举3个例子。`,
            tags: ['元素类型', '布局'],
            points: 10,
            referenceAnswer: `**区别：**

1. **显示方式**
   - 块级元素：独占一行
   - 行内元素：在同一行显示

2. **宽高设置**
   - 块级元素：可设置 width 和 height
   - 行内元素：不可设置 width 和 height

3. **内外边距**
   - 块级元素：margin 和 padding 都有效
   - 行内元素：水平方向有效，垂直方向无效

4. **包含关系**
   - 块级元素：可包含块级和行内元素
   - 行内元素：只能包含行内元素

**块级元素示例：** div、p、h1-h6、ul、ol、li
**行内元素示例：** span、a、img、strong、em`,
            keywords: ['块级元素', '行内元素', 'display', 'block', 'inline'],
            hints: [
                '独占一行 vs 不换行',
                '可设置宽高 vs 不可设置',
                '考虑包含关系'
            ]
        }
    ],
    'CSS': [
        {
            id: 'css1',
            title: 'CSS 盒模型',
            difficulty: 'Easy',
            category: 'CSS',
            question: `请解释 CSS 盒模型的组成部分，以及标准盒模型和 IE 盒模型的区别。`,
            tags: ['盒模型', '布局', '基础'],
            points: 10,
            referenceAnswer: `**盒模型组成：**
1. Content（内容）
2. Padding（内边距）
3. Border（边框）
4. Margin（外边距）

**区别：**
- 标准盒模型：width = content
- IE盒模型：width = content + padding + border`,
            hints: ['四个组成部分', 'box-sizing 属性']
        },
        {
            id: 'css2',
            title: 'BFC（块级格式化上下文）',
            difficulty: 'Medium',
            category: 'CSS',
            question: `请说明什么是 BFC（块级格式化上下文），如何触发 BFC，以及 BFC 的应用场景。`,
            tags: ['BFC', '布局', '格式化上下文'],
            points: 15,
            referenceAnswer: `**什么是 BFC：**

BFC（Block Formatting Context，块级格式化上下文）是 Web 页面中一个独立的渲染区域，内部元素的布局不会影响到外部元素。

**如何触发 BFC：**

1. **根元素**：html 元素
2. **浮动元素**：float 不为 none
3. **绝对定位元素**：position 为 absolute 或 fixed
4. **display 属性**：inline-block、table-cell、flex、grid 等
5. **overflow 属性**：不为 visible（如 hidden、auto、scroll）

**BFC 的特性和应用：**

1. **防止外边距重叠**
   \`\`\`css
   .container {
       overflow: hidden; /* 创建 BFC */
   }
   \`\`\`

2. **清除浮动**
   \`\`\`css
   .parent {
       overflow: hidden; /* 包含浮动子元素 */
   }
   \`\`\`

3. **防止文字环绕**
   \`\`\`css
   .sidebar { float: left; }
   .content { overflow: hidden; } /* 不被浮动元素覆盖 */
   \`\`\`

4. **自适应两栏布局**
   \`\`\`css
   .left { float: left; width: 200px; }
   .right { overflow: hidden; } /* 自适应剩余宽度 */
   \`\`\``,
            keywords: ['BFC', '格式化上下文', '浮动', 'overflow', '外边距重叠', '清除浮动'],
            hints: [
                'BFC 是独立的渲染区域',
                'overflow: hidden 可以触发',
                '可用于清除浮动',
                '防止 margin 重叠',
                '实现自适应布局'
            ]
        },
        {
            id: 'css3',
            title: 'Flex 布局',
            difficulty: 'Medium',
            category: 'CSS',
            question: `请说明 Flex 布局的主要属性及其作用。`,
            tags: ['Flex', '布局', '响应式'],
            points: 15,
            referenceAnswer: `**容器属性：**
1. flex-direction：主轴方向
2. justify-content：主轴对齐
3. align-items：交叉轴对齐
4. flex-wrap：换行

**项目属性：**
1. flex-grow：放大比例
2. flex-shrink：缩小比例
3. flex-basis：默认大小`,
            hints: ['容器属性 vs 项目属性', '主轴和交叉轴']
        },
        {
            id: 'css4',
            title: 'CSS 选择器优先级',
            difficulty: 'Medium',
            category: 'CSS',
            question: `请说明 CSS 选择器的优先级规则，以及如何计算优先级。`,
            tags: ['选择器', '优先级', '权重'],
            points: 15,
            referenceAnswer: `**优先级规则（从高到低）：**

1. **!important**：最高优先级
2. **内联样式**：style 属性（权重 1000）
3. **ID 选择器**：#id（权重 100）
4. **类、属性、伪类选择器**：.class、[attr]、:hover（权重 10）
5. **元素、伪元素选择器**：div、::before（权重 1）
6. **通配符、子选择器、相邻选择器**：*、>、+（权重 0）

**计算方法：**
- 统计各类选择器的数量
- 从左到右比较权重值
- 权重相同时，后定义的优先

**示例：**
\`\`\`css
div.class #id       /* 权重：100 + 10 + 1 = 111 */
.class1.class2      /* 权重：10 + 10 = 20 */
div p               /* 权重：1 + 1 = 2 */
\`\`\``,
            keywords: ['优先级', '权重', 'important', 'ID选择器', '类选择器'],
            hints: [
                '!important 最高',
                'ID > 类 > 元素',
                '权重可以累加',
                '后定义的覆盖先定义的'
            ]
        },
        {
            id: 'css5',
            title: 'CSS 清除浮动',
            difficulty: 'Medium',
            category: 'CSS',
            question: `为什么需要清除浮动？请说明浮动导致的问题，并列出至少三种常见的清除浮动方法。`,
            tags: ['清除浮动', '布局', 'float', 'BFC', 'clearfix'],
            points: 15,
            referenceAnswer: `**为什么需要清除浮动？**

浮动元素（float）会脱离标准文档流，导致父元素高度塌陷，使背景、边框无法包裹内容，并对后续布局产生影响。因此需要清除浮动，让父元素重新包含浮动子元素。

---

## **常见清除浮动的方法**

### **1. clearfix（伪元素清除浮动，最推荐）**

\`\`\`css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
\`\`\`

**优点：** 兼容性好、不影响布局结构  
**缺点：** 需要额外的类名  

---

### **2. overflow 触发 BFC**

\`\`\`css
.container {
  overflow: auto; /* 或 hidden */
}
\`\`\`

**优点：** 简单、无需额外标记  
**缺点：** overflow 可能隐藏溢出内容或产生滚动条  

---

### **3. display: flow-root（现代方案）**

\`\`\`css
.container {
  display: flow-root;
}
\`\`\`

**优点：** 最简洁，天然生成 BFC  
**缺点：** 不支持 IE（但现代浏览器支持良好）

---

### **4. 添加空元素清除浮动（不推荐）**

\`\`\`html
<div style="clear: both;"></div>
\`\`\`

**缺点：** 破坏语义、增加无意义 DOM

---

**总结**  
float 会导致父元素高度塌陷。最推荐的清除方式是 clearfix 或 flow-root，overflow 可用于简单场景，空元素清除方式已不常用。
`,
            keywords: ['浮动', '清除浮动', 'clearfix', 'overflow', 'flow-root'],
            hints: [
                '浮动会导致父元素高度塌陷',
                'clearfix 是最常用的解决方案',
                'overflow 会触发 BFC',
                'flow-root 是最现代的清除方式'
            ]
        },
        {
            id: 'css6',
            title: 'CSS 垂直居中的方案',
            difficulty: 'Easy',
            category: 'CSS',
            question: `常见的垂直居中方案有哪些？请至少列举三种常见的实现方式，并说明各自的优缺点。`,
            tags: ['垂直居中', '布局', 'flex', 'transform', 'grid'],
            points: 10,
            referenceAnswer: `## 常见的垂直居中方案

---

### **1. Flex 垂直居中（最常用）**
\`\`\`css
.parent {
  display: flex;
  align-items: center;
}
\`\`\`

**优点：** 简单、语义清晰、现代浏览器支持好  
**缺点：** IE9- 不支持

---

### **2. position + transform 垂直居中**
\`\`\`css
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
\`\`\`

**优点：** 精准控制位置，不依赖其他属性  
**缺点：** 父元素必须是定位元素；对响应式布局不如 flex 方便

---

### **3. line-height 垂直居中（仅适用于单行文本）**
\`\`\`css
.text {
  line-height: 200px; /* 等于父容器高度 */
}
\`\`\`

**优点：** 简单  
**缺点：** 只能用于单行文字，无法用于块级元素

---

### **4. Grid 垂直居中（现代方案）**
\`\`\`css
.parent {
  display: grid;
  place-items: center;
}
\`\`\`

**优点：** 最简洁，自动水平 + 垂直居中  
**缺点：** IE 不支持

---

### **5. table-cell 垂直居中（老旧方案）**
\`\`\`css
.parent {
  display: table-cell;
  vertical-align: middle;
}
\`\`\`

**优点：** 兼容性好（包括 IE）  
**缺点：** 破坏布局语义，不推荐用于现代项目

---

**总结**  
Flex 和 Grid 是当前最推荐的垂直居中方案，position+transform 更灵活，line-height 和 table-cell 属于旧方案，用于兼容性场景。
`,
            keywords: ['垂直居中', 'flex', 'transform', 'grid', 'line-height'],
            hints: [
                'flex 是最常用的方法',
                'position + transform 不依赖容器的高度',
                'grid 的 place-items 可以快速居中'
            ]
        },
        {
            "id": "css7",
            "title": "em / px / rem / vh / vw 单位的区别",
            "difficulty": "Easy",
            "category": "CSS",
            "question": "说说 em、px、rem、vh、vw 这些 CSS 单位的区别？请分别说明它们的定义、使用场景及注意事项。",
            "tags": ["CSS单位", "响应式", "布局", "em", "rem", "px", "vh", "vw"],
            "points": 10,
            "referenceAnswer": "## em / px / rem / vh / vw 的区别\n\n---\n\n### **1. px（像素）**\n- **定义**：绝对长度单位，1px 表示屏幕上的一个物理像素点（在标准分辨率下）。\n- **特点**：固定大小，不随其他元素变化。\n- **使用场景**：需要精确控制尺寸的场合，如边框、图标大小等。\n- **注意**：在高 DPI 屏幕上，浏览器可能会对 px 做缩放处理，但对用户缩放不敏感（不利于无障碍访问）。\n\n---\n\n### **2. em**\n- **定义**：相对单位，相对于**当前元素的字体大小**（若未设置，则继承自父元素）。\n- **公式**：1em = 当前元素的 font-size\n- **使用场景**：希望组件内部尺寸随自身字体大小缩放（如按钮内边距）。\n- **注意**：嵌套时会**逐层复合**（例如子元素的 1em 可能 ≠ 父元素的 1em），容易造成计算混乱。\n\n---\n\n### **3. rem（root em）**\n- **定义**：相对于**根元素（<html>）的字体大小**。\n- **公式**：1rem = html 元素的 font-size（默认通常为 16px）\n- **使用场景**：实现全局统一的响应式缩放（常用于布局、间距）。\n- **优点**：避免 em 的嵌套问题，便于维护；配合媒体查询可实现整体缩放。\n- **注意**：需确保 html 的 font-size 设置合理（有些项目设为 62.5% 以简化计算：1rem = 10px）。\n\n---\n\n### **4. vh（viewport height）**\n- **定义**：视口高度的 1/100。1vh = 视口高度的 1%。\n- **使用场景**：全屏布局、首屏 hero 区域、动态高度容器。\n- **注意**：移动端 Safari 地址栏显示/隐藏会影响视口高度，可能导致跳动。\n\n---\n\n### **5. vw（viewport width）**\n- **定义**：视口宽度的 1/100。1vw = 视口宽度的 1%。\n- **使用场景**：响应式字体大小（配合 clamp()）、全宽组件、横屏适配。\n- **技巧**：`font-size: calc(14px + 0.5vw);` 可实现平滑响应式文字。\n\n---\n\n### **总结对比**\n| 单位 | 基准 | 是否响应式 | 常见用途 |\n|------|------|-----------|--------|\n| px   | 屏幕像素 | 否 | 固定尺寸、边框 |\n| em   | 当前元素 font-size | 是（局部） | 组件内部比例 |\n| rem  | 根元素 font-size | 是（全局） | 布局、间距、响应式设计 |\n| vh   | 视口高度 | 是 | 全屏高度、动态容器 |\n| vw   | 视口宽度 | 是 | 响应式字体、全宽布局 |\n\n**最佳实践**：\n- 文字大小优先用 `rem` 或 `clamp()` + `vw`\n- 组件内间距可用 `em`\n- 全屏布局用 `vh/vw`\n- 避免在需要精确控制的场景（如图标）使用相对单位",
            "keywords": ["em", "rem", "px", "vh", "vw", "CSS单位", "响应式设计"],
            "hints": [
                "em 相对于当前元素字体大小，rem 相对于根元素",
                "vh 和 vw 基于视口尺寸，适合全屏布局",
                "px 是绝对单位，不随用户缩放而改变（部分浏览器例外）"
            ]
        },
        {
            id: 'css8',
            title: '两栏布局：左边定宽，右边自适应方案',
            difficulty: 'Easy',
            category: 'CSS',
            question: `如何实现两栏布局：左边定宽，右边自适应？请至少列举三种常见的实现方式，并说明各自的优缺点。`,
            tags: ['两栏布局', '布局', 'flex', 'float', 'grid'],
            points: 10,
            referenceAnswer: `## 两栏布局：左边定宽，右边自适应方案

---

### **1. Flex 布局（最推荐）**
\`\`\`css
.container {
  display: flex;
}
.left {
  width: 200px;
}
.right {
  flex: 1;
}
\`\`\`

**优点：** 代码简洁、语义清晰、易维护、响应式友好  
**缺点：** IE9- 不支持

---

### **2. Float + margin 布局（经典方案）**
\`\`\`css
.left {
  float: left;
  width: 200px;
}
.right {
  margin-left: 200px;
}
\`\`\`

**优点：** 兼容性好（支持 IE6+）  
**缺点：** 需要清除浮动；HTML 结构有顺序要求；不够语义化

---

### **3. Float + BFC 布局**
\`\`\`css
.left {
  float: left;
  width: 200px;
}
.right {
  overflow: hidden; /* 触发 BFC */
}
\`\`\`

**优点：** 不需要计算 margin 值；右侧自动适应  
**缺点：** 需要清除浮动；overflow 可能影响内容显示

---

### **4. Position 绝对定位**
\`\`\`css
.container {
  position: relative;
}
.left {
  position: absolute;
  width: 200px;
}
.right {
  margin-left: 200px;
}
\`\`\`

**优点：** 精确控制位置  
**缺点：** 脱离文档流；高度不易控制；不推荐用于常规布局

---

### **5. Grid 布局（现代方案）**
\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
}
\`\`\`

**优点：** 最简洁强大；适合复杂布局  
**缺点：** IE 不支持（IE10/11 需要前缀）

---

### **6. Calc 计算宽度**
\`\`\`css
.left {
  float: left;
  width: 200px;
}
.right {
  float: left;
  width: calc(100% - 200px);
}
\`\`\`

**优点：** 灵活计算宽度  
**缺点：** 需要清除浮动；calc 兼容性 IE9+

---

**总结**  
Flex 和 Grid 是现代项目的首选方案，Float + margin/BFC 适用于需要兼容老旧浏览器的场景。Position 方案不推荐用于常规两栏布局。
`,
            keywords: ['两栏布局', 'flex', 'float', 'grid', '自适应', 'BFC'],
            hints: [
                'flex 布局是最简单的方法',
                'float + margin 是经典的老方案',
                'grid 的 grid-template-columns 可以快速实现'
            ]
        }



    ],
    'JavaScript': [
        {
            id: 'q1',
            title: 'JavaScript 的数据类型有哪些？',
            difficulty: 'Easy',
            category: 'JavaScript',
            question: `请列举 JavaScript 中的所有数据类型，并简要说明每种类型的特点。`,
            tags: ['数据类型', '基础'],
            points: 10,
            referenceAnswer: `JavaScript 有 8 种数据类型：

**基本数据类型（7种）：**
1. **Number**：数字类型，包括整数和浮点数
2. **String**：字符串类型
3. **Boolean**：布尔类型，true/false
4. **Undefined**：未定义类型
5. **Null**：空类型
6. **Symbol**：符号类型（ES6新增）
7. **BigInt**：大整数类型（ES2020新增）

**引用数据类型（1种）：**
8. **Object**：对象类型，包括普通对象、数组、函数、日期等

**特点：**
- 基本类型存储在栈中，按值访问
- 引用类型存储在堆中，按引用访问
- 使用 typeof 可以检测大部分类型（但 null 会返回 'object'）`,
            keywords: ['Number', 'String', 'Boolean', 'Undefined', 'Null', 'Symbol', 'BigInt', 'Object'],
            hints: [
                '基本类型有7种',
                '引用类型主要是Object',
                'ES6新增了Symbol',
                'ES2020新增了BigInt'
            ]
        },
        {
            id: 'q2',
            title: '解释 JavaScript 的闭包（Closure）',
            difficulty: 'Medium',
            category: 'JavaScript',
            question: `什么是闭包？闭包的应用场景有哪些？请举例说明。`,
            tags: ['闭包', '作用域', '核心概念'],
            points: 15,
            referenceAnswer: `**闭包定义：**
闭包是指有权访问另一个函数作用域中变量的函数。简单说，就是函数嵌套函数，内部函数可以访问外部函数的变量。

**形成条件：**
1. 函数嵌套
2. 内部函数引用外部函数的变量
3. 内部函数被返回或传递到外部执行

**应用场景：**
1. **数据私有化**：模拟私有变量
2. **函数柯里化**：参数复用
3. **防抖节流**：保存定时器ID
4. **模块化**：创建私有作用域`,
            keywords: ['闭包', '作用域', '内部函数', '变量', '私有化'],
            hints: [
                '函数嵌套是关键',
                '内部函数访问外部变量',
                '可以实现数据私有化',
                '注意内存问题'
            ]
        },
        {
            id: 'q3',
            title: 'Promise 的三种状态及状态转换',
            difficulty: 'Medium',
            category: 'JavaScript',
            question: `请说明 Promise 的三种状态，以及状态之间如何转换？`,
            tags: ['Promise', '异步', '状态'],
            points: 15,
            referenceAnswer: `**Promise 的三种状态：**

1. **Pending（进行中）**
   - 初始状态
   - 既不是成功，也不是失败

2. **Fulfilled（已成功）**
   - 操作成功完成
   - 会调用 then 的第一个回调

3. **Rejected（已失败）**
   - 操作失败
   - 会调用 then 的第二个回调或 catch

**状态转换特点：**
1. **单向性**：状态只能从 Pending 转换为 Fulfilled 或 Rejected
2. **不可逆**：一旦状态改变，就不会再变
3. **唯一性**：只能转换一次`,
            keywords: ['Pending', 'Fulfilled', 'Rejected', 'resolve', 'reject', '状态转换'],
            hints: [
                '三种状态：pending、fulfilled、rejected',
                '状态转换是单向且不可逆的',
                'resolve 和 reject 只能执行一个'
            ]
        },
        {
            id: 'q4',
            title: 'var、let、const 的区别',
            difficulty: 'Easy',
            category: 'JavaScript',
            question: `请详细说明 var、let、const 三种变量声明方式的区别。`,
            tags: ['变量声明', 'ES6', '作用域'],
            points: 10,
            referenceAnswer: `**主要区别：**

1. **作用域**
   - var：函数作用域
   - let：块级作用域
   - const：块级作用域

2. **变量提升**
   - var：存在变量提升
   - let：不存在变量提升（暂时性死区）
   - const：不存在变量提升（暂时性死区）

3. **重复声明**
   - var：允许重复声明
   - let：不允许重复声明
   - const：不允许重复声明

4. **修改值**
   - var：可以修改
   - let：可以修改
   - const：不可修改（基本类型），对象属性可修改`,
            keywords: ['var', 'let', 'const', '作用域', '变量提升'],
            hints: [
                'var 是函数作用域',
                'let 和 const 是块级作用域',
                'const 声明的变量不能重新赋值'
            ]
        },
        {
            id: 'q5',
            title: '事件循环（Event Loop）机制',
            difficulty: 'Hard',
            category: 'JavaScript',
            question: `请详细解释 JavaScript 的事件循环机制。`,
            tags: ['Event Loop', '异步', '宏任务', '微任务'],
            points: 20,
            referenceAnswer: `**事件循环（Event Loop）：**
JavaScript 是单线程的，事件循环是实现异步的核心机制。

**执行顺序：**
1. 执行同步代码（执行栈）
2. 执行栈清空后，检查微任务队列
3. 执行所有微任务
4. 执行一个宏任务
5. 重复步骤 2-4

**常见宏任务：**
- setTimeout
- setInterval
- I/O
- UI rendering

**常见微任务：**
- Promise.then/catch/finally
- MutationObserver
- process.nextTick (Node.js)`,
            keywords: ['Event Loop', '宏任务', '微任务', 'Promise', 'setTimeout'],
            hints: [
                '同步代码先执行',
                '微任务优先于宏任务',
                'Promise.then 是微任务',
                'setTimeout 是宏任务'
            ]
        }
    ],
    'React': [
        {
            id: 'react1',
            title: 'React Hooks 的使用规则',
            difficulty: 'Medium',
            category: 'React',
            question: `请说明 React Hooks 的使用规则，以及为什么要遵守这些规则。`,
            tags: ['Hooks', '规则', 'React'],
            points: 15,
            referenceAnswer: `**Hooks 使用规则：**

1. **只在最顶层使用 Hooks**
   - 不要在循环、条件或嵌套函数中调用 Hooks

2. **只在 React 函数中调用 Hooks**
   - 在 React 函数组件中调用
   - 在自定义 Hook 中调用

**为什么要遵守：**

1. **保证调用顺序一致**
   - React 依赖 Hooks 调用顺序来管理状态
   - 多次渲染时必须保持相同顺序

2. **正确关联状态**
   - React 使用调用顺序将 Hooks 与组件状态关联
   - 顺序改变会导致状态混乱

**错误示例：**
\`\`\`javascript
// ❌ 错误：在条件中使用
if (condition) {
  const [state, setState] = useState(0);
}

// ❌ 错误：在循环中使用
for (let i = 0; i < 5; i++) {
  useEffect(() => {}, []);
}
\`\`\`

**正确示例：**
\`\`\`javascript
// ✅ 正确：在顶层使用
const [state, setState] = useState(0);
useEffect(() => {
  if (condition) {
    // 条件逻辑放在 Hook 内部
  }
}, [condition]);
\`\`\``,
            keywords: ['Hooks', 'useState', 'useEffect', '规则', '顺序'],
            hints: [
                '顶层调用',
                '不在循环和条件中使用',
                'React 依赖调用顺序',
                '保证每次渲染顺序一致'
            ]
        },
        {
            id: 'react2',
            title: 'useEffect 的使用场景',
            difficulty: 'Medium',
            category: 'React',
            question: `请说明 useEffect 的主要使用场景和注意事项。`,
            tags: ['useEffect', 'Hooks', '副作用'],
            points: 15,
            referenceAnswer: `**使用场景：**

1. **数据获取**
   - API 请求
   - 异步数据加载

2. **订阅/取消订阅**
   - WebSocket 连接
   - 事件监听器

3. **DOM 操作**
   - 手动修改 DOM
   - 第三方库集成

4. **定时器**
   - setTimeout
   - setInterval

**注意事项：**

1. **依赖数组的正确使用**
   - 空数组 []：只在挂载时执行
   - 不传数组：每次渲染都执行
   - [dep]：依赖变化时执行

2. **清理函数的返回**
   - 返回函数用于清理副作用
   - 组件卸载时执行

3. **避免无限循环**
   - 注意依赖项的选择
   - 避免在 useEffect 中更新依赖项`,
            keywords: ['useEffect', '副作用', '依赖数组', '清理函数'],
            hints: [
                '处理副作用',
                '依赖数组控制执行时机',
                '返回清理函数',
                '注意依赖项的选择'
            ]
        },
        {
            id: 'react3',
            title: 'React 组件通信方式',
            difficulty: 'Medium',
            category: 'React',
            question: `请列举 React 中常见的组件通信方式。`,
            tags: ['组件通信', 'props', 'context'],
            points: 15,
            referenceAnswer: `**React 组件通信方式：**

1. **Props（父 → 子）**
   - 最基本的通信方式
   - 单向数据流

2. **回调函数（子 → 父）**
   - 父组件传递函数给子组件
   - 子组件调用函数传递数据

3. **Context API（跨层级）**
   - 跨多层级传递数据
   - 避免 props drilling

4. **状态管理库（全局状态）**
   - Redux
   - Zustand
   - MobX

5. **Ref 传递（父 → 子）**
   - forwardRef
   - useImperativeHandle

6. **Event Bus（兄弟组件）**
   - 发布订阅模式
   - 适合简单场景`,
            keywords: ['props', 'context', 'redux', '组件通信', '回调函数'],
            hints: [
                'props 和回调函数',
                'Context API 跨层级',
                '状态管理库处理复杂场景',
                'Event Bus 适合兄弟组件'
            ]
        }
    ]
};

// 将分类数据转换为扁平的题目列表
export const quizQuestions = Object.values(quizQuestionsByCategory).flat();

// 根据ID获取问答题
export function getQuizById(id) {
    return quizQuestions.find(q => q.id === id);
}

// 获取所有问答题（不包含参考答案和关键词）
export function getAllQuizzes() {
    return quizQuestions.map(({ referenceAnswer, keywords, ...quiz }) => quiz);
}

// 根据分类获取问答题
export function getQuizzesByCategory(category) {
    return quizQuestionsByCategory[category] || [];
}
