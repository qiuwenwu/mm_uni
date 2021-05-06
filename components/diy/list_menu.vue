<template>
	<view class="list_menu">
		<view v-if="$check_action(o[vm.url],'get')" v-for="(o, i) in list" :key="i" class="item_menu">
			<navigator :url="'/pages'+o[vm.url]" class="menu" hover-class="hover">
				<image style="width: 2.5rem; height: 2.5rem;" :src="$fullUrl(o[vm.img]) || '../../static/img/default.png'" mode="widthFix"></image>
				<text class="name">{{ o[vm.name] }}</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
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
						img: "img",
						name: "name",
						url: "url"
					}
				}
			}
		},
		methods:{
		}
	}
</script>

<style scoped>
	image {
		border-radius: 1rem;
	}

	.list_menu {
		display: flex;
		justify-content: start;
		text-align: center;
		background-color: #fff;
		overflow: scroll;
		padding: 0.5rem 0;
	}
	.item_menu {
		flex: 0 0 20%;
	}
	.menu {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.menu text {
		font-size: 0.1rem;
	}
</style>
