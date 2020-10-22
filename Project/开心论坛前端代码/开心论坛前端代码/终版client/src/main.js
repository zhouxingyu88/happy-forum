// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueCropper from 'vue-cropper'
// import Vuex from 'vuex'
// import store from './store/index.js'


/*import iView from 'iview'
import 'iview/dist/styles/iview.css'*/

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(vueCropper);
// Vue.use(iView);





//路由跳转之后从顶部开始
router.afterEach((to,from,next)=>{
  window,scrollTo(0,0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
