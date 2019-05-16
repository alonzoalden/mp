window.onscroll = function () { myFunction() };
var header = document.getElementById("homeHeader");
var sticky = 0;

if( header !== null) {
    header.offsetTop;
}

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("home-sticky");
    } else {
        header.classList.remove("home-sticky");
    }
}
$('.home-res-openmenu').on('click', function () {
    $('.home-responsive-header').addClass('home-active');
    $('.home-responsive-opensec').slideDown();
    $('.home-res-closemenu').removeClass('home-active')
    $(this).addClass('home-active');
});

$('.home-res-closemenu').on('click', function () {
    $('.home-responsive-header').removeClass('home-active');
    $('.home-responsive-opensec').slideUp();
    $('.home-res-openmenu').removeClass('home-active')
    $(this).addClass('home-active');
});