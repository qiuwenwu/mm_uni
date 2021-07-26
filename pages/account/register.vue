<template>
	<view class="page_account" id="account_register">
		<mm_warp>
			<mm_container>
				<mm_row class="row">
					<mm_col class="col-12 col-sm-6 col-md-4 col-xl-3">
						<mm_view class="register_view">
							<uni-forms class="form_register" :rules="rules" :value="form" ref="form"
								validate-trigger="bind" err-show-type="undertext">
								<view class="title">
									<text>注册</text>
								</view>
								<uni-forms-item name="username" required label="用户名">
									<uni-easyinput type="text" :inputBorder="true" v-model="form.username"
										placeholder="请输入用户名"></uni-easyinput>
								</uni-forms-item>
								<uni-forms-item name="password" required label="密码">
									<uni-easyinput type="password" :inputBorder="true" v-model="form.password"
										placeholder="请输入密码"></uni-easyinput>
								</uni-forms-item>
								<uni-forms-item name="confirm_password" required label="确认密码">
									<uni-easyinput type="password" :inputBorder="true" v-model="form.confirm_password"
										placeholder="请再次输入密码"></uni-easyinput>
								</uni-forms-item>
								<uni-forms-item name="email" label="邮箱">
									<uni-easyinput type="text" v-model="form.email" placeholder="请输入邮箱">
									</uni-easyinput>
								</uni-forms-item>
								<uni-forms-item name="nickname" label="昵称">
									<uni-easyinput type="text" v-model="form.phone" placeholder="请输入手机">
									</uni-easyinput>
								</uni-forms-item>
								<uni-forms-item name="user_group" label="身份">
									<view class="group_selector">
										<picker mode="selector" :range="list" range-key="name" @change="select_group">
											{{user_group? user_group: '选择身份' }}
											<uni-icons style="padding-left: 0.5rem;" type="arrowdown" size="16">
											</uni-icons>
										</picker>
									</view>
								</uni-forms-item>
								<view class="btn_register" @click="register()">立即注册</view>
							</uni-forms>
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 商家 -->
		<mm_warp id="">
			<mm_container>
				<mm_row>
					<mm_col>
						<mm_view class="yyy">
							<uni-forms v-if="user_group === '商家'" :rules="rules_business" :value="form_business"
								ref="form_business" validate-trigger="bind" err-show-type="undertext">
								<uni-group top="0">
									<view class="title">
										<text>注册</text>
									</view>
									<uni-forms-item name="business_name" required label="商家名称">
										<uni-easyinput type="text" :inputBorder="true" v-model="form.business_name"
											placeholder="请输入商家名称"></uni-easyinput>
									</uni-forms-item>
									<uni-forms-item name="business_phone" required label="商家电话">
										<uni-easyinput type="text" :inputBorder="true" v-model="form.business_phone"
											placeholder="请输入商家电话"></uni-easyinput>
									</uni-forms-item>
									<uni-forms-item name="id_card" required label="身份证">
										<uni-easyinput type="text" :inputBorder="true" v-model="form.id_card"
											placeholder="请输入身份证"></uni-easyinput>
									</uni-forms-item>
									<view class="btn_register" @click="register()">立即注册</view>
								</uni-group>
							</uni-forms>
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- /商家 -->
	</view>

</template>


<script>
	import mixin from "@/mixins/page.js"
	export default {
		components: {},
		mixins: [mixin],
		data() {
			return {
				url_get_list: "~/api/user_group?",
				form: {
					username: '',
					password: '',
					confirm_password: '',
					email: '',
					phone: '',
					user_group: ''
				},
				form_business: {
					business_name: "",
					business_phone: "",
					id_card: ""
				},
				rules_business: {
					business_name: {
						rules: [{
								required: true,
								errorMessage: '请输入商家名称'
							},
							{
								minLength: 5,
								maxLength: 16,
								errorMessage: '商家名称长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					business_phone: {
						rules: [{
								required: true,
								errorMessage: '请输入商家电话'
							},
							{
								minLength: 5,
								maxLength: 16,
								errorMessage: '商家电话长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					id_card: {
						rules: [{
								required: true,
								errorMessage: '请输入身份证'
							},
							{
								minLength: 15,
								maxLength: 18,
								errorMessage: '身份证长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					}
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
					nickname: {
						rules: [{
							minLength: 2,
							maxLength: 12,
							errorMessage: '昵称长度为{maxLength} 个字符'
						}]
					},
					email: {
						rules: [{
							format: 'email',
							errorMessage: '请输入正确的邮箱地址'
						}]
					},
					user_group: {
						rules: [{
							required: true,
							errorMessage: '请选择用户组'
						}]
					}
				},
				// 在picker列表所选中项的user_group
				user_group: '',
				// 在picker列表所选中项的id
				group_id: '',
				// 用户组列表
				list: []
			}
		},
		onLoad() {},
		onReady() {

		},
		methods: {
			get_list_after(json) {
				json.result.list = json.result.list.filter(o => {
					return o.name !== "管理员" && o.name !== "游客"
				})
			},
			// 提交商家表单
			async submit_form_business() {
				console.log(this.$refs["form_business"]);
				var bl = false
				try {
					await this.$refs["form_business"].submit();
					this.$post('~/api/user/business?method=add&', this.form_business, (res) => {
						if (res.result) {
							console.log(res);
						} else if (res.error) {
							this.$toast(res.error.message, 'error');
						}
					});
					bl = true
				} catch (errors) {
					// console.error('提交失败：', errors)
				}
				console.log(bl);
				return bl;
			},
			/**
			 手动提交
			 * @param {Object} form
			 */
			async register() {
				if (this.form.password !== this.form.confirm_password) {
					this.$toast("密码不相同", "error")
					return
				}
				var bl = false;
				try {
					await this.$refs["form"].submit()
					bl = true
				} catch (e) {
					//TODO handle the exception
				}
				var bl_2 = true;
				if (this.form.user_group === "商家") {
					bl_2 = await this.submit_form_business()
				}
				// 提交注册表单
				if (bl && bl_2) {
					await this.$refs["form"]
						.submit()
						.then(res => {
							this.$post('~/api/register?', this.form, (res) => {
								if (res.result) {
									console.log(res);
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
				}


			},
			/**
			 * 手动重置表单
			 */
			resetForm() {
				this.$refs.form.resetFields()
			},

			// 选择学校时触发
			select_group(e) {
				// 选中后会触发这个回调函数 e.target.value是你选中的下拉菜单数组的索引
				const index = e.target.value // 将根据索引将你选中的学校名称在数组中找出来  
				//并赋值给user_group 就可以在选中后picker中显示为你所选的内容
				var user_group = this.list[index].name
				this.user_group = user_group
				// 根据业务需求 判断你是否需要数组中的其他数据 一般都是会需要id的
				this.group_id = this.list[index].group_id
				this.form.user_group = user_group
			},
			// 改变表单事件
			change_form() {
				this.total = this.$refs.child.number
			}
		}
	}
</script>

<style>
	#account_register .mm_container{
		padding: 2rem 1rem 0;
	}
	#account_register .row{
		justify-content: center;
	}
	
	#account_register .register_view {
		background-color: rgb(255,255,255,0.8);
		overflow: hidden;
		border-radius: 0.5rem;
	}

	#account_register picker {
		box-sizing: border-box;
		font-size: 1rem;
		width: 100%;
		height: 2rem;
		line-height: 2rem;
		background-color: #FFF;
		border: 1px solid #ddd;
		border-radius: 0.25rem;
		text-align: center;
	}


	#account_register .title {
		display: none;
	}

	#account_register .btn_register {
		text-align: center;
		padding: var(--padding_small);
		background-color: var(--color_blue);
		color: var(--color_white);
		border-radius: var(--radius_small);
		margin: var(--margin_base) 0;
	}

	#account_register .title {
		display: block;
		color: var(--color_primary_h);
		padding-bottom: var(--padding_mini);
		border-bottom: 2px solid var(--color_dark);
		font-size: var(--font_big);
		margin-bottom: var(--margin_base);
	}

</style>
