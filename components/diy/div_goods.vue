<template>
	<view class="div_goods">
		<template v-if="swiper_img.length">
			<swiper class="swiper" indicator-active-color="#fff" :indicator-dots="indicatorDots" :autoplay="autoplay"
				:interval="interval" :duration="duration">

				<swiper-item v-for="(o_img,i) in swiper_img" :key="i">
					<image style="width: 100%;" :src="$fullImgUrl(o_img)"></image>
				</swiper-item>
			</swiper>
		</template>
		<template v-else>
			<image :src="$fullImgUrl(obj[vm.img])" style="width: 100%;" mode=""></image>
		</template>
		<view class="wrap">
			<view class="title">
				<text>{{obj[vm.title]}}</text>
			</view>

			<view class="price_wrap">
				<text class="price">￥{{obj[vm.price]}}</text>
				<text class="price_ago">￥{{obj[vm.price_ago]}}</text>
			</view>

			<view class="description">
				<view class="sales">
					<text>已卖{{obj[vm.sales]}}</text>
				</view>
				<text>{{obj[vm.description]}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			obj: {
				type: Object,
				default: function() {
					return {}
				}
			},
			vm: {
				type: Object,
				default: function() {
					return {
						goods_id: "goods_id",
						title: "title",
						img: "img",
						description: "description",
						price_ago: "price_ago",
						price: "price",
						sales: "sales",
						inventory: "inventory",
						type: "type",
						hits: "hits",
						content: "content",
						create_time: "create_time",
						update_time: "update_time",
						img_1: "img_1",
						img_2: "img_2",
						img_3: "img_3",
						img_4: "img_4",
						img_5: "img_5"
					}
				}
			},
		},
		data() {
			return {
				// 轮播图属性
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {

		},
		computed: {
			// 获得商品轮播图
			swiper_img: function() {
				var obj = this.obj
				var list_img = []
				for (let k in obj) {
					if (k.substr(0, 3) === "img" && obj[k]) {
						list_img.push(obj[k])
					}
				}
				return list_img
			}
		}
	}
</script>

<style>
	.div_goods>.wrap {
		position: relative;
		padding: 0.8rem;
	}

	.title {
		font-weight: 600;
	}

	.price_wrap {
		position: absolute;
		top: -2.2rem;
		left: 0;
		padding: 0.2rem 0.4rem;
		margin: 0.5rem 0;
		background-color: var(--color_orange)
	}

	.price {
		color: #fff;
		font-weight: 600;
	}

	.price_ago {
		color: #fff;
		margin-left: .5rem;
		text-decoration: line-through;
		font-size: 0.7rem;
	}

	.sales {
		font-size: 0.7rem;
		margin: 0.3rem 0;
		color: #949494;
	}

	.description {
		margin-top: 1rem;
		font-size: 0.8rem;
		color: var(--color_grey);
	}
</style>
