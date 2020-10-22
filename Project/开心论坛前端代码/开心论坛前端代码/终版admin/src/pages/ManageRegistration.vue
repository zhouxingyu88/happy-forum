 <template lang="html">
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" >
        <el-form-item>
          <el-input placeholder="请输入搜索内容" type="text" v-model="input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="registerList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
    <el-table-column type="index" align="center" label="#" width="50" :index="this.index">
    </el-table-column>
      <el-table-column prop="name" align="center" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="phone" align="center" label="电话号码" width="180">
      </el-table-column>
      <el-table-column prop="mail" align="center" label="电子邮箱" width="180">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleSuccess(scope.row)">通过</el-button>
          <el-button type="danger" size="small" @click="handleError(scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10,15]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="registerList.length">
    </el-pagination>
  </section>
 </template>

 <script>
 import {getRegister, queryRegister, userRegister, refuseRegister} from '../api/admin.js'
export default {
   data() {
      return {
        index:1,
      	registerList:[],
        currentPage:1,
        pagesize:10,
        input:''
      }
    },
    methods: {
      handleSearch(){
        var input = {name: this.input}
        queryRegister(input)
        .then((res) => {
          if (res.status === 200) {
            this.registerList = res.data
            console.log(this.input)
          }else{
            console.log(e)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
    	getRegisterList() {
        getRegister().then((res) => {
          if (res.status === 200) {
            this.registerList = res.data;
            console.log(res.data)
          }
    		}).catch((e) => {
          console.log(e)
        })
    	},
      handleSuccess(row){
        var params = {
          phone:row.phone,
          name:row.name,
          password:row.password,
          mail:row.mail,
          sex:row.sex,
          age:row.age
        }
        userRegister(params).then((res) => {
          if (res.data === 1) {
            this.$message({
              message: '操作成功',
              type:'success',
              offset: 40
            });
            console.log(res)
            location.reload()
          }else{
            console.log(res)
            this.$message({
              message: '操作失败',
              type:'error',
              offset: 40
            });
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      handleError(row){
        var params = {
          phone:row.phone,
          name:row.name,
          password:row.password,
          mail:row.mail,
          sex:row.sex,
          age:row.age
        }
        refuseRegister(params).then((res) => {
          if (res.data === 1) {
            this.$message({
              message: '操作成功',
              type:'success',
              offset: 40
            });
            console.log(res)
            location.reload()
          }else{
            console.log(res)
            this.$message({
              message: '操作失败',
              type:'error',
              offset: 40
            });
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      handleSizeChange(size){
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      }
    },
    created(){
      this.getRegisterList();
    }
}
</script>

 <style scoped>
.el-pagination{
  margin-left: 28%;
  margin-top: 2%;
}
</style>