// 首页js create by 2017/8/22

//点击图标显示搜索框
$("form[role='search").on("click",function(e) {
    $("form[role='search']").addClass("active");
    e.stopPropagation();
});

$("#search").on("click",function(){
    if($("form[role='search']").hasClass('active')){
        $("form[role='search']").addClass("warning");
    }
});

//单击其它位置隐藏搜索框
$("body").on("click",function(){
    $("form[role='search']").removeClass("active warning");
});

//根据滚动条状态对右侧导航菜单位置进行移动
$(window).on('scroll', function(){    //绑定滚动事件
    if($(document).scrollTop() >200){
        $("#gotop")[0].setAttribute("style","display:block");
    }else{
        $("#gotop")[0].setAttribute("style","display:none");
    }
    if($(document).scrollTop() < 500){
        $(".sidebar").removeClass("fixed abs");
    }
    if($(document).scrollTop() >= 600 ){
        $(".sidebar").removeClass("abs");
        $(".sidebar").addClass('fixed');
    }
    if($(document).scrollTop() >= $(document).height() -  $(window).height()-$('.footer').height() - 50){
        $(".sidebar").removeClass("fixed");
        $(".sidebar").addClass('abs');
    }
});

//返回顶部
$("#gotop").on("click",function(){
    $('body,html').animate({
            scrollTop: 0
        },
        1000);
});