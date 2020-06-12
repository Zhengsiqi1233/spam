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
	var managerId = sessionStorage.getItem("managerId");
	
	$.ajax({
		type: 'get',
		url: '/api/manager/managerShow',
		data: {
            managerId: managerId,
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
