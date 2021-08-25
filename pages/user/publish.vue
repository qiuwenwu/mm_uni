<template>
	<mm_page class="page_user" id="user_publish">
		<mm_main>
			<!-- 搜索栏(开始) -->
			<mm_warp id="search">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view>
								<view class="search">
									<image class="icon" src="/static/img/search.png"></image>
									<input class="input" v-model="query.keyword" placeholder="输入关键词 如：唱k 做饭"
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
								<view class="card" @click="'/pages/info/details?info_id=' + o.info_id">
									<view class="card_head">
										<view class="title"><text>{{ o.title }}</text>
										</view>
										<view class="time"><text>{{ $to_time(o.time_create) }}</text></view>
									</view>
									<view class="card_body">
										<view class="doc">
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
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},
				message: 'Hello',
				// 定时器
				timer: null,
				// 请求链接
				url: "",
				// 获取单条数据链接
				url_get_obj: "",
				// 获取列表链接
				url_get_list:  "~/api/city/info?",
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
				keyword: "",
				list_type : [ {
					type_id : 1,
					name : "资讯"
				},
				{
					type_id : 1,
					name : "新闻"
				}]
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
	#user_publish #id_name {}
</style>

