// test-submission.js
// 放在 backend 目录下运行：node test-submission.js

import {
    saveCodeSubmission,
    getSubmissions
} from './src/services/submissionService.js';

console.log('=== 测试提交记录功能 ===\n');

try {
    // 1. 测试保存
    console.log('1. 测试保存代码提交...');
    const testData = {
        problemId: 'test-problem',
        problemTitle: '测试题目',
        code: 'function test() { return 42; }',
        language: 'javascript',
        status: 'accepted',
        passedTests: 3,
        totalTests: 3,
        executionTime: 45,
        memoryUsed: 1024000,
        errorMessage: null
    };

    const saved = saveCodeSubmission(testData);
    console.log('✅ 保存成功, ID:', saved.id);

    // 2. 测试读取
    console.log('\n2. 测试读取提交记录...');
    const result = getSubmissions({
        problemId: 'test-problem',
        limit: 10
    });
    console.log('✅ 读取成功, 记录数:', result.total);
    console.log('记录内容:', JSON.stringify(result.data[0], null, 2));

    console.log('\n=== 测试完成，一切正常！ ===');

} catch (error) {
    console.error('\n❌ 测试失败:', error);
    console.error('错误详情:', error.stack);
}
