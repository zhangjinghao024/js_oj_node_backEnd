# JavaScript 手写题判题系统 - 后端

基于 Node.js + Express 开发的 JavaScript 手写题在线判题系统后端服务。

## 技术栈

- **Node.js 18+** - 运行环境
- **Express** - Web 框架
- **VM2** - 代码沙箱执行引擎
- **CORS** - 跨域支持

## 功能特性

- ✅ 题目管理(增删改查)
- ✅ 代码安全执行(沙箱隔离)
- ✅ 多测试用例支持
- ✅ 示例运行 vs 完整提交
- ✅ 详细的测试结果反馈
- ✅ 支持同步和异步测试
- ✅ 代码安全性检查
- ✅ 执行超时控制

## 项目结构

```
src/
├── data/
│   └── problems.js          # 题目数据
├── engine/
│   └── executor.js          # 代码执行引擎
├── services/
│   └── judgeService.js      # 判题服务
├── routes/
│   └── api.js               # API 路由
└── server.js                # 主服务器文件
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
# 开发模式(自动重启)
npm run dev

# 生产模式
npm start
```

服务器将在 http://localhost:5000 启动

### 3. 测试 API

```bash
# 健康检查
curl http://localhost:5000/api/health

# 获取题目列表
curl http://localhost:5000/api/problems
```

## API 接口文档

### 1. 获取题目列表

```
GET /api/problems
```

**响应示例:**
```json
{
  "success": true,
  "problems": [
    {
      "id": "1",
      "title": "两数之和",
      "difficulty": "Easy",
      "description": "...",
      "examples": [...],
      "constraints": [...],
      "template": "..."
    }
  ]
}
```

### 2. 获取题目详情

```
GET /api/problems/:id
```

**响应示例:**
```json
{
  "success": true,
  "problem": {
    "id": "1",
    "title": "两数之和",
    "difficulty": "Easy",
    ...
  }
}
```

### 3. 运行代码(示例测试)

```
POST /api/run
Content-Type: application/json

{
  "problemId": "1",
  "code": "function twoSum(nums, target) { ... }"
}
```

**响应示例:**
```json
{
  "success": true,
  "status": "Accepted",
  "message": "示例测试: 通过 2/2 个测试用例",
  "passedTests": 2,
  "totalTests": 2,
  "testResults": [
    {
      "passed": true,
      "input": { "nums": [2,7,11,15], "target": 9 },
      "expected": [0,1],
      "actual": [0,1],
      "executionTime": 5
    }
  ]
}
```

### 4. 提交代码(完整测试)

```
POST /api/judge
Content-Type: application/json

{
  "problemId": "1",
  "code": "function twoSum(nums, target) { ... }"
}
```

**响应示例:**
```json
{
  "success": true,
  "status": "Accepted",
  "message": "恭喜!通过所有测试用例!",
  "passedTests": 4,
  "totalTests": 4,
  "testResults": [...]
}
```

### 5. 获取题目统计

```
GET /api/problems/:id/stats
```

### 6. 健康检查

```
GET /api/health
```

## 判题状态说明

- **Accepted** - 通过所有测试用例
- **Wrong Answer** - 答案错误
- **Runtime Error** - 运行时错误
- **Time Limit Exceeded** - 超时
- **Error** - 系统错误

## 代码安全性

系统使用 VM2 沙箱执行用户代码,并进行以下安全检查:

1. ✅ 禁止 `require`、`import` 等模块导入
2. ✅ 禁止 `eval`、`Function` 等动态代码执行
3. ✅ 禁止访问 `process`、`fs` 等系统 API
4. ✅ 5秒执行超时限制
5. ✅ 隔离的沙箱环境

## 添加新题目

编辑 `src/data/problems.js`,按以下格式添加:

```javascript
{
  id: '6',
  title: '题目名称',
  difficulty: 'Easy' | 'Medium' | 'Hard',
  description: '题目描述',
  examples: [
    {
      input: '输入示例',
      output: '输出示例',
      explanation: '解释说明'
    }
  ],
  constraints: ['约束条件1', '约束条件2'],
  hints: ['提示1', '提示2'],
  template: '代码模板',
  testCases: [
    {
      input: { /* 输入参数 */ },
      expected: /* 预期输出 */
    }
  ],
  sampleTestCases: [0, 1], // 示例测试用例索引
  functionName: '函数名',
  isAsync: false // 是否异步测试
}
```

## 支持的题目类型

### 1. 同步函数
- 数组操作(两数之和、去重、扁平化等)
- 字符串处理
- 对象操作(深拷贝等)

### 2. 异步函数
- 防抖(debounce)
- 节流(throttle)
- Promise 相关

## 环境变量

创建 `.env` 文件(可选):

```env
PORT=5000
NODE_ENV=development
```

## 性能优化建议

1. 使用 Redis 缓存题目数据
2. 限流防止滥用
3. 增加代码长度限制
4. 使用消息队列处理判题请求
5. 部署多个判题服务实例

## 故障排查

### 问题: VM2 安装失败

**解决方案:**
```bash
# 使用 Node.js 18 或更低版本
nvm install 18
nvm use 18
npm install
```

### 问题: 跨域错误

**解决方案:**
- 确保 CORS 中间件已启用
- 检查前端代理配置

### 问题: 代码执行超时

**解决方案:**
- 调整 `executor.js` 中的 timeout 参数
- 优化测试用例复杂度

## 部署建议

### 使用 PM2

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start src/server.js --name js-judge-backend

# 查看日志
pm2 logs js-judge-backend

# 重启服务
pm2 restart js-judge-backend
```

### 使用 Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

## 测试建议

使用 Postman 或 curl 测试 API:

```bash
# 测试运行代码
curl -X POST http://localhost:5000/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "1",
    "code": "function twoSum(nums, target) { const map = new Map(); for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (map.has(complement)) { return [map.get(complement), i]; } map.set(nums[i], i); } return []; }"
  }'
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request!
