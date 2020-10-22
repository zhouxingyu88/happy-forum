<template lang="html">
 <section>
  <div id="myData">
    <Header/>
    <div id="notifications">
      <Notifications/>
    </div>
      <div class="box">
        <el-page-header @back="goBack" content="个人资料编辑" style="margin-left: 5%; margin-top: 2%;">
        </el-page-header>
  	    <div id="left">
          <el-form>
            <el-form-item>
              <el-avatar shape="square" :src="imageUrl" :size="150" fit="scale-down"></el-avatar>
              <el-upload
                class="upload-demo"
                action=""
                :limit=limitNum
                :auto-upload="false"
                :show-file-list="false"
                :on-exceed="handleExceed"
                :on-change='changeUpload'
                accept="image/jpeg, image/png">
                  <el-button slot="trigger" size="small" type="primary" icon="el-icon-zoom-in" style="width: 72px;">预览</el-button>
                  <el-button size="small" type="success" icon="el-icon-upload2" style="width: 72px;" @click="submitUpload">上传</el-button>
                <div slot="tip" class="el-upload_tip" style="font-size: 10px;">只能上传jpg/png文件</div>
              </el-upload>
              

            </el-form-item>
          </el-form>
      	</div>
      	<div id="right">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
			  <el-form-item label="用户名" prop="name">
			    <el-input type="text" v-model="ruleForm.name" :disabled="true"></el-input>
			  </el-form-item>
			  <el-form-item label="电话号码" prop="phone">
			  	<el-input type="text" v-model="ruleForm.phone" @focus="phoneFormVisible=true"></el-input>
			  </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio class="radio" :label="0">男</el-radio>
            <el-radio class="radio" :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
			  <el-form-item label="年龄" prop="age">
			  	<el-input type="text" v-model.number="ruleForm.age"></el-input>
			  </el-form-item>
			  <el-form-item style="margin-top: 10px;">
			    <el-button @click="codeFormVisible = true">修改密码</el-button>
			    <el-button type="info" @click="getUserInfo">放弃修改</el-button>
			    <el-button type="primary" @click="updateUserInfo">保存修改</el-button>
			  </el-form-item>
			</el-form>
      	</div>
      </div>
  </div>
<!-- 修改手机号码 -->
    <el-dialog title="修改手机号码" :visible.sync="phoneFormVisible" width="40%">
      <el-form ref="newPhoneData" :model="newPhoneData" label-width="80px" :rules="newPhoneRules" style="margin-right: 20px;">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="newPhoneData.phone" type="text" placeholder="请输入新的手机号码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="newPhoneData.code" type="text" placeholder="请输入验证码">
            <el-button slot="append" @click.native.prevent="getCode" :disabled="!show">
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{count}}s后重新获取</span>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-bottom: auto; width: 100%;" @click.native.prevent="toChangePhone">确认修改</el-button>
          <span style="float: right;">修改手机号码后需要重新登录</span>
        </el-form-item>
      </el-form>
    </el-dialog>
<!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="codeFormVisible" width="40%">
      <el-form ref="phoneData" :model="phoneData" label-width="80px" :rules="phoneRules" style="margin-right: 20px;">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="phoneData.phone" type="text" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="phoneData.code" type="text" placeholder="请输入验证码">
            <el-button slot="append" @click.native.prevent="getPwdCode" :disabled="!show">
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{count}}s后重新获取</span>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-bottom: auto; width: 100%;" @click.native.prevent="toNext">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-dialog width="40%" title="修改密码" :visible.sync="pwdFormVisible" append-to-body>
        <el-form ref="pwdData" :model="pwdData" label-width="80px" :rules="pwdRules" style="margin-right: 20px;">
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pwdData.newPwd" type="passward" placeholder="请输入新密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwdAgain">
            <el-input v-model="pwdData.pwdAgain" type="passward" placeholder="请再次输入新密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-bottom: auto; width: 100%;" @click.native.prevent="submitPwd">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
  </div>


 </section>
</template>

 <script>
import Header from '../components/Header.vue'
import Notifications from '../components/Notifications.vue'
import {getUserInfo, updateUserInfo, getUserIcon, uploadUserIcon, codeLogin, changePwd, changePhone, codeSender} from '../api/user.js'
export default {
  name:"MyData",
  components:{
    Header,
    Notifications
  },
  data() {
    return {
      userInfo:[],
      // filelist:[],
      imageUrl: '',
      fit: '',
      formVisible: false,
      file: '',  //当前被选择的图片
      limitNum: 1,
      fileName: '',
      param:'',
      ruleForm: {
        name: '',
        phone: '',
        sex: '',
        age: '',
      },
      codeFormVisible: false,
      phoneData:{
        phone:'',
        code:''
      },
      phoneRules: {
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur'}]
      },
      show:true,
      count:'',
      timer:null,
      pwdFormVisible: false,
      pwdData:{
        newPwd:'',
        pwdAgain:''
      },
      pwdRules: {
        newPwd: [{ required: true, message: '请输入新密码', trigger: 'blur'}],
        pwdAgain: [{ required: true, message: '请再次输入新密码', trigger: 'blur'}]
      },
      rules: {
        name: [{ required: true, message: '用户名', trigger: 'blur' }],
        phone: [{ required: true, message: '电话号码', trigger: 'blur' }],
        sex: [{ type: 'date', required: true, message: '请选择性别', trigger: 'change' }],
        age: [{ type: 'date', required: true, message: '请输入年龄', trigger: 'blur' }]
      },
      phoneFormVisible: false,
      newPhoneData:{
        phone:'',
        code:''
      },
      newPhoneRules: {
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur'}]
      },
    };
  },
  methods:{
    goBack(){
      this.$router.push('/personalCenter')
    },
    submitUpload(){
      var params = {
        icon: this.imageUrl,
        phone:sessionStorage.getItem("phone")
      }
      if (params.icon != '') {
        uploadUserIcon(params).then((res) => {
            if (res.data === 1) {
              this.$message({
                message: '头像上传成功',
                type:'success',
                offset:40
              });
            }else{
              this.$message({
                message: '头像上传失败',
                type:'error',
                offset:40
              });
            }
          }).catch((e) => {
                console.log(e)
          })
          /* 此处停留1秒刷新页面 */
        setTimeout(function(){
          location.reload();
          },1000)
      }else{
          this.$message({
            message: '请选择要上传的文件',
            type:'error',
            offset:40
          });
      }
    },
    changeUpload (file, fileList){
      console.log(file);
      var This = this;
      //this.imageUrl = URL.createObjectURL(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function(e){ 
          this.result // 这个就是base64编码了
          This.imageUrl = this.result;
      }
    },
    handleExceed(file, fileList){
      this.$message({
        message: '只能选择1个文件',
        type:'warning',
        offset:40
      });
    },
    getUserAvatar(){
      var phone = {phone:sessionStorage.getItem("phone")}
      getUserIcon(phone).then((res) => {
        if(res.status === 200)
          this.imageUrl = "data:image/png;base64," + res.data
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    },
    getUserInfo(){
      var phone = {phone:sessionStorage.getItem("phone")}
      getUserInfo(phone).then((res) => {
        if(res.status === 200)
          this.ruleForm.name = res.data.name;
          this.ruleForm.phone = res.data.phone;
          this.ruleForm.sex = res.data.sex;
          this.ruleForm.age = res.data.age;
        console.log(res)
      }).catch((e) => {
        alert(e)
      })
    },
    updateUserInfo(){
      const userInfo = {
        name:this.ruleForm.name,
        phone:this.ruleForm.phone,
        sex:this.ruleForm.sex,
        age:this.ruleForm.age
      }
      updateUserInfo(userInfo).then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          // location. reload()
          this.$message({
            message: '个人信息修改成功',
            type:'success',
            offset:40
          });
        }else{
          this.$message({
            message: '个人信息修改失败',
            type:'error',
            offset:40
          });
        }
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
      this.$refs.newPhoneData.validate((valid) => {
        if(valid){
          const phone = {phone:this.newPhoneData.phone}
          codeSender(phone).then((res) => {
            if(res.status === 200){
              sessionStorage.setItem("vertifyCode",res.data)
              console.log(sessionStorage.getItem('vertifyCode'))
              console.log(phone)
                this.$message({
                  message:'验证码发送成功',
                  type:'success',
                  offset: 40
                })
            }else{
                this.$message({
                  message:'验证码发送失败',
                  type:'error',
                  offset: 40
                })
            }
          }).catch((e) => {
            console.log(e)
          })
        }
      })
    },
    getPwdCode(){
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
            if(res.status === 200){
              sessionStorage.setItem("vertifyCode",res.data)
              console.log(sessionStorage.getItem('vertifyCode'))
                this.$message({
                  message:'验证码发送成功',
                  type:'success',
                  offset: 40
                })
            }else{
                this.$message({
                  message:'验证码发送失败',
                  type:'error',
                  offset: 40
                })
            }
          }).catch((e) => {
            console.log(e)
          })
        }
      })
    },
    toChangePhone(){
      this.$refs.newPhoneData.validate((valid) => {
        if (valid) {
          if(sessionStorage.getItem('vertifyCode') == this.newPhoneData.code){
            var user = {
              phone:this.newPhoneData.phone,
              name:sessionStorage.getItem("name")
            }
            changePhone(user).then((res) => {
              if (res.data == 1) {
                this.$message({
                  message:'手机号码修改成功，请重新登录',
                  type:'success',
                  offset: 40
                })
                sessionStorage.removeItem("name");
                sessionStorage.removeItem("phone");
                this.userName = null;
                this.$router.push('/userlogin')
              }else{
                this.$message({
                  message:'手机号码已存在',
                  type:'error',
                  offset: 40
                })
              }
            }).catch((e) => {
              console.log(e)
            })
          }else{
              this.$message({
                message:'验证码错误',
                type:'error',
                offset: 40
              })
          }
        }
      })
    },
    toNext(){
      this.$refs.phoneData.validate((valid) => {
        if (valid) {
          if(sessionStorage.getItem('phone') == this.phoneData.phone){
            if(sessionStorage.getItem('vertifyCode') == this.phoneData.code){
              this.codeFormVisible = false
              console.log(this.phoneData.code)
              this.pwdFormVisible = true
            }else{
              this.$message({
                message:'验证码错误',
                type:'error',
                offset: 40
              })
            }
          }else{
            this.$message({
              message:'请重新获取验证码',
              type:'error',
              offset: 40
            })
          }
        }
      })

    },
    submitPwd(){
      if (this.pwdData.newPwd == this.pwdData.pwdAgain) {
        var params = {
          phone: sessionStorage.getItem('phone'),
          password: this.pwdData.newPwd
        }
        changePwd(params).then((res) => {
          if (res.data === 1) {
            this.$message({
              message: '修改密码成功',
              type: 'success',
              offset: 40
            })
          this.pwdFormVisible = false
          }else{
            this.$message({
              message: '修改密码失败',
              type: 'error',
              offset: 40
            })
          }
        }).catch((e) => {
          console.log(e)
        })
      }else{
        this.$message({
          message: '两次输入的密码不一致',
          type: 'error',
          offset: 40
        })
      }
    }
  },
  created(){
    this.getUserInfo();
    this.getUserAvatar();
    // this.test();
  }
}
</script>

 <style scoped>
#myData{
  height: 800px;
  background-color: #edf5e1;
  position: flex;
  flex-direction: column;
}
.box{
  position: absolute;
  background-color: #feffff;
  width: 70%;
  height: 100vh;
  margin: 35px 200px 0px 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
#left{
	position: relative;
	margin-top: 50px;
	margin-left: 6%;
}
#right{
	position: relative;
	width: 60%;
	/*padding: 10px 20px;*/
	margin-top: -125px;
	margin-left: 30%;
	/*margin-bottom: 10%;*/
}
.notifications{
  position: fixed;
  top: 120px;
  left: 1200px;
}
</style>