// JavaScript Document

/* плагин загрузки картинки аналог для load 
--------------------------------------------*/
(function ($) {
    $.fn.bindImageLoad = function (callback) {
        function isImageLoaded(img) {
            // Во время события load IE и другие браузеры правильно
            // определяют состояние картинки через атрибут complete.
            // Исключение составляют Gecko-based браузеры.
            if (!img.complete) {
                return false;
            }
            // Тем не менее, у них есть два очень полезных свойства: naturalWidth и naturalHeight.
            // Они дают истинный размер изображения. Если какртинка еще не загрузилась,
            // то они должны быть равны нулю.
            if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            // Картинка загружена.
            return true;
        }

        return this.each(function () {
            var ele = $(this);
            if (ele.is("img") && $.isFunction(callback)) {
                ele.one("load", callback);
                if (isImageLoaded(this)) {
                    ele.trigger("load");
                }
            }
        });
    };
})(jQuery);

$(document).ready(function(){
	function slider_logos(){
		var slider = $("#logos_slider"),
			ul = slider.find("ul"),
			li = slider.find("li"),
			img = li.find("img"),
			to_l = slider.find(".left_arr"),
			to_r = slider.find(".right_arr"),
			pp = slider.find('.play_pause'),
			arr = [],
			cur = 0,
			j = 0,
			s = img.size(),
			step = 1, // длина сдвига
			speed = 50, // время прохода сдвига миллисекунды
			dir = -1,
			k=false,
			wow = $('#wow');
		
		// инициализация картинок
		function init(elem,index){
			var a = {
				liw: elem.parents('li:first').outerWidth(true)
			};
			arr[index]= a;
			j++;
			if (j==s){
				go_func();
			}
		}
		
		// для каждой загруженной картинки, определяем ее габариты и присваиваем для лишке
		img.each(function(i,e){
			var src = $(e).attr('src');
			$(e)
			.bindImageLoad(function(){
				$(e).parents('li:first').width($(e).width());
				init($(e),i);
			})
			.error(function(){ 
				$(e).width(100).height(106).parents('li:first').width($(e).width());
				init($(e),i);
			})
			.attr('src',src);
		});
		
		// запуск функции
		function go_func(){
			
			// ширина логотипов с их отступами
			var w = 0;
			for (var i=0,length=arr.length;i<length;i++){
				w = w + arr[i].liw
			}
			
			// клонируем логотипы
			ul.html(ul.html()+ul.html()+ul.html());
			
			ul.css({
				width: w*3+10,
				left: w*-1
			});
			
			// функция анимации
			function anim(x,kurs){
				if(kurs!=undefined){dir=kurs;}
				
				var l1 = parseInt(ul.css("left"));
				var l2 = step*dir;
				var l=l1+l2;
				
				if (l<=w*-2 || l>=0){
					l=w*-1;
				}
				ul.css("left",l);
				k = true;
			}
			
			// установка анимации
			var timerId = setInterval(anim,speed);
			
			
			// правая кнопка
			var newtimerId_r = 0; // новый таймер
			var k_r = false; // для сохранения положения самой кнопки (была ли нажата или нет)
			var clone_k_r; // для сохранения положения слайдера (прокручивался или нет)
			var clone_dir_r; // для сохранения изначального направления слайдера
			to_r.mousedown(function(event){
				if (event.which==1){
					clone_dir_r = dir;
					clone_k_r = k;
					clearInterval(timerId);
					newtimerId_r = setInterval(function(){anim(0,-1);},1);
					k_r=true;
				}
				else {
					return false;
				}
			})
			.mouseup(function(){
				if(k_r){
					clearInterval(newtimerId_r);
					if (clone_k_r){
						timerId = setInterval(anim,speed);
						k_r=false;
					}
					if (!clone_k_r){
						k=false;
					}
					dir = clone_dir_r;
				}
			})
			.mouseleave(function(){if(k_r){to_r.mouseup();}});
			
			// левая кнопка аналогична правой только передаем параметр отрицательный для противоположной прокрутки
			var newtimerId_l = 0; // новый таймер
			var k_l = false; // для сохранения положения самой кнопки (была ли нажата или нет)
			var clone_k_l; // для сохранения положения слайдера (прокручивался или нет)
			var clone_dir_l; // для сохранения изначального направления слайдера
			to_l.mousedown(function(event){
				if (event.which==1){
					clone_dir_l = dir;
					clone_k_l = k;
					clearInterval(timerId);
					newtimerId_l = setInterval(function(){anim(0,1);},1);
					k_l=true;
				}
				else {
					return false;
				}
			})
			.mouseup(function(){
				if(k_l==true){
					clearInterval(newtimerId_l);
					if (clone_k_l){
						timerId = setInterval(anim,speed);
						k_l=false;
					}
					if (!clone_k_l){
						k=false;
					}
					dir = clone_dir_l;
				}
			})
			.mouseleave(function(){if(k_l){to_l.mouseup();}});
			
			// кнопка старт пауза
			pp.click(function(){
				if(!k){
					timerId = setInterval(anim,speed);
					pp.text('Стоп');
					k=true;
				}
				else if(k){
					clearInterval(timerId);
					pp.text('Старт');
					k=false;
				}
			})
			
		}
	}
	slider_logos();
	
	//popup price-info on calc page
	$('.pr-info a.up-pop').click(function() {
		$(this).siblings('.pr-popup').fadeToggle('fast');
		return false;
	});
	$('.pr-popup a.close').click(function() {
		$(this).parent('.pr-popup').fadeOut('fast');
		return false;
	});
	$(document).click(function(e){
		if ($(e.target).parents().filter('.pr-popup:visible').length != 1) {
			$('.pr-popup').fadeOut('fast');
		}
	});
	
});