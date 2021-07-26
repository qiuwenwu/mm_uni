<template>
	<view class="page_message" id="message_list">
		
		<!-- 留言列表模块(开始) -->
		<mm_warp>
			<mm_container class="container">
				<mm_row>
					<mm_col>
						<mm_view class="yyy">
							<!-- 留言列表模块(结束) -->
							<view class="list_message">
								<view class="item_message" v-for="(o,i) in list" :key="i">
									<view class="message_box">
										<view class="user_info">
											<view>{{o.nickname}}</view>
											<view class="time">{{o.create_time}}</view>
										</view>
										<view class="content">
											<rich-text :nodes="o.content"></rich-text>
										</view>
										<navigator class="reply_btn" :url="goto_edit(o)">
											回复</navigator>
									</view>
									<!-- 回复内容 -->
									<view class="list_reply_block">
										<view class="list_reply_box" v-for="(obj, idx) in o.list_reply" :key="idx">
											<view class="reply_left">
												<text class="nickname">{{ obj.nickname }}</text>
												<text class="reply_time">{{ obj.create_time }}</text>
											</view>
											<rich-text class="content" :nodes="obj.content"></rich-text>
										</view>
									</view>
									<!-- /回复内容 -->
									<view class="line"></view>
								</view>
							</view>

						</mm_view>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
	</view>
</template>

<script>
	import mixin from "@/mixins/page.js"

	export default {
		mixins: [mixin],
		data() {
			return {
				url_get_list: "~/api/message?",
				query: {
					page: 1,
					size: 7,
					orderby: "create_time asc"
				},
				// 评论列表初始化
				list_message: [],
			}
		},
		methods: {
			goto_edit(o) {
				return '/pages/comment/edit?' + '&nickname=' + o.nickname + '&reply_id=' + o.message_id + '&email=' +
					o.email + '&phone=' + o.phone
			},
			get_list_after(json) {
				console.log(json.result.list);
				var list_message = json.result.list
				this.list_message = list_message.map((o) => {
					o.list_reply = [];
					return o
				});
				this.add_reply(this.list_message)
			},

			/**
			 * @param { Array } list 留言列表
			 * 添加回复到留言列表
			 */
			add_reply(list) {
				return new Promise((resolve) => {
					for (let idx = 0; idx < list.length; idx++) {
						const obj = list[idx];
						this.$get(
							"~/api/message?", {
								orderby: "create_time desc",
								reply_id: obj.message_id,
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

		}

	}
</script>

<style scoped>
	#message_list .list_message {
		background-color: #f8f8f8;
		min-height: 100vh;
	}

	#message_list .item_message {
		background-color: #FFFFFF;
		margin-bottom: 1rem;
	}

	#message_list .user_info {
		text-align: center;
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
	}

	#message_list .time {
		font-size: 0.7rem;
		margin-top: 0.5rem;
	}

	#message_list .content {
		width: 100%;
		padding: 0.8rem;
	}

	#message_list .content rich-text {
		width: 100%;
		word-break: break-all;
	}

	#message_list .reply_btn {
		text-align: right;
		padding: 5px 15px;
	}

	#message_list .list_reply_block {
		margin-left: 4rem;
	}

	#message_list .list_reply_block .list_reply_box {
		padding: 5px 0;

	}


	#message_list .list_reply_block .reply_left .nickname {
		color: var(--color_grey);
		font-size: 0.8rem;
	}

	#message_list .list_reply_block .reply_left .reply_time {
		float: right;
		font-size: 10px;
		transform: scale(0.8);
		color: var(--color_grey);
	}

	#message_list .list_reply_block .content {
		word-break: break-all;
	}

	#message_list .line {
		border-bottom: 1px solid var(--color_border);
	}
</style>
