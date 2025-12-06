import express from 'express';
import { getAllProblems, getProblemById } from '../data/problems.js';
import { runCode, judgeCode, getProblemStats, analyzeCode } from '../services/judgeService.js';
import { getAllRecords, getProblemRecord, resetProblemRecord } from '../services/recordService.js';
import { getAllQuizzes, getQuizById } from '../data/quizQuestions.js';
import { analyzeQuizAnswer } from '../services/quizAIService.js';
import { speechToText, base64ToBuffer, convertToPCM } from '../services/speechService.cjs';

const router = express.Router();

/**
 * GET /api/problems
 * 获取所有题目列表
 */
router.get('/problems', (req, res) => {
  try {
    const problems = getAllProblems();
    res.json({
      success: true,
      problems
    });
  } catch (error) {
    console.error('获取题目列表失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
});

/**
 * GET /api/problems/:id
 * 获取单个题目详情
 */
router.get('/problems/:id', (req, res) => {
  try {
    const { id } = req.params;
    const problem = getProblemById(id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        error: '题目不存在'
      });
    }

    // 不返回测试用例详情
    const { testCases, sampleTestCases, ...problemData } = problem;

    res.json({
      success: true,
      problem: problemData
    });
  } catch (error) {
    console.error('获取题目详情失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
});

/**
 * POST /api/run
 * 运行代码(仅运行示例测试用例)
 */
router.post('/run', async (req, res) => {
  try {
    const { problemId, code } = req.body;

    // 参数验证
    if (!problemId || !code) {
      return res.status(400).json({
        success: false,
        error: '缺少必要参数'
      });
    }

    if (typeof code !== 'string' || code.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: '代码不能为空'
      });
    }

    // 运行代码
    const result = await runCode(problemId, code);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('运行代码失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: error.message
    });
  }
});

/**
 * POST /api/judge
 * 提交代码(运行所有测试用例)
 */
router.post('/judge', async (req, res) => {
  try {
    const { problemId, code } = req.body;

    // 参数验证
    if (!problemId || !code) {
      return res.status(400).json({
        success: false,
        error: '缺少必要参数'
      });
    }

    if (typeof code !== 'string' || code.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: '代码不能为空'
      });
    }

    // 判题
    const result = await judgeCode(problemId, code);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('判题失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: error.message
    });
  }
});

/**
 * GET /api/problems/:id/stats
 * 获取题目统计信息
 */
router.get('/problems/:id/stats', (req, res) => {
  try {
    const { id } = req.params;
    const stats = getProblemStats(id);

    if (!stats) {
      return res.status(404).json({
        success: false,
        error: '题目不存在'
      });
    }

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('获取题目统计失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
});

/**
 * POST /api/analyze
 * AI 分析代码（不运行测试）
 */
router.post('/analyze', async (req, res) => {
  try {
    const { problemId, code } = req.body;

    // 参数验证
    if (!problemId || !code) {
      return res.status(400).json({
        success: false,
        error: '缺少必要参数'
      });
    }

    if (typeof code !== 'string' || code.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: '代码不能为空'
      });
    }

    // AI 分析
    const result = await analyzeCode(problemId, code);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('AI 分析失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: error.message
    });
  }
});

/**
 * GET /api/records
 * 获取所有题目的记录
 */
router.get('/records', (req, res) => {
  try {
    const records = getAllRecords();
    res.json({
      success: true,
      records
    });
  } catch (error) {
    console.error('获取记录失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
});

/**
 * GET /api/records/:problemId
 * 获取单个题目的记录
 */
router.get('/records/:problemId', (req, res) => {
  try {
    const { problemId } = req.params;
    const record = getProblemRecord(problemId);

    res.json({
      success: true,
      record: record || {
        isPassed: false,
        passedCount: 0,
        totalAttempts: 0
      }
    });
  } catch (error) {
    console.error('获取记录失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
});

/**
 * DELETE /api/records/:problemId
 * 重置单个题目的记录
 */
router.delete('/records/:problemId', (req, res) => {
  try {
    const { problemId } = req.params;
    resetProblemRecord(problemId);

    res.json({
      success: true,
      message: '记录已重置'
    });
  } catch (error) {
    console.error('重置记录失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
});

/**
 * GET /api/health
 * 健康检查
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Service is running',
    timestamp: new Date().toISOString(),
    aiEnabled: !!process.env.DASHSCOPE_API_KEY
  });
});

/**
 * GET /api/quizzes
 * 获取所有问答题列表
 */
router.get('/quizzes', (req, res) => {
  try {
    const quizzes = getAllQuizzes();
    res.json({
      success: true,
      quizzes
    });
  } catch (error) {
    console.error('获取问答题列表失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
});

/**
 * GET /api/quizzes/:id
 * 获取单个问答题详情
 */
router.get('/quizzes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const quiz = getQuizById(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: '问答题不存在'
      });
    }

    // 不返回参考答案和关键词
    const { referenceAnswer, keywords, ...quizData } = quiz;

    res.json({
      success: true,
      quiz: quizData
    });
  } catch (error) {
    console.error('获取问答题详情失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误'
    });
  }
});

/**
 * POST /api/quizzes/analyze
 * AI 分析问答题答案
 */
router.post('/quizzes/analyze', async (req, res) => {
  try {
    const { quizId, userAnswer } = req.body;

    console.log('📝 收到问答题分析请求:', { quizId, answerLength: userAnswer?.length });

    // 参数验证
    if (!quizId || !userAnswer) {
      return res.status(400).json({
        success: false,
        error: '缺少必要参数'
      });
    }

    if (typeof userAnswer !== 'string' || userAnswer.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: '答案不能为空'
      });
    }

    // 获取问答题信息
    const quiz = getQuizById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: '问答题不存在'
      });
    }

    console.log('📚 题目信息:', quiz.title);

    // AI 分析答案
    const result = await analyzeQuizAnswer(
        userAnswer,
        quiz.title,
        quiz.question,
        quiz.referenceAnswer,
        quiz.keywords
    );

    console.log('✅ AI 分析结果:', {
      hasAnalysis: result.hasAIAnalysis,
      score: result.score
    });

    res.json({
      success: true,
      ...result,
      quiz: {
        id: quiz.id,
        title: quiz.title,
        referenceAnswer: quiz.referenceAnswer // 分析后返回参考答案
      }
    });
  } catch (error) {
    console.error('❌ 问答题分析失败:', error);
    res.status(500).json({
      success: false,
      error: '服务器错误',
      message: error.message
    });
  }
});

/**
 * POST /api/speech-to-text
 * 语音转文字
 */
router.post('/speech-to-text', async (req, res) => {
  try {
    const { audioData } = req.body;

    console.log('🎤 收到语音转文字请求');

    // 参数验证
    if (!audioData) {
      return res.status(400).json({
        success: false,
        error: '缺少音频数据'
      });
    }

    console.log('🎤 音频数据大小:', audioData.length, '字符');

    // 将 base64 转换为 Buffer
    const audioBuffer = base64ToBuffer(audioData);
    console.log('🎤 音频 Buffer 大小:', audioBuffer.length, '字节');

    // 转换为 PCM 格式
    const pcmBuffer = await convertToPCM(audioBuffer);
    console.log('🎤 PCM Buffer 大小:', pcmBuffer.length, '字节');

    // 调用语音识别服务
    const text = await speechToText(pcmBuffer);

    console.log('✅ 识别成功:', text);

    res.json({
      success: true,
      text: text,
      message: '识别成功'
    });

  } catch (error) {
    console.error('❌ 语音识别失败:', error);
    res.status(500).json({
      success: false,
      error: '语音识别失败',
      message: error.message
    });
  }
});

export default router;