 <template lang="html">
  <div class="personalCenter">
    <Header/>
      <div class="box">
      	<div id="picture">
      		<el-avatar shape="square" :src="imageUrl" :size="150"></el-avatar>
      	</div>
        <div id=username>
          <span style="font-size: 20px;">{{userName}}</span>
        </div>
      	<el-form style="margin-left: 75%;">
        	<el-button type="primary" plain @click="navTo('/myData')">编辑个人信息</el-button>
      	</el-form>
      </div>
      <div id="card">
        <Tabs/>
      </div>
    <Footer/>
  </div>
 </template>

 <script>
 import Header from '../components/Header.vue'
 import QuestionList from '../components/QuestionList.vue'
 import Tabs from '../components/Tabs.vue'
 import Footer from '../components/Footer.vue'
 import {getUserIcon} from '../api/user.js'
export default {
	name:"PersonalCenter",
	components:{
    Header,
		QuestionList,
    Tabs,
    Footer
	},
	data(){
		return{
      userName:sessionStorage.getItem("name"),
      imageUrl: '',
		}
	},
	methods:{
    navTo(route){
      this.$router.push(route)
    },
    getUserAvatar(){
      var phone = {phone:sessionStorage.getItem("phone")}
      getUserIcon(phone).then((res) => {
        if(res.status === 200)
          this.imageUrl = "data:image/png;base64," + res.data
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    }
  },
  created(){
    this.getUserAvatar();
  }
}
</script>

 <style scoped>
.personalCenter{
  height: 1200px;
  background-color: #edf5e1;
  position: flex;
  flex-direction: column;
}
.box{
  position: absolute;
  background-color: #feffff;
  width: 70%;
  height: 250px;
  margin: 35px 200px 0px 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
#picture{
	position: relative;
	/*margin-top: 25px;*/
	margin: 40px 30px;
}
#username{
  position: relative;
  padding-left: 25%;
  margin-top: -7%;
}
#card{
	position: absolute;
	width: 70%;
	margin: 300px 200px 0;
}
</style>