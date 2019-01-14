<template>
  <div id="app">
		<perfree-comment v-on:editVal="submitActivities" ref="perfreeEdit" minHeight="100px" btnMessage="发布"></perfree-comment>
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
		submitActivities: function (data) {
      console.log(data)
      this.$refs.perfreeEdit.clearEdit()
    }
	}
}
</script>

<style>
</style>
