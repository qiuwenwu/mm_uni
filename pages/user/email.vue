<template>
	<mm_page class="page_user" id="user_email">
		<mm_main>
			<!-- 修改邮箱模块(开始) -->
			<mm_warp id="bind_mail">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view class="bind">
									<view class="user_email bind_number">
										<text>电子邮箱</text>
										<input type="email" value="" />
										<view class="send_code">
											<text>发送验证码</text>
										</view>
									</view>
									<view class="verification bind_number">
										<text>验证码</text>
										<input type="text" value="" />
									</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 修改邮箱模块(结束) -->
			
			<!-- 按钮列表(开始) -->
			<mm_warp id="buttons">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view>
								<view class="btn_user">
									<text>绑定</text>
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 按钮列表(结束) -->
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
				message: 'Hello',
				// 定时器
				timer: null,
				// 请求链接
				url: "",
				// 获取单条数据链接
				url_get_obj: "",
				// 获取列表链接
				url_get_list: "",
				// 查询条件
				query: {},
				// 表的主字段
				field: "xxx_id",
				// 获取到对象
				obj: {},
				// 获取到的列表
				list: [],
				// 操作表单
				form: {},
				// 筛选关键词
				keyword: ""
			}
		},
		computed: {
			/**
			 * 新列表
			 */
			list_new() {
				var list = this.list;
				var lt = [];
				for (var i = 0; i < list.length; i++) {
					var o = list[i];
					if (o.keyword == this.keyword) {
						lt.push(o);
					}
				}
				return lt;
			}
		},
		methods: {
			
		},
		/**
		 * 加载页面时
		 */
		onLoad() {
		},
		/**
		 * 页面显示时
		 */
		onShow() {
			// 添加动画
		},
		/**
		 * 页面销毁时
		 */
		onUnload() {
		}
	}
</script>

<style>
	#user_email {
		background-color: #fff;
		position: fixed;
		height: 100%;
		width: 100%;
	}
	#user_email .bind{
		box-shadow: 0rem 0.19rem 0.38rem rgba(0, 0, 0, 0.16);
	}
	#user_email .bind .bind_number{
		color: #0F0E0C;
		font-size: 1rem;
		display: flex;
		padding: .75rem 0;
		margin-left: 1rem;
		border-bottom: 1px solid #DBDBDB;
	}
	#user_email .user_email .send_code{
		color: #805441;
		font-size: 1rem;
		font-family: Arial;
		font-weight: 400;
		line-height: 1.25rem;
		margin: 0 .5rem;
	}
	#user_email .bind .verification{
		border: none;
	}
	#user_email .bind input{
		margin-left: .5rem;
		/* border: 1px solid #000; */
		width: 11rem;
	}
	#user_email .verification input{
		margin-left: 1.5rem;
	}
	#user_email .preserve{
		color:#FFF2E9;
		margin: 2rem auto;
		margin-bottom: 0;
		width: fit-content;
		padding: .25rem 8rem;
		border-radius: .25rem;
		background-color: rgb(46,46,46);
	}
</style>

