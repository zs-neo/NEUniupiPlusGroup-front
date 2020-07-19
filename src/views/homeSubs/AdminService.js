import Vue from 'vue'
import router from '@/router'
export default{

	getLoginAdmin:function(callBack){
		Vue.axios.post(`http://localhost:8081/admin/getAdminInfo`).then(rs=>{
			console.log(rs.data);
			if(rs.data.isLogin){
				callBack(rs.data.loginAdmin);
			}else{
				Vue.prototype.$message.error("登录超时，请重新登录");
				router.push("/");
			}	
		});
	}
}