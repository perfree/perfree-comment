一款可以自定义表情包的评论框组件
## 安装依赖
```
npm i perfree-comment -S
```
## 引入项目
在main.js全局引入
```js
import Vue from 'vue'
import App from './App.vue'
import PerfreeComment from 'perfree-comment'

Vue.use(PerfreeComment)
new Vue({
  el: '#app',
  render: h => h(App)
})
```
## 使用
在需要使用的组件内简单使用
```vue
<template>
  <div id="app">
		<div style="width: 500px;">
			<perfree-comment  v-on:editVal="submitActivities" ref="perfreeEdit" minHeight="100px"
			 btnMessage="发布" fontTotalNumber="1000" emjoiFontNumber="3"></perfree-comment>
		</div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
	methods: {
		// 点击提交按钮事件
		submitActivities: function (data) {
			// 返回的输入框内容
			console.log(data)
			// 清空输入框
			this.$refs.perfreeEdit.clearEdit()
		}
	}
}
</script>

<style>
</style>
```
## 简单说明
v-on:editVal: 绑定提交事件,当点击发布按钮会触发此方法回传输入框的值

minHeight: 输入框的最低高度

btnMessage: 按钮的文字

fontTotalNumber: 字数总数

emjoiFontNumber: 一个emjoi占多少个字数

[详细文档(document)地址](https://perfree.github.io/perfree-comment-docs-page/)