<style scpoed>
  @import "../assets/css/login.css";   
</style>
<template>
  <div class="g-login-box">
   <div class="g-login-inner">
    <section class="login">
      <header :class="{active:off.load}">
        <span class="system-name">OMC</span>
        <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
      </header>
      <div class="m-form-login">
        <div class="form-controll"><input v-model="form.userName" placeholder="账号" type="text" maxLength="11" /><span class="line"></span></div>
        <div class="form-controll"><input v-model="form.passwd" placeholder="密码" type="password" maxLength="16" /><span class="line"></span></div>
        <div class="form-controll o-verify"><input @keydown="login" v-model="form.captcha" placeholder="验证码" type="text" maxLength="4" /><span class="o-img" @click="getVerifyCode"><img alt="验证码" :src="verifyCode" /></span></div>
        <button class="u-btn-login" @click="login()">登录</button>
      </div>
    </section>
   </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      off:{
        load:0
      },
      form:{
        userName:'',
        passwd:'',
        captcha:''
      },
      verifyCode:''
    }
  },
  mounted:function(){
    this.getVerifyCode();
  },
  methods:{
    getVerifyCode(){
      var vm=this;
      vm.off.load=true;
      vm.AJAX('w/sysuser/getAuthCode',{t:new Date().getTime()},function(data){
          vm.verifyCode=data.data.authCode;
          localStorage.setItem('BYUSS',data.data.BYUSS);
      },function(){
        vm.off.load=false;
      })
    },
    login:function(e){

      if(e&&e.keyCode!=13){
        return false;
      }

      var vm=this;
      if(vm.off.load){return false};
      if(!vm.form.userName.length){
        layer.open({
            content:'请输入账号',
            skin: 'msg',
            time: 2,
            msgSkin:'error',
        });
        return false;
      }else if(!vm.form.passwd.length){
        layer.open({
            content:'请输入密码',
            skin: 'msg',
            time: 2,
            msgSkin:'error',
        });
        return false;
      }else if(!vm.form.captcha.length){
        layer.open({
            content:'请输入验证码',
            skin: 'msg',
            time: 2,
            msgSkin:'error',
        });
        return false;
      }
      vm.off.load=true;
      vm.AJAX('w/sysuser/login',{"userName":vm.form.userName,'captcha':vm.form.captcha,'passwd':vm.form.passwd},function(data){
        localStorage.setItem('BYNID',data.BYNID);
        localStorage.setItem('KA_MENG_OMC',data.userName);
        location.href="#/home";
      },function(){
        vm.off.load=false;
        vm.getVerifyCode();
      },true);
      
    }
  }
}
</script>

