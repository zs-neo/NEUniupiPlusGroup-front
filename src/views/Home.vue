<template>
  <div class="home">
      <div class="home_head">
		<HeadBar></HeadBar>
      </div>
      <div class="home_content">
          <div class="home_content_left">
				<SideBar></SideBar>
          </div>
          <div class="home_content_right">
			  <div class="nav-tab">
				  
			  </div>
              <router-view></router-view>
          </div>
      </div>
  </div>
</template>

<script>
	import SideBar from '@/components/homePage/SideBar.vue';
	import HeadBar from'@/components/homePage/HeadBar.vue';
    export default {
        data() {
            return {
                nickname:'',
                pic:'',
            }
        },
		components:{
			SideBar,HeadBar,
		},
        computed: {

        },
        created(){
			/* 
			判断用户是否登录以及获取用户信息
			if(!this.$store.getters.getUserState){
				 this.$message.error('请先登录！！！');
				 this.$router.push({name:'Login'});
			}
            HomeService.getUser(r=>{
                console.log(r);
				this.nickname = r.nickname;
				this.pic = 'http://localhost:8080/ajax-server/upload/'+r.pic;
				//http://localhost:8080/ajax-server/userinfo
            }); */
        },
        methods: {
           
        }
    }
</script>

<style lang="less">

    .home{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        .home_head{
            flex:1;
			width: 100%;
            background-color: lightskyblue;
            display: flex;
        }
        .home_content{
            flex:8;
        
            display: flex;
			height: 100%;
            .home_content_left{
                display: inline-block;
				background-color: #324157;
				text-align: left;
            }
            .home_content_right{
                width: 100%;
				display: inline-block;
          
            }
        }
    }
	
	.nav-tab{
		height: 50px;
		width: 100%;
		border-bottom: lightgreen solid 1px;
	}
</style>