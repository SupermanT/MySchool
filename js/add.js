$(function () {
   //家在表单组件（不加载无法实现radio等）
    layui.use('form',function () {
        var form = layui.form;
    });
    //加载时间组件
    layui.use('laydate',function () {
        var laydate = layui.laydate;
        laydate.render({
           elem:".date"
        });
    });



    $("button[name=submit]").click(function () {

        var form =
            new formData($("input[name=img]")[0]);
        form.append
        ("userCode".$("input[name=userCode]").val());
        form.append
        ("userName".$("input[name=userName]").val());
        form.append
        ("gender".$("input[name=gender]:checked").val());
        form.append
        ("userPassword".$("input[name=name=userPassword]").val());
        form.append
        ("birthday".$(".date").val());

        //添加
        $.ajax({
            url:"http://192.168.6.138/user/add",
            method:"post",
            processData:false,
            contentType:false,
            data:form,
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
