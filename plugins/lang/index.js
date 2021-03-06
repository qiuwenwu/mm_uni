import Vue from "vue";
import en from "./en.js";
import zh from "./zh.js";
import hk from "./hk.js";

export default {
	install(Vue, options) {
		Vue.prototype.$lang = {
			en,
			zh,
			hk,
			// jp,
			// ko
		};

		Vue.mixin({
			data() {
				return {}
			},
			methods: {
				/**
				 * 设置语言
				 * @param {String} lang_type
				 */
				$set_lang(lang_type) {
					this.$store.commit('web/set_lang', lang_type);
				},
				/**
				 * 语言赋值
				 * @param {String} key 获取语言
				 */
				$t: function(key, ...param) {
					var lang_type = this.$store.state.web.lang_type;
					var lang = this.$lang[lang_type];
					var arr = key.split('.');
					var value = lang;
					for (var i = 0; i < arr.length; i++) {
						value = value[arr[i]]
						if (value === undefined) {
							console.error("language pack error: " + key + " undefined");
							break;
						} else if (typeof(value) == "string") {
							break;
						}
					}

					if (typeof(value) == "string") {
						for (var i = 0; i < param.length; i++) {
							var reg = new RegExp("\\{" + i + "\\}", 'ig');
							value = value.replace(reg, param[i]);
						}
					}
					return value;
				}
			}
		});
	}
}
