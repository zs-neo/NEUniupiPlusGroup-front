<template>
	<div id="loginFrame">
		<div id="loginInfo">
			<div><h1 style="color: cadetblue;">用户登录</h1></div>
			<div class="errorMsg"><span>{{msg}}</span></div>
			<div class="inputArea">账号：<input v-model="userinfo.loginname" type="text"></div>
			<div class="inputArea">密码：<input v-model="userinfo.pwd" type="text"></div>
			<hr >
			<div><button type="button" @click="login">登录</button></div>
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

<style>

	#loginFrame{
		background-image: url(../assets/img.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		height: 100%;
		width: 100%;
	}
	#loginInfo{
		background-color: aquamarine;
		border-radius: 8px;
		border: 1px solid black;
		width: 300px;
		height: 200px;
		text-align: center;
		margin: 0 auto;
		margin-top: 250px;
		background-color: rgba(240, 255, 255, 0.6);

	}
	#loginInfo button{
		text-align: center;
		border-radius:5px;
		border: 2px solid #ADD8E6; 
		background-color: cyan; 
		width: 20%;
		height: 35px;
		margin: 5px;
	}
	#loginInfo .errorMsg{
		color: red;
		font-weight: 700;
	}
	#loginInfo .inputArea{
		height: 40px;
		margin: 10px;
	}
</style>
