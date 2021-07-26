<template>
	<view class="page_user" id="user_address">
		
		<!-- 地址列表模块(开始) -->
		<mm_warp>
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="">
							
							<list_address v-if="$check_action('/address/list','get')" :list="list"></list_address>
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 地址列表模块(结束) -->
	</view>
</template>

<script>
	import list_address from "@/components/diy/list_address.vue";
	import mixin from "@/mixins/page.js";
	
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
				url_get_list: "~/api/address?",
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
