<template>
	<view class="page_user" id="user_address">
		<list_address v-if="$check_action('/address/list','get')" :list="list"></list_address>
	</view>
</template>

<script>
	import list_address from "../../components/diy/list_address.vue";
	import mixin from "../../mixins/page.js";
	
	export default {
		mixins: [mixin],
		components: {
			list_address
		},
		data() {
			return{
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},
				url_get_list: "~/api/address/get_list?",
				query: {
					user_id: 0
				},
				list:[]
			}
		},
		methods:{
			get_list_before(param) {
				param.user_id = this.user.user_id
				return param
			},
			get_list_after(json){
				var list = json.result.list
				list.map(o=>{
					o.display_btn = false
				})
				return list
			}
		}
	}
</script>

<style>
	.page_user{
		background-color: #F8F8F8;
	}
</style>
