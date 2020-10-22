 <template lang="html">
  <div class="notifications" @click = "toMyMessage()">
  	<el-badge :value="unreadNumber" :max="99" :hidden="hidden">
  		<i class="el-icon-message"></i>
  	</el-badge>
  </div>
 </template>

 <script>
 import {getUnreadMessage} from '../api/user.js'
export default {
	name:"Notifications",
	data(){
		return{
			unreadNumber:0,
			hidden:true
		}
	},
	methods:{
		toMyMessage(){
			if (sessionStorage.getItem("name") == null) {
			  alert("登录体验更多功能！")
			  this.$router.push('./UserLogin')
			}else{
				this.$router.push('/personalCenter');
				localStorage.setItem("currentName",3)
			}
		},
		getUnreadNumber(){
		  var name = {name:sessionStorage.getItem("name")}
	      getUnreadMessage(name).then((res) => {
	        if(res.status === 200)
	          this.unreadNumber = res.data
	          if (res.data > 0) {
	          	this.hidden = false
	          }
	        console.log(res)
	      }).catch((e) => {
	        alert(e);
	      })
		}
	},
  mounted(){
  	this.getUnreadNumber();
  }
}
</script>

 <style scoped>
.notifications{
	width: 55px;
	height: 55px;
	background-color: #fff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
	border-radius: 10px;
	cursor: pointer;
}
i{
	font-size: 32px;
	padding: 12px 12px;
}
</style>