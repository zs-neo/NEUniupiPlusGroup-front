<template>
    <div class="messageboard1">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="优惠卷名" prop="countname">
                <el-input v-model="formSearch.ename" placeholder="优惠卷名称"></el-input>
            </el-form-item>
            <el-form-item label="时间范围" prop="createtime">
                <el-date-picker
                     v-model="value2"
                     type="daterange"
                     align="right"
                     unlink-panels
                     range-separator="至"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期"
                     :picker-options="pickerOptions">
                   </el-date-picker>
            </el-form-item>
            <el-form-item label=" " style="margin-left:50px;">
                <el-button type="primary">查询</el-button>
                <el-button type="warning" plain >重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        <el-row style="float:left">
            <el-button size="small" round type="primary" @click="handleAdd">新增</el-button>
            <el-button size="small" round type="danger">批量删除</el-button>
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" >
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="name" label="优惠卷名称" fixed width="150" align="center" sortable>
                 <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.name}}</a>
                </template>
            </el-table-column>
           
             <el-table-column prop="age" label="内容描述" align="center" width="150">
            </el-table-column>
			<el-table-column prop="age" label="发布状态" align="center" width="100">
            </el-table-column>

            <el-table-column prop="createtime" label="起始日期"  width="130" sortable>
            </el-table-column>
             <el-table-column prop="updatetime" label="终止日期"  width="130" sortable>
            </el-table-column>
			<el-table-column prop="city" label="数量" align="center" width="120">
			</el-table-column>
			<el-table-column prop="type" label="领取人数" align="center" width="120">
			</el-table-column>
			<el-table-column prop="city" label="已使用" align="center" width="120">
			</el-table-column>
			<el-table-column prop="type" label="已使用率" align="center" width="120">
			</el-table-column>
			<el-table-column prop="type" label="限定条件" align="center" width="130">
			</el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" >启用</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    <div class="tabListPage">
         <el-pagination @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
          </el-pagination>
       </div>
        <!-- 表格---end -->

       
       <!-- 编辑弹框---start -->
       <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="closeDialog('formEdit')">
            <el-form :model="formEdit">
               <el-form-item label="优惠卷名称:" :label-width="formLabelWidth">
                 <el-input placeholder="请输入优惠卷名称" v-model="formEdit.countname"autocomplete="off"></el-input>
               </el-form-item>
			   
			   <el-form-item label="优惠卷设置:" :label-width="formLabelWidth">
			    <div>
			      <el-input placeholder="输入金额" v-model="formEdit.fullmoney" style="width: 180px;" >
			        <template slot="prepend" margin-left="10px">金额满</template>
			      </el-input>
				
				    <el-input placeholder="输入金额" v-model="formEdit.substractmoney"style="width: 180px;">
				      <template slot="prepend">元减</template>
				    </el-input>
				    <el-input placeholder="" v-model="formEdit.countnum"style="width: 180px;">
				      <template slot="prepend">数量</template>
					  <template slot="append">张</template>
				    </el-input>
			    </div>
			   </el-form-item>	   
       		<el-form-item label="创建时间:" :label-width="formLabelWidth" prop="createtime">
       		     <el-date-picker
       			      style="margin-left: -190px;"
       		          v-model="formEdit.createtime"
       		          type="daterange"
       		          align="right"
       		          unlink-panels
       		          range-separator="至"
       		          start-placeholder="开始日期"
       		          end-placeholder="结束日期"
       		          :picker-options="pickerOptions">
       		        </el-date-picker>
       		</el-form-item>
			<el-form-item label="限定条件:" :label-width="formLabelWidth">
				<el-select v-model="value" placeholder="请选择" style="margin-left: -320px;">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</el-form-item>
			 
       		<el-form-item label="优惠卷描述:" :label-width="formLabelWidth">
       		
       		  <div></div>
       		  <el-input
       		    type="textarea"
       		    placeholder="请输入内容"
       		    v-model="formEdit.desc"
       		    maxlength="100"
       		    show-word-limit
       		  >
       		  </el-input>
       		</el-form-item>	

       		
             </el-form>
       
           <div slot="footer" class="dialog-footer">
               <el-button @click="dialogEdittVisible = false">取 消</el-button>
               <el-button v-if="!formEditDisabled" type="primary" >确 定</el-button>
           </div>
       </el-dialog>
       
       <!-- 编辑弹框---end -->

    </div>
</template>

<style>
.messageboard1{

	padding: 10px;
	
}

</style>

<script>

export default {
    name: 'CountManage',
    data() {
        return {
            listLoading : false,//
            currentPage:1,
            totalCount:1,
            PageSize:6,
            formSearch: { //表单查询
                ename: '',
            },
            formEdit: { //表单编辑
              countname:'',
			  fullmoney:"",
			  substractmoney:"",
			  countnum:"",
			  createtime:"",
			  desc:"",		  
            },
			 options: [{
			          value: '选项1',
			          label: '所有用户'
			        }, {
			          value: '选项2',
			          label: 'VIP用户'
			        },
					{
					  value: '选项3',
					  label: '指定用户'
					}],
					 value: '',
			pickerOptions: {
			          shortcuts: [{
			            text: '最近一周',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			              picker.$emit('pick', [start, end]);
			            }
			          }, {
			            text: '最近一个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			              picker.$emit('pick', [start, end]);
			            }
			          }, {
			            text: '最近三个月',
			            onClick(picker) {
			              const end = new Date();
			              const start = new Date();
			              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			              picker.$emit('pick', [start, end]);
			            }
			          }]
			        },
			value1: '',
			value2: '',
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
            tableData: [  //表单列表
                {   id:"1",
                    createtime: "2016-05-02",
                    name: "李紫婷",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                     id:"2",
                    createtime: "2016-05-04",
                    name: "杨超越",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                     id:"3",
                    createtime: "2016-05-01",
                    name: "赖小七",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    id:"4",
                    createtime: "2016-05-03",
                    name: "张紫宁",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: []
        };
    },
    computed:{
        
    },
   
    methods: {
       
        /**
         * 打开编辑弹窗
         */
        handleEdit(index, rowData) {
            //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            //this.$message({message: msg,type: "success"});
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑优惠卷';
                this.formEditDisabled=false;
                this.formEdit= Object.assign({}, rowData);
                this.formEdit.gender+='';//必须转换成字符串才能回显
            });  
        },
        /**
         * 打开详情页
         */
        handleDetail(index,rowData){
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                 this.dialogType='show';
                this.formEditTitle='详情';
                this.formEditDisabled=true;
                this.formEdit= Object.assign({}, rowData) ;
                this.formEdit.gender+='';
            });
           
        },
        /**
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            this.$refs[formName].resetFields();
        },
      // 分页
       // 每页显示的条数
      handleSizeChange(val) {
        // 改变每页显示的条数 
        this.PageSize=val
        // 点击每页显示的条数时，显示第一页
        this.getData(val,1)
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.currentPage=1 
      },
       // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage=val
        // 切换页码时，要获取每页显示的条数
        this.getData(this.PageSize,(val)*(this.pageSize))
      },
        /**
         * 打开详情页
         */
        openDetail(row){
            this.$common.OpenNewPage(this,'detail',row);
        },
		//点击新增
		handleAdd() {
		    this.dialogEdittVisible = true;
		    this.$nextTick(()=>{
		        this.dialogType='add';
		        this.formEditTitle='新增优惠卷';
		        this.formEditDisabled=false;
		    });
		   
		    
		},
        
        
    }
};
</script>
