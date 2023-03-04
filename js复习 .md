<!--
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2023-03-01 10:20:06
 * @LastEditors: chl
 * @LastEditTime: 2023-03-03 22:20:23
-->

**基本数据类型介绍**
null、undefined、string、boolean、number、object，es6 中新增两种数据类型类型：symbol、bigInt，symbol 是表示独一无二的值，用来定义
对象中唯一的属性名；bigInt 可以用来表示任意大小的整数

**数据类型的判断**
typeof 可以判断值类型和函数，但不用用来判断 null、object、array 等引用类型，要用 instanceof

**值类型和引用类型的区别**
值类型是在栈中开辟内存储存变量，赋值给新的变量，会开辟新的储存空间保存副本，两个变量之间不会影响

引用类型是在栈中保存对象的指针，指向堆内存中的对象，赋值给新的对象是赋值指针副本，两个变量都是指向堆内存中的同一个变量，因此改变一个变量，另一个变量也会受到影响

不管是值类型还是引用类型在参数传递的时候都是值传递，值类型传递是值本身的副本，引用类型传递的对象的指针，但都指向堆内存中的同一对象，因此，改变函数局部对象的值会影响函数外的对象

**作用域和作用域链**
作用域：是执行环境中确定变量、函数的访问权限，保证变量的外泄
作用域链：是需要某个变量时，如果在当前作用域中没有，则去父级作用域链中寻找，一层层直到全局作用域，如果全局作用域中没有，则放弃寻找，这种层级关系叫做作用域链

**_拥有全局作用域的情况_**
1、最外层变量和函数
2、未声明直接复制的变量，会通过变量提升拥有全局作用域
3、window 的所有属性

**_添加块级作用域的方法_**
用 let 和 const 声明变量，可防止重复声明、for 循环中绑定作用域

**函数提升和变量提升**
1、声明都会提升
2、函数提升优于变量提升
3、赋值不会被提升

```
console.log(a);
var a = 1;
function a(){
    console.log(123);
}
```

相当于

```
function a(){
    console.log(123);
}
var a;
console.log(a);// f a(){conslog.log(123)}
a = 1;
```

###执行上下文

####执行上下文栈

#####代码 1

```
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

#####分析 1

```
ECStack.push(<checkscope> functionContext)
ECStack.pop(<checkscope> functionContext)
ECStack.push(<f> functionContext)
ECStack.pop(<f> functionContext)
```

#####代码 2

```
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

#####分析 2

```
ECStack.push(<checkscope> functionContext)
ECStack.push(<f> functionContext)
ECStack.pop(<checkscope> functionContext)
ECStack.pop(<f> functionContext)
```

####变量对象

执行上下文中定义的变量和函数声明

####this
函数运行时所在的环境

####执行上下文中作用域链和变量对象的创建过程
1、函数创建，保存作用域链到属性
2、执行函数，创建执行上下文，被压入执行上下文栈
3、执行前准备工作：复制属性创建作用域链；用 arguments 创建活动对象，初始化活动对象，添加形参、函数声明、变量声明；将活动对象压入作用域链顶端
4、准备工作做完，执行函数，修改活动对象的属性值
5、查找变量，返回后函数执行完毕，弹出执行上下文栈

###浅拷贝和深拷贝

####浅拷贝

#####拷贝的是引用类型的地址

```
Object.assign()
...拓展运算符
Array.concat()
Array.slice()
```

####深拷贝
JSON.parse(JSON.stringify())

```
function clone(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```

###原型和原型链
原型：每一个 javascript 对象在创建的时候都会与另一个对象相关联，这个对象就是原型，每一个对象都会从原型中继承属性，也就是 prototype 对象

原型链：由相互关联的原型组成的链式结构就是原型链

```
Person.prototype.constructor = Person
Person.prototype = person._proto_
Object.prototype = Person.prototype._proto_
Object.prototype._proto_ = null
```

###闭包
在函数创建执行上下文的时候，将父级的活动对象加到内部属性中，形成作用域链，所以即便在父级执行上下文被销毁后，因为活动对象被储存在内存中能被函数访问到，由此形成了闭包

####闭包的应用

```
函数作为参数传递
function print(fn) {
  const a = 200;
  fn();
}

const a = 100;
function fn() {
  console.log(a);
}

print(fn); // 100
```

```
函数作为返回值被返回
function create() {
  const a = 100;

  return function () {
    console.log(a);
  };
}

const fn = create();
const a = 200;
fn(); // 100
```

####自由变量

```
既不是函数的参数，也不是函数内部的变量

在函数定义的地方，向父级作用域查找，不是在函数执行的地方
```

###call、apply、bind 的实现

####实现某个参数，但改变了 this 的指向

####call 分别传入多个参数，apply 传入一个数组

```
const obj = {
value: "123";
}
function fn(){
console.log(this.value)
}
fn.call(obj);

```

###new 的实现

```
1、创建一个空对象
2、根据原型链，设置空对象的_proto_属性构造函数的prototype
3、将this指向空对象，并执行构造函数（给新对象添加属性）
4、判断函数返回值的类型，返回对象
```

```
function myNew(context){
    const obj = new Object();
    obj._proto_ = context.prototype;
    const res = context.apply(obj,[...arguments].slice(1));
    return typeof res ===  "object" ? res : obj;
}
```

###事件循环
1、同步和异步会进入不同场所，同步进入主线程，异步进入 event table 注册回调函数，宏任务进入宏任务队列，微任务进入微任务队列
2、指定事情做完后，会将这个任务移入到 event queue 任务队列中
3、同步任务全部做完后，即调用栈清空，任务队列头部的函数会进入到主线程，先执行完宏任务，再执行微任务
4、这个过程会循环，也就是事件循环（event loop）

```
宏任务：DOM 渲染后触发，如 setTimeout 、setInterval 、DOM 事件 、script 。
微任务：DOM 渲染前触发，如 Promise.then 、MutationObserver 、Node 环境下的 process.nextTick 。

setInterval 是每隔 m 秒将回调函数压入到任务队列中
```

###class 构造函数

```
###为什么子类继承父类，要在constructor加上super

因为要先将父类实例对象的属性和方法加到this中，然后再用子类的构造函数修改this，如果不调用super，就获取不到this
也就是，父类和子类的属性和方法都在this上
```

```
静态函数不被子类继承，而是由父类直接调用
子类引用父类的静态方法时，本身也应该是静态的
```

###Promise

#####可以调用回调函数，但不会陷入回调地狱的一种操作异步的方式

###async/await

#####用同步方式操作异步的方式
https://juejin.cn/post/6844904077537574919#heading-33

###垃圾回收机制

```
定义：定期找到不再用的内存，然后将其释放

方式：

标记清除法：为所有活动对象做上标记，然后清楚没有标记的
优点： 简单
确定，会导致空闲内存不连续，造成空间分配问题；分配速度慢

标记整理法：会将活动对象向一端移动，使空闲内存整合

引数计算法：判断对象有没有被引用，如果没有则被回收
缺点：计算器占用空间大；多种情况引用数量非0，但是非活动对象
```
