<template>
	<view class="page_account" id="account_login">
		<header>
			<image src=""></image>
		</header>
		<!-- 登录模块(开始) -->
		<mm_warp>
			<mm_container>
				<mm_row class="row">
					<mm_col class="col-12 col-sm-6 col-xl-3">
						<mm_form class="login_view">
							
							<view class="btn_login" @click="login()">登录</view>
							<view class="btns-link">
								<navigator url="./register" class="link_register">注册账号</navigator>
								<navigator url="./forgot" class="link_forgot">忘记密码</navigator>
							</view>
						</mm_form>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 登录模块(结束) -->
	</view>
</template>


<script>
	import mixin from "@/mixins/page.js"

	export default {
		mixins: [mixin],
		data() {
			return {
				form: {
					username: '',
					password: '',
				},
				rules: {
					username: {
						rules: [{
								required: true,
								errorMessage: '请输入用户名'
							},
							{
								minLength: 5,
								maxLength: 16,
								errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					password: {
						rules: [{
								required: true,
								errorMessage: '请输入密码'
							},
							{
								minLength: 5,
								maxLength: 16,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					}
				}
			}
		},
		methods: {
			/**
			 * 手动提交
			 * @param {Object} form
			 */
			login() {
				var param = Object.assign({}, this.form);
				param.password = param.password.md5();
				
				console.log("校验", param);
				this.$post('~/api/user/sign_in?', param, (res) => {
					if (res.result && res.result.obj) {
						var obj = res.result.obj;
						// 缓存token
						uni.db.set('token', obj.token);
						// 存储用户信息
						this.$store.commit('user_set', obj);
						// 获取权限集
						this.$get_auth(this.user.user_group);
						// 前往首页
						this.$nav('/pages/root/index');
					} else if (res.error) {
						this.$toast(res.error.message, 'error');
					}
				});
			},
			/**
			 * 手动重置表单
			 */
			resetForm() {
				this.$refs.form.resetFields()
			}
		},
		onBackPress() {
			var bl = false
			var user_id = this.user.user_id;
			if (user_id == null || user_id < 1) {
				// this.$nav('/pages/index/index');
				bl = true
			}
			return false
		}
	}
</script>

<style>
	#account_login .mm_container {
		padding: 2rem 1rem 0;
	}

	#account_login .row {
		justify-content: center;
	}

	#account_login .login_view {
		background-color: rgb(255, 255, 255, 0.8);
		overflow: hidden;
		border-radius: 0.5rem;
	}

	#account_login .btn_login {
		text-align: center;
		background-color: var(--color_blue);
		color: var(--color_white);
		border-radius: var(--radius_small);
		padding: var(--padding_small);
		margin: var(--margin_base) 0;
	}

	#account_login .btns-link {
		display: flex;
		justify-content: space-between;
	}

	#account_login .btns-link>navigator {
		color: var(--color_grey);
		width: 100%;
		font-size: var(--font_small);
	}

	#account_login .link_register {
		text-align: left;
	}

	#account_login .link_forgot {
		text-align: right;
	}

	#account_login .title {
		display: block;
		color: var(--color_primary_h);
		padding-bottom: var(--padding_mini);
		border-bottom: 2px solid var(--color_dark);
		font-size: var(--font_big);
		margin-bottom: var(--margin_base);
	}
</style>
