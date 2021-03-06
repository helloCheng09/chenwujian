// 定义
let root = window.signIn

/**************************************************** */

/**
 * index 入口
 */
if ($("#indexWrap").length) {
    console.log("首页")
    console.log($)
    console.log(window.$)

    // 日期实例化
    //常规用法
    root.dateInit()
    // 赋值当天日期
    let curDay = getNowFormatDate()
    console.log(curDay)
    $("#test1").val(curDay)
    //获取当前时间，格式YYYY-MM-DD
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }

    // 点击选择学校
    root.cutSchool()
    // 切换晨午检
    root.cutAction()
    // 初始化
    root.dataInit()
    // 切换调取
    root.clickData() 
    // 修复没数据错误
    root.erroCorrect()

}