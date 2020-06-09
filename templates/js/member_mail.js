$(function () {
	//全选或全不选
	$("#all").click(function(){   
    	if(this.checked){   
        	$("#list :checkbox").prop("checked", true);  
    	}else{   
		$("#list :checkbox").prop("checked", false);
    	}   
 	}); 

}); 
function allchk(){
	var chknum = $("#list :checkbox").length;//选项总个数
	var chk = 0;
	$("#list :checkbox").each(function () {  
        if($(this).prop("checked")==true){
			chk++;
		}
    });
	if(chknum==chk){//全选
		$("#all").prop("checked",true);
	}else{//不全选
		$("#all").prop("checked",false);
	}
}

$(function(){
    
	　　$("#Delete").click(function(){
		var a = $("#checkbox").val();
		var cks = document.getElementsByName("Check[]");
		var str="";
		for(var i=0;i<cks.length;i++){
			if(cks[i].checked){
				　　str+="id="+cks[i].value+"&";
			}
			}
			str=str.substring(0, str.length-1);
			console.log("str:" + str);
			// str为传入后台id
	　　});
					
	　　
})
layui.use(['form','jquery'], function () {
	var form = layui.form;
	var $ = layui.jquery;
	//点击全选, 勾选
	form.on('checkbox(allChoose)', function (data) {
		var child = $(".seach-box input[type='checkbox']");
		child.each(function (index, item) {
		item.checked = data.elem.checked;
	})
	form.render('checkbox');
})
})