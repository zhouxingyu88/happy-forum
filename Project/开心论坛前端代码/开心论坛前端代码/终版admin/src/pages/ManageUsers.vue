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
        <el-form-item>
          <el-select v-model="value" placeholder="请选择查看的用户类别" @change="currentSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
    <el-table-column type="index" align="center" label="#" width="50" :index="this.index">
    </el-table-column>
      <el-table-column prop="name" align="center" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="phone" align="center" label="电话号码" width="180">
      </el-table-column>
      <el-table-column prop="sex" align="center" label="性别" width="100">
        <template slot-scope="scope">
          {{genderMap[scope.row.sex]}}
        </template>
      </el-table-column>
      <el-table-column prop="age" align="center" label="年龄" width="100">
      </el-table-column>
      <el-table-column prop="shield" align="center" label="状态" width="100">
        <template slot-scope="scope">
          {{shieldMap[scope.row.shield]}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" :disabled="scope.row.shield == 0 ? true : false" @click="handleShield(scope.row)">拉黑</el-button>
          <el-button type="success" size="small" :disabled="scope.row.shield == 1 ? true : false" @click="handleCancel(scope.row)">取消拉黑</el-button>
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
      :total="userList.length">
    </el-pagination>
  </section>
 </template>

 <script>
 import {getUser, queryUser, blackUser, whiteUser, getWhiteUser, getBlackUser} from '../api/admin.js'
 import {formatSex, formatUserShield} from '../util/util.js'
export default {
    data() {
      return {
        index:1,
        genderMap:['男','女'],
        shieldMap:['已拉黑','未拉黑'],
        userList:[],
        currentPage:1,
        pagesize:10,
        input:'',
        options: [{
          value: 1,
          label: '全部用户'
        }, {
          value: 2,
          label: '未拉黑用户'
        }, {
          value: 3,
          label: '已拉黑用户'
        }],
        value: 1,
        currentValue: 1
      }
    },
    methods: {
      handleSearch(){
        var input = {name: this.input}
        queryUser(input).then((res) => {
          if (res.status === 200) {
            this.userList = res.data
            console.log(this.input)
          }else{
            console.log(e)
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      currentSelect(currentValue){
        this.currentValue = currentValue;
        // console.log(this.currentValue)
        // console.log(this.value)
        if (this.currentValue == 1) {
          this.getUserList();
        }else if (this.currentValue == 2) {
          this.getWhiteUser();
        }else{
          this.getBlackUser();
        }
      },
      getUserList(){
        getUser().then((res) => {
          if (res.status === 200) {
            this.userList = res.data;
          }
          console.log(res.data)
        }).catch((e) => {
          console.log(e)
        })
      },
      getWhiteUser(){
        getWhiteUser().then((res) => {
          if (res.status === 200) {
            this.userList = res.data;
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      getBlackUser(){
        getBlackUser().then((res) => {
          if (res.status === 200) {
            this.userList = res.data;
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      handleShield(row){
        var phone = {phone:row.phone}
        blackUser(phone).then((res) => {
          if (res.data === 1) {
            this.$message({
              message: '操作成功',
              type:'success',
              offset: 40
            });
            location. reload()
            console.log(res)
          }else{
            console.log(res.data)
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
      handleCancel(row){
        var phone = {phone:row.phone}
        whiteUser(phone).then((res) => {
          if (res.data === 1) {
            location. reload()
            this.$message({
              message: '操作成功',
              type:'success',
              offset: 40
            });
            console.log(res)
            location. reload()
          }else{
            console.log(res.data)
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
      this.getUserList();
    }
}
</script>

 <style scoped>
.el-pagination{
  margin-left: 28%;
  margin-top: 2%;
}
.el-select{
  margin-left: 500px;
}
</style>