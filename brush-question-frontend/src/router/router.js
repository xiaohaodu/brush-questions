import { createRouter, createWebHistory } from 'vue-router';
import login from "@/components/login/login";
import register from "@/components/register/register";
import passage from '@/components/passage/passage';
import book from '@/components/book/book';
import wrongQuestion from '@/components/wrongquestion/wrongquestion';
import empty from '@/components/empty';
// const routes =[
//     {
//         path:'/',
//         redirect:'/login',
//     },
//     {
//         path:'/login',
//         component:import("@/components/login/login")
//     },
//     {
//         path: '/register',
//         component:import("@/components/register/register")
//     },
//     {
//         path: '/passages',
//         component:import("@/components/passage/passage")
//     },
//     {
//         path: '/directory',
//         component:import("@/components/directory/directory")
//     },
//     {
//         path: '/switch',
//         component: import("@/components/switch/switch")
//     },
//     {
//         path: '/books',
//         component: import("@/components/book/book")
//     },
//     {
//         path: '/passageError',
//         component: import("@/components/passageError/passageError")
//     }
// ]



const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/passages',
        component: passage,
    },
    {
        path: '/books',
        component: book
    },
    {
        path: '/wrongQuestion',
        component: wrongQuestion
    },
    {
        path: '/empty',
        component: empty
    }
];
const router = createRouter({
    mode: 'hash',
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    if (// 检查用户是否已登录
        !localStorage.Authorization &&
        // ❗️ 避免无限重定向
        to.path !== '/login' && to.path !== '/register') {
        // 将用户重定向到登录页面
        return { path: '/login' };
    } else if ((to.path == '/login' || to.path == '/register') && localStorage.Authorization) {
        return { path: '/books' };
    }
});

export default router;