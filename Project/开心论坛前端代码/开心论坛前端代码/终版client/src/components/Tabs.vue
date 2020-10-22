 <template lang="html">
 	<div>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
	    <el-tab-pane label="我的问题" name="1">
  			<div id="questionList">
  			  <MyQuestion v-for="(item,index) in currentQuestionData"
        		  :questionId="item.questionId"
    			    :details="item.details"
        		  :time="item.time"
              :end="item.end"
        		  :key = "+item.questionId"
  			/>
          <el-pagination
            @current-change="handleCurrentQuestionChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="questionList.length">
          </el-pagination>
  			</div>
	    </el-tab-pane>
	    <el-tab-pane label="我的回答" name="2">
  			<div id="answerList">
  			  <MyAnswer v-for="(item,index) in currentAnswerData"
        		  :answerId="item.answerId"
              :aAnswerId="item.aAnswerId"
    			    :details="item.details"
        		  :time="item.time"
        		  :key = "+item.answerId"
  			/>
          <el-pagination
            @current-change="handleCurrentAnswerChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="answerList.length">
          </el-pagination>
  			</div>
	    </el-tab-pane>
      <el-tab-pane label="我的消息" name="3">
        <div id="messageList">
          <MyMessage v-for="(item,index) in currentMessageData"
              :id="item.id"
              :sender="item.sender"
              :recipient="item.recipient"
              :details="item.details"
              :time="item.time"
              :status="item.status"
              :key = "+item.id"
        />
          <el-pagination
            @current-change="handleCurrentMessageChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="messageList.length">
          </el-pagination>
        </div>
      </el-tab-pane>
	  </el-tabs>
 	</div>

 </template>

 <script>
 import MyQuestion from '../components/MyQuestion.vue'
 import MyAnswer from '../components/MyAnswer.vue'
 import MyMessage from '../components/MyMessage.vue'
 import {sortTime} from '../util/util.js'
 import {getUserQuestion, getUserAnswer, getUserMessage} from '../api/user.js'
export default {
  components:{
  	MyQuestion,
  	MyAnswer,
    MyMessage
  },
  data(){
  	return{
      activeName: localStorage.getItem("currentName"),
      currentName: 1,
      questionList:[],
      answerList:[],
      messageList:[],
      currentPage:1,
      pagesize:5,
      currentQuestionData:[],
      currentAnswerData:[],
      currentMessageData:[]
  	}
  },
  // computed:{
  //   myQuestionList:function(){
  //     return sortTime(this.questionList,'time')
  //   },
  //   myAnswerList:function(){
  //     return sortTime(this.answerList,'time')
  //   }
  // },
  methods:{
    getQuestionList(){
      var name = {name:sessionStorage.getItem("name")}
      getUserQuestion(name).then((res) => {
        if(res.status === 200)
          this.questionList = res.data
          this.handleCurrentQuestionChange(this.currentPage);
        console.log(res)
      }).catch((e) => {
        alert(e);
      })
    },
    getAnswerList(){
      var name = {name:sessionStorage.getItem("name")}
      getUserAnswer(name).then((res) => {
        if(res.status === 200)
          this.answerList = res.data;
          this.handleCurrentAnswerChange(this.currentPage);
        console.log(res)
      }).catch((e) => {
        alert(e);
      })
    },
    getMessageList(){
      var name = {name:sessionStorage.getItem("name")}
      getUserMessage(name).then((res) => {
        if(res.status === 200)
          this.messageList = res.data;
          this.handleCurrentMessageChange(this.currentPage);
        console.log(res)
      }).catch((e) => {
        alert(e);
      })
    },
    handleClick(activeName) {
      localStorage.setItem("currentName",this.activeName)
      console.log(localStorage.getItem("currentName"));
    },
    setCurrentQuestionData(){
            let begin = (this.currentPage - 1) * this.pagesize;
            let end = this.currentPage * this.pagesize;
            this.currentQuestionData = this.questionList.slice(
                begin,
                end
            );
    },
    setCurrentAnswerData(){
            let begin = (this.currentPage - 1) * this.pagesize;
            let end = this.currentPage * this.pagesize;
            this.currentAnswerData = this.answerList.slice(
                begin,
                end
            );
    },
    setCurrentMessageData(){
            let begin = (this.currentPage - 1) * this.pagesize;
            let end = this.currentPage * this.pagesize;
            this.currentMessageData = this.messageList.slice(
                begin,
                end
            );
    },
    handleCurrentQuestionChange: function(currentPage){
      this.currentPage = currentPage;
      this.setCurrentQuestionData();
    },
    handleCurrentAnswerChange: function(currentPage){
      this.currentPage = currentPage;
      this.setCurrentAnswerData();
    },
    handleCurrentMessageChange: function(currentPage){
      this.currentPage = currentPage;
      this.setCurrentMessageData();
    }
  },
  mounted(){
  	this.getQuestionList();
  	this.getAnswerList();
    this.getMessageList();
  }
}
</script>

 <style scoped>
  .el-pagination{
    margin-left: 30%;
    margin-top: 2%;
  }
</style>