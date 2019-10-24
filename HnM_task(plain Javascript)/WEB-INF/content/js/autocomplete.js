$(document).ready(function(){
    $( "#search" ).autocomplete({
        source: function(request, response) {
            var search = DOMPurify.sanitize(request.term);
            $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
                {
                    "hl":"en", // Language
                    "jsonp":"suggestCallBack", // jsonp callback function name
                    "q":search, // query term
                    "client":"firefox" // force firefox structure
                }
            );
            suggestCallBack = function (data) {
                var suggestions = [];
                $.each(data[1], function(key, val) {
                    suggestions.push({"value":val});
                });
                suggestions.length = 5; // prune suggestions list to only 5 items, by default 10 items are shown
                response(suggestions);
            };
        },
        select: function (event, ui) {
            var date =dateFormat(new Date(), 'Y-d-d h:i:s');
            var html=DOMPurify.sanitize("<li> <p> <span class='selected-option'>"+ui.item.value+"</span><i class='close'></i><span class='selected-option-date'>"+date+"</span> </p></li>");
            $("#listSelectedResults").append(html);
        },
    });

    $("#clearHistory").click(function () {
        $("#listSelectedResults").html(DOMPurify.sanitize(""));
    });

    $( '#listSelectedResults' ).on( 'click', '.close', function (e) {
        this.parentElement.parentElement.remove();
    });
    $( '.input-icons' ).on( 'click', '.close', function (e) {
        $(this).parent().find("input").val(DOMPurify.sanitize(""));
    });
});