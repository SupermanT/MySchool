$(function () {

    //加载修改的数据
    $.ajax({
       url:"http://192.168.6.138/user/find",
       type:"post",
       contentType:"application/json",
       data:JSON.stringify({id:$.cookie("user-id")}), 
       dataType:"json",
       success:function (data) {
           $("input[name=id]").val(data.data.id);
           $("input[name=userCode]").val(data.data.userCode);
           $("input[name=userName]").val(data.data.userName);
           $("input[name=userPassword]").val(data.data.userPassword);
           $("input[name=birthday]").val(data.data.birthday);
           $("input[name=gende" +
               "r][value="+
               data.data.gender+"]").
               prop("checked","checked");

       } 
    });

    //加载时间组件
    layui.use('laydate',function () {
        var laydate = layui.laydate;
        laydate.render({
           elem:".date"
        });
    });


    layui.use('form',function () {
        var form = layui.form;
    })



    $("button[name=submit]").click(function () {
       var dt = {
           id:$("input[name=id]").val(),
         userCode:$("input[name=userCode]").val(),
         userName:$("input[name=userName]").val(),
           gender:$("input[name=gender]:checked").val(),
           userPassword:$("input[name=userPassword]").val(),
           birthday:$(".date").val()
       };
        //修改
        $.ajax({
            url:"http://192.168.6.138/user/update",
            type:"post",
            data:JSON.stringify(dt),
            contentType:"application/json",
            dataType:"json",
            success:function (data) {
                if (data.code==200){
                    alert(data.msg);
                    window.location = 'index.html';
                }
                alert(data.msg);
            }
        });
    });


});
