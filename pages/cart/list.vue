<template>
	<view class="page_cart" id="cart_index">
		<!-- 购物车 -->
		<list_cart :list="list"></list_cart>
		<!-- /购物车 -->
	</view>
</template>

<script>
	import list_cart from "../../components/diy/list_cart.vue"
	import mixin from "../../mixins/page.js"

	export default {
		mixins: [mixin],
		components: {
			list_cart,
		},
		data() {
			return {
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},
				url_get_list: "~/api/cart/get_list?",
				query: {
					user_id: 0
				},
				list_cart_type: [],
				title: '',
			}
		},
		methods: {
			get_list_before(param) {
				param.user_id = this.user.user_id
				return param
			},
			get_list_after(json) {
				return json.result.list.map(o => {
					o.selected = false
				})
			},
		},
		onShow() {}
	}
</script>

<style scoped>
	page {
		overflow: hidden;
	}

	.page_cart {
		padding-top: 0.8rem;
		padding-bottom: 5rem;
		height: 100vh;
		background-color: #F8F8F8;
		overflow: scroll;
	}

	.uni-collapse {
		background-color: inherit;
	}

	.top_handle {
		position: relative;
		height: 2.6rem;
		width: 100%;
	}

	.collapses_box {
		width: 100%;
		display: flex;
		position: absolute;
		z-index: 1000;
	}

	.collapses_box>* {
		flex: 1
	}

	.collapse_item {
		font-size: 14px;
	}
</style>
