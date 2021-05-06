<template>
	<view class="page_goods" id="goods_details">
		<view v-if="$check_action('/goods/details','get')">
			<!-- 商品详情 -->
			<div_goods style="background-color: #fff;margin-bottom: 0.5rem;" :obj="obj"></div_goods>

			<!-- 评论区标题 -->
			<bar_title :title="bar_title" v-if="$check_action('/comment/list','get')" :url="bar_url"></bar_title>
			<!-- 评论区列表 -->
			<list_comment style="background-color: #fff;" v-if="$check_action('/comment/list','get')"
				:list="list_comment" :obj="form_comment"></list_comment>
			<!-- 发表评论 -->
			<view class="pa" v-if="$check_action('/comment/list','add')">
				<navigator class="link"
					:url="'/pages/comment/edit?source_table=goods&source_field=goods_id&source_id=' + obj.goods_id">
					发表评论</navigator>
			</view>
			<!-- 购买栏 -->
			<view class="buy_wrap">
				<bar_buy :obj="obj"></bar_buy>
			</view>
		</view>
	</view>
</template>

<script>
	import div_goods from "../../components/diy/div_goods.vue";
	import list_comment from "../../components/diy/list_comment.vue";
	import bar_title from "../../components/diy/bar_title.vue";
	import bar_buy from "../../components/diy/bar_buy.vue";

	import mixin from "../../mixins/page.js";
	export default {
		mixins: [mixin],
		components: {
			div_goods,
			list_comment,
			bar_title,
			bar_buy
		},
		data() {
			return {
				url_get_obj: "~/api/goods/get_obj?",
				field: "goods_id",
				query: {
					goods_id: 0
				},
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				// 商品详情初始化
				obj: {},
				// 评论列表初始化
				list_comment: [],
				// 评论bar标题
				bar_title: "评论区",
				// 评论bar的链接
				bar_url: "",
				form_comment: {
					source_table: "goods",
					source_field: "goods_id",
					source_id: 0,
					reply_to_id: 0,
				},
			}
		},
		methods: {
			get_obj_after(json) {
				var obj = json.result.obj;
				this.get_comment(obj);
				this.form_comment.source_id = obj.article_id;
			},
			// 获取评论
			get_comment() {
				var options = getCurrentPages()[getCurrentPages().length - 1].options
				var query = {
					"source_table": "goods",
					"source_field": "goods_id",
					"source_id": options.goods_id,
					orderby: "create_time desc",
					reply_to_id: "0",
				}
				this.$get("~/api/comment/get_list?", query, (json) => {
					if (json.result) {
						var list_comment = json.result.list
						list_comment.map((o) => {
							o.list_reply = [];
						});
						this.add_reply(list_comment).then((list) => {
							this.list_comment = list;
						});
					}
				})
			},
			/**
			 * @param { Array } list 评论列表
			 * 添加回复到评论列表
			 */
			add_reply(list) {
				return new Promise((resolve) => {
					for (let idx = 0; idx < list.length; idx++) {
						const obj = list[idx];
						this.$get(
							"~/api/comment/get_list?", {
								source_table: "goods",
								source_field: "goods_id",
								source_id: obj.goods_id,
								orderby: "create_time desc",
								reply_to_id: obj.comment_id,
							},
							(res) => {
								if (res.result) {
									obj.list_reply = res.result.list;
								}
							}
						);
					}
					resolve(list);
				});
			},
		},
		onLoad() {
			this.get_comment()
		}
	}
</script>

<style>
	.page_goods {
		padding-bottom: 3rem;
	}

	.link {
		text-align: center;
		padding: 0.5rem 0;
		border: 1px solid #DBDBDB;
		border-radius: 0.5rem;
	}

	.buy_wrap {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
