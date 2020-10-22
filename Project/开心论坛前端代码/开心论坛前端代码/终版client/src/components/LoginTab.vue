 <template lang="html">
  <el-tabs v-model="activeName" stretch>
    <el-tab-pane label="账号密码登录" name="first">
		<div class="userlogin">
			<el-form ref="userData" :model="userData" label-width="80px" :rules="loginRules">
				<el-form-item label="用户名" prop="name">
					<el-input v-model="userData.name" type="text" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input v-model="userData.pwd" type="password" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="margin-bottom: auto; width: 100%;" @click.native.prevent="toLogin">登录</el-button>
					<el-link type="primary" :underline="false" style="margin-left: 60%;" href="./Register">没有账号，前往注册</el-link>
				</el-form-item>
			</el-form>
		</div>
    </el-tab-pane>
    <el-tab-pane label="短信验证码登录" name="second">
		<div class="userlogin">
			<el-form ref="phoneData" :model="phoneData" label-width="80px" :rules="phoneRules">
				<el-form-item label="手机号码" prop="phone">
					<el-input v-model="phoneData.phone" type="text" placeholder="请输入手机号码"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="code">
					<el-input v-model="phoneData.code" type="text" placeholder="请输入验证码">
						<el-button slot="append" @click.native.prevent="getCode" :disabled="!show">
							<span v-show="show">获取验证码</span>
							<span v-show="!show" class="count">{{count}}s后重新获取</span>
						</el-button>
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="margin-bottom: auto; width: 100%;" @click.native.prevent="toCodeLogin">登录</el-button>
					<el-link type="primary" :underline="false" style="margin-left: 60%;" href="./Register">没有账号，前往注册</el-link>
				</el-form-item>
			</el-form>
		  </div>
    </el-tab-pane>
  </el-tabs>
 </template>

 <script>
 import {accountLogin, codeLogin, getUserInfo, getUserPhone} from '../api/user.js'
export default {
	name:"LoginTab",
	data(){
		return {
		  activeName:"first",
	      userData:{
	      	name:'',
	      	pwd:''
	      },
	      phoneData:{
	      	phone:'',
	      	code:''
	      },
	      loginRules: {
	        name: [{ required: true, message: '请输入用户名', trigger: 'blur'}],
	        pwd: [{ required: true, message: '请输入密码', trigger: 'blur'}]
	      },
	      phoneRules: {
	        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur'}]
	        // code: [{ required: true, message: '请输入验证码', trigger: 'blur'}]
	      },
	      show:true,
	      count:'',
	      timer:null
	    }
	},
	methods:{
		navTo(route){
			this.$router.push(route)
		},
		toLogin(){
			this.$refs.userData.validate((valid) => {
				if(valid){
					const params = {
						name:this.userData.name,
						password:this.userData.pwd,
					}
					accountLogin(params).then((res) => {
			            if(res.data === 1){
				            sessionStorage.setItem("name", params.name)
				            this.getPhone();
				            this.$message({
				              message: '登录成功',
				              type: 'success',
				              offset: 40
				            })
							this.$router.push({path:'/home',
								query:{name:this.userData.name}
							})
						}else if(res.data === 0){
			              this.$message({
			                message:'用户名或密码错误',
			                type:'error'
			              })
						}else{
			              this.$message({
			                message:'用户名不存在',
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
		},
		getPhone(){
			var name = {name:sessionStorage.getItem("name")}
			getUserPhone(name).then((res) => {
				if (res.status === 200) {
					sessionStorage.setItem("phone",res.data)
					console.log(sessionStorage.getItem('phone'))
				}else{
					console.log(e)
				}
			}).catch((e) => {
				console.log(e)
			})
		},
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
			this.$refs.phoneData.validate((valid) => {
				if(valid){
					const phone = {phone:this.phoneData.phone}
					codeLogin(phone).then((res) => {
						if(res.data != ''){
							sessionStorage.setItem("vertifyCode",res.data)
							console.log(sessionStorage.getItem('vertifyCode'))
				            this.$message({
				              message:'验证码发送成功',
				              type:'success'
				            })
				            sessionStorage.setItem("phone",phone.phone)
				            console.log(sessionStorage.getItem('phone'))
				            this.getName();
						}else{
				            this.$message({
				              message:'用户手机号还未注册',
				              type:'error'
				            })
						}
					}).catch((e) => {
						console.log(e)
					})
				}
			})
		},
		toCodeLogin(){
			if(sessionStorage.getItem('phone') == this.phoneData.phone){
				if(sessionStorage.getItem('vertifyCode') == this.phoneData.code){
					console.log(this.phoneData.code)
					this.$message({
					  message: '登录成功',
					  type: 'success',
					  offset: 40
					})
					this.$router.push('/home')
				}else{
					this.$message({
					  message:'验证码错误',
					  type:'error'
					})
				}
			}else{
				this.$message({
				  message:'请重新获取验证码',
				  type:'error'
				})
			}
		},
		getName(){
		  const phone = {phone:sessionStorage.getItem("phone")}
	      getUserInfo(phone).then((res) => {
	        if(res.status === 200)
				sessionStorage.setItem("name",res.data.name)
				console.log(sessionStorage.getItem('name'))
	        console.log(res)
	      }).catch((e) => {
	        alert(e)
	      })
		}
	}
}
</script>

 <style scoped>
.userlogin{
/*	z-index: 1;
	position: fixed;*/
	background: rgba(255,255,255,1);
	left: 0;
	right: 0;
	width: 400px;
/*	margin:200px auto;*/
	padding: 10px 40px 0px 15px;
	border-radius: 10px;
	/*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3)*/
}
</style>