/**
 * @fileOverview 该文件为插件主文件, 主要用于引入其他插件
 * @author <a href="http://www.fman.top">自由人网络</a>
 * @version 1.0
 */
import sdk from './mm_sdk.js';
import core from './core.js';
import lang from './lang/index.js'

export default {
	install(Vue, options) {
		Vue.use(core, options);
		Vue.use(lang, options);
	}
}
