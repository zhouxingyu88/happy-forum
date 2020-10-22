 <template lang="html">
  	<div class="myQuestion">
      <div id="details"><p>{{details}}</p></div>
  	  <div id="time">{{time}}</div>
	  <div id="button">
	  	<el-button type="success" size="mini" round @click.native.prevent="toGetDetails">查看详情</el-button>
		<el-button type="danger" size="mini" round :disabled="end == 0 ? true : false" @click.native.prevent="endQuestion">终结问题</el-button>
	  </div>
  	</div>
 </template>

 <script>
 import {endQuestion} from '../api/user.js'
export default {
  name:'MyQuestion',
	props:{
		questionId:{
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
		end:{
			type:Number,
			default:1
		}
	},
	data(){
		return{
			// change:false
		}
	},
	methods:{
		toGetDetails(){
			this.$router.push({
				path:'/questionDetail',
				query:{questionId:this.questionId}
			})
			console.log(questionId)
		},
		endQuestion(){
			this.$confirm('确定要终结这个问题吗？','提示',{
			                confirmButtonText: '确定',
			                cancelButtonText: '取消',
			            }).then(() => {
							const id = {questionId:this.questionId}
							endQuestion(id).then((res) => {
								if(res.data === 1){
								  console.log(res)
								  location. reload()
					              this.$message({
					                    message: '问题终结成功',
					                    type:'success',
					                    offset:40
					              });
								}else{
					              this.$message({
					                    message: '问题终结失败',
					                    type:'info',
					                    offset:40
					              });
								}
							}).catch((e) => {
								console.log(e)
							})
			            })
		}
	}
}
</script>

 <style scoped>
.myQuestion{
	width: 910px;
	background-color: #feffff;
	padding: auto 20px;
	/*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
	border-bottom: 4px dotted #4A7D64;
}
#time{
 	margin-left: 2%;
 	margin-top: 2%;
 	font-size: 8px;
 	padding: 0px 6px 0px 10px;
}
#details{
	width: 820px;
	padding: 10px 20px;
}
#button{
	margin-top: -10px;
	margin-left: 78%;
	padding: 0px 1px 20px 1px;
}
</style>