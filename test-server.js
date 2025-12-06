import express from 'express';

const app = express();
const PORT = 5000;

// 最简单的CORS设置 - 允许所有来源
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());

// 测试路由
app.get('/api/test', (req, res) => {
  console.log('收到测试请求！');
  res.json({ message: 'CORS 工作正常！', timestamp: new Date().toISOString() });
});

app.get('/api/problems', (req, res) => {
  console.log('收到获取题目请求！');
  res.json({
    success: true,
    problems: [
      {
        id: '1',
        title: '两数之和',
        difficulty: 'Easy',
        description: '给定一个整数数组 nums 和一个整数目标值 target...',
        template: 'function twoSum(nums, target) {\n  // 你的代码\n}'
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log('========================================');
  console.log('  🚀 测试服务器启动成功！');
  console.log(`  📍 http://localhost:${PORT}`);
  console.log('  ✅ CORS 已配置为允许所有来源');
  console.log('========================================');
  console.log('测试URL:');
  console.log(`  http://localhost:${PORT}/api/test`);
  console.log(`  http://localhost:${PORT}/api/problems`);
  console.log('========================================');
});
