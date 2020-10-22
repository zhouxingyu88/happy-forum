 <template lang="html">
  <section>
  	<div class="myAnswer">
      <div id="details"><p>{{details}}</p></div>
  	  <div id="time">{{time}}</div>
	  <div id="button">
	  	<el-button type="success" size="mini" round @click="answerFormVisible = true" @click.native.prevent="toGetAnswerDetails">查看详情</el-button>
	  	<el-button type="warning" size="mini" round @click="showAnswer">修改回答</el-button>
		<el-button type="danger" size="mini" round @click.native.prevent="deleteAnswer">删除回答</el-button>
	  </div>
  	</div>
<!-- 查看详情 -->
	<el-dialog title="查看详情" :visible.sync="answerFormVisible">
		<el-form>
			<el-form-item v-if="aAnswerId == commentId">
		  		<span style="font-size: 14px; margin-left: 5px;">{{questioner}}</span><br>
		  		<span style="font-size: 16px; margin-left: 25px;">{{questionDetails}}</span><br>
		  		<span style="font-size: 10px; margin-left: 470px;">{{questionTime}}</span><br>
		  		<span style="font-size: 15px;">{{answerer}}：{{commentDetails}}</span><br>
				<span style="font-size: 15px;">我 回复 {{answerer}}：{{details}}</span>
				<!-- <span style="font-size: 10px; margin-left: 470px;">{{this.time}}</span> -->
			</el-form-item>
			<el-form-item v-else>
		  		<span style="font-size: 14px; margin-left: 5px;">{{questioner}}</span><br>
		  		<span style="font-size: 16px; margin-left: 25px;">{{questionDetails}}</span><br>
		  		<span style="font-size: 12px; margin-left: 470px;">{{questionTime}}</span><br>
				<span style="font-size: 15px;">我的回答内容：{{details}}</span>
				<!-- <span style="font-size: 10px; margin-left: 470px;">{{this.time}}</span> -->
			</el-form-item>
			<el-form-item>
				<span style="font-size: 10px; margin-left: 470px;">{{this.time}}</span>
			</el-form-item>
		</el-form>
	</el-dialog>
<!-- 修改回答 -->
	<el-dialog title="修改我的回答" :visible.sync="editAnswerFormVisible">
		<el-form :model="answerForm" :rules="editAnswerRules" ref="AnswerForm">
			<el-form-item label="我的回答" prop="details">
				<el-input
				 type="textarea"
				 v-model="answerForm.details"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="editAnswerFormVisible = false">取消</el-button>
			<el-button type="primary" @click.native.prevent="editAnswer">确认修改</el-button>
		</div>
	</el-dialog>
  </section>
 </template>

 <script>
 import {updateAnswer, deleteAnswer} from '../api/answer.js'
 import {getAnswerQ, getAnswerC} from '../api/user.js'
export default {
  name:'MyAnswer',
	props:{
		answerId:{
			type:Number,
			default:0,
		},
		aQuestionId:{
			type:Number,
			default:0,
		},
		aAnswerId:{
			type:Number,
			default:0,
		},
		time:{
			type:String,
			default:''
		},
		details:{
			type:String,
			default:''
		}
	},
	data(){
		return{
			answerFormVisible: false,
			questionDetails: '',
			questioner: '',
			questionTime: '',
			// aAnswerId: 0,
			answerer: '',
			commentDetails: '',
			commentId: 0,
			answerForm:{
				details:''
			},
			editAnswerFormVisible: false,//编辑界面是否显示
			editAnswerLoading: false,
			editAnswerRules: {
				name: [
					{ required: true, message: '请输入姓名', trigger: 'blur' }
				]
			},
		}
	},
	methods:{
		toGetQuestionDetails(){
		  var id = {answerId:this.answerId}
	      getAnswerQ(id).then((res) => {
	        if(res.status === 200){
	        	this.questionDetails = res.data.details,
	        	this.questioner = res.data.questioner,
	        	this.questionTime = res.data.time
	        }
	        console.log(res)
	      }).catch((e) => {
	        alert(e);
	      })
		},
		toGetCommentDetails(){
		  var id = {answerId:this.answerId}
		  getAnswerC(id).then((res) => {
		  	if (res.status === 200) {
		  		// this.aAnswerId = res.data.aAnswerId,
		  		this.answerer = res.data.answerer,
		  		this.commentDetails = res.data.details,
		  		this.commentId = res.data.answerId
		  		console.log(res)
		  		console.log(this.commentId)
		  	}
		  }).catch((e) => {
		  	console.log(e)
		  })
		},
		showAnswer(){
			this.editAnswerFormVisible = true;
			this.answerForm.details = this.details
			console.log(this.details)
		},
		editAnswer(){
			const params = {
				answerId:this.answerId,
				details:this.answerForm.details
			}
			updateAnswer(params).then((res) => {
				console.log(res.data)
				if(res.data === 1){
					console.log(res)
					location. reload()
		            this.$message({
		              message: '修改回答成功',
		              type: 'success',
		              offset: 40
		            })
				}else if(res.data === 0){
		            this.$message({
		              message: '此条回答已被屏蔽，修改失败',
		              type: 'error',
		              offset: 40
		            })
				}else if (res.data === -1) {
		            this.$message({
		              message: '原问题已被屏蔽，修改失败',
		              type: 'error',
		              offset: 40
		            })
				}else if (res.data === -2) {
		            this.$message({
		              message: '原问题已被终结，修改失败',
		              type: 'error',
		              offset: 40
		            })
				}else{
		            this.$message({
		              message: '原回答已被屏蔽，修改失败',
		              type: 'error',
		              offset: 40
		            })
				}
			}).catch((e) => {
				console.log(e)
			})
		},
		deleteAnswer(){
			this.$confirm('确定要删除这条回答吗？','提示',{
			                confirmButtonText: '确定',
			                cancelButtonText: '取消',
			            }).then(() => {
							const id = {answerId:this.answerId}
							deleteAnswer(id).then((res) => {
								if(res.data === 1){
								  console.log(res)
								  location. reload()
					              this.$message({
					                    message: '回答删除成功',
					                    type:'success',
					                    offset:40
					              });
								}else{
					              this.$message({
					                    message: '回答删除失败',
					                    type:'info',
					                    offset:40
					              });
								}
							}).catch((e) => {
								console.log(e)
							})
			            })
		},
		toGetAnswerDetails(){
			this.toGetCommentDetails();
			this.toGetQuestionDetails();
		}
	}
}
</script>

 <style scoped>
.myAnswer{
	/*display: inline-block;*/
	width: 910px;
	background-color: #feffff;
	padding: auto 20px;
	/*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
	border-bottom: 4px dotted #4A7D64;
}
#time{
 	margin-left: 2%;
 	margin-top: 2%;
 	/*margin-bottom: -6%;*/
 	font-size: 8px;
 	padding: 0px 6px 0px 10px;
}
#details{
	width: 800px;
	padding: 10px 20px;
}
#button{
	margin-top: -10px;
	margin-left: 68%;
	padding: 0px 1px 20px 1px;
}
/*  #button >>> .el-button{
	background-color: #5680e9;
	color: #feffff;
}  */
</style>