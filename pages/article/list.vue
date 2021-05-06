<template>
	<view class="page_article" id="article_list">
		<view v-if="$check_action('/article/list','get')">
			<!-- 替换组件的搜索图标 -->
			<uni-search-bar placeholder="搜索文章" @confirm="search" @cancel="cancel" cancelText="取消"
				@input="input($event, 'title')">
				<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
			</uni-search-bar>
			<view class="top_handle">
				<view class="dropdown_box">
					<!-- 筛选栏 -->
					<view class="dropdown_article">
						<mm_dropdown :filter_type="type_names" @handle_item="filter_item"
							:dropdown_title="filter_title"></mm_dropdown>
					</view>
					<!-- /筛选栏 -->
					<!-- 排序 -->
					<view class="dropdown_article">
						<mm_dropdown :dropdown_title="sort_title" @handle_item="sort_item" :sort_list="sort_list">
						</mm_dropdown>
					</view>
					<!-- /排序 -->
				</view>
			</view>
			<!-- 文章列表 -->
			<list_article style="background-color: #fff;" :list="list" class="mb"></list_article>
			<!-- /文章列表 -->
			<!-- 分页器 -->
			<uni-pagination class="pager" show-icon="true" :total="count" :pageSize="query.size" :current="query.page"
				@change="page_change"></uni-pagination>
			<!-- /分页器 -->
		</view>
	</view>
</template>

<script>
	import list_article from "../../components/diy/list_article.vue";
	import mixin from "../../mixins/page.js";

	export default {
		mixins: [mixin],
		components: {
			list_article
		},
		data() {
			return {
				url_get_list: "~/api/article/get_list?",
				list: [],
				query: {
					title: "",
					page: 1,
					size: 4
				},
				list_article_type: [],
				type_names: [],
				filter_title: '筛选',
				sort_title: '排序',
				sort_list: [{
						name: '热度从高到低',
						value: '`hits` desc'
					},
					{
						name: '热度从低到高',
						value: '`hits` asc'
					},
					{
						name: '更新时间从高到低',
						value: '`create_time` desc'
					},
					{
						name: '价更新时间从低到高',
						value: '`create_time` asc'
					},

				]
			}
		},
		methods: {
			/**
			 * 添加文章过滤
			 */
			get_article_type() {
				this.$get(
					"~/api/article_type/get_list", {
						page: 1,
						size: "0",
					},
					(res) => {
						if (res.result) {
							this.list_article_type = res.result.list;
							this.type_names.push("全部")
							this.list_article_type.map(o => this.type_names.push(o.name))
						}
					}
				);
			},

			/**
			 * 下拉商品筛选选择
			 */
			filter_item(name) {
				if (name.name == "全部") {
					this.query = {
						page: 1,
						size: 4,
					};
					this.get_list();
				} else {
					this.query.type = name.name;
					this.search();
				}
			},
			/**
			 *下拉排序 
			 */
			sort_item(o) {
				this.query.orderby = o.name.value;
				this.search()
			},
			input(e, key) {
				this.query[key] = e.value;
			},
			// page_change(e) {
			// 	console.log(e);
			// },
			search() {
				this.query.page = 1;
				this.get_list();
			},
			cancel() {
				console.log("eer");
				this.query.title = "";
				this.search();
			}
		},
		mounted() {
			this.get_article_type();
		}
	}
</script>

<style scoped>
	.pager {
		margin-top: 1rem;
	}

	.uni-collapse {
		background-color: inherit;
	}

	.top_handle {
		position: relative;
		height: 2.6rem;
		width: 100%;
	}

	.dropdown_box {
		width: 100%;
		display: flex;
		position: absolute;
		z-index: 1000;
	}

	.dropdown_box>* {
		flex: 1
	}

	.dropdown_article {
		line-height: 40px;
	}
</style>
