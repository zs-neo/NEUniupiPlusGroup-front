<template>

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



			width: 100%;

				flex: 5;
			}


			.home-head-right {
				flex: 5;
			}
		}


			height: 100%;



			.home_content_left {
				display: inline-block;
				background-color: #324157;
				text-align: left;

				display: inline-block;


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
		flex: 15;
	

	}
</style>
