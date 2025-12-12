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
};`,
    template: ``,
  },
  {
    id: '10',
    title: '实现 Promise.resolve',
    difficulty: 'Medium',
    description: `
    实现 resolve 静态方法有三个要点:

    传参为一个 Promise, 则直接返回它。
    传参为一个 thenable 对象，返回的 Promise 会跟随这个对象，采用它的最终状态作为自己的状态。
    其他情况，直接返回以该值为成功状态的promise对象。
    `,
    template: ``,
  },
  {
    id: '11',
    title: '实现 Promise.reject',
    difficulty: 'Medium',
    description: `
    Promise.reject 中传入的参数会作为一个 reason 原封不动地往下传, 实现如下:
    `,
    template: ``,
  },
  {
    id: '12',
    title: '实现 Promise.finally',
    difficulty: 'Medium',
    description: `
    前面的promise不管成功还是失败，都会走到finally中，并且finally之后，还可以继续then（说明它还是一个then方法是关键），并且会将初始的promise值原封不动的传递给后面的then.

    Promise.prototype.finally最大的作用
    
    finally里的函数，无论如何都会执行，并会把前面的值原封不动传递给下一个then方法中
    如果finally函数中有promise等异步任务，会等它们全部执行完毕，再结合之前的成功与否状态，返回值
    Promise.prototype.finally六大情况用法
    #3 实现 Promise.prototype.finally
前面的promise不管成功还是失败，都会走到finally中，并且finally之后，还可以继续then（说明它还是一个then方法是关键），并且会将初始的promise值原封不动的传递给后面的then.

Promise.prototype.finally最大的作用

finally里的函数，无论如何都会执行，并会把前面的值原封不动传递给下一个then方法中
如果finally函数中有promise等异步任务，会等它们全部执行完毕，再结合之前的成功与否状态，返回值
Promise.prototype.finally六大情况用法

// 情况1
Promise.resolve(123).finally((data) => { // 这里传入的函数，无论如何都会执行
  console.log(data); // undefined
})

// 情况2 (这里，finally方法相当于做了中间处理，起一个过渡的作用)
Promise.resolve(123).finally((data) => {
  console.log(data); // undefined
}).then(data => {
  console.log(data); // 123
})

// 情况3 (这里只要reject，都会走到下一个then的err中)
Promise.reject(123).finally((data) => {
  console.log(data); // undefined
}).then(data => {
  console.log(data);
}, err => {
  console.log(err, 'err'); // 123 err
})

// 情况4 (一开始就成功之后，会等待finally里的promise执行完毕后，再把前面的data传递到下一个then中)
Promise.resolve(123).finally((data) => {
  console.log(data); // undefined
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok');
    }, 3000)
  })
}).then(data => {
  console.log(data, 'success'); // 123 success
}, err => {
  console.log(err, 'err');
})

// 情况5 (虽然一开始成功，但是只要finally函数中的promise失败了，就会把其失败的值传递到下一个then的err中)
Promise.resolve(123).finally((data) => {
  console.log(data); // undefined
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('rejected');
    }, 3000)
  })
}).then(data => {
  console.log(data, 'success');
}, err => {
  console.log(err, 'err'); // rejected err
})

// 情况6 (虽然一开始失败，但是也要等finally中的promise执行完，才能把一开始的err传递到err的回调中)
Promise.reject(123).finally((data) => {
  console.log(data); // undefined
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolve');
    }, 3000)
  })
}).then(data => {
  console.log(data, 'success');
}, err => {
  console.log(err, 'err'); // 123 err
})
    `,
    template: ``,
  },
  {
    id: '13',
    title: '实现 Promise.all',
    difficulty: 'Medium',
    description: `
    对于 all 方法而言，需要完成下面的核心功能:

    传入参数为一个空的可迭代对象，则直接进行resolve。
    如果参数中有一个promise失败，那么Promise.all返回的promise对象失败。
    在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组
    function myPromiseAll(promises) {
  // 返回一个新的 Promise
  return new Promise((resolve, reject) => {
    
    const results = []; // 存放所有结果
    let completedCount = 0; // 记录完成了几个
    
    // 遍历每个 promise
    promises.forEach((promise, index) => {
      
      // 等这个 promise 完成
      promise
        .then(result => {
          results[index] = result; // 把结果放到对应位置
          completedCount++; // 完成数量 +1
          
          // 如果所有的都完成了
          if (completedCount === promises.length) {
            resolve(results); // 返回所有结果
          }
        })
        .catch(error => {
          reject(error); // 只要有一个失败，整个就失败
        });
    });
  });
}
    `,
    template: ``,
  },
  {
    id: '14',
    title: '实现 Promise.allSettle',
    difficulty: 'Medium',
    description: `
    MDN: Promise.allSettled()方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise\`结果

    当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时，通常使用它。

    【译】Promise.allSettled 跟 Promise.all 类似, 其参数接受一个Promise的数组, 返回一个新的Promise, 唯一的不同在于, 其不会进行短路, 也就是说当Promise全部处理完成后我们可以拿到每个Promise的状态, 而不管其是否处理成功。
    `,
    template: ``,
  },
  {
    id: '15',
    title: '实现 Promise.race',
    difficulty: 'Medium',
    description: `
    race 的实现相比之下就简单一些，只要有一个 promise 执行完，直接 resolve 并停止执行
    `,
    template: ``,
  },
  {
    id: '16',
    title: '实现 Promise',
    difficulty: 'Hard',
    description: `
    可以把 Promise 看成一个状态机。初始是 pending 状态，可以通过函数 resolve 和 reject ，将状态转变为 resolved 或者 rejected 状态，状态一旦改变就不能再次变化。
    then 函数会返回一个 Promise 实例，并且该返回值是一个新的实例而不是之前的实例。因为 Promise 规范规定除了 pending 状态，其他状态是不可以改变的，如果返回的是一个相同实例的话，多个 then 调用就失去意义了。
    对于 then 来说，本质上可以把它看成是 flatMap`,
    template: ``,
  },
  {
    id: '17',
    title: '实现【发布订阅】模式',
    difficulty: 'Medium',
    description: `
    简介：

发布订阅者模式，一种对象间一对多的依赖关系，但一个对象的状态发生改变时，所依赖它的对象都将得到状态改变的通知。

主要的作用(优点)：

广泛应用于异步编程中(替代了传递回调函数)
对象之间松散耦合的编写代码
缺点：

创建订阅者本身要消耗一定的时间和内存
多个发布者和订阅者嵌套一起的时候，程序难以跟踪维护
实现的思路：

创建一个对象(缓存列表)
on方法用来把回调函数fn都加到缓存列表中
emit 根据key值去执行对应缓存列表中的函数
off方法可以根据key值取消订阅`,
    template: ``,
  },
  {
    id: '18',
    title: '实现【观察者】模式',
    difficulty: 'Medium',
    description: `
    发布订阅者模式和观察者模式的区别？

    发布/订阅模式是观察者模式的一种变形，两者区别在于，发布/订阅模式在观察者模式的基础上，在目标和观察者之间增加一个调度中心。
    观察者模式是由具体目标调度，比如当事件触发，Subject 就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间是存在依赖的。
    发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在。
    
    观察者模式（基于发布订阅模式） 有观察者，也有被观察者

观察者需要放到被观察者中，被观察者的状态变化需要通知观察者 我变化了 内部也是基于发布订阅模式，收集观察者，状态变化后要主动通知观察者
核心组成
1️⃣ Observer（观察者）

有 update() 方法，接收被观察者的通知

2️⃣ Subject（被观察者/主题）

维护观察者列表 observers
attach() - 添加观察者
detach() - 移除观察者
notify() - 通知所有观察者
setState() - 状态改变时自动通知
`,
    template: ``,
  },
  {
    id: '19',
    title: '实现【单例】模式',
    difficulty: 'Medium',
    description: ``,
    template: ``,
  },
  {
    id: '20',
    title: '实现ES6的const',
    difficulty: 'Medium',
    description: `
    由于ES5环境没有block的概念，所以是无法百分百实现const，只能是挂载到某个对象下，要么是全局的window，要么就是自定义一个object来当容器
    `,
    template: ``,
  },
  {
    id: '21',
    title: '实现一个compose函数',
    difficulty: 'Medium',
    description: `
    组合多个函数，从右到左，比如：compose(f, g, h) 最终得到这个结果 (...args) => f(g(h(...args))).
    // 用法如下:
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11

提示：
    数组.reduce((累积值, 当前值) => {
      // 做一些计算
      return 新的累积值;
    }, 初始值);


    `,
    template: ``,
  },
  {
    id: '22',
    title: 'LRU问题',
    difficulty: 'Medium',
    description: `
    LRU 英文全称是 Least Recently Used，英译过来就是”最近最少使用“的意思。LRU 是一种常用的页面置换算法，选择最近最久未使用的页面予以淘汰。该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间 t，当须淘汰一个页面时，选择现有页面中其 t 值最大的，即最近最少使用的页面予以淘汰
    
    https://leetcode.cn/problems/lru-cache/description/?envType=study-plan-v2&envId=top-100-liked
    `,
    template: ``,
  },
  {
    id: '23',
    title: '实现数组扁平化flat（数组拍平）',
    difficulty: 'Medium',
    description: `
    题目描述: 实现一个方法使多维数组变成一维数组
    let ary = [1, [2, [3, [4, 5]]], 6];
let str = JSON.stringify(ary);
    `,
    template: ``,
  },
  {
    id: '24',
    title: '实现千位分隔符',
    difficulty: 'Medium',
    description: `
// 保留三位小数
parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'
    `,
    template: ``,
  },
  {
    id: '25',
    title: '实现一个JS函数柯里化',
    difficulty: 'Medium',
    description: `
    预先处理的思想，利用闭包的机制

柯里化的定义：接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数
函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行
柯里化把多次传入的参数合并，柯里化是一个高阶函数
每次都返回一个新函数
每次入参都是一个
当柯里化函数接收到足够参数后，就会执行原函数，如何去确定何时达到足够的参数呢？

有两种思路：

通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数
在调用柯里化工具函数时，手动指定所需的参数个数
将这两点结合一下，实现一个简单 curry 函数
// 普通函数：一次传入所有参数
function add(a, b, c) {
    return a + b + c;
}
add(1, 2, 3);  // 6

// 柯里化后：可以分多次传参
const curriedAdd = curry(add);
curriedAdd(1)(2)(3);  // 6
curriedAdd(1, 2)(3);  // 6
curriedAdd(1)(2, 3);  // 6

核心难点
这道题的难点是：怎么知道什么时候该返回结果？

    `,
    template: ``,
  },
  {
    id: '26',
    title: '请实现一个 add 函数，满足以下功能add(1, 2)(3) = 6',
    difficulty: 'Medium',
    description: `
add(1); \t\t\t// 1
add(1)(2);  \t// 3
add(1)(2)(3)；// 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
    `,
    template: ``,
  },
  {
    id: '27',
    title: '对象拍平',
    difficulty: 'Medium',
    description: `
    将嵌套的多层对象转换为单层对象,使用点号(.)连接嵌套的键名。问题说明当我们有一个深层嵌套的对象时,访问深层属性比较麻烦。扁平化后可以:

更容易地遍历所有属性
简化数据的存储(如存入数据库)
便于数据对比和序列化
// 例子1: 基本嵌套对象
const user = {
  name: 'John',
  address: {
    city: 'Beijing',
    detail: {
      street: 'Chaoyang Road',
      number: 123
    }
  },
  age: 30
}
console.log(objectFlat(user))
// 输出: {
//   name: 'John',
//   'address.city': 'Beijing',
//   'address.detail.street': 'Chaoyang Road',
//   'address.detail.number': 123,
//   age: 30
// }

// 例子2: 配置对象
const config = {
  database: {
    host: 'localhost',
    port: 3306,
    credentials: {
      username: 'admin',
      password: '123456'
    }
  },
  server: {
    port: 8080
  }
}
console.log(objectFlat(config))
// 输出: {
//   'database.host': 'localhost',
//   'database.port': 3306,
//   'database.credentials.username': 'admin',
//   'database.credentials.password': '123456',
//   'server.port': 8080
// }
    `,
    template: ``,
  },
  {
    id: '28',
    title: '实现lodash的chunk方法',
    difficulty: 'Medium',
    description: `
    数组按指定长度拆分
    
    _.chunk(['a', 'b', 'c', 'd'], 2)
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3)
// => [['a', 'b', 'c'], ['d']]

_.chunk(['a', 'b', 'c', 'd'], 5)
// => [['a', 'b', 'c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 0)
// => []
    `,
    template: ``,
  },
  {
    id: '29',
    title: ' 手写深度比较isEqual',
    difficulty: 'Medium',
    description: `
    思路：深度比较两个对象，就是要深度比较对象的每一个元素。=> 递归

递归退出条件：
被比较的是两个值类型变量，直接用“===”判断
被比较的两个变量之一为null，直接判断另一个元素是否也为null
提前结束递推：
两个变量keys数量不同
传入的两个参数是同一个变量
递推工作：深度比较每一个key
    `,
    template: ``,
  },
  {
    id: '30',
    title: '实现一个JSON.stringify',
    difficulty: 'Medium',
    description: `
    JSON.stringify 是 JavaScript 的内置方法,用于将 JavaScript 值(对象、数组等)转换为 JSON 字符串。
基本语法
javascriptJSON.stringify(value, replacer, space)
// 对象转字符串
const obj = { name: '张三', age: 25, city: '北京' }
const jsonStr = JSON.stringify(obj)
console.log(jsonStr)
// 输出: '{"name":"张三","age":25,"city":"北京"}'

// 数组转字符串
const arr = [1, 2, 3, 'hello']
console.log(JSON.stringify(arr))
// 输出: '[1,2,3,"hello"]'

// 嵌套对象
const nested = {
  user: {
    name: '李四',
    hobbies: ['reading', 'coding']
  }
}
console.log(JSON.stringify(nested))
// 输出: '{"user":{"name":"李四","hobbies":["reading","coding"]}}'

    `,
    template: ``,
  },
  {
    id: '31',
    title: '实现一个JSON.parse',
    difficulty: 'Medium',
    description: `
    用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)
    `,
    template: ``,
  },
  {
    id: '32',
    title: '转化为驼峰命名',
    difficulty: 'Easy',
    description: `
    var s1 = "get-element-by-id"
    转化为 getElementById
    `,
    template: ``,
  },
  {
    id: '33',
    title: ' 实现一个函数判断数据类型',
    difficulty: 'Medium',
    description: `
    调用:
      getType(null); // -> null
      getType(undefined); // -> undefined
      getType({}); // -> object
      getType([]); // -> array
      getType(123); // -> number
      getType(true); // -> boolean
      getType('123'); // -> string
      getType(/123/); // -> regexp
      getType(new Date()); // -> date
    `,
    template: ``,
  },
  {
    id: '34',
    title: '对象数组列表转成树形结构（处理菜单）',
    difficulty: 'Medium',
    description: `
    问题描述
      将扁平化的对象数组转换为具有层级关系的树形结构。这是前端开发中非常常见的需求,特别是在处理菜单、组织架构、分类目录等场景。
      核心特点
      输入: 扁平的数组,每个对象通过 parentId 字段标识其父节点
      输出: 嵌套的树形结构,子节点放在父节点的 children 数组中
      典型应用场景
      
      菜单系统: 后端返回扁平菜单列表,前端转为树形菜单
      组织架构: 员工列表转为部门树
      商品分类: 分类列表转为多级分类树
      评论系统: 评论列表转为带回复的树形结构
      文件目录: 文件列表转为文件夹树
      #10 对象数组列表转成树形结构（处理菜单）
[
    {
        id: 1,
        text: '节点1',
        parentId: 0 //这里用0表示为顶级节点
    },
    {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个字段来确定子父级
    }
    ...
]

转成
[
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id:2,
                text: '节点1_1',
                parentId:1
            }
        ]
    }
]
    `,
    template: ``,
  },
  {
    id: '35',
    title: '树形结构转成列表（处理菜单）',
    difficulty: 'Medium',
    description: `
    #11 树形结构转成列表（处理菜单）
[
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id:2,
                text: '节点1_1',
                parentId:1
            }
        ]
    }
]
转成
[
    {
        id: 1,
        text: '节点1',
        parentId: 0 //这里用0表示为顶级节点
    },
    {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个字段来确定子父级
    }
    ...
]
    `,
    template: ``,
  },
  {
    id: '36',
    title: '实现一个 sleep 函数，比如 sleep(1000) 意味着等待1000毫秒',
    difficulty: 'Easy',
    description: `
    sleep(1000).then(() => {
  // 这里写你的骚操作
})
    `,
    template: ``,
  },
  {
    id: '37',
    title: '给定两个数组，写一个方法来计算它们的交集',
    difficulty: 'Easy',
    description: `
    例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
    `,
    template: ``,
  },
  {
    id: '38',
    title: '异步并发数限制）',
    difficulty: 'Hard',
    description: `
    /**
 * 关键点
 * 1. new promise 一经创建，立即执行
 * 2. 使用 Promise.resolve().then 可以把任务加到微任务队列，防止立即执行迭代方法
 * 3. 微任务处理过程中，产生的新的微任务，会在同一事件循环内，追加到微任务队列里
 * 4. 使用 race 在某个任务完成时，继续添加任务，保持任务按照最大并发数进行执行
 * 5. 任务完成后，需要从 doingTasks 中移出
 */
 const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
limit(2, [1000, 1000, 1000, 1000], timeout).then((res) => {
  console.log(res)
})
 
    `,
    template: ``,
  },
  {
    id: '39',
    title: '异步串行 | 异步并行',
    difficulty: 'Hard',
    description: `
   给定一个每次只能计算两个数相加的异步函数,如何高效地计算多个数的总和?
   
      考察点:
      
      Promise 封装(Promisify)
      异步流程控制
      串行 vs 并行的性能优化
      reduce、Promise.all 等高阶用法
      
      问题分析
      限制条件
      
      asyncAdd 每次只能加两个数
      每次计算需要 500ms (模拟网络请求或复杂计算)
      需要计算多个数的总和
      
      两种解决方案对比
      方案执行方式时间复杂度适用场景串行顺序执行,一个接一个O(n) × 500ms依赖前一个结果并行同时执行,分治递归O(log n) × 500ms独立计算可并行
    `,
    template: ``,
  },
  {
    id: '40',
    title: '图片懒加载',
    difficulty: 'Hard',
    description: `
<!--// <img src="default.png" data-src="https://xxxx/real.png">-->
<!--// 测试-->
<!--window.addEventListener('load', imageLazyLoad)-->
<!--window.addEventListener('scroll', imageLazyLoad)-->
<!--// or-->
<!--window.addEventListener('scroll', throttle(imageLazyLoad, 1000))-->
    `,
    template: ``,
  },
  {
    id: '41',
    title: '创建10个标签，点击的时候弹出来对应的序号',
    difficulty: 'Easy',
    description: `
    题目描述:有一组版本号如下 ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']
    `,
    template: ``,
  },
  {
    id: '42',
    title: '版本号排序的方法',
    difficulty: 'Easy',
    description: `
    sleep(1000).then(() => {
  // 这里写你的骚操作
})
    `,
    template: ``,
  },
  {
    id: '43',
    title: 'End',
    difficulty: 'Medium',
    description: `
    `,
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
