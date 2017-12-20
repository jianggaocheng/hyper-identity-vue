import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import store from '~/store';
import Login from './pages/Login.vue';
import Admin from './layouts/Admin.vue';
import SubMenu from './layouts/SubMenu.vue';
import Dashboard from './pages/Dashboard.vue';
import Role from './pages/system/Role.vue';
import Menu from './pages/system/Menu.vue';
import Domain from './pages/Domain.vue';
import User from './pages/User.vue';
import Setup from './pages/Setup.vue';
import Page404 from './pages/404.vue';
import { verifyToken } from '~/api/userApi';
import config from '~/config/config.json'

Vue.use(VueRouter);
let router = new VueRouter({
    routes: [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        name: config.sysNameZH,
        redirect: '/admin/dashboard',
        component: Admin,
        children: [{
            path: 'dashboard',
            component: Dashboard,
            name: '监控中心'
        },
        {
            path: 'domains',
            name: '域管理',
            component: Domain,
        },
        {
            path: 'users',
            name: '用户管理',
            component: User,
        },
        {
            path: 'system',
            name: '系统管理',
            component: SubMenu,
            children: [{
                path: 'role',
                component: Role,
                name: '角色管理'
            },
            {
                path: 'menu',
                component: Menu,
                name: '菜单管理'
            },
            ]
        },
        ]
    },
    {
        path: '/setup',
        component: Setup,
        hidden: true
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
        store.commit('LOGOUT');

        return next();
    }

    // whether has token
    if (store.getters.token) {
        // if has token, check token
        let token = store.getters.token;
        verifyToken({ token }).then(({ code, user, menus, errCode, errMsg }) => {
            if (code == 200) {
                NProgress.done();

                // reset vuex value
                store.commit("SET_USER", user);
                store.commit("SET_MENUS", menus);

                next();
            } else {
                next({ path: '/login' });
                NProgress.done();
            }
        }).catch(err => {
            next({ path: '/login' });
            NProgress.done();
        });
    } else {
        next({ path: '/login' });
        NProgress.done();
    }
});

export default router;