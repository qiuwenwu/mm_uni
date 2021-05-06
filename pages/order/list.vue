<template>
	<view class="page_order" id="order_list">
		<view
			style="background-color: #fff;text-align: center;margin-bottom: 1rem;height: 2rem;line-height: 2rem;font-size: 0.8rem;">
			全部订单
		</view>
		<view class="top_handle">
			<view class="dropdown_box">
				<!-- 筛选栏 -->
				<view class="dropdown_order">
					<mm_dropdown :dropdown_title="state_title" @handle_item="filter_item" :filter_type="state_list">
					</mm_dropdown>
				</view>
				<!-- /筛选栏 -->
			</view>
		</view>
		<list_order v-if="$check_action('/order/list','get')" :list="list_diff"></list_order>
	</view>
</template>

<script>
	import list_order from "../../components/diy/list_order.vue"
	import mixin from "../../mixins/page.js"
	import mm_dropdown from "../../components/diy/mm_dropdown.vue"

	export default {
		mixins: [mixin],
		components: {
			list_order,
			mm_dropdown,
		},
		data() {
			return {
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},
				url_get_list: "~/api/order/get_list",
				list_diff: [],
				query: {
					user_id: 0
				},
				state_title: '订单状态',
				state_list: [
					"全部",
					"待付款",
					"待发货",
					"待签收",
					"已签收",
					"待退款",
					"已退款",
					"已拒绝",
					"已完成",
				],
			}
		},
		methods: {
			/**
			 * 下拉商品筛选选择
			 */
			filter_item(o) {
				console.log(123,o.name);
				if (o.name === "全部") {
					this.query.state=''
				} else {
					this.query.state = o.name;
				}
				this.get_list();
			},
			/**
			 * 搜索   
			 */
			search() {
				this.query.page = 1;
				this.get_list();
			},
			get_list_before(param) {
				param.user_id = this.user.user_id
				return param
			},
			get_list_after(json) {
				// 根据订单号区分列表
				var list_diff = []
				var order_num = ""
				var index = -1
				json.result.list.map((o) => {
					if (o.order_number === order_num) {
						list_diff[index]["list"].push(o)
						list_diff[index]["sum_price"] += o.price_count
					} else {
						index += 1
						order_num = o.order_number
						list_diff[index] = {}
						var obj_diff = list_diff[index]
						obj_diff["create_time"] = o.create_time
						obj_diff["order_number"] = order_num
						obj_diff["list"] = []
						obj_diff["list"].push(o)
						obj_diff["sum_price"] = o.price_count
						obj_diff["state"] = o.state
					}
				})
				this.list_diff = list_diff
				return json
			}
		},

	}
</script>

<style scoped>
	.page_order {
		background-color: #f8f8f8;
		min-height: 100vh;
	}

	.top_handle {
		position: relative;
		height: 2.6rem;
		width: 100%;
	}

	.dropdown_box {
		width: 100%;
		display: flex;
		position: absolute;
		z-index: 1000;
	}

	.dropdown_box>* {
		flex: 1
	}

	.dropdown_order {
		line-height: 40px;
	}
</style>
