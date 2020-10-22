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
          <el-select v-model="value" placeholder="请选择查看的回答类别" @change="currentSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-form>
    </el-col>
    <el-table :data="answerList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="回答详情：">
            <span>{{ props.row.details }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
      <el-table-column prop="answerId" align="center" label="回答Id" width="80">
      </el-table-column>
      <el-table-column prop="answerer" align="center" label="回答者" width="180">
      </el-table-column>
      <el-table-column prop="details" align="center" label="回答详情" width="190">
        <template slot-scope="scope">
          <span>{{scope.row.details | detailsFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="aQuestionId" align="center" label="问题Id" width="180">
      </el-table-column>
      <el-table-column prop="shield" align="center" label="屏蔽状态" width="90">
        <template slot-scope="scope">
          {{shieldMap[scope.row.shield]}}
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
      :total="answerList.length">
    </el-pagination>
  </section>
 </template>

 <script>
import {getAnswer, queryAnswer, blackAnswer, whiteAnswer, getWhiteAnswer, getBlackAnswer} from '../api/admin.js'
import {formatShield,} from '../util/util.js'
export default {
    data() {
      return {
        shieldMap:['已屏蔽','未屏蔽'],
        answerList:[],
        currentPage:1,
        pagesize:10,
        input:'',
        options: [{
          value: 1,
          label: '全部回答'
        }, {
          value: 2,
          label: '未屏蔽回答'
        }, {
          value: 3,
          label: '已屏蔽回答'
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
        queryAnswer(input)
        .then((res) => {
          if (res.status === 200) {
            this.answerList = res.data
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
        console.log(this.currentValue)
        if (this.currentValue == 1) {
          this.getAnswerList();
        }else if (this.currentValue == 2) {
          this.getWhiteAnswer();
        }else{
          this.getBlackAnswer();
        }
      },
      getAnswerList(){
        getAnswer().then((res) => {
          if (res.status === 200){
            this.answerList = res.data;
          }
          console.log(res.data)
        }).catch((e) => {
          console.log(e)
        })
      },
      getWhiteAnswer(){
        getWhiteAnswer().then((res) => {
          if (res.status === 200) {
            this.answerList = res.data;
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      getBlackAnswer(){
        getBlackAnswer().then((res) => {
          if (res.status === 200) {
            this.answerList = res.data;
          }
        }).catch((e) => {
          console.log(e)
        })
      },
      handleShield(row){
        var id = {answerId:row.answerId}
        blackAnswer(id).then((res) => {
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
        var id = {answerId:row.answerId}
        whiteAnswer(id).then((res) => {
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
      this.getAnswerList();
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