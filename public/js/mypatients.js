(function(){
    $(document).ready(function(){
        console.log($(".recordListTitle"));
        $(".patient").click(function(){
            $(this).find(".recordList").slideToggle("slow");
        });
    });
})();