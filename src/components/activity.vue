<style scpoed>
  @import "../assets/css/message.css";
  .m-time-area>input{
    width: 1.6rem !important;
    text-align: center;
  }
  .m-time-area>span{
    padding: 0 5px;
  }
  #timeoutTime, #timeoutDay{width: 1rem;}
  #timeoutDay{margin-left: 0.26rem;text-align: center;}
  .set-footer-act>.fr{
    margin-right: 0.7rem;
  }
  .set-footer-act .u-icon-img{
    margin-top: 15px;
  }
  .set-footer-act .m-upload-box{
    top: 0.16rem;
    left: 0.3rem;
  }
  .set-giveRule{
    line-height: 0.34rem;
  }
  .set-giveRule>p input{
    width:0.8rem !important;
    text-align: center;
    height: 0.3rem !important;
  }
  .set-giveRule>p>.m-l{
    margin-left: 0.2rem;
  }
  .set-giveRule>p>label{
    margin-right: 5px;
    color: #996706;
  }
  .set-giveRule>p>.u-icon-base{
    width: 0.25rem;
    height: 0.25rem;
    margin-bottom: 2px;
    margin-left:0.4rem;
  }
  .u-icon-money, .u-icon-more, .u-icon-deleteRule, .u-icon-sql{
    display: inline-block;
    vertical-align: middle;
  }
  .u-icon-money{
    margin-left: 2px;
    margin-bottom: 3px;
    background-image: url(../assets/img/money.png);
    width: 0.15rem;
    height: 0.15rem;
    background-size: 0.15rem;
  }
  .u-icon-more{
    background-image: url(../assets/img/more_2.png);
    background-size: 0.25rem;
  }
  .u-icon-more:hover{
    background-image: url(../assets/img/more_1.png);
  }
  .u-icon-sql{
    background-image: url(../assets/img/sql.png);
    width: 0.3rem;
    height: 0.3rem;
    background-size: 0.3rem;
    margin-bottom:3px;
    margin-left:5px;
  }
  .u-icon-deleteRule{
    background-image: url(../assets/img/delete_1.png);
    background-size: 0.2rem;
  }
  .m-history-list>li>.footer{
    line-height: 0.34rem;
  }
  .m-history-list>li>.footer>.f-btn{
    padding:7px 10px;
    margin-top:7px;
    margin-right: 0.2rem;
    border-radius:0.2rem;
  }
  .o-sql{
    color:#E9C342;
    font-size: 0.18rem !important;
  }
  .o-sql::-webkit-input-placeholder{ color: #E9C342}
  .o-sql::-moz-placeholder{color: #E9C342}
  .o-sql:-ms-input-placeholder{color: #E9C342}
  .o-sql::placeholder{color: #E9C342}
</style>
<template>
  <div class="f-fullscreen" id="activity">
	 <div class="m-tag-msg">新建活动</div>
   <div class="m-new-install">
      <div class="m-col-2 clr">
        <label class="fl">活动标题：</label>
        <div class="col-r set-title">
          <input type="text" maxlength="30" v-model="form.title" placeholder="请输入标题">
          <span>{{form.title.length}}/30</span>
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl">起止时间：</label>
        <div class="col-r m-time-area">
          <input type="text" readonly="readonly" @click="to_laydate(1)" id="startTime" v-model="form.startTime">
          <span>至</span>
          <input type="text" readonly="readonly" @click="to_laydate(2)" id="endTime" v-model="form.endTime">
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl">适用对象：</label>
        <div class="col-r m-form-radio">
          <label><span class="radio"><input type="radio" value="1" v-model="form.userType"><span></span></span><span class="text">商户ID</span></label>
          <label><span class="radio"><input type="radio" value="2" v-model="form.userType"><span></span></span><span class="text">工号ID</span></label>
          <label><span class="radio"><input type="radio" value="3" v-model="form.userType"><span></span></span><span class="text u-icon-base u-icon-sql"></span></label>
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl"></label>
        <div class="col-r">
          <input type="text" v-if="form.userType==1" v-model="form.userInfo" placeholder="请输入商户ID">
          <input type="text" v-if="form.userType==2" v-model="form.userInfo" placeholder="请输入工号ID">
          <input type="text" class="o-sql" v-if="form.userType==3" v-model="form.userInfo" placeholder="请输入SQL语句">
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl">赠送方式：</label>
        <div class="col-r m-form-radio">
          <label><span class="radio"><input type="radio" value="1" v-model="form.deductionType"><span></span></span><span class="text">现金</span></label>
          <!-- <label><span class="radio"><input type="radio" value="2" v-model="form.deductionType"><span></span></span><span class="text">折扣券</span></label>
          <label><span class="radio"><input type="radio" value="3" v-model="form.deductionType"><span></span></span><span class="text">代金券</span></label> -->
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl">有效期：</label>
        <div class="col-r m-form-radio">
          <label><span class="radio"><input type="radio" value="1" v-model="form.timeoutType"><span></span></span><span class="text">不失效</span></label>
        </div>
      </div>
      <!-- <div class="m-col-2 clr">
        <label class="fl"></label>
        <div class="col-r m-form-radio">
          <label><span class="radio"><input type="radio" value="2" v-model="form.timeoutType"><span></span></span><span class="text">失效时间</span></label>
          <input type="text" readonly="readonly" @click="to_laydate(3)" id="timeoutTime" v-model="form.timeoutTime">
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl"></label>
        <div class="col-r m-form-radio">
          <label><span class="radio"><input type="radio" value="3" v-model="form.timeoutType"><span></span></span><span class="text">N+T</span></label>
          <input type="number" min="0" max="100" placeholder="天数" id="timeoutDay" v-model="form.timeoutDay">
        </div>
      </div> -->
      <div class="m-col-2 clr">
        <label class="fl">赠送规则：</label>
        <div class="col-r set-giveRule">
          <p v-for="(item,index) in form.giveRule">
            <label>充值<span class="u-icon-base u-icon-money"></span></label>
            <input type="number" v-model="item.minMoney" placeholder="金额" min="0">
            <span>—</span>
            <input type="number" v-model="item.maxMoney" placeholder="金额" min="0">
            <label class="m-l">赠送<span class="u-icon-base u-icon-money"></span></label>

            <span v-if="form.deductionType!=2">
              <input type="number" v-model="item.deductionValue" placeholder="金额" min="0">
              元
            </span>
            <span v-if="form.deductionType==2">
              <input type="number" v-model="item.deductionValue" placeholder="折扣" min="0">
              %
            </span>
            <a href="javascript:void(0)" @click="addGiveRule" v-if="form.giveRule.length==(index+1)" class="u-icon-base u-icon-more"></a>
            <a href="javascript:void(0)" @click="deleteGiveRule(index)" v-else class="u-icon-base u-icon-deleteRule"></a>
          </p>
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl">赠送次数：</label>
        <div class="col-r">
          <input style="width:100px;text-align:center" type="number" min="0" max="100" placeholder="次数" v-model="form.sendNums">
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl">使用范围：</label>
        <div class="col-r m-form-checkbox">
          <label><span class="checkbox"><input type="checkbox" value="1" v-model="form.deductionOn"><span></span></span><span class="text">预存话费</span></label>
          <!-- <label><span class="checkbox"><input type="checkbox" value="2" v-model="form.deductionOn"><span></span></span><span class="text">账户充值</span></label>
          <label><span class="checkbox"><input type="checkbox" value="3" v-model="form.deductionOn"><span></span></span><span class="text">远特充值</span></label>
          <label><span class="checkbox"><input type="checkbox" value="4" v-model="form.deductionOn"><span></span></span><span class="text">缴纳保证金</span></label> -->
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl">活动内容：</label>
        <div class="col-r m-textarea">
          <textarea v-model="form.describeInfo" maxlength="140" placeholder="请输入活动内容"></textarea>
          <span>{{form.describeInfo.length}}/140</span>
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl">链接地址：</label>
        <div class="col-r">
          <input type="text" placeholder="请输入链接地址" v-model="form.linkUrl">
        </div>
      </div>
      <div class="m-col-2 clr">
        <label class="fl"></label>
        <div class="col-r set-footer clr set-footer-act">
          <div class="fl">
            <vue-core-image-upload
              text="" 
                  v-bind:crop="false" 
                  :url=upload.action
                  extensions="png,gif,jpeg,jpg"
                  v-on:imageuploaded="imageuploaded"
                  v-on:imagechanged="imagechanged"
                  v-on:errorhandle="errorhandle"
                  class="u-icon-img u-icon-base"/>
                </vue-core-image-upload>
            <div class="m-upload-box">
              <div class="filename">{{filterFileName(upload.files.name)}}</div>
              <div class="clr size">{{fileterFileSize(upload.files.size)}}<!-- <span class="fr">{{file.progress}}</span> --></div>
            </div>
          </div>
          <div class="fr">
            <div><label>发送时间：</label><input @click="to_laydate(4)" class="o-md-input" id="msgTime" v-model="form.msgTime" type="text" readonly="readonly"></div>
            <div class="m-form-checkbox">
              <label><span class="checkbox"><input value="1" v-model="form.notice" type="checkbox"><span></span></span><span class="text">同时发布公告</span></label>
            </div>
            <a href="javascript:void(0)" v-if="!off.isDetails" class="f-btn f-btn-success"  @click.prevent="createActivity">发送</a>
            <a href="javascript:void(0)" v-if="off.isDetails" class="f-btn f-btn-warning"  @click.prevent="clearForm">清空</a>
          </div>
        </div>
      </div>
    </div>

    <!--//////////////////////////////////////////////////////////////////-->

    <div class="m-tag-msg">历史活动<b class="b-total">{{total}}</b></div>
    <ul class="m-history-list">
      <li v-for="(todo,index) in list">
        <time>
          <div class="m-form-checkbox">
              <label><span class="checkbox"><input type="checkbox"><span></span></span><span class="text"><b>{{getDateTime(todo.createTime)[3]}}日</b>{{getDateTime(todo.createTime)[1]}}</span></label>
          </div>
        </time>
        <div class="title clr"><div class="fl">标题：</div><div class="f-right">{{todo.title}}</div></div>
        <p class="context">{{todo.describeInfo}}</p>
        <a :href="todo.linkUrl" target="_blank">{{todo.linkUrl}}</a>
        <div class="footer clr">
          <div class="file u-icon-enclosure  u-icon-base"><span>附件：</span><a target="_blank" :href="todo.annex.fileUrl">{{todo.annex.fileName}}</a></div>
          <div class="o-m-2"><span>有效期：</span>{{getDateTime(todo.endTime)[0]}}</div>
          <div class="o-m-2"><span>适用对象：</span>{{todo.userType}}</div>
          <a href="javascript:void(0)" @click="detialsActivity(todo.code)" class="f-btn f-btn-warning fr">查看详情</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
require("../assets/js/laydate/laydate.js");
require("../assets/js/laydate/skins/default/laydate.css");
import pagination from "../components/page.vue";
import VueCoreImageUpload  from 'vue-core-image-upload';
export default {
  name: 'activity',
  data () {
    return {
      upload:{
        files:'',
        action:"http://192.168.10.11:6083/drcs/w/sysmsg/upload",// action:"http://192.168.0.6:6083/drcs/w/sysmsg/upload",
        response:''
      },
      off:{
        isDetails:0,
      },
      photo:'photo',
      form:{
        startTime:0,
        endTime:0,
        userType:1,//适用对象type
        userInfo:'',//适用对象value
        deductionType:1,//赠送方式
        linkUrl:'',//连接地址
        msgTime:'',//发送时间
        timeoutType:1,//有效期类型
        timeoutTime:'',//有效期时间
        timeoutDay:'',//有效天数N+T
        deductionOn:[1],//使用范围
        describeInfo:'',//活动内容
        notice:1,//是否发布公告
        title:'',//标题
        sendNums:0,//赠送次数
        giveRule:[{
          minMoney:'',
          maxMoney:'',
          deductionValue:'',
        }]
      },
      list:[],//历史活动
      total:0,//总查询条数
    };
  },
  components:{
    'vue-core-image-upload': VueCoreImageUpload
  },
  created:function(){
    var vm=this;
    vm.form.startTime=laydate.now(0,'YYYY-MM-DD hh:mm:ss');
    vm.form.endTime=laydate.now(0,'YYYY-MM-DD hh:mm:ss');
    vm.form.timeoutTime=laydate.now(0,'YYYY-MM-DD');
    vm.form.msgTime=laydate.now(0,'YYYY-MM-DD hh:mm:ss');

    vm.getHistoryList();
  },
  methods:{
    createActivity(){//新建活动
      var vm=this,json={
        startTime:vm.get_unix_time(vm.form.startTime),
        endTime:vm.get_unix_time(vm.form.endTime),
        userType:vm.form.userType,//适用对象type
        userInfo:encodeURI(vm.form.userInfo),//适用对象value
        deductionType:vm.form.deductionType,//赠送方式
        content:vm.form.giveRule,//赠送规则
        linkUrl:encodeURI(vm.form.linkUrl),//连接地址
        msgTime:vm.get_unix_time(vm.form.msgTime),//发送时间
        timeoutType:vm.form.timeoutType,//有效期类型
        deductionOn:vm.form.deductionOn.join(','),//使用范围
        describeInfo:encodeURI(vm.form.describeInfo),//活动内容
        notice:vm.form.notice,//是否发布公告
        title:encodeURI(vm.form.title),//标题
        annex:vm.upload.response,//文件
        sendNums:vm.form.sendNums//赠送次数
      },giveRule=[];

	  Array.from(vm.form.giveRule,(value,index)=>{
	  	giveRule.push({
	  		deductionValue:(parseFloat(value.deductionValue)*100).toFixed(2),
	  		maxMoney:(parseFloat(value.maxMoney)*100).toFixed(2),
	  		minMoney:(parseFloat(value.minMoney)*100).toFixed(2),
	  	});
      });
	  json.content=giveRule;
      if(json.timeoutType==1){
        json.timeoutValue=0;
      }else if(json.timeoutType==2){
        json.timeoutValue=vm.get_unix_time(vm.form.timeoutTime);
      }else if(json.timeoutType==3){
        json.timeoutValue=vm.form.timeoutDay;
      }
      if(!vm.varifyForm(json))return false;

      vm.AJAX('w/activity/create',json,function(data){
        layer.open({
            content:'创建活动成功',
            skin: 'msg',
            time: 4,
            msgSkin:'success'
        });
        vm.clearForm();
        vm.getHistoryList();
      },false,true);
    },
    varifyForm(json){//表单验证
      var text='';
      if(!json.title){
        text='请输入标题';
      }else if(json.startTime>=json.endTime){
        text='起止时间格式错误';
      }else if(!json.userInfo){
        if(json.userType==1){
          text='请输入商户ID';
        }else if(json.userType==2){
          text='请输入工号ID';
        }else if(json.userType==3){
          text='请输入SQL语句';
        }
      }else if(json.timeoutType==3&&json.timeoutValue==''){
        text='请输入有效天数';
      }else if(json.content[0].minMoney==''||json.content[0].maxMoney==''||json.content[0].deductionValue==''){
        text='请输入赠送规则';
      }else if(!json.deductionOn){
        text='请选择使用范围';
      }else if(!json.describeInfo){
        text='请输入活动内容';
      }else if(!json.linkUrl){
        text='请输入连接地址';
      }else if(!json.annex){
        text='请选择文件';
      }else if(json.sendNums===''){
        text='请输入赠送次数';
      }
      if(text){
          layer.open({
            content:text,
            skin: 'msg',
            time: 2
          });
        return false;
      }else{
        return true;
      }
      
    },
    getHistoryList(){//获取历史活动列表
      var vm=this;
      vm.AJAX('w/activity/list',{},function(data){
        vm.list=data.data.list;
        vm.total=data.data.total;
      },false,true);
    },
    clearForm(){//清空表单
      var vm=this;
      vm.form={
        startTime:laydate.now(0,'YYYY-MM-DD hh:mm:ss'),
        endTime:laydate.now(0,'YYYY-MM-DD hh:mm:ss'),
        userType:1,
        userInfo:'',
        deductionType:1,
        linkUrl:'',
        msgTime:laydate.now(0,'YYYY-MM-DD'),
        timeoutType:1,
        timeoutTime:laydate.now(0,'YYYY-MM-DD'),
        timeoutDay:'',
        deductionOn:[],
        describeInfo:'',
        notice:0,
        title:'',
        sendNums:0,
        giveRule:[{
          minMoney:'',
          maxMoney:'',
          deductionValue:'',
        }]
      };
      vm.off.isDetails=0;
    },
    detialsActivity(code){//查看活动详情
      var vm=this,domMain=document.getElementById('app');
      vm.AJAX('w/activity/info',{code:code},function(data){

        Array.from(data.data.content,x=>{
          x.minMoney=(parseFloat(x.minMoney)/100).toFixed(2),
          x.maxMoney=(parseFloat(x.maxMoney)/100).toFixed(2),
          x.deductionValue=(parseFloat(x.deductionValue)/100).toFixed(2)
        });

        vm.form.title=data.data.title;
        vm.form.userType=data.data.userType;
        vm.form.userInfo=data.data.userInfo;
        vm.form.startTime=vm.getDateTime(data.data.startTime)[0];
        vm.form.endTime=vm.getDateTime(data.data.endTime)[0];
        vm.form.deductionType=data.data.deductionType;
        vm.form.timeoutType=data.data.timeoutType;
        if(data.data.timeoutType==2){
          vm.form.timeoutTime=vm.getDateTime(data.data.timeoutValue)[2];
        }else if(data.data.timeoutType==3){
          vm.form.timeoutDay=data.data.timeoutValue;
        }
        vm.form.giveRule=data.data.content;
        vm.form.deductionOn=data.data.deductionOn.split(',');
        vm.form.describeInfo=data.data.describeInfo;
        vm.form.linkUrl=data.data.linkUrl;
        vm.form.msgTime=vm.getDateTime(data.data.msgTime)[2];
        vm.form.notice=data.data.notice;
        vm.form.sendNums=data.data.sendNums;
        domMain.scrollTop=0;
        vm.off.isDetails=1;
      },false,true);
      
    },
    addGiveRule(){//增加赠送规则
      var vm=this,len=vm.form.giveRule.length;
      if(vm.form.giveRule.length>=10){
        layer.open({
          content:'最多添加10个规则',
          skin:'msg',
          time:2
        });
        return false;
      }
      for(let v of vm.form.giveRule){
        if(!v.minMoney||!v.maxMoney||!v.deductionValue){
          layer.open({
            content:'赠送规则,格式错误',
            skin:'msg',
            time:2
          });
          return false;
        }
      };

      vm.form.giveRule.push({
          minMoney:vm.form.giveRule[len-1].maxMoney,
          maxMoney:'',
          deductionValue:'',
      });
    },
    deleteGiveRule(index){//删除赠送规则
      var vm=this;
      vm.form.giveRule.splice(index,1);
    },
    to_laydate(index){
      var vm=this,obj,cb,istime=true;
      switch(index){
        case 1:
          obj='#startTime';
          cb=(date)=>{
            vm.form.startTime=date;
          };
          break;
        case 2:
          obj='#endTime';
          cb=(date)=>{
            vm.form.endTime=date;
          };
          break;
        case 3:
          obj='#timeoutTime';
          istime=false;
          cb=(date)=>{
            vm.form.timeoutTime=date;
          };
          break;
        case 4:
          obj='#msgTime';
          istime=true;
          cb=(date)=>{
            vm.form.msgTime=date;
          };
          break;
      }
      laydate({
        elem:obj,
        istime:istime,
        format:istime ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD',
        isclear:false,
        choose:function(date){
          cb(date);
        }
      });
    },
    imageuploaded(res) {
      var vm=this;
          if(res.code=="200"){
            vm.upload.response=res.data;
          }else{
            layer.open({
                content:res.msg,
                skin: 'msg',
                time: 4,
                msgSkin:'error',
            });
          }
      },
    imagechanged(res) {
      var vm=this;
      vm.upload.files=res;
    },
    errorhandle(err) {
      var vm=this;
      vm.upload.files='';
      layer.open({
          content:'上传失败',
          skin: 'msg',
          time: 4
      });
    },
    fileterFileSize(size){
        if(!size)return '';
        if (size > 1024 * 1024 * 1024 * 1024) {
          return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB';
        } else if (size > 1024 * 1024 * 1024) {
          return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
        } else if (size > 1024 * 1024) {
          return (size / 1024 / 1024).toFixed(2) + ' MB';
        } else if (size > 1024) {
          return (size / 1024).toFixed(2) + ' KB';
        }
        return size.toString() + ' B';
    },
    filterFileName(name){
      if(!name)return ''
      let len=name.length;
      let b=name.substring(0,10);
      let s=name.substring(len-10,len);
      return len>25 ? b+'...'+s : name;
    },
  }
}
</script>




