import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import routes from './routes'
import * as fundebug from 'fundebug-javascript';

fundebug.apikey = "ce44c68d47ce8e2608ff7c111c17fb512c59afc6fb24c1e53a0376331aedd06a";

Vue.use(ElementUI)

new Vue({
    el: '#app',
    routes,
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