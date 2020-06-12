//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function() {
	var element = layui.element;

	//…
});
layui.use('upload', function(){
	var $ = layui.jquery,
	upload = layui.upload;
	
	//普通图片上传
	var uploadInst = upload.render({
	  elem: '#file'
	  ,url: 'https://httpbin.org/post' //改成您自己的上传接口
	  ,before: function(obj){
		//预读本地文件示例，不支持ie8
		obj.preview(function(index, file, result){
		  $('#demo1').attr('src', result); //图片链接（base64）
		});
	  }
	//   ,done: function(res){
	// 	//如果上传失败
	// 	if(res.code > 0){
	// 	  return layer.msg('上传失败');
	// 	}
	// 	//上传成功
	//   }
	//   ,error: function(){
	// 	//演示失败状态，并实现重传
	// 	var demoText = $('#demoText');
	// 	demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
	// 	demoText.find('.demo-reload').on('click', function(){
	// 	  uploadInst.upload();
	// 	});
	//   }
	});
})	
layui.use('form', function() {
	var form = layui.form;

	//监听提交
	form.on('submit(formDemo)', function(data) {
		layer.msg(JSON.stringify(data.field));
		return false;
	});
});
$(".layui-btn-normal").click(function(){
    var oldPassword = $("#oldPassword").val();
    var newPassword = $("#newPassword").val();
    var repeatPassword = $("#repeatPassword").val();
   
    if(oldPassword.length == 0){
        layer.open({
            title: '警告',
            content: '原密码不能为空'
          });  
    }
    else if(newPassword.length == 0){
        layer.open({
            title: '警告',
            content: '新密码不能为空'
          });  
    }
    else if(repeatPassword.length == 0){
        layer.open({
            title: '警告',
            content: '确认新密码不能为空'
          });  
    }
    else if(newPassword != repeatPassword){
        layer.open({
            title: '警告',
            content: '两次输入的密码不一致'
          });  
    }
    else{
		var memberId = sessionStorage.getItem("memberId");
        $.ajax({
			type: 'get',
			url: '/api/member/memberupdatePassword',
			data: {
				oldPassword: oldPassword,
				newPassword: newPassword,
				repeatPassword: repeatPassword,
				memberId: memberId,
			},
			dataType:"json",
    		success:function(data){
				console.log("返回成功的数据：", data);
				
					layer.open({
						title: '提示',
						content: data.prompt,
					  });  
				
			},
			
		})
    }
    
})

$(function() {
	var memberId = sessionStorage.getItem("memberId");
	$("#memberImg").html("");
	var txt = "";
	txt +=`
	<form action="/api/member/memberImprove" method="post" enctype ="multipart/form-data" id="registeForm" >
	<div class="layui-upload">
				  <div class="layui-upload-list">
				  	<p><label for="file"   id="file" class="btn btn-primary" style="height: 30px;width: 180px;margin-right: 20px;margin-left:30px">选择照片</label></p>
                    <img class="layui-upload-img" id="demo1" src="/api/member/headImg?id=${memberId}">
					<p id="demoText"></p>
					<input  id="file" name="file" type="file" style="float: left;display:none"/>
				
					<input  name="id" type="hidden" value="${memberId}"/>
					
                  </div>
				</div>
				<input type="submit" class="save" value="保存" onclick="submitForm()"></input>
				</form>
	`
	
	$("#memberImg").append(txt);
})
function submitForm() {
	$.ajax({
		type : 'post',
		
		url : '/api/member/memberImprove',
		
		success : function (data) {
			location.href = "member_setting.html";
		},
		error: function(data) {
			alert("error:"+data.responseText);
		}
	});
}