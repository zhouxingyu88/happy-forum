 <template lang="html">
	<div class="home">
    <Header/>
    <div id="notifications">
      <Notifications/>
    </div>
    <div class="box">
      <div class="block">
          <el-carousel height="imgHeight + 'px'">
            <el-carousel-item v-for="item in img_list" :key="item.id">
              <!-- <h3 class="small">{{ item }}</h3> -->
              <img :src="item.idView" class="image">
            </el-carousel-item>
          </el-carousel>
      </div>
      <div id="left">
        <QuestionList/>
      </div>
      <div id="right">
        <Operations/>
        <Recommendations/>
      </div>
    </div>
    <Footer/>
  </div>

 </template>

 <script>
import axios from 'axios'
import Header from '../components/Header.vue'
import Notifications from '../components/Notifications.vue'
import QuestionList from '../components/QuestionList.vue'
import Recommendations from '../components/Recommendations.vue'
import Operations from '../components/Operations.vue'
import Footer from '../components/Footer.vue'

export default {
	name:'Home',
	components:{
    Header,
    Notifications,
    QuestionList,
    Operations,
    Recommendations,
    Footer
	},
	data(){
		return{
      img_list:[
        {id:0, idView:require('../assets/banner1.png')},
        {id:1, idView:require('../assets/banner2.png')},
        {id:2, idView:require('../assets/banner3.png')}
      ],
      imgHeight: 700,
      screenWidth: 0
		}
	},
  methods:{
    navTo(route){
      this.$router.push(route)
    },
    setSize:function () {            // 通过浏览器宽度(图片宽度)计算高度
      this.bannerHeight = 400 / 1920 * this.screenWidth;
    }
  },
  mounted() {
  // 首次加载时,需要调用一次
    this.screenWidth =  window.innerWidth;
    this.setSize();
    // 窗口大小发生改变时,调用一次
    window.onresize = () =>{
      this.screenWidth =  window.innerWidth;
      this.setSize();
    }
  }
}
</script>

 <style scoped>
.home{
  /*width: 100%;*/
  height: 1200px;
  background-color: #edf5e1;
  /*position: absolute;*/
}
.box{
  position: absolute;
  width: 70%;
  height: 1200px;
  margin: 40px 200px;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
}
.notifications{
  position: fixed;
  top: 120px;
  left: 1200px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  #left{
    width: 630px;
    margin-top: 0.5%;
    position: relative;
  }
  #right{
    position: absolute;
    top: 335px;
    left: 635px;
  }
  img{/*设置图片宽度和浏览器宽度一致*/
    width:100%;
    height:inherit;
  }
</style>