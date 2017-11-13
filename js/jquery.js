jQuery(document).ready(function ($) {

    //Use this inside your document ready jQuery 
    $(window).on('popstate', function () {
        location.reload(true);
    });

});


$('.stackMenu a').click(function (event) {
    $('.rw').toggleClass('active');
    event.preventDefault();
});

$('.fixedMenu .stackMenu a').click(function (event) {
    $(this).children('.rw').toggleClass('active');
    event.preventDefault();
});

$('.navigation a').click(function (e) {
    e.preventDefault();
    $('.navigation a').removeClass('active');
    $(this).addClass('active');
});



//MODAL
//MODAL TALENT PROFILE

$(window).scroll(function () {
    if ($(window).scrollTop() >= 400) {
        $('.fixedMenu').show();
    } else {
        $('.fixedMenu').hide();
    }
});
