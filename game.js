var cards = ["badger.jpg", "donHector.jpg", "fring.jpg", "hank.jpg",
			"jessie.jpg", "lydia.jpg", "marie.jpg", "mike.jpg",
			"pete.jpg", "saul.jpg", "skyler.jpg", "walter.jpg",
			"walterBegin.jpg", "walterEnd.jpg"];
			
var oneVisible = false;
var visible_nr;
var visible_avatar;
var turnCounter = 0;
var pairsLeft;
var actionLock = false;
var cardTake = new Audio('sounds/cardTake.wav');
var winSound = new Audio('sounds/winSound.wav');
var min = 0;
var sec = 0;
var timerStop;

function startGame(tiles)
{
	//making start situation
	$('.container').html('<div class="timer">Timer<br> <span id="timer">00:00</span> </div> <div class="board"></div> <div class="counter">Turn counter 0</div> <div style="clear:both;></div>"');
	
	if(tiles == 12)
		$('.board').css('width','600');
	else if(tiles == 20)
		$('.board').css('width','700');
	else
		$('.board').css('width','1000');
	
	pairsLeft = tiles/2;
	
	var string = "";
	for(i=0; i<tiles; i++)
		string = string + '<div class = "card" id="tile' + i + '"></div>';
	
	string = string + '<div class="back" onclick="location.reload()">Back</div>';
	$('.board').html(string);
	
	$('.card').each(function(index)
		{
			$(this).on("click", function()
				{
					revealCard(index, picked[index]);
				}
			);
		}
	);
	
	/////////////////////////////////avatars draw
	var picked = [];
	var picked1 = [];
	var temp;
	var numAvatars = tiles/2;
	
	for(i=0;i<numAvatars;)
	{
		temp = Math.floor(Math.random()*numAvatars);
		if(!wasIt(temp,picked))
		{
			picked.push(temp);
			i++;
		}
	}
	for(i=0;i<numAvatars;)
	{
		temp = Math.floor(Math.random()*numAvatars);
		if(!wasIt(temp,picked1))
		{
			picked1.push(temp);
			i++;
		}
	}
	picked = picked.concat(picked1);
	timer();
}

function wasIt(avatar, tab)
{
	for(i=0; i<tab.length; i++)
	{
		if(avatar == tab[i])
			return true;
	}
	return false;
}

function revealCard(nr, avatar)
{
	if(actionLock==false)
	{
		actionLock = true;
		new Audio('sounds/slide.wav').play();
		var img = "url(img/" + cards[avatar] + ")";
		
		$('#tile'+nr).css('background-image', img);
		$('#tile'+nr).css('filter','brightness(100%)');
		$('#tile'+nr).css('cursor','default');
		$('#tile'+nr).off('click')
		if(oneVisible == false)
		{
			oneVisible = true;
			visible_avatar = avatar;
			visible_nr = nr;
			actionLock = false;
		}
		else
		{
			if(visible_avatar == avatar)
			{
				setTimeout(function(){hideCards(nr,visible_nr);}, 500 );
			}
			else
			{
				setTimeout(function(){restoreCards(nr, visible_nr, avatar, visible_avatar);}, 500);
			}
			oneVisible = false;
			
			turnCounter++;
			$('.counter').html('Turn counter '+turnCounter);
		}
	}
	
}

function hideCards(nr1, nr2)
{
	cardTake.play();
	$('#tile'+nr1).css('opacity','0');
	$('#tile'+nr2).css('opacity','0');
	pairsLeft--;
	
	if(pairsLeft<1)
	{
		setTimeout(function(){
			winSound.play();
			$('.board').html('<h1>You win</h1> <br><br> <span class="reset" onclick="location.reload()">Play again</span>');
		}, 350);
		clearTimeout(timerStop);
	}
	
	actionLock = false;
}

function restoreCards(nr1, nr2, avatar1, avatar2)
{
	$('#tile'+nr1).css('background-image', 'url(img/back.png)');
	$('#tile'+nr2).css('background-image', 'url(img/back.png)');
	$('#tile'+nr1).css('filter','brightness(70%)');
	$('#tile'+nr2).css('filter','brightness(70%)');
	
	$('#tile'+nr1).on('click', function() { revealCard(nr1, avatar1); });
	$('#tile'+nr2).on('click', function() { revealCard(nr2, avatar2); });
	
	actionLock = false;
}

function timer()
{
	if(sec<10)
		sec='0'+sec;
	
	if(min<10)
		$('#timer').html('0'+min+":"+sec);
	else
		$('#timer').html(min+":"+sec);
	
	sec++;
	
	if(sec>59)
	{
		min++;
		sec=0;
	}

	timerStop = setTimeout('timer()',1000);
}








