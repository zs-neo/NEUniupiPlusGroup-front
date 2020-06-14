<template>
<div id="loginFrame">
<div class="containers">
    <el-form label-width="80px" class="login-page" >
      <h2>秘制小厨房后台录</h2>
      <el-form-item label="用  户:" prop="username">
        <el-input v-model="userinfo.loginname" placeholder="请输入用户名">
          <el-button slot="prepend" icon="el-icon-user"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="密 码:">
        <el-input v-model="userinfo.pwd" type="password" placeholder="请输入密码">
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
	export default{
		name:'login',
		data(){
			return{
				userinfo:{
					loginname:'',
					pwd:'',
				},
				msg:'',
			};
		},
		methods:{
			//开发中假登录
			/* login:function(){
				Vue.axios.get(`http://localhost:8080/ajax-server/userinfo/login`, {params:{
					'usercode':this.userinfo.loginname,
					'userpwd':this.userinfo.pwd,
				}}).then(rs=>{
					if(rs.data.isLogin){
						this.$store.commit('validUser');
						this.$router.push({name:'Home',});
					}else{
						this.errorMsg = "密码错误！";
					}
				});
			} */
			login:function(){
				this.$router.push({name:'Home',});
			},
		},
	}
</script>

	<style >

	#loginFrame{
		background-image: url(../assets/img.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		height: 100%;
		width: 100%;
	}
	.containers {

	  margin-top: 200px;
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
