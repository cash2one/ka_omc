<style scoped>
  @import "../assets/css/message.css";
</style>
<template>
	<section id="msg">
		<div class="m-tag-msg">新建消息</div>
		<div class="m-new-install">
			<div class="m-col-2 clr">
				<label class="fl">标题：</label>
				<div class="col-r set-title">
					<input type="text" maxlength="20" v-model="form.title" placeholder="请输入标题">
					<span>{{form.title.length}}/20</span>
				</div>
			</div>
			<div class="m-col-2 clr">
				<label class="fl">发送对象：</label>
				<div class="col-r m-form-radio set-model">
					<label><span class="radio"><input type="radio" value="1" v-model="form.model"><span></span></span><span class="text">全部</span></label>
					<label><span class="radio"><input type="radio" value="2" v-model="form.model"><span></span></span><span class="text">手动输入</span></label>
					<input type="text" v-model="form.byInput" placeholder="请输入发送对象工号ID,多个ID以‘&’分隔">
				</div>
			</div>
			<div class="m-col-2 clr">
				<label class="fl">消息内容：</label>
				<div class="col-r m-textarea">
					<textarea v-model="form.content" maxlength="140" placeholder="请输入消息内容"></textarea>
					<span>{{form.content.length}}/140</span>
				</div>
			</div>
			<div class="m-col-2 clr">
				<label class="fl">链接地址：</label>
				<div class="col-r">
					<input type="text" placeholder="请输入链接地址" v-model="form.redirectUrl">
				</div>
			</div>
			<div class="m-col-2 clr">
				<label class="fl"></label>
				<div class="col-r set-footer clr">
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
						<div><label>消息类型：</label><select><option value="600" v-model="form.type">系统消息</option></select></div>
						<div><label>有效期：</label><input @click="to_laydate" class="o-sm-input" id="expTime" v-model="form.expTime" type="text" readonly="readonly"></div>
						<div class="m-form-checkbox">
							<label><span class="checkbox"><input value="1" v-model="form.notice" type="checkbox"><span></span></span><span class="text">同时发布公告</span></label>
						</div>
					</div>
				</div>
			</div>
			<div class="f-tar"><a href="javascript:void(0)" class="f-btn f-btn-success"  @click.prevent="createMessage">发送</a></div>
		</div>
		
		<div class="m-tag-msg">历史消息<b class="b-total">{{total}}</b></div>
		<ul class="m-history-list">
			<li v-for="(todo,index) in list">
				<time>
					<div class="m-form-checkbox">
							<label><span class="checkbox"><input :value="todo.mId" type="checkbox" v-model="delMid.list"><span></span></span><span class="text"><b>{{getDateTime(todo.createTime)[3]}}日</b>{{getDateTime(todo.createTime)[1]}}</span></label>
					</div>
				</time>
				<div class="title clr"><div class="fl">标题：</div><div class="f-right">{{todo.title}}</div></div>
				<p class="context">{{todo.content}}</p>
				<a :href="todo.redirectUrl" target="_blank">{{todo.redirectUrl}}</a>
				<div class="footer">
					<div class="file u-icon-enclosure  u-icon-base"><span>附件：</span><a target="_blank" :href="todo.annex.fileUrl">{{todo.annex.fileName}}</a></div>
					<div class="o-m-2"><span>有效期：</span>{{getDateTime(todo.valideTime)[0]}}</div>
					<div class="o-m-2"><span>发送对象：</span><a href="javascript:void(0)" :name="todo.mId" @click="lookToUser">{{todo.toUser}}</a></div>
				</div>
			</li>
		</ul>
		<footer class="m-msg-handle clr" v-if="total">
			<div class="all-check fl">
				<a href="javascript:void(0)" @click="deleteMid" class="f-btn">删除</a>
				<div class="m-form-checkbox">
						<label><span class="checkbox"><input @click="allCheck" type="checkbox" v-model="delMid.off"><span></span></span><span class="text">全选</span></label>
				</div>
			</div>
			<my-page :page="pageNum" :maxpage="maxpage" :callback="callback"></my-page>
		</footer>
	</section>
</template>
<script>
require("../assets/js/laydate/laydate.js");
require("../assets/js/laydate/skins/default/laydate.css");
import pagination from "../components/page.vue";
import VueCoreImageUpload  from 'vue-core-image-upload';
export default{
	name:'msg',
	data (){
		return {
			upload:{
				files:'',
				action:"http://192.168.10.11:6083/drcs/w/sysmsg/upload",// action:"http://192.168.0.6:6083/drcs/w/sysmsg/upload",
				response:''
			},
			photo:'photo',
			form:{
				model:1,//发送对象
				byInput:'',//手动输入
				content:'',//消息内容
				redirectUrl:'',//连接地址
				type:600,//消息类型,
				expTime:'',//有效期
				notice:0,//是否发布公告
				title:''//标题
			},
			delMid:{off:0,list:[]},
			list:[],//查询数据
			total:0,//总查询条数
			pageNum:1,//当前页数
			pageSize:10,//显示条数
			maxpage:1,//最大页数
			callback:Function
		}
	},
	components:{
		'my-page':pagination,
		'vue-core-image-upload': VueCoreImageUpload
	},
	created:function(){
		this.init();
	},
	methods:{
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
		init:function(){
			var vm=this;
			vm.form.expTime=laydate.now(0,'YYYY-MM-DD');
			vm.getList();
		},
		createMessage:function(){
			var vm=this,json={'redirectUrl':vm.form.redirectUrl,'expTime':vm.form.expTime,'type':vm.form.type,'content':vm.form.content,'notice':vm.form.notice,'title':vm.form.title};
			vm.form.model==1 ? json.toUsers=1 : json.toUsers=vm.form.byInput;
			json.notice ? json.notice=1 : json.notice=0;

			if(!vm.form.title){
				layer.open({
		            content:'请输入标题',
		            skin: 'msg',
		            time: 2,
		        });
		        return false;
			}else if(vm.form.model==2&&json.toUsers==''){
				layer.open({
		            content:'请输入发送对象',
		            skin: 'msg',
		            time: 2,
		        });
		        return false;
			}else if(json.content==''){
				layer.open({
		            content:'请输入消息内容',
		            skin: 'msg',
		            time: 2,
		        });
		        return false;
			}
			var create=function(){
				vm.AJAX('w/sysmsg/create',json,function(data){
					layer.open({
			            content:'创建消息成功',
			            skin: 'msg',
			            time: 4
			        })
			        vm.form={model:1,byInput:'',content:'',redirectUrl:'',type:600,expTime:'',notice:0,title:''}
			        vm.upload.files='';
			        vm.getList();
				},false,true);
			}
			vm.upload.files!=''&&(json.annex=vm.upload.response)
			create();
			
		},
		getList:function(page){
			var vm=this;
			vm.AJAX('w/sysmsg/list',{pageNum:page||1,pageSize:vm.pageSize},function(data){
				vm.list=data.data.list
				vm.total=data.data.total;
				vm.delMid={off:0,list:[]};
				vm.upload.files='';
				vm.maxpage=Math.ceil(parseInt(data.data.total)/10);
				vm.pageNum=page||1;
				vm.callback=function(v){vm.getList(v)};
			},false,true);
		},
		lookToUser:function(e){
			var vm=this,mid=e.target.name,str='';
			vm.AJAX('w/sysmsg/receiveList',{'mid':mid},function(data){
				for(let i in data.data.list){
					str+='<li>'+data.data.list[i].uid+'</li>'
				}
				layer.open({
					content:'<ul class="f-scroll-lt lay-toUser clr">'+str+'</ul>',
					type:0,
					title:'发送对象',
					btn:0,
					style:'width:auto;'
				});
			},false,true);
		},
		allCheck:function(){
			var vm=this,getMid=function(){
				var arr=[];
				for(let i in vm.list){
					arr.push(vm.list[i].mId);
				}
				return arr;
			};
			setTimeout(function(){vm.delMid.off ?  vm.delMid.list=getMid() : vm.delMid.list=[];},100)
		},
		deleteMid:function(){
			var vm=this,mid=vm.delMid.list.join('&');
			if(!mid){
				layer.open({
		            content:'请选择删除消息',
		            skin: 'msg',
		            time: 2,
		            msgSkin:'error',
		        });
		        return false;
			}
			vm.AJAX('w/sysmsg/delMsg',{'mid':mid},function(data){
				layer.open({
		            content:'删除消息成功',
		            skin: 'msg',
		            time: 4,
		            msgSkin:'success'
		        });
		        vm.getList();
			},false,true);
		},
		to_laydate:function(){
			var vm=this;
			laydate({
				elem:'#expTime',
				istime:true,
				format:'YYYY-MM-DD',
				isclear:false,
				choose:function(date){
					vm.form.expTime=date;
				}
			});
		},
		fileterFileSize:function(size){
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
		filterFileName:function(name){
			if(!name)return ''
			let len=name.length;
			let b=name.substring(0,10);
			let s=name.substring(len-10,len);
			return len>25 ? b+'...'+s : name;
		}
	}
}
</script>

