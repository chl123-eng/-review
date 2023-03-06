<!--
 * @Descripttion:
 * @version:
 * @Author: chl
 * @Date: 2023-03-01 10:20:06
 * @LastEditors: 谢树宏 384180258@qq.com
 * @LastEditTime: 2023-03-06
-->

###基本数据类型介绍

null、undefined、string、boolean、number、object，es6 中新增两种数据类型类型：symbol、bigInt，symbol 是表示独一无二的值，用来定义
对象中唯一的属性名；bigInt 可以用来表示任意大小的整数

###数据类型的判断

typeof 可以判断值类型和函数，但不用用来判断 null、object、array 等引用类型，要用 instanceof

###值类型和引用类型的区别

####动态属性

```js
引用类型存在动态属性，值类型没有
```

####变量赋值

```js
值类型是在栈中开辟内存储存变量，赋值的是值的副本，两个变量之间不会影响

引用类型是在栈中保存对象的指针，指向堆内存中的对象，赋值给新的对象是赋值指针副本，两个变量都是指向堆内存中的同一个变量，因此改变一个变量，另一个变量也会受到影响
```

####参数传递

```js
都是值传递，值类型传递的是值的副本，引用类型传递的是指针副本
```

###作用域和作用域链

作用域：确定执行环境中活动变量的访问权限，保证变量的外泄

作用域链：函数声明的时候就被确定，是需要某个变量时，如果在当前作用域中没有，则去父级作用域链中寻找，一层层直到全局作用域，如果全局作用域中没有，则放弃寻找，这种层级关系叫做作用域链（也就是多个执行环境的活动变量组成链表结构），确保有权限的活动变量的有序访问

####延长作用域链
1、with 语句： 将指定的对象的属性和方法以及语块中声明的变量作为活动变量之一，放到作用域链中的顶端
2、try-catch 语句： catch 语句会创建一个新的变量对象

####拥有全局作用域的情况

1、最外层变量和函数
2、未声明直接复制的变量，会通过变量提升拥有全局作用域
3、window 的所有属性

####添加块级作用域的方法

用 let 和 const 声明变量，可防止重复声明、for 循环中绑定作用域

```js
如果没有使用，该变量会添加到全局作用域
```

###函数提升和变量提升
1、声明都会提升
2、函数提升优于变量提升
3、表达式不会被提升

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

###执行上下文(执行环境、作用域)

####js 在执行一段代码的时候，就是创建执行上下文，每段执行上下文都包含三个重要属性：活动对象(包含了环境中定义的所有变量和函数)、作用域链、this

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

```js
var name = 'The Window';
var object = {
  name: 'My Object',
  getNameFunc: function () {
    return function () {
      return this.name;
    };
  },
};
alert(object.getNameFunc()()); //window;
```

```js
改变this的指向;
var name = 'The Window';
var object = {
  name: 'My Object',
  getNameFunc: function () {
    return function () {
      console.log(this);
      return this.name;
    };
  },
};
object.getNameFunc().call(object);
```

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
Array.concat()//会返回一个新的数组
Array.slice()//会返回一个新的数组
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

原型链：由相互关联的原型组成的链式结构就是原型链(一个实例的*proto*指向构造函数的原型对象，而构造函数原型对象的*proto*指向其构造函数的原型对像)

function SuperType(){
this.property = true;
}
SuperType.prototype.getSuperValue = function(){
return this.property;
};
function SubType(){
this.subproperty = false;
}
//继承了 SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function (){
return this.subproperty;
};
var instance = new SubType();
alert(instance.getSuperValue());

```
Person.prototype.constructor = Person
Person.prototype = person._proto_
Object.prototype = Person.prototype._proto_
Object.prototype._proto_ = null
```

###闭包
在函数创建执行上下文的时候，将父级的活动对象加到内部属性中，形成作用域链，所以即便在父级执行上下文被销毁后，因为活动对象（父级作用域的）被储存在内存中能被函数访问到，由此形成了闭包

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

####实现某个参数，但改变了 this 的指向（指向第一个参数）

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

标记清除法：为所有活动对象做上标记，然后清除没有标记的
优点： 简单
确定，会导致空闲内存不连续，造成空间分配问题；分配速度慢

标记整理法：会将活动对象向一端移动，使空闲内存整合

引数计算法：判断对象有没有被引用，如果没有则被回收
缺点：计算器占用空间大；多种情况引用数量非0，但是非活动对象
```

###检测是数组的方法
1、instanceof
2、Array.isArray(value)

###数组的方法
1、pop/push 从数组后端取/推
2、unshift/shift 从数组前端取/推
3、reserve/sort 反转数组， sort 按大小排列
4、concat/slice 赋值数组，添加数组元素，剪切数组元素
5、indexOf/lastIndexOf 从开头/结尾根据索引查找数组元素
6、every() 给定一个函数，数组的每一项都满足函数，返回 true
7、some() 任意一项满足给定的函数返回 true
8、filter() 返回满足函数的值组成的数组
9、map() 返回运行某个函数后的结果组成的数组
10、forEach() 运行某个数组，没有返回值
11、reduce/reduceRight 归并数组的值

###RegExp 的实例方法
1、exec() : index(匹配字符串所在位置) input(被匹配的字符串)
2、test()： 字符串满足规则就返回 true

###函数
1、函数声明、函数表达式两种方式
2、arguments（包含传入函数的所有参数的类数组）
3、callee：arguments 的属性，指向拥有 arguments 的函数

```
应用：解除与函数名的耦合
function factorial(num){
if (num <=1) {
return 1;
} else {
return num * arguments.callee(num-1)
}
}
```

###创建对象

#####1、工厂模式

```
function createPerson(name, age){
    var o = new Object();
    o.name=name;
    o.age = age;
    return o;
}
var person1 = createPerson("John",12)
```

#####2、构造函数模式

```
function Person(name,age){
    this.name = name;
    this.age = age;
}
var person1 = new Person("John",12)
```

#####new 的实现

```
1、创建一个空对象
2、根据原型链，设置空对象的_proto_属性构造函数的prototype
3、将this指向空对象，在空对象的作用域执行构造函数（给新对象添加属性）
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

#####两者的区别

```js
先在person1属性中找，没有再去_proto_找，而person1._proto_ = Person.prototype;Person.prototype.constructor = Person =>
person1.constructoe = Person;

由此可以解决对象识别的问题;
```

#####原型模式

```js
定义：创建构造函数的时候有一个属性prototype指向了原型对象，原型对象保存了constructor和实例所共享的属性和方法，属性constructor所包含的指针执行了构造函数，实例有一个_proto_属性也指向了原型对象
由此得出：
Person.prototype = person1._proto_
Person.prototype.constructor = Person

当实例添加一个属性，就会屏蔽原型对象中同名的属性，哪怕是赋值null，也一样，只有delete掉实例中的属性，才能恢复与原型对象的连接

优点：能让实例共享属性和方法，同时保持封装性

Object.keys()遍历所有可枚举的属性
```

#####字面量重写原型对象

```js
person1.constructor == Person; //false
也就是说没法确定实例的类型;
需要在字面量中指定constructor指向构造函数;

function Person() {}
Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName: function() {
    alert(this.name);
  },
};
构造函数创建实例时产生的prototype指向原型对象，现在指向一个新的对象，所以切断了构造函数和原型对象之间的联系需要重新指定，但添加了constructor: Person 也是指向新的Person 原型
```

###继承

通过原型链实现继承，一个实例指向构造函数的原型对象，原型对象指向另一个构造函数的原型

```
检测继承某原型的实例的方法：
instanceof
isPrototypeOf

组合式继承：通过原型链实现对原型属性和方法的继承（缺点是因为共用导致会相互影响），通过构造函数实现对实例对象的继承（缺点是没法实现函数或属性复用），这样既实现了复用，又让实例有自己的属性

  function SuperType(name) {
    this.name = name;
  }
  function SupType(name, age) {
    SuperType.call(this, name);//构造函数
    this.age = age;
  }
  SuperType.prototype.sayAge = function() {
    console.log(this.age);
  };//原型链
  SupType.prototype = new SuperType();
  var instance = new SupType("jack", 12);
  console.log(instance.name);
  instance.sayAge();
```

###事件流：从页面接收事件的顺序

1、事件冒泡： 从文档嵌入最深层的节点开始，一层一层向外传递，到 body、html、document
2、事件捕获：document 最先接收到事件，然后按节点树一层一层往下传递，直到某个节点
3、DOM 事件流的过程：事件捕获、事件处理、事件冒泡
4、DOM2 级事件处理程序的方法：addEventListener、removeEventListener，传入三个参数：事件程序名、事件处理函数名、true(捕获阶段处理函数)/false(冒泡阶段处理)

```js
var btn = document.getElementById('myBtn');
var handler = function () {
  alert(this.id);
};
btn.addEventListener('click', handler, false);
//这里省略了其他代码
btn.removeEventListener('click', handler, false);
```

5、事件对象（event）：创建事件的时候，会产生一个对象，里面包含事件的所有信息
6、阻止事件冒泡/捕获:event.stopPropagation()
7、IE 阻止事件冒泡：cancelBubble

```js
var btn = document.getElementById('myBtn');
btn.onclick = function (event) {
  alert('Clicked');
  event.stopPropagation();
};
document.body.onclick = function (event) {
  alert('Body clicked');
};
```

8、事件委托：利用事件冒泡，只指定一个事件处理程序就可以某一类的所有事件
