import OpenAI from 'openai';

process.env.DASHSCOPE_API_KEY = 'sk-1f82060da9964530b09cb0051d75ef81';
// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

/**
 * 使用大模型分析代码
 * @param {string} code - 用户提交的代码
 * @param {string} problemTitle - 题目标题
 * @param {string} problemDescription - 题目描述
 * @param {Array} testResults - 测试结果
 * @returns {Promise<Object>} AI 分析结果
 */
export async function analyzeCodeWithAI(code, problemTitle, problemDescription, testResults) {
  try {
    // 检查 API Key
    if (!process.env.DASHSCOPE_API_KEY) {
      console.warn('⚠️  未配置 DASHSCOPE_API_KEY，跳过 AI 分析');
      return {
        hasAIAnalysis: false,
        aiSuggestion: '未配置 AI 服务'
      };
    }

    // 构建提示词
    const prompt = buildPrompt(code, problemTitle, problemDescription, testResults);

    console.log('🤖 正在请求 AI 分析代码...');

    // 调用大模型
    const completion = await openai.chat.completions.create({
      model: "qwen-max",
      messages: [
        {
          role: "system",
          content: "你是一个专业的代码审查助手，擅长分析 JavaScript 代码并给出简洁、准确的反馈。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse = completion.choices[0].message.content;
    console.log('✅ AI 分析完成');

    return {
      hasAIAnalysis: true,
      aiSuggestion: aiResponse,
      model: 'qwen-max'
    };

  } catch (error) {
    console.error('❌ AI 分析失败:', error.message);
    return {
      hasAIAnalysis: false,
      aiSuggestion: 'AI 分析服务暂时不可用',
      error: error.message
    };
  }
}

/**
 * 构建给大模型的提示词
 */
function buildPrompt(code, problemTitle, problemDescription, testResults) {
  const passedCount = testResults.filter(r => r.passed).length;
  const totalCount = testResults.length;
  const allPassed = passedCount === totalCount;

  // 收集失败的测试用例
  const failedTests = testResults
      .filter(r => !r.passed)
      .map((r, index) => {
        return `测试 ${index + 1}: 
输入: ${JSON.stringify(r.input)}
期望输出: ${JSON.stringify(r.expected)}
实际输出: ${JSON.stringify(r.actual)}
${r.error ? `错误: ${r.error}` : ''}`;
      })
      .join('\n\n');

  let prompt = `请帮我判断代码是否写对了，言简意赅地回复我，有错误就展示错误，没错误就告诉我正确就行。

题目：${problemTitle}

题目描述：
${problemDescription}

用户提交的代码：
\`\`\`javascript
${code}
\`\`\`

测试结果：通过 ${passedCount}/${totalCount} 个测试用例
`;

  if (allPassed) {
    prompt += `\n✅ 所有测试用例都通过了！请简短评价代码质量，指出可以优化的地方（如果有）。`;
  } else {
    prompt += `\n❌ 有测试用例未通过：

${failedTests}

请分析代码的问题所在，并给出修改建议。`;
  }

  return prompt;
}

/**
 * 快速判断代码（不运行测试，直接让AI分析）
 * @param {string} code - 用户代码
 * @param {string} problemTitle - 题目标题
 * @param {string} problemDescription - 题目描述
 * @returns {Promise<Object>} AI 分析结果
 */
export async function quickAnalyzeCode(code, problemTitle, problemDescription) {
  try {
    if (!process.env.DASHSCOPE_API_KEY) {
      return {
        hasAIAnalysis: false,
        aiSuggestion: '未配置 AI 服务'
      };
    }

    const prompt = `请分析以下代码，给出简洁的评价。

题目：${problemTitle}

代码：
\`\`\`javascript
${code}
\`\`\`

请严格按照以下格式回复（使用 Markdown 格式,）：

如果代码正确：
## ✅ 代码正确

简短评价（不超过2句话）

如果代码有错误：
## ❌ 代码存在错误

⚠️ **错误1**：具体错误内容（在哪一行/哪个地方有什么问题）

⚠️ **错误2**：具体错误内容（如果有多个）

### 💡 修复建议
- 如何修复

要求：
1. 开门见山，直接说对错，不要过于严格，但也要保证语法、逻辑、功能正确
2. 错误要具体，指出代码哪里有问题
3. 每条错误单独一行，用 ⚠️ 开头
4. 不要说废话，不要重复题目，不要解释太多
5. 总字数不超过150字`;

    console.log('🤖 正在快速分析代码...');

    const completion = await openai.chat.completions.create({
      model: "qwen-max",
      messages: [
        {
          role: "system",
          content: "你是专业的代码审查助手。回答要简洁明了，直接指出问题，不要废话。严格控制在150字以内。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const aiResponse = completion.choices[0].message.content;

    return {
      hasAIAnalysis: true,
      aiSuggestion: aiResponse,
      model: 'qwen-max'
    };

  } catch (error) {
    console.error('❌ 快速分析失败:', error.message);
    return {
      hasAIAnalysis: false,
      aiSuggestion: 'AI 分析服务暂时不可用'
    };
  }
}
