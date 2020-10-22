 <template lang="html">
  <div class="addAnswer">
    <Header/>
    <div id="notifications">
      <Notifications/>
    </div>
    <div class="box">
		  <div id="search">
        <el-input placeholder="请输入搜索内容（ 问题标签、问题内容、提问人）" type="text" v-model="input">
          <el-button slot="append" icon="el-icon-search" @click.native.prevent="toSearch"></el-button>
        </el-input>
		  </div>
      <div id="container">
        <div class="searchBox" v-if="searchList.length > 0">
          <QuestionItem
            v-for="(item,index) in searchList"
            :questionId="item.questionId"
            :details="item.details | detailsFilter"
            :time="item.time"
            :label="item.label"
            :questioner="item.questioner"
            :key = "+item.questionId"
          />
        </div>
        <div class="searchBox" v-else>
          <span style="color: #2B3D43; text-align: center;">暂无查询结果</span>
        </div>
      </div>

    </div>
  </div>
 </template>

 <script>
 import Header from '../components/Header.vue'
 import Notifications from '../components/Notifications.vue'
 import QuestionItem from '../components/QuestionItem.vue'
 import {queryQuestion} from '../api/question.js'
export default {
	name:"AddAnswer",
  components:{
    Header,
    Notifications,
    QuestionItem
  },
  data(){
    return{
      input:'',
      searchList:[]
    }
  },
  filters: {
    detailsFilter(value) {
      if (!value) return "";
      if (value.length > 45) {
        return value.slice(0, 45) + "...";
      }
      return value;
    }
  },
  methods:{
    toSearch(){
      const input = {details:this.input}
      queryQuestion(input).then((res) => {
        if (res.status === 200) {
          this.searchList = res.data || []
          console.log(this.input)
        }else{
          console.log(e)
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

 <style scoped>
.addAnswer{
  height: 1000px;
  background-color: #edf5e1;
}
.box{
  position: absolute;
  width: 70%;
  height: all;
  margin: 40px 200px;
  /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
}
#container{
  height: auto;
  position: relative;
  margin-top: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.searchBox{
  position: absolute;
  margin-top: 10px;
}
.QuestionItem{
  height:all;
}
.QuestionItem >>> #questioner{
  padding-top: 15px;
  margin-left: 4%;
}
.QuestionItem >>> #details{
  padding-top: 10px;
  margin-left: 1%;
}
.QuestionItem >>> #label{
  margin-left: 75%;
  padding-bottom: 3px;
}
.QuestionItem >>> #time{
  margin-top:-20px;
  padding-bottom: 10px;
  margin-left: 80%;
}
.notifications{
  position: fixed;
  top: 120px;
  left: 1200px;
}
</style>