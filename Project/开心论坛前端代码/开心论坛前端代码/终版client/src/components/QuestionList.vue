 <template lang="html">
  <div class="container">
  	<QuestionItem
  		v-for="(item,index) in currentPageData"
      :questionId="item.questionId"
  		:details="item.details | detailsFilter"
      :time="item.time"
      :key = "index"
		/>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total, prev, pager, next, jumper"
      :total="questionList.length">
    </el-pagination>
  </div>

 </template>

 <script>
 import QuestionItem from './QuestionItem.vue'
 import {getAllQuestion} from '../api/question.js'
export default {
  name:"QuestionList",
  components:{
  	QuestionItem
  },
  data(){
  	return{
      questionList:[],   //问题列表
      pagesize: 10 , //每页显示20条数据
      currentPage: 1, //当前页码
      currentPageData:[]
  	}
  },
  filters: {
    detailsFilter(value) {
      if (!value) return "";
      if (value.length > 25) {
        return value.slice(0, 25) + "...";
      }
      return value;
    }
  },
  methods:{
    getQuestionList(){
      getAllQuestion().then((res) => {
        if(res.status === 200)
          this.questionList = res.data
          this.handleCurrentChange(this.currentPage);
      }).catch((e) => {
        alert(e);
      })
    },
    setCurrentPageData(){
            let begin = (this.currentPage - 1) * this.pagesize;
            let end = this.currentPage * this.pagesize;
            this.currentPageData = this.questionList.slice(
                begin,
                end
            );
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.setCurrentPageData();
      console.log(this.currentPage)  //点击第几页
      console.log(this.currentPageData)
    }
  },
  mounted(){
  	this.getQuestionList();
  }
}
</script>

 <style scoped>
 .QuestionItem:nth-child(2n) {
     background-color: #F7FFF8;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .el-pagination{
    margin-left: 28%;
    margin-top: 2%;
  }
</style>