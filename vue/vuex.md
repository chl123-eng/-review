### 什么是 vuex

vuex 是专门为 vue 提供的全局状态管理系统，用于多个组件中数据共享、数据缓存等。

主要包括以下几个模块：

State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

### vuex 刷新数据消失怎么办

将数据在本地储存起来，可以通过 sessionStorage.set()保存，或者通过 vuex-persist 在 localStorage

### 为什么要加模块+命名空间

当应用变得非常复杂时，应用的所有状态集中到一个比较大的对象，store 对象就有可能变得相当臃肿

当模块被注册命名空间后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名，使模块更具封装性
