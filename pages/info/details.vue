<template>
	<mm_page class="page_info" id="info_details">
		<mm_main>
			<!-- 轮播图(开始) -->
			<mm_warp id="banner">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view class="yyy">

							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 轮播图(结束) -->
			
			<!-- 菜单栏(开始) -->
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
			<!-- 菜单栏(结束) -->
			
			<!-- 搜索栏(开始) -->
			<mm_warp id="search">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view class="yyy">
								
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 搜索栏(结束) -->
			
			<!-- 名片列表(开始) -->
			<mm_warp id="name_card">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<!-- 名片(开始) -->
							<mm_card class="name_card">
								<view class="card_head">
									
								</view>
								<view class="card_body">
									
								</view>
								<view class="card_foot">
									
								</view>
							</mm_card>
							<!-- 名片(结束) -->
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 名片列表(结束) -->
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
		onLoad() {
		},
		/**
		 * 页面显示时
		 */
		onShow() {
			// 添加动画
		},
		/**
		 * 页面销毁时
		 */
		onUnload() {
		}
	}
</script>

<style>
	#info_details #id_name {}
</style>

