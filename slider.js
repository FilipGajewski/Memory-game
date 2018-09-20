var num = Math.floor(Math.random()*5)+1;
var timer1 = 0;
var timer2 = 0;

function changeSlide()
{
	num++;
	if(num>5)
		num=1;
	
	var img = '<img src="slides/slide' + num +'.jpg"/>';
	$('.slider').html(img);
	$('.slider').fadeIn(500);
	setTimeout('changeSlide()',5000);
	setTimeout('hideSlide()',4500);
}

function hideSlide()
{
	$('.slider').fadeOut(500);
}