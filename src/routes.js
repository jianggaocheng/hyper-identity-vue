import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Admin from './layouts/Admin.vue';

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
            name: 'admin',
            component: Admin
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     if (to.path == '/login') {
//         sessionStorage.removeItem('account');
//     }

//     // Return to login if no user info
//     let user = JSON.parse(sessionStorage.getItem('account'));
//     if (!user && to.path != '/login') {
//         console.log(user);
//         next({ path: '/login' })
//     } else {
//         console.log(user);

//         next()
//     }
// })

export default new VueRouter({
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
            name: 'admin',
            component: Admin
        }
    ]
});