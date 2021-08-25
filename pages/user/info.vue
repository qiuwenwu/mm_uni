<template>
	<mm_page class="page_user" id="user_info">
		<mm_main>
			<!-- 编辑头像,昵称(开始) -->
			<mm_warp id="menu">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<view class="card">
								<view class="head_pic">
									<image :src="form.avatar || '/static/img/avatar.png'" mode="widthFix"></image>
								</view>
								<view class="nickname value">
									<input type="text" :placeholder="'昵称'" v-model="form.nickname" @blur="submit()" />
								</view>
							</view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 编辑头像，昵称(结束) -->


			<!-- 基本信息列表(开始) -->
			<mm_warp id="nav">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<view class="card">
								<view class="control card_item" @click="event_password()">
									<view class="title">修改密码</view>

								</view>
								<view class="control card_item" @click="event_email()">
									<view class="title">绑定邮箱</view>
									<view class="binded">已绑定</view>
								</view>
								<view class="control card_item" @click="event_phone()">
									<view class="title">绑定手机</view>
									<view class="binded">已绑定</view>
								</view>
							</view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 基本信息列表(结束) -->
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
				// 获取单条数据链接
				url_get_obj: "~/api/user/account?method=get_obj&",
				// 修改接口
				url_set: "~/api/user/account?method=set&",
				// 查询条件
				query: {
					"user_id" : 0
				},
				// 表的主字段
				field: "user_id",
				// 操作表单
				form: {
					user_id: 0,
					avatar: "",
					nickname: ""
				}
			}
		},
		computed: {
			
		},
		methods: {
			event_password(){
				uni.navigateTo({
					url: "/pages/user/password?user_id=" + this.query["user_id"]
				})
			},
			event_email(){
				uni.navigateTo({
					url: "/pages/user/email?user_id=" + this.query["user_id"]
				})
			},
			event_phone(){
				uni.navigateTo({
					url: "/pages/user/phone?user_id=" + this.query["user_id"]
				})
			},
			submit_before(param){
				param.user_id = this.user.user_id;
				return param;
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
	#user_info .head_pic {
		width: 100%;
		height: 100%;
		margin: 2rem auto;
		text-align: center;
	}
	#user_info .head_pic image{
		width: 4.5rem;
		height: 4.5rem;
	}
	#user_info .nickname{
		text-align: center;
		margin: 0 7rem 1rem 7rem;
		border-bottom: 1px solid #DBDBDB ;
	}
	#user_info .card_item{
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 1.75rem;
	}
	#user_info .binded{
		color: #E4C5B0;
	}

	
</style>
