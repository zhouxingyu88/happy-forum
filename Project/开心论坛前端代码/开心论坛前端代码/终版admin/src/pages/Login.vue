 <template lang="html">
	<div class="container">
		<div class="background">
			<img :src="Img" width="100%" height="100%" alt="">
		</div>
		<div class="login">
			<p>管理员登录</p>
			<el-form ref="form" :model="form" label-width="80px" size="mini">
				<el-form-item label="用户名">
					<el-input v-model="form.name" type="text"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.pwd" type="password" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit" style="margin-bottom: auto; width: 100%;">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
 </template>
	
 <script>
 import {adminLogin} from '../api/admin.js'
export default {
	name: 'Login',
	data(){
		return {
			Img:require('../assets/LoginBackground.png'),
			form:{
				name:'',
				pwd:''
			},
		}
	},
	methods:{
		navTo(route){
			this.$router.push(route)
		},
		onSubmit(){
			const loginParams = {
				name:this.form.name,
				password:this.form.pwd
			}
			// this.axios.post('http://localhost:8443/admin/login',loginParams)
			adminLogin(loginParams).then((res) => {
				// console.log(res)
				if (res.data === 1) {
					console.log(res)
					localStorage.setItem("adminName",loginParams.name)
				    this.$message({
			          message: '登录成功',
		              type: 'success',
		              offset: 40
		            })
					this.$router.push('/home')
				}else{
	              this.$message({
	                message:'登录失败',
	                type:'error'
	              })
				}
			}).catch((e) => {
				console.log(e)
			})
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
.login{
	z-index: 1;
	position: absolute;
	background: rgba(255,255,255,1);
	/*top: 50%;*/
	left: 0;
	right: 0;
	width: 350px;
	margin:200px auto;
	padding: 35px 35px 25px 0px;
	border-radius: 10px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
}
p{
	margin-top: -5px;
	margin-left: 38%;
	font-size: 25px;
	color: #555555;
}
</style>