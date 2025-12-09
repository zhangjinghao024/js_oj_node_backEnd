// src/services/submissionService.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON 文件路径
const DATA_DIR = path.join(__dirname, '../../data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

// 确保数据目录存在
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// 确保 JSON 文件存在
if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify({ submissions: [] }, null, 2));
}

/**
 * 读取所有提交记录
 */
const readSubmissions = () => {
    try {
        const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
        return JSON.parse(data).submissions || [];
    } catch (error) {
        console.error('读取提交记录失败:', error);
        return [];
    }
};

/**
 * 保存所有提交记录
 */
const writeSubmissions = (submissions) => {
    try {
        fs.writeFileSync(
            SUBMISSIONS_FILE,
            JSON.stringify({ submissions }, null, 2),
            'utf8'
        );
    } catch (error) {
        console.error('保存提交记录失败:', error);
        throw error;
    }
};

/**
 * 生成唯一 ID
 */
const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

/**
 * 保存代码题提交记录
 */
export const saveCodeSubmission = (data) => {
    const submissions = readSubmissions();

    const submission = {
        id: generateId(),
        problemId: data.problemId,
        problemTitle: data.problemTitle,
        problemType: 'code',
        userId: data.userId || 'guest',
        userName: data.userName || 'Guest',
        submittedCode: data.code,
        language: data.language,
        status: data.status,
        isCorrect: data.status === 'accepted',
        passedTests: data.passedTests,
        totalTests: data.totalTests,
        executionTime: data.executionTime,
        memoryUsed: data.memoryUsed,
        errorMessage: data.errorMessage || null,
        submittedAt: new Date().toISOString()
    };

    submissions.unshift(submission);  // 添加到开头
    writeSubmissions(submissions);

    console.log('✅ 代码题提交记录已保存, ID:', submission.id);
    return { id: submission.id, success: true };
};

/**
 * 保存问答题提交记录
 */
export const saveQuizSubmission = (data) => {
    const submissions = readSubmissions();

    const submission = {
        id: generateId(),
        problemId: data.problemId,
        problemTitle: data.problemTitle,
        problemType: 'quiz',
        userId: data.userId || 'guest',
        userName: data.userName || 'Guest',
        submittedAnswer: data.answer,
        status: data.isCorrect ? 'correct' : 'incorrect',
        isCorrect: data.isCorrect,
        score: data.score || null,
        aiAnalysis: data.aiAnalysis || null,
        aiFeedback: data.aiFeedback || null,
        submittedAt: new Date().toISOString()
    };

    submissions.unshift(submission);  // 添加到开头
    writeSubmissions(submissions);

    console.log('✅ 问答题提交记录已保存, ID:', submission.id);
    return { id: submission.id, success: true };
};

/**
 * 获取提交历史（分页）
 */
export const getSubmissions = (options = {}) => {
    const {
        problemId,
        userId,
        problemType,
        limit = 20,
        offset = 0
    } = options;

    let submissions = readSubmissions();

    // 筛选
    if (problemId) {
        submissions = submissions.filter(s => s.problemId === problemId);
    }

    if (userId) {
        submissions = submissions.filter(s => s.userId === userId);
    }

    if (problemType) {
        submissions = submissions.filter(s => s.problemType === problemType);
    }

    // 分页
    const total = submissions.length;
    submissions = submissions.slice(offset, offset + limit);

    return {
        data: submissions,
        total,
        page: Math.floor(offset / limit) + 1,
        pageSize: limit
    };
};

/**
 * 获取单个提交记录
 */
export const getSubmissionById = (id) => {
    const submissions = readSubmissions();
    return submissions.find(s => s.id === id);
};

/**
 * 获取题目统计
 */
export const getProblemStats = (problemId) => {
    const submissions = readSubmissions().filter(s => s.problemId === problemId);

    if (submissions.length === 0) {
        return {
            totalSubmissions: 0,
            correctSubmissions: 0,
            averageScore: 0,
            lastSubmission: null
        };
    }

    const correctSubmissions = submissions.filter(s => s.isCorrect).length;
    const scores = submissions.map(s => s.score).filter(s => s !== null);
    const averageScore = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

    return {
        totalSubmissions: submissions.length,
        correctSubmissions,
        averageScore,
        lastSubmission: submissions[0]?.submittedAt || null
    };
};

/**
 * 获取用户统计
 */
export const getUserStats = (userId) => {
    const submissions = readSubmissions().filter(s => s.userId === userId);

    if (submissions.length === 0) {
        return {
            totalSubmissions: 0,
            problemsAttempted: 0,
            correctSubmissions: 0,
            codeAccepted: 0,
            quizCorrect: 0,
            averageScore: 0
        };
    }

    const problemIds = new Set(submissions.map(s => s.problemId));
    const correctSubmissions = submissions.filter(s => s.isCorrect).length;
    const codeAccepted = submissions.filter(s =>
        s.problemType === 'code' && s.status === 'accepted'
    ).length;
    const quizCorrect = submissions.filter(s =>
        s.problemType === 'quiz' && s.isCorrect
    ).length;

    const scores = submissions.map(s => s.score).filter(s => s !== null);
    const averageScore = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

    return {
        totalSubmissions: submissions.length,
        problemsAttempted: problemIds.size,
        correctSubmissions,
        codeAccepted,
        quizCorrect,
        averageScore
    };
};

/**
 * 获取最近提交
 */
export const getRecentSubmissions = (limit = 10) => {
    const submissions = readSubmissions();
    return submissions.slice(0, limit);
};

/**
 * 删除提交记录
 */
export const deleteSubmission = (id) => {
    let submissions = readSubmissions();
    const initialLength = submissions.length;

    submissions = submissions.filter(s => s.id !== id);

    if (submissions.length < initialLength) {
        writeSubmissions(submissions);
        return { success: true };
    }

    return { success: false, message: '记录不存在' };
};

/**
 * 清空所有提交记录
 */
export const clearAllSubmissions = () => {
    writeSubmissions([]);
    return { success: true, message: '所有记录已清空' };
};
