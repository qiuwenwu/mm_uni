<template>
	<mm_page class="page_user" id="user_password">
		<mm_main>
			<!-- 修改密码模块(开始) -->
			<mm_warp id="id_name">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view class="revise card">
									<view class="original_password revise_password">
										<text>原密码</text>
										<input type="password" placeholder="请输入原密码" value="" />
									</view>
									<view class="new_password revise_password">
										<text>新密码</text>
										<input type="password" placeholder="请输入新密码" value="" />
									</view>
									<view class="confirm_password  revise_password">
										<text>确认密码</text>
										<input type="password" placeholder="请确认密码" value="" />
									</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 修改密码模块(结束) -->
			
			<!-- 按钮列表(开始) -->
			<mm_warp id="buttons">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view>
								<view class="btn_user">
									<text>保 存</text>
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
	#user_password {
		background-color: #fff;
		position: fixed;
		height: 100%;
		width: 100%;
	}
	#user_password .revise .revise_password{
		color: #0F0E0C;
		font-size: 1rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		line-height: 1rem;
		padding: .75rem 0;
		padding-right: 1rem;
		margin-left: 1rem;
		border-bottom: 1px solid #DBDBDB;
	}
	#user_password .revise .confirm_password{
		border: none;
	}
	#user_password .revise input{
		margin-left: 2rem;
		
	}
	#user_password .confirm_password input{
		margin-left: 1rem;
	}
	

</style>

