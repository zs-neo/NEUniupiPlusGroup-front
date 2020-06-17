<template>
	<div id="page">
		<el-row>
			<el-col class="row" :span="6">
				<el-card class="box-card">
					<el-row :gutter="20">
						<el-col :span="6">
							<span class="desc">访问量</span>
						</el-col>
						<el-col :span="6" :offset="12">
							<el-tag size="mini">周</el-tag>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<span class="number">10,000</span>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12" :offset="6">
							<span style="font-size:10px;color:slategray;">总访问量</span>
						</el-col>
						<el-col :span="6">
							<span class="bottom-desc">
								10,000
							</span>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col class="row" :span="6">
				<el-card class="box-card">
					<el-row :gutter="20">
						<el-col :span="6">
							<span class="desc">订单数</span>
						</el-col>
						<el-col :span="6" :offset="12">
							<el-tag size="mini">周</el-tag>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<span class="number">10,000</span>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12" :offset="6">
							<span style="font-size:10px;color:slategray;">订单总数</span>
						</el-col>
						<el-col :span="6">
							<span class="bottom-desc">
								10,000
							</span>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col class="row" :span="6">
				<el-card class="box-card">
					<el-row :gutter="20">
						<el-col :span="6">
							<span class="desc">交易量</span>
						</el-col>
						<el-col :span="6" :offset="12">
							<el-tag size="mini">周</el-tag>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<span class="number">10,000</span>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12" :offset="6">
							<span style="font-size:10px;color:slategray;">交易总量</span>
						</el-col>
						<el-col :span="6">
							<span class="bottom-desc">
								10,000
							</span>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col class="row" :span="6">
				<el-card class="box-card">
					<el-row :gutter="20">
						<el-col :span="6">
							<span class="desc">活跃用户</span>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12">
							<span class="number">10,000</span>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :span="12" :offset="6">
							<span style="font-size:10px;color:slategray;">总用户数</span>
						</el-col>
						<el-col :span="6">
							<span class="bottom-desc">
								10,000
							</span>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="margin-right: 15px;margin-left: 10px;">
			<el-col :span="18">
				<el-card class="box-card">
					<div style="display: flex;">
						<el-button size="mini">日</el-button>
						<el-button size="mini">周</el-button>
						<el-button size="mini">月</el-button>
						<el-button size="mini">年</el-button>
					</div>
					<div id="chartLineBox" class="graph"></div>

					<div class="small-row">
						<div align="left">月访问量</div>
						<div align="left" class="bottom-desc">同上期增长百分比</div>
						<el-progress :text-inside="true" :stroke-width="15" :percentage="25"></el-progress>
					</div>
					<div class="small-row">
						<div align="left">月交易单数</div>
						<div align="left" class="bottom-desc">同上期增长百分比</div>
						<el-progress :text-inside="true" :stroke-width="15" :percentage="20" status="exception"></el-progress>
					</div>
					<div class="small-row">
						<div align="left">月交易量</div>
						<div align="left" class="bottom-desc">同上期增长百分比</div>
						<el-progress :text-inside="true" :stroke-width="15" :percentage="70" status="warning"></el-progress>
					</div>
					<div class="small-row">
						<div align="left">月活跃用户</div>
						<div align="left" class="bottom-desc">同上期增长百分比</div>
						<el-progress :text-inside="true" :stroke-width="15" :percentage="80" status="success"></el-progress>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6" style="padding-left:10px;">
				<el-col :span="24" style="padding: 10px;">
					<el-card class="box-card" style="padding: 10px;">
						<div class="bottom-desc">
							<el-tag size="mini">小时</el-tag>
							在线用户
						</div>
						<div>
							<i class="el-icon-user" style="font-size: 30px;color: darkgray;">
								100000
							</i>
						</div>
					</el-card>
				</el-col>
				<el-col :span="12" style="padding: 10px;">
					<el-card class="box-card" style="padding: 10px;">
						<div class="bottom-desc">待付订单</div>
						<div>
							<i class="el-icon-edit-outline" style="font-size: 30px;color: darkgray;"></i>
						</div>
						<el-button type="primary" size="mini" style="color: white;">
							100000
						</el-button>
					</el-card>
				</el-col>
				<el-col :span="12" style="padding: 10px;">
					<el-card class="box-card" style="padding: 10px;">
						<div class="bottom-desc">封禁用户</div>
						<div>
							<i class="el-icon-delete-solid
" style="font-size: 30px;color: darkgray;"></i>
						</div>
						<el-button type="warning" size="mini" style="color: white;">
							100000
						</el-button>
					</el-card>
				</el-col>
				<el-col :span="12" style="padding: 10px;">
					<el-card class="box-card" style="padding: 10px;">
						<div class="bottom-desc">异常订单</div>
						<div>
							<i class="el-icon-warning" style="font-size: 30px;color: darkgray;"></i>
						</div>
						<el-button type="danger" size="mini" style="color: white;">
							100000
						</el-button>
					</el-card>
				</el-col>
				<el-col :span="12" style="padding: 10px;">
					<el-card class="box-card" style="padding: 10px;">
						<div class="bottom-desc">安全报警</div>
						<div>
							<i class="el-icon-error" style="font-size: 30px;color: darkgray;"></i>
						</div>
						<el-button type="danger" size="mini" style="color: white;">
							100000
						</el-button>
					</el-card>
				</el-col>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'FlowManage',
		data() {
			return {

			}
		},
		mounted() {
			this.chartLine = echarts.init(document.getElementById('chartLineBox'));

			// 指定图表的配置项和数据
			var option = {
				tooltip: { //设置tip提示
					trigger: 'axis'
				},
				legend: { //设置区分（哪条线属于什么）
					data: ['订单数', '访问量', '平均访问量']
				},
				color: ['#8AE09F', '#FA6F53'], //设置区分（每条线是什么颜色，和 legend 一一对应）
				xAxis: { //设置x轴
					type: 'category',
					boundaryGap: false, //坐标轴两边不留白
					data: ['2019-1-1', '2019-2-1', '2019-3-1', '2019-4-1', '2019-5-1', '2019-6-1', '2019-7-1', ],
					name: '时间', //X轴 name
					nameTextStyle: { //坐标轴名称的文字样式
						color: '#black',
						fontSize: 10,
						padding: [0, 0, 0, 20]
					},
					axisLine: { //坐标轴轴线相关设置。
						lineStyle: {
							color: '#black',
						}
					}
				},
				yAxis: {
					name: '数量',
					nameTextStyle: {
						color: '#black',
						fontSize: 10,
						padding: [0, 0, 10, 0]
					},
					axisLine: {
						lineStyle: {
							color: '#black',
						}
					},
					type: 'value'
				},
				series: [{
						name: '访问量',
						data: [220, 232, 201, 234, 290, 230, 220],
						type: 'line', // 类型为折线图
						lineStyle: { // 线条样式 => 必须使用normal属性
							normal: {
								color: '#8AE09F',
							}
						},
					},
					{
						name: '订单数',
						data: [120, 200, 150, 80, 70, 110, 130],
						type: 'line',
						lineStyle: {
							normal: {
								color: '#FA6F53',
							}
						},
					},
					{
						name: '平均访问量',
						data: [10, 202, 10, 808, 702, 10, 30],
						type: 'line',
						lineStyle: {
							normal: {
								color: '#FA6F53',
							}
						},
					}
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			this.chartLine.setOption(option);
		},
		methods: {

		}
	}
</script>

<style>
	#page {
		/* background: rgb(240, 240, 240); */
		background: rgb(94, 183, 255, 0.1);
	}

	.row {
		padding: 10px;
	}

	.small-row {
		padding: 4px;
	}

	.desc {
		font-size: 12px;
		color: gray;
	}

	.number {
		font-size: 40px;
		color: lightslategrey;
	}

	.bottom-desc {
		font-size: 8px;
		color: slategray;
	}

	.graph {
		width: 800px;
		height: 260px;
	}
</style>
