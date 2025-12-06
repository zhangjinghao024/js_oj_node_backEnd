import OpenAI from 'openai';

process.env.DASHSCOPE_API_KEY = 'sk-1f82060da9964530b09cb0051d75ef81';

// 初始化 OpenAI 客户端
const openai = new OpenAI({
    apiKey: process.env.DASHSCOPE_API_KEY,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

/**
 * 使用 AI 分析问答题答案
 * @param {string} userAnswer - 用户的答案
 * @param {string} questionTitle - 题目标题
 * @param {string} questionContent - 题目内容
 * @param {string} referenceAnswer - 参考答案
 * @param {Array} keywords - 关键词列表
 * @returns {Promise<Object>} AI 分析结果
 */
export async function analyzeQuizAnswer(userAnswer, questionTitle, questionContent, referenceAnswer, keywords) {
    try {
        // 检查 API Key
        if (!process.env.DASHSCOPE_API_KEY) {
            console.warn('⚠️  未配置 DASHSCOPE_API_KEY，跳过 AI 分析');
            return {
                hasAIAnalysis: false,
                aiAnalysis: '未配置 AI 服务',
                score: 0,
                feedback: '未配置 AI 服务，无法进行分析'
            };
        }

        // 构建提示词
        const prompt = buildQuizPrompt(userAnswer, questionTitle, questionContent, referenceAnswer, keywords);

        console.log('🤖 正在请求 AI 分析问答题答案...');
        console.log('📝 题目:', questionTitle);
        console.log('💬 考生答案长度:', userAnswer.length, '字符');

        // 调用大模型
        const completion = await openai.chat.completions.create({
            model: "qwen-max",
            messages: [
                {
                    role: "system",
                    content: "你是一个专业的 JavaScript 技术面试官，擅长评估前端开发相关问题的答案。你的评价要客观、准确、有建设性，严格按照指定格式输出。"
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
        console.log('📄 AI 返回内容:\n', aiResponse);

        // 解析 AI 返回的结构化数据
        const parsedResult = parseAIResponse(aiResponse);

        return {
            hasAIAnalysis: true,
            aiAnalysis: parsedResult.analysis,
            isCorrect: parsedResult.isCorrect,
            standardAnswer: parsedResult.standardAnswer,
            improvements: parsedResult.improvements,
            feedback: parsedResult.feedback,
            model: 'qwen-max'
        };

    } catch (error) {
        console.error('❌ AI 分析失败:', error.message);
        console.error('错误详情:', error);
        return {
            hasAIAnalysis: false,
            aiAnalysis: 'AI 分析服务暂时不可用',
            isCorrect: null,
            feedback: 'AI 分析服务暂时不可用: ' + error.message,
            error: error.message
        };
    }
}

/**
 * 构建给大模型的提示词
 */
function buildQuizPrompt(userAnswer, questionTitle, questionContent, referenceAnswer, keywords) {
    const keywordsList = keywords && keywords.length > 0 ? keywords.join('、') : '无';

    const prompt = `请分析前端面试题的考生答案是否正确，并给出标准答案和改进建议。

**题目：** ${questionTitle}

**问题描述：**
${questionContent}

**参考答案：**
${referenceAnswer}

**关键概念：** ${keywordsList}

**考生答案：**
${userAnswer}

---

请严格按照以下 Markdown 格式输出评估结果：

## 📊 是否正确：✅ 或 ❌

（判断考生答案是否正确，只输出 ✅ 或 ❌）

## ✅ 标准答案

（提供简洁准确的标准答案，2-3 句话）

## ⚠️ 需要改进

- 改进点1
- 改进点2
- 改进点3

（如果答案很完善，只写一条："答案已较完善，无需改进"）

## 💡 综合评价

（简短总结，2-3 句话，说明答案的整体质量）

---

**评估要求：**
1. 必须严格按照上述 4 个部分的 Markdown 格式输出
2. 标准答案要准确、简洁
3. 改进点要具体、可操作
4. 综合评价要客观、建设性
5. 总字数控制在 400 字以内

**重要提醒：**
- 第一部分只输出 ✅ 或 ❌，不要有其他文字
- 如果考生答案基本正确但不够完善，判定为 ✅
- 如果考生答案有严重错误或答非所问，判定为 ❌`;

    return prompt;
}

/**
 * 解析 AI 返回的响应
 */
function parseAIResponse(aiResponse) {
    try {
        console.log('🔍 开始解析 AI 响应...');

        // 1. 提取是否正确 (✅ 或 ❌)
        const isCorrectMatch = aiResponse.match(/##\s*📊\s*是否正确[：:]\s*(✅|❌)/);
        const isCorrect = isCorrectMatch ? isCorrectMatch[1] === '✅' : null;
        console.log('   是否正确:', isCorrect ? '✅ 正确' : '❌ 错误');

        // 2. 提取标准答案
        const standardAnswerMatch = aiResponse.match(/##\s*✅\s*标准答案\s*([\s\S]*?)(?=##|$)/);
        const standardAnswer = standardAnswerMatch
            ? standardAnswerMatch[1].trim()
            : '暂无标准答案';
        console.log('   标准答案长度:', standardAnswer.length, '字符');

        // 3. 提取改进点
        const improvementsMatch = aiResponse.match(/##\s*⚠️\s*需要改进\s*([\s\S]*?)(?=##|$)/);
        const improvementsText = improvementsMatch ? improvementsMatch[1].trim() : '';

        const improvements = improvementsText
            .split('\n')
            .filter(line => line.trim().startsWith('-'))
            .map(line => line.replace(/^-\s*/, '').trim())
            .filter(Boolean);

        // 如果没有改进点，添加默认值
        if (improvements.length === 0) {
            improvements.push('答案已较完善，无需改进');
        }
        console.log('   改进点数量:', improvements.length);

        // 4. 提取综合评价
        const feedbackMatch = aiResponse.match(/##\s*💡\s*综合评价\s*([\s\S]*?)(?=\n##|$)/);
        const feedback = feedbackMatch
            ? feedbackMatch[1].trim()
            : '分析完成';
        console.log('   综合评价长度:', feedback.length, '字符');

        console.log('✅ AI 响应解析完成');

        return {
            analysis: aiResponse,              // 完整的 AI 分析内容
            isCorrect,                         // 是否正确（true/false/null）
            standardAnswer,                    // 标准答案
            improvements,                      // 改进点数组
            feedback                           // 综合评价
        };
    } catch (error) {
        console.error('❌ 解析 AI 响应失败:', error);
        return {
            analysis: aiResponse,
            isCorrect: null,
            standardAnswer: '解析失败',
            improvements: ['解析响应时出错'],
            feedback: '分析完成，但部分内容解析失败'
        };
    }
}