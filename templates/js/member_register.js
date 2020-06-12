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
            queren_password: '',
            input_wenti: '',
            input_daan: '',
            input_mailbox: '',
        }
    }
})


/**
 * 验证码
 */
$(function(){
    var time=new Date().getTime();
    $(".codeimg").attr("src","/api/imgGetCode?t="+time);
});
function imgChange(){
    //获得验证码图片对象
    var time=new Date().getTime();
    $(".codeimg").attr("src","/api/imgGetCode?t="+time);
}


$(".login").click(function(){
    var account = $("#account").val();
    var phone = $("#phone").val();
    var mailbox = $("#mailbox").val();
    var problem = $("#problem").val();
    var answer = $("#answer").val();
    var password = $("#password").val();
    var inputCode = $("#inputCode").val();
    var querenPassword = $("#querenPassword").val();
    console.log(account, phone, mailbox, problem, answer, password);
    $.ajax({
        type: "post",
        url: "/api/member/memberRegister",
        data: {
            account: account,
            phone: phone,
            mailbox: mailbox,
            problem: problem,
            answer: answer,
            password: password,
            inputCode: inputCode,
            querenPassword: querenPassword,
        },
        dataType: "json",
        success: function(data) {
            console.log("返回成功的数据：", data);
            if(data.prompt == "注册成功") {
                location.href = "member_login.html";
            }else{
                alert(data.prompt); 
                    
            }
        }
    })
})
