<template>
	<view class="page_notice pa" id="notice_details">
		<view class="title">
			{{obj.title}}
		</view>
		<view class="time">
			{{obj.create_time}}
		</view>
		<view class="content" style="text-align: left;">
			<rich-text :nodes="obj.content"></rich-text>
		</view>
	</view>
</template>

<script>
	import mixin from "../../mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				url_get_obj: "~/api/notice/get_obj?",
				field: "notice_id",
				query: {
					notice_id: 0
				},
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				obj: {}
			}
		},
		methods: {
			get_obj_after(json) {
				console.log(JSON.stringify(json));
			}
		}
	}
</script>

<style>
	.page_notice {
		text-align: center;
	}

	.page_notice>view {
		margin-top: 1rem;
	}

	.title {
		font-size: 1.3rem;
	}

	.time {
		color: var(--color_grey);
	}
</style>
