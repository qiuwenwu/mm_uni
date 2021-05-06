<template>
	<view class="page_index" id="index">
		<!-- 店招 -->
		<list_ad v-if="$check_action('/ad/list','get')" :list="list_ad" location="店招"></list_ad>
		<!-- /店招 -->

		<!-- 轮播图 -->
		<swiper_img :list="list_slide"></swiper_img>
		<!-- /轮播图 -->

		<!-- 菜单 -->
		<list_menu :list="list_menu"></list_menu>
		<!-- /菜单 -->

		<!-- 公告 -->
		<navigator v-if="$check_action('/notice/list','get')" url="/pages/notice/list">
			<swiper_notice :list="list_notice"></swiper_notice>
		</navigator>
		<!-- /公告 -->

		<!-- 顶部广告 -->
		<view v-if="$check_action('/ad/list','get')" style="margin-bottom: 1rem;">
			<list_ad :list="list_ad" location="顶部广告"></list_ad>
		</view>
		<!-- /顶部广告 -->

		<!-- 推荐文章 -->
		<bar_title v-if="$check_action('/article/list','get')"  title="新闻推荐" url="/pages/article/list"></bar_title>
		<list_article v-if="$check_action('/article/list','get')"  :list="list_article"></list_article>
		<!-- /推荐文章 -->

		<!-- 中部广告 -->
		
		<view v-if="$check_action('/ad/list','get')" style="margin-bottom: 1rem;">
			<list_ad :list="list_ad" location="中部广告"></list_ad>
		</view>
		<!-- /中部广告 -->

		<!-- 推荐商品 -->
		<bar_title v-if="$check_action('/goods/list','get')" title="商品推荐" url="/pages/goods/list"></bar_title>
		<list_goods v-if="$check_action('/goods/list','get')" :list="list_goods"></list_goods>
		<!-- /推荐商品 -->

		<!-- 底部广告 -->
		<view v-if="$check_action('/ad/list','get')" style="margin-top: 1rem;">
			<list_ad :list="list_ad" location="底部广告"></list_ad>
		</view>
		<!-- /底部广告 -->


		<!-- 友情链接 -->
		<list_link v-if="$check_action('/link/list','get')" :list="list_link"></list_link>
		<!-- /友情链接 -->

		<!-- 版权信息 -->
		<view class="copyright"><text>@版权归属 XXX 所有</text></view>
		<!-- /版权信息 -->
	</view>
</template>

<script>
	import bar_title from "../../components/diy/bar_title.vue";
	import list_menu from "../../components/diy/list_menu.vue";
	import list_ad from "../../components/diy/list_ad.vue";
	import list_goods from "../../components/diy/list_goods.vue";
	import list_article from "../../components/diy/list_article.vue";
	import list_link from "../../components/diy/list_link.vue";
	import swiper_notice from "../../components/diy/swiper_notice.vue";
	import swiper_img from "../../components/diy/swiper_img.vue";

	import mixin from "../../mixins/page.js";
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
				list_ad: [
				],
				str: "<div>测试一下</div>",
				list_goods: [],
				list_slide: [],
				list_article: [],
				list_menu: [],
				list_link: [],
				list_notice: []
			}
		},
		methods: {
			// 获取轮播图
			get_slides() {
				this.$get("~/api/slides/get_list?", {}, (json) => {
					if (json.result) {
						this.list_slide = json.result.list
					}
				})
			},
			// 获取导航栏
			get_menu() {
				this.$get("~/api/nav/get_list?", {"page":1,"size":"0"}, (json) => {
					if (json.result) {
						this.list_menu = json.result.list
					}
				})
			},
			// 获取文章
			get_article() {
				this.$get("~/api/article/get_list?", {"page":1,"size":5}, (json) => {
					if (json.result) {
						var list_article = json.result.list
						this.list_article = list_article
					}
				})
			},
			// 获取广告
			get_ad() {
				this.$get("~/api/ad/get_list?", {"page":1,"size":5}, (json) => {
					if (json.result) {
						var list_ad = json.result.list
						this.list_ad = list_ad
					}
				})
			},
			// 获取商品
			get_goods() {
				this.$get("~/api/goods/get_list?", {"page":1,"size":4}, (json) => {
					if (json.result) {
						var list_goods = json.result.list
						this.list_goods = list_goods
					}
				})
			},
			// 获取链接列表
			get_link(){
				this.$get("~/api/link/get_list?", {"page":1,"size":3}, (json) => {
					if (json.result) {
						var list_link = json.result.list
						this.list_link = list_link
					}
				})
			},
			// 获取公告列表
			get_notice(){
				this.$get("~/api/notice/get_list?", {"page":1,"size":3}, (json) => {
					if (json.result) {
						var list_notice = json.result.list
						this.list_notice = list_notice
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
			this.get_ad()
		}
	}
</script>

<style>
	.copyright {
		text-align: center;
		padding: 1rem 0;
		color: #999;
		font-size: 0.875rem;
	}
</style>
