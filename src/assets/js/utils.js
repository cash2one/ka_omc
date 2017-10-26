// import Vue from 'vue'
import axios from 'axios'

require('./base64.js')
var GlobalVar = function() {
    return this || (0, eval)("(this)")
}();
GlobalVar.Gshec = /^1(3|4|5|7|8)\d{9}$/, GlobalVar.Gchec = /^[0-9]*[1-9][0-9]*$/;

export default{
    install(Vue,option){
        Vue.prototype.get_unix_time=function(e) {
            var t;
            if (e) {
                var n = e.replace(/-/g, "/");
                t = new Date(n);
            } else t = new Date;
            return t.getTime().toString();
        },
        Vue.prototype.getDateTime=function(e){
            var t;
            t = e ? new Date(parseInt(e)) : new Date();
            var n = t.getFullYear(),
                a = t.getMonth()+1,
                r = t.getDate(),
                o = t.getHours(),
                i = t.getMinutes(),
                c = t.getSeconds(),
                k = [];
            a >= 10 ? a : a = "0" + a, r >= 10 ? r : r = "0" + r, o >= 10 ? o : o = "0" + o, i >= 10 ? i : i = "0" + i, c >= 10 ? c : c = "0" + c,k[0]=n + "-"+a+"-"+r+ " " + o + ":" + i + ":" +c,k[1]=a+'月'+n + "年" + " " + o + ":" + i + ":" +c,k[2]=n + "-"+a+"-"+r,k[3]=r;
            return k;
        },
        Vue.prototype.getUrlParam=function(e) {
            var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
                n = window.location.search.substr(1).match(t);
            return null != n ? unescape(n[2]) : null
        },
        Vue.prototype.AJAX=function(url,postData,success,closeLoad,closeBase64){
            var xhr,index;
            !closeLoad&&(index=layer.open({type: 2,shadeClose:false,shade: 'background-color: rgba(255,255,255,0)'}));

            const error=(data)=>data.code=="666"||data.code=="403" ? layer.open({
                content:'登录已过期，请重新登录',
                style:'width:auto;',
                btn:['确定'],
                shadeClose:false,
                yes:function(){
                    window.localStorage.clear();
                    window.location.href='#/login';
                    layer.closeAll();
                }
            }) : layer.open({
                content:data.msg,
                skin: 'msg',
                time: 2
            });
            let BYUSS=localStorage.getItem('BYUSS');
            let BYNID=localStorage.getItem('BYNID');
            document.cookie="BYUSS="+BYUSS+"";
            document.cookie="BYNID="+BYNID+"";
            postData = !closeBase64 ? BASE64.encode(JSON.stringify(postData)) : JSON.stringify(postData);
            
            axios.defaults.headers.post['Content-Type'] = 'text/html;charset=UTF-8;';
            axios.post(url,postData).then((response) => {
                typeof closeLoad==='function' ? closeLoad() : layer.close(index);
                response.data.code=="200" ? success(response.data) : error(response.data);
            }).catch((response)=>{
                if (response instanceof Error) {
                    error({'code':999,'msg':response.message});
                }else{
                    error({'code':999,'msg':response.status});
                }
                typeof closeLoad==='function' ? closeLoad() : layer.close(index);
            });
        };
    }
}
