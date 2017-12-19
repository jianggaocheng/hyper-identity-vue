import Vue from 'vue';
import Meta from 'vue-meta'
import ElementUI from 'element-ui';
import App from './App.vue';
import store from './store';
import router from './router';
import moment from 'moment';
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css'

Vue.use(Meta);
Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: 'HyperIdentity',
        // all titles will be injected into this template
        titleTemplate: '%s - 统一身份鉴权平台'
    }
});

// send error message to fundebug
// function formatComponentName(vm) {
//     if (vm.$root === vm) return 'root';

//     var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
//     return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : '');

// }

// Vue.config.errorHandler = function(err, vm, info) {
//     var componentName = formatComponentName(vm);
//     var propsData = vm.$options.propsData;

//     fundebug.notifyError(err, {
//         metaData: {
//             componentName: componentName,
//             propsData: propsData,
//             info: info
//         }
//     });
// };

// Register global filter
Vue.filter('momentDate', function (date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
})
