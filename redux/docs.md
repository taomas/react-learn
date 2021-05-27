## redux

#### bindActionCreators

用于将 actions 收集起来并且返回一个 dispatch 的数组

#### combineReducer

## react-toolkit

## 创建项目

```js
// js版本
npx create-react-app my-app --template redux

// ts版本
npx create-react-app my-app --template redux-typescript
```

这个 template 是依赖 create-react-app 能力扩展的自定义模板，对应模板地址是：https://github.com/reduxjs/cra-template-redux

## 本地运行

我是使用的 ts 版本创建的项目，创建后，执行以下命令，可以跑起一个本地服务。

```js
// 依赖安装
yarn
// 本地运行
yarn start
```

相关的 redux 配置主要在 src 目录下，features/counter 里面，我感觉目录结构很乱，简单重构了一版，地址：https://github.com/taomas/react-learn/tree/master/examples/redux-app-ts

## 代码解析

### 如何创建一个 store 并且注入到项目应用中

- 使用 reduxjs-toolkit 创建 store
- redux 就是通过一个全局的 store 对象来让组件之间共享创建，reduxjs-toolkit 的 configureStore 可以创建一个 store
- 示例

```js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})
```

通过 configureStore 创建的 store，在入口的 tsx 文件里面，通过 redux 的 Provider 组件提供给整个项目应用

- 示例

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { store } from './stores/index'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

### reduxjs-toolkit 的几个 api

关于 reduxjs-toolkit， 这是 redux 官方提供的一套使用 redux 最佳实践的工具方法包

- configureStore
- 入参

```js
reducer：可以是一个reducer function或者一个slice reducers对象
middleware：Redux middleware的数组，包含redux的一些中间件写法
devTools：是否让redux devtools监测到，默认为true，正式环境可以设置为false
preloadedState：预加载的状态，或者是初始化store状态
enhancers：store的enhancers数组，可以参考redux的createStore()里面配置
```

- slice 对象
  通过 createSlice 可以创建一个 slice 对象，slice 对象可以传到 store 的 reducers 里

```js
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    status: 'idle'
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})
```
