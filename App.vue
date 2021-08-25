<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style src="./static/css/mm_base.css"></style>
<style src="./static/css/mm_common.css"></style>
<style src="./static/css/mm_layout.css"></style>
<style src="./static/css/mm_component.css"></style>
<style src="./static/css/mm_theme.css"></style>

<style>
	/*每个页面公共css */
	.search {
		position: relative;
		background: #F9F9F9;
		padding: 1rem 0;
	}
	
	.search .icon {
		width: 1rem;
		height: 1rem;
		position: absolute;
		top: 50%;
		left: 2rem;
		transform: translate(0, -50%);
	}
	
	.search .input {
		background: #fff;
		border: 1px solid #DBDBDB;
		text-align: center;
		width: calc(100% - 2rem);
		margin: auto;
		border-radius: 1.5rem;
		height: 2rem;
		line-height: 1.6;
		font-size: 0.875rem;
	}
	
	
	.card {
		margin-bottom: 1rem;
		border-radius: 0;
	}
	
	.card_head {
		padding: 0.5rem 0;
		position: relative;
		overflow: hidden;
	}
	
	.card_head:after {
		content: "";
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: calc(100% - 1rem);
		margin-left: 1rem;
		border-bottom: 1px solid #E4C5B0;
	}
	
	.card .card_head .title {
		float: left;
		padding-left: 1rem;
	}
	
	.card .card_head .time {
		float: right;
		padding-right: 1rem;
		font-size: 0.75rem;
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
		color: #666;
	}
	
	.card_body .media {
		width: 4.5rem;
		height: 4.5rem;
		float: left;
	}
	
	.card_body .avatar {
		width: 100%;
		height: 100%;
		margin-right: 0.5rem;
	}
	
	.card_body {
		padding: 0.75rem 1rem;
	}
	
	.card_item::after{
		content: "";
		position: absolute;
		right: 1rem;
		top: 50%;
		-webkit-transform: translateY(-50%) rotate(-45deg);
		transform: translateY(-50%) rotate(-45deg);
		content: "";
		padding: 4px;
		display: block;
		border: 1px solid #DBDBDB;
		border-width: 0 2px 2px 0;
		-webkit-transition: all 0.2s;
		transition: all 0.2s;
	}
	
	.bar_type .item_type {
		display: inline-block;
		width: 20vw;
		text-align: center;
		position: relative;
	}
	
	.bar_type .item_type::after {
		position: absolute;
		content: "";
		display: block;
		width: 0;
		left: 50%;
		bottom: -4px;
		transform: translateX(-50%);
		transition: width 0.3s ease-in-out;
	}
	
	.bar_type {
		width: 100%;
		padding: .25rem 0;
		overflow-x: auto;
		white-space:nowrap;
	}
	
	.bar_type .active {
		color: #816A61;
	}
	
	.bar_type .active::after {
		border-bottom: 2px solid #816A61;
		width: 2.25rem;
		margin: auto;
	}
	
	.float_btn {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translate(-50%, 0);
		text-align: center;
	}
	
	.btn_user{
		color:#FFF2E9;
		font-size: .875rem;
		margin: 1rem auto;
		margin-bottom: 0;
		width: fit-content;
		padding: .25rem 6rem;
		border-radius: .25rem;
		background: linear-gradient(180deg, #440202 0%, #270101 100%);
	}
	
	.btn_publish {
		display: inline-block;
		background-color: #E4C5B0;
		border-radius: 1.5rem;
		padding: 0.325rem 2rem;
		font-size: 0.75rem;
		box-shadow: 0 0.25rem 0.5rem 0 rgba(7, 17, 27, 0.1);
	}
	
	.btn_publish:hover {
		background-color: #ffddc5;
	}
	
	.btn_publish:active {
		background-color: #d3b6a3;
	}
	
	.float_btn .btn::after {
		content: "";
		display: inline-block;
		background: url('/static/img/right.png') center center no-repeat;
		background-size: 100% 100%;
		width: 0.75rem;
		height: 0.75rem;
		position: relative;
		top: 0.125rem;
		left: .25rem;
	}
	
	.control {
		overflow: hidden;
		clear: both;
		padding: 0.5rem 1rem 0.5rem 0;
		margin-left: 1rem;
		border-bottom: 1px solid #DBDBDB;
	}
	
	.mm_form .title {
		float: left;
	}
	
	.mm_form .value {
		overflow-x: hidden;
		overflow-y: visible;
		text-align: right;
		margin-left: 4.5rem;
		padding: 0.05rem 0;
	}
	
	.mm_form textarea {
		border: none;
		min-height: 6rem;
		text-align: left;
	}
	
	.mm_form picker {
		margin-top: 0.25rem;
	}
	.mm_form input {
		position: relative;
		top: .275rem;
		height: 1.5rem;
	}
	
	.mm_form .icon_down {
		color: #805441;
	}
	
	.mm_form .icon_down {
		width: 0.75rem;
		margin-left: .5rem;
	}
	
	.selected {
		color: #805441;
	}
	
	.input_num {
		text-align: center;
		border: 1px solid #DBDBDB;
		width: 4rem;
		display: inline-block;
		border-radius: 0.25rem;
		font-size: 0.875rem;
	}
	
	.mm_form .span {
		margin: 0 0.5rem;
		position: relative;
		top: -0.25rem;
	}
	
	.mm_form .unit {
		position: relative;
		top: -0.25rem;
		margin-left: 0.5rem;
		font-size: 0.75rem;
		color: #666;
	}
	
	.buttons {
		text-align: center;
	}
	
	/* #ifdef H5 */
	.float_btn {
		bottom: 4rem;
	}
	/* #endif */
	
	/* #ifndef H5 */
	textarea {
		padding-top: 0.325rem;
		padding-bottom: 0.325rem;
	}
	/* #endif */
</style>