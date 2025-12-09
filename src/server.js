import express from 'express';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5001;

// 手动设置 CORS 头部（更可靠）1
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');

  // 处理 OPTIONS 预检请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json({ limit: '10mb' })); // 解析 JSON body
app.use(express.urlencoded({ extended: true })); // 解析 URL-encoded body

// 请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API 路由
app.use('/api', apiRoutes);

// 根路由
app.get('/', (req, res) => {
  res.json({
    message: 'JavaScript 手写题判题系统 API',
    version: '1.0.0',
    endpoints: {
      problems: 'GET /api/problems',
      problemDetail: 'GET /api/problems/:id',
      run: 'POST /api/run',
      judge: 'POST /api/judge',
      health: 'GET /api/health'
    }
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: '接口不存在'
  });
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({
    success: false,
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log('========================================');
  console.log('  JavaScript 手写题判题系统后端');
  console.log('========================================');
  console.log(`  服务器运行在: http://localhost:${PORT}`);
  console.log(`  API 文档: http://localhost:${PORT}/`);
  console.log(`  健康检查: http://localhost:${PORT}/api/health`);
  console.log(`  CORS 已启用: http://localhost:3000`);
  console.log('========================================');
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号,正在关闭服务器...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n收到 SIGINT 信号,正在关闭服务器...');
  process.exit(0);
});
