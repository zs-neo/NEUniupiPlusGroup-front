<template>
    <div class="container messageboard">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="活动名称" prop="qq">
                <el-input v-model="formSearch.qq" placeholder="qq号"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createtime">
                <el-date-picker
                    v-model="formSearch.createtime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
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
            <el-button size="small" round type="primary" >新增</el-button>
            <el-button size="small" round type="danger">批量删除</el-button>
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="tableData" v-loading="listLoading"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="name" label="优惠卷名称" width="150" align="center" sortable>
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
			<el-table-column prop="city" label="数量" align="center" width="130">
			</el-table-column>
			<el-table-column prop="type" label="领取人数" align="center" width="150">
			</el-table-column>
			<el-table-column prop="city" label="已使用" align="center" width="130">
			</el-table-column>
			<el-table-column prop="type" label="已使用率" align="center" width="150">
			</el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" @click="handleDetail(scope.$index, scope.row)">上架</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" plain type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="total,sizes,prev, pager, next,jumper" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" :total="pageInfo.pageTotal" :page-sizes="[5, 10, 20, 50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 表格---end -->

        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="closeDialog('formEdit')">
            <el-form :label-position="labelPosition" :label-width="labelWidth"  :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
                 <el-form-item label="优惠卷名称" prop="name">
                    <el-input v-model="formEdit.name" placeholder="活动名称" ></el-input>
                </el-form-item>
                <el-form-item label="活动" prop="city">
                    <el-input v-model="formEdit.city" placeholder="地址"></el-input>
                </el-form-item>
                 <el-form-item label="类别" prop="type">
                    <el-select v-model="formEdit.type" placeholder="类别">
                        <el-option label="留言" value="1"></el-option>
                        <el-option label="建议" value="2"></el-option>
                        <el-option label="BUG" value="3"></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="年龄" prop="age">
                    <el-input  v-model="formEdit.age" placeholder="年龄"></el-input>
                </el-form-item>
                 <el-form-item label="性别" prop="gender">
                    <el-select v-model="formEdit.gender" placeholder="性别">
                        <el-option label="男" value=1></el-option>
                        <el-option label="女" value=2></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="qq" prop="qq">
                    <el-input v-model="formEdit.qq" placeholder="QQ号"></el-input>
                </el-form-item>
				<el-form-item label="创建时间" prop="createtime">
				    <el-date-picker
				        v-model="formSearch.createtime"
				        type="daterange"
				        range-separator="至"
				        start-placeholder="开始日期"
				        end-placeholder="结束日期">
				    </el-date-picker>
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
.messageboard{
    // 设置输入框的宽度
    .el-form-item__content {
        width: 220px;
    }
	
}

</style>

<script>

export default {
    name: 'EventsManage',
    data() {
        return {
            listLoading : false,//
            pageInfo: { //分页
                currentPage: 1,
                pageSize: 5,
                pageTotal: 80
            },
            formSearch: { //表单查询
                name: '',
                city:'',
                type:null,
                age:'',
                gender:null,
                qq: '',
                startdate:null,
                enddate:null
            },
            formEdit: { //表单编辑
                id:null,
                name: '',
                city:'',
                type:'',
                age:'',
                gender:null,
                qq: ''
            },
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
                this.formEditTitle='编辑';
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
        /**
         * 分页大小切换
         */
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
           
        },
        /**
         * 分页切换
         */
        handleCurrentChange(val) {
            this.pageInfo.currentPage = val;
           
        },
        /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // this.$message({
            //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
            //     type: "success"
            // });
        },
        /**
         * 打开详情页
         */
        openDetail(row){
            this.$common.OpenNewPage(this,'detail',row);
        }
        
        
    }
};
</script>
