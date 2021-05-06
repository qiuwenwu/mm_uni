<template>
	<view class="page_account" id="account_login">
		<view class="form_block">
			<uni-forms class="form_login" :rules="rules" :value="form" ref="form" validate-trigger="bind" err-show-type="undertext">
				<uni-group top="0">
					<uni-forms-item name="username" required label="用户名">
						<uni-easyinput type="text" :inputBorder="true" v-model="form.username" placeholder="请输入用户名"></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item name="password" required label="密码">
						<uni-easyinput type="password" :inputBorder="true" v-model="form.password" placeholder="请输入密码"></uni-easyinput>
					</uni-forms-item>
				</uni-group>
			</uni-forms>
		</view>
		<view class="btns">
			<button class="btn_login button" @click="login()">登录</button>
		</view>
		<view class="btns-link">
			<navigator url="./register" class="link_register">注册账号</navigator>
			<navigator url="./forgot" class="link_login">忘记密码</navigator>
		</view>
	</view>
</template>


<script>
	import mixin from "../../mixins/page.js"
	
	export default {
		mixins:[mixin],
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
				this.$refs['form']
					.submit()
					.then(res => {
						this.$post('~/api/login?', this.form, (res) => {
							if (res.result) {
								this.$store.commit('user_set', res.result);
								if (this.remember_me) {
									$.db.set('account', account);
								}
								this.$get_auth(this.user.user_group)
								this.$nav('//pages/index/index')
							} else if (res.error) {
								this.$toast(res.error.message, 'error');
							}
						});
					})
					.catch(errors => {
						// console.error('提交失败：', errors)
					})
			}
			,
			/**
			 * 手动重置表单
			 */
			resetForm() {
				this.$refs.form.resetFields()
			}
		}
	}
</script>

<style scoped>
	.btns {
		margin-bottom: 0.2rem;
	}

	.btns-link {
		display: flex;
		justify-content: space-between;
		padding: 0 1rem;
	}

	.btns-link>* {
		color: #00d1ff;
		width: 100%;
		padding: .5rem;
	}

	.link_register {
		text-align: left;
	}

	.link_login {
		text-align: right;
	}

	.btn_login {
		background-color: #fff;
	}

	.button-hover {
		background-color: #DBDBDB;
	}
</style>
