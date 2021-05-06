<template>
	<view class="page_user" id="user_index">
		<view class="top_user" :style="'background:url('+bgc_avatar+') no-repeat;background-size:100% 100%;'">
			<image class="avatar" style="width: 6rem;height: 6rem;" :src="$fullUrl(user.avatar) || '../../static/img/default.png'" mode="scaleToFill"></image>
			<view class="name">
				<text style="font-size: 2rem;">{{user.nickname}}</text>
				<text style="font-size: 1.5rem;color: var(--color_grey);">{{user.user_group}}</text>
			</view>
		</view>
		<view class="list_my">
			<view class="item_my" v-if="$check_action(o.url,'get')" v-for="(o,i) in list_info" :key="i">
				<navigator :url="'/pages'+o.url"  class="my_nav" hover-class="hover">
					<uni-icons :type="o.type" size="20"></uni-icons>
					<text class="name">{{ o.title }}</text>
				</navigator>
			</view>
		</view>
		<view class="btns">
			<button type="warn" v-if="user.user_id" @click="sign_out()">退出登录</button>
			<navigator class="btn" url="/pages/account/login" type="default" v-else>登录</navigator>
		</view>
	</view>
</template>

<script>
	import nav_quick from "../../components/diy/nav_quick.vue";

	import mixin from "../../mixins/page.js";
	export default {
		components: {
			nav_quick
		},
		mixins: [mixin],
		data() {
			return {
				list_info: [{
						title: "基本信息",
						type: "info",
						url: "/user/info"
					},
					{
						title: "收货地址",
						type: "location",
						url: "/user/address"
					}, {
						title: "收藏",
						type: "heart",
						url: "/user/collect"
					},
					{
						title: "订单",
						type: "bars",
						url: "/order/list"
					},
					{
						title: "购物车",
						type: "cart",
						url: "/cart/list"
					}
				],
				bgc_avatar: "../../static/img/bgc_1.jpg"
			}
		},
		methods: {
			sign_out() {
				this.$store.commit('sign_out');
				// this.$get("~/api/user/sign_out")
			}
		}
	}
</script>

<style>
	.page_user {
		background-color: #F7F7F7;
	}

	.top_user {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.top_user .avatar {
		border-radius: 1rem;
		box-shadow: 0px 0px 4px 2px #eee;
	}

	.top_user .name {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.btns {
		padding: 1rem;
	}

	.list_my {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		text-align: center;
		background-color: #fff;
		padding: 0.5rem 0.2rem 0;
	}

	.item_my {
		flex: 0 0 20%;
		padding-bottom: 0.5rem;
	}

	.my_nav {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.my_nav text {
		font-size: 0.5rem;
	}
</style>
