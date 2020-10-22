 <template lang="html">
  <section>
  	<div class="AnswerItem">
  	  <div id="answerer">
  		<el-avatar shape="square" :size="30" :src="imageUrl"></el-avatar>
  		<span style="font-size: 10px; margin-left: 5px;">{{answerer}}</span>
  	  </div>
      <div id="details"><p>{{details}}</p></div>
  	  <div id="time">
  	  	<el-button plain type="warning" size="mini" @click="dialogFormVisible = true" @click.native.prevent="getCommentList">查看评论</el-button>
  	  	<span style="margin-left: 10px;">{{time}}</span>
  	  </div>
  	</div>
<!-- comment -->
	<el-dialog title="评论详情" :visible.sync="dialogFormVisible">
	  <el-form :model="form" ref="form">
	  	<el-form-item>
	  		<el-avatar :size="35" :src="imageUrl"></el-avatar>
	  		<span style="font-size: 14px; margin-left: 5px;">{{answerer}}</span><br>
	  		<span style="font-size: 15px; margin-left: 25px;">{{details}}</span><br>
	  		<span style="font-size: 12px; margin-left: 470px;">{{time}}</span>
	  		<el-divider/>
		  	<div id="subAnswer" v-if="commentList.length > 0">
			  <SubAnswerItem
			    v-for="(item,index) in commentList"
			      :answerId="item.answerId"
			      :answerer="item.answerer"
			      :byAnswerer="item.byAnswerer"
			      :details="item.details"
			      :startTime="item.startTime"
			      :key = "item.index"
			    />
		  	</div>
		  	<div id="subAnswer" v-else>暂无评论！</div>
	  	</el-form-item>
	    <el-form-item label="我的评论">
	      <el-input
	      	type="textarea"
		    placeholder="请输入回答内容"
		    :autosize="{ minRows: 4, maxRows: 8}"
			v-model="form.comment"/>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="dialogFormVisible = false" @click.native.prevent="submitAnswer">提 交</el-button>
	  </div>
	</el-dialog>
  </section>
 </template>

 <script>
 import SubAnswerItem from './SubAnswerItem.vue'
 import {addAnswer, queryComment} from '../api/answer.js'
export default {
	name:"AnswerItem",
	components:{
		SubAnswerItem
	},
	props:{
		answerId:{
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
		},
		answerer:{
			type:String,
			default:''
		},
		icon:{
			type:String,
			default:''
		}
	},
	data(){
		return{
			imageUrl:'',
			dialogFormVisible: false,
			form:{
				comment:''
			},
			commentList:[]
		}
	},
	methods:{
		submitAnswer(){
		  this.$refs.form.validate((valid) => {
		  	if(valid) {
		  		const params = {
		  			aQuestionId:this.$route.query.questionId,
		  			aAnswerId:this.answerId,
		  			details:this.form.comment,
		  			answerer:sessionStorage.getItem("name")
		  		}
		  		addAnswer(params).then((res) => {
		  			if(res.data === 1){
		              this.$message({
		                    message: '评论发布成功',
		                    type:'success',
		                    offset:40
		                  });
		              this.$router.go(0)
		              // location. reload()
		  			}else if (res.data === -3) {
		              this.$message({
		                    message: '问题已被终结无法评论',
		                    type:'warning',
		                    offset:40
		                  });
		  			}else{
		              this.$message({
		                    message: '评论发布失败',
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
		},
		getCommentList(){
			var answerId = {answerId:this.answerId}
			queryComment(answerId).then((res) => {
				if(res.status === 200)
					this.commentList = res.data;
				console.log(res.data)
			}).catch((e) => {
				alert(e)
			})
		}
	},
	created(){
		this.imageUrl = "data:image/png;base64," + this.icon;
	}
}
</script>

 <style scoped>
.AnswerItem{
	/*display: inline-block;*/
	width: 945px;
	background-color: #feffff;
	padding: auto 20px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
#answerer{
	padding-top: 10px;
	padding-left: 10px;
}
#time{
 	margin-left: 72%;
 	margin-top: 2%;
 	margin-bottom: 1%;
 	font-size: 8px;
 	padding: 0px 6px 10px 10px;
}
#details{
	width: 850px;
	padding: 5px 20px;
}
</style>