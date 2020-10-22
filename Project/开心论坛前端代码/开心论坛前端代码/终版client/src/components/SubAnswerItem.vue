 <template lang="html">
  <div class="subAnswerItem">
	<div id="content">
	  	<span class="name">{{answerer}}</span>
	  	<span style="font-size: 12px;">回复了</span>
	  	<span class="name">{{byAnswerer}}：</span>
	  	<span id="details">{{details}}</span><br>
	  	<span id="time">{{startTime}}</span>
	</div>
  	<el-collapse>
	  <el-collapse-item>
	  	<template slot="title">
	  		<span style="margin-left: 535px;">我要评论</span>
	  		<i class="footer-icon el-icon-edit" style="margin-left: 5px;"></i>
	  	</template>
	  	<el-input type="textarea"
		    placeholder="请输入评论内容"
		    :autosize="{ minRows: 4, maxRows: 8}"
		    v-model="comment">
		</el-input>
		<div id="button">
		    <el-button plain type="primary" size="mini" @click.native.prevent="submitAnswer">提 交</el-button>
		</div>
	  </el-collapse-item>
	</el-collapse>
  </div>
 </template>

 <script>
 import {addAnswer} from '../api/answer.js'
export default {
	name:"SubAnswerItem",
	props:{
		aAnswerId:{
			type:Number,
			default:0,
		},
		answerId:{
			type:Number,
			default:0,
		},
		answerer:{      //回答者
			type:String,
			default:''
		},
		byAnswerer:{     //被回答者
			type:String,
			default:''
		},
		details:{
			type:String,
			default:''
		},
		startTime:{
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
			comment:''
		}
	},
	methods:{
		submitAnswer(){
		  		const params = {
		  			aQuestionId:this.$route.query.questionId,
		  			aAnswerId:this.answerId,
		  			details:this.comment,
		  			answerer:sessionStorage.getItem("name")
		  		}
		  		console.log(result)
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
		}
	}
}
</script>

 <style scoped>
.SubAnswerItem{
	width: auto;
	height: auto;
	background-color: #feffff;
}
#content{
	margin-top: 5px;
}
.name{
	font-weight: bold;
	font-size: 15px;
}
#details{
	margin-left: 5px;
	font-size: 15px;
}
#time{
	margin-left: 470px;
	font-size: 10px;
}
#button{
	margin: 5px 0 0 575px;
}
</style>