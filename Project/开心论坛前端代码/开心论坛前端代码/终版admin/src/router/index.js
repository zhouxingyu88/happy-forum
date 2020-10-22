import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import Home from '@/Home'
import ManageRegistration from '@/pages/ManageRegistration'
import ManageUsers from '@/pages/ManageUsers'
import ManageQuestions from '@/pages/ManageQuestions'
import ManageAnswers from '@/pages/ManageAnswers'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      // name: 'Login',
      // component: Login
      redirect:"/login"
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: "后台管理系统",
      component: Home,
      // redirect:"/home/manageRegistration",
      children:[
      	{
      		path:'/manageRegistration',
      		name:'注册管理',
      		component: ManageRegistration,
          iconCls: 'el-icon-user-solid'
      	},
      	{
      		path:'/manageUsers',
      		name:'用户管理',
      		component: ManageUsers,
          iconCls: 'el-icon-user'
      	},
        {
          path:'/manageQuestions',
          name:'问题管理',
          component: ManageQuestions,
          iconCls: 'el-icon-document'
        },
        {
          path:'/manageAnswers',
          name:'回答管理',
          component: ManageAnswers,
          iconCls: 'el-icon-chat-dot-square'
        }
      ]
    }
  ]
})
