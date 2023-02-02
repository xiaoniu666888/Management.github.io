import {createRouter,createWebHistory} from "vue-router"

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { 
    path: '/', 
    // 路由重定向
    redirect:"/login"
  },
  { 
    path: '/login',
    name:"Login", 
    component: ()=> import("../views/Login.vue") 
  },
  { 
    path: '/home',
    name:'Home' ,
    redirect: "/person",
    component: ()=> import("../views/Home.vue") ,
    children:[
     { path: '/person',
      name:'Person' ,
      meta:{title:"个人中心"},
      component: ()=> import("../views/person/Person.vue") ,
    },
    { path: '/manage', 
      name:'Manage' ,
      meta:{title:"账号管理"},
      component: ()=> import("../views/manage/Manage.vue") ,
  },
  {   path: '/user',
      name:'ManageUser' ,
      meta:{title:"账号权限"},
      component: ()=> import("../views/manage/ManageUser.vue") ,
    }
    ]
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router 