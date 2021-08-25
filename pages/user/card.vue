<template>
	<mm_page class="page_user" id="user_card">
		<mm_main>
			<!-- 电子名片(开始) -->
			<mm_warp id="banner">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<view class="card">
								<mm_form>
									<view class="control switch_show">
										<view class="title">显示</view>
										<view class="switch">
											<control_switch v-model="form.show"></control_switch>
										</view>
									</view>
									<view class="control">
										<view class="title">姓名</view>
										<view class="value">
											<input v-model="form.name" placeholder="请输入您真实姓名">
										</view>
									</view>
									<view class="control">
										<view class="title">职业</view>
										<view class="value">
											<input v-model="form.job" placeholder="请输入您的职业">
										</view>
									</view>
									<view class="control">
										<view class="title">擅长</view>
										<view class="value">
											<input v-model="form.forte" placeholder="请输入您所擅长的方面">
										</view>
									</view>
									<view class="business control">
										<view class="title">所在公司</view>
										<view class="value">
											<input v-model="form.company" placeholder="没有则写无">
										</view>
									</view>
									<view class="business control">
										<view class="title">主营范围</view>
										<view class="value">
											<textarea class="content text_box" placeholder="请说明主营范围"
												v-model="form.business">
											</textarea>
										</view>
									</view>
								</mm_form>
							</view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 电子名片(结束) -->


			<!-- 按钮模块(开始) -->
			<mm_warp id="save_btn">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view>
								<view class="btn_user" @click="submit()">
									<text>保 存</text>
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 按钮模块(结束) -->
		</mm_main>
	</mm_page>
</template>

<script>
	import mixin_page from "@/mixins/page.js";
	export default {
		mixins: [
			mixin_page
		],
		data() {
			return {
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},
				url_get_obj: "~/api/city/user_card?method=get_obj&",
				// 获取单条数据链接
				url_add: "~/api/city/user_card?method=add&",
				// 获取单条数据链接
				url_set: "~/api/city/user_card?method=set&",
				// 查询条件
				query: {
					"user_id": 0
				},
				// 表的主字段
				field: "card_id",
				// 操作表单
				form: {
					// 名片ID
					"card_id": 0,
					// 用户ID
					"user_id": 0,
					// 姓名
					"name": "",
					// 电话
					"phone": "",
					// 性别
					"sex": 0,
					// 年龄
					"age": 0,
					// 头像地址
					"avatar": "",
					// 组织
					"company": "",
					// 职务
					"job": "",
					// 电子邮箱
					"email": "",
					// 擅长
					"forte": "",
					// 业务范围
					"business": "",
					// 显示
					"show": 0,
					// 所在地
					"address": ""
				}
			}
		},
		methods: {
			get_obj_before(param) {
				param.user_id = this.user.user_id;
				return param
			},
			submit_before(param) {
				param.sex = this.user.sex;
				param.age = this.user.age;
				param.name = this.user.name || param.name;
				param.show = param.show || "0";
				return param;
			},
			get_info() {
				this.$get("~/api/user/info?method=get_obj&", {}, (json) => {
					if(json.result && json.result.obj){
						this.$store.commit("user_set", json.result.obj);
					}
				});
			}
		},
		/**
		 * 加载页面时
		 */
		onLoad() {},
		/**
		 * 页面显示时
		 */
		onShow() {
			// 添加动画
		},
		/**
		 * 页面销毁时
		 */
		onUnload() {}
	}
</script>

<style>
	#user_card .switch {
		display: flex;
		justify-content: flex-end;
	}

	#user_card .business {}

	#user_card .business .text_box {
		padding-top: .25rem;
	}
</style>
