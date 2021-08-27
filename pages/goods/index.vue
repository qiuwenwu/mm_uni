<template>
	<mm_page class="page_goods" id="goods_file">
		<mm_main>
			<!-- XXX模块(开始) -->
			<mm_warp id="id_name">
				<mm_container>
					<mm_row>
						<mm_col class="col-12 col-sm-6 col-md-4">
							<!-- 分类列表(开始) -->
							<mm_list class="row-12 row-sm-6 row-md-4 list_type">
								<mm_item v-for="(o, i) in list_type" @click.native="query.type_id = o.type_id; search()">
									{{ o.name }}
								</mm_item>
							</mm_list>
							<!-- 分类列表(结束) -->
							<br/>
							<mm_view class="yyy">
								{{ list }}
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
	import mixin_page from "@/mixins/page.js";
	export default {
		mixins: [
			mixin_page
		],
		data() {
			return {
				// 获取列表链接
				url_get_list: "~/api/wr/goods?",
				// 查询条件
				query: {
					// 产品id
					"goods_id": 0,
					// 是否启用
					"available": 0,
					// 零售寄售
					"can_consign_retail": 0,
					// 状态——最小值
					"state_min": 0,
					// 状态——最大值
					"state_max": 0,
					// 产品分类ID
					"type_id": 0,
					// 排序——最小值
					"display_min": 0,
					// 排序——最大值
					"display_max": 0,
					// 发布人
					"user_id": 0,
					// 库存——最小值
					"reserve_min": 0,
					// 库存——最大值
					"reserve_max": 0,
					// 零售价——最小值
					"price_min": 0,
					// 零售价——最大值
					"price_max": 0,
					// 批发价——最小值
					"price_wholesale_min": 0,
					// 批发价——最大值
					"price_wholesale_max": 0,
					// 创建时间——开始时间
					"time_create_min": "",
					// 创建时间——结束时间
					"time_create_max": "",
					// 更新时间——开始时间
					"time_update_min": "",
					// 更新时间——结束时间
					"time_update_max": "",
					// 结束时间——开始时间
					"time_end_min": "",
					// 结束时间——结束时间
					"time_end_max": "",
					// 是否会结束
					"will_end": 0,
					// 标题
					"title": "",
					// 关键词
					"keywords": "",
					// 描述
					"description": "",
					// 标签
					"tag": "",
					// 正文
					"content": "",
					// 关键词
					"keyword": ""
				},
				// 表的主字段
				field: "xxx_id",
				// 获取到对象
				obj: {},
				// 获取到的列表
				list: [],
				// 操作表单
				form: {},
				// 筛选关键词
				keyword: "",
				// 商品分类
				list_type:[]
			}
		},
		computed: {
			/**
			 * 新列表
			 */
			list_new() {
				var list = this.list;
				var lt = [];
				for (var i = 0; i < list.length; i++) {
					var o = list[i];
					if (o.keyword == this.keyword) {
						lt.push(o);
					}
				}
				return lt;
			}
		},
		methods: {
			/**
			 * 测试轮询请求
			 */
			get_data() {
				this.get(this.url_get_list, {}, (json) => {
					if (json.result) {
						// 请求成功
						this.list = json.result.list;
					} else {
						// 请求失败
						this.toast('获取数据失败！');
					}
				});
			},
			/**
			 * 定时轮询
			 */
			loop() {
				this.timer = setInterval(() => {
					// 需要轮询的函数
					this.get_data();
				}, 6000)
			}
		},
		/**
		 * 加载页面时
		 */
		onLoad() {
			// 初始化函数和
			this.init();

			// 发起轮询
			this.loop();
		},
		/**
		 * 页面显示时
		 */
		onShow() {
			// 添加动画
			this.$getList("list_type", "~/api/wr/goods_type?size=0");
		},
		/**
		 * 页面销毁时
		 */
		onUnload() {
			// 销毁计时器等
			if (this.timer) {
				clearInterval(this.timer)
			}
		}
	}
</script>

<style>
	#goods_file #id_name {}
</style>
