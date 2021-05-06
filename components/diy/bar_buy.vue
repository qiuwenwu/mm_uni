<template>
	<view class="bar_buy">
		<view class="left_block">
			<navigator v-if="$check_action('/comment/list','add')" :url="'/pages/comment/edit?source_table=goods&source_field=goods_id&source_id='+obj.goods_id" class="collect_box">
				<uni-icons type="chat" size="20"></uni-icons>
				<text>评论</text>
			</navigator>
			<navigator v-if="$check_action('/collect/list','add')&&!check_collected" @click="add_collect()" class="publish_box">
				<uni-icons type="heart" size="20"></uni-icons>
				<text>收藏</text>
			</navigator>
			<navigator v-if="$check_action('/collect/list','del')&&check_collected" @click="add_collect()" class="publish_box">
				<uni-icons type="heart-filled" size="20"></uni-icons>
				<text>已收藏</text>
			</navigator>
		</view>
		<view class="right_block">
			<view class="btns">
					<view v-if="$check_action('/cart/list','add')" class="addCart" @click="add_cart()">加入购物车</view>
					<view v-if="$check_action('/order/list','add')" class="buy" @click="add_order()">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
		// import mixin from "../../mixins/page.js"
	export default {
		// mixins:[mixin],
		props: {
			obj: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				// 是否已收藏
				check_collected: false,
				user:this.$store.state.user
			}
		},
		methods: {
			// 收藏
			add_collect() {
				if(this.user.user_id == 0){
					this.$nav("/pages/account/login")
					return
				}
				var {
					title,
					img,
					goods_id
				} = this.obj
				var body = {
					title,
					img,
					source_table: "goods",
					source_field: "goods_id",
					source_id: goods_id,
					user_id: this.$store.state.user.user_id
				}
				if (!this.check_collected) {
					this.check_collected = true
					this.$post('~/api/collect/add?', body, (res) => {
						this.$toast("收藏成功");
						console.log(res);
					})
				} else {
					this.check_collected = false
					this.$get('~/api/collect/del', body, (res) => {
						this.$toast("取消收藏");
					})
				}
			},
			// 添加购物车
			add_cart() {
				if(this.user.user_id == 0){
					this.$nav("/pages/account/login")
					return
				}
				var {
					title,
					img,
					price,
					price_ago,
					description,
					goods_id,
					type
				} = this.obj
				var body = {
					title,
					img,
					price,
					price_ago,
					price_count: price,
					description,
					goods_id,
					type,
					user_id: this.$store.state.user.user_id
				}
				this.$post('~/api/cart/add?', body, (res) => {
					this.$toast("加入成功");
					console.log(res);
				})
			},
			// 根据当前时间和随机数生成流水号
			order_code() {
			  var orderCode='';
			  for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
			  {
			    orderCode += Math.floor(Math.random() * 10);
			  }
			  orderCode = new Date().getTime() + orderCode;  //时间戳，用来生成订单号。
			  return orderCode;
			},
			// 立即购买,加入订单
			async add_order() {
				if(this.user.user_id == 0){
					this.$nav("/pages/account/login")
					return
				}
				var {
					title,
					img,
					price,
					price_ago,
					description,
					type,
					goods_id
				} = this.obj
				var user_id = this.$store.state.user.user_id
				// 获取联系方式
				var address_promise = new Promise((resolve, reject) => {
					this.$get('~/api/address/get_obj?', {
						user_id,
						default: 1
					}, res => {
						if (res.result&&res.result.obj) {
							resolve(res.result.obj);
						} else {
							this.$toast("地址未添加")
							return
						}
					})
				})
				var {
					name: contact_name,
					phone: contact_phone,
					address: contact_address,
					postcode: postal_code
				} = await address_promise

				// 生成订单号
				var order_number = this.order_code()
				var body = {
					order_number,
					goods_id,
					title,
					type,
					img,
					price,
					price_ago,
					num: 1,
					price_count: price,
					contact_name,
					contact_phone,
					contact_address,
					postal_code,
					user_id,
					description
				}
				console.log(body);
				this.$post('~/api/order/add?', body, (res) => {
					this.$toast("加入订单成功");
					this.$nav("/pages/order/details?order_number=" + order_number)
				})
			}

		},
		computed: {}
	}
</script>

<style>
	.bar_buy {
		display: flex;
		background-color: var(--color_white);
		border: 1px solid #eee;

	}

	.left_block {
		flex: 1;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.left_block>navigator {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.left_block text {
		color: var(--color_grey);
		font-size: 0.5rem;
		padding-left: 0.1rem;
	}

	.right_block {
		color: #fff;
		padding: 0.5rem;
	}

	.right_block .btns {
		display: flex;
		align-items: center;
		border-radius: 1rem;
		overflow: hidden;
	}
	.right_block .btns>view{
		height: 2rem;
		line-height: 2rem;
		padding: 0 0.7rem;
	}
	.addCart {
		background-color: var(--color_orange);
	}

	.buy {
		background-color: var(--color_red);
	}
</style>
