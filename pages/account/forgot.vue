<template>
	<view class="page_account" id="account_forgot">
		<mm_warp>
			<mm_container>
				<mm_row class="row">
					<mm_col class="col-12 col-sm-6 col-md-4 col-xl-3">
						<mm_view class="forgot_view">
							<uni-forms :rules="rules" :value="form" ref="form" validate-trigger="bind"
								err-show-type="undertext">
								<view class="title">
									<text>找回密码</text>
								</view>
								<uni-forms-item name="username" required label="用户名">
									<uni-easyinput type="text" :inputBorder="true" v-model="form.username"
										placeholder="请输入用户名"></uni-easyinput>
								</uni-forms-item>
								<uni-forms-item name="password" required label="密码">
									<uni-easyinput type="text" :inputBorder="true" v-model="form.password"
										placeholder="请输入密码"></uni-easyinput>
								</uni-forms-item>
								<uni-forms-item name="confirm_password" required label="确认密码">
									<uni-easyinput type="text" :inputBorder="true" v-model="form.confirm_password"
										placeholder="请再次输入密码"></uni-easyinput>
								</uni-forms-item>
								<uni-forms-item name="email" required label="邮箱">
									<uni-easyinput type="text" v-model="form.email" placeholder="请输入邮箱">
									</uni-easyinput>
								</uni-forms-item>
								<uni-forms-item name="code" required label="验证码">
									<view class="prove_code">
										<uni-easyinput v-model="form.code" placeholder="请输入验证码">
										</uni-easyinput>
										<view class="prove">发送验证码</view>
									</view>
								</uni-forms-item>
								<view class="btns">
									<view class="btn_forgot" @click="forgot('form')">找回密码</view>
								</view>
							</uni-forms>
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
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

<style>
	#account_forgot .mm_container {
		padding: 2rem 1rem 0;
	}

	#account_forgot .row {
		justify-content: center;
	}

	#account_forgot .forgot_view {
		padding: 0.5rem;
		background-color: rgb(255, 255, 255, 0.8);
		overflow: hidden;
		border-radius: 0.5rem;
	}

	#account_forgot .btn_forgot {
		margin-top: 3rem;
		text-align: center;
		padding: var(--padding_small);
		background-color: var(--color_blue);
		color: var(--color_white);
		border-radius: var(--radius_small);
	}

	#account_forgot .prove_code {
		display: flex;
		align-items: center;
	}

	#account_forgot .prove {
		border: 1px solid var(--color_blue);
		height: 2.25rem;
		padding: 0 var(--padding_mini);
		line-height: 2.25rem;
		border-left: 0px;
		color: #FFFFFF;
		background-color: var(--color_blue);
		border-radius: var(--radius_small);
		font-size: var(--font_small);
	}

	#account_forgot .title {
		color: var(--color_primary_h);
		padding-bottom: var(--padding_mini);
		border-bottom: 2px solid var(--color_dark);
		font-size: var(--font_big);
		margin-bottom: var(--margin_base);
	}
</style>
