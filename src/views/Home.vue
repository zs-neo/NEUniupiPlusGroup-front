<template>
	<div class="home">
	      <div class="home_head">
			  <div class="home-head-left">
				  <HeadBar></HeadBar>
			  </div>
			  <div class="home-head-right">
				  <Header></Header>
			  </div>
	      </div>
	      <div class="home_content">
	          <div class="home_content_left">
				<SideBar></SideBar>

			</div>
			<div class="home_content_right">
				<div class="showPage">
					<div class="nav-tab">
						<Tags></Tags>
					</div>
					<div class="pageContent">
						<router-view></router-view>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import SideBar from '@/components/homePage/SideBar.vue';

	import HeadBar from '@/components/homePage/HeadBar.vue';
	import Header from '../components/homePage/Header.vue';

	import Tags from '../components/homePage/Tags.vue';    
	import Vue from 'vue';
	import AdminService from './homeSubs/AdminService.js';
	export default {
        data() {
            return {
				userinfo:{
				},
                nickname:'',
                pic:'',

            }
        },
		components:{
			SideBar,HeadBar,Header, Tags},
        computed: {

  


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
	           flex: 1;
				width: 100%;
				// background-color: rgb(40, 43, 51, 0.1);
				background: rgb(57, 68, 90);
				display: flex;
				.home-head-left {
					flex: 5;
				}
				.home-head-right {
					flex: 5;
				}
			}
			.home_content{
				flex:10;
			
				display: flex;
				height: 100%;
				overflow-y: auto;



				.home_content_left {
					display: inline-block;
					background-color: #324157;
					text-align: left;

					}
					 .home_content_right{
						flex:5;
						width: 80%;
						
						display: inline-block;
				  
					}
				}
			}

	.showPage {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}


	.showPage .nav-tab {
		flex: 1;
		border-bottom: lightgreen solid 1px;
	}


	.showPage .pageContent {
		overflow: auto;
		flex: 15;
	}
</style>
