 <template lang="html">
  <div class="questionDetail">
  	<Header/>
    <div id="notifications">
      <Notifications/>
    </div>
  	<div class="questionBox">
  		<div id="details">
  			<span>{{details}}</span>
  		</div>
  		<div id="time">
  			<span style="margin-right: 8px;">提问人：{{questioner}}</span>
  			<span style="margin-right: 8px;">{{time}}</span>
  			<span style="margin-right: 8px;">浏览量：{{heat}}</span>
  			<!-- <span style="color: #409EFF">#{{label}}#</span> -->
  			<el-tag size="small">{{label}}</el-tag>
	        <!-- <template slot-scope="scope"> -->
	          <!-- <el-tag size="small" type="danger">{{end}}</el-tag> -->
	          <!-- <el-tag size="small" type="danger" v-if="scope.this.end == 1">未终结</el-tag> -->
	        <!-- </template> -->
  		</div>
  		<div id="button" style="margin-left: 85%; margin-top: -5.5%;">
  			<el-button type="success" plain size="mini" @click="scrollToView">我要回答</el-button>
  		</div>
  	</div>
  	<div id="addAnswer">
	    <el-form :model="addAnswerForm" ref="addAnswerForm" :rules="rules">
	        <el-form-item prop="details">
		        <el-input
				  type="textarea"
				  placeholder="请输入回答内容"
				  :autosize="{ minRows: 4, maxRows: 8}"
				  v-model="addAnswerForm.details"></el-input>
		    </el-form-item>
		    <el-form-item  style="margin-left: 85%;">
			    <el-button size="mini" @click="resetAnswer">重 置</el-button>
		    	<el-button type="success" size="mini" @click.native.prevent="submitAnswer">提 交</el-button>
			</el-form-item>
	    </el-form>
	</div>
  	<div class="answerBox" v-if="currentPageData.length > 0">
  	  <AnswerItem
  	    v-for="(item,index) in currentPageData"
        :answerId="item.answerId"
        :answerer="item.answerer"
        :icon="item.icon"
        :details="item.details"
        :time="item.time"
  	    :key = "+item.answerId"
  	  />
	  <el-pagination
	    @current-change="handleCurrentChange"
	    :current-page.sync="currentPage"
	    :page-size="pagesize"
	    layout="total, prev, pager, next, jumper"
	    :total="answerList.length">
	  </el-pagination>
  	</div>
  	<div class="answerBox" v-else>
		<span style="color: #2B3D43; text-align: center;">暂无回答，我来发表第一条！</span>
	</div>
  	<Footer/>
  </div>
 </template>

 <script>
 import Header from '../components/Header.vue'
 import Notifications from '../components/Notifications.vue'
 import AnswerItem from '../components/AnswerItem.vue'
 import Footer from '../components/Footer.vue'
 import {getQuestion, getAnswer} from '../api/question.js'
 import {addAnswer} from '../api/answer.js'
export default {
	name:"QuestionDetail",
	components:{
		Header,
		Notifications,
		AnswerItem,
		Footer
	},
	data(){
		return{
			questionId:'',
			details:'',
			questioner:'',
			time:'',
			heat: 0,
			label:'',
			end:'',
			endMap:['已终结','未终结'],
			answerList:[],
			currentPage: 1,
			pagesize: 4,
			currentPageData:[],
		    addAnswerForm: {
		      details: ''
		    },
		    rules: {
		      details: [
		        { required: true, message: '请输入回答内容', trigger: 'blur' }
		      ]
		    },
		    timer: null
		}
	},
	methods:{
		getQuestionInfo(){
			var questionId = {questionId:this.$route.query.questionId}
			getQuestion(questionId).then((res) => {
				if(res.status === 200)
					this.details = res.data.details;
					this.time = res.data.time;
					this.heat = res.data.heat;
					this.questioner = res.data.questioner;
					this.label = res.data.label;
					this.end = res.data.end;
/*					this.end.map( function (val) {
						if (val.end == 0) {
							val.end == '已终结'
						}
					})*/
				// console.log(questionId)
			})
			.catch((e)=>{
				alert(e);
			})
		},
		getAnswerList(){
			var questionId = {questionId:this.$route.query.questionId}
			getAnswer(questionId).then((res) => {
				if(res.status === 200)
					this.answerList = res.data;
					this.handleCurrentChange(this.currentPage);
				// console.log(res)
				console.log(res.data)
			}).catch((e) => {
				alert(e)
			})
		},
	    setCurrentPageData(){
	            let begin = (this.currentPage - 1) * this.pagesize;
	            let end = this.currentPage * this.pagesize;
	            this.currentPageData = this.answerList.slice(
	                begin,
	                end
	            );
	    },
	    handleCurrentChange: function(currentPage){
	      this.currentPage = currentPage;
	      this.setCurrentPageData();
	    },
		submitAnswer(){
		  if (sessionStorage.getItem("name") == null) {
			  alert("登录体验更多功能！")
			  this.$router.push('./UserLogin')
			}else{
			  this.$refs.addAnswerForm.validate((valid) => {
			  	if(valid) {
			  		const params = {
			  			aQuestionId:this.$route.query.questionId,
			  			details:this.addAnswerForm.details,
			  			answerer:sessionStorage.getItem("name")
			  		}
			  		addAnswer(params).then((res) => {
			  			if(res.data === 1){
			              this.$message({
			                    message: '回答发布成功',
			                    type:'success',
			                    offset:40
			                  });
			              this.$router.go(0)
			              // location. reload()
			  			}else if (res.data === -3) {
			              this.$message({
			                    message: '问题已被终结无法回答',
			                    type:'warning',
			                    offset:40
			                  });
			  			}else{
			              this.$message({
			                    message: '回答发布失败',
			                    type:'warning',
			                    offset:40
			                  });
			  			}
			  		}).catch((e) => {
			  			console.log(e)
			  		})
			  	}else{
		          console.log('error submit!!');
		          return false;
			  	}
			  })
			}

		},
		scrollToView(){
			document.getElementById('addAnswer').scrollIntoView({
				block:'start',
				inline:'nearest',
				behavior:'smooth'
			})
		},
	    resetAnswer() {
	      this.$refs.addAnswerForm.resetFields();
	    }
  },
	mounted(){
	    this.getQuestionInfo();
	    this.getAnswerList();
	}
}
</script>

 <style scoped>
.questionDetail{
  width: 100%;
  height: 1200px;
  background-color: #edf5e1;
}
#heat{
	margin-left: 80%；
	margin-top： 20%；
}
.questionBox{
  position: absolute;
  width: 70%;
  height: 160px;
  margin: 40px 200px;
  background-color: #feffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
#details{
  margin: 15px 25px 0px 20px;
  font-size: 18px;
  height: 110px;
}
#time{
  margin-top: 1px;
  margin-left:3%;
  margin-bottom: 20px;
  font-size: 8px;
}
 .answerBox{
  position: absolute;
  flex-direction: row;
  width: 70%;
  height: all;
  margin: 230px 200px;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
}
#addAnswer{
  position: absolute;
  width: 70%;
  margin:942px 200px 0px 200px;
}
.el-pagination{
  margin-left: 28%;
}
.notifications{
  position: fixed;
  top: 120px;
  left: 1200px;
}
</style>