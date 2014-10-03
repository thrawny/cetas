(function(){
    $(document).ready(function(){
        $(".patient").click(function(){
            $(this).find(".recordList").slideToggle("slow");
        });
    });
})();