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
          <el-select v-model="value" placeholder="请选择查看的问题类别" @change="currentSelect">
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
    <el-table :data="questionList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="问题详情：">
            <span>{{ props.row.details }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column prop="questionId" align="center" label="问题Id" width="80">
      </el-table-column>
      <el-table-column prop="label" align="center" label="问题标签" width="120">
      </el-table-column>
      <el-table-column prop="questioner" align="center" label="提问者" width="120">
      </el-table-column>
      <el-table-column prop="details" align="center" label="问题详情" width="190">
        <template slot-scope="scope">
          <span>{{scope.row.details | detailsFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="shield" align="center" label="屏蔽状态" width="80">
        <template slot-scope="scope">
          {{shieldMap[scope.row.shield]}}
        </template>
      </el-table-column>
      <el-table-column prop="end" align="center" label="终结状态" width="80">
        <template slot-scope="scope">
          {{endMap[scope.row.end]}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="small" :disabled="scope.row.shield == 0 ? true : false" @click="handleShield(scope.row)">屏蔽</el-button>
          <el-button type="success" size="small" :disabled="scope.row.shield == 1 ? true : false" @click="handleCancel(scope.row)">取消屏蔽</el-button>
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
      :total="questionList.length">
    </el-pagination>
  </section>
 </template>

 <script>
import {getQuestion, queryQuestion, blackQuestion, whiteQuestion, getWhiteQuestion, getBlackQuestion} from '../api/admin.js'
import {formatShield, formatEnd} from '../util/util.js'
export default {
    data() {
      return {
        shieldMap:['已屏蔽','未屏蔽'],
        endMap:['已终结','未终结'],
        questionList:[],
        currentPage:1,
        pagesize:10,
        input:'',
        options: [{
          value: 1,
          label: '全部问题'
        }, {
          value: 2,
          label: '未屏蔽问题'
        }, {
          value: 3,
          label: '已屏蔽问题'
        }],
        value: 1,
        currentValue: 1
      }
    },
    filters: {
      detailsFilter(value) {
        if (!value) return "";
        if (value.length > 10) {
          return value.slice(0, 10) + "...";
        }
        return value;
      }
    },
    methods:{
      handleSearch(){
        var input = {name: this.input}
        queryQuestion(input)
        .then((res) => {
          if (res.status === 200) {
            this.questionList = res.data
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
        if (this.currentValue == 1) {
          this.getQuestionList();
        }else if (this.currentValue == 2) {
          this.getWhiteQuestion();
        }else{
          this.getBlackQuestion();
        }
      },
      getQuestionList(){
        getQuestion().then((res) => {
          if (res.status === 200) {
            this.questionList = res.data;
          }
          console.log(res.data)
        }).catch((e) => {
          console.log(e)
        })
      },
      getWhiteQuestion(){
        getWhiteQuestion().then((res) => {
          if (res.status === 200) {
            this.questionList = res.data;
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      getBlackQuestion(){
        getBlackQuestion().then((res) => {
          if (res.status === 200) {
            this.questionList = res.data;
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      handleShield(row){
        var id = {questionId:row.questionId}
        blackQuestion(id).then((res) => {
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
        var id = {questionId:row.questionId}
        whiteQuestion(id).then((res) => {
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
      // 初始页currentPage、初始每页数据数pagesize和数据data
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
      this.getQuestionList();
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