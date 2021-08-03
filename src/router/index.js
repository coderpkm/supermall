// import Vue from 'vue'
// import VueRouter from 'vue-router'

import {createRouter, createWebHistory} from 'vue-router'
 
const routerHistory = createWebHistory()

const Home = () => import("../views/home/Home")
const Category = () => import("../views/category/Category")
const Cart = () => import("../views/cart/Cart")
const Profile = () => import("../views/profile/Profile")
const Detail = () => import("../views/detail/Detail")

// 1.安装插件
// Vue.use(VueRouter)


// 2.创建router
const routes = [
    // 重定向
    {
        path: "",
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/category",
        component: Category
    },
    {
        path: "/cart",
        component: Cart
    },
    {
        path: "/profile",
        component: Profile
    },
    {
        path: "/detail/:iid",
        component: Detail
    }
]

// const router = new VueRouter({
//     routes,
//     mode: 'history'
// })

const router = createRouter({
    history: routerHistory,
    routes
})
// 3.导出
export default router