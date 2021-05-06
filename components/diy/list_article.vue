<template>
	<view class="list_article" style="background-color: #fff;">
		<!-- 表格 -->
		<view class="list_article_table">
			<view class="change_table" @click="show_table()">
				{{ title }}
			</view>
			<view class="article_table_block" v-show="is_opened">
				<uni-table stripe border emptyText="暂无更多数据">
					<uni-tr>
						<uni-th align="center">图片</uni-th>
						<uni-th align="center">标题</uni-th>
						<uni-th align="center">点击数</uni-th>
						<uni-th align="center">点赞数</uni-th>
						<uni-th align="center">更新时间</uni-th>
					</uni-tr>
					<uni-tr v-for="(o, i) in list" :key="i">
						<uni-td class="image" align="center">
							<image style="width:4rem;height: 4rem;"
								:src="$fullUrl(o[vm.img]) || '../../static/img/default.png'" mode="scaleToFill">
							</image>
						</uni-td>
						<uni-td class="title" align="center">
							{{ o[vm.title] }}
						</uni-td>
						<uni-td class="hits" align="center">
							{{ o[vm.hits] }}
						</uni-td>
						<uni-td class="praise" align="center">{{ o[vm.praise_len] }}</uni-td>
						<uni-td class="create_time" align="center">{{ o[vm.create_time] }}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
		<!-- /表格 -->
		<view class="article_block" v-show="!is_opened">
			<navigator class="item_article" v-for="(o, i) in list" :key="i"
				:url="'/pages/article/details?' + vm.article_id + '=' + o[vm.article_id]">
				<view class="left">
					<image style="width:4rem;height: 4rem;" :src="$fullUrl(o[vm.img]) || '../../static/img/default.png'"
						mode="scaleToFill">
					</image>
				</view>
				<view class="right_block">
					<view class="top">
						{{ o[vm.title] }}
					</view>
					<view class="time">{{ o[vm.create_time] }}</view>
					<view class="bottom">
						<text class="praise">{{ o[vm.praise_len] }}点赞</text>
						<text class="see">
							{{ o[vm.hits] }}点击
						</text>
					</view>
				</view>
			</navigator>
		</view>


	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			vm: {
				type: Object,
				default: function() {
					return {
						img: "img",
						article_id: "article_id",
						title: "title",
						description: "description",
						title: "title",
						create_time: "create_time",
						content: "content",
						praise_len: "praise_len",
						hits: "hits"
					}
				}
			}
		},
		data() {
			return {
				is_opened: false,
				title: '切换成表格'
			}
		},
		methods: {
			error(o) {
				console.log(123, this.src);
			},
			show_table() {
				this.is_opened = !this.is_opened
				if (this.is_opened === true) {
					this.title = '切换成列表'
				} else {
					this.title = '切换成表格'
				}
			}
		}
	}
</script>

<style scoped>
	.list_article {
		margin-bottom: 1rem;
	}

	.list_article .list_article_table {
		width: 100%;
		padding: 5px 0;
	}

	.list_article .list_article_table .change_table {
		font-weight: bold;
		padding: 5px;
		width: 100px;
		font-size: 0.8rem;
		margin-left: 7px;
	}

	.list_article .list_article_table .article_table_block .uni-table-td {
		padding: 8px;
	}

	.list_article .list_article_table .article_table_block .image {
		width: 10%;
	}

	.list_article .list_article_table .article_table_block .image>image {
		border-radius: 0.5rem;
	}

	.list_article .list_article_table .article_table_block .title {
		overflow: hidden;
		width: 30%;
		font-size: 0.5rem;
	}

	.list_article .list_article_table .article_table_block .hits {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_article .list_article_table .article_table_block .praise {
		width: 12%;
		font-size: 0.5rem;
	}

	.list_article .list_article_table .article_table_block .create_time {
		width: 26%;
		font-size: 0.5rem;
	}

	.list_article .article_block {
		padding: 0 1rem;
	}

	.list_article .item_article {
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		padding: 0.5rem 0;
	}

	.list_article .item_article+.item_article {
		border-top: 1px solid #dbdbdb;
	}

	.list_article .item_article .left>image {
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		border-radius: 0.5rem;
	}

	.list_article .item_article .right_block {
		width: calc(100% - 5rem);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.list_article .top {
		font-size: 0.9rem;
	}


	.list_article .time {
		font-size: 0.6rem;
		color: var(--color_grey)
	}

	.list_article .bottom {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		font-size: 0.5rem;
		color: var(--color_grey)
	}

	.list_article .see {
		margin-left: 1rem;
	}
</style>
