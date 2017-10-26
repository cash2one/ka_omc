<style scoped>
  @import "../assets/css/home.css";
</style>
<template>
	<div class="f-fullscreen">
		<header class="g-home-header clr">
			<div class="customer fr">
				<span class="icon u-icon-base"></span>
				<span class="customer-name">{{userInfo}}</span>
				<a class="btn-out u-icon-base" @click="signOut"></a>
			</div>
		</header>
		<aside class="g-home-aside">
			<div class="system">
				<span class="system-theme u-icon-base"></span>
				<span class="system-name">OMC</span>
			</div>
			<ul class="ul-link">
				<li><router-link to="/home/version" active-class="active"><span class="u-icon-base u-icon-version"></span>版本管理</router-link></li>
				<li><router-link to="/home/message" active-class="active"><span class="u-icon-base u-icon-message"></span>消息服务</router-link></li>
				<li><router-link to="/home/activity" active-class="active"><span class="u-icon-base u-icon-activity"></span>优惠活动</router-link></li>
			</ul>
		</aside>
		<section class="g-home-main">
			<transition appear name="fadeInUp">
				<router-view></router-view>
			</transition>
		</section>
	</div>
</template>
<script>
export default{
	name:'home',
	data (){
		return {
			off:{

			},
			userInfo:''
		}
	},
	watch:{
		'$route':'routeChange'
	},
	mounted:function(){
		this.init();
	},
	methods:{
		init:function(){//页面初始化
			const vm=this;
			vm.userInfo=localStorage.getItem('KA_MENG_OMC');
		},
		routeChange:function(){//路由变化
			//this.off.window<=960?this.off.isSlideNav=false:void 0;
		},
		signOut:function(){
			var vm=this;
			vm.AJAX('w/sysuser/logout',{'t':new Date().getTime()},function(data){
				localStorage.clear();
                location.href='#/login';
			},false,true);
		},
	}
}

</script>

