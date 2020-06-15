<template>
	<div>
		<div style="background: #F6FAFF;">
			<div id="chartLineBox" style="width: 150vh;height: 50vh;"> </div>
		</div>
		<!-- 表格---start -->
		<el-table :data="tableData" v-loading="listLoading" border stripe style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="60">
			</el-table-column>
			<el-table-column prop="name" label="活动编号" width="150" align="center" sortable>
				<template slot-scope="scope">
					<a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.name}}</a>
				</template>
			</el-table-column>
			<el-table-column prop="city" label="活动名称" align="center" width="130">
			</el-table-column>
			<el-table-column prop="type" label="活动图片" align="center" width="150">
				<template slot-scope="scope" align="center" width="150">
					<span>{{ scope.row.type |convertType}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="age" label="内容描述" align="center" width="150">
			</el-table-column>
			<el-table-column prop="age" label="发布状态" align="center" width="100">
			</el-table-column>

			<el-table-column prop="createtime" label="起始日期" width="130" sortable>
			</el-table-column>
			<el-table-column prop="updatetime" label="终止日期" width="130" sortable>
			</el-table-column>
			<el-table-column label="操作" fixed="right" min-width="230">
				<template slot-scope="scope">
					<el-button size="mini" plain type="primary" @click="handleDetail(scope.$index, scope.row)">上架</el-button>
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage"
		 :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange"
		 @current-change="handleCurrentChange">
		</el-pagination>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'StatisticsManage',
		data() {
			return {
				listLoading: false, //
				pageInfo: { //分页
					currentPage: 1,
					pageSize: 5,
					pageTotal: 80
				},
				formSearch: { //表单查询
					name: '',
					city: '',
					type: null,
					age: '',
					gender: null,
					qq: '',
					startdate: null,
					enddate: null
				},
				formEdit: { //表单编辑
					id: null,
					name: '',
					city: '',
					type: '',
					age: '',
					gender: null,
					qq: ''
				},
				formEditTitle: '编辑', //新增，编辑和查看标题
				formEditDisabled: false, //编辑弹窗是否可编辑
				dialogEdittVisible: false, //编辑弹框显示
				dialogType: '', //弹框类型：add,edit,show
				tableData: [ //表单列表
					{
						id: "1",
						createtime: "2016-05-02",
						name: "李紫婷",
						address: "上海市普陀区金沙江路 1518 弄"
					},
					{
						id: "2",
						createtime: "2016-05-04",
						name: "杨超越",
						address: "上海市普陀区金沙江路 1517 弄"
					},
					{
						id: "3",
						createtime: "2016-05-01",
						name: "赖小七",
						address: "上海市普陀区金沙江路 1519 弄"
					},
					{
						id: "4",
						createtime: "2016-05-03",
						name: "张紫宁",
						address: "上海市普陀区金沙江路 1516 弄"
					}
				],
				labelPosition: 'right', //lable对齐方式
				labelWidth: '80px', //lable宽度
				formLabelWidth: '120px',
				multipleSelection: []
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
