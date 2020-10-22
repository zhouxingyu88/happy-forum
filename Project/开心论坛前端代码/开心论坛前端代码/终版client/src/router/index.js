import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import UserLogin from '@/pages/UserLogin'
import Register from '@/pages/Register'
// import Operations from '@/components/Operations'
import QuestionDetail from '@/pages/QuestionDetail'
import PersonalCenter from '@/pages/PersonalCenter'
import MyData from '@/pages/MyData'
import AddQuestion from '@/pages/AddQuestion'
import AddAnswer from '@/pages/AddAnswer'


// import store from '../store/index'

Vue.use(Router)

const router = new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      // name: 'Home',
      // component: Home
      redirect:'/home'
    },
    {
      path: '/userlogin',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/questionDetail',
      name: 'QuestionDetail',
      component: QuestionDetail
    },
    {
      path: '/addQuestion',
      name: 'AddQuestion',
      component: AddQuestion,
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path: '/addAnswer',
      name: 'AddAnswer',
      component: AddAnswer,
      meta: {
        requireLogin: true
      },
    },
    {
      path: '/personalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter,
      requireLogin: true
    },
    {
      path: '/myData',
      name: 'MyData',
      component: MyData,
      requireLogin: true
    },
    // {
    //   path: '/answerItem',
    //   name: 'AnswerItem',
    //   component: AnswerItem
    // }
  ]
})


router.beforeEach((to, from, next) => {
  const name = sessionStorage.getItem("name")
  if (to.meta.requireLogin) {
    if (name) {
      next()
    } else {
      alert("登录体验更多功能！")
      next({
        path: '/userLogin',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
});

export default router