<style scpoed>
  @import "../assets/css/version.css";   
</style>
<template>
  <div class="f-fullscreen" id="version">
	<header class="m-crumb">
		<a href="javascript:void(0)" @click="crumbShift(1)">项目列表</a>
		<span class="line u-icon-base" v-if="off.model!=1"></span>
		<a href="javascript:void(0)" @click="crumbShift(2)" :class="{active:off.model==2}" v-if="off.model!=1">产品列表</a>
		<span class="line u-icon-base" v-if="off.model==3"></span>
		<a href="javascript:void(0)" class="active" v-if="off.model==3">软件列表</a>
	</header>
	<table class="u-table-base m-version-list">
		<thead>
			<tr v-if="off.model==1">
				<th><a href="javascript:void(0)" class="u-icon-base u-icon-add" @click="addItem" title="添加"></a></th>
				<th>项目名称</th>
				<th>产品总数</th>
				<th></th>
			</tr>
			<tr v-if="off.model==2">
				<th><a href="javascript:void(0)" class="u-icon-base u-icon-add" @click="addItem" title="添加"></a></th>
				<th>产品名称</th>
				<th>软件总数</th>
				<th></th>
			</tr>
			<tr v-if="off.model==3">
				<th><a href="javascript:void(0)" class="u-icon-base u-icon-add" @click="addItem" title="添加"></a></th>
				<th>软件名称</th>
				<th>版本号</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			<tr v-if="off.model==1" v-for="(item,index) in list" @click="getList(2,item.id,item.pid)">
				<td>{{ (index+1) }}</td>
				<td>{{ item.projectName }}</td>
				<td>{{ item.packageNum }}</td>
				<td class="m-handle">
					<a href="javascript:void(0)" :name="index" @click="details" class="u-icon-base u-icon-details" title="详情"></a>
					<a href="javascript:void(0)" :name="index" @click="deleteItem" class="u-icon-base u-icon-delete" title="删除"></a>
				</td>
			</tr>
			<tr v-if="off.model==2" v-for="(item,index) in list" @click="getList(3,item.id,item.pid)">
				<td>{{ (index+1) }}</td>
				<td>{{ item.projectName }}</td>
				<td>{{ item.packageNum }}</td>
				<td class="m-handle">
					<a href="javascript:void(0)" :name="index" @click="details" class="u-icon-base u-icon-details" title="详情"></a>
					<a href="javascript:void(0)" :name="index" @click="deleteItem" class="u-icon-base u-icon-delete" title="删除"></a>
				</td>
			</tr>
			<tr v-if="off.model==3" v-for="(item,index) in list">
				<td>{{ (index+1) }}</td>
				<td>{{ item.packageName }}</td>
				<td>{{ item.showVersion }}</td>
				<td class="m-handle">
					<a href="javascript:void(0)" :name="index" @click="details" class="u-icon-base u-icon-details" title="详情"></a>
					<a href="javascript:void(0)" :name="index" @click="deleteItem" class="u-icon-base u-icon-delete" title="删除"></a>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="u-no-data" v-if="!list.length">暂无数据</div>
	<software-view v-if="off.isShowSoftwareView" :type="softwareType" :softwareList="softwareList">

	</software-view>
  </div>
</template>
<script>
import softwareView from '../components/softwareView';
export default {
  name: 'version',
  data () {
    return {
      off:{
		model:1,//1、项目列表;2、产品列表;3、软件列表
		isShowSoftwareView:0
      },
      list:[],
      softwareList:{},
      softwareType:0,
      pid:0,
      id:0,
    };
  },
  components:{
	'software-view':softwareView
  },
  created:function(){
    this.getList();
  },
  methods:{
  	  crumbShift(model){
		var vm=this;
		vm.off.model=model;
		vm.pid=vm.id;
		vm.getList();
  	  },
  	  getList(model,id,pid){
		var vm=this,url='';
		model&&(vm.off.model=model);
		id&&(vm.pid=id);
		pid&&(vm.id=pid);
		if(vm.off.model==1){//获取项目列表
			url='w/proj/queryByPage';
		}else if(vm.off.model==2){//获取产品列表
			url='w/proj/queryProductByPage';
		}else if(vm.off.model==3){//获取软件列表
			url='w/install/queryByPage';
		}
		vm.AJAX(url,{pageSize:10,pageNum:0,pid:vm.pid},function(data){
			vm.list=data.data;
		},false,true);
  	  },
  	  deleteItem(event){//删除
  	  	event.stopPropagation ? event.stopPropagation() : window.event.cancelBubble = true;

		var vm=this,index=event.target.name,model=vm.off.model,url='';
		model!=3 ? url='w/proj/deleteByIds' : url='w/install/deleteByIds';
		layer.open({
			content:'是否确定执行删除操作？',
			style:'width:auto',
			btn:['确定','取消'],
			yes:function(){
				vm.AJAX(url,{projIds:vm.list[index].id},function(data){
					layer.open({
		                content:'删除成功',
		                skin: 'msg',
		                time: 2
		            });
		            vm.getList();
				},false,true);
			}
		});
  	  },
  	  details(event){//详情/编辑
		event.stopPropagation ? event.stopPropagation() : window.event.cancelBubble = true;

		var vm=this,index=event.target.name,model=vm.off.model,params={
			id:vm.list[index].id,
			pid:vm.list[index].pid,
			type:1,
			url:'w/proj/modify',
			callback(){
				vm.getList(false,false,vm.list[index].pid);
			}
		};
		if(model==1){
			params.list=[
				{name:'项目名称',value:vm.list[index].projectName},
				{name:'项目简介',value:vm.list[index].desc}
			];
			vm.popLayerEdit(params);
		}else if(model==2){
			params.list=[
				{name:'产品名称',value:vm.list[index].projectName},
				{name:'产品简介',value:vm.list[index].desc}
			];
			vm.popLayerEdit(params);
		}else if(model==3){
			vm.softwareList=vm.list[index];
			vm.off.isShowSoftwareView=true;
			vm.softwareType=1;
		}
		
  	  },
  	  addItem(){//添加
		var vm=this,model=vm.off.model,params={
			id:vm.id,
			pid:vm.pid,
			type:1,
			url:'w/proj/create',
			callback(){
				vm.getList();
			}
		};
		if(model==1){
			params.list=[
				{name:'项目名称',value:''},
				{name:'项目简介',value:''}
			];
			vm.popLayerEdit(params,true);
		}else if(model==2){
			params.list=[
				{name:'产品名称',value:''},
				{name:'产品简介',value:''}
			];
			vm.popLayerEdit(params,true);
		}else if(model==3){
			vm.softwareList={
				"createTime":"",
				"desc":"",
				"fileSize":"",
				"filepath":"",
				"logoUrl":"",
				"pid":vm.pid,
				"minRunVersion":0,
				"minVersion":"",
				"packageName":"",
				"pluginList":"",
				"pubDate":"",
				"showVersion":"",
				"targetVersion":'',
				"updateTime":""};
			vm.off.isShowSoftwareView=true;
			vm.softwareType=2;
		}
		
  	  },
  	  popLayerEdit(params,isAdd){
		var layerIndex,vm=this;
		layerIndex=layer.open({
			content:`<div class="o-layer-detailsEdit">
						<div class="m-input-label clr">
							<label>${params.list[0].name}：</label>
							<div class="box"><input class="u-input-base" placeholder="请输入${params.list[0].name}" type="text" id="input_1" value="${params.list[0].value}" maxlength="30" /></div>
						</div>
						<div class="m-input-label clr">
							<label>${params.list[1].name}：</label>
							<div class="box"><textarea class="u-input-base" placeholder="请输入${params.list[1].name}" type="text" id="input_2" maxlength="255">${decodeURI(params.list[1].value)}</textarea></div>
						</div>
					<div>`,
			type:1,
			title:'详情',
			btn:isAdd ? ['添加','取消'] : ['编辑','取消'],
			yes:function(){	
				var json,input_1=document.getElementById('input_1').value,input_2=document.getElementById('input_2').value;

				if(!input_1||!input_2){
					layer.open({
		                content:'输入内容不能为空',
		                skin: 'msg',
		                time: 2
		            });
		            return false;
				}

				json={id:params.id,projectName:input_1,desc:encodeURI(input_2),pid:params.pid};
				
				vm.AJAX(params.url,json,function(data){
					layer.close(layerIndex);
					layer.open({
		                content:'操作成功',
		                skin: 'msg',
		                time: 2
		            });
		            params.callback();
				},false,true);
			}
		});
  	  }
  }
};
</script>




