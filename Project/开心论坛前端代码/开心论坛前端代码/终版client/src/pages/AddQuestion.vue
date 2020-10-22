 <template lang="html">
  <div class="addQuestion">
    <Header/>
    <div id="notifications">
      <Notifications/>
    </div>
      <div class="box" style="background-color: #feffff;">
      	<el-form :model="questionForm" :rules="rules" ref="questionForm" label-width="100px" style="margin: 50px 60px 50px 30px;">
		  <el-form-item label="问题标签" prop="label">
		    <el-input v-model="questionForm.label"></el-input>
		  </el-form-item>
		  <el-form-item label="问题内容" prop="details">
		    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 20}" v-model="questionForm.details"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitQuestion()">发布问题</el-button>
		    <el-button @click="resetQuestion()">重置</el-button>
		  </el-form-item>
		</el-form>
      </div>
  </div>
 </template>

 <script>
  import Header from '../components/Header.vue'
  import Notifications from '../components/Notifications.vue'
  import {addQuestion} from '../api/question.js'
 export default {
  name: 'AddQuestion',
  components:{
    Header,
    Notifications
  },
  data() {
    return {
      questionForm: {
        label: '',
        details: ''
      },
      rules: {
        label: [
          { required: true, message: '请输入问题标签', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        details: [
          { required: true, message: '请填写问题具体内容', trigger: 'blur' }
        ]
      }
    };
  },
  methods:{
  	navTo(route){
  		this.$router.push(route)
  	},
    submitQuestion() {
      this.$refs.questionForm.validate((valid) => {
        if (valid) {
          const params = {
            label:this.questionForm.label,
            details:this.questionForm.details,
            questioner:sessionStorage.getItem("name")
          }
          addQuestion(params).then((res) => {
            if(res.data === 1){
              // console.log(res)
              this.$message({
                    message: '问题发布成功',
                    type:'success',
                    offset:40
                  });
              this.$router.push('/home')
            }else if(res.data === 0){
              this.$message({
                    message: '您已被拉黑，不能发布问题',
                    type:'error',
                    offset:40
                  });
            }else{
              this.$message({
                    message: '问题已存在',
                    type:'warning',
                    offset:40
                  });
            }
          }).catch((e) =>{
            console.log(e)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetQuestion() {
      this.$refs.questionForm.resetFields();
    }
  }
}
</script>

 <style scoped>
.addQuestion{
  height: 100vh;
  background-color: #edf5e1;
  position: flex;
  flex-direction: column;
}
.box{
  position: absolute;
  width: 70%;
  height: all;
  margin: 70px 200px 0px 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.notifications{
  position: fixed;
  top: 120px;
  left: 1200px;
}
</style>