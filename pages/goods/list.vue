<template>
	<view class="page_goods" id="goods_list">

		<!-- 筛选模块(开始) -->
		<mm_warp>
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="">
							<!-- 搜索栏 -->
							<uni-search-bar placeholder="搜索产品" @confirm="search" @cancel="cancel" cancelText="取消"
								@input="input($event, 'title')">
								<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
							</uni-search-bar>
						</mm_view>
					</mm_col>
				</mm_row>

				<mm_row>
					<mm_col>
						<mm_view class="tab_view">
							<!-- 筛选栏 -->
							<list_tab activeColor="var(--color_primary)" lineColor="var(--color_primary)" :list="types"
								v-model="query['type']" @change="changeTab('type')"></list_tab>
							<!-- /筛选栏 -->
						</mm_view>
					</mm_col>
				</mm_row>

				<mm_row>
					<mm_col>
						<mm_view class="sort_view">
							<!-- 排序 -->
							<view class="list_orderby">
								<bar_orderby :text="o.name" v-model:direction="o.direction"
									v-for="(o,i) in list_orderby" :key="i" @handle="handleOrderby">
								</bar_orderby>
							</view>
							<!-- /排序 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 筛选模块(结束) -->
		<!-- 商品列表模块(开始) -->
		<mm_warp>
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view  style="margin-top: 0.5rem">
							<template v-if="$check_action('/goods/list','get')">
								<!-- 商品列表 -->
								<list_goods :list="list"></list_goods>
								<!-- /商品列表 -->
							</template>
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 商品列表模块(结束) -->
		<!-- 分页器模块(开始) -->
		<mm_warp>
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="">
							<!-- 分页器 -->
							<uni-pagination class="pager" show-icon="true" :total="count" :pageSize="query.size"
								:current="query.page" @change="page_change"></uni-pagination>
							<!-- /分页器 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 分页器模块(结束) -->
	</view>
</template>

<script>
	import list_goods from "@/components/diy/list_goods.vue"
	import list_tab from "@/components/diy/list_tab.vue"
	import bar_orderby from "@/components/diy/bar_orderby.vue"
	import mixin from "@/mixins/page.js"

	export default {
		mixins: [mixin],
		components: {
			list_goods,
			list_tab,
			bar_orderby
		},
		data() {
			return {
				url_get_list: "~/api/goods?",
				list: [],
				query: {
					title: "",
					page: 1,
					size: 6,
					type: ""
				},
				// 分类
				types: [
					"全部"
				],
				list_orderby: [{
						name: '销量',
						direction: "",
						command_asc: '`sales` asc',
						command_desc: '`sales` desc'
					},
					{
						name: '上架日期',
						direction: "",
						command_asc: '`create_time` asc',
						command_desc: '`create_time` desc'
					},{
						name: '价格',
						direction: "",
						command_asc: '`price` asc',
						command_desc: '`price` desc'
					},
					{
						name: '点击量',
						direction: "",
						command_asc: '`hits` asc',
						command_desc: '`hits` desc'
					}
				],
			}
		},
		methods: {
			/**  
			 * 添加商品过滤
			 */
			get_goods_type() {
				this.$get(
					"~/api/goods_type?", {
						page: 1,
						size: "0",
					},
					(res) => {
						if (res.result) {
							let list = res.result.list;
							list.map(obj => {
								this.types.push(obj.name)
							})
						}
					}
				);
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
			// 改变分类标签
			changeTab(idx) {
				let types = this.types
				if (types[idx] !== "全部") {
					this.query.type = types[idx]
					this.search()
				} else {
					this.query.type = ""
					this.search()
				}
			},
			// 控制排序
			handleOrderby(o) {
				// console.log(o);
				// 取出对应的orderby

				// 重置其他排序的direction
				this.list_orderby.map(val => {
					if (val.name !== o.text) {
						return val.direction = ""
					}
				})

				// 找到对应的排序项，发送排序请求
				var obj_orderby = this.list_orderby.find(val => val.name === o.text)
				if (o.direction === "") {
					this.query.orderby = ""
					this.search()
				} else if (o.direction === "up") {
					this.query.orderby = obj_orderby.command_desc
					this.search()
				} else if (o.direction === "down") {
					this.query.orderby = obj_orderby.command_asc
					this.search()
				}
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

	.tab_view {
		background-color: #FFFFFF;
		margin: 0 auto;
	}


	.list_orderby {
		display: flex;
		justify-content: flex-end;
		background-color: #FFFFFF;
		border-top: 5px double #ccc;
		border-bottom: 5px double #ccc;
		margin-right: -1px;
	}

	.list_orderby .bar_orderby {
		border-left: 1px solid #ccc;
	}
</style>
