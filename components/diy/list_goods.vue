<template>
	<view class="list_goods">
		<!-- 表格 -->
		<view class="goods_table">
			<view class="btn_change_table" @click="show_table()">
				{{ title_btn_change }}
			</view>
			<view class="goods_table_block" v-show="is_opened">
				<uni-table stripe border emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center" class="uni-th">图片</uni-th>
						<uni-th align="center" class="uni-th">价格</uni-th>
						<uni-th align="center" class="uni-th">原价</uni-th>
						<uni-th align="center" class="uni-th">标题</uni-th>
						<uni-th align="center" class="uni-th">销量</uni-th>
						<uni-th align="center" class="uni-th">点击量</uni-th>
						<uni-th align="center" class="uni-th">详情</uni-th>
					</uni-tr>
					<uni-tr v-for="(o, i) in list" :key="i">
						<uni-td class="image" align="center">
							<image style="width:4rem;height: 4rem;" :src="$fullImgUrl(o[vm.img])" mode="scaleToFill">
							</image>
						</uni-td>
						<uni-td align="center">
							￥{{ o[vm.price] |keepTwoNum}}
						</uni-td>
						<uni-td align="center">￥{{ o[vm.price_ago]  |keepTwoNum}}</uni-td>
						<uni-td class="title" align="center">
							{{ o[vm.title] }}
						</uni-td>
						<uni-td align="center">{{ o[vm.sales] }}</uni-td>
						<uni-td align="center">{{ o[vm.hits] }}</uni-td>
						<uni-td align="center">
							<view @click="nav_goods_details(o[vm.goods_id])" style="cursor: pointer;">查看详情</view>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
		<!-- /表格 -->
		
		<!-- 列表 -->
		<view class="goods_list">
			<view class="row" v-show="!is_opened">
				<view v-for="(o, i) in list" :key="i" class="col-6 col-md-3">
					<navigator class="goods_item" :url="'/pages/goods/details?goods_id=' + o[vm.goods_id]">
						<view class="media">
							<image class="image" :src="$fullImgUrl(o[vm.img])" style="height: 10rem;"></image>
						</view>
						<view class="bottom">
							<view class="title">
								{{ o[vm.title] }}
							</view>
							<view>
								<view class="price">
									￥{{ o[vm.price] |keepTwoNum}}
								</view>
								<view class="price_ago">
									￥{{ o[vm.price_ago]  |keepTwoNum}}
								</view>
								<uni-icons class="icon_cart" type="cart" size="20" color="var(--color_primary)">
								</uni-icons>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	import mixin from "@/mixins/component.js"
	export default {
		mixins: [mixin],
		props: {
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
						price_ago: "price_ago",
						sales: "sales",
						hits: "hits"
					}
				}
			},
			span: {
				type: Number,
				default: 2
			}
		},
		data() {
			return {
				is_opened: false,
				title_btn_change: '切换成表格'
			}

		},
		methods: {
			nav_goods_details(goods_id) {
				this.$nav('/pages/goods/details?goods_id=' + goods_id)
				console.log(goods_id);
			},
			show_table() {
				this.is_opened = !this.is_opened
				if (this.is_opened === true) {
					this.title = '切换成列表'
				} else {
					this.title = '切换成表格'
				}
			}
		},
		filters: {
			//过滤器 保留两位
			keepTwoNum: function(value) {
				value = Number(value);
				return value.toFixed(2)
			}
		},
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

	.btn_change_table {
		margin-left: auto;
		font-weight: bold;
		padding: 0.5rem 0;
		width: 100px;
		text-align: center;
		font-size: 0.875rem;
		border: 1px solid #CCCCCC;
		border-radius: 1rem;
		margin-bottom: 0.25rem;
	}
	.uni-th {
		font-weight: 600;
	}

	.row {
		margin-left: -1rem;
		margin-right: -1rem;
	}

	.goods_item {
		padding: var(--padding_base);
	}

	.title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-bottom: var(--margin_small);
	}

	image {
		width: 100%;
	}

	.image:hover {
		transform: rotate(360deg);
		transition: all 0.5s ease-in-out;
	}

	.price {
		display: inline-block;
		color: var(--color_primary);
	}
	.goods_list .price{
		margin-right: 0.5rem;
	}

	.price_ago {
		font-size: var(--font_mini);
		color: var(--color_grey);
		display: inline-block;
		text-decoration: line-through;
	}

	.icon_cart {
		float: right;
	}
</style>
