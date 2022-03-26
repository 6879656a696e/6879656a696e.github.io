$(".mMenu").click(function(event){
    var x = event.pageX;
    var y = event.pageY;

    $('#menu').css('display', 'block');
    $('#menu').css('z-index', parseInt($(this).css('z-index')) + 1);
    $('#menu').css('clip-path', 'circle(0% at '+ x +'px '+ y +'px)');

    anime({
        targets: $('#menu'),
        update: function(anim) {
            $('#menu').css('clip-path', 'circle('+ (anim.progress*2) +'% at '+ x +'px '+ y +'px)');
        }
    });
});