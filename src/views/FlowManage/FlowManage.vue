<template>
	<div>
		<el-tabs type="border-card" style="width: 100%;height: 100%;">
			<el-tab-pane label="实时交易流水">
				<div id="chartLineBox" style="width: 150vh;height: 70vh;"> </div>
			</el-tab-pane>
			<el-tab-pane label="成交订单流水">
			</el-tab-pane>
			<el-tab-pane label="交易量流水">
			</el-tab-pane>
			<el-tab-pane label="实时QPS">
			</el-tab-pane>
			<el-tab-pane label="入流量">
			</el-tab-pane>
			<el-tab-pane label="出流量">
			</el-tab-pane>
		</el-tabs>
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
					data: ['订单数', '交易单数']
				},
				color: ['#8AE09F', '#FA6F53'], //设置区分（每条线是什么颜色，和 legend 一一对应）
				xAxis: { //设置x轴
					type: 'category',
					boundaryGap: false, //坐标轴两边不留白
					data: ['2019-1-1', '2019-2-1', '2019-3-1', '2019-4-1', '2019-5-1', '2019-6-1', '2019-7-1', ],
					name: '时间', //X轴 name
					nameTextStyle: { //坐标轴名称的文字样式
						color: '#black',
						fontSize: 16,
						padding: [0, 0, 0, 20]
					},
					axisLine: { //坐标轴轴线相关设置。
						lineStyle: {
							color: '#black',
						}
					}
				},
				yAxis: {
					name: '订单数',
					nameTextStyle: {
						color: '#black',
						fontSize: 16,
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
						name: '交易单数',
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
	html {
		height: 100%;
		width: 100%;
	}

	body {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
	}
</style>
