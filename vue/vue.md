### 计算属性 computed 和监听属性 watch 的区别，以及它们的应用场景？

computed：
定义：可以设置一个值，基于响应式属性进行缓存的，当依赖的属性发生改变的时候，他的值才会重新计算
应用场景：需要通过计算且依赖其他值，可以利用 computed 的缓存属性，不用每次都计算，提高性能

watch:
定义：监听某个属性变化时可以执行回调函数，deep 属性值可以监听对象内部数值的变化（array 不用深度监听），immediate 返回当前属性未变化前的值。
应用场景：当数据变化时执行异步，这是计算属性无法实现的，或者开销较大的操作

### vue 的生命周期

vue 创建实例后，会经过初始化数据. 编译模板. 挂载 DOM. 渲染编译. 渲染更新. 渲染销毁一系列过程，就是 vue 的生命周期

1. beforeCreate(创前前)：创建实例，但数。据还没初始化，所以不能访问 data. watch. computed 里面的数据
2. created(创建后)：数据初始化完成，可以访问响应式数据，但还没挂载到 DOM，所以不能访问节点。这里可以操作 axios 异步
3. beforeMount(挂载前)：调用 render 函数，编译模板
4. mounted(挂载后)：实例挂载到 dom 上，可以访问节点。这里可以获取 vNode 的信息. 异步的结果
5. beforeUpdate(更新前)：数据更新前调用，但视图还没渲染。可以用于访问更新前的 dom
6. updated(更新后)：数据更新且视图渲染完成。可以进行依赖于 DOM 的操作
7. beforeDestory(销毁前)：实例销毁前调用，可以用于销毁定时器，移除全局事件
8. destoryed(销毁后)：实例销毁后调用
9. keep-alive 有两个钩子： deactivated\activated, 组件进行缓存时执行“deactivated”,获取缓存时用“activated”

### v-if 和 v-show 的区别

v-if：是真正的条件渲染，会根据条件对块内的节点进行重建和销毁，切换渲染开销大
v-show: 总是被渲染的，只是改变 css 的 display 属性，是一直存在 DOM 中，初始渲染开销大，如果频繁切换渲染条件，则 v-show 更能提高性能

### v-for 为什么要添加 key

因为 vue 使用 v-for 是采取”就地更新“策略，如果遍历的对象顺序发生了变化，vue 不会移动元素，而是就地更新并且保证正确渲染，这样可以提高性能

如果添加一个 key，相当于给每个元素一个身份，这样对象变化的时候，vue 可以根据 key 追踪，从而判断重用或重新排序，保证更新的值更准确；同时用 item 的索引和 key 生成 map 对象，查找也更快

### v-if 和 v-for 不能在一个标签中一起使用

因为 v-for 的优先级比 v-if 高，如果是有条件判断 v-for，可以在 v-for 外层添加一个盒子放 v-if，如果是 v-for 中元素显隐不同，则先用 computed 将需要显示的元素计算出来

### v-if 添加 key 的作用

vue 在用 v-if 渲染的时候不会全部重新渲染，而是会复用已有的元素，这样更高效，因此切换条件后的元素会保留上一个条件的值
如果添加 key，则说明该元素不复用

###常用的修饰符极其作用
.stop: 阻止事件继续传播，可以解决事件冒泡问题
.sync: 实现父子组件双向绑定，并且子组件修改的值可以同步到父组件
.self: 触发自身元素的时间
.prevent: 不再重新加载页面
.once: 只触发一次事件
.trim: 过滤掉字符串首尾空白字符

### v-model 的实现

是根据不同的输入元素绑定不同的属性（input 为 value，checkbox 为 checked），然后根据不同的触发事件（input 为 input,checkbox 为 change）更新相对应绑定的属性
详情看 v-model.html

###为什么 data 要是一个函数
数据以函数返回值的形式定义，相当于每个组件实例都不是同一份数据，拥有私有是数据保存空间，如果 data 是一个对象就变成每个组件实例共用一份数据，一个组件实例数据变则其他实例都变

###组件间传值

1. props: 父组件向子组件传值作为子组件的 property
   $emit: 子组件通过$emit 触发函数向父组件传值
2. $parent和$child 获取父组件和子组件信息
3. 用$refs 获取组件
4. 父组件通过 provide 提供变量，子组件通过 inject 来注入变量
5. vuex 进行状态管理
6. eventbus 兄弟组件间进行传值

###动态组件

1. 通过<component>绑定 is 属性

```js
<component v-bind:is="currentTabComponent"></component>
```

2. keep-alive： 可以缓存第一次创建的组件，避免重复渲染

```js
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

### props 传值

当值为数字. 布尔值. 对象. 数组时，无论是动态还是静态，都要通过 v-bind 传递

###什么是单项数据流

父组件向子组件通过 props 传值，父组件更新该值，子组件相对应会变成最新的值，但反过来不行，所以子组件最好不要直接改变 props 的值

子组件可以改变 props 值的做法：

1. 新定义一个本地的 data 的 property，并将 props 作为初始值
2. 用 props 定义一个计算属性

### .sync 的作用

将 props 进行双向绑定

### vue2 响应式原理

#### 整体思路：数据劫持和观察者模式

vue 实例会遍历 data 里面的所有属性 property,通过 Object.defindProperty 将属性转换为 getter/setter,数组是通过重写数组的方法来实现。每个实例有一个 watcher，在组件渲染的时候会把接触过的属性记为依赖，当依赖的 setter 触发的时候会通知 watcher，然后让相关联的组件重新渲染

### vue 如何检测到数组变化

1. Vue.set()
2. 数组重写方法： pop\push\shift\unshift\sort\splice\reverse

改变数组索引和长度不能检测到

### vue 事件绑定原理

形式有两种：

1. 原生通过 addEventListener 绑定事件
2. vue 通过$on 绑定

$on、$emit 是基于发布订阅模式的，on 的时候将事件名称保存在事件中心，emit 的时候将事件发布，去执行事件中心的监听器
