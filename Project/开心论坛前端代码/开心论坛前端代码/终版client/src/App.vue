<template>
  <div id="app">
    <router-view v-if="isRouterActive"></router-view>
  </div>
</template>

<script>
// import Home from '@/pages/Home.vue'
export default {
  name: 'App',
  provide(){
  	return{
  		reload:this.load
  	}
  },
  data(){
  	return{
  		isRouterActive:true
  	}
  },
  methods:{
  	reload(){
  		this.isRouterActive = false
  		this.$nextTick(function(){
  			this.isRouterActive = true
  		})
  	}
  }
}
</script>

<style>

</style>
