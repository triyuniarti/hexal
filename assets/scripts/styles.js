$('#banner').slick({
	dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false
});

$('.navbar-toggle').click(function(){
	$(this).toggleClass('active');
});