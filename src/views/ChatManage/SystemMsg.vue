<template>
	<div class="sys-wrap">
		<div class="sys-msg">
			客服24h在线，欢迎您提出疑问
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
			}
		},
		props:['msg']
	}
</script>
<style lang='less'>
	.sys-wrap{
		/*background-color: #fff;*/
		padding: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
		.sys-msg{
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgba(0,0,0,0.05);
			border-radius: 10px;
			min-width: 40%;
			color: #999;
			font-size: 12px;
			padding: 3px;
		}

	}
</style>