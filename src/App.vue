<template>
  <div id="app">
		<perfree-comment v-on:editVal="submitActivities" ref="perfreeEdit" minHeight="100px" btnMessage="发布" :emjoiList="emjoiLists"
		 fontTotalNumber="1000" emjoiFontNumber="3"></perfree-comment>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
			emjoiLists: [
				{
					"emjoiName":"大脸萌",
					"emjoiList":[
						{url: require('./assets/emjoi/dalianmeng/guangbo.svg'), title: '广播'}
					]
				}
			]
    }
  },
	methods: {
		submitActivities: function (data) {
      console.log(data)
      this.$refs.perfreeEdit.clearEdit()
    }
	}
}
</script>

<style>
</style>
