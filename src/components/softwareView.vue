<style scoped>
#softwareView{position: absolute;top: 0;left: 0;width: 100%;height: 100%;display: table; z-index: 999;text-align: center;}
#softwareView>div{display: table-cell;vertical-align: middle;}
#softwareView>div>table{
	background-color: #fff;
	margin:auto;
	width: 640px;
	text-align: left;
	border-radius: 5px;
}
#softwareView>div>table td{
	padding:5px 10px;
}
#softwareView>div>table>tbody>tr:first-child>td{padding: 15px 10px 5px 10px;}
.o-software-head{
	text-align: center;
	background-color: #eee;
	font-weight: normal;
	border-radius: 5px 5px 0 0;
	position: relative;
}
.o-software-head>header{
	padding: 0.15rem 0;
	
}
.o-software-head>.u-icon-android{
	position: absolute;
	top: 5px;
	left:0.3rem;
	width: 0.35rem;
	height: 0.35rem;
	background-image: url(../assets/img/android.png);
	background-size:0.28rem;
}
.o-software-btn{
	text-align: center;
}
.o-software-btn>.f-btn{
	padding: 10px 70px;
	border-radius: 20px;
}

.software-td.m-input-label>label{
	float: left;
	display: inline-block;
	line-height: 0.35rem;
	width: 0.7rem;
	text-align: right;
}
.software-td.m-input-label>.box{
	margin-left: 0.7rem;
}
.software-td.m-input-label>.box>textarea{
	height: 70px;
}
.lay-mask{position:absolute;background-color: rgba(0,0,0,0.3);z-index: -1;width: 100%;height: 100%;top: 0;left: 0;}
</style>
<template>
<section id="softwareView">
	<div>
		<table>
			<thead>
				<tr>
					<th colspan="3" class="o-software-head">
						<header>软件详情</header>
						<vue-core-image-upload
						  v-if="!softwareList.packageName"
						  text="" 
				          v-bind:crop="false" 
				          :url=upload.action
				          inputAccept=".apk"
				          v-on:imageuploaded="imageuploaded"
				          v-on:imagechanged="imagechanged"
				          v-on:errorhandle="errorhandle"
				          class="u-icon-base u-icon-android"/>
				        </vue-core-image-upload>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="software-td m-input-label clr">
						<label>包名：</label>
						<div class="box"><input class="u-input-base" v-model="softwareList.packageName" placeholder="请输入软件名称" type="text" maxlength="30" /></div>
					</td>
					<td class="software-td m-input-label clr">
						<label>当前版本：</label>
						<div class="box"><input class="u-input-base" v-model="softwareList.showVersion" placeholder="请输入当前版本" type="text" maxlength="30" /></div>
					</td>
				</tr>
				<tr>
					<td class="software-td m-input-label clr">
						<label>适用版本：</label>
						<div class="box"><input class="u-input-base" v-model="softwareList.minVersion" placeholder="请输入试用版本" type="text" maxlength="30" /></div>
					</td>
					<td class="software-td m-input-label clr">
						<label>发布日期：</label>
						<div class="box"><input class="u-input-base" readonly="readonly" @click="to_laydate" id="pubDate" v-model="softwareList.pubDate" placeholder="请输入发布日期" type="text" maxlength="30" /></div>
					</td>
				</tr>
				<tr>
					<td class="software-td m-input-label clr">
						<label>版本大小：</label>
						<div class="box"><input class="u-input-base" v-model="softwareList.fileSize" placeholder="请输入版本大小" type="text" maxlength="30" /></div>
					</td>
					<td class="software-td m-input-label clr">
						<label>强制升级：</label>
						<div class="box">
							<div class="m-form-radio">
								<label><span class="radio"><input type="radio" value="0" v-model="isForce"><span></span></span><span class="text">是</span></label>
								<label><span class="radio"><input type="radio" value="1" v-model="isForce"><span></span></span><span class="text">否</span></label>
							</div>
						</div>
					</td>
					
				</tr>
				<tr>
					<td colspan="2" class="software-td m-input-label clr">
						<label>包地址：</label>
						<div class="box"><input class="u-input-base" v-model="softwareList.filepath" placeholder="请输入包地址" type="text" maxlength="30" /></div>
					</td>
					
				</tr>
				<tr>
					<td colspan="2" class="software-td m-input-label clr">
						<label>图标地址：</label>
						<div class="box"><input class="u-input-base" v-model="softwareList.logoUrl" placeholder="请输入图标地址" type="text" maxlength="30" /></div>
					</td>
				</tr>
				<tr>
					<td colspan="2" class="software-td m-input-label clr">
						<label>包简介：</label>
						<div class="box"><textarea class="u-input-base" v-model="softwareList.desc" placeholder="请输入包简介" type="text"></textarea></div>
					</td>
				</tr>
				<tr>
					<td colspan="2" class="o-software-btn">
						<a href="javascript:void(0)" @click="submitApk" class="f-btn f-btn-warning">{{type==1 ? '编辑' : '添加'}}</a>
					</td>
				</tr>
			</tbody>
			
		</table>
		<div class="lay-mask" @click="close"></div>
	</div>
</section>
</template>
<script>
require("../assets/js/laydate/laydate.js");
require("../assets/js/laydate/skins/default/laydate.css");
import VueCoreImageUpload  from 'vue-core-image-upload';
export default{
	name:'softwareView',
	props:{
		softwareList:Object,//软件包信息
		type:Number//1、修改软件包;2、添加新的软件包
	},
	data (){
		return {
			upload:{
				files:'',
				action:"http://192.168.10.11:6083/drcs/w/install/uploadAPK",// action:"http://192.168.0.6:6083/drcs/w/install/uploadAPK",
				response:''
			},
			isForce:0,
			oldSoftwareList:{}
		};
	},
	components:{
		'vue-core-image-upload': VueCoreImageUpload
	},
	created:function(){
		this.softwareList.minRunVersion==this.softwareList.targetVersion ? this.isForce=0 : this.isForce=1;
		if(this.type==2)this.softwareList.pubDate=laydate.now(0,'YYYY-MM-DD');
	},
	methods:{
		imageuploaded(res) {
			var vm=this;
	       	if(res&&res.code=="200"){
	       		vm.softwareList.packageName=res.infoList[0].packageName;
				vm.softwareList.desc=res.infoList[0].desc;
				vm.softwareList.fileSize=res.infoList[0].fileSize;
				vm.softwareList.filepath=res.infoList[0].filepath;
				vm.softwareList.logoUrl=res.infoList[0].logoUrl;
				vm.softwareList.minVersion=res.infoList[0].minVersion;
				vm.softwareList.showVersion=res.infoList[0].showVersion;
				vm.softwareList.targetVersion=res.infoList[0].targetVersion;
				vm.softwareList.minRunVersion=res.infoList[0].targetVersion;
	       	}else if(res){
	       		layer.open({
		            content:res.msg,
		            skin: 'msg',
		            time: 4,
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
            time: 2,
	      });
		},
		to_laydate(){
			var vm=this;
			laydate({
				elem:'#pubDate',
				istime:false,
				format:'YYYY-MM-DD',
				isclear:false,
				choose:function(date){
					vm.softwareList.pubDate=date;
				}
			});
		},
		submitApk(){
			var vm=this,url='';
			if(vm.type==1){//修改
				url='w/install/modify';
			}else if(vm.type==2){//添加
				url='w/install/create';
			}

			if(vm.isForce==1){//否强制更新
				vm.softwareList.minRunVersion=0;
			}else{
				vm.softwareList.minRunVersion=vm.softwareList.targetVersion;
			}
			
			if(vm.softwareList.packageName==''||vm.softwareList.desc==''||vm.softwareList.filepath==''||vm.softwareList.logoUrl==''||vm.softwareList.pubDate==''||vm.softwareList.showVersion==''||vm.softwareList.minVersion==''||vm.softwareList.fileSize==''){
				layer.open({
		            content:'全部参数不能为空',
		            skin: 'msg',
		            time: 2,
			    });
				return false;
			}

			vm.AJAX(url,vm.softwareList,function(data){
				vm.$parent.off.isShowSoftwareView=false;
				vm.$parent.getList();
				layer.open({
		            content:data.msg,
		            skin: 'msg',
		            time: 2,
			    });
			},false,true);
		},
		close(){
			var vm=this;
			vm.$parent.off.isShowSoftwareView=false;
		}
	}
}
</script>

