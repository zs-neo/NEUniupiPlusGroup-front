<template>
    <div class="container messageboard">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="订单号" prop="eventname">
                <el-input v-model="formSearch.eventname" placeholder="订单号"></el-input>
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
                     >
                   </el-date-picker>
            </el-form-item>
            <el-form-item label=" " style="margin-left:50px;">
                <el-button type="primary">查询</el-button>
                
            </el-form-item>
        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        
        <!-- 操作区----end -->
        <!-- 表格---start -->
        <el-table :data="Events" v-loading="listLoading"  border stripe style="width: 100%" >
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="orderid" label="订单编号" fixed width="110" align="center" sortable>
           <!--      <template slot-scope="scope">
                    <a href="javacript:;" style="color: #00D1B2" @click="openDetail(scope.row)">{{ scope.row.name}}</a>
                </template> -->
            </el-table-column>
            <el-table-column prop="clientid" label="用户id" align="center" width="140">
            </el-table-column>
            <el-table-column prop="serialnum" label="流水号" align="center" width="140">
			</el-table-column>
			<el-table-column prop="paymethod" label="支付方式" align="center" width="140">
			</el-table-column>
			<el-table-column prop="couponid" label="优惠套餐" align="center" width="140">
			</el-table-column>
            
			
		<el-table-column prop="state" label="订单状态" align="center" width="120">
			<template slot-scope="scope">
				<el-button size="mini" :style='scope.row.state==1?invalidStyle:(scope.row.state==2?validStyle:rvalidStyle)' disabled round>{{scope.row.state==1?valid:(scope.row.state==2?invalid:rvalid)}}</el-button>
			</template>
			
		</el-table-column>

            <el-table-column prop="createdate" label="下单日期"  width="130" sortable>
            </el-table-column>
             <el-table-column prop="cost" label="价格"  width="130" sortable>
             </el-table-column>
			 <el-table-column prop="remark" label="备注"  width="530" sortable>
			 </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="230">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" :disabled='scope.row.state==3?true:false' @click="changestatus(scope.$index, scope.row)">{{scope.row.state==1?bvalid:(scope.row.state==2?binvalid:brvalid)}}</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
                    
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
             <span>食品列表</span>
			 <el-table
                   :data="tableData"
                   style="width: 100%">
                   <el-table-column
                     prop="foodid"
                     label="食品名称"
                     width="580">
                   </el-table-column>
                   <el-table-column
                     prop="fdnumber"
                     label="食品数量"
                     width="80">
                   </el-table-column>
                   
             </el-table>
			<span>评论</span>
			<el-table
			      :data="reword"
			      style="width: 100%">
			      <el-table-column
			        prop="fcontent"
			        label=""
			        width="680">
			      </el-table-column>
			     <el-table-column label="" fixed="right" min-width="150">
			         <template slot-scope="scope">
						 <el-button type="primary" icon="el-icon-edit" @click="opennei()" circle></el-button>
			             
			             <el-button type="danger" icon="el-icon-delete" @click="deletereword(scope.$index, scope.row)" circle></el-button>
			             
			         </template>
			     </el-table-column>
		</el-table>
		<el-dialog
		      width="30%"
		      title="订单详情"
		      :visible.sync="innerVisible"
		      append-to-body>
			  <el-input
			    placeholder="请输入内容"
			    v-model="rewardinput"
			    clearable>
			  </el-input>
			  <el-popover
			    placement="top"
			    width="320"
			    v-model="visible">
			    
			    <div style="text-align: right; margin: 0">
			       
				  <el-button v-for="item in emojibutton" size="small" @click="addemoji(item.alike)">{{item.alike}}</el-button> 
			    </div>
			    <el-button icon="el-icon-thumb" slot="reference" circle></el-button>
			  </el-popover>
			  
			  <el-button icon="el-icon-picture-outline" circle></el-button>
			  <span>        </span>
			  <el-button type="success" icon="el-icon-check" @click="rewordachieve()" circle></el-button>
		    </el-dialog>
		    

            
        </el-dialog>

        <!-- 编辑弹框---end -->

    </div>
</template>



<script>
export default {
	
    name: 'EventsManage',
    data() {
        return {
			visible: false,
			rewardinput: '',
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
			
			emojibutton:[
				{
					alike:"w(ﾟДﾟ)w",
				},
				{
					alike:"ヽ(✿ﾟ▽ﾟ)ノ",
				},
				{
					alike:"(๑•̀ㅂ•́)و✧",
				},
				{
					alike:"φ(≧ω≦*)♪",
				},
				
			],
			noworderid:0,
			value1: '',
			value2: '',
			textarea: '',
			valid: '未确认',
			invalid: '已确认',
			rvalid:'已取消',
			bvalid: '确认',
			binvalid: '取消',
			brvalid:'已失效',
			validStyle: 'color:#fff;background-color: lightgreen;',
			invalidStyle: 'color:#fff;background-color: lightgray;',
			rvalidStyle: 'color:#fff;background-color: red;',
            formEditTitle:'订单明细',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
			
			 innerVisible: false,
			tableData: [{
			            foodname: '丸子',
			            foodnumber: '2',
			            
			          }, {
			            foodname: '丸子',
			            foodnumber: '2',
			            
			          }, {
			            foodname: '丸子',
			            foodnumber: '2',
			            
			          }, {
			            foodname: '丸子',
			            foodnumber: '2',
			            
			          }],
            dialogType:'',//弹框类型：add,edit,show
			noworder:0,
            reword:[
				{
					neirong:"a评论说好吃",
					
				}
			],
			Events: [  //表单列表
                {   eid:"1",
                    createtime: "2016-05-02",
					endtime: "2016-05-02",
                    ename: "李紫婷",
					price:100,
					status:1,
					remark:"少糖"
                },
                {   eid:"1",
                    createtime: "2016-05-02",
                    ename: "李紫婷",
					price:100,
					status:2,
					remark:"少糖"
                },
				{   eid:"1",
                    createtime: "2016-05-02",
                    ename: "李紫婷",
					price:100,
					status:3,
					remark:"少糖"
                   
                },
				 {   eid:"1",
					 createtime: "2016-05-02",
					 ename: "李紫婷",
					 price:100,
					 remark:"少糖"
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
   created() {
	   let a="aaa";
   	this.axios.get('http://localhost:8081/forder/all')
   	.then(res => {
   	  this.Events=res.data;      
   	})
   },
    methods: {
		deletereword(index, rowdata){
			this.$confirm('此操作将不可撤回, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			          this.$message({
			            type: 'success',
			            message: '删除成功!'
			          });
					  console.log(index);
					  console.log(rowdata);
					  this.axios.get('http://localhost:8081/reword/delete/'+rowdata.rewordid)
					  .then(res => {
					        console.log(res.data)
					  })
					  this.axios.get('http://localhost:8081/reword/all/'+this.noworderid)
					  .then(res => {
					    this.reword=res.data;   
					  	 
					  	 for(let i=0;i<res.data.length;i++){
					  		 if(this.reword[i].customerid==0){
					  			 this.reword[i].fcontent="商家回复道："+this.reword[i].fcontent;
					  		 }else{
					  			 this.reword[i].fcontent=this.reword[i].customerid+"评论道："+this.reword[i].fcontent;
					  		 }
					  			 
					  	 }
					  })
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
			
			
	    },
		rewordachieve(){
			if(this.rewardinput.length!=0){
			let a=this.noworder+1;
			this.axios.get('http://localhost:8081/reword/insert/'+a+"/"+this.rewardinput)
			.then(res => {
			      console.log(res.data)
			})
			this.innerVisible = false;
			alert('评论成功'); 
			this.axios.get('http://localhost:8081/reword/all/'+this.noworderid)
			.then(res => {
			  this.reword=res.data;   
				 
				 for(let i=0;i<res.data.length;i++){
					 if(this.reword[i].customerid==0){
						 this.reword[i].fcontent="商家回复道："+this.reword[i].fcontent;
					 }else{
						 this.reword[i].fcontent=this.reword[i].customerid+"评论道："+this.reword[i].fcontent;
					 }
						 
				 }
			})
			}else{
				alert('评论不能为空'); 
			}
		},
		opennei(){
			this.innerVisible = true;
		},
		addemoji(a){
			this.rewardinput=this.rewardinput+a;
			this.visible=false;
		},
		/**
		 * 确认按钮显示
		 */
       changestatus(index, rowdata){
		   this.$confirm('此操作将不可撤回, 是否继续?', '提示', {
		             confirmButtonText: '确定',
		             cancelButtonText: '取消',
		             type: 'warning'
		           }).then(() => {
		             this.$message({
		               type: 'success',
		               message: '操作成功!'
		             });
					 if(rowdata.state==2){
					 	this.Events[index].state=3
					 			this.axios.get('http://localhost:8081/forder/update/'+3+"/"+this.Events[index].orderid)
					 			.then(res => {
					 			      console.log(res.data)
					 			})
					 	}
					 if(rowdata.state==1){
					 			   this.Events[index].state=2
					 			   this.axios.get('http://localhost:8081/forder/update/'+2+"/"+this.Events[index].orderid)
					 			   .then(res => {
					 			         console.log(res.data)
					 			   })
					 			}
		           }).catch(() => {
		             this.$message({
		               type: 'info',
		               message: '已取消操作'
		             });
		           });
		   
		   
		},
        /**
         * 打开编辑弹窗
         */
        handleEdit(index, rowData) {
            //var msg = "索引是:" + index + ",行内容是:" + JSON.stringify(rowData);
            //this.$message({message: msg,type: "success"});
			this.noworder=index;
			this.noworderid=rowData.orderid;
			console.log(index);
			this.axios.get('http://localhost:8081/forderdetail/all/'+this.Events[index].orderid)
			.then(res => {
			  this.tableData=res.data;      
			})
			this.axios.get('http://localhost:8081/reword/all/'+this.Events[index].orderid)
			.then(res => {
			  this.reword=res.data;   
				 
				 for(let i=0;i<res.data.length;i++){
					 if(this.reword[i].customerid==0){
						 this.reword[i].fcontent="商家回复道："+this.reword[i].fcontent;
					 }else{
						 this.reword[i].fcontent=this.reword[i].customerid+"评论道："+this.reword[i].fcontent;
					 }
						 
				 }
			})
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            
        },
        /**
         * 关闭弹框，数据重置
         */
        closeDialog(formName){
            
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
