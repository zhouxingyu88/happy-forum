 <template lang="html">
  <section>
  	<div class="myMessage">
      <div id="details"><el-badge is-dot :hidden="hidden">{{details}}</el-badge></div>
  	  <div id="time">{{time}}</div>
	  <div id="button">
	  	<el-button type="success" size="mini" round @click="messageFormVisible = true" @click.native.prevent="toGetMessageDetails">查看详情</el-button>
	  </div>
  	</div>

<!-- 消息详情 -->
	<el-dialog title="消息详情" :visible.sync="messageFormVisible" :before-close="handleClose">
		<el-form>
			<el-form-item v-if="messageType == 1"> <!-- （解除）拉黑用户 -->
				<span style="font-size: 16px;">{{details}}</span>
			</el-form-item>
			<el-form-item v-else-if="messageType == 2"> <!-- （取消）屏蔽问题 -->
				<span style="font-size: 16px;">{{details}}</span><br>
				<span style="font-size: 16px;">问题内容为：{{questionDetails}}</span>
			</el-form-item>
			<el-form-item v-else-if="messageType == 3"> <!-- （取消）屏蔽回答 -->
				<span style="font-size: 16px;">{{details}}</span><br>
				<span style="font-size: 16px;">回答内容为：{{answerDetails}}</span>
			</el-form-item>
			<el-form-item v-else-if="messageType == 4"> <!-- （取消）屏蔽评论 -->
				<span style="font-size: 16px;">{{details}}</span><br>
				<span style="font-size: 16px;">评论内容为：{{commentDetails}}</span>
			</el-form-item>
			<el-form-item v-else-if="messageType == 5"> <!-- 新回答 -->
				<span style="font-size: 16px;">我的问题内容：{{questionDetails}}</span><br>
			  	<span class="name">{{sender}}</span>
			  	<span style="font-size: 13px;">回复了</span>
			  	<span class="name">{{recipient}}：</span>
				<span style="font-size: 15px;">{{answerDetails}}</span>
			</el-form-item>
			<el-form-item v-else> <!-- 新评论 -->
				<span style="font-size: 16px;">我的回答内容：{{answerDetails}}</span><br>
			  	<span class="name">{{sender}}</span>
			  	<span style="font-size: 13px;">评论了</span>
			  	<span class="name">{{recipient}}：</span>
				<span style="font-size: 15px;">{{commentDetails}}</span>
			</el-form-item>
			<el-form-item>
				<span style="font-size: 10px; margin-left: 450px;">{{this.time}}</span>
			</el-form-item>
		</el-form>
	</el-dialog>
  </section>
 </template>

 <script>
 import {changeMessageStatus, getMessageType, getMessageQ, getMessageA, getMessageC} from '../api/user.js'
export default {
	name:"MyMessage",
	props:{
		id:{
			type:Number,
			default:0,
		},
		sender:{
			type:String,
			default:''
		},
		recipient:{
			type:String,
			default:''
		},
		time:{
			type:String,
			default:''
		},
		details:{
			type:String,
			default:''
		},
		status:{
			type:Number,
			default:0
		}
	},
	data(){
		return{
			hidden:true,
			messageFormVisible:false,
			questionDetails: '',
			questionId: 0,
			answerDetails: '',
			commentDetails: '',
			messageType: 0
		}
	},
	methods:{
		toGetHidden(){
			if (this.status == 0) {
				this.hidden = false
			}
		},
		toGetMessageType(){
			var id = {id:this.id}
			getMessageType(id).then((res) => {
				if (res.data == 1) { //（解除）拉黑用户
					this.messageType = 1;
					console.log(this.messageType)
				}else if (res.data == 2) { //（取消）屏蔽问题
					this.messageType = 2;
					this.toGetQuestion();
				}else if (res.data == 3) { //（取消）屏蔽回答
					this.messageType = 3;
					this.toGetAnswer();
				}else if (res.data == 4) { //（取消）屏蔽评论
					this.messageType = 4;
					this.toGetComment();
				}else if (res.data == 5) { //有新的回答
					this.messageType = 5;
					this.toGetQuestion();
					this.toGetAnswer();
				}else{ //有新的评论
					this.messageType = 6;
					this.toGetAnswer();
					this.toGetComment();
				}
			})
		},
		toGetQuestion(){
		  var id = {id:this.id}
	      getMessageQ(id).then((res) => {
	        if(res.status === 200){
	        	this.questionId = res.data.questionId
	        	this.questionDetails = res.data.details
	        }
	        console.log(res)
	      }).catch((e) => {
	        alert(e);
	      })
		},
		toGetAnswer(){
	      var id = {id:this.id}
	      getMessageA(id).then((res) => {
	        if(res.status === 200){
	        	this.answerDetails = res.data.details
	        }
	        console.log(res)
	      }).catch((e) => {
	        alert(e);
	      })
		},
		toGetComment(){
	      var id = {id:this.id}
	      getMessageC(id).then((res) => {
	        if(res.status === 200){
	        	this.commentDetails = res.data.details
	        }
	        console.log(res)
	      }).catch((e) => {
	        alert(e);
	      })
		},
		toChangeStatus(){
		  var id = {id:this.id}
	      changeMessageStatus(id).then((res) => {
	        console.log(res)
	      }).catch((e) => {
	        alert(e);
	      })
		},
		toGetMessageDetails(){
			this.toGetMessageType();
			this.toChangeStatus();
		},
		handleClose() {
			this.$router.go(0);
	        // this.$confirm('确认关闭？')
	        //   .then(_ => {
	        //     done();
	        //     this.$router.go(0)
	        //   })
	        //   .catch(_ => {});
	    }
	},
  mounted(){
  	this.toGetHidden();
  }
}
</script>

 <style scoped>
.myMessage{
	width: 910px;
	background-color: #feffff;
	padding: auto 20px;
	border-bottom: 4px dotted #4A7D64;
}
#details{
	width: 500px;
	padding: 10px 20px;
}
#time{
 	margin-left: 2%;
 	margin-top: 4%;
 	margin-bottom: -2%;
 	font-size: 8px;
 	padding: 0px 6px 0px 10px;
}
#button{
	margin-top: -10px;
	margin-left: 88%;
	padding: 0px 1px 20px 1px;
}
.name{
	font-weight: bold;
	font-size: 15px;
}
</style>