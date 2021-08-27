<template>
	<mm_page class="page_user" id="user_collect">
		<mm_main>
			<!-- 搜索栏(开始) -->
			<mm_warp id="search">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
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
						<mm_col class="col-12">
							<mm_view>
								<view class="bar_type card">
									<view class="item_type" v-for="(o, i) in list_type" :key="i"
										:class="{ active: o.source_table == query.source_table }">
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
						<mm_col class="col-12">
							<!-- 资讯(开始) -->
							<mm_view v-for="(o, i) in list" :key="i">
								<view class="card">
									<view class="card_head">
										<view class="title">
											<text>{{ o.title }}</text>
										</view>
										<view class="time">
											<text>{{ $to_time(o.create_time)}}</text>
										</view>
									</view>
									<view class="card_body">
										<view class="doc">
											<rich-text class="content" :nodes="o.description"></rich-text>
										</view>
									</view>
									<view class="btn_delete" @click="del(o.collect_id)">
										<text>删除</text>
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
				// 获取列表链接
				url_get_list: "~/api/city/user_collect?",
				// 删除收藏
				url_get_list: "~/api/city/user_collect?method=del&",
				// 数据主键
				field: "collect_id",
				// 查询条件
				query: {
					// 筛选关键词
					keyword: "",
					source_table: "info",
					source_field: "info_id",
					user_id: 0,
				},
				list_type: [{
						source_table: "info",
						source_field: "info_id",
						name: "资讯"
					},
					{
						source_table: "news",
						source_field: "news_id",
						name: "新闻"
					}
				]
			}
		},
		methods: {
			select_type(o) {
				this.query.source_table = o.source_table;
				this.query.source_field = o.source_field;
				this.search();
			},

			get_list_before(param) {
				param.user_id = this.user.user_id;
				return param;
			}
		}
	}
</script>

<style>
	#user_collect .card_head {
		display: flex;
	}

	#user_collect .bar_type {
		display: flex;
		justify-content: center;
	}

	#user_collect .title {
		width: 80%;
	}

	#user_collect .btn_delete {
		display: flex;
		float: right;
		width: fit-content;
		color: #E4C5B0;
		border: 1px solid #E4C5B0;
		font-size: .875rem;
		border-radius: .25rem;
		padding: .125rem 1.5rem;
		margin: 0 1rem 1rem 0;
	}
</style>
