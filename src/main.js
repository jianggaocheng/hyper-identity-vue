import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import moment from 'moment';

Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

// send error message to fundebug
function formatComponentName(vm) {
    if (vm.$root === vm) return 'root';

    var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
    return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : '');

}

Vue.config.errorHandler = function(err, vm, info) {
    var componentName = formatComponentName(vm);
    var propsData = vm.$options.propsData;

    fundebug.notifyError(err, {
        metaData: {
            componentName: componentName,
            propsData: propsData,
            info: info
        }
    });
};

// Register global filter
Vue.filter('momentDate', function (date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
})
