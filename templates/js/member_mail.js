$(function() {
	//全选或全不选
	$("#all").click(function() {
		if (this.checked) {
			$("#list :checkbox").prop("checked", true);
		} else {
			$("#list :checkbox").prop("checked", false);
		}
	});

});

function allchk() {
	var chknum = $("#list :checkbox").length; //选项总个数
	var chk = 0;
	$("#list :checkbox").each(function() {
		if ($(this).prop("checked") == true) {
			chk++;
		}
	});
	if (chknum == chk) { //全选
		$("#all").prop("checked", true);
	} else { //不全选
		$("#all").prop("checked", false);
	}
}
/**
 * 删除邮件
 */
$("#Delete").click(function() {
	var a = $("#checkbox").val();
	var cks = document.getElementsByName("Check[]");
	var str = "";
	var j = 0;	
	for (var i = 0; i < cks.length; i++) {
		if (cks[i].checked) {
			str +=  cks[i].value + ",";
			j += 1;
		}
	}
	str = str.substring(0, str.length - 1);
	console.log("str:" + str);
	var mailId = str;
	if(j == 1){
	 $.ajax({
			type:"get",
			url:"/api/mail/mailDelete",
			data:{
				mailId:mailId,
			}, 
			dataType:"json",
			success:function(data){
				console.log("成功返回的数据",data);
				var memberId = sessionStorage.getItem("memberId");
				if(data.code == 1){
					$.ajax({
						type:"post",
						url:"/api/mail/mailShow",
						data:{
							memberId:memberId,
						},
						dataType:"json",
						success:function(data){
							console.log("成功返回的数据",data);	
							var showList = data.showList;
							$("#mailList").html("");
							var txt = "";
							for (var i = 0; i < showList.length; i++) {
								txt += `<tr>
											<td>
											<div class="seach-box"><input lay-skin="primary" type="checkbox" name="Check[]" value="${showList[i].id}" /></div>
											</td>
											<td>${showList[i].addresser}</td>
											<td>${showList[i].theme}</td>
											<td>${format(showList[i].ct)}</td>`
									if (showList[i].type == 1) {
										txt +=  `<td>否</td>
							  `
									} else{
										txt += `<td>是</td>
							  `
									}	
								txt += `</tr>`
								}			
//								console.log(txt);			
							$("#mailList").html(txt);
						},
						error:function(data){
							console.log("失败后返回的数据",data);
						}
					})
				}
			}
	 })	
	}else{
		var id = str
		 $.ajax({
				type:"get",
				url:"/api/mail/mailDeleteAll",
				data:{
					id:id,
				}, 
				dataType:"json",
				success:function(data){
					console.log("成功返回的数据",data);
					var memberId = sessionStorage.getItem("memberId");
					
						$.ajax({
							type:"post",
							url:"/api/mail/mailShow",
							data:{
								memberId:memberId,
							},
							dataType:"json",
							success:function(data){
								console.log("成功返回的数据",data);	
								var showList = data.showList;
								$("#mailList").html("");
								var txt = "";
								for (var i = 0; i < showList.length; i++) {
									txt += `<tr>
												<td>
												<div class="seach-box"><input lay-skin="primary" type="checkbox" name="Check[]" value="${showList[i].id}" /></div>
												</td>
												<td>${showList[i].addresser}</td>
												<td>${showList[i].theme}</td>
												<td>${format(showList[i].ct)}</td>`
										if (showList[i].type == 1) {
											txt +=  `<td>否</td>
								  `
										} else{
											txt += `<td>是</td>
								  `
										}	
									txt += `</tr>`
									}			
//									console.log(txt);			
								$("#mailList").html(txt);
							},
							error:function(data){
								console.log("失败后返回的数据",data);
							}
						})
				}
		 })	
	}
	// str为传入后台id
});
layui.use(['form', 'jquery'], function() {
	var form = layui.form;
	var $ = layui.jquery;
	//点击全选, 勾选
	form.on('checkbox(allChoose)', function(data) {
		var child = $(".seach-box input[type='checkbox']");
		child.each(function(index, item) {
			item.checked = data.elem.checked;
		})
		form.render('checkbox');
	})
})

/**
 * 加载邮件信息
 */
$(function() {
	var memberId = sessionStorage.getItem("memberId");
	console.log(memberId);
	$.ajax({
		type: 'post',
		url: '/api/mail/mailShow',
		data: {
			memberId: memberId,
		},
		dataType: 'json',
		success: function(data) {
			console.log("返回成功的数据：", data);
			var showList = data.showList;
			$("#mailList").html();
			var txt = "";
			for (var i = 0; i < showList.length; i++) {
				console.log(showList.length)
				txt +=
					`
				<tr>
							<td>
							<div class="seach-box"><input lay-skin="primary" type="checkbox" name="Check[]" value="${showList[i].id}" /></div>
							</td>
							<td>${showList[i].addresser}</td>
							<td>${showList[i].theme}</td>
							<td>${format(showList[i].ct)}</td>
							`
				if (showList[i].type == 1) {
					txt += `<td>否</td>`
				} else {
					txt += `<td>是</td>`
				}

				txt += `	
						</tr>
			`
				
			}
			$("#mailList").append(txt);
		}
	})

})
/**
 * 格式化时间
 */
function format(time) {
	var date = new Date(time);
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +
		":" + date.getSeconds();
}
