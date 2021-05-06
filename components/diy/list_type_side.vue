<template>
	<view class="list_type_side">
		<view class="row">
			<view v-for="(o, i) in list" :key="i">
				<navigator :url="url + o[vm.item_id]" class="item">
					<view><text>{{ o[vm.name] }}</text></view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		model:{
			prop: "value",
			event: "change"
		},
		props: {
			value: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style>
</style>
