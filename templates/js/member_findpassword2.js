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
    $(".codeimg").attr("src","imgGetCode?t="+time);
})
function imgChange(){
    //获得验证码图片对象
    var time=new Date().getTime();
    $(".codeimg").attr("src","imgGetCode?t="+time);
}