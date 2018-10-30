(function($, root){
    
    // 切换学校
    function cutSchool () {
        $(".school-name").on("click", function (){
            $(".school-name").removeClass("selected")
            $(this).addClass("selected")
        })
    }

    // 切换晨午检
    function cutAction () {
        $(".tag-morning").on("click", function (){
            $(".tag-morning").removeClass("checked")
            $(this).addClass("checked")
        })   
    }

    root.cutAction = cutAction
    root.cutSchool = cutSchool

}(window.$, window.signIn || (window.signIn = {})))