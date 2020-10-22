 <template lang="html">
  <div id="Operations">

      <div class="icon-warp" @click="navTo('/addQuestion')">
        <i class="el-icon-edit" style="font-size: 45px; margin-right: 5px;"></i>
        <span>我要提问</span>
      </div>


  	<div class="icon-warp" @click="navTo('/addAnswer')">
  		<i class="el-icon-edit-outline" style="font-size: 45px; margin-right: 5px;"></i>
      <span>我要回答</span>
  	</div>
  </div>
 </template>

 <script>
export default {
  name:'Operations',
  methods:{
    navTo(route){
      this.$router.push(route)
    }
  }
}
</script>

 <style scoped>
#Operations{
	width: 259px;
	margin-top: -30px;
	padding: 10px 10px 10px 40px;
  background-color: #feffff;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  flex-direction: row;
}
.icon-warp{
	flex-direction: column;
	margin: 10px 10px 10px 30px;
  padding: 10px 10px 10px 20px;
  cursor: pointer;
}
</style>