<template>
<div id="loginFrame">
<div class="containers">
    <el-form label-width="80px" status-icon class="login-page" :model="userinfo" ref="loginForm" :rules="loginRule">
      <h2>登录验证</h2>
	  <br />
      <el-form-item label="用  户:" prop="username">
        <el-input v-model="userinfo.username" placeholder="请输入用户名">
          <el-button slot="prepend" icon="el-icon-user"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="密 码:" prop="password">
        <el-input v-model="userinfo.password" placeholder="请输入密码" show-password>
          <el-button slot="prepend" icon="el-icon-key"></el-button>
        </el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-user-solid" @click="login">登 录</el-button>
    </el-form>
  </div>
 </div> 
</template>

<script>
	import Vue from 'vue';
	import { Loading } from 'element-ui';
	export default{
		name:'login',
		data(){
			return{
				userinfo:{
					username:"",
					password:"",
				},
				msg:'',
				loginRule:{
					username:[{ required: true, message: "请输入用户名", trigger: "blur" }],
					password:[
						{ required: true, message: "请输入密码", trigger: "blur" },
					],	
				}
			};
		},
		methods:{
			// TODO
			//登录验证 返回
			//开发中假登录
			login:function(){
				this.$refs.loginForm.validate(valid => {
					 if (valid) {
						 let loadingInstance = Loading.service({text: '正在登录...'});
						 Vue.axios.post(`http://localhost:8081/admin/login/${this.userinfo.username}/${this.userinfo.password}`).then(rs=>{
							loadingInstance.close();
							if(rs.data.isLogin){
								//this.$store.commit('validUser');
								sessionStorage.setItem("isLogin", true);
								this.$router.push({name:'Home',});
							}else{
								this.$message.error(rs.data.statusDesc);
							}
						});
						
					 }
				});
			}
			
		},
	}
</script>

	<style >

	#loginFrame{
		background-image: url(../assets/img.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		padding-top: 200px;
		height: 100%;
		width: 100%;
	}
	.containers {

	  /* margin-top: 200px; */
	  width: 100%;
	  height: 100%;
	}
	.login-page {
	  border-radius: 5px;
	  margin: auto;
	  width: 350px;
	  padding: 35px 55px 15px;
	  background: #fff;
	  border: 1px solid #eaeaea;
	  box-shadow: 0 0 25px #cac6c6;
	}
	</style>
</style>
