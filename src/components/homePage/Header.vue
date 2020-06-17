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
					<router-link to="/tabs">
						<i class="el-icon-bell"></i>
					</router-link>
				</el-tooltip>
				<span class="btn-bell-badge" v-if="message"></span>
			</div>
			<!-- 用户头像 -->
				<div class="user-avator"><img src="../../../static/img/img.jpg"></div>
				<!-- 用户名下拉菜单 -->
				<div class="usernameTab">
				<el-dropdown trigger="click" @command="handleCommand">
					<span class="el-dropdown-link">
						{{username}} <i class="el-icon-caret-bottom"></i>
					</span>
					
					<el-dropdown-menu slot="dropdown">
						<a href="" >
							<el-dropdown-item>我的信息</el-dropdown-item>
						</a>
						<el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
        </div>
    </div>
</template>
<script>
   
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                name: 'merciqiao',
                lev:'青铜级',
                message: 2
            }
        },
        computed:{
            username(){
                // let username = this.$common.getSessionStorage('username');
				 let username = "张三";
                return username ? username : this.name;
            },
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    this.$common.removeSessionStorage('token');
                    this.$router.push('/login');
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
		padding-right: 20px;
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
		align-content: center;
    }
    .user-avator img{
        border-radius: 50%;
		height: 40px;
		width: 40px;
		position: absolute;
		top: 25%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
