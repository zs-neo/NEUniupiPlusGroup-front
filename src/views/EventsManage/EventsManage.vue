<template>
    <div class="messageboard">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="活动名称" prop="eventname">
                <el-input v-model="formSearch.eventname" placeholder="活动名称"></el-input>
            </el-form-item>
            <el-form-item label="日期范围" prop="time">
                <el-date-picker
                   v-model="formSearch.time"
                   value-format="yyyy-MM-dd "  
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
                <el-button type="primary"@click="fuzzySearch">查询</el-button>
                <el-button type="warning" plain  @click="onReset('formSearch')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        <el-row style="float:left;padding-bottom: 10px;">
	
            <el-button size="small" round type="primary" @click="handleAdd">新增	<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button size="small" round type="danger"@click="deleteMany">批量删除<i class="el-icon-remove-outline"></i></el-button>
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->
	<div>
        <el-table :data="Events" v-loading="listLoading"  border stripe style="width: 100%" max-height="450px" @selection-change="handleSelectionChange" >
            <el-table-column type="selection" width="60">
            </el-table-column>
            <el-table-column prop="eventid" label="活动编号" fixed width="110" align="center" sortable>
            </el-table-column>
            <el-table-column prop="ename" label="活动名称" align="center" width="160">
            </el-table-column>
            <el-table-column prop="epic" label="滚动栏图片" align="center" width="150">
				 <template slot-scope="scope">
                <el-image   :src="`${imgP}${scope.row.epic}`":preview-src-list="[`${imgP}${scope.row.epic}`,`${imgP}${scope.row.edetailpic}`]" width="140" height="40" ></el-image>
			     </template>
            </el-table-column>
             <el-table-column prop="edesc" label="内容描述" align="center" width="180">
            </el-table-column>
			<el-table-column prop="epic" label="活动详情图" align="center" width="150">
			 <template slot-scope="scope">
			  <el-image  :src="`${imgP}${scope.row.edetailpic}`" :preview-src-list="[`${imgP}${scope.row.edetailpic}`,`${imgP}${scope.row.epic}`]" width="140" height="40"> </el-image>
			  </template>
			</el-table-column>
		<el-table-column prop="estatus" label="是否已启用" align="center" width="120">
			<template slot-scope="scope">
				<el-button size="mini" :style='scope.row.estatus==1?validStyle:invalidStyle' disabled round>{{scope.row.estatus==1?valid:invalid}}</el-button>
			</template>		
		</el-table-column>
            <el-table-column prop="eventbegtime" label="起始日期" align="center" width="160" sortable>
            </el-table-column>
             <el-table-column prop="eventendtime" label="终止日期" align="center"  width="160" sortable>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" min-width="230">
                <template slot-scope="scope">
                    <el-button size="small"round type="primary":type='scope.row.estatus==0?unuserStyle:useStyle' @click="upEvent($event, scope.row)">{{scope.row.estatus==0?"上架":"下架"}}</el-button>
                    <el-button size="small"round type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small"round type="danger" @click="deleteEvent(scope.row.eventid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
  <div class="tabListPage">
       <el-pagination @size-change="handleSizeChange"
			background
              @current-change="handleCurrentChange"
              :current-page="currentPage"
			  :page-sizes="[5, 10, 20, 50,100]"
              :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
        </el-pagination>
     </div>
	  </div>
        <!-- 表格---end -->

        <!-- 编辑弹框---start -->
        <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px"  @close="onReset('formEdit')">
             <el-form :model="formEdit" ref="formEdit" :rules="rulesEdit">
                <el-form-item label="活动名称:"  :label-width="formLabelWidth"prop="ename">
                  <el-input  autocomplete="off"v-model="formEdit.ename" ></el-input>
                </el-form-item>
				<el-form-item label="创建时间:"  :label-width="formLabelWidth" prop="createtime">
				     <el-date-picker
					      style="margin-left: -190px;"
				          v-model="formEdit.createtime"
						  value-format="yyyy-MM-dd "  
				          type="daterange"
				          align="right"
				          unlink-panels
				          range-separator="至"
				          start-placeholder="开始日期"
				          end-placeholder="结束日期"
				          :picker-options="pickerOptions">
				        </el-date-picker>
				</el-form-item>
				<el-form-item label="活动描述:" :label-width="formLabelWidth"prop="edesc">
				
				  <div></div>
				  <el-input
				    type="textarea"
				    placeholder="请输入内容"
				    v-model="formEdit.edesc"
				    maxlength="100"
				    show-word-limit
				  >
				  </el-input>
				</el-form-item>	
				<el-form-item label="上传滚动栏图:"prop="epic":required="true" :label-width="formLabelWidth" style="margin-left: 40px;">
			<el-upload
			  class="avatar-uploader"
			  :auto-upload="false"
			  :on-change="(file, fileList) => {handleChange(file, fileList, 0)}"
		      :before-upload="beforeAvatarUpload"
			   action="#"
			  :show-file-list="false"
			 >
			  <img v-if="formEdit.epic" :src="formEdit.epic" class="avatars">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			  <img width="100%" :src="formEdit.epic" alt="">
			</el-dialog>
				</el-form-item>	
					<el-form-item label="上传活动详图:":required="true" prop="edetailpic" :label-width="formLabelWidth" style="margin-left: 40px;">
					<el-upload 
			
					  class="avatar-uploader"
					   :auto-upload="false"
					  :before-upload="beforeAvatarUpload"
				      :on-change="(file, fileList) => {handleChange(file, fileList, 1)}"
					  action="#"
					  :show-file-list="false"
					  >
					  <img  v-if="formEdit.edetailpic" :src="formEdit.edetailpic" class="avatars">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
					  <img width="100%" :src="formEdit.edetailpic" alt="">
					</el-dialog>
						</el-form-item>	
				
              </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEdittVisible = false">取 消</el-button>
                <el-button v-if="!formEditDisabled" @click="handleSave"type="primary" >确 定</el-button>
            </div>
        </el-dialog>

        <!-- 编辑弹框---end -->

    </div>
</template>



<script>
	let server = "http://localhost:8081";
	let getAllByPage='/event/getAllByPage';
	let search='/event/fuzzySearch';
	let updateStatus="/event/updateStatus";
	let delEvent="/event/deleteEvent";
	let insertEvent="/event/insertEvent";
	let updateEvent="/event/updateEvent";
	let deleteBatch="/event/deleteBatch";
    let uploadPic="/event/uploadPic";
export default {
    name: 'EventsManage',
    data() {
        return {
            listLoading : false,//
			currentPage:1,
			totalCount:1,
			PageSize:5,
			isSearch:false,
			imgP:"http://localhost:8081/res/",
			Events: [],
			eventid:"",//修改数据时使用
			epic:"",
			edetailpic:"",
			updateUrl:"https://jsonplaceholder.typicode.com/posts/",//http://localhost:8081/uploadpic",
            formSearch: { //表单查询
                eventname: '',
				time:'',
            },
            formEdit: { //表单编辑
			    ename:"",
				createtime:"",
				edesc:"",
				edetailpic:"",
				epic:"",
				
              
            },
			rulesEdit:  {
			    ename: [
			        { required: true, message: "请输入活动名称", trigger: "blur" },
			 
			    ],
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
			value2: '',
			textarea: '',
			valid: '已上架',
			invalid: '已下架',
			validStyle: 'color:#fff;background-color: lightgreen;',
			invalidStyle: 'color:#fff;background-color: lightgray;',
			unuserStyle:'primary',
			useStyle:'warning',
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit,show
			labelPosition: 'right', //lable对齐方式
			labelWidth: '80px', //lable宽度
			formLabelWidth: '120px',
			multipleSelection: [],
			fileList:[],
			dialogVisible: false,
				};
			},
		
    computed:{
        myheader(){
			return {
					'content-Type':'multipart/form-data',
					
			};
		}
    },
   
    methods: {
		
		//重置搜索区
		onReset(formname){		
		      this.$refs[formname].resetFields();
			  
		  },
		  
		//点击搜索按钮
		fuzzySearch(){
			let eventname=this.formSearch.eventname;
			let times=this.formSearch.time;
			let begtime="";
			let endtime="";
			if(times!=""){
				begtime=times[0];
				endtime=times[1];
			}
			this.isSearch=true;
			console.log(times);
			console.log(eventname);
			if(eventname!=""||times!=""){
				this.axios.get(`${server}${search}`,{params:{
							ename: eventname,
							eventbegtime:begtime,
							eventendtime:endtime,
							pageNum: this.currentPage,
							pageSize:this.PageSize,
						 	}}).then(r=>{
					console.log(r.data)	;
				   this.Events=r.data.list;
				   this.totalCount=r.data.total;							
				 }) 
			}else{
				 this.$message.error('优惠卷名和时间范围不能同时为空！');
			}
		},
		//点击上架或者下架
		upEvent(event,rowdata){
			   console.log(event.target.innerText);
			   let flag=event.target.innerText;
			   let confirmup="此操作将上架该活动, 是否继续?";
			   let confirdown="此操作将下架该活动, 是否继续?";
			   let upmsg="活动上架成功!";
			   let upcancel="已取消上架";
			   let downmsg="活动下架成功!";
			   let downcancel="已取消下架";   
			   if(flag=="上架"){
			       this.returnmsg(rowdata,confirmup,upmsg,upcancel);
				   
			   }else{
				   this.returnmsg(rowdata,confirdown,downmsg,downcancel);
				   
			   }
		
		},
		//启用的辅助方法
		returnmsg(rowdata,confimsg,successmsg,cancelmsg){
			this.$confirm(confimsg, '提示', {
			         confirmButtonText: '确定',
			         cancelButtonText: '取消',
			         type: 'warning'
			       }).then(() => {
			  		this.axios.get(`${server}${updateStatus}`,{params:{
			  				 eventid: rowdata.eventid,
			              	 estatus:rowdata.estatus,
			      }}).then(r=>{
					  
						   if(r.data.updateStatus){
							rowdata.estatus=r.data.status;
							this.$message({
						    type: 'success',
						    message: successmsg	,
							center: true
				    });	
				}else{
					this.$message({
						    type: 'error',
						    message: "对不起，操作失败！"	,
							center: true
					});		
				}					
			       }) 				  
			        }).catch(() => {
			         this.$message({
			           type: 'info',
			           message: cancelmsg,
					   center: true
			         });          
			       });
		},
		//删除一行数据
		deleteEvent(eventid){
			console.log(eventid);
			this.$confirm("此操作将彻底删除该活动信息, 是否继续?", '提示', {
			         confirmButtonText: '确定',
			         cancelButtonText: '取消',
			         type: 'warning'
			       }).then(() => {
			  		this.axios.get(`${server}${delEvent}`,{params:{
			  							 eventid: eventid,
			  				 		}}).then(r=>{
			  		      console.log(r.data);
			  			  if(r.data.deletemsg){
			  				  this.$message({
			  				  	    type: 'success',
			  				  	    message: "删除成功！",
									center: true
			  				  });	
							  this.getData();
			  			  }
					else{
					this.$message({
						    type: 'error',
						    message: "对不起，删除失败！"	,
							center: true
					   });		
				  }					
			       }) 				  
			        }).catch(() => {
			         this.$message({
			           type: 'info',
			           message: "已取消删除",
					   center: true
			         });          
			       });
			
		},
		
		 //批量删除
		deleteMany() {
		    var ids= this.multipleSelection.map(item => item.eventid);
			console.log(ids);
		    if(ids.length==0){
		         this.$message({message: '请选择要删除的项',type: "warning",center: true});
		        return;
		    }
		    this.$confirm('此操作将批量永久删除所选活动, 是否继续?', '提示', {
		            confirmButtonText: '确定',
		            cancelButtonText: '取消',
		            type: 'warning'
		        }).then(() => {  
					this.axios.post(`${server}${deleteBatch}`,JSON.stringify(ids),{
							headers: {
								'content-Type':'application/json',
							},		
					      }).then(r=>{
			  		      console.log(r.data);
			  			  if(r.data.deleteBatchmsg){
			  				  this.$message({
			  				  	    type: 'success',
			  				  	    message: "删除成功！"				
			  				  });	
							  this.getData();
			  			  }
					else{
					this.$message({
						    type: 'error',
						    message: "对不起，删除失败！"				
					   });		
				  }					
			       })}).catch(() => {
		            this.$message({type: 'info',message: '已取消删除'});
		        });
		},
		//获取formedit的信息
		getFormEditData(){
					    let ename=this.formEdit.ename;
						let times=this.formEdit.createtime;
						let eventbegtime="";
						let eventendtime="";
						if(times!=""){
							eventbegtime=times[0];
							eventendtime=times[1];
						}

						let event="";
						if(ename!=""&&eventbegtime!=""&&eventendtime!=""){
						 event={
							"eventid":this.eventid,
							"ename": ename,
							"edesc": this.formEdit.edesc,
							"eventbegtime": eventbegtime,
							"eventendtime": eventendtime,
							"estatus":0,
							"epic": this.epic,
							"edetailpic": this.edetailpic,	
						}; 		
					}else{
					    this.$message({message: '请将信息填写完整后提交！', type: 'error', center: true});
					}
					return event;
					
		},
		//上传图片
		uploadImge(){
			let formData = new FormData();
			for(let i= 0;i<this.fileList.length;i++){
				formData.append("files", this.fileList[i]);
			  }					
			this.axios.defaults.withCredentials = true;
			this.axios.post(`${server}${uploadPic}`, formData,{
				headers: {
					'content-Type':'multipart/form-data',
				},
			}).then(rs=>{
					this.getData();	
			});											
			
		},	
		
		//新增活动
		addEvent(){
			let event=this.getFormEditData();
			console.log(event);
			if(event!=""){
			this.axios.post(`${server}${insertEvent}`,JSON.stringify(event),{
							headers: {
								'content-Type':'application/json',
							},		
						}).then(r=>{
							 if(r.data.insertmsg){
								  this.uploadImge();
								  this.$message({ message: '活动添加成功！',type: 'success', center: true });					
								}else{
									this.$message({message: '添加失败,请重新尝试！', type: 'error', center: true});
								}			
							});
				}else{
					this.$message({message: '添加失败,请重新尝试！', type: 'error', center: true});
				}
		},
		//修改活动信息
		updateEvent(){
			let event=this.getFormEditData();
			console.log(event);
			if(event!=""){
			this.axios.post(`${server}${updateEvent}`,JSON.stringify(event),{
							headers: {
								'content-Type':'application/json',
							},		
						}).then(r=>{
							console.log(r.data);
							 if(r.data.updatemsg){
								  this.uploadImge();
								  this.$message({ message: '活动修改成功！',type: 'success', center: true });					
								}else{
									this.$message({message: '修改失败,请重新尝试！', type: 'error', center: true});
								}			
							});
				}
			
		},
		//打开新增窗口
		handleAdd() {
		    this.dialogEdittVisible = true;
		    this.$nextTick(()=>{
		        this.dialogType='add';
		        this.formEditTitle="新增活动";
		        this.formEditDisabled=false;
		    });
		  
		},

		//点击复选框
		handleSelectionChange(val) {
		    this.multipleSelection = val;
		},
          //打开编辑弹窗
        handleEdit(index, rowData) {
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑活动';
                this.formEditDisabled=false;
				this.eventid=rowData.eventid;
                this.formEdit= Object.assign({}, rowData);
                this.formEdit.createtime=[rowData.eventbegtime,rowData.eventendtime];
				this.formEdit.epic=this.imgP+rowData.epic;
				this.formEdit.edetailpic=this.imgP+rowData.edetailpic;
            });  
        },
		//点击对话框的确认
		handleSave(){
			if(this.dialogType=='add'){
			     this.addEvent();}
			 else if(this.dialogType=='edit'){
			     this.updateEvent();
		    }
			 else{
			    this.$message({message: '操作异常',type: "error"});
			    }
			
		},
		//图片上传之前的检测方法
	    beforeAvatarUpload(file) {
			if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
				this.$message.error('上传图片格式为image/png, image/gif, image/jpg, image/jpeg的图片!');
				return isJPG
			}
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error('上传图片大小不能超过 2MB!');
				return isLt2M
			} 
	  },
	  //当上传图片后，调用onchange方法，获取图片本地路径
	  handleChange(file,fileList,index){
		var _this = this;
		var event = event || window.event;
		var file = event.target.files[0];
		this.fileList.push(file);
		var reader = new FileReader(); 
		 if(index==0){
			this.epic=file.name;
			reader.onload = function(e) {
			  _this.formEdit.epic = e.target.result //将图片路径赋值给src
			}
		 } else if(index==1){
			 this.edetailpic=file.name;
			 reader.onload = function(e) {
			  _this.formEdit.edetailpic = e.target.result //将图片路径赋值给src
			}
		 }
	  		reader.readAsDataURL(file);

	  },	  
			  // 将页码，及每页显示的条数以参数传递提交给后台
			  	getData(){	 
			  	   this.axios.get(`${server}${getAllByPage}`,{params:{
			  				 pageNum: this.currentPage,
			  				 pageSize:this.PageSize,
			  	 		}}).then(r=>{
			  				console.log(r.data.list);
			  	      this.Events=r.data.list;
			  	      this.totalCount=r.data.total;
			  							
			  	    }) 
			  	 },
			  	 
			    // 分页
			    handleSizeChange(val) {
			  			this.PageSize=val;
			  		if(this.isSearch==false){
			  			this.getData();
			  		}else{
			  			this.fuzzySearch();
			  		 
			  		}
			  			this.currentPage=1 ;
			  
			    },
			     // 显示第几页
			    handleCurrentChange(val) {
			  	  this.currentPage=val;
			  	   if(this.isSearch==false){
			  		this.getData();
			  	   }else{
			  		   this.fuzzySearch();
			  		
			  	   }
			    },
			  },
			  
			created:function(){			
			  	this.getData(this.PageSize,this.currentPage) ;
			  				
			},
			 

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
	  .avatars {
	    width: 160px;
	    height: 160px;
	    display: block;
	
}

</style>
