<template>
	<div style="display: flex;">
		<div class="left">
			<el-card class="box-card" style="margin: 10px;">
				<div slot="header" class="clearfix">
					<span>商户信息</span>
					<el-button style="float: right;" type="warning" size="mini" @click="onSubmit">
						修改信息
					</el-button>
				</div>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="商家店名">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="营业时间">
						<el-col :span="11">
							<el-time-picker placeholder="选择时间" v-model="form.beginTime" style="width: 100%;"></el-time-picker>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-time-picker placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-time-picker>
						</el-col>
					</el-form-item>
					<el-form-item label="营业资质">
						<el-input v-model="form.right"></el-input>
					</el-form-item>
					<el-form-item label="商家地址">
						<el-input v-model="form.address"></el-input>
					</el-form-item>
					<el-form-item label="商家电话">
						<el-input v-model="form.phone"></el-input>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
		<div class="left">
			<el-card class="box-card" style="margin: 10px;">
				<div slot="header" class="clearfix">
					<span>当前信息</span>
				</div>
				<el-form ref="form" label-width="80px">
					<el-form-item label="商家店名">
						<el-input v-model="oldForm.name" disabled=""></el-input>
						<!-- <div>{{oldForm.name}}</div> -->
					</el-form-item>
					<el-form-item label="营业时间">
						<el-col :span="11">
							<el-time-picker placeholder="选择时间" v-model="oldForm.beginTime" style="width: 100%;" disabled=""></el-time-picker>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-time-picker placeholder="选择时间" v-model="oldForm.endTime" style="width: 100%;" disabled=""></el-time-picker>
						</el-col>
						<!-- <div>{{oldForm.beginTime}}-{{oldForm.endTime}}</div> -->
					</el-form-item>
					<el-form-item label="营业资质">
						<el-input v-model="oldForm.right" disabled=""></el-input>
					</el-form-item>
					<el-form-item label="商家地址">
						<el-input v-model="oldForm.address" disabled=""></el-input>
					</el-form-item>
					<el-form-item label="商家电话">
						<el-input v-model="oldForm.phone" disabled=""></el-input>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				form: {
					name: '',
					beginTime: '',
					endTime: '',
					right: '',
					address: '',
					phone: ''
				},
				oldForm: {
					name: '',
					beginTime: '',
					endTime: '',
					right: '',
					address: '',
					phone: ''
				}
			}
		},
		mounted() {
			var that = this
			Vue.axios.get(`http://localhost:8082/shop/get`).then(rs => {
				console.log(rs)
				that.form = rs.data
				that.oldForm.name = rs.data.name
				that.oldForm.phone = rs.data.phone
				that.oldForm.address = rs.data.address
				that.oldForm.right = rs.data.right
				that.oldForm.beginTime = rs.data.beginTime
				that.oldForm.endTime = rs.data.endTime
			});
		},
		methods: {
			onSubmit() {
				console.log(this.oldForm)
				console.log(this.form)
				var that = this
				Vue.axios.get(`http://localhost:8082/shop/update`, {
					params: {
						'shopName': this.oldForm.name,
						'name': this.form.name,
						'beginTime': this.form.beginTime,
						'endTime': this.form.endTime,
						'right': this.form.right,
						'address': this.form.address,
						'phone': this.form.phone
					}
				}).then(rs => {
					console.log(rs)
					if (rs.data == 1) {
						alert("更新成功")
						Vue.axios.get(`http://localhost:8082/shop/get`).then(res => {
							console.log(res)
							that.form = res.data
							that.oldForm.name = res.data.name
							that.oldForm.phone = res.data.phone
							that.oldForm.address = res.data.address
							that.oldForm.right = res.data.right
							that.oldForm.beginTime = res.data.beginTime
							that.oldForm.endTime = res.data.endTime
						});
					} else {
						alert("更新失败")
					}
				});
				console.log('submit!');
			}
		}
	}
</script>
<style>
	.left {
		text-align: left;
		width: 50%;
	}

	.right {
		text-align: right;
		width: 40%;
	}
</style>
