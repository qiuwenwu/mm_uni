<template>
	<mm_page class="page_user" id="user_index">
		<mm_main>
			<!-- 用户栏(开始) -->
			<mm_warp id="menu">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view class="yyy">

							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 用户栏(结束) -->

			<!-- 导航列表(开始) -->
			<mm_warp id="nav">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view>
								<button>立 即 发 布</button>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 导航列表(结束) -->
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
				message: 'Hello',
				// 定时器
				timer: null,
				// 请求链接
				url: "",
				// 获取单条数据链接
				url_get_obj: "",
				// 获取列表链接
				url_get_list: "",
				// 查询条件
				query: {},
				// 表的主字段
				field: "xxx_id",
				// 获取到对象
				obj: {},
				// 获取到的列表
				list: [],
				// 操作表单
				form: {},
				// 筛选关键词
				keyword: ""
			}
		},
		computed: {
			/**
			 * 新列表
			 */
			list_new() {
				var list = this.list;
				var lt = [];
				for (var i = 0; i < list.length; i++) {
					var o = list[i];
					if (o.keyword == this.keyword) {
						lt.push(o);
					}
				}
				return lt;
			}
		},
		methods: {

		},
		/**
		 * 加载页面时
		 */
		onLoad() {},
		/**
		 * 页面显示时
		 */
		onShow() {
			// 添加动画
		},
		/**
		 * 页面销毁时
		 */
		onUnload() {}
	}
</script>

<style>
	#user_index #id_name {}
</style>
