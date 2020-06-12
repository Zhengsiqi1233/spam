//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function() {
	var element = layui.element;

	//…
});
layui.use('upload', function() {
	var $ = layui.jquery,
		upload = layui.upload;

	//普通图片上传
	var uploadInst = upload.render({
		elem: '#test1',
		url: 'https://httpbin.org/post' //改成您自己的上传接口
			,
		before: function(obj) {
			//预读本地文件示例，不支持ie8
			obj.preview(function(index, file, result) {
				$('#demo1').attr('src', result); //图片链接（base64）
			});
		},
		done: function(res) {
			//如果上传失败
			if (res.code > 0) {
				return layer.msg('上传失败');
			}
			//上传成功
		},
		error: function() {
			//演示失败状态，并实现重传
			var demoText = $('#demoText');
			demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			demoText.find('.demo-reload').on('click', function() {
				uploadInst.upload();
			});
		}
	});
});
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
		var managerId = sessionStorage.getItem("managerId");
        $.ajax({
			type: 'get',
			url: '/api/manager/managerupdatePassword',
			data: {
				oldPassword: oldPassword,
				newPassword: newPassword,
				repeatPassword: repeatPassword,
				managerId: managerId,
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
	var managerId = sessionStorage.getItem("managerId");
	$("#managerImg").html("");
	var txt = "";
	txt +=`
	<form action="/api/manager/managerImprove" method="post" enctype ="multipart/form-data">
	<div class="layui-upload">
                  <button type="button" class="layui-btn" id="test1" style="background-color: #1E9FFF">上传图片</button>
                  <div class="layui-upload-list">
                    <img class="layui-upload-img" id="demo1" src="/api/member/headImg?id=${managerId}">
					<p id="demoText"></p>
					<input  id="file" name="file" type="file" style="float: left;display:none"/>
					<input  name="id" type="hidden" value="${managerId}"/>
					
                  </div>
				</div>
				<input type="submit" class="save" value="保存"></input>
				</form>
	`
	
	$("#managerImg").append(txt);
})
