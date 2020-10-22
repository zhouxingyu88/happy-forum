 <template lang="html">
  	<div class="RecommendationItem">
      <div id="details" @click="toGetDetails()"><p>{{details}}</p></div>
  	</div>
 </template>

 <script>
 import {updateHeat} from '../api/heat.js'
export default {
	name: 'RecommendationItem',
	props:{
		questionId:{
			type:Number,
			default:0,
		},
		details:{
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
.RecommendationItem{
	/*display: flex;*/
	width: auto;
	height: 60px;
	background-color: #feffff;
	margin-bottom: 1px;
	/*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)*/
}
#details{
	width: 220px;
	padding: 6px 20px;
	cursor: pointer;
	color: #2B3D43;
}
</style>