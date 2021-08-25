<template>
	<mm_page class="page_user" id="user_index">
		<mm_main>
			<!-- 用户栏(开始) -->
			<mm_warp id="header_block">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view class="header" :url="'/pages/card/details?user_id=' + user.user_id">
								<view class="card">
									<view class="head_pic">
										<image src="../../static/img/avatar.png" mode=""></image>
									</view>
									<view class="title">
										<view class="user_name">
											<view class="vip">
												<image src="../../static/img/vip_2.png" mode=""></image>
											</view>
											<view class="name">
												<text>{{user.nickname}}</text>
											</view>
										</view>
										<view class="account">
											<text>账号：{{user.username}}</text>
										</view>
									</view>
									<view class="qrcode">
										<image src="../../static/img/qrcode_icon.png" mode="widthFix"></image>
									</view>
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 用户栏(结束) -->

			<!-- 导航列表(开始) -->
			
			<!-- 基本信息模块(开始) -->
			<mm_warp id="base_block">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view class="info_card">
								<view class="card">
									<view class="electronic_card infomation card_item" @click="$nav('/pages/user/card?user_id=' + user.user_id)">
										<text>电子名片</text>
									</view>
									<view class="collect infomation card_item" @click="$nav('/pages/user/collect?user_id=' + user.user_id)">
										<text>我的收藏</text>
									</view>
									<view class="base_info infomation card_item" @click="$nav('/pages/user/info?user_id=' + user.user_id)">
										<text>基本信息</text>
									</view>
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 基本信息模块(结束) -->
			
			<!-- 记录模块(开始) -->
			<mm_warp id="record_block">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view class="record_card">
								<view class="card">
									<view class="release record card_item" @click="$nav('/pages/user/publish?user_id=' + user.user_id)">
										<text>发布记录</text>
									</view>
									<view class="system record card_item" @click="$nav('/pages/user/message?user_id=' + user.user_id)">
										<text>系统消息</text>
									</view>
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 记录模块(结束) -->
			
			<!-- 按钮列表(开始) -->
			<mm_warp id="buttons">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view>
								<view class="quit_btn btn_user" @click="event_quit()">
									<text>退 出 登 录</text>
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
					"user_admin": []
				}
			}
		},
		methods: {
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
	#user_index {
		background-color: #fff;

	}
	#user_index #header_block .header{
		position: relative;
	}
	#user_index #header_block .card {
		display: flex;
		position: relative;
		padding: 1rem 0;
		padding-left: 2rem;
	}
	
	#user_index .header .title {
		padding-top: .75rem;
		margin-left: 1rem;
	}
	
	#user_index .title .name {
		margin-left: .5rem;
	}
	
	#user_index .title .account {
		font-size: 0.65rem;
		color: #666666;
		font-family: Arial;
		font-weight: 400;
		line-height: 1.25rem;
	}
	#user_index .header .qrcode{
		width: fit-content;
		height: fit-content;
		position: absolute;
		display: flex;
		right: 1.75rem;
		top: 2.25rem;
	}
	#user_index .header  .qrcode image {
		width: .88rem;
		height: .88rem;
	}
	
	#user_index .header .qrcode::after {
		content: "";
		position: absolute;
		right: -.625rem;
		top: .45rem;
		-webkit-transform: translateY(-50%) rotate(-45deg);
		transform: translateY(-50%) rotate(-45deg);
		content: "";
		padding: 4px;
		display: block;
		border: 1px solid #999;
		border-width: 0 2px 2px 0;
		-webkit-transition: all 0.2s;
		transition: all 0.2s;
	}
	
	#user_index .header .user_name {
		display: flex;
	}
	
	#user_index .head_pic,
	#user_index .head_pic image {
		width: 4.5rem;
		height: 4.5rem;
	}
	
	#user_index .title .vip,
	#user_index .title .vip image {
		width: .75rem;
		height: .65rem;
	}
	
	#user_index .infomation,
	#user_index .record {
		padding: .75rem 0;
		margin-left: 1rem;
		border-bottom: 1px solid #DBDBDB;
		position: relative;
	}
	
	#user_index .base_info,
	#user_index .system {
		border: none;
	}

</style>
