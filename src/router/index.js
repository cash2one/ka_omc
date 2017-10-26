import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const router=new Router({
  routes: [
    {
      path:'/home',
      component:resolve => require(['@/components/home'], resolve),
      redirect:'home/version',
      children:[
        {
          path:'version',
          component:resolve => require(['@/components/version'], resolve),
        },
        {
          path:'message',
          component:resolve => require(['@/components/message'], resolve),
        },
        {
          path:'activity',
          component:resolve => require(['@/components/activity'], resolve),
        },
      ]
    },
    {
      path:'/login',
      component:resolve => require(['@/components/login'], resolve),
    }
  ]
});

router.beforeEach((to, from, next) => {  
    
    var token = localStorage.getItem('KA_MENG_OMC');
    if (!token&&to.path!=='/login'||to.path=='/'){
        next({path:'/login'});
        return false;
    }
    next()
  
})
export default router;