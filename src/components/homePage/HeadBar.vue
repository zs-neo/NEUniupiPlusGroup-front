<template>
	<div class="headBar">
		<div class="head-left">
			<div class="collapse-btn" @click="collapseChage">
				<i class="el-icon-menu"></i>
			</div>
			<div class="logo">
				秘制厨房后台管理系统
			</div>
		</div>
	</div>
</template>

<script>
	import bus from '@/Bus.js';
	export default{
		name: 'HeadBar',
		data(){
			return{
				collapse: false,
			};
		},
		methods:{
			collapseChage(){
			    this.collapse = !this.collapse;
			    bus.$emit('collapse', this.collapse);
			},
		}
	}
</script>

<style>
	.headBar{
		width: 100%;
		height: 100%;
		font-size: 22px;
		color: #fff;
	}
	.head-left{
		margin-left: 20px;
		display: flex;
		width: 300px;
		height: 100%;
	}
	.head-left .collapse-btn{
	    flex: 1;
		line-height: 100px;
	}
	.head-left .logo{
		flex: 5;
		width:250px;
		line-height: 100px;
	}
</style>
