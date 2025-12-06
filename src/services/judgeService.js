import { getProblemById } from '../data/problems.js';
import { executeCode, validateCode } from '../engine/executor.js';
import { analyzeCodeWithAI, quickAnalyzeCode } from './aiService.js';
import { recordProblemAttempt } from './recordService.js';

/**
 * 运行代码(只运行示例测试用例)
 */
export async function runCode(problemId, code) {
  try {
    // 获取题目
    const problem = getProblemById(problemId);
    if (!problem) {
      return {
        status: 'Error',
        message: '题目不存在'
      };
    }

    // 验证代码
    const validation = validateCode(code);
    if (!validation.valid) {
      return {
        status: 'Error',
        message: validation.error
      };
    }

    // 只运行示例测试用例
    const sampleCases = problem.sampleTestCases.map(index => problem.testCases[index]);

    // 执行代码
    const results = await executeCode(
        code,
        problem.functionName,
        sampleCases,
        problem.isAsync
    );

    // 统计结果
    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;

    return {
      status: passedTests === totalTests ? 'Accepted' : 'Wrong Answer',
      message: `示例测试: 通过 ${passedTests}/${totalTests} 个测试用例`,
      passedTests,
      totalTests,
      testResults: results
    };

  } catch (error) {
    console.error('运行代码错误:', error);
    return {
      status: 'Runtime Error',
      message: '代码运行出错',
      error: error.message
    };
  }
}

/**
 * 提交代码(运行所有测试用例 + AI 分析)
 */
export async function judgeCode(problemId, code) {
  try {
    // 获取题目
    const problem = getProblemById(problemId);
    if (!problem) {
      return {
        status: 'Error',
        message: '题目不存在'
      };
    }

    // 验证代码
    const validation = validateCode(code);
    if (!validation.valid) {
      return {
        status: 'Error',
        message: validation.error
      };
    }

    // 运行所有测试用例
    const results = await executeCode(
        code,
        problem.functionName,
        problem.testCases,
        problem.isAsync
    );

    // 统计结果
    const passedTests = results.filter(r => r.passed).length;
    const totalTests = results.length;
    const allPassed = passedTests === totalTests;

    // 判断状态
    let status;
    if (allPassed) {
      status = 'Accepted';
    } else {
      // 检查是否有运行时错误
      const hasError = results.some(r => r.error);
      status = hasError ? 'Runtime Error' : 'Wrong Answer';
    }

    // 🤖 调用 AI 分析代码
    console.log('🤖 开始 AI 分析...');
    const aiAnalysis = await analyzeCodeWithAI(
        code,
        problem.title,
        problem.description,
        results
    );

    return {
      status,
      message: allPassed
          ? '恭喜!通过所有测试用例!'
          : `通过 ${passedTests}/${totalTests} 个测试用例`,
      passedTests,
      totalTests,
      testResults: results,
      // AI 分析结果
      aiAnalysis: aiAnalysis.hasAIAnalysis ? aiAnalysis.aiSuggestion : null,
      hasAIAnalysis: aiAnalysis.hasAIAnalysis
    };

  } catch (error) {
    console.error('判题错误:', error);
    return {
      status: 'Runtime Error',
      message: '代码执行出错',
      error: error.message
    };
  }
}

/**
 * 快速分析代码（不运行测试，直接 AI 分析）
 */
export async function analyzeCode(problemId, code) {
  try {
    const problem = getProblemById(problemId);
    if (!problem) {
      return {
        status: 'Error',
        message: '题目不存在'
      };
    }

    // 快速 AI 分析
    const aiAnalysis = await quickAnalyzeCode(
        code,
        problem.title,
        problem.description
    );

    // 判断是否通过（AI 返回内容包含"✅"或"正确"）
    const isPassed = aiAnalysis.aiSuggestion &&
        (aiAnalysis.aiSuggestion.includes('✅') ||
            aiAnalysis.aiSuggestion.includes('代码正确'));

    // 记录尝试
    const record = recordProblemAttempt(problemId, isPassed);

    return {
      status: 'Success',
      message: 'AI 分析完成',
      aiAnalysis: aiAnalysis.aiSuggestion,
      hasAIAnalysis: aiAnalysis.hasAIAnalysis,
      // 返回记录信息
      record: {
        isPassed: record.isPassed,
        passedCount: record.passedCount,
        totalAttempts: record.totalAttempts
      }
    };

  } catch (error) {
    console.error('分析错误:', error);
    return {
      status: 'Error',
      message: '分析失败',
      error: error.message
    };
  }
}

/**
 * 获取题目统计信息
 */
export function getProblemStats(problemId) {
  const problem = getProblemById(problemId);
  if (!problem) {
    return null;
  }

  return {
    totalTests: problem.testCases.length,
    sampleTests: problem.sampleTestCases.length,
    difficulty: problem.difficulty
  };
}