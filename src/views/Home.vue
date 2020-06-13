<template>
  <div class="home">
      <div class="home_head">
          <div class="headpic">
              <el-avatar :src="pic"></el-avatar>
          </div>
          <div class="headname">
              {{nickname}}
          </div>

      </div>
      <div class="home_content">
          <div class="home_content_left">

          </div>
          <div class="home_content_right">
              <router-view></router-view>
          </div>
      </div>
  </div>
</template>

<script>

    import HomeService from './HomeService';
	import SideBar from '@/src/components/homePage/SideBar.vue';
    export default {
        data() {
            return {
                nickname:'',
                pic:'',
            }
        },
		components:{
			SideBar,
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
            >div{
                height: 40px;
                -background-color: red;
                margin: 5px;
                margin-top: 20px;
            }
            .headpic{

            }
            .headname{
                line-height: 40px;
            }
        }
        .home_content{
            flex:8;
        
            display: flex;
			height: 100%;
            .home_content_left{
                flex:1;
				background-color: #324157;
				text-align: left;
				
            }
            .home_content_right{
                flex:5;
          
            }
        }
    }

</style>