(function ($, root) {

    // 获取学校数据
    function getData(dataObj) {
        $.ajax({
            url: "https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/cw",
            type: "POST",
            dataType: "json",
            data: dataObj,
            success: dataDeal,
            error: error
        })
    }

    function error() {
        layer.open({
            type: 1,
            skin: 'layui-layer-demo', //样式类名
            closeBtn: 0, //不显示关闭按钮
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: '提示：还没有该学校数据！'
        });

        root.renBeHere([0, 0, 0])
        root.renLeave([])
        root.bingChart([0, 0])
    }

    function dataDeal(data) {
        console.log(data)
        console.log("render")
        let dataArr = data
        // 学校id
        let schoolId = dataArr["inspec"]["schoolid"]
        // 学生总数
        let sumNum = dataArr["inspec"]["students_total"]
        // 签到人数
        let qiandao = dataArr["inspec"]["sign_num"]
        // 请假人数
        let qingjia = dataArr["inspec"]["leaveStu"]
        console.log(schoolId)
        console.log(qiandao)

        console.log("学生总数" + sumNum)

        // 学校列表
        let schooArr = dataArr["schoolArr"]
        console.log("学校列表")
        console.log(schooArr)

        // 渲染
        root.renBeHere([sumNum, qiandao, qingjia])
        root.renLeave(qingjia)
        root.bingChart([sumNum, qiandao])
    }

    // 初始化
    function dataInit() {
        // 学校id
        let schoolid
        // 日期
        let date = $("#test1").val()
        // 签到时间
        let action
        $("ul .school-name").each(function () {
            let ele = $(this)
            if ($(this).hasClass("selected")) {
                schoolid = ele.attr("data-id")
            }
        })
        $(".head-left .tag-morning").each(function () {
            let ele = $(this)
            if ($(this).hasClass("checked")) {
                action = ele.attr("action")
            }
        })
        var dataObj = {
            date: date,
            id: schoolid,
            action: action
        }
        root.getData(dataObj)
    }

    root.dataDeal = dataDeal
    root.getData = getData
    root.dataInit = dataInit

}(window.$, window.signIn || (window.signIn = {})))