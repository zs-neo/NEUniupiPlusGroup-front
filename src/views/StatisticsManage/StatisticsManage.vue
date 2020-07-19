<template>
	<div class="page">
		<el-row>
			<el-col class="row" :span="6">
				<el-card class="box-card" style="padding: 10px;">
					<div class="bottom-desc">
						<el-tag size="mini">周</el-tag>
						成交订单
					</div>
					<div>
						<i style="font-size: 30px;color: darkgray;">
							{{a}}
							<i class="el-icon-circle-check"></i>
						</i>
					</div>
				</el-card>
			</el-col>
			<el-col class="row" :span="6">
				<el-card class="box-card" style="padding: 10px;">
					<div class="bottom-desc">
						<el-tag size="mini">周</el-tag>
						活跃用户
					</div>
					<div>
						<i style="font-size: 30px;color: darkgray;">
							{{b}}
							<i class="el-icon-user-solid"></i>
						</i>
					</div>
				</el-card>
			</el-col>
			<el-col class="row" :span="6">
				<el-card class="box-card" style="padding: 10px;">
					<div class="bottom-desc">
						<el-tag size="mini">周</el-tag>
						交易总量
					</div>
					<div>
						<i style="font-size: 30px;color: darkgray;">
							{{c}}￥
						</i>
					</div>
				</el-card>
			</el-col>
			<el-col class="row" :span="6">
				<el-card class="box-card" style="padding: 10px;">
					<div class="bottom-desc">
						<el-tag size="mini">周</el-tag>
						利润
					</div>
					<div>
						<i style="font-size: 30px;color: darkgray;">
							{{d}}￥
						</i>
					</div>
				</el-card>
			</el-col>
			<el-col class="row" :span="24">
				<el-card>
					<div id="chartLineBox" class="graph"></div>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col class="row" :span="24">
				<el-card>
					<el-table :data="tableData" style="width: 100%" height="250" :default-sort = "{prop: 'sales', order: 'descending'}">
						<el-table-column prop="fid" label="id" width="180">
						</el-table-column>
						<el-table-column prop="foodName" label="食品名称" width="180">
						</el-table-column>
						<el-table-column prop="sales" label="本周销量" sortable>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'StatisticsManage',
		data() {
			return {
				a:'',
				b:'',
				c:'',
				d:'',
				temp: '',
				tableData: []
			}
		},
		mounted() {
			let data = ''
			let that = this
			this.axios.get("http://localhost:8081/statistic/money").then(r => {
				console.log(r.data.foodRanks)
				that.a = r.data.order_paidByHour
				that.b = r.data.user_activeByDay
				that.c = r.data.deal_amountByHour
				that.d = r.data.deal_earnedByHour
				for(let i in r.data.foodRanks){
					that.tableData.push(r.data.foodRanks[i])
				}
				console.log(that.tableData)
				that.chartLine = echarts.init(document.getElementById('chartLineBox'));
				var option = {
					//标题，每个图表最多仅有一个标题控件，每个标题控件可设主副标题  
					title: {
						//主标题文本，'\n'指定换行  
						text: '秘制厨房财务报表',
						//主标题文本超链接  
						link: 'http://www.tqyb.com.cn/weatherLive/climateForecast/2014-01-26/157.html',
						//副标题文本，'\n'指定换行  
						subtext: 'www.mizhicook.com',
						//副标题文本超链接  
						sublink: 'http://www.stepday.com/myblog/?Echarts',
						//水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）  
						x: 'left',
						//垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）  
						y: 'top'
					},
					//提示框，鼠标悬浮交互时的信息提示  
					tooltip: {
						//触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'  
						trigger: 'axis'
					},
					//图例，每个图表最多仅有一个图例  
					legend: {
						//显示策略，可选为：true（显示） | false（隐藏），默认值为true  
						show: true,
						//水平安放位置，默认为全图居中，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）  
						x: 'center',
						//垂直安放位置，默认为全图顶端，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）  
						y: 'top',
						//legend的data: 用于设置图例，data内的字符串数组需要与sereis数组内每一个series的name值对应  
						data: ['利润', '交易量']
					},
					//工具箱，每个图表最多仅有一个工具箱  
					toolbox: {
						//显示策略，可选为：true（显示） | false（隐藏），默认值为false  
						show: true,
						//启用功能，目前支持feature，工具箱自定义功能回调处理  
						feature: {
							//辅助线标志  
							mark: {
								show: true
							},
							//dataZoom，框选区域缩放，自动与存在的dataZoom控件同步，分别是启用，缩放后退  
							dataZoom: {
								show: true,
								title: {
									dataZoom: '区域缩放',
									dataZoomReset: '区域缩放后退'
								}
							},
							//数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能  
							dataView: {
								show: true,
								readOnly: true
							},
							//magicType，动态类型切换，支持直角系下的折线图、柱状图、堆积、平铺转换  
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							//restore，还原，复位原始图表  
							restore: {
								show: true
							},
							//saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'  
							saveAsImage: {
								show: true
							}
						}
					},
					//是否启用拖拽重计算特性，默认关闭(即值为false)  
					calculable: true,
					//直角坐标系中横轴数组，数组中每一项代表一条横轴坐标轴，仅有一条时可省略数值  
					//横轴通常为类目型，但条形图时则横轴为数值型，散点图时则横纵均为数值型  
					xAxis: [{
						//显示策略，可选为：true（显示） | false（隐藏），默认值为true  
						show: true,
						//坐标轴类型，横轴默认为类目型'category'  
						type: 'category',
						//类目型坐标轴文本标签数组，指定label内容。 数组项通常为文本，'\n'指定换行  
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
					}],
					//直角坐标系中纵轴数组，数组中每一项代表一条纵轴坐标轴，仅有一条时可省略数值  
					//纵轴通常为数值型，但条形图时则纵轴为类目型  
					yAxis: [{
						//显示策略，可选为：true（显示） | false（隐藏），默认值为true  
						show: true,
						//坐标轴类型，纵轴默认为数值型'value'  
						type: 'value',
						//分隔区域，默认不显示  
						splitArea: {
							show: true
						}
					}],

					//sereis的数据: 用于设置图表数据之用。series是一个对象嵌套的结构；对象内包含对象  
					series: [{
							//系列名称，如果启用legend，该值将被legend.data索引相关  
							name: '交易量',
							//图表类型，必要参数！如为空或不支持类型，则该系列数据不被显示。  
							type: 'bar',
							//系列中的数据内容数组，折线图以及柱状图时数组长度等于所使用类目轴文本标签数组axis.data的长度，并且他们间是一一对应的。数组项通常为数值  
							// data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
							data: r.data.dealByMonth,
							//系列中的数据标注内容  
							markPoint: {
								data: [{
										type: 'max',
										name: '最大值'
									},
									{
										type: 'min',
										name: '最小值'
									}
								]
							},
							//系列中的数据标线内容  
							markLine: {
								data: [{
									type: 'average',
									name: '平均值'
								}]
							}
						},
						// {
						// 	//系列名称，如果启用legend，该值将被legend.data索引相关  
						// 	name: '交易量',
						// 	//图表类型，必要参数！如为空或不支持类型，则该系列数据不被显示。  
						// 	type: 'bar',
						// 	//系列中的数据内容数组，折线图以及柱状图时数组长度等于所使用类目轴文本标签数组axis.data的长度，并且他们间是一一对应的。数组项通常为数值  
						// 	data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						// 	//系列中的数据标注内容  
						// 	markPoint: {
						// 		data: [{
						// 				type: 'max',
						// 				name: '最大值'
						// 			},
						// 			{
						// 				type: 'min',
						// 				name: '最小值'
						// 			}
						// 		]
						// 	},
						// 	//系列中的数据标线内容  
						// 	markLine: {
						// 		data: [{
						// 			type: 'average',
						// 			name: '平均值'
						// 		}]
						// 	}
						// }
					]
				};
				// 使用刚指定的配置项和数据显示图表。
				this.chartLine.setOption(option);
			})
		},
		methods: {

		}
	}
</script>

<style>
	.page {
		/* background: #5390A3; */
		/* background: rgb(94, 183, 255, 0.1); */
		background: rgb(50, 65, 87, 0.1);
		overflow-Y: scroll;
		max-height: 500px;
	}

	.row {
		padding: 10px;
	}

	.graph {
		/* width: 800px; */
	}
</style>
