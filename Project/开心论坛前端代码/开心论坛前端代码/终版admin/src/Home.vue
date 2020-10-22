 <template lang="html">
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-header>
      <span style="font-size: 20px">后台管理系统</span>
      <span  style="font-size: 14px; margin-left: 78%">{{adminName}}</span>
      <span id="logout" @click="logout">退出登录</span>
    </el-header>

    
    <el-container>
      <el-aside width="180px" style="background-color: rgb(238, 241, 246); text-align: center; height: 1000px;">
        <el-menu router :default-active="this.$route.path">
          <template v-for="(item,index) in $router.options.routes">
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
              <span slot="title"><i :class="child.iconCls"></i>{{child.name}}</span>
            </el-menu-item>
        </template>
        </el-menu>
      </el-aside>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
 </template>

 <script>
 import {adminLogout} from './api/admin.js'
export default {
	name:"Home",
  data() {
    return {
      adminName:localStorage.getItem("adminName")
    }
  },
  methods:{
    logout(){
      this.$confirm('确定要退出登录吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        }).then(() => {
            const name = {name:localStorage.getItem("adminName")}
            adminLogout(name).then((res) => {
              if (res.data === 1) {
                localStorage.removeItem("adminName");
                this.adminName = null;
                this.$router.push('/login')
              }else{
                console.log(res.data)
              }
            }).catch((e) => {
              console.log(e)
            })
        }).catch(() => {
      })
    }
  }
}
</script>

 <style scoped >
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  #logout{
    margin-left: 2%;
    font-size: 15px;
    cursor: pointer;
  }
</style>