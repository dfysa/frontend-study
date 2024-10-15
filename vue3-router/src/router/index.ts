import { createRouter,createWebHistory } from "vue-router";
// 引入组件
import Home from "../views/Home.vue";
import ArticleList from "../views/ArticleList.vue";
import ArticleDetail from "../views/ArticleDetail.vue";
import UserDashboard from "../views/UserDashboard.vue";
import UserSetting from "../views/UserSetting.vue";
import UserProfile from "../views/UserProfile.vue";
import Login from "../views/Login.vue";
import Layout from "../views/Layout.vue";
 

 // 定义路由数组
 const routes = [
   {
     path: "/",
     name: "Layout",
     component: Layout,
     redirect: "/home",
     children: [
       //    {
       //      path: "/home",
       //      name: "Home",
       //      component: Home,
       //    },

       {
         path: "/home",
         name: "BookList",
         component: () => import("../views/BookList.vue"),
       },
       {
         path: "/login",
         name: "Login",
         // 路由懒加载，可以减少初始加载时间，按需加载组件
         component: () => import("../views/Login.vue"),
       },
       {
         path: "/books/:id",
         name: "BookDetail",
         component: () => import("../views/BookDetail.vue"),
       },

       {
         path: "/cart",
         component: () => import("../views/Cart.vue"),
         //  redirect: "/cart",
         children: [
           //  {
           //    path: "items",
           //    name: "CartItems",
           //    component: () => import("../views/CartItems.vue"),
           //  },
           {
             path: "orders",
             name: "Orders",
             component: () => import("../views/Orders.vue"),
           },
         ],
       },
       {
         path: "/articles",
         name: "ArticleList",
         component: () => import("../views/ArticleList.vue"),
       },
       // 动态路由配置
       {
         path: "/articles/:id",
         name: "ArticleDetail",
         component: () => import("../views/ArticleDetail.vue"),
         children: [
           {
             path: "comments", // 嵌套路由路径
             name: "ArticleComments",
             component: () => import("../views/ArticleComments.vue"),
           },
         ],
       },
       // 嵌套路由
       {
         path: "/user",
         component: () => import("../views/UserDashboard.vue"),
         redirect: "/user/profile",
         children: [
           {
             path: "profile",
             name: "UserProfile",
             component: () => import("../views/UserProfile.vue"),
           },
           {
             path: "setting",
             name: "UserSetting",
             component: () => import("../views/UserSetting.vue"),
           },
         ],
       },
     ],
   },
 ];
// 定义路由对象
 const router=createRouter({
    history:createWebHistory(),
    //倘若属性名和属性值一致，可只写一个routes
    routes:routes,
    scrollBehavior (to, from, savedPosition) {
        // 返回到浏览器保存的滚动为止（当使用浏览器后退时，否则滚动到顶部）
        if (savedPosition){
            return savedPosition;
        }else{
            return{top:0} // 每次路由切换时滚动到顶部
        }
    }
 });

 // 配置全局路由导航守卫
// 路由守卫：检查用户是否已登录
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
//   // 如果访问 /user 相关页面且未登录，跳转到 /login
//   if (to.path.startsWith('/user') && !isLoggedIn) {
//     next('/login');
//   } else {
//     next(); // 放行
//   }
// });

// 路由守卫：访问购物车时检查登录状态
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (to.path.startsWith('/cart') && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});



 export default router;