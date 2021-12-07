// JavaScript Document
	
	/* Прокрутка вверх страницы_buf */
	function up()
	{
		var t;
		var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
		if (top > 0)
		{
			window.scrollBy(0,-70);
			t = setTimeout('up()',10);
		}
		else
			clearTimeout(t);
		return false;
	}
	
	/* Увеличение картинки по нажатию */
	function changeSizeOneImage(im)
	{
		var bigsize = "300"; //Размер большой картинки
  		var smallsize = "150"; //Размер маленькой картинки
  		var active_img = 0;
    	if (active_img == im)
		{
			active_img.height = smallsize;
     		active_img = 0;
      		return;
    	}
    	if (active_img != 0) 
			active_img.height = smallsize;
    	active_img = im;
    	if(im.height == bigsize) 
			im.height = smallsize;
    	else
			im.height = bigsize;
	}
	
	/* Часы */
  	function digitalWatch()
	{
    	var date = new Date();
   		var hours = date.getHours();
    	var minutes = date.getMinutes();
   		var seconds = date.getSeconds();
    	if (hours < 10)
			hours = "0" + hours;
    	if (minutes < 10)
			minutes = "0" + minutes;
    	if (seconds < 10)
			seconds = "0" + seconds;
    	document.getElementById("digital_watch").innerHTML = hours + ":" + minutes + ":" + seconds;
    	setTimeout("digitalWatch()", 1000);
  	}
	
	/* Дата */
	function digitalData()
	{
		var d = new Date();
		var day=new Array("Воскресенье","Понедельник","Вторник", "Среда","Четверг","Пятница","Суббота");
		var month=new Array("января","февраля","марта","апреля","мая","июня", "июля","августа","сентября","октября","ноября","декабря");
		
		document.write(day[d.getDay()]+" " +d.getDate()+ " " + month[d.getMonth()] + " " + d.getFullYear() + "г.");
	}
		
	/* Выпадающий по клику на текст объект */
	function expandit(id)
	{
  		obj = document.getElementById(id);
  		if (obj.style.display=="none")
			obj.style.display="";
  		else 
			obj.style.display="none";
	}
	
	/* Слайд-шоу */
	var timer = null;
 	var delay = 5000;
 	var ar_src = new Array();
  	function setBigImageSlide(group)
	{
    	var group = document.getElementById(group);
    	var images = group.childNodes;
    	var src = new Array();
    	var k = 0;
    	for (var i = 0; i < images.length; i++)
		{
     		if (images[i] instanceof HTMLImageElement)
			{
       			src[k] = images[i].src;
        		k++;
      		}
    	}
    	ar_src = src;
    	if (timer != null)
			clearTimeout(timer);
    	imagesSlide(0);
  	}
		
  	function imagesSlide(i)
	{
    	var image = document.getElementById("bigimgslide");
    	image.src = ar_src[i];
    	i++;
    	if (i == ar_src.length)
			i = 0;
    	timer = setTimeout("imagesSlide(" + i + ")", delay);
  	}
	/* Слайд-шоу */