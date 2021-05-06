<template>
	<view class="page_account" id="account_forgot">
		<uni-forms :rules="rules" :value="form" ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-group top="0">
				<uni-forms-item name="username" required label="用户名">
					<uni-easyinput type="text" :inputBorder="true" v-model="form.username" placeholder="请输入用户名"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="password" required label="密码">
					<uni-easyinput type="text" :inputBorder="true" v-model="form.password" placeholder="请输入密码"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="confirm_password" required label="确认密码">
					<uni-easyinput type="text" :inputBorder="true" v-model="form.confirm_password" placeholder="请再次输入密码"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="email" required label="邮箱">
					<uni-easyinput type="text" v-model="form.email" placeholder="请输入邮箱"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="code" required label="验证码">
					<view class="input-group">
						<uni-easyinput style="width: 60%;" v-model="form.code" placeholder="请输入验证码"></uni-easyinput>
						<button>发送验证码</button>
					</view>
				</uni-forms-item>
			</uni-group>
		</uni-forms>
		<view class="btns">
			<button class="button" @click="forgot('form')">找回密码</button>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					confirm_password: '',
					email: '',
					code: ''
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
					},
					confirm_password: {
						rules: [{
								required: true,
								errorMessage: '请输入确认密码'
							},
							{
								minLength: 5,
								maxLength: 16,
								errorMessage: '确认密码长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					code: {
						rules: [{
							required: true,
							errorMessage: '请输入验证码'
						}, {
							minLength: 6,
							maxLength: 6,
							errorMessage: '验证码长度为{maxLength} 个字符'
						}]
					},
					email: {
						rules: [{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址'
						}]
					}
				}
			}
		},
		onLoad() {},
		onReady() {

		},
		methods: {
			/**
			 * 忘记密码
			 * @param {Object} form
			 */
			forgot() {
				this.$refs["form"]
					.submit()
					.then(res => {
						this.$post('~/api/forgot?', this.form, (res) => {
							if (res.result) {
								var url = this.$redirect();
								this.$nav(url);
							} else if (res.error) {
								this.$toast(res.error.message, 'error');
							}
						});
					})
					.catch(errors => {
						console.error('提交失败：', errors)
					})
			},
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
	button{
		background-color: #fff;
	}
	.button-hover{
		background-color: #DBDBDB;
	}
	.input_code {
		display: flex;
		width: 100%;
	}
	.code_btn{
		width: 5rem;
		font-size: 12px;
		padding: 0;
		line-height: 3;
	}
</style>
