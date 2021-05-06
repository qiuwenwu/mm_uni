<template>
	<view class="page_user" id="user_collect">
		<!-- 搜索栏 -->
		<uni-search-bar placeholder="搜索产品" @confirm="search" @cancel="cancel" cancelText="取消"
			@input="input($event, 'title')">
			<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
		</uni-search-bar>
		<!-- /搜索栏 -->
		<view class="top_handle">
			<view class="dropdown_box">
				<!-- 筛选栏 -->
				<view class="dropdown_collect">
					<mm_dropdown :sort_list="type_names" @handle_item="filter_item" :dropdown_title="filter_title">
					</mm_dropdown>
				</view>
				<!-- /筛选栏 -->
			</view>
		</view>
		<list_collect :list="list"></list_collect>
	</view>
</template>

<script>
	import list_collect from "../../components/diy/list_collect.vue";
	import mixin from "../../mixins/page.js";
	import mm_dropdown from "../../components/diy/mm_dropdown.vue"

	export default {
		mixins: [mixin],
		components: {
			list_collect,
			mm_dropdown,
		},
		data() {
			return {
				// 登录权限
				oauth: {
					"signIn": true,
					"user_group": []
				},
				url_get_list: "~/api/collect/get_list?",
				query: {
					user_id: 0
				},
				list: [],
				type_names: [{
						name: '全部',
						value: 0
					},
					{
						name: '文章',
						value: 'article'
					},
					{
						name: '商品',
						value: 'goods'
					},
					{
						name: '论坛',
						value: 'forum'
					},
				],
				filter_title: '排序',
			}
		},
		methods: {
			/**
			 * 下拉收藏选择
			 */
			filter_item(o) {
				this.query.source_table = o.name.value;
				this.search();
			},
			get_list_before(param) {
				param.user_id = this.user.user_id
				return param
			},
			page_change(e) {
				console.log(e);
			},
			search() {
				this.query.page = 1;
				this.get_list();
			},
			cancel() {
				this.title = "";
				this.search();
			},
			input(e, key) {
				this.query[key] = e.value;
			},
		}

	}
</script>

<style scoped>
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

	.dropdown_collect {
		line-height: 40px;
	}
</style>
