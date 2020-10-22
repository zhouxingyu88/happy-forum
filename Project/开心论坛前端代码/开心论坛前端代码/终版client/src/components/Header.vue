 <template lang="html">
      <header>
        <div class="container">
          <span class="title" @click="navTo('/home')">首页</span>
              <div class="right" v-if="userName != null">
                <span class="name">欢迎您，{{userName}}</span>
                <span @click="navTo('./PersonalCenter')">个人中心</span>
                <span @click="logout">退出登录</span>
              </div>
              <div class="right" v-else>
                <span @click="navTo('./Register')">注册</span>
                <span @click="navTo('./UserLogin')">登录</span>
              </div>
        </div>
      </header>
 </template>

 <script>
export default {
	name:"Header",
    data(){
        return{
            userName:sessionStorage.getItem("name")
        }
    },
	methods:{
		navTo(route){
			this.$router.push(route)
		},
        logout(){
          this.$confirm('确定要退出登录吗？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                sessionStorage.removeItem("name");
                sessionStorage.removeItem("phone");
                this.userName = null;
                this.$router.push('/home')
            }).catch(() => {
          })
        }
	}
}
</script>

 <style scoped>
  header{
    width: 100%;
    background-color: #2B3D43;
    height:40px;
    color: #feffff;
    user-select:none;
    z-index: 10000;
    position: fixed;
    left: 0;
    top: 0;
}
.container{
    position: relative;
    height:40px;
}
.title{
    position: absolute;
    left: 0;
    display: inline-block;
    height: 20px;
    top: 50%;
    margin-top: -13px;
    line-height: 26px;
    font-size: 15px;
    cursor: pointer;
}
.right{
    position: absolute;
    right: 0;
    display: inline-block;
    height: 20px;
    top: 50%;
    margin-top: -13px;
    line-height: 26px;
    font-size: 15px;
}
span{
    margin-left: 15px;
    margin-right: 10px;
    cursor: pointer;
}
</style>