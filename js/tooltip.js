// JavaScript Document

document.onmousemove = move_tip;
function move_tip(e)
{
	float_tip_style = document.getElementById("float_tip").style;
	width = 0; // Ширина подсказки
	
	// Для браузера IE6-10
	if (e.pageX == null && e.clientX != null ) // if (document.all)
	{
		var html = document.documentElement;
		var body = document.body;
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
		x = e.pageX; // Координата X курсора
		y = e.pageY; // Координата Y курсора
	}
	// Для остальных браузеров
	else
	{
		x = e.pageX; // Координата X курсора
		y = e.pageY; // Координата Y курсора
	}
	
	if ((x + width + 10) < document.body.clientWidth) // Показывать слой справа от курсора 
	{
		float_tip_style.left = x + 'px';
	}
	else // Показывать слой слева от курсора
	{
		float_tip_style.left = x - width + 'px';
	}
	
	// Положение от верхнего края окна браузера
	float_tip_style.top = y + 20 + 'px';
}

function tool_tip(msg)
{
	float_tip_style = document.getElementById("float_tip").style;
	if (msg)
	{
		// Выводим текст подсказки
		document.getElementById("float_tip").innerHTML = msg;
		// Показываем подсказку
		float_tip_style.display = "block";
	}
	else
	{
		// Прячем подсказку
		float_tip_style.display = "none";
	}
}