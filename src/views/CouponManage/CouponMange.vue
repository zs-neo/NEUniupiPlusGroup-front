<template>
    <div class="messageboard1">
        <!-- 查询区----start -->
        <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="优惠卷名" prop=countname >
                <el-input v-model="formSearch.countname" placeholder="优惠卷名称"></el-input>
            </el-form-item>
            <el-form-item label="时间范围"prop="time">
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
                <el-button type="primary" @click="fuzzySearch">查询</el-button>
                <el-button type="warning" plain @click="onReset('formSearch')" >重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 查询区----end -->
        <!-- 操作区----start -->
        <el-row style="float:left;padding-bottom: 10px;">
            <el-button size="small" round type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button size="small" round type="danger"@click="deleteMany">批量删除<i class="el-icon-remove-outline"></i></el-button>
        </el-row>
        <!-- 操作区----end -->
        <!-- 表格---start -->

<div class="tableContent">
        <el-table :data="coupons" v-loading="listLoading" border stripe max-height="500px"@selection-change="handleSelectionChange">
            <el-table-column type="selection" width="60">
            </el-table-column>
			<el-table-column prop="couponid" label="优惠卷编号"fixed align="center" width="120"sortable>
			</el-table-column>
            <el-table-column prop="couponname" label="优惠卷名称" fixed width="160" align="center" >
            </el-table-column>  
             <el-table-column prop="coupondesc" label="内容描述" align="center" width="180">
            </el-table-column>
            <el-table-column prop="couponbegtime" label="起始日期" align="center" width="160" sortable>
            </el-table-column>
             <el-table-column prop="couponendtime" label="终止日期" align="center"  width="160" sortable>
            </el-table-column>
			<el-table-column prop="couponamount" label="数量" align="center" width="100"sortable>
			</el-table-column>
			<el-table-column prop="coupongetnum" label="已领取" align="center" width="100"sortable>
			</el-table-column>
			<el-table-column prop="couponusednum" label="已使用" align="center" width="100"sortable>
			</el-table-column>
			<el-table-column prop="couponscore" label="积分" align="center" width="100"sortable>
			</el-table-column>
			<el-table-column prop="limituser" label="限定条件" align="center" width="100">
				<template slot-scope="scope">
			   {{scope.row.limituser==1?"vip用户":"普通用户"}}
				</template>
				
			</el-table-column>
			<el-table-column prop="couponstatus" label="状态" align="center" width="120">
			<template slot-scope="scope">
				<el-button size="mini" :style='scope.row.couponstatus==1?validStyle:invalidStyle' disabled round>{{scope.row.couponstatus==1?valid:invalid}}</el-button>
			</template>
			
			</el-table-column>
            <el-table-column label="操作" fixed="right" align="center" min-width="230">
                <template slot-scope="scope">
                    <el-button size="small" round :type='scope.row.couponstatus==0?unuserStyle:useStyle' @click="startCounpon($event, scope.row)">{{scope.row.couponstatus==0?"启用":"禁用"}}</el-button>
                    <el-button size="small"round type="success"@click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" round type="danger" @click="deleteCoupon(scope.row.couponid)">删除</el-button>
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
                :total="totalCount"
				>
          </el-pagination>
       </div>
        <!-- 表格---end -->
</div>
       
       <!-- 添加、编辑弹框---start -->
       <el-dialog  :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px" @close="onReset('formEdit')">
            <el-form :model="formEdit" ref="formEdit":rules="rulesEdit" >
			   <el-tooltip content="这是必填字段" placement="left-start">
			   <el-form-item label="优惠卷名称:" :label-width="formLabelWidth" prop="fullmoney">
			    <div>
			      <el-input placeholder="门槛金额" type="number" v-model="formEdit.fullmoney" style="width: 270px;" >
			        <template slot="prepend" margin-left="10px">金额满</template>
			      </el-input>
				    <el-input placeholder="力度金额" type="number" v-model="formEdit.substractmoney"style="width: 270px;">
				      <template slot="prepend">元减</template>
					  <template slot="append">元卷</template>
				    </el-input>
					
			    </div>
			   </el-form-item>	
			   	</el-tooltip>
			<el-tooltip content="这是必填字段" placement="left-start">
				<el-form-item label="优惠卷数量:" :label-width="formLabelWidth":required="true"prop="couponamount" >
				  <el-input-number v-model="formEdit.couponamount" :step="5" style="margin-left: -360px;"></el-input-number>
				</el-form-item> 
		   </el-tooltip>
		   	<el-tooltip content="这是必填字段" placement="left-start">
				<el-form-item label="积分值设定:" :label-width="formLabelWidth":required="true"prop="couponscore" >
					<el-radio-group v-model="formEdit.couponscore" >
			    <el-radio  :label="1" border style="margin-left: -45px;">1积分</el-radio>
			    <el-radio  :label="3" border>3积分</el-radio>
				<el-radio  :label="5" border>5积分</el-radio>
				<el-radio  :label="10" border>10积分</el-radio>
				</el-radio-group>
				</el-form-item> 
			</el-tooltip>
		<el-tooltip content="这是必填字段" placement="left-start">
       		<el-form-item label="有效时间:" :label-width="formLabelWidth"prop="createtime" >
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
			</el-tooltip>
			<el-form-item label="限定条件:" :label-width="formLabelWidth" :required="true"prop="limituser">
				<el-select v-model="formEdit.limituser" placeholder="请选择" style="margin-left: -320px;">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
			</el-form-item>
       		<el-form-item label="优惠卷描述:" :label-width="formLabelWidth"prop="desc">
       		  <div></div>
       		  <el-input
       		    type="textarea"
       		    placeholder="请输入内容"
       		    v-model="formEdit.desc"
       		    maxlength="100"
       		    show-word-limit >
       		  </el-input>
       		</el-form-item>	
             </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click="dialogEdittVisible = false" >取 消</el-button>
               <el-button v-if="!formEditDisabled" @click="handleSave" type="primary" >确 定</el-button>
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
		let server = "http://localhost:8081";
		let getAllByPage='/coupon/getAllByPage';
		let search='/coupon/fuzzySearch';
		let updateStatus="/coupon/updateStatus";
		let deleteCoupon="/coupon/deleteCoupon";
		let insertCoupon="/coupon/insertCoupon";
		let updatecoupon="/coupon/updateCoupon";
		let deleteBatch="/coupon/deleteBatch";
export default {
    name: 'CouponManage',
    data() {
        return {
            listLoading : false,//
            currentPage:1,
            totalCount:1,
            PageSize:5,
			isSearch:false,	//用于区别当前是否为search的结果分页
            formSearch: { //表单查询
                countname: "",
				time:"",
            },
            formEdit: { //表单编辑
			  fullmoney:"",
			  substractmoney:"",
			  couponamount:20,
			  createtime:"",
			  desc:"",	
			  couponscore:"",
			  limituser:"",
            },
			rulesEdit:  {
			    fullmoney: [
			        { required: true, message: "请输入满减金额", trigger: "blur" },
 
			    ],
			},
			 options: [{
			          value: 0,
			          label: '所有用户'
			        }, {
			          value: 1,
			          label: 'VIP用户'
			        }],
					
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
			couponid:"",
			valid: '已启用',
			invalid: '未启用',
			validStyle: 'color:#fff;background-color: lightgreen;',
			invalidStyle: 'color:#fff;background-color: lightgray;',
			unuserStyle:'primary',
			useStyle:'warning',
            formEditTitle:'编辑',//新增，编辑和查看标题
            formEditDisabled:false,//编辑弹窗是否可编辑
            dialogEdittVisible: false,  //编辑弹框显示
            dialogType:'',//弹框类型：add,edit
            coupons: [],//优惠卷表数据
            labelPosition: 'right', //lable对齐方式
            labelWidth: '80px', //lable宽度
            formLabelWidth: '120px',
            multipleSelection: []
        };
    },
    computed:{
        
    },
   
    methods: {
		

		//判断是否是数字
		 isNumber(val) {
		　　if (parseFloat(val).toString() == "NaN") {
		　　　　
		　　　　return false;
		　　} else {
		　　　　return true;
		　　}
		},
		//获取formedit的信息
		getFormEditData(){
					    let fullmoney=this.formEdit.fullmoney;
						let substractmoney=this.formEdit.substractmoney
						let times=this.formEdit.createtime;
						let couponbegtime="";
						let couponendtime="";
						if(times!=""){
							couponbegtime=times[0];
							couponendtime=times[1];
						}
						let couponamount=this.formEdit.couponamount;
						let couponscore=this.formEdit.couponscore;
						let limituser=this.formEdit.limituser;
						let coupon="";
						if(fullmoney!=""&&substractmoney!=""&&couponbegtime!=""&&couponendtime!=""
						&&couponamount!=""&&couponscore!=""){
						if(this.isNumber(fullmoney)&&this.isNumber(substractmoney)){	
						 coupon={
							"couponid":this.couponid,
							"couponname": "满"+ fullmoney+"元减"+substractmoney+"元优惠卷",
							"coupondesc": this.formEdit.desc,
							"couponbegtime": couponbegtime,
							"couponendtime": couponendtime,
							"couponstatus":0,
							"couponamount": couponamount,
							"couponscore": couponscore,	
							"limituser":limituser,
						};
			
						}else{
						  this.$message.error('优惠卷名称非法，请填写数字！');
						}  		
					}else{
						 this.$message.error('请将信息填写完整后提交！');
					}
					return coupon;
					
		},
		
		//新增优惠卷
		addCounpon(){
			let coupon=this.getFormEditData();
			if(coupon!=""){
			this.axios.post(`${server}${insertCoupon}`,JSON.stringify(coupon),{
							headers: {
								'content-Type':'application/json',
							},		
						}).then(r=>{
								 console.log("增加");
								 console.log(r.data);
								 if(r.data.insertmsg){
								   this.$message({
								          message: '优惠卷添加成功！',
								          type: 'success',
										   center: true
								        });
										this.getData();
								}else{
									this.$message({
									          message: '添加失败,请重新尝试！',
									          type: 'error',
											   center: true
									        });
								}			
							});
				}
		},
		//重置搜索区
		onReset(formname){		
		      this.$refs[formname].resetFields();
			  this.formEdit.substractmoney="";
		  },
		  
		//点击搜索按钮
		fuzzySearch(){
			let countname=this.formSearch.countname;
			let times=this.formSearch.time;
			let begtime="";
			let endtime="";
			if(times!=""){
				begtime=times[0];
				endtime=times[1];
			}
			this.isSearch=true;
			console.log(this.PageSize);
			console.log(this.currentPage);
			if(countname!=""||times!=""){
				this.axios.get(`${server}${search}`,{params:{
							couponname: countname,
							couponbegtime:begtime,
							couponendtime:endtime,
							pageNum: this.currentPage,
							pageSize:this.PageSize,
						 	}}).then(r=>{
					console.log(r.data)	;
				   this.coupons=r.data.list;
				   this.totalCount=r.data.total;							
				 }) 
			}else{
				 this.$message.error('优惠卷名和时间范围不能同时为空！');
			}
		},
		//点击启用或者禁用
		startCounpon(event,rowdata){
			   console.log(event.target.innerText);
			   let flag=event.target.innerText;
			   let confirmup="此操作将发布该优惠卷, 是否继续?";
			   let confirdown="此操作将禁用该优惠卷, 是否继续?";
			   let upmsg="发布成功!";
			   let upcancel="已取消发布";
			   let downmsg="禁用成功!";
			   let downcancel="已取消禁用";   
			   if(flag=="启用"){
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
			  				 couponid: rowdata.couponid,
			              	 couponstatus:rowdata.couponstatus,
			      }}).then(r=>{
					  
						   if(r.data.updateStatus){
							rowdata.couponstatus=r.data.status;
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
		deleteCoupon(couponid){
			console.log(couponid);
			this.$confirm("此操作将彻底删除该优惠卷信息, 是否继续?", '提示', {
			         confirmButtonText: '确定',
			         cancelButtonText: '取消',
			         type: 'warning'
			       }).then(() => {
					
			  		this.axios.get(`${server}${deleteCoupon}`,{params:{
			  							 couponid: couponid,
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
		/**
		 * 批量删除
		 */
		deleteMany() {
		    var ids= this.multipleSelection.map(item => item.couponid);
			console.log(ids);
		    if(ids.length==0){
		         this.$message({message: '请选择要删除的项',type: "warning",center: true});
		        return;
		    }
		    this.$confirm('此操作将批量永久删除所选优惠卷, 是否继续?', '提示', {
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
		//打开新增窗口
		handleAdd() {
		    this.dialogEdittVisible = true;
		    this.$nextTick(()=>{
		        this.dialogType='add';
		        this.formEditTitle='新增优惠卷';
		        this.formEditDisabled=false;
		    });
		  
		},
        /**
         * 打开编辑弹窗
         */
        handleEdit(rowData) {
			console.log(rowData);
            this.dialogEdittVisible = true;//等dom渲染完，读取data中初始值，然后再复制，这样重置的是data中初始值
            this.$nextTick(()=>{
                this.dialogType='edit';
                this.formEditTitle='编辑优惠卷';
                this.formEditDisabled=false;
				var str = rowData.couponname;
				var numArr = str.match(/\d+/g);//分割出数字
				this.couponid=rowData.couponid;//便于修改时拿到id
                this.formEdit.couponamount=rowData.couponamount;
				this.formEdit.couponscore=rowData.couponscore;
				this.formEdit.limituser=rowData.limituser;
				this.formEdit.desc=rowData.coupondesc;  
				this.formEdit.fullmoney=numArr[0];
				this.formEdit.substractmoney=numArr[1];
				this.formEdit.createtime=[rowData.couponbegtime,rowData.couponendtime];
            }); 
        },
		//修改优惠卷信息
		updateCoupon(rowdata){
			let coupon=this.getFormEditData();
			if(coupon!=""){
				this.axios.post(`${server}${updatecoupon}`,JSON.stringify(coupon),{
								headers: {
									'content-Type':'application/json',},		
							}).then(r=>{
									 console.log("修改");
									 console.log(r.data);
									 if(r.data.updatemsg){
										 this.getData();
									  this.$message({message: '优惠卷修改成功！', type: 'success'});	
									}else{
							this.$message({ message: '修改失败,请重新尝试！',type: 'error'});
									}			
								});
			}	
		},

        /**
         * 点击选择
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
		//点击对话框的确认
		handleSave(){
			if(this.dialogType=='add'){
			     this.addCounpon();}
			 else if(this.dialogType=='edit'){
			     this.updateCoupon();
		    }
			 else{
			    this.$message({message: '操作异常',type: "error"});
			    }
			
		},
		
		
		// 将页码，及每页显示的条数以参数传递提交给后台
		getData(){	 
		   this.axios.get(`${server}${getAllByPage}`,{params:{
					 pageNum: this.currentPage,
					 pageSize:this.PageSize,
		 		}}).then(r=>{
					console.log(r.data);
		      this.coupons=r.data.list;
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
