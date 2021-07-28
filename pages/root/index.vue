<template>
	<mm_page class="page_index" id="page_index">
		<!-- XXX列表(开始) -->
		<mm_card class="yyy">
			<view class="card_head">
			</view>
			<view class="card_body">
				
			</view>
			<view class="card_foot">
			</view>
		</mm_card>
		<!-- XXX列表(结束) -->
		<!-- 广告模块(开始) -->
		<mm_warp id="">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view>
							<!-- 店招 -->
							<list_ad v-if="$check_action('/ad/list','get')" :list="list_ad" location="店招"></list_ad>
							<!-- /店招 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 广告模块(结束) -->

		<!-- 轮播图模块(开始) -->
		<mm_warp id="">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="view_swiper">
							<!-- 轮播图 -->
							<swiper_img :list="list_slide"></swiper_img>
							<!-- /轮播图 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 轮播图模块(结束) -->

		<!-- 菜单模块(开始) -->
		<mm_warp id="menu">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="view_menu">
							<!-- 菜单 -->
							<list_menu :list_menu="list_menu"></list_menu>
							<!-- /菜单 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 菜单模块(结束) -->

		<!-- 公告模块(开始) -->
		<mm_warp id="notice">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="view_notice">
							<!-- 公告 -->
							<navigator v-if="$check_action('/notice/list','get')" url="/pages/notice/list">
								<swiper_notice :list="list_notice"></swiper_notice>
							</navigator>
							<!-- /公告 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 公告模块(结束) -->

		<!-- 广告模块(开始) -->
		<mm_warp id="ad">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view>
							<!-- 顶部广告 -->
							<view v-if="$check_action('/ad/list','get')" style="margin-bottom: 1rem;">
								<list_ad :list="list_ad" location="顶部广告"></list_ad>
							</view>
							<!-- /顶部广告 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 广告模块(结束) -->

		<!-- 文章模块(开始) -->
		<mm_warp id="article">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view style="padding: 0.5rem;padding-bottom: 0.125rem;">
							<!-- 推荐文章 -->
							<bar_title v-if="$check_action('/article/list','get')" title="新闻推荐"
								url="/pages/article/list"></bar_title>
							<!-- /推荐文章 -->
						</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>
							<!-- 推荐文章 -->
							<list_article v-if="$check_action('/article/list','get')" :list="list_article">
							</list_article>
							<!-- /推荐文章 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 文章模块(结束) -->

		<!-- 广告模块(开始) -->
		<mm_warp id="ad_center">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view>
							<!-- 中部广告 -->
							<view v-if="$check_action('/ad/list','get')" style="margin-bottom: 1rem;">
								<list_ad :list="list_ad" location="中部广告"></list_ad>
							</view>
							<!-- /中部广告 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 广告模块(结束) -->

		<!-- 商品模块(开始) -->
		<mm_warp id="goods">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view style="padding: 0.5rem;padding-bottom: 0.125rem;">
							<!-- 推荐商品 -->
							<bar_title v-if="$check_action('/goods/list','get')" title="商品推荐" url="/pages/goods/list">
							</bar_title>
							<!-- /推荐商品 -->
						</mm_view>
					</mm_col>
					<mm_col>
						<mm_view>
							<!-- 推荐商品 -->
							<list_goods v-if="$check_action('/goods/list','get')" :list="list_goods"></list_goods>
							<!-- /推荐商品 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 商品模块(结束) -->

		<!-- 广告模块(开始) -->
		<mm_warp id="">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view>
							<!-- 底部广告 -->
							<view v-if="$check_action('/ad/list','get')" style="margin-top: 1rem;">
								<list_ad :list="list_ad" location="底部广告"></list_ad>
							</view>
							<!-- /底部广告 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 广告模块(结束) -->

		<!-- 链接模块(开始) -->
		<mm_warp id="">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view>
							<!-- 友情链接 -->
							<list_link v-if="$check_action('/link/list','get')" :list="list_link"></list_link>
							<!-- /友情链接 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 链接模块(结束) -->

		<!-- 版权模块(开始) -->
		<mm_warp id="">
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view>
							<!-- 版权信息 -->
							<view class="copyright"><text>@版权归属 XX 所有</text></view>
							<!-- /版权信息 -->
						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<!-- 版权模块(结束) -->
	</mm_page>
</template>

<script>
	import bar_title from "@/components/diy/bar_title.vue";
	import list_menu from "@/components/diy/list_menu.vue";
	import list_ad from "@/components/diy/list_ad.vue";
	import list_goods from "@/components/diy/list_goods.vue";
	import list_article from "@/components/diy/list_article.vue";
	import list_link from "@/components/diy/list_link.vue";
	import swiper_notice from "@/components/diy/swiper_notice.vue";
	import swiper_img from "@/components/diy/swiper_img.vue";

	import mixin from "@/mixins/page.js";
	export default {
		mixins: [mixin],
		components: {
			bar_title,
			list_ad,
			list_menu,
			list_goods,
			list_article,
			list_link,
			swiper_img,
			swiper_notice
		},
		data() {
			return {
				str: "<div>测试一下</div>",
				list_ad: [],
				list_goods: [],
				list_slide: [],
				list_article: [],
				list_menu: [],
				list_link: [],
				list_notice: []
			}
		},
		methods: {
			/**
			 * 获取轮播图
			 */
			get_slides() {
				this.$get("~/api/sys/banner?", {}, (json) => {
					if (json.result && json.result.list) {
						console.log("轮播图", json.result.list);
						this.list_slide = json.result.list;
					}
				})
			},
			/**
			 * 获取导航栏
			 */
			get_menu() {
				this.$get("~/api/sys/nav?", {
					"page": 1,
					"size": "0"
				}, (json) => {
					if (json.result && json.result.list) {
						console.log("导航栏", json.result.list);
						this.list_menu = json.result.list;
					}
				})
			},
			/**
			 * 获取文章
			 */
			get_article() {
				this.$get("~/api/cms/article?", {
					"page": 1,
					"size": 5
				}, (json) => {
					if (json.result && json.result.list) {
						console.log("文章", json.result.list);
						this.list_article = json.result.list;
					}
				})
			},
			/**
			 * 获取广告
			 */
			get_ad() {
				this.$get("~/api/sys/ad?", {
					"page": 1,
					"size": 5
				}, (json) => {
					if (json.result && json.result.list) {
						console.log("广告", json.result.list);
						this.list_ad = json.result.list;
					}
				})
			},
			/**
			 * 获取商品
			 */
			get_goods() {
				this.$get("~/api/mall/goods?", {
					"page": 1,
					"size": 4
				}, (json) => {
					if (json.result && json.result.list) {
						console.log("商品", json.result.list);
						this.list_goods = json.result.list;
					}
				})
			},
			/**
			 * 获取链接列表
			 */
			get_link() {
				this.$get("~/api/sys/link?", {
					"page": 1,
					"size": 3
				}, (json) => {
					if (json.result && json.result.list) {
						console.log("链接", json.result.list);
						this.list_link = json.result.list;
					}
				})
			},
			/**
			 * 获取公告列表
			 */
			get_notice() {
				this.$get("~/api/sys/notice?", {
					"page": 1,
					"size": 3
				}, (json) => {
					if (json.result && json.result.list) {
						console.log("公告", json.result.list);
						this.list_notice = json.result.list;
					}
				})
			}
		},
		onLoad() {
			this.get_menu()
			this.get_slides()
			this.get_article()
			this.get_goods()
			this.get_link()
			this.get_notice()
		},
		onPageScroll(e){
			console.log(e.scrollTop);
			console.log(document.getElementById("notice").offsetTop)
		}
	}
</script>

<style>
	@media (min-width:768px) {
		#page_index .view_menu {
			margin: 0 auto;
			width: 75%;
		}
	}

	#page_index .container {}

	#page_index .view_menu {
		margin-bottom: 1rem;
	}

	#page_index .mm_container {
		background-color: #FFFFFF;
	}

	#page_index .copyright {
		text-align: center;
		padding: 1rem 0;
		color: #999;
		font-size: 0.875rem;
	}
</style>
