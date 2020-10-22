 <template lang="html">
  <div id="Recommendations">
  	<p>今日推荐</p>
  	<RecommendationItem
      v-for="(item,index) in heatList"
      v-if="index < 5"
      :questionId="item.questionId"
      :details="item.details | detailsFilter"
      :key = "+item.questionId"
	/>
  </div>
 </template>

 <script>
 import RecommendationItem from './RecommendationItem.vue'
 import {getHeat} from '../api/question.js'
export default {
	name:"Recommendations",
	components:{
		RecommendationItem
	},
	data(){
		return{
			heatList:[]
		}
	},
    filters: {
      detailsFilter(value) {
        if (!value) return "";
        if (value.length > 12) {
          return value.slice(0, 12) + "...";
        }
        return value;
      }
    },
	methods:{
		getHeatList(){
			getHeat().then((res) => {
				if (res.status === 200)
					this.heatList = res.data
				console.log(res)
			}).catch((e) => {
				console.log(e)
			})
		}
	},
	mounted(){
		this.getHeatList();
	}
}
</script>

 <style scoped>
#Recommendations{
	width: 279px;
	margin-top: 5px;
	padding: 5px 10px 20px 20px;
	background-color: #feffff;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
p{
	font-size: 25px;
	margin-left: 3%;
	color: #2B3D43;
}
</style>