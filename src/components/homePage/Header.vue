<template>
    <div class="header" align="right">
        <div class="header-right" >
			<div class="btn-fullscreen" @click="handleFullScreen">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i style="transform: rotate(45deg);" class="el-icon-rank"></i>
				</el-tooltip>
			</div>
			<!-- 消息中心 -->
			<div class="btn-bell">
				<el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
					<!-- <router-link to="/tabs"> -->
					<div class="bell">
						<i class="el-icon-bell"></i>
					</div>
					<!-- </router-link> -->
				</el-tooltip>
				<span class="btn-bell-badge" v-if="message"></span>
			</div>
			<!-- 用户头像 -->
				<div class="user-avator">
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link">
							<img :src="iconShowWay">
						</span>
						
						<el-dropdown-menu slot="dropdown">
							<div class="userCenter" style="width: 350px;">
								<div style="margin-bottom: 20px;">
									<div style="display: inline-block; ">
										<img style="margin-left: 10px; border-radius: 50%;height: 50px;width: 50px;" :src="iconShowWay"/>
									</div>
									<div style="display: inline-block; ">
										<div style="display: inline-block;width: 100%;" >
											<el-dropdown-item style="text-align: center;" command="userCenter">{{userinfo.username}}</el-dropdown-item>
										</div>
										<div style="display: inline-block;width: 100%;font-size: 12px;" align="center">
											角色：{{userinfo.role.rname}}
										</div>
									</div>						

								</div>
								<div>
									<el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
								</div>
							</div>
							
						
						</el-dropdown-menu>
					</el-dropdown>
					
					</div>
        </div>
    </div>
</template>
<script>
   import AdminService from '../../views/homeSubs/AdminService.js';
    export default {
        data() {
            return {
                fullscreen: false,
                message: 2,
				userinfo:{
					username:'',
					role:{
						rname:''
					},
					icon:''
				}
		
            }
        },
		computed:{
			iconShowWay(){
				if(this.userinfo.icon){
					return `http://localhost:8081/res/${this.userinfo.icon}`;
				}else{
					return require('../../../static/img/img.jpg');
				}
			}
		},
		created(){
			AdminService.getLoginAdmin(rs=>{
				this.userinfo = rs;
			})
		},
        methods:{

            // 用户名下拉菜单选择事件
            handleCommand(command) {
				console.log(command);
                if(command == 'loginout'){
               //TODO
			   //重置登录验证的全局变量
			   
                   this.$router.push('/');
				   sessionStorage.clear();
                }else if(command == 'userCenter'){
					 this.$router.push('/home/mineCenter');
				}
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        font-size: 22px;
        color: #fff;
    }

    .header-right{
		height: 100%;
		width: 300px;
		display: flex;
		line-height: 100px;
		padding-right: 100px;
		text-align: center;
    }
    .btn-fullscreen{
        -transform: rotate(45deg);
        font-size: 24px;
		flex: 1;
		height: 100%;
		padding-top: 0px;
		
    }
    .btn-bell{
        
        flex: 1;
        height: 100%;
        
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        -background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .usernameTab{
        flex: 2;
    }
    .user-avator{
        flex: 1;

		display: flex;
		align-items: center;
    }
    .user-avator img{
        border-radius: 50%;
		height: 40px;
		width: 40px;
		margin-left: 25px;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
		display: flex;
		align-items: center;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
