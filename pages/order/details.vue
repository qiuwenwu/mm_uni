<template>
	<view class="page_order" id="order_details">
		<!-- 订单细节模块(开始) -->
		<mm_warp>
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="">
							<template v-if="$check_action('/order/details','get')">
								<view class="state">
									{{state}}
								</view>
								<view class="contact_info">
									<view class="line_1">
										<uni-icons class="icon_address" size="16" color="var(--color_grey)"
											type="location-filled">
										</uni-icons>
										<text class="name">{{contact_name}}</text>
										<text class="phone"> {{contact_phone}}</text>
									</view>
									<text class="line_2">{{contact_address}}</text>
								</view>

								<view class="goods_list" v-for="(obj,idx) in list" :key="idx">
									<view class="item_goods flex_sbc">
										<view class="img_block">
											<image style="width: 4.5rem;height:4.5rem;"
												:src="$fullUrl(obj.img) || '@/static/img/default.png'"
												mode="scaleToFill"></image>
										</view>
										<view class="middle_info">
											<view class="title ellipsis_2">
												{{obj.title}}
											</view>
											<view class="priceAndNum">
												<text class="price">
													￥{{obj.price}}
												</text>
												<text class="num">
													×{{obj.num}}
												</text>
											</view>
										</view>
									</view>

									<view class="num_info">
									</view>
								</view>

								<view class="sum_price flex_sbc">
									<text>需付款</text> <text
										style="color: var(--color_red);font-weight: 600;">￥{{sum_price}}</text>
								</view>

								<view class="btn_block">
									<view v-if="$check_action('/order/details', 'set')">
										<view class="btn_refund" v-if="state === '待付款'" @click="goto_pay()">
											去支付
										</view>
										<view v-if="state === '已签收' || state === '待发货'" class="btn_refund"
											@click="refund()">
											申请退款
										</view>
										<view v-if="state === '待退款'" class="btn_refund" @click="cancel_refund()">
											取消退款申请
										</view>
									</view>
								</view>
								<view class="bottom_order">
									<view class="order_num flex_sbc">
										<text>订单编号：</text><text>{{order_number}}</text>
									</view>
									<view class="time flex_sbc">
										<text>下单时间：</text><text>{{create_time}}</text>
									</view>
								</view>
							</template>
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 订单细节模块(结束) -->
	</view>
</template>

<script>
	import mixin from "@/mixins/page.js"

	export default {
		mixins: [mixin],
		data() {
			return {
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},
				url_get_list: "~/api/order?",
				field: "order_number",
				query: {
					order_number: ""
				},
				contact_name: "",
				contact_phone: "",
				contact_address: "",
				order_number: "",
				create_time: "",
				state: ''
			}
		},
		methods: {
			get_list_after(json) {
				var {
					contact_name,
					contact_phone,
					contact_address,
					order_number,
					create_time,
					state
				} = json.result.list[0]
				this.contact_name = contact_name
				this.contact_phone = contact_phone
				this.contact_address = contact_address
				this.order_number = order_number
				this.create_time = create_time
				this.state = state
				return json
			},
			/**
			 * 退款
			 */
			refund() {
				this.$post(
					"~/api/mall/order?method=set&order_number=" + this.order_number, {
						state: "待退款",
					},
					(res) => {
						this.state = "待退款";
					}
				);
			},
			/**
			 * 取消退款
			 */
			cancel_refund() {
				this.$post(
					"~/api/mall/order?method=set&order_number=" + this.order_number, {
						state: "待发货",
					},
					(res) => {
						this.state = "待发货";
					}
				);
			},
			/**
			 * 支付
			 */
			goto_pay() {
				console.log(123);
				this.$nav(
					"/pages/pay/detail?" +
					"order_number=" +
					this.order_number +
					"&&" +
					"sum_price=" +
					this.sum_price
				);
			},
		},
		computed: {
			sum_price() {
				var sum_price = 0
				this.list.map(o => sum_price += o.price * o.num)
				return sum_price
			},

		}
	}
</script>

<style>
	.ellipsis_2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.page_order {
		min-height: 100vh;
		background-color: #f8f8f8;
	}

	.flex_sbc {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.contact_info {
		background-color: #fff;
		padding: 0.3rem 1rem;
		margin-bottom: 0.5rem;
	}

	.contact_info .line_1 {
		margin-bottom: 0.2rem;
	}

	.contact_info .line_2 {
		font-size: 0.9rem;
	}

	.contact_info .name {
		padding-right: 1rem;
		font-weight: 600;
	}

	.contact_info .phone {
		color: var(--color_grey);
	}

	.state {
		padding: 0.3rem 1rem;
		background-color: #fff;
		color: var(--color_primary);
		border-bottom: 1px solid #f8f8f8;
		font-size: 1.1rem;
	}

	.goods_list {
		padding: 0.2rem 0.8rem;
		background-color: #fff;
	}

	.goods_list .item_goods {
		align-items: stretch;
		border-bottom: 1px solid #f4f4f4;
	}

	.goods_list .img_block {
		padding: 0.2rem;
	}

	.goods_list .middle_info {
		width: calc(100% - 5.5rem);
	}

	.goods_list .title {
		font-size: 0.9rem;
		min-height: 1.4rem;
	}

	.goods_list .num_info {
		display: flex;
		justify-content: space-between;
	}

	.goods_list .price,
	.goods_list .num {
		color: var(--color_grey);
		font-size: 0.5rem;
	}

	.sum_price {
		height: 2.5rem;
		background-color: #FFFFFF;
		padding: 0 0.8rem;
		border-bottom: 1px solid #f4f4f4;
	}

	.btn_block {
		padding: 0.8rem 2.0rem;
		background-color: #fff;
		border-bottom: 1px solid #f4f4f4;
	}

	.btn_refund {
		text-align: center;
		padding: 0.5rem 2rem;
		border: 1px solid var(--color_grey);
		border-radius: 4rem;
	}


	.bottom_order {
		background-color: #fff;
		font-size: 0.8rem;
		color: var(--color_grey);
	}

	.bottom_order>view {
		padding: 0.6rem;
	}

	.bottom_order>view+view {
		border-top: 1px solid #f4f4f4;
	}

	.order_num {
		margin-bottom: 0.3rem;
	}
</style>
