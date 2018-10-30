var results = new Array();
var opration = ['+', '-', '*', '/'];
var afternum = new Array();
var number = new Array();
$(function() {
    // $("#btn").click(function(){
    $("#btn").click(function(e) {
        $(".panel.panel-info").hide();
        $("#result").html(null);
         $.confirm({
            title: false,
            content: 'Simple confirm!',
            confirm: function(){
                $.alert('Confirmed!');
            },
            cancel: function(){
                $.alert('Canceled!')
            }
        });
        count = 0;
        //清空数组
        del(number);
        del(afternum);
        del(results);
        if (getNum()) {
            afternum = unique(perm(number));
            for (var i = 0; i < afternum.length; i++) {
                var s = afternum[i];
                var a = s[0];
                calc_one(s[0], s[1], s[2], s[3]);
            }
            // console.log(results);
            $(".panel.panel-info").show();
            $("#result").html(results);
        }
    })
})

function del(arr) {
    arr.splice(0, arr.length);
}

function getNum() {
    var num1 = Number($("#num1").val().replace(/^\s+|\s+$/g, "")); //从一个输入框中取数字 
    var num2 = Number($("#num2").val().replace(/^\s+|\s+$/g, ""));
    var num3 = Number($("#num3").val().replace(/^\s+|\s+$/g, ""));
    var num4 = Number($("#num4").val().replace(/^\s+|\s+$/g, ""));
    if (!(funcNum(num1) && funcNum(num2) && funcNum(num3) && funcNum(num4))) {
        $.alert({
            title: '提示',
            content: '数字不正确,请重新输入数字。',
        });
        return false;
    }
    number.push(num1);
    number.push(num2);
    number.push(num3);
    number.push(num4);
    if (number.length != 4) { //验证输入是否正确  
        $.alert({
            title: '提示',
            content: '24点需要有4个数字,请重新输入数字。',
        });
        return false;
    }
    if (number.indexOf('0') != -1) {
        $.alert('24点没有0的,请重新输入数字。');
        return false;
    }
    return true;
}

function funcNum(num) {
    return num > 0 && num <= 10;
}
//2.全排列
var count = 0;

function perm(arr) {
    var tempn = new Array();
    (function fn(source, result) {
        if (source.length == 0)
            // show(result);  
            tempn[count++] = result;
        else
            for (var i = 0; i < source.length; i++) fn(source.slice(0, i).concat(source.slice(i + 1)), result.concat(source[i]));
    })(arr, []);
    return tempn;
}
// function fun(str){
// 	var result = [];
// 	if(str.length == 1 || str.length == 0 ){
// 	    result.push(str);
// 	    return result;
// 	}else{
// 	    var one = str.substr(0,1);
// 	    var left = str.substr(1);
// 	    var leftResult = fun(left);
// 	    for(i=0;i<leftResult.length;i++){
// 	        for(j=0;j<leftResult[i].length+1;j++){//加1的目的是让字符one也可以插入到最后一个位置
// 	            result.push(leftResult[i].slice(0,j) + one + leftResult[i].slice(j));
// 	        }
// 	    }
// 	}
// 	return result;
// }
//数组去重
function unique(arr) {
    var result = [],
        hash = {};
    for (var i = 0, elem;
        (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
    //http://www.cnblogs.com/sosoft/
}
//3. 对全排列进行所有计算（封装在一个函数中） 
function calc_one(v1, v2, v3, v4) {
    var k = 0;
    for (var j = 0; j < 4; j++) {
        var o1 = opration[j];
        var v5 = execute(v1, o1, v2);
        if (v5 < 0 || Math.round(v5) != v5) continue; //跳过负数和小数   
        for (var m = 0; m < 4; m++) {
            var o2 = opration[m];
            var v6 = execute(v5, o2, v3);
            if (v6 < 0 || Math.round(v6) != v6) continue; //跳过负数和小数    
            for (var n = 0; n < 4; n++) {
                var o3 = opration[n];
                var v7 = execute(v6, o3, v4);
                if (v7 == 24) {
                    results[k] = '<span class="list-group-item list-group-item-success">' + '<span class="label label-primary" style="margin-right: 10px;top: -2px;position:  relative;">' + (k + 1) + '</span>' + v1 + o1 + v2 + '=' + v5 + ' ; ' + v5 + o2 + v3 + '=' + v6 + ' ; ' + v6 + o3 + v4 + '=' + v7 + '</span><br/>';
                    k++;
                }
            }
        }
    }
    return results;
}

function execute(n1, o, n2) {
    n1 = Number(n1);
    n2 = Number(n2);
    if (o === '+') {
        return n1 + n2;
    }
    if (o === '-') {
        return n1 - n2;
    }
    if (o === '*') {
        return n1 * n2;
    }
    if (o === '/') {
        return n1 / n2;
    }
}