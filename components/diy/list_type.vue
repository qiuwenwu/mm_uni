<template>
	<view class="list_type">
		<view class="row">
			<view v-for="(o, i) in list" :key="i" :class="'col-' + col">
				<navigator :url="url + o[vm.item_id]" class="item">
					<image style="width: 100%; height: auto;" :src="$fullUrl(o[vm.img]) || '../../static/img/default.png'" mode="widthFix"></image>
					<view><text>{{ o[vm.name] }}</text></view>
				</navigator>
			</view>
		</view>
	</view>
</template>


<script>
	export default {
		props: {
			url: {
				type: String,
				default: '/pages/item/details?item_id='
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
						item_id: "item_id",
						img: "img",
						name: "name"
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
				col
			}
		}
	}
</script>

<style scoped>
	.row {
		justify-content: start;
	}

	.item {
		padding: .75rem;
	}

	.price {
		color: var(--color_orange);
		font-weight: 600;
	}

	.price_ago {
		margin-left: .5rem;
		text-decoration: line-through;
		font-size: 0.875rem;
		color: #999;
	}
</style>
