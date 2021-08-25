<template>
	<mm_page class="page_card" id="card_details">
		<mm_main>
			<!-- 用户信息(开始) -->
			<mm_warp id="user_info">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<!-- 名片(开始) -->
							<view class="user_info card">
								<view class="card_body">
									<view class="media">
										<image class="avatar"
											:src="obj.avatar ? $fullImgUrl(obj.avatar) : '/static/img/avatar.png'">
										</image>
									</view>
									<view class="doc">
										<view class="title">
											<image mode="widthFix" class="vip" src="/static/img/vip_2.png" />
											<text>{{ obj.name }}</text>
										</view>
										<view class="desc">
											<text class="label">职务:</text><text>{{ obj.job }}</text>
										</view>
									</view>
								</view>
							</view>
							<!-- 名片(结束) -->
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 用户信息(结束) -->

			<!-- 二维码(开始) -->
			<mm_warp id="qrcode">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<view class="qrcode card">
								<view class="card_head">
									<view class="title">
										<text>名片二维码</text>
									</view>
								</view>
								<view class="card_body">
									<expand_qrcode v-if="qrcode" :value="qrcode" :size="400"></expand_qrcode>
								</view>
								<view class="card_foot">
								</view>
							</view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 二维码(结束) -->

			<!-- XXX模块(开始) -->
			<mm_warp id="buttons" v-if="query.card_id">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<mm_view class="buttons">
								<view class="btn_call" @click.stop="$call_phone(obj.phone)">
									<text>联系</text><text>{{ obj.sex ? '他' : '她' }}</text>
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- XXX模块(结束) -->
		</mm_main>
	</mm_page>
</template>

<script>
	import expand_qrcode from "@/components/mm_uni_ui/expand/expand_qrcode";
	import mixin_page from "@/mixins/page.js";

	export default {
		mixins: [
			mixin_page,
		],
		components: {
			expand_qrcode
		},
		data() {
			return {
				// 获取单条数据链接
				url_get_obj: "~/api/city/user_card?method=get_obj&",
				// 获取列表链接
				url_get_list: "",
				// 查询条件
				query: {
					card_id: 0,
					user_id: 0
				},
				// 表的主字段
				field: "card_id",
				// 获取到对象
				obj: {
					"card_id": 0,
					"name": "",
					"phone": "",
					"sex": 1,
					"age": 0,
					"avatar": "",
					"company": "",
					"job": "",
					"forte": "",
					"business": "",
					"email": ""
				},
				// 获取到的列表
				list: [],
				// 操作表单
				form: {},
				// 筛选关键词
				keyword: "",
				// 名片信息
				qrcode: ""
			}
		},
		methods: {
			get_obj_after(json) {
				if (json.result && json.result.obj) {
					var obj = json.result.obj;
					var {
						name,
						phone,
						company,
						job,
						forte,
						business,
						email,
						address
					} = obj;

					var str =
						`BEGIN:VCARD\r\nFN:${name}\r\nTEL;CELL,VOICE:${phone}\r\nTITLE:${job}\r\nORG:${company}\r\nEMAIL;INTERNET,HOME:${email}\r\nADR;WORK,POSTAL:${address}\r\nEND:VCARD`;
					this.qrcode = str;
					return obj;
				}
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
			// 添加动画
		},
		/**
		 * 页面销毁时
		 */
		onUnload() {}
	}
</script>

<style>
	.user_info .title {
		font-weight: 600;
		margin-top: 0.25rem;
	}

	.user_info .vip {
		width: 0.75rem;
		height: 100%;
		margin-right: 0.25rem;
	}

	.user_info .desc {
		font-size: 0.75rem;
		margin-top: 0.25rem;
		color: #666;
	}

	.user_info .doc {
		overflow: hidden;
		padding-left: 1rem;
	}

	.user_info .label {
		margin-right: 0.25rem;
	}

	.buttons {
		text-align: center;
	}

	.buttons .btn_call {
		display: inline-block;
		margin: auto;
		padding: 0.25rem 2rem;
		border: 1px solid #E4C5B0;
		background-color: #E4C5B0;
		font-size: 0.875rem;
		line-height: 2;
		border-radius: 2rem !important;
	}
</style>
