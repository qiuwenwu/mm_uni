<template>
	<view class="list_address">
		<view class="item_address" v-for="(o,i) in list" :key="i">
			<view class="address_info">
				<view class="top_info">
					<view>{{o[vm.name]}}</view>
					<view>{{o[vm.phone]}} <text class="default_sign" :class="{isDefault:isDefault(o[vm.default])}">默认</text></view>
				</view>
				<view class="body_info">
					<view class="address">{{o[vm.address]}}</view>
					<view class="btn_more" @click="more_show(o)">
						<uni-icons type="more-filled"></uni-icons>
					</view>
				</view>
			</view>
			<view class="bar_btn" :class="{active:o[vm.display_btn]}">
				<view class="default_btn" @click="choose_default(o[vm.address_id],o[vm.user_id],i)" v-if="$check_action('/address/list','set')">
					设为默认
				</view>
				<view class="right_btn">
					<text class="btn_del" @click="del_address(o[vm.address_id],i)" v-if="$check_action('/address/list','del')">删除</text>
					<text @click="$nav('./address_edit?address_id='+o[vm.address_id])" v-if="$check_action('/address/list','set')" class="btn_set">编辑</text>
				</view>
			</view>
		</view>
		<view class="add_address" @click="$nav('./address_edit')" v-if="$check_action('/address/list','add')" >+ 新建收货地址</view>
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
						name: "name",
						phone: "phone",
						address: "address",
						user_id: "user_id",
						address_id: "address_id",
						default: "default",
						display_btn: "display_btn"
					}
				}
			}
		},
		data() {
			return {}
		},
		methods: {
			// 选择默认地址
			async choose_default(address_id, user_id, i) {
				await new Promise((resolve, reject) => {
					this.$post(`~/api/user/address?method=set&user_id=${user_id}`, {
						default: 0
					}, (res) => {
						console.log(res);
						this.list.map(o => o.default = 0)
						resolve()
					})
				})
				this.$post(`~/api/user/address?method=set&user_id=${user_id}&address_id=${address_id}`, {
					default: 1
				}, (res) => {
					console.log("修改成功");
					this.list[i].default = 1
				})
			},
			// 删除
			del_address(address_id, index) {
				this.$get("~/api/address?method=del&", {
					address_id
				}, (res) => {
					this.list.splice(index, 1);
				})
			},
			// 判断是否默认
			isDefault(i) {
				return i == 1
			},
			// 更多展示
			more_show(o){
				o.display_btn=!o.display_btn
			}
		}
	}
</script>

<style>
	.ellipsis_2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.list_address {
		font-size: 0.8rem;
		margin-bottom: 7rem;
	}

	.item_address {
		background-color: #fff;
		border-radius: 1rem;
	}

	.address_info {
		position: relative;
		padding: 0.8rem 0;
	}

	.body_info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.body_info>.address {
		flex: 0 0 85%;
	}

	.body_info>.btn_more {
		flex: 0 0 10%;
	}

	.top_info {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 67%;
		margin-bottom: 0.5rem;
		font-size: 1rem;
		font-weight: 600;
	}

	.default_sign {
		display: none;
		position: absolute;
		top: -2px;
		right: 0;
		transform: translate(105%);
		width: 2.1rem;
		text-align: center;
		font-size: 0.8rem;
		font-weight: normal;
		border: 1px solid #F9DBE6;
		padding: 0.1rem 0.3rem;
		border-radius: 0.5rem;
		margin-left: 0.5rem;
		background-color: #FFF3F7;
	}

	.isDefault {
		display: inline-block;
	}

	.bar_btn {
		display: flex;
		height: 0rem;
		justify-content: space-between;
		align-items: center;
		color: var(--color_grey);
		transition: all 0.28s ease-out;
		overflow: hidden;
	}

	.bar_btn.active {
		height: 2.2rem;
		border-top: 1px solid #eee;
	}

	.default_btn {
		display: flex;
		align-items: center;
		font-size: 0.5rem;
		font-weight: normal;
		border: 1px solid var(--color_grey);
		padding: 0.2rem 0.5rem;
		border-radius: 3px;
	}

	.btn_del,
	.btn_set {
		font-size: 0.5rem;
		font-weight: normal;
		border: 1px solid var(--color_grey);
		padding: 0.3rem 1rem;
		border-radius: 1rem;
		margin-left: 0.5rem;
	}

	.btn_del {
		margin-right: 0.3rem;
	}

	.add_address {
		color: #fff;
		font-size: 0.9rem;
		background-color: #FA4E28;
		height: 2.2rem;
		line-height: 2.2rem;
		border-radius: 1rem;
		margin: 0 auto;
		text-align: center;
	}
</style>
