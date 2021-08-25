import App from './App'
//引入store
import plugins from './plugins/index.js'
import store from './store/index.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$store = store;
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(plugins);
const app = new Vue({
	store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
createSSRApp.use(plugins);
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  return {
	store,
    app
  }
}
// #endif