<template>
	<mm_page class="page_notice" id="notice_list">
		<mm_head class="page_head">
			<!-- 搜索栏 -->
			<uni-search-bar placeholder="搜索公告" @confirm="search" @cancel="cancel" cancelText="取消"
				@input="input($event, 'title')">
				<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
			</uni-search-bar>
		</mm_head>
			
		<mm_main>
			<!-- 公告细节模块(开始) -->
			<mm_warp>
				<mm_container class="container">
					<mm_row>
						<mm_col class="col-12">

						</mm_col>
					</mm_row>
					<mm_row>
						<mm_col>
							<mm_view class="details_view">
								<!-- /搜索栏 -->
								<uni-list>
									<uni-list-item v-for="(o, i) in list" :title="o.title"
										:to="'./details?notice_id=' + o.notice_id" :rightText="o.create_time">
									</uni-list-item>
								</uni-list>
							</mm_view>
						</mm_col>
					</mm_row>
					<mm_row>
						<mm_col>
							<mm_view class="pager_view">
								<uni-pagination class="pager" title="分页器" show-icon="true" :total="count"
									:pageSize="query.size" :current="query.page" @change="page_change"></uni-pagination>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container class="container">
			</mm_warp>
			<!-- 公告细节模块(结束) -->
		</mm_main>
	</mm_page>
</template>

<script>
	import mixin from "@/mixins/page.js"

	export default {
		mixins: [mixin],
		data() {
			return {
				url_get_list: "~/api/notice?",
				list: [],
				query: {
					title: "",
					page: 1,
					size: 10
				},
				count: 50
			}
		},
		methods: {
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
	.pager {
		margin-top: 1rem;
	}
</style>
