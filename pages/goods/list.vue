<template>
	<view class="page_goods" id="goods_list">
		<view v-if="$check_action('/goods/list','get')" class="content_goods_list">
			<!-- 搜索栏 -->
			<uni-search-bar placeholder="搜索产品" @confirm="search" @cancel="cancel" cancelText="取消"
				@input="input($event, 'title')">
				<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
			</uni-search-bar>
			<!-- /搜索栏 -->
			<view class="top_handle">
				<view class="dropdown_box">
					<!-- 筛选栏 -->
					<view class="dropdown_goods">
						<mm_dropdown :filter_type="type_names" @handle_item="filter_item"
							:dropdown_title="filter_title"></mm_dropdown>
					</view>
					<!-- /筛选栏 -->
					<!-- 排序 -->
					<view class="dropdown_goods">
						<mm_dropdown :dropdown_title="sort_title" @handle_item="sort_item" :sort_list="sort_list">
						</mm_dropdown>
					</view>
					<!-- /排序 -->
				</view>
			</view>
			<!-- 商品列表 -->
			<list_goods :list="list"></list_goods>
			<!-- /商品列表 -->
			<!-- 分页器 -->
			<uni-pagination class="pager" show-icon="true" :total="count" :pageSize="query.size" :current="query.page"
				@change="page_change"></uni-pagination>
			<!-- /分页器 -->
		</view>
	</view>
</template>

<script>
	import list_goods from "../../components/diy/list_goods.vue";
	import mm_dropdown from "../../components/diy/mm_dropdown.vue"
	import mixin from "../../mixins/page.js"

	export default {
		mixins: [mixin],
		components: {
			list_goods,
			mm_dropdown,
		},
		data() {
			return {
				url_get_list: "~/api/goods/get_list?",
				list: [],
				query: {
					title: "",
					page: 1,
					size: 4
				},
				list_goods_type: [],
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
						name: '价格从高到低',
						value: '`price` desc'
					},
					{
						name: '价格从低到高',
						value: '`price` asc'
					},
					{
						name: '销量从高到低',
						value: '`sales` desc'
					},
					{
						name: '销量从低到高',
						value: '`sales` asc'
					},
				]
			}
		},
		methods: {
			/**  
			 * 添加商品过滤
			 */
			get_goods_type() {
				this.$get(
					"~/api/goods_type/get_list", {
						page: 1,
						size: "0",
					},
					(res) => {
						if (res.result) {
							this.list_goods_type = res.result.list;
							this.type_names.push("全部")
							this.list_goods_type.map(o => this.type_names.push(o.name))
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
			
			search() {
				this.query.page = 1;
				this.get_list();
			},
			cancel() {
				console.log("eer");
				this.query.title = "";
				this.search();
			},
		},
		mounted() {
			this.get_goods_type();
		}
	}
</script>

<style scoped>
	.uni-collapse {
		background-color: inherit;
	}

	.pager {
		margin-top: 1rem;
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

	.dropdown_goods {
		line-height: 40px;
	}
</style>
