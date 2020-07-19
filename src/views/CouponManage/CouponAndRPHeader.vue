<template>
<div>
	<el-menu  class="el-menu-demo" mode="horizontal">
	  <el-menu-item > <el-button type="primary"  plain @click="toCouponDetail">优惠卷领取详情</el-button></el-menu-item>
	  <el-menu-item> <el-button  type="success" plain @click="toRedpDetail">红包领取详情</el-button></el-menu-item>
	   <el-menu-item> <el-button  type="warning" plain  @click="toScoresDetail">会员积分明细</el-button></el-menu-item>
	</el-menu>
	<router-view></router-view>
	</div>
</template>

<script>
	  export default {
		  name:"CouponAndRPHeader",
	     data() {
	       return {
	         activeIndex: '/CouponAndRPHeader/CouponDetail',
	         activeIndex2: '/CouponAndRPHeader/RedPacketDetail'
	       };
	     },
	     methods: {
			 toCouponDetail(){
				 this.$router.push("/CouponAndRPHeader/CouponDetail");
			 },
			toRedpDetail(){
				 this.$router.push("/CouponAndRPHeader/RedPacketDetail");
			},
			toScoresDetail(){
				 this.$router.push("/CouponAndRPHeader/ScoreDetail");
			},
	     },
	   }
</script>

<style>
</style>
