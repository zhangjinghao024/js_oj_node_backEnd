import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 记录文件路径
const RECORDS_FILE = path.join(__dirname, '../../data/records.json');

/**
 * 确保记录文件存在
 */
function ensureRecordsFile() {
    const dataDir = path.dirname(RECORDS_FILE);

    // 确保 data 目录存在
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // 确保记录文件存在
    if (!fs.existsSync(RECORDS_FILE)) {
        fs.writeFileSync(RECORDS_FILE, JSON.stringify({}, null, 2));
    }
}

/**
 * 读取所有记录
 */
function readRecords() {
    try {
        ensureRecordsFile();
        const data = fs.readFileSync(RECORDS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('读取记录失败:', error);
        return {};
    }
}

/**
 * 写入记录
 */
function writeRecords(records) {
    try {
        ensureRecordsFile();
        fs.writeFileSync(RECORDS_FILE, JSON.stringify(records, null, 2));
    } catch (error) {
        console.error('写入记录失败:', error);
    }
}

/**
 * 获取某个题目的记录
 */
export function getProblemRecord(problemId) {
    const records = readRecords();
    return records[problemId] || null;
}

/**
 * 获取所有题目的记录
 */
export function getAllRecords() {
    return readRecords();
}

/**
 * 记录题目尝试（AI 分析后调用）
 * @param {string} problemId - 题目 ID
 * @param {boolean} isPassed - 是否通过（大模型返回正确）
 */
export function recordProblemAttempt(problemId, isPassed) {
    const records = readRecords();

    // 如果该题目没有记录，初始化
    if (!records[problemId]) {
        records[problemId] = {
            problemId,
            isPassed: false,
            passedCount: 0,
            totalAttempts: 0,
            firstPassedAt: null,
            lastPassedAt: null,
            lastAttemptAt: null
        };
    }

    const record = records[problemId];
    const now = new Date().toISOString();

    // 更新总尝试次数
    record.totalAttempts += 1;
    record.lastAttemptAt = now;

    // 如果这次通过了
    if (isPassed) {
        record.passedCount += 1;
        record.lastPassedAt = now;

        // 如果是第一次通过
        if (!record.isPassed) {
            record.isPassed = true;
            record.firstPassedAt = now;
        }
    }

    // 保存记录
    writeRecords(records);

    console.log(`📊 记录更新 - 题目 ${problemId}: 通过=${isPassed}, 总通过=${record.passedCount}次, 总尝试=${record.totalAttempts}次`);

    return record;
}

/**
 * 重置题目记录
 */
export function resetProblemRecord(problemId) {
    const records = readRecords();

    if (records[problemId]) {
        delete records[problemId];
        writeRecords(records);
        console.log(`🔄 重置题目 ${problemId} 的记录`);
    }
}

/**
 * 清空所有记录
 */
export function clearAllRecords() {
    writeRecords({});
    console.log('🗑️  清空所有记录');
}