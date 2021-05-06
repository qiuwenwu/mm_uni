<template>
	<view class="page_message" id="message_index">
		<uni-forms :rules="rules" :value="form" ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-group title="" top="0">
				<uni-forms-item name="nickname" required label="用户名">
					<uni-easyinput type="text" :inputBorder="true" v-model="form.nickname" placeholder="请输入用户名"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="phone" label="手机号码">
					<uni-easyinput type="tel" :inputBorder="true" v-model="form.phone" placeholder="请输入您的手机号码"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="email" label="邮箱">
					<uni-easyinput type="text" :inputBorder="true" v-model="form.email" placeholder="请输入您的电子邮箱"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="content" required label="留言内容">
					<textarea class="textarea" :inputBorder="true" v-model="form.content" placeholder="请输入留言内容"></textarea>
				</uni-forms-item>
			</uni-group>
		</uni-forms>
		<view class="btns">
			<button class="button" @click="submitForm('form')">提交留言</button>
		</view>
	</view>
</template>


<script>
	import mixin from "../../mixins/page.js"

	export default {
		mixins: [mixin],
		data() {
			return {
				form: {
					nickname: '',
					content: '',
					phone: '',
					email: ''
				},
				rules: {
					nickname: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名'
							},
							{
								minLength: 2,
								maxLength: 16,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					content: {
						rules: [{
								required: true,
								errorMessage: '请输入留言内容'
							},
							{
								minLength: 5,
								maxLength: 255,
								errorMessage: '留言内容长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					phone: {
						rules: [{
							minLength: 11,
							maxLength: 11,
							errorMessage: '手机号码长度为{maxLength} 个字符'
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
			 * 手动提交
			 * @param {Object} form
			 */
			submitForm(form) {
				this.$refs[form]
					.submit()
					.then(form => {
						var {
							user_id,
							avatar
						} = this.user
						this.$post("~/api/message/add", Object.assign({}, form, {
							user_id,
							avatar
						}), (res => {
							console.log(res);
							this.$nav("//")
						}))
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
	.textarea {
		border: 1px solid rgb(229, 229, 229);
		background-color: rgb(255, 255, 255);
		width: calc(100% - 1rem);
		border-radius: .25rem;
		padding: .5rem;
		font-size: 0.875rem;
	}
</style>
