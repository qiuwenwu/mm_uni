<template>
	<mm_page class="page_news" id="news_index">
		<mm_main>
			<!-- 搜索栏(开始) -->
			<mm_warp id="search">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view>
								<view class="search">
									<image class="icon" src="/static/img/search.png"></image>
									<input class="input" v-model="query.keyword" placeholder="输入关键词 如：前端开发、交友活动"
										@blur="search()" @keypress.native.enter="search()" />
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 搜索栏(结束) -->

			<!-- 分类栏(开始) -->
			<mm_warp id="type">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view>
								<view class="bar_type card">
									<view class="item_type" v-for="(o, i) in list_type" :key="i"
										:class="{ active: o.type_id == query.type_id }">
										<view @click="select_type(o)"><text>{{ o.name }}</text></view>
									</view>
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 分类栏(结束) -->


			<!-- 资讯列表(开始) -->
			<mm_warp id="name_card">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<!-- 资讯(开始) -->
							<mm_view v-for="(o, i) in list" :key="i">
								<view class="card" @click="$nav('/pages/news/details?news_id=' + o.news_id)">
									<view class="card_head">
										<view class="title"><text>{{ o.title }}</text>
										</view>
										<view class="time"><text>{{ $to_time(o.time_create) }}</text></view>
									</view>
									<view class="card_body">
										<view class="doc">
											<view><text class="label">报料人:</text><text class="name">{{ o.name || '匿名' }}</text></view>
											<rich-text class="content" :nodes="o.content"></rich-text>
										</view>
									</view>
								</view>
							</mm_view>
							<!-- 资讯(结束) -->
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 资讯列表(结束) -->

			<!-- 浮动按钮(开始) -->
			<mm_warp id="float_btn">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view class="float_btn">
								<view class="btn btn_publish" @click="$nav('/pages/news/edit')"><text>我 要 爆 料</text>
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 浮动按钮(结束) -->
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
				// 获取列表链接
				url_get_list: "~/api/city/news?",
				// 查询条件
				query: {
					type_id: 1,
					// 筛选关键词
					keyword: ""
				},
				// 获取到对象
				obj: {},
				// 获取到的列表
				list: [],
				// 操作表单
				form: {},
				// 筛选关键词
				keyword: "",
				list_type: []
			}
		},
		computed: {

		},
		methods: {
			select_type(o) {
				this.query.type_id = o.type_id;
				this.search();
			}
		},
		/**
		 * 加载页面时
		 */
		onLoad() {
			this.$getList("list_type", "~/api/city/news_type?size=0&");
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
		onUnload() {}
	}
</script>

<style>
	#news_index #id_name {}
</style>
