<template>
	<view class="bar_title">
		<view class="title">
			<navigator :url="url">
				<text>
					{{ title }}
				</text>
			</navigator>
		</view>
		<view class="more" v-if="url">
			<navigator :url="url">
				<text  style="color:var(--color_primary); font-size: 0.8rem;">更多</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ""
			},
			url: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style scoped>
	.bar_title {
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2px;
	}

	.title {
		color: var(--color_primary);
	}

	navigator {
		padding: 0.5rem 0.75rem;
	}

	.more {
		font-size: 0.875rem;
		color: var(--color_primary);
		height: 100%;
		overflow: hidden;
	}

</style>
