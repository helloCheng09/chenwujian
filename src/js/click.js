(function ($, root) {

    // 切换学校
    function cutSchool() {
        $(".school-name").on("click", function () {
            $(".school-name").removeClass("selected")
            $(this).addClass("selected")
        })
    }

    // 切换晨午检
    function cutAction() {
        $(".tag-morning").on("click", function () {
            $(".tag-morning").removeClass("checked")
            $(this).addClass("checked")
        })
    }

    // 学校 时间 签到时间 切换
    function clickData() {
        // 选择学校 
        $("ul .school-name").on("click", function () {
            // 学校id
            let schoolid = $(this).attr("data-id")
            // 日期
            let date = $("#test1").val()
            // 签到时间
            let action
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

            console.log(dataObj)
            root.getData(dataObj)
        })

        // 选择日期
        $(".head-left .tag-morning").on("click", function () {
            // 学校id
            let schoolid
            // 日期
            let date = $("#test1").val()
            // 签到时间
            let action = $(this).attr("action")
            $("ul .school-name").each(function () {
                let ele = $(this)
                if ($(this).hasClass("selected")) {
                    schoolid = ele.attr("data-id")
                }
            })

            var dataObj = {
                date: date,
                id: schoolid,
                action: action
            }

            console.log(dataObj)
            root.getData(dataObj)
        })
        // 选择晨午检
        $("#test1").on("click", function () {
            $("#layui-laydate1").on("click", function () {
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

                console.log(dataObj)
                root.getData(dataObj)
            })
        })
    }

    // 点击显示请假原因
    function qingjiaDetail () {
        $()
    }

    root.clickData = clickData
    root.cutAction = cutAction
    root.cutSchool = cutSchool

}(window.$, window.signIn || (window.signIn = {})))