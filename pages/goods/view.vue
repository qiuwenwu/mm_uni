<template>
	<mm_page class="page_dir" id="dir_file">
		<mm_main>
			<!-- XXX模块(开始) -->
			<mm_warp id="id_name">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view class="yyy">
									{{ obj }}
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
				
			<!-- XXX模块(结束) -->
			<input v-model="form.title" @blur="submit()" />
		</mm_main>
	</mm_page>
</template>

<script>
	import mixin_page from "@/mixins/page.js";
	export default {
		mixins: [
			mixin_page
		],
		data() {
			return {
				url_get_obj: "~/api/wr/goods?method=get_obj&",
				url_add: "~/api/wr/goods?method=add&",
				url_set: "~/api/wr/goods?method=set&",
				// 查询条件
				query: {
					goods_id: 1
				},
				// 表的主字段
				field: "goods_id"
			}
		}
	}
</script>

<style>
	#dir_file #id_name {}
</style>

