<template>
	<view class="list_goods">
		<!-- 表格 -->
		<view class="list_goods_table">
			<view class="change_table" @click="show_table()">
				{{ title }}
			</view>
			<view class="goods_table_block" v-show="is_opened">
				<uni-table stripe border emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center">图片</uni-th>
						<uni-th align="center">标题</uni-th>
						<uni-th align="center">价格</uni-th>
						<uni-th align="center">原价</uni-th>
						<uni-th align="center">购物车</uni-th>
					</uni-tr>
					<uni-tr v-for="(o, i) in list" :key="i">
						<uni-td class="image" align="center">
							<image style="width:4rem;height: 4rem;" :src="$fullUrl(o[vm.img]) || '../../static/img/default.png'" mode="scaleToFill">
							</image>
						</uni-td>
						<uni-td class="title" align="center">
							{{ o[vm.title] }}
						</uni-td>
						<uni-td class="price" align="center">
							￥{{ o[vm.price] }}
						</uni-td>
						<uni-td class="price_ago" align="center">￥{{ o[vm.price_ago] }}</uni-td>
						<uni-td class="cart" align="center">
							<uni-icons type="cart"></uni-icons>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
		<!-- /表格 -->
		<view class="goods_block">
			<view class="row" v-show="!is_opened">
				<view v-for="(o, i) in list" :key="i" :class="'col-' + col" class="col">
					<navigator :url="'/pages/goods/details?goods_id=' + o[vm.goods_id]" class="goods">
						<view class="goods_img_box">
							<image :src="$fullUrl(o[vm.img]) || '../../static/img/default.png'" mode="widthFix" class="goods_img"></image>
						</view>
						<view class="good_bottom">
							<view class="title_wrap"><text class="ellipsis_2">{{ o[vm.title] }}</text></view>
							<view style="position: relative;">
								<text style="font-size: 0.5rem;color:var(--color_grey)"></text><text
									class="price">￥{{ o[vm.price] }}</text><text
									class="price_ago">￥{{ o[vm.price_ago] }}</text>
								<uni-icons class="icon_cart" type="cart" size="14"></uni-icons>
							</view>
						</view>
					</navigator>
				</view>
		</view>
		</view>
		
	</view>

</template>

<script>
	export default {
		props: {
			url: {
				type: String,
				default: '/pages/goods/details?goods_id='
			},
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			vm: {
				type: Object,
				default: function() {
					return {
						goods_id: "goods_id",
						img: "img",
						title: "title",
						price: "price",
						price_ago: "price_ago"
					}
				}
			},
			span: {
				type: Number,
				default: 2
			}
		},
		data() {
			var col = 12 / this.span;
			return {
				col,
				is_opened: false,
				title: '切换成表格'
			}

		},
		methods: {
			show_table() {
				this.is_opened = !this.is_opened
				if (this.is_opened === true) {
					this.title = '切换成列表'
				} else {
					this.title = '切换成表格'
				}
			}
		}
	}
</script>

<style scoped>
	.ellipsis_2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.goods {
		padding: 0.5rem;
		border: 1rpx solid #eee;
		border-radius: 5rpx;
		background-color: #fff;
	}

	.goods .goods_img_box {
		height: 136px;
		width: auto;
	}

	.goods .goods_img_box .goods_img {
		height: 100% !important;
		width: 100% !important;

	}

	.good_bottom {
		padding: 0.2rem 0.5rem;
		padding-bottom: 0.5rem;
		font-size: 0.8rem;

	}

	.title_wrap {
		margin-bottom: 0.3rem;
	}

	.price {
		color: var(--color_primary_b);
		font-weight: 600;
	}

	.price_ago {
		margin-left: .3rem;
		text-decoration: line-through;
		font-size: 0.4rem;
		color: #999;
	}

	.icon_cart {
		position: absolute;
		right: 0;
	}

	.list_goods .list_goods_table {
		width: 100%;
		padding: 5px 0;
		background-color: #fff;
	}

	.list_goods .list_goods_table .change_table {
		font-weight: bold;
		font-size: 0.8rem ;
		margin-left: 7px;
		padding: 5px;
		width: 100px;
		/* border: 1px solid var(--color_border);
		border-radius: 5px; */
	}

	.list_goods .list_goods_table .goods_table_block .uni-table-td {
		padding: 8px;
	}

	.list_goods .list_goods_table .goods_table_block .image {
		width: 5%;

	}

	.list_goods .list_goods_table .goods_table_block .title {
		overflow: hidden;
		width: 20%;
		font-size: 0.5rem;
	}

	.list_goods .list_goods_table .goods_table_block .price {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_goods .list_goods_table .goods_table_block .price_ago {
		width: 12%;
		font-size: 0.5rem;
		text-decoration: line-through;
	}

	.list_goods .list_goods_table .goods_table_block .cart {
		width: 12%;
		font-size: 0.5rem;
	}
</style>
