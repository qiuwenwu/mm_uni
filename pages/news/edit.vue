<template>
	<mm_page class="page_edit" id="edit_index">
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
											<picker :range="list_type" range-key="name" :value="0"
												@change="type_change">
												<text class="selected">{{ list_type[index].name }}</text>
												<image class="icon_down" mode="widthFix" src="/static/img/down.png">
												</image>
											</picker>
										</view>
									</view>
									<view class="control">
										<view class="title">标题</view>
										<view class="value">
											<input v-model="form.title"
												:placeholder="'输入' + list_type[index].name + '标题'">
										</view>
									</view>
									<view class="control bn">
										<view class="title">内容</view>
										<view class="value">
											<textarea class="content"
												:placeholder="'请输入新闻内容'">
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
							<mm_view>
								<view class="btn_user">
									<text>立 即 发 布</text>
								</view>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<!-- 按钮列表(结束) -->
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
				list_type: [],
				// 当前选中项
				index: 0
			}
		},
		methods: {
			type_change(e) {
				var index = e.detail.value;
				this.index = index;
				this.form.type_id = this.list_type[index].type_id;
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
			this.$getList("list_type", "~/api/city/news_type?size=0&");
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
	#edit_index{
		background-color: #fff;
	}
	#edit_index .release_box {
		display: flex;
		flex-direction:  column;
		padding-left: 2rem;
		box-shadow: 0rem 0.19rem 0.38rem rgba(0, 0, 0, 0.16);
	}
	#edit_index .release_line{
		padding: .75rem 0;
		border-bottom: 1px solid #DBDBDB;
	}
	
	#edit_index .title{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	#edit_index .title input{
		margin-right: 1rem;
	}
	#edit_index .content{
		border: none;
	}
	#edit_index textarea{
		padding: 0;
	}
</style>

