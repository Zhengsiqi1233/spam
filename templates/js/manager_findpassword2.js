function showAccount(){
    var a = document.getElementById("account").value;
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(a)){
    document.getElementById("aaa").innerText="请输入正确的账号";
    }
    else{
        document.getElementById("aaa").innerText="";
    }
}
function showPassword(){
    var a = document.getElementById("password").value;
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(a)){
    document.getElementById("bbb").innerText="请输入正确的密码";
    }
    else{
        document.getElementById("bbb").innerText="";
    }
}
function querenPassword(){
    var a = document.getElementById("password").value;
    var b = document.getElementById("querenPassword").value;
    if(a != b){
    document.getElementById("ccc").innerText="两次密码不一致";
    }
    else{
        document.getElementById("ccc").innerText="";
    }
}
function showPhone(){
    var a = document.getElementById("phone").value;
    if(!/^1[0-9]{10}$/.test(a)){
    document.getElementById("ddd").innerText="请输入正确的手机号";
    }
    else{
        document.getElementById("ddd").innerText="";
    }
}
function showProblem(){
    var a = document.getElementById("problem").value;
    if(a == ""){
    document.getElementById("eee").innerText="请输入密保问题";
    }
    else{
        document.getElementById("eee").innerText="";
    }
}
function showAnswer(){
    var a = document.getElementById("answer").value;
    if(a == ""){
    document.getElementById("fff").innerText="请输入密保答案";
    }
    else{
        document.getElementById("fff").innerText="";
    }
}
function showMailbox(){
    var a = document.getElementById("mailbox").value;
    if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(a)){
    document.getElementById("ggg").innerText="请输入正确的账号";
    }
    else{
        document.getElementById("ggg").innerText="";
    }
}

    new Vue({
    el: "#app",
    data() {
        return {
            input_clear: '',
            input_phone: '',
            input_password: '',
            input_daan: '',
            queren_password: '',
        }
    }
})

$(function(){
    var time=new Date().getTime();
    $(".codeimg").attr("src","/api/imgGetCode?t="+time);
})
function imgChange(){
    //获得验证码图片对象
    var time=new Date().getTime();
    $(".codeimg").attr("src","/api/imgGetCode?t="+time);
}
$(function(){
    var managerId = sessionStorage.getItem("managerId");
    var answer = $("#answer").val();
    var password = $("#password").val();
    console.log(managerId);
    $.ajax({
        type: "get",
        url: "/api/manager/managerProtect",
        data: {
            managerId: managerId,
        },
        dataType: "json",
        success: function(data) {
            console.log("返回成功的数据：", data);
            var problem = data.protectList;
            console.log(problem[0].problem)
            $("#problem").html("");
            var txt = "";
            txt += `${problem[0].problem} `
            console.log(txt);
            $("#problem").html(txt);
            
        }
    })
})

    $(".login").click(function(){
        var managerId = sessionStorage.getItem("managerId");
        var answer = $("#answer").val();
        var password = $("#password").val();
        var inputCode = $("#inputCode").val();
        $.ajax({
            type: "post",
            url: "/api/manager/managerfindPassword",
            data: {
                answer: answer,
                password: password,
                managerId: managerId,
                inputCode: inputCode,
            },
            dataType: "json",
            success: function(data) {
                console.log("返回成功的数据：", data);
                if(data.prompt == "找回密码成功") {
                    location.href = "manager_login.html";
                }else{
                    alert(data.prompt); 
                        
                }
            }
        })
    })
