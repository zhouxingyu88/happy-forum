 <template lang="html">
	<div class="container">
		<div class="background">
			<img :src="Img" width="100%" height="100%" alt="">
		</div>
		<div class="register">
			<p>欢迎注册</p>
			<el-form ref="userData" :model="userData" label-position="right" label-width="90px" :rules="registerRules">
			  <el-form-item label="用户名" prop="name">
			    <el-input v-model="userData.name" type="text" placeholder="请输入昵称"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="pwd">
			    <el-input v-model="userData.pwd" type="password" placeholder="请输入登录密码" show-password></el-input>
			  </el-form-item>
			  <el-form-item label="邮箱" prop="mail">
			    <el-input v-model="userData.mail" type="text" placeholder="请输入电子邮箱"></el-input>
			  </el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="userData.sex">
						<el-radio class="radio" :label="0">男</el-radio>
						<el-radio class="radio" :label="1">女</el-radio>
					</el-radio-group>
				</el-form-item>
			  <el-form-item label="年龄" prop="age">
			    <el-input v-model.number="userData.age" type="text" placeholder="请输入年龄"></el-input>
			  </el-form-item>
			  <el-form-item label="手机号码" prop="phone">
			    <el-input v-model="userData.phone" type="text" placeholder="请输入手机号码"></el-input>
			  </el-form-item>
				<el-form-item label="验证码" prop="code">
					<el-input v-model="userData.code" type="text" placeholder="请输入验证码">
						<el-button slot="append" @click.native.prevent="getCode" :disabled="!show">
							<span v-show="show">获取验证码</span>
							<span v-show="!show" class="count">{{count}}s后重新获取</span>
						</el-button>
					</el-input>
				</el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click.native.prevent="toRegister" style="margin-bottom: auto; width: 100%;">立即注册</el-button>
			    <el-link type="primary" :underline="false" style="margin-left: 65%;" href="./UserLogin">已有帐号，前往登录</el-link>
			  </el-form-item>
			</el-form>
		</div>
	</div>

 </template>

 <script>
 import {register, registerCode} from '../api/user.js'
export default {
	name: 'Register',
	data(){
		return {
			Img:require('../assets/LoginBackground.png'),
			userData:{
				name:'',
				pwd:'',
				phone:'',
				code:'',
				sex:'',
				age:''
			},
	        registerRules: {
	          name: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
	          pwd: [{ required: true, message: '请设置密码', trigger: 'blur'}],
	          phone: [{ required: true, message: '请输入手机号码', trigger: 'blur'},
	                  { min: 11, max: 11, message: '请输入可用的手机号码', trigger: 'blur' }],
	          mail: [{ required: true, message: '请输入电子邮箱', trigger: 'blur'}],
	          sex: [{ required: true, message: '请选择性别', trigger: 'change'}],
	          age: [{ required: true, message: '请输入年龄', trigger: 'blur'},
	          		{ type: 'number', message: '年龄必须为数字值', trigger: 'blur'}]
	        },
		    show:true,
		    count:'',
		    timer:null
		  }
	},
	methods:{
		getCode(){
			const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
			this.$refs.userData.validate((valid) => {
				if(valid){
					const phone = {phone:this.userData.phone}
					registerCode(phone).then((res) => {
						if(res.status === 200){
							sessionStorage.setItem("vertifyCode",res.data)
							console.log(sessionStorage.getItem('vertifyCode'))
				            this.$message({
				              message:'验证码发送成功',
				              type:'success'
				            })
						}else{
				            this.$message({
				              message:'验证码发送失败',
				              type:'error'
				            })
						}
					}).catch((e) => {
						console.log(e)
					})
				}
			})
		},
		toRegister(){
			if(sessionStorage.getItem('vertifyCode') == this.userData.code){
				this.$refs.userData.validate((valid) => {
					if(valid){
						const params = {
							name:this.userData.name,
							password:this.userData.pwd,
							phone:this.userData.phone,
							mail:this.userData.mail,
							sex:this.userData.sex,
							age:this.userData.age
						}
						register(params).then((res) => {
							if(res.data === 1){
								console.log(res)
								this.$message({
						          message: '注册信息提交成功，等待审批，',
						          offset:40
						        });
								this.$router.push({path:'/home'})
							}else if (res.data === -1) {
				              this.$message({
				                message:'用户名已存在',
				                type:'error'
				              })
				            }else{
				              this.$message({
				                message:'电话号码已被注册',
				                type:'error'
				              })
				            }
						}).catch((e) => {
							console.log(e)
						})
					}else{
						console.log('error submit!!');
	            		return false;
					}
				})
			}else{
				this.$message({
				  message:'验证码错误',
				  type:'error'
				})
			}
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
.register{
	z-index: 1;
	position: fixed;
	background: rgba(255,255,255,1);
	left: 50%;
	width: 450px;
	margin:20px auto;
	padding: 30px 80px 10px 35px;
	border-radius: 10px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)
}
p{
	margin-top: -5px;
	margin-left: 5%;
	font-size: 30px;
	color: #555555;
}
</style>