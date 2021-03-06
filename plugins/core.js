/**
 * @fileOverview 用户定义vue全局函数, 均以$前缀命名, 代表全局函数
 * @author <a href="http://www.fman.top">自由人网络</a>
 * @version 1.0
 */

var host = "http://192.168.31.99:8000/";

export default {
	/**
	 * 安装
	 * @param {Object} Vue vue类
	 * @param {Object} optons 配置参数
	 */
	install(Vue, optons) {
		if (optons && optons.host) {
			host = optons.host;
		}

		var redirect_url = "";
		
		/**
		 * 转为键值
		 * @param {Object} arr 数组
		 * @param {String} key 键
		 * @param {String} name 名称
		 * @param {String} value 默认值
		 */
		Vue.prototype.$to_kv = function(arr, key, name, value) {
			if (value === undefined) {
				value = '';
			}
			var list = [];
			if (arr.length > 0) {
				if (key) {
					var n = name ? name : 'name';
					for (var i = 0; i < arr.length; i++) {
						var o = arr[i];
						list.push({
							name: o[n],
							value: o[key]
						});
					}
					if (arr[0].name !== '') {
						list.unshift({
							name: '',
							value: value
						});
					} else {
						list[0].value = value;
					}
				} else if (arr.length && typeof(arr[0]) === "object") {
					list = arr;
					if (arr[0].name !== '') {
						list.unshift({
							name: '',
							value: value
						});
					}
				} else {
					for (var i = 0; i < arr.length; i++) {
						var o = arr[i];
						list.push({
							name: o,
							value: i
						})
					}
					if (arr[0] !== '') {
						list.unshift({
							name: '',
							value: value
						});
					} else {
						list[0].value = value;
					}
				}
			}
			return list;
		};
		
		/**
		 * 转换时间
		 * @param {String} timeStr 时间字符串
		 * @param {String} format 转换格式
		 * @return {String} 返回转换后的结果
		 */
		Vue.prototype.$to_time = function(timeStr, format) {
			var time = timeStr.toTime();
			if (format) {
				return time.toStr(format);
			} else {
				var date = time.toStr("yyyy-MM-dd");
				var now = new Date();
				if (date == now.toStr("yyyy-MM-dd")) {
					return time.toStr("hh:mm")
				} else if (date == now.addDays(-1).toStr("yyyy-MM-dd")) {
					return "昨天" + time.toStr("hh:mm")
				} else if (time.toStr("yyyy") == now.toStr("yyyy")) {
					return time.toStr("MM-dd");
				} else {
					return date;
				}
			}
		};


		// 开始
		/**
		 * @description 提示框
		 * @param {String} text 提示内容
		 * @param {String} type 显示类型
		 */
		Vue.prototype.$toast = function(text, type = 'dark') {
			uni.showToast({
				title: text,
				icon: "none",
				duration: 2000
			});
		};

		/**
		 * @description 过滤数组
		 * @param {Array} arr 被过滤的数组
		 * @param {String} key 判断的键
		 * @param {Object} value 判断的值
		 * @return {Array} 返回过滤后的数组
		 */
		Vue.prototype.$filter = function(arr, key, value) {
			var ar = [];
			for (var i = 0; i < arr.length; i++) {
				var o = arr[i];
				if (o[key] === value) {
					ar.push(o);
				}
			}
			return ar;
		};

		/**
		 *  改变对象属性时间
		 * @param {Object} o 被改变的对象
		 */
		Vue.prototype.$changeTime = function(o) {
			for (var k in o) {
				if (k.indexOf('time') !== -1) {
					if (typeof(k) == 'string') {
						var val = o[k];
						if (val || val.indexOf('T') !== -1) {
							var v = new Date(o[k]);
							o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
						} else if (/\d+/.test(val)) {
							if (o[k].length == 10) {
								var v = new Date(o[k] * 1000);
								o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
							} else if (o[k].length == 13) {
								var v = new Date(o[k] * 1000);
								o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
							}
						} else if (typeof(k) == 'number') {
							var v = new Date(o[k]);
							o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
						}
					}
				}
			}
		};

		/**
		 * 转为大写
		 * @param {String} word 单词
		 */
		Vue.prototype.$to_up = function(word) {
			return word.toUpperCase()
		};

		/**
		 * 显示小数位
		 * @param {Number} num 数值
		 * @param {Number} len 小数位
		 */
		Vue.prototype.$to_fixed = function(num, len = 4) {
			if (typeof(num) === 'number') {
				return num.toFixed(len);
			} else if (num) {
				var n = Number(num);
				return n.toFixed(len);
			} else {
				num = 0;
				return num.toFixed(len);
			}
		};

		/**
		 * 跳转地址
		 * @param {String} url
		 */
		Vue.prototype.$redirect = function(url) {
			if (url) {
				redirect_url = url;
			} else {
				return redirect_url;
			}
		};

		/**
		 * @description 转url字符串
		 * @param {Object} obj 被转换的对象
		 * @param {String} url 请求地址
		 * @return {String} url参数格式字符串
		 */
		Vue.prototype.$toUrl = function(obj, url) {
			var queryStr = "";
			for (var key in obj) {
				var value = obj[key];
				if (typeof(value) === 'number') {
					if (value > 0) {
						queryStr += "&" + key + "=" + obj[key];
					}
				} else if (value) {
					queryStr += "&" + key + "=" + encodeURI(value);
				}
			}
			if (url) {
				if (url.endWith('?') || url.endWith('&')) {
					return url + queryStr.replace('&', '');
				} else if (url.indexOf('?') === -1) {
					return url + queryStr.replace('&', '?');
				} else {
					return url + queryStr;
				}
			} else {
				return queryStr.replace('&', '');
			}
		};

		/**
		 * 转换名称
		 * @param {Array} list 数组
		 */
		Vue.prototype.$toName = function(list, value, value_key = 'name', key = 'value') {
			var ret = "";
			for (var i = 0; i < list.length; i++) {
				var o = list[i];
				if (o[key] === value) {
					ret = o[value_key];
				}
			}
			return ret;
		};

		/**
		 * 补全请求url
		 * @param {String} url 现地址
		 * @return {String} 新地址
		 */
		Vue.prototype.$fullUrl = function(url) {
			var url_new = "";
			if (url) {
				if (url.indexOf("~/") === 0) {
					url_new = url.replace('~/', host);
				} else if (url.indexOf("/") === 0) {
					url_new = url.replace('/', host);
				} else {
					url_new = url;
				}
			}
			return url_new;
		};

		/**
		 * 补全请求url
		 * @param {String} url 现地址
		 * @return {String} 新地址
		 */
		Vue.prototype.$fullImgUrl = function(url) {
			if (url) {
				return this.$fullUrl(url);
			} else {
				return "/static/img/logo.png"
			}
		};

		/**
		 * 跳转导航
		 * @param {String} url 跳转地址
		 */
		Vue.prototype.$nav = function(url) {
			if (url.indexOf("//") === 0) {
				uni.switchTab({
					url
				});
			} else if (url.indexOf("/") === 0) {
				uni.navigateTo({
					url
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		};

		// 结束
		Vue.mixin({
			data() {
				return {
					phone_lock: 0
				}
			},
			methods: {
				/**
				 * 锁定
				 */
				$lock(type = "phone") {
					var key = type + "_lock";
					this[key] = 60;
					var timer = setInterval(() => {
						this[key] -= 1;
						if (this[key] == 0) {
							clearInterval(this.timer)
							this[key] == 60
						}
					}, 1000)
				},
				/**
				 * 拨打电话
				 */
				$call_phone(tel, title = "拨号") {
					// #ifdef H5
					uni.showModal({
						title: title,
						content: tel,
						success: function(res) {
							if (res.confirm) {
								uni.makePhoneCall({
									phoneNumber: tel
								});
								this.$lock("phone");
							} else if (res.cancel) {

							}
						}
					});
					// #endif

					// #ifndef H5
					uni.makePhoneCall({
						phoneNumber: tel,
						// 成功回调
						success: (res) => {
							this.$lock("phone");
						},
						// 失败回调
						fail: (res) => {
							this.$call_phone(); //重复调用一次
						}
					});
					// #endif
				},
				/**
				 * 快速获取列表
				 * @param {String} key
				 * @param {String} url
				 */
				$getList(key, url) {
					this.$get(url, {}, (json) => {
						if (json.result) {
							this[key] = json.result.list;
						}
					});
				},
				/**
				 * 翻译
				 * @param {String} word 要翻译的单词
				 * @param {Object} func 回调函数
				 */
				$translate(word, func) {
					var _this = this;
					this.$get("~/api/service/translate?word=" + word, {}, function(json) {
						if (json.result) {
							func(json.result);
						} else if (json.error) {
							_this.$toast(json.error.message, 'danger');
						} else {
							_this.$toast('服务端连接错误！', 'danger');
						}
					});
				},
				/**
				 * 下载
				 * @param {String} url 下载地址
				 * @param {String} name 保存的名字
				 */
				$download(url, name) {
					var anchor = document.createElement('a');
					if (!name) {
						var arr = url.split("/");
						name = arr[arr.length - 1];
					}
					if ('download' in anchor) {
						anchor.href = url.replace("~/", host);
						anchor.setAttribute("download", name);
						anchor.className = "download-js-link";
						anchor.style.display = "none";
						document.body.appendChild(anchor);
						setTimeout(function() {
							anchor.click();
							document.body.removeChild(anchor);
						}, 66);
						return true;
					}
				},
				/**
				 * 导航跳转
				 * @param {String} url 链接地址
				 */

				/**
				 * @description 获取用户信息
				 * @param {Function} func 回调函数
				 */
				$get_user(func) {
					var _this = this;
					
					var token = uni.db.get("token");
					if(token){
						// 存储token
						this.$store.commit("user_set", {
							token
						});
					}
					
					this.$get('~/api/user/state', null, function(json, status) {
						if (json.result && json.result.obj) {
							var user = json.result.obj;
							_this.$store.commit('user_set', user);
							if (func) {
								func(user);
							}
						} else if (json.error) {
							// 非法访问或未登录
							_this.$store.commit('sign_out');
						} else {
							_this.$toast('服务器连接失败！');
						}
					});
				},

				/**
				 * GET请求
				 * @param {String} url 请求地址
				 * @param {Object} body 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $get(url, body, func) {
					url = url.replace('~/', host);
					if (body) {
						url = this.$toUrl(body, url);
					}
					if (func) {
						uni.request({
							url, // 仅为示例，并非真实接口地址。
							method: "GET",
							header: {
								'x-auth-token': this.$store.state.user.token
							},
							dataType: "json",
							success: function(res) {
								func(res.data);
							},
							error: function(err) {
								func(err);
							}
						});
					} else {
						var [error, res] = await uni.request({
							url, // 仅为示例，并非真实接口地址。
							header: {
								'x-auth-token': this.$store.state.user.token
							},
							dataType: "json",
							data: body
						});
						return res.data;
					}
				},
				/**
				 * POST请求
				 * @param {String} url 请求地址
				 * @param {Object} data 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $post(url, data, func) {
					url = url.replace('~/', host);
					if (func) {
						uni.request({
							url, // 仅为示例，并非真实接口地址。
							method: "POST",
							header: {
								'x-auth-token': this.$store.state.user.token,
								'Content-Type': 'application/json'
							},
							dataType: "json",
							data,
							success: function(res) {
								func(res.data);
							},
							error: function(err) {
								func(err);
							}
						});
					} else {
						var [error, res] = await uni.request({
							url, // 仅为示例，并非真实接口地址。
							method: "POST",
							header: {
								'x-auth-token': this.$store.state.user.token,
								'Content-Type': 'application/json'
							},
							dataType: "json",
							data
						});
						return res.data;
					}
				},
				/**
				 * 上传文件
				 * @param {String} url 请求地址
				 * @param {Object} body 请求参数
				 * @param {Funciton} func 回调函数，可以为空，为空则采用await返回值
				 * @return {Object} 返回请求结果
				 */
				async $upload(url, body, func) {
					url = url.replace('~/', host);
					// 设置请求头 - 临时访问牌
					uni.setHeader('x-auth-token', this.$store.state.user.token);
					// 设置请求头 - 发送的内容类型
					uni.setHeader('Content-Type', 'multipart/form-data', ['post']);
					if (func) {
						// 如果回调函数存在, 则采用异步
						uni.post(url, body).then((res) => {
							func(res.data);
						}).catch((res) => {
							func(res);
						});
					} else {
						// 否则采用同步
						var res = await uni.post(url, body);
						return res.data;
					}
				},
				/**
				 * 获取路径对应操作权限 鉴权
				 * @param {String} action 操作名
				 */
				$check_action(path, action = "get") {
					var o = this.$get_power(path);
					if (o) {
						console.log(o.user_group);
					}
					if (!o) {
						return true;
					}
					return o[action];
				},

				/**
				 * 获取用户组权限
				 * @param {String} user_group 用户组
				 */
				async $get_auth(user_group = "游客") {
					this.$get("~/api/sys/auth?", {
						user_group
					}, (json) => {
						if (json && json.result && json.result.list) {
							this.$store.commit("set_auth", json.result.list);
						}
					});
				},

				/**
				 * 获取权限 
				 * @param {String} path 路由路径
				 */
				$get_power(path) {
					var list = this.$store.state.web.auth;
					var obj;
					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						if (o.path === path) {
							obj = o;
							break;
						}
					}
					return obj;
				},

				/**
				 * 是否有显示或操作字段的权限
				 * @param {String} action 操作名
				 * @param {String} field 查询的字段
				 */
				$check_field(action, field) {
					var o = this.$get_power(this.$route.path);
					var auth;
					if (o && o[action]) {
						auth = o[action]["field_" + action];
					}
					if (auth) {
						return auth.indexOf(field) !== -1;
					}
					return false;
				}
			}
		})
	}
}
