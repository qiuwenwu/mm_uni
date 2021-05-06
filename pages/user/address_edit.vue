<template>
	<view class="page_user" id="user_address_edit">
		<form_address :form="obj"></form_address>
	</view>
</template>

<script>
	import form_address from "../../components/diy/form_address.vue";

	import mixin from "../../mixins/page.js";

	export default {
		mixins: [mixin],
		components: {
			form_address
		},
		data() {
			return {
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},
				url_get_obj: "~/api/address/get_obj?",
				field: "address_id",
				query: {
					address_id: 0
				},
			}
		},
		methods: {
			get_obj_after(json) {
				json.result.obj.user_id = this.user.user_id
				return json
			}
		},
		onLoad() {}

	}
</script>

<style>
</style>
