import Vue from 'vue'
import App from './App'

//引入store
import plugins from './plugins/index.js'
import store from './store/index.js'

Vue.prototype.$store = store;
Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(plugins);
var app = new Vue({
    ...App,
	store
})
app.$mount()