$(function () {
    var pg = {pageIndex: 1}

    //调用获取数据方法
    getPage(JSON.stringify(pg));



    /**
     *
     * 获取分页数据
     * @param param
     */
    function getPage(param) {
        $.ajax({
            url:"http://192.168.6.138/user/pagination",
            method:"post",
            contentType:"application/json",
            data:param,
            dataType:"json",
            success:function (data) {
                alert(data.list);
                var txt = doT.template($("#shop_temp").text());
                $(".root").html(txt(data.list));
                //删除
                $("a[name=del]").click(function () {
                    //获取id
                    var  id = $(this).parents("tr").find("td:eq(0)").text();
                    //去后台删除
                    $.ajax({
                        url:"http://192.168.6.138/user/delete",
                        type:"post",
                        data:JSON.stringify({id:id}),
                        contentType:"application/json",
                        dataType:"json",
                        success:function (data) {
                            if (data.code==200){
                                location.reload();

                            }else{
                                alert(data.msg);
                            }
                        }
                    });
                });
                //修改
                $("a[name=upd]").click(function () {
                    //获取编号存cookie
                    var id = $(this).parents("tr").find("td:eq(0)").text();
                    var date = new Date();
                    //只能这么写/10表示10秒钟
                    date.setTime(date.getTime()+10*1000);
                    $.cookie("user-id",id,{expires:date});
                    window.location='show.html';
                });
                //加载分页
                $.ajax({
                   url:"http://192.168.6.138/user/count",
                   type:"get",
                   contentType:"application/json",
                   dataType:"json",
                    success:function (count) {
                        alert(count);
                        txt = doT.template($("#pagination_temp").text());
                        $(".root").append(txt(count));

                        //页码添加点击事件
                        $("button[class=page]").click(function () {
                            pg = {pageIndex:$(this).text()};
                            getPage(JSON.stringify(pg));
                        });
                    }
                });
            }
        });
    }
})