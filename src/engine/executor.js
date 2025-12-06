import { VM } from 'vm2';

/**
 * 执行用户代码并返回结果
 * @param {string} code - 用户代码
 * @param {string} functionName - 要调用的函数名
 * @param {Array} testCases - 测试用例数组
 * @param {boolean} isAsync - 是否是异步测试
 * @returns {Object} 执行结果
 */
export async function executeCode(code, functionName, testCases, isAsync = false) {
  const results = [];
  
  for (const testCase of testCases) {
    const result = await executeTestCase(code, functionName, testCase, isAsync);
    results.push(result);
  }
  
  return results;
}

/**
 * 执行单个测试用例
 */
async function executeTestCase(code, functionName, testCase, isAsync) {
  const startTime = Date.now();
  
  try {
    // 创建沙箱环境
    const vm = new VM({
      timeout: 5000, // 5秒超时
      sandbox: {
        console: {
          log: () => {},
          error: () => {},
        }
      }
    });

    // 特殊处理异步测试(如 debounce)
    if (isAsync) {
      return await executeAsyncTest(vm, code, functionName, testCase, startTime);
    }

    // 执行用户代码
    vm.run(code);
    
    // 获取用户函数
    const userFunction = vm.run(functionName);
    
    if (typeof userFunction !== 'function') {
      return {
        passed: false,
        input: testCase.input,
        expected: testCase.expected,
        actual: null,
        error: `${functionName} 不是一个函数`,
        executionTime: Date.now() - startTime
      };
    }

    // 准备参数
    const args = Object.values(testCase.input);
    
    // 执行函数
    const actual = userFunction(...args);
    
    // 比较结果
    const passed = deepEqual(actual, testCase.expected);
    
    return {
      passed,
      input: testCase.input,
      expected: testCase.expected,
      actual,
      executionTime: Date.now() - startTime
    };
    
  } catch (error) {
    return {
      passed: false,
      input: testCase.input,
      expected: testCase.expected,
      actual: null,
      error: error.message,
      executionTime: Date.now() - startTime
    };
  }
}

/**
 * 执行异步测试(用于 debounce, throttle 等)
 */
async function executeAsyncTest(vm, code, functionName, testCase, startTime) {
  try {
    // 对于 debounce 测试
    if (functionName === 'debounce') {
      return await testDebounce(vm, code, testCase, startTime);
    }
    
    // 其他异步测试...
    return {
      passed: false,
      input: testCase.input,
      expected: testCase.expected,
      actual: null,
      error: '不支持的异步测试类型',
      executionTime: Date.now() - startTime
    };
    
  } catch (error) {
    return {
      passed: false,
      input: testCase.input,
      expected: testCase.expected,
      actual: null,
      error: error.message,
      executionTime: Date.now() - startTime
    };
  }
}

/**
 * 测试 debounce 函数
 */
async function testDebounce(vm, code, testCase, startTime) {
  return new Promise((resolve) => {
    try {
      let callCount = 0;
      
      // 创建计数器函数
      const counter = () => {
        callCount++;
      };
      
      // 在 VM 中设置全局变量
      vm.setGlobal('counter', counter);
      
      // 执行用户代码
      vm.run(code);
      
      // 获取 debounce 函数
      const debounce = vm.run('debounce');
      
      if (typeof debounce !== 'function') {
        resolve({
          passed: false,
          input: testCase.input,
          expected: testCase.expected,
          actual: null,
          error: 'debounce 不是一个函数',
          executionTime: Date.now() - startTime
        });
        return;
      }
      
      // 创建防抖函数
      const debouncedFn = debounce(counter, testCase.input.wait);
      
      // 模拟调用
      const calls = testCase.input.calls;
      let maxDelay = 0;
      
      calls.forEach(delay => {
        setTimeout(() => {
          debouncedFn();
        }, delay);
        maxDelay = Math.max(maxDelay, delay);
      });
      
      // 等待所有调用完成 + 防抖时间
      const totalWait = maxDelay + testCase.input.wait + 100;
      
      setTimeout(() => {
        const passed = callCount === testCase.expected;
        resolve({
          passed,
          input: testCase.input,
          expected: testCase.expected,
          actual: callCount,
          executionTime: Date.now() - startTime
        });
      }, totalWait);
      
    } catch (error) {
      resolve({
        passed: false,
        input: testCase.input,
        expected: testCase.expected,
        actual: null,
        error: error.message,
        executionTime: Date.now() - startTime
      });
    }
  });
}

/**
 * 深度比较两个值是否相等
 */
function deepEqual(a, b) {
  if (a === b) return true;
  
  if (a == null || b == null) return false;
  
  if (typeof a !== typeof b) return false;
  
  if (typeof a !== 'object') return false;
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }
  
  if (Array.isArray(a) || Array.isArray(b)) return false;
  
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  
  if (keysA.length !== keysB.length) return false;
  
  return keysA.every(key => deepEqual(a[key], b[key]));
}

/**
 * 验证代码安全性(基础检查)
 */
export function validateCode(code) {
  // 检查危险关键字
  const dangerousPatterns = [
    /require\s*\(/,
    /import\s+/,
    /eval\s*\(/,
    /Function\s*\(/,
    /process\./,
    /child_process/,
    /fs\./,
    /__dirname/,
    /__filename/,
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(code)) {
      return {
        valid: false,
        error: '代码包含不允许的操作'
      };
    }
  }
  
  return { valid: true };
}
