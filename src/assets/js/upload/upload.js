require('./jquery2.1.1.min.js');
require('./jquery.uploadify.min.js');
export default function(){
    $('#file_upload').uploadify({ 
        'swf' : 'assets/uploadify.swf',
        'uploader' : 'http://192.168.10.167:6088/drcs/w/sysmsg/upload',
        'fileObjName' : 'file',
        'buttonText' : '',
        'buttonCursor' : 'point',
        'onUploadSuccess' : function(file, data, response) { 
            console.log('The file ' + file.name +' was successfully uploaded with a response of ' + response + ':' + data); 
        }
    });
}