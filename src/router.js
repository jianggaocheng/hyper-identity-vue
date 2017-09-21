import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress'
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Admin from './layouts/Admin.vue';
import Dashboard from './pages/Dashboard.vue';
import Domain from './pages/Domain.vue';
import Page404 from './pages/404.vue';

import store from './store'

Vue.use(VueRouter);
let router = new VueRouter({
    routes: [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/admin',
        name: 'Hyper Identity',
        redirect: '/admin/dashboard',
        component: Admin,
        menu: true,
        children: [
            {
                path: 'dashboard',
                component: Dashboard,
                iconCls: 'el-icon-fa-address-card',
                name: '个人中心'
            },
            {
                path: 'domain',
                component: Domain,
                iconCls: 'el-icon-fa-users',
                name: '域管理'
            },
        ]
    },
    {
        path: '*',
        component: Page404,
        hidden: true
    }
    ]
});

router.beforeEach((to, from, next) => {
    NProgress.start();

    if (to.path === '/login') {
        store.user.commit('LOGOUT');
        return next();
    }

    // whether has token
    if (store.getters.token) {
        // if has token, check token
        
    } else {
        next({ path: '/login' });
        NProgress.done();
    }
    // if (to.path == '/login') {
    //     sessionStorage.removeItem('user');
    // }

    // // Return to login if no user info
    // let user = JSON.parse(sessionStorage.getItem('user'));
    // if (!user && to.path != '/login') {
    //     console.log(user);
    //     next({ path: '/login' })
    // } else {
    //     console.log(user);

    //     next()
    // }
    NProgress.done();
    next();
})

export default router;