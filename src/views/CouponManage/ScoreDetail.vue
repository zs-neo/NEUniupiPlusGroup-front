<template>
    <div class="thispage">


        <!-- 查询区----start -->
        <el-form   :inline="true" ref="formSearch" :model="formSearch" class="demo-form-inline">
            <el-form-item label="会员名" prop=clientname >
                <el-input v-model="formSearch.clientname" placeholder="用户名"></el-input>
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

        <!-- 表格---start -->
<el-table
    :data="memberdetails"
    style="width: 100%;"
	border stripe max-height="500px"
	>

    <el-table-column

      label="会员名"
      width="180"
	  align="center">
	        <template slot-scope="scope">
	          <el-popover trigger="hover" placement="top">
	            <p>五凤楼认证会员客户</p>
	            <div slot="reference" class="name-wrapper">
	              <el-tag size="medium">{{ scope.row.clientid }}</el-tag>
	            </div>
	          </el-popover>
	        </template>
    </el-table-column>
    <el-table-column
      prop="updateamount"
      label="积分明细"
	  align="center">
    </el-table-column>
	<el-table-column
	  label="变动时间"
	  align="center">
	  <template slot-scope="scope">
		  <i class="el-icon-time"></i>
		 <span style="margin-left: 10px">{{ scope.row.updatetime }}</span>
		</template>
	</el-table-column>
	<el-table-column
	  prop="description"
	  label="详情描述"
	  align="center">
	</el-table-column>
  </el-table
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
       

    </div>
</template>



<script>

		let server = "http://localhost:8081";
		let getAllByPage='/memberdetail/getAllByPage';
		let search='/memberdetail/fuzzySearch';
		let getClientByid="/couponreceive/getClientByid";
		let getredPacketByid="/memberdetail/getRedPByid";
	
export default {
    name: 'redPacketDetail',

    data() {
        return {
            listLoading : false,//
            currentPage:1,
            totalCount:1,
            PageSize:5,
			isSearch:false,	//用于区别当前是否为search的结果分页
            formSearch: { //表单查询
                clientname: "",
				time:"",
            },
			memberdetails: [],
					
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
			
        };
    },
    computed:{
        
    },

    methods: {


		//重置搜索区
		onReset(formname){		
		      this.$refs[formname].resetFields();
			 
		  },
		  
		//点击搜索按钮
		fuzzySearch(){
			let clientname=this.formSearch.clientname;
			let times=this.formSearch.time;
			let begtime="";
			let endtime="";
			if(times!=""){
				begtime=times[0];
				endtime=times[1];
			}
			this.isSearch=true;

			if(clientname!=""||times!=""){
				this.axios.get(`${server}${search}`,{params:{
							pageNum: this.currentPage,
							pageSize:this.PageSize,
							username: clientname,
							begtime:begtime,
							endtime:endtime,
						 	}}).then(r=>{
								if(r.data.total==0){
									this.$message.warning("对不起，当前查询无任何结果");
								}
					
							console.log(r.data);
					    this.memberdetails=r.data.list;
					    this.totalCount=r.data.total;
					  for(let i=0;i<this.memberdetails.length;i++){
						
						  let eachmsg=this.memberdetails[i];
						  
						this.axios.get(`${server}${getClientByid}`,{params:{
							 clientid: eachmsg.clientid,
						}}).then(r=>{
							if(r.data.getmsg){
								eachmsg.clientid=r.data.client.username
								
							}else{
								this.$message.error("服务错误，获取用户名失败！");
							}			
					 })  
						 
					  }					
										
				 }) 
			}else{
				 this.$message.error('用户名和时间范围不能同时为空！');
			}
		},


		
		// 将页码，及每页显示的条数以参数传递提交给后台
		getData(){	 
		   this.axios.get(`${server}${getAllByPage}`,{params:{
					 pageNum: this.currentPage,
					 pageSize:this.PageSize,
		 		}}).then(r=>{
					console.log(r.data);
		       this.memberdetails=r.data.list;
			    this.totalCount=r.data.total;
			  for(let i=0;i<this.memberdetails.length;i++){
				
				  let eachmsg=this.memberdetails[i];
				  
				this.axios.get(`${server}${getClientByid}`,{params:{
					 clientid: eachmsg.clientid,
				}}).then(r=>{
					if(r.data.getmsg){
						eachmsg.clientid=r.data.client.username
						
					}else{
						this.$message.error("服务错误，获取用户名失败！");
					}			
			 })  
				 
				 
			  }
		    
								
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
				this.getData() ;
					
		},
};
</script>

<style>
	.thispage{

		padding: 15px;

}
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>