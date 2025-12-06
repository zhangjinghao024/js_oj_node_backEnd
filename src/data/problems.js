// 题目数据存储
export const problems = [
  {
    id: '1',
    title: '实现防抖函数（debounce）',
    difficulty: 'Easy',
    description: `防抖函数原理：把触发非常频繁的事件合并成一次去执行 在指定时间内只执行一次回调函数，如果在指定的时间内又触发了该事件，则回调函数的执行时间会基于此刻重新开始计算`,
    template: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // 请在这里编写你的代码
    
}`,
    testCases: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        expected: [0, 1]
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        expected: [1, 2]
      },
      {
        input: { nums: [3, 3], target: 6 },
        expected: [0, 1]
      },
      {
        input: { nums: [-1, -2, -3, -4, -5], target: -8 },
        expected: [2, 4]
      }
    ],
    sampleTestCases: [0, 1], // 示例测试用例的索引
    functionName: 'twoSum'
  },
  {
    id: '2',
    title: '数组去重',
    difficulty: 'Easy',
    description: `实现一个函数,对数组进行去重,返回一个新数组。

要求:
- 保持原数组元素的相对顺序
- 不修改原数组
- 可以使用任何方法实现`,
    examples: [
      {
        input: '[1, 2, 2, 3, 4, 4, 5]',
        output: '[1, 2, 3, 4, 5]'
      },
      {
        input: '[1, 1, 1, 1]',
        output: '[1]'
      }
    ],
    constraints: [
      '0 <= arr.length <= 10^4',
      '数组元素可以是任意类型'
    ],
    hints: [
      '可以使用 Set 数据结构',
      '可以使用 filter 方法',
      '可以使用对象/Map 来记录已出现的元素'
    ],
    template: `/**
 * @param {any[]} arr
 * @return {any[]}
 */
function unique(arr) {
    // 请在这里编写你的代码
    
}`,
    testCases: [
      {
        input: { arr: [1, 2, 2, 3, 4, 4, 5] },
        expected: [1, 2, 3, 4, 5]
      },
      {
        input: { arr: [1, 1, 1, 1] },
        expected: [1]
      },
      {
        input: { arr: [] },
        expected: []
      },
      {
        input: { arr: [1, 2, 3, 4, 5] },
        expected: [1, 2, 3, 4, 5]
      },
      {
        input: { arr: ['a', 'b', 'a', 'c', 'b'] },
        expected: ['a', 'b', 'c']
      }
    ],
    sampleTestCases: [0, 1],
    functionName: 'unique'
  },
  {
    id: '3',
    title: '实现 Array.prototype.flat',
    difficulty: 'Medium',
    description: `实现数组的 flat 方法,用于将嵌套的数组"拉平"。

flat(depth) 方法会按照一个可指定的深度递归遍历数组,并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

参数:
- depth: 指定要提取嵌套数组的结构深度,默认值为 1`,
    examples: [
      {
        input: 'arr = [1, 2, [3, 4]], depth = 1',
        output: '[1, 2, 3, 4]'
      },
      {
        input: 'arr = [1, 2, [3, 4, [5, 6]]], depth = 2',
        output: '[1, 2, 3, 4, 5, 6]'
      }
    ],
    constraints: [
      '0 <= arr.length <= 10^4',
      '0 <= depth <= 10'
    ],
    hints: [
      '可以使用递归实现',
      '需要判断元素是否为数组',
      '注意 depth 的边界条件'
    ],
    template: `/**
 * @param {any[]} arr
 * @param {number} depth
 * @return {any[]}
 */
function flatArray(arr, depth = 1) {
    // 请在这里编写你的代码
    
}`,
    testCases: [
      {
        input: { arr: [1, 2, [3, 4]], depth: 1 },
        expected: [1, 2, 3, 4]
      },
      {
        input: { arr: [1, 2, [3, 4, [5, 6]]], depth: 1 },
        expected: [1, 2, 3, 4, [5, 6]]
      },
      {
        input: { arr: [1, 2, [3, 4, [5, 6]]], depth: 2 },
        expected: [1, 2, 3, 4, 5, 6]
      },
      {
        input: { arr: [1, [2, [3, [4, [5]]]]], depth: Infinity },
        expected: [1, 2, 3, 4, 5]
      },
      {
        input: { arr: [], depth: 1 },
        expected: []
      }
    ],
    sampleTestCases: [0, 1],
    functionName: 'flatArray'
  },
  {
    id: '4',
    title: '实现防抖函数 debounce',
    difficulty: 'Medium',
    description: `实现一个防抖函数 debounce。

防抖函数的作用是:在事件被触发 n 秒后再执行回调,如果在这 n 秒内又被触发,则重新计时。

应用场景:
- 搜索框输入
- 窗口 resize
- 滚动事件

参数:
- func: 要防抖的函数
- wait: 等待时间(毫秒)`,
    examples: [
      {
        input: 'debounce(fn, 1000) 连续调用',
        output: '只有最后一次调用在1秒后执行'
      }
    ],
    constraints: [
      'wait >= 0',
      'func 必须是函数'
    ],
    hints: [
      '使用 setTimeout 实现',
      '需要清除之前的定时器',
      '注意 this 和参数的传递'
    ],
    template: `/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
function debounce(func, wait) {
    // 请在这里编写你的代码
    
}`,
    testCases: [
      {
        input: { func: 'counter', wait: 100, calls: [0, 50, 150] },
        expected: 1 // 只执行一次
      },
      {
        input: { func: 'counter', wait: 100, calls: [0, 50, 100, 150, 250] },
        expected: 1 // 只执行一次
      },
      {
        input: { func: 'counter', wait: 100, calls: [0, 200, 400] },
        expected: 3 // 执行三次
      }
    ],
    sampleTestCases: [0, 1],
    functionName: 'debounce',
    isAsync: true
  },
  {
    id: '5',
    title: '实现深拷贝',
    difficulty: 'Hard',
    description: `实现一个深拷贝函数,能够正确拷贝各种数据类型。

要求:
- 支持对象、数组、Date、RegExp 等类型
- 处理循环引用
- 保持原型链

注意事项:
- 不能使用 JSON.parse(JSON.stringify())
- 需要考虑各种边界情况`,
    examples: [
      {
        input: 'obj = { a: 1, b: { c: 2 } }',
        output: '{ a: 1, b: { c: 2 } } (新对象)'
      }
    ],
    constraints: [
      '对象嵌套层级 <= 100',
      '需要处理循环引用'
    ],
    hints: [
      '使用 WeakMap 处理循环引用',
      '需要判断数据类型',
      '递归处理嵌套结构'
    ],
    template: `/**
 * @param {any} obj
 * @return {any}
 */
function deepClone(obj) {
    // 请在这里编写你的代码
    
}`,
    testCases: [
      {
        input: { obj: { a: 1, b: { c: 2 } } },
        expected: { a: 1, b: { c: 2 } }
      },
      {
        input: { obj: [1, 2, [3, 4]] },
        expected: [1, 2, [3, 4]]
      },
      {
        input: { obj: null },
        expected: null
      },
      {
        input: { obj: { a: 1, b: 2, c: 3 } },
        expected: { a: 1, b: 2, c: 3 }
      }
    ],
    sampleTestCases: [0, 1],
    functionName: 'deepClone'
  }
];

// 根据ID获取题目
export function getProblemById(id) {
  return problems.find(p => p.id === id);
}

// 获取所有题目(不包含测试用例)
export function getAllProblems() {
  return problems.map(({ testCases, sampleTestCases, ...problem }) => problem);
}
