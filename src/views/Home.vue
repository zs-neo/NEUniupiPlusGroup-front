<template>
  <div class="home">
      <div class="home_head">
	 <Header></Header>

      </div>
<!-- 	  <Tags></Tags> -->
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
	import Header from '@/components/homePage/Header.vue';
	import Tags from '@/components/homePage/Tags.vue';
    export default {
        data() {
            return {
                nickname:'',
                pic:'',
            }
        },
		components:{
			SideBar,
			Header,
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
	    overflow: hidden;
        .home_head{
            flex: 1;;
			width: 100%;
            background-color: #07c4a8;
            display: flex;
            >div{
               position: relative;
                   -webkit-box-sizing: border-box;
                   box-sizing: border-box;
                   width: 100%;
                   height: 70px;
                   font-size: 22px;
            }
            .headpic{

            }
            .headname{
                line-height: 40px;
            }
        }
        .home_content{
            flex:10;
        
            display: flex;
			height: 100%;
		    overflow-y: scroll;
			
            .home_content_left{
                flex:1;
				background-color: #324157;
				text-align: left;
				
            }
            .home_content_right{
                flex:5;
				padding: 0.625rem;
				width: 75%;
	
          
            }
        }
    }
	
	.nav-tab{
		height: 50px;
		width: 100%;
		border-bottom: lightgreen solid 1px;
	}
</style>