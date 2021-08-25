<template>
	<mm_page class="page_article article_details" id="article_details">
		<mm_main>
			<!-- 文章详情(开始) -->
			<mm_warp id="article">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<!-- 文章(开始) -->
							<mm_card class="article">
								<view class="card_head center">
									<view class="title"><text>{{ obj.title }}</text></view>
									<view class="time"><text>{{ obj.time_update }}</text></view>
								</view>
								<view class="card_body">
									<rich-text :nodes="obj.content"></rich-text>
								</view>
								<view class="card_foot">
									
								</view>
							</mm_card>
							<!-- 文章(结束) -->
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 文章详情(结束) -->
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
				// 获取单条数据链接
				url_get_obj: "~/api/city/news?method=get_obj&",
				// 查询条件
				query: {
					news_id: 0
				},
				// 表的主字段
				field: "news_id",
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
	.article_details .time {
		font-size: 0.875rem;
		color: #666;
	}
</style>

