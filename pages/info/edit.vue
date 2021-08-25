<template>
	<mm_page class="page_info info_edit" id="info_edit">
		<mm_main>
			<!-- 资讯编辑表单(开始) -->
			<mm_warp id="menu">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<view class="card">
								<mm_form>
									<view class="control">
										<view class="title">类型</view>
										<view class="value">
											<picker :range="list_info_type" range-key="name" :value="0"
												@change="type_change">
												<text class="selected">{{ list_info_type[index].name }}</text>
												<image class="icon_down" mode="widthFix" src="/static/img/down.png">
												</image>
											</picker>
										</view>
									</view>
									<view class="control">
										<view class="title">标题</view>
										<view class="value">
											<input v-model="form.title"
												:placeholder="'输入' + list_info_type[index].name + '标题'">
										</view>
									</view>
									<view class="control">
										<view class="title">{{ list_info_type[index].num_name }}</view>
										<view class="value">
											<input class="input_num" type="number" v-model.number="form.num_start">
											<text class="span">—</text>
											<input class="input_num" type="number" v-model.number="form.num_end">
											<text class="unit">{{ list_info_type[index].unit }}</text>
										</view>
									</view>
									<view class="control bn">
										<view class="title">说明</view>
										<view class="value">
											<textarea class="content"
												:placeholder="'请详细说明' + list_info_type[index].name + '内容'">
											</textarea>
										</view>
									</view>
								</mm_form>
							</view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 资讯编辑表单(结束) -->
			<!-- 按钮列表(开始) -->
			<mm_warp id="buttons">
				<mm_container>
					<mm_row>
						<mm_col class="col-12">
							<mm_view class="buttons">
								<view class="btn btn_user" @click="submit()"><text>立 即 发 布</text></view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 按钮列表(结束) -->
			
				<!-- {{ obj.name }} -->
		</mm_main>
	</mm_page>
</template>

<script>
	import mixin_page from "@/mixins/page.js";
	export default {
		mixins: [
			mixin_page
		],
		data() {
			return {
				// 获取单条数据链接
				url_get_obj: "~/api/city/user_card?method=get_obj&",
				// 添加数据
				url_add: "~/api/city/info?method=add&",
				// 查询条件
				query: {
					user_id: 0
				},
				// 表的主字段
				field: "user_id",
				// 操作表单
				form: {
					// 联系电话
					"phone": "",
					// 标题
					"title": "",
					// 内容
					"content": "",
					// 用户ID
					"user_id": 0,
					// 联系人
					"name": "",
					// 分类ID
					"type_id": 0,
					// 关键词
					"keywords": "",
					// 薪资最小
					"num_start": 0,
					// 薪资最大
					"num_end": 0
				},
				// 分类
				list_info_type: [],
				// 当前选中项
				index: 0
			}
		},
		methods: {
			type_change(e) {
				var index = e.detail.value;
				this.index = index;
				this.form.type_id = this.list_info_type[index].type_id;
			},
			// submit_before(param) {
			// 	uni.push(param, this.user);
			// 	return param;
			// }
		},
		/**
		 * 加载页面时
		 */
		onLoad() {
			this.$getList("list_info_type", "~/api/city/info_type?size=0&");
		},
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
	#info_edit .input_num {
		text-align: center;
		border: 1px solid #DBDBDB;
		width: 4rem;
		display: inline-block;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}
</style>
