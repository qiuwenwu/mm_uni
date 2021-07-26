<template>
	<view class="page_goods" id="goods_details">

		<!-- 商品详情模块(开始) -->
		<mm_warp>
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="" style="background-color: #fff;margin-bottom: 0.5rem;">
							<!-- 商品详情 -->
							<div_goods :obj="obj"></div_goods>
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 商品详情模块(结束) -->
		<!-- 评论区模块(开始) -->
		<mm_warp>
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="">
							<!-- 评论区标题 -->
							<bar_title :title="bar_title" v-if="$check_action('/comment/list','get')" :url="bar_url">
							</bar_title>
						</mm_view>
					</mm_col>
				</mm_row>
				<mm_row>
					<mm_col>
						<mm_view class="">
							<!-- 评论区列表 -->
							<list_comment style="background-color: #fff;" v-if="$check_action('/comment/list','get')"
								:list="list_comment" :obj="form_comment"></list_comment>
						</mm_view>
					</mm_col>
				</mm_row>
				<mm_row>
					<mm_col>
						<mm_view class="">
							<!-- 发表评论 -->
							<view class="pa" v-if="$check_action('/comment/list','add')">
								<navigator class="link"
									:url="'/pages/comment/edit?source_table=goods&source_field=goods_id&source_id=' + obj.goods_id">
									发表评论</navigator>
							</view>
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 评论区模块(结束) -->
		<!-- 购买栏模块(开始) -->
		<mm_warp class="buy_wrap">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view style="max-width: 50rem;margin: 0 auto;">
							<bar_goods_nav :isEllipse="true" :options="right_options" :buttonGroup="buttonGroup"
								@click="onClick" @buttonClick="buttonClick" />
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 购买栏模块(结束) -->
	</view>
</template>

<script>
	import div_goods from "@/components/diy/div_goods.vue";
	import list_comment from "@/components/diy/list_comment.vue";
	import bar_title from "@/components/diy/bar_title.vue";
	import bar_goods_nav from "@/components/diy/bar_goods_nav.vue";

	import mixin from "@/mixins/page.js";
	export default {
		mixins: [mixin],
		components: {
			div_goods,
			list_comment,
			bar_title,
			bar_goods_nav
		},
		data() {
			return {
				url_get_obj: "~/api/user/goods?method=get_obj&",
				field: "goods_id",
				query: {
					goods_id: 0
				},
				right_options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'cart',
					text: '购物车',
				}, {
					icon: 'heart',
					text: '收藏',
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				],
				// 商品详情初始化
				obj: {
					goods_id: 0,
					title: "",
					img: "",
					description: "",
					price_ago: 0,
					price: 0,
					sales: 0,
					inventory: 0,
					type: "",
					hits: 0,
					content: "",
					create_time: "",
					update_time: "",
					img_1: "",
					img_2: "",
					img_3: "",
					img_4: "",
					img_5: "",
					source_table: "",
					source_field: "",
					source_id: 0
				},
				// 评论列表初始化
				list_comment: [],
				// 评论bar标题
				bar_title: "评论区",
				// 评论bar的链接
				bar_url: "",
				form_comment: {
					source_table: "goods",
					source_field: "goods_id",
					source_id: 0,
					reply_to_id: 0,
				},
				// 是否已经收藏
				check_collected: false
			}
		},
		methods: {
			// 购买栏点击事件
			onClick(e) {
				if (e.index === 0) {
					uni.showToast({
						title: `尽情期待客服功能`,
						icon: 'none'
					})
				} else if (e.index === 1) {
					this.$nav("/pages/cart/list")
				} else if (e.index === 2) {
					this.add_collect(e.index)
				}
			},
			// 购买栏点击事件
			buttonClick(e) {
				console.log(e)
				if (e.index === 0) {
					this.add_cart()
				}else if(e.index === 1){
					this.buy_now()
				}
			},
			/**收藏
			 * @param {Object} index :index of right_options
			 */
			add_collect(index) {
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
					this.right_options[index].icon = "heart-filled"
					this.$post('~/api/user/collect?method=add&', body, (res) => {
						this.$toast("收藏成功");
						console.log(res);
					})
				} else {
					this.check_collected = false
					this.right_options[index].icon = "heart"
					this.$get('~/api/collect?method=del&', body, (res) => {
						this.$toast("取消收藏");
					})
				}
			},
			// 添加购物车
			add_cart() {
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
				this.$post('~/api/mall/cart?method=add&', body, (res) => {
					this.$toast("加入成功");
					console.log(res);
				})
			},

			// 根据当前时间和随机数生成流水号
			order_code() {
				var orderCode = '';
				for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
				{
					orderCode += Math.floor(Math.random() * 10);
				}
				orderCode = new Date().getTime() + orderCode; //时间戳，用来生成订单号。
				return orderCode;
			},
			// 立即购买,加入订单
			async buy_now() {
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
					this.$get('~/api/user/address?method=get_obj&', {
						user_id,
						default: 1
					}, res => {
						if (res.result && res.result.obj) {
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
				this.$post('~/api/mall/order?method=add&', body, (res) => {
					this.$toast("加入订单成功");
					this.$nav("/pages/order/details?order_number=" + order_number)
				})
			},

			get_obj_after(json) {
				var obj = json.result.obj;
				this.get_comment(obj);
				this.form_comment.source_id = obj.article_id;
			},
			// 获取评论
			get_comment() {
				var options = getCurrentPages()[getCurrentPages().length - 1].options
				var query = {
					"source_table": "goods",
					"source_field": "goods_id",
					"source_id": options.goods_id,
					orderby: "create_time desc",
					reply_to_id: "0",
				}
				this.$get("~/api/comment?", query, (json) => {
					if (json.result) {
						var list_comment = json.result.list
						list_comment.map((o) => {
							o.list_reply = [];
						});
						this.add_reply(list_comment).then((list) => {
							this.list_comment = list;
						});
					}
				})
			},
			/**
			 * @param { Array } list 评论列表
			 * 添加回复到评论列表
			 */
			add_reply(list) {
				return new Promise((resolve) => {
					for (let idx = 0; idx < list.length; idx++) {
						const obj = list[idx];
						this.$get(
							"~/api/comment?", {
								source_table: "goods",
								source_field: "goods_id",
								source_id: obj.goods_id,
								orderby: "create_time desc",
								reply_to_id: obj.comment_id,
							},
							(res) => {
								if (res.result) {
									obj.list_reply = res.result.list;
								}
							}
						);
					}
					resolve(list);
				});
			},
		},
		onLoad() {
			this.get_comment()
		}
	}
</script>

<style>
	.page_goods {
		padding-bottom: 3rem;
	}

	.link {
		text-align: center;
		padding: 0.5rem 0;
		border: 1px solid #DBDBDB;
		border-radius: 0.5rem;
	}

	.buy_wrap {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
	}
</style>
