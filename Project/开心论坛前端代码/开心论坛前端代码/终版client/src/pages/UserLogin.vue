 <template lang="html">

	<div class="container">
		<div class="background">
			<img :src="Img" width="100%" height="100%" alt="">
		</div>
		<div class="loginTab">
			<loginTab/>
		</div>
	</div>
 </template>

 <script>
 import axios from 'axios'
 import store from '../store/index.js'
 import LoginTab from '../components/LoginTab.vue'
export default {
	name: 'UserLogin',
	components:{
		LoginTab
	},
	data(){
		return {
		  Img:require('../assets/LoginBackground.png')
	    }
	}
}
</script>

 <style scoped>
.container{
	margin: 0;
	padding: 0;
}
.background{
	width: 100%;
	height: 100vh;
	z-index: -1;
	position: fixed;
}
.loginTab{
	text-align: center;
	z-index: 1;
	position: fixed;
	background: rgba(255,255,255,1);
	left: 0;
	right: 0;
	width: 430px;
	margin:200px auto;
	padding: 15px 35px 0px 10px;
	border-radius: 10px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
}
</style>