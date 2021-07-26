<template>
	<view class="page_order" id="order_list">

		<!-- 筛选栏模块(开始) -->
		<mm_warp>
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="">
							<!-- 搜索栏 -->
							<uni-search-bar placeholder="搜索产品" @confirm="search" @cancel="cancel" cancelText="取消"
								@input="input($event, 'title')">
								<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
							</uni-search-bar>
						</mm_view>
					</mm_col>
				</mm_row>

				<mm_row>
					<mm_col>
						<mm_view class="tab_view">
							<!-- 筛选栏 -->
							<list_tab activeColor="var(--color_primary)" lineColor="var(--color_primary)"
								:tabs="state_list" v-model="current_state" @change="changeTab"></list_tab>
							<!-- /筛选栏 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>

		<mm_warp>
			<mm_container class="container" style="margin-top: 1rem;">
				<mm_row>
					<mm_col>
						<mm_view style="padding-bottom: 4rem;">
							<list_order v-if="$check_action('/order/list','get')" :list="list_diff">
							</list_order>
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
	</view>
</template>

<script>
	import list_order from "@/components/diy/list_order.vue"
	import list_tab from "@/components/diy/list_tab.vue"
	import mixin from "@/mixins/page.js"

	export default {
		mixins: [mixin],
		components: {
			list_order,
			list_tab
		},
		data() {
			return {
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},
				url_get_list: "~/api/order?",
				list_diff: [],
				query: {
					user_id: 0
				},
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
				current_state: 0
			}
		},
		methods: {
			/**
			 * 下拉商品筛选选择
			 */
			filter_item(o) {
				console.log(123, o.name);
				if (o.name === "全部") {
					this.query.state = ''
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
			input(e, key) {
				this.query[key] = e.value;
			},
			// 改变分类标签
			changeTab(idx) {
				let state_list = this.state_list
				if (state_list[idx] !== "全部") {
					this.query.state = state_list[idx]
					this.search()
				} else {
					this.query.state = ""
					this.search()
				}
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
</style>
