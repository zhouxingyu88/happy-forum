 <template lang="html">
  	<div class="QuestionItem">
  	  <div id="questioner" style="font-size: small;">{{questioner}}</div>
      <div id="details" @click="toGetDetails()"><p>{{details}}</p></div>
  	  <div id="label" style="color: #409EFF; font-size: small;">{{label}}</div>
  	  <!-- <el-tag size="">{{label}}</el-tag> -->
  	  <div id="time">{{time}}</div>
  	</div>
 </template>

 <script>
 import {updateHeat} from '../api/heat.js'
export default {
	name: 'QuestionItem',
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
		label:{
			type:String,
			default:''
		},
		questioner:{
			type:String,
			default:''
		}
	},
	methods:{
		toGetDetails(){
			this.$router.push({
				path:'/questionDetail',
				query:{questionId:this.questionId}
			})
			this.heatUpdate();
		},
		heatUpdate(){
			var params = {
				phone:sessionStorage.getItem("phone"),
				questionId:this.questionId
			}
			updateHeat(params).then((res) =>{
				console.log(res)
			}).catch((e) => {
				console.log(e)
			})
		}
	}
}
</script>

 <style scoped>
.QuestionItem{
	width: auto;
	height: auto;
	background-color: #feffff;
	margin-bottom: 1px;
	/*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
}
#time{
 	margin-left: 72%;
 	margin-top: -4.5%;
 	/*margin-bottom: -6%;*/
 	font-size: 8px;
 	padding: 0px 6px 10px 10px;
}
#details{
	width: 905px;
	padding: 6px 20px;
	cursor: pointer;
}
 .QuestionItem:nth-child(2n) {
     background-color: #F7FFF8;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>