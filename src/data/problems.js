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
    title: '2 实现节流函数（throttle）',
    difficulty: 'Easy',
    description: `节流函数原理:指频繁触发事件时，只会在指定的时间段内执行事件回调，即触发事件间隔大于等于指定的时间才会执行回调函数。总结起来就是：事件，按照一段时间的间隔来进行触发。。
`,
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
    title: '3 实现instanceOf',
    difficulty: 'Easy',
    description: `步骤1：先取得当前类的原型，当前实例对象的原型链
​步骤2：一直循环（执行原型链的查找机制）
取得当前实例对象原型链的原型链（proto = proto.__proto__，沿着原型链一直向上查找）
如果 当前实例的原型链__proto__上找到了当前类的原型prototype，则返回 true
如果 一直找到Object.prototype.__proto__ == null，Object的基类(null)上面都没找到，则返回 false"。
`,
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
    title: '实现new的过程',
    difficulty: 'Medium',
    description: `new操作符做了这些事：

创建一个全新的对象obj，继承构造函数的原型：这个对象的__proto__要指向构造函数的原型prototype
执行构造函数，使用 call/apply 改变 this 的指向（将obj作为this）
返回值为object类型则作为new方法的返回值返回，否则返回上述全新对象obj`,
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
    title: '5 实现call方法',
    difficulty: 'Easy',
    description: `call做了什么:

将函数设为对象的属性
执行和删除这个函数
指定this到函数并传入给定参数执行函数
如果不传入参数，默认指向 window
分析：如何在函数执行时绑定this

如var obj = {x:100,fn() { this.x }}
执行obj.fn() ,此时fn内部的this就指向了obj
可借此来实现函数绑定this
原生call、apply传入的this如果是值类型，会被new Object（如fn.call('abc')）`,
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
  },
  {
    id: '6',
    title: '6 实现apply方法',
    difficulty: 'Easy',
    description: `
        func.call(thisArg, arg1, arg2, arg3, ...)    // 参数逐个传递
    func.apply(thisArg, [arg1, arg2, arg3, ...]) // 参数作为数组传递`,
    template: ``,
  },
  {
    id: '7',
    title: '实现bind方法',
    difficulty: 'Easy',
    description: `
    bind 的实现对比其他两个函数略微地复杂了一点，涉及到参数合并(类似函数柯里化)，因为 bind 需要返回一个函数，需要判断一些边界问题，以下是 bind 的实现

bind 返回了一个函数，对于函数来说有两种方式调用，一种是直接调用，一种是通过 new 的方式，我们先来说直接调用的方式
对于直接调用来说，这里选择了 apply 的方式实现，但是对于参数需要注意以下情况：因为 bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以我们需要将两边的参数拼接起来
最后来说通过 new 的方式，对于 new 的情况来说，不会被任何方式改变 this，所以对于这种情况我们需要忽略传入的 this
箭头函数的底层是bind，无法改变this，只能改变参数
简洁版本

对于普通函数，绑定this指向
对于构造函数，要保证原函数的原型对象上的属性不能丢`,
    template: ``,
  },
  {
    id: '8',
    title: '实现完整的深拷贝',
    difficulty: 'Medium',
    description: `
    调用深拷贝方法，若属性为值类型，则直接返回；若属性为引用类型，则递归遍历。这就是我们在解这一类题时的核心的方法。
    
    进阶版

解决拷贝循环引用问题
解决拷贝对应原型问题`,
    template: ``,
  },
  {
    id: '9',
    title: '实现类的继承',
    difficulty: 'Medium',
    description: `
    // 父类
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue'];
}

Parent.prototype.sayHello = function() {
    console.log(\`Hello, I'm ${this.name}\`);
};

// 子类
function Child(name, age) {
    // 1. 继承父类的实例属性
    Parent.call(this, name);
    this.age = age;
}

// 2. 继承父类的原型方法
Child.prototype = Object.create(Parent.prototype);

// 3. 修复构造函数指向
Child.prototype.constructor = Child;

// 4. 添加子类自己的方法
Child.prototype.sayAge = function() {
    console.log(\`I'm ${this.age} years old\`);
};`,
    template: ``,
  },
  {
    id: '10',
    title: '实现 Promise.resolve',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
  {
    id: '11',
    title: '实现 Promise.reject',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
  {
    id: '12',
    title: '实现 Promise.finally',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
  {
    id: '13',
    title: '实现 Promise.all',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
  {
    id: '14',
    title: '实现 Promise.allSettle',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
  {
    id: '15',
    title: '实现 Promise.race',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
  {
    id: '16',
    title: '实现 Promise',
    difficulty: 'Hard',
    description: ``,
    template: ``,
  },
  {
    id: '17',
    title: '实现【发布订阅】模式',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
  {
    id: '18',
    title: '实现【观察者】模式',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
  {
    id: '19',
    title: '实现【单例】模式',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
];

// 根据ID获取题目
export function getProblemById(id) {
  return problems.find(p => p.id === id);
}

// 获取所有题目(不包含测试用例)
export function getAllProblems() {
  return problems.map(({ testCases, sampleTestCases, ...problem }) => problem);
}
