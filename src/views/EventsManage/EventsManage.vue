<template>
    <div class="container messageboard">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="活动名称" prop="eventname">
                <el-input v-model="formSearch.eventname" placeholder="活动名称"></el-input>
            </el-form-item>
            <el-form-item label="日期范围" prop="createtime">
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
	
            <el-button size="small" round type="primary" @click="handleAdd">新增	<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button size="small" round type="danger">批量删除<i class="el-icon-remove-outline"></i></el-button>
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="Events" v-loading="listLoading"  border stripe style="width: 100%" >
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="eid" label="活动编号" fixed width="110" align="center" sortable>
           <!--      <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.name}}</a>
                </template> -->
            </el-table-column>
            <el-table-column prop="ename" label="活动名称" align="center" width="140">
            </el-table-column>
            <el-table-column prop="epic" label="滚动栏图片" align="center" width="150">
               <img width="140" height="60" src="../../../static/img/img.jpg">
            </el-table-column>
             <el-table-column prop="edesc" label="内容描述" align="center" width="160">
            </el-table-column>
			<el-table-column prop="epic" label="活动详情图" align="center" width="150">
			   <img width="140" height="60" src="../../../static/img/img.jpg">
			</el-table-column>
		<el-table-column prop="status" label="是否已启用" align="center" width="120">
			<template slot-scope="scope">
				<el-button size="mini" :style='scope.row.status==1?validStyle:invalidStyle' disabled round>{{scope.row.status==1?valid:invalid}}</el-button>
			</template>
			
		</el-table-column>

            <el-table-column prop="createtime" label="起始日期"  width="130" sortable>
            </el-table-column>
             <el-table-column prop="endtime" label="终止日期"  width="130" sortable>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" >上架</el-button>
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
             <el-form >
                <el-form-item label="活动名称:" :label-width="formLabelWidth">
                  <el-input  autocomplete="off"></el-input>
                </el-form-item>
				<el-form-item label="创建时间:" :label-width="formLabelWidth" prop="createtime">
				     <el-date-picker
					      style="margin-left: -190px;"
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
				<el-form-item label="活动描述:" :label-width="formLabelWidth">
				
				  <div></div>
				  <el-input
				    type="textarea"
				    placeholder="请输入内容"
				    v-model="textarea"
				    maxlength="100"
				    show-word-limit
				  >
				  </el-input>
				</el-form-item>	
				<el-form-item label="上传滚动栏图片:" :label-width="formLabelWidth" style="margin-left: 40px;">
			<el-upload
			  class="avatar-uploader"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
				</el-form-item>	
					<el-form-item label="上传活动详情图:" :label-width="formLabelWidth" style="margin-left: 40px;">
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
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



<script>

export default {
    name: 'EventsManage',
    data() {
        return {
			
            listLoading : false,//
			currentPage:1,
			totalCount:1,
			PageSize:6,
			imageUrl: '',
            formSearch: { //表单查询
                name: '',
            },
            formEdit: { //表单编辑
              
            },
			
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
			textarea: '',
			valid: '已上架',
			invalid: '已下架',
			validStyle: 'color:#fff;background-color: lightgreen;',
			invalidStyle: 'color:#fff;background-color: lightgray;',
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
            Events: [  //表单列表
                {   eid:"1",
                    createtime: "2016-05-02",
					endtime: "2016-05-02",
                    ename: "李紫婷",
                    edesc: "上海市普陀区金沙江路 1518 弄",
					status:1
                },
                {   eid:"1",
                    createtime: "2016-05-02",
                	endtime: "2016-05-02",
                    ename: "李紫婷",
                    edesc: "上海市普陀区金沙江路 1518 弄",
					status:1
                },
				{   eid:"1",
                    createtime: "2016-05-02",
					endtime: "2016-05-02",
                    ename: "李紫婷",
                    edesc: "上海市普陀区金沙江路 1518 弄"
                   
                },
				 {   eid:"1",
					 createtime: "2016-05-02",
					 endtime: "2016-05-02",
					 ename: "李紫婷",
					 edesc: "上海市普陀区金沙江路 1518 弄"
				 },
		
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
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            this.$refs[formName].resetFields();
        },
        
        /**
         * 打开详情页
         */
        openDetail(row){
            this.$common.OpenNewPage(this,'detail',row);
        },
		
        handleAdd() {
            this.dialogEdittVisible = true;
            this.$nextTick(()=>{
                this.dialogType='add';
                this.formEditTitle='新增';
                this.formEditDisabled=false;
            });
           
            
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
		//处理上传图片的方法
		handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		      },
		      beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		      },
			 
        
    }
};
</script>
<style>
.messageboard{
		padding: 10px;
    // 设置输入框的宽度
    .el-form-item__content {
        width: 220px;
    }
}
	
	 .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
		margin-left: -300px;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	
	    color: #8c939d;
	    width: 150px;
	    height: 150px;
	    line-height: 150px;
	    text-align: center;
		
	  }
	  .avatar {
	    width: 150px;
	    height: 150px;
	    display: block;
	
}

</style>
