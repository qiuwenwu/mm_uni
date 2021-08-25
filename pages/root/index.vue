<template>
	<mm_page class="page_root root_index" id="root_index">
		<mm_main>
			<!-- 轮播图(开始) -->
			<mm_warp id="banner">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view class="banner">
								<!-- 轮播图 -->
								<swiper_image :list="list_slide"></swiper_image>
								<!-- /轮播图 -->
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
							<mm_view class="menu">
								<mm_list class="list_menu row-4">
									<mm_item class="item_menu" v-for="(o, i) in list_menu" :key="i" :url="o.url">
										<image class="icon" v-if="o.icon"
											:src="o.icon ? $fullImgUrl(o.icon) : '/static/img/avatar.png'"></image>
										<view class="title">
											<text>{{ o.title }}</text>
										</view>
									</mm_item>
								</mm_list>
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
							<mm_view>
								<view class="search">
									<image class="icon" src="/static/img/search.png"></image>
									<input class="input" v-model="query.keyword" placeholder="输入关键词 如：软件开发、数学辅导"
										@blur="search()" @keypress.native.enter="search()" />
								</view>
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
							<mm_view v-for="(o, i) in list" :key="i" @click.native="$nav('/pages/card/details?card_id=' + o.card_id)">
								<view class="card name_card">
									<view class="card_head">
										<view class="title"><text class="name">{{ o.name }}</text><text
												class="job">({{ o.job }})</text></view>
										<view class="call" @click.stop="$call_phone(o.phone)">
											<text>联系</text><text>{{ o.sex ? '他' : '她' }}</text>
										</view>
									</view>
									<view class="card_body">
										<view class="media">
											<image class="avatar" src="/static/img/avatar.png" />
										</view>
										<view class="doc">
											<view class="desc"><text class="label">特长:</text><text>{{ o.forte }}</text>
											</view>
											<view class="desc"><text
													class="label">业务范围:</text><text>{{ o.business }}</text>
											</view>
										</view>
									</view>
								</view>
							</mm_view>
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
	import swiper_image from "@/components/mm_uni_ui/swiper/swiper_image.vue";
	import nav_menu from "@/components/mm_uni_ui/nav/nav_menu.vue";

	import mixin_page from "@/mixins/page.js";
	export default {
		mixins: [
			mixin_page
		],
		components: {
			swiper_image,
			nav_menu
		},
		data() {
			return {
				// 获取列表链接
				url_get_list: "~/api/city/user_card?",
				// 查询条件
				query: {
					keyword: "",
					show: 1,
					size: 10,
					page: 1
				},
				list_slide: [],
				list_menu: [],
				list_name_card: []
			}
		},
		/**
		 * 加载页面时
		 */
		onLoad() {},
		/**
		 * 页面显示时
		 */
		onShow() {
			this.$getList("list_slide", "~/api/city/ad?type=banner");
			this.$getList("list_menu", "~/api/city/nav?position=menu&available=1");
		},
		/**
		 * 页面销毁时
		 */
		onUnload() {}
	}
</script>


<style>
	.root_index .banner {
		position: relative;
		background: #fff;
		padding: 0 1rem;
	}

	.root_index .banner .image {
		width: calc(100% - 2rem);
		margin: 0 1rem;
	}

	.root_index .menu {
		text-align: center;
		background: #fff;
		box-shadow: 0 0.25rem 0.5rem 0 rgb(7 17 27 / 10%);
	}

	.root_index .list_menu .icon {
		width: 2rem;
		height: 2rem;
	}

	.root_index .mm_item {
		width: 25vw;
		padding: 1rem 0;
	}


	.name_card .name {
		font-weight: 600;
	}

	.name_card .job {
		margin-left: 0.5rem;
		color: #666;
	}

	.name_card .doc {
		font-size: 0.875rem;
		overflow: hidden;
		color: #666;
		padding-left: 1rem;
	}

	.name_card .label {
		font-weight: 600;
		color: #333;
		margin-right: 0.5rem;
	}

	.name_card .call {
		float: right;
		background: linear-gradient(360deg, #424242 0%, #212121 100%);
		padding: 0.125rem 0.75rem;
		color: #FFF2E9;
		font-size: 0.75rem;
		border-radius: 0.35rem;
		margin-right: 1rem;
		margin-top: 0.125rem;
	}
	
	.name_card .card_head .title::before {
		content: "";
		display: inline-block;
		border-radius: 50%;
		width: 0.5rem;
		height: 0.5rem;
		background: linear-gradient(180deg, #FFE08B 0%, #8E7566 100%);
		margin-right: 0.5rem;
	}
</style>
