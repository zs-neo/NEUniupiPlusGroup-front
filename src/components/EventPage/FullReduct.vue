<template>
	
	<el-drawer
	  title="满减管理"
	  :before-close="handleClose"
	  :visible.sync="dialog"
	  direction="ltr"
	  custom-class="demo-drawer"
	  ref="drawer"
	  >
	  <div >
	    <el-form :model="frForm" >
	      <el-form-item  label="一级满减:" label-width="100px">
			  <div style="display: inline;">
	       <el-input placeholder="门槛金额"  type="number"v-model="frForm.ofullmoney"style="max-width: 175px;">
	         <template slot="prepend" margin-left="5px">金额满</template>
	       </el-input>
	         <el-input placeholder="力度金额" type="number"v-model="frForm.oreducemoney"style="max-width: 175px;" >
				<template slot="prepend">元减</template>
	         </el-input>
			</div>
	      </el-form-item>
		    <el-divider></el-divider>
		<el-form-item  label="二级满减:"label-width="100px">
			 <div style="display: inline;">
		 <el-input placeholder="门槛金额" type="number" v-model="frForm.twfullmoney"style="max-width: 175px;">
		   <template slot="prepend" margin-left="5px">金额满</template>
		 </el-input>
		   <el-input placeholder="力度金额"type="number" v-model="frForm.twreducemoney"style="max-width: 175px;" >
		<template slot="prepend">元减</template>
		   </el-input>
		</div>
		</el-form-item>
			  <el-divider></el-divider>
			<el-form-item  label="三级满减:" label-width="100px">
				 <div style="display: inline;">
			 <el-input placeholder="门槛金额" type="number" v-model="frForm.thfullmoney"style="max-width: 175px;">
			   <template slot="prepend" margin-left="5px">金额满</template>
			 </el-input>
			   <el-input placeholder="力度金额"type="number" v-model="frForm.threducemoney"style="max-width: 175px;" >
				<template slot="prepend">元减</template>
			   </el-input>
			</div>
			</el-form-item>
			    <el-divider></el-divider>
			<el-form-item  label="四级满减:" label-width="100px">
				<div style="display: inline;">
			 <el-input placeholder="门槛金额"type="number"  v-model="frForm.ffullmoney"style="max-width: 175px;">
			   <template slot="prepend" margin-left="5px">金额满</template>
			 </el-input>
			   <el-input placeholder="力度金额"type="number"v-model="frForm.freducemoney"style="max-width: 175px;" >
			      <template slot="prepend">元减</template>
			   </el-input>
			</div>
	</el-form-item>
	<el-divider></el-divider>
				<el-form-item  label="起止日期:" :label-width="formLabelWidth">
		    <div class="block">
		      <el-date-picker
			    v-model="frForm.times"
				value-format="yyyy-MM-dd "
		        type="daterange"
		        range-separator="至"
		        start-placeholder="开始日期"
		        end-placeholder="结束日期">
		      </el-date-picker>
		    </div>
			</el-form-item>
		  <el-divider></el-divider>		
	
		<el-form-item label="是否启用:" :label-width="formLabelWidth">
		<el-switch 
		    v-model="frForm.isuse"
		   active-color="#13ce66"
		    inactive-color="#ff4949">
		</el-switch>
		</el-form-item>
	    </el-form>
	    <div class="demo-drawer__footer">
	      <el-button @click="cancelForm">取 消</el-button>
	      <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
	    </div>
	  </div>
	</el-drawer>
	
	
	
	
	
</template>

<script>
	let server = "http://localhost:8081";
	let getfrinof="/fullreduct/getAll";
	let updateFRI="/fullreduct/updateFRI"
	export default {
		data() {
			return {
			formLabelWidth: '120px',
			
			frForm: {
			        ofullmoney:"",
				    oreducemoney:"",
				    twfullmoney:"",
				    twreducemoney:"",
				    thfullmoney:"",
					thoreducemoney:"",
					ffullmoney:"",
					freducemoney:"",
					times:"",
					isuse:"",
			     },
						
				timer: null,
				dialog: false,
				loading: false,
				
	
			}
		},
		methods: {
			//处理修改满减
			 handleClose(done) {
				 let frinfo=this.returnFr();
			      if (this.loading) {
			        return;
			      }
			      this.$confirm('确定要提交表单吗？')
			        .then(_ => {
						this.axios.post(`${server}${updateFRI}`,JSON.stringify(frinfo),{
										headers: {
											'content-Type':'application/json',
										},		
									}).then(r=>{
										console.log(r.data);
										 if(r.data.updatemsg){
											 this.loading = true;
											 this.timer = setTimeout(() => {
											   done();
											   // 动画关闭需要一定的时间
											   setTimeout(() => {
											     this.loading = false;
											   }, 200);
											 }, 1000);
											  this.$message({ message: '满减修改成功！',type: 'success', center: true });					
											}else{
												this.$message({message: '修改失败,请重新尝试！', type: 'error', center: true});
											}			
										});
			    
			        })
			        .catch(_ => {});
			    },
			 cancelForm() {
			      this.loading = false;
			      this.dialog = false;
			      clearTimeout(this.timer);
			    },
			//拿到满减管理中的信息封装成对象返回
			returnFr(){
				let isuse=0;
				if(this.frForm.isuse){
					isuse=1;
				}
				let fr={
					"frname":"满"+this.frForm.ofullmoney+"元减"+this.frForm.oreducemoney+"元,"+
					"满"+this.frForm.twfullmoney+"元减"+this.frForm.twreducemoney+"元,"+
					"满"+this.frForm.thfullmoney+"元减"+this.frForm.threducemoney+"元,"+
					"满"+this.frForm.ffullmoney+"元减"+this.frForm.freducemoney+"元,",
					"frbegtime":this.frForm.times[0],
					"frendtime":this.frForm.times[1],
					"frstatus":isuse			
				}
				console.log(fr);
				return fr;
			},
			
			//点击打开满减页面
			handFr(){
					    this.dialog=true;
						console.log(this.frForm.isuse);
					    this.axios.get(`${server}${getfrinof}`).then(r=>{
					   		console.log(r.data);
							var str = r.data.frname;
							var numArr = str.match(/\d+/g);
					     	console.log(numArr);
							this.frForm.ofullmoney=numArr[0];
							this.frForm.oreducemoney=numArr[1];	
							this.frForm.twfullmoney=numArr[2];
							this.frForm.twreducemoney=numArr[3];
							this.frForm.thfullmoney=numArr[4];
							this.frForm.threducemoney=numArr[5];
							this.frForm.ffullmoney=numArr[6];
							this.frForm.freducemoney=numArr[7];
							this.frForm.times=[r.data.frbegtime,r.data.frendtime];
							if(r.data.frstatus==1)
								this.frForm.isuse=true;
					     }) 
					   
					   
			},
			
		}
	}
	
	
	
</script>

<style>
</style>
