
$(function() {
    $('.burger, .burger__line')
        .on('click', function(event){ 
            const menu = $('.header__popup-container');
            if(event.target == this){						
                if(menu.is(':hidden')){					                           
                    menu.fadeIn();					
                    $('.burger').css({ 'display': 'none'});
                    $('.close').css({ 'display': 'block'});				
            } 
        }
    });

    $('.close, .close__line, .ref').on('click', function(event){  
            const menu = $('.header__popup-container');
            if(event.target == this){						
                if(menu.is(':visible')){							                                     
                    menu.fadeOut();					
                    $('.close').css({ 'display': 'none'});
                    $('.burger').css({ 'display': 'block'});				
            }			 
        }		
    });   

    // Owl Carousel
    var owl = $(".owl-carousel");
    owl.owlCarousel({    	
        margin: 30,
        loop: true,    	
        dots: true,
        responsive: {
            0: {
                items: 1,
                autoplay: true,
            },
            426: {
                items: 2,			    
            },			  			  
            1170: {
                items: 3,
                autoWidth: true,
            }
        }    		
    });

    $(".next").on('click', function(){
        owl.trigger("next.owl.carousel");
    });

    $(".prev").on('click', function(){
        owl.trigger("prev.owl.carousel");
    });

    function disableScroll(){                            //создаем функцию откл скрола мыши               
        $('html').css({                            //у всего док-та доб-ем обработчик события	  
            'overflow': 'hidden',                        //откл css свойство	
        });
        $('body').css({
            'overflow-y': 'scroll',
        });
    }		
    
    function enableScroll(){                                        
        $('html, body').css({
            'overflow': 'auto',                   //вкл сss свойство
        });		   		
    }

    $('input[type="tel"]').inputmask({"mask": "+7(999) 999-9999"}); //specifying options

    $('.header-top__button, .footer__button, .header-top__icon-phone')
        .on('click', function(event){ 
            const menu = $('.call-form_container');
            if(event.target == this){						
                if(menu.is(':hidden')){					
                    disableScroll();                                //по нажатию кнопки                    
                    menu.css({'display': 'flex', 'align-items': 'center'})     //появляется скрытый изначально контейнер,после его
                    menu.find(".call-form_item").get(0).focus();
                    $('.header-wrap').css({ 'z-index': '10'})					
            }
            window.myBtn = this;
        }
        
    });	

    $('.btn_close').on('click', function() {
        $('form').each(function () {
            $(this).validate().resetForm()
        })		
        $('.call-form_container, .info-form_container').hide();
            enableScroll();	
            $('.header-wrap').css({ 'z-index': '99'})
            $('form').each(function () {
                $(this).get(0).reset();
            })
        window.myBtn.focus();				
    });	 
    
    $('.info-form_container, .call-form_container').on('click', function (e){
        const menu = $('.info-form_container, .call-form_container'); 
        const div = $('.call-form'); 
        if (!div.is(e.target) 
            && div.has(e.target).length === 0) { 
                
                    $('form').each(function () {
                        $(this).validate().resetForm()
                    })		
                    menu.hide();
                        enableScroll();	
                        $('.header-wrap').css({ 'z-index': '99'})
                        $('.call-form').show();
                        $('.successful-messadges').hide();
                        $('form').each(function () {
                            $(this).get(0).reset();                        
                    })
                window.myBtn.focus();
        }
    });

    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('form').each(function () {
            $(this).validate().resetForm();		
            })             
            $('.call-form_container, .info-form_container').fadeOut();
            enableScroll();	
            $('.header-wrap').css({ 'z-index': '99'})
            $('form').each(function () {
                $(this).get(0).reset();
            })
            window.myBtn.focus();
        }
    });
    
    $('.info__button, .coast__button')
        .on('click', function(event){ 
            const menu = $('.info-form_container');
            if(event.target == this){						
                if(menu.is(':hidden')){					
                    disableScroll();                                        //по нажатию кнопки
                    menu.css({'display': 'flex', 'align-items': 'center'})         //появляется скрытый изначально контейнер,после его
                    menu.find(".call-form_item").get(0).focus();
                    $('.header-wrap').css({ 'z-index': '10'})					
            } 
        }
        window.myBtn = this;
    });	  

    $('form').each(function () {        
        $(this).validate({
            errorPlacement() {
                return true;							
            },
            submitHandler(form) {
                const th = $(form);
                $.ajax({
                    type: 'POST',
                    url: 'mail.php',
                    data: th.serialize(),
                }).done(() => {
                    console.log('отправлено')
                    th.trigger('reset');
                });
                $('.call-form').hide();
                $('.successful-messadges').show();                

                $('.fa').on('click', function(event){ 

                    const menu = $('.info-form_container, .call-form_container');
                    if(event.target == this){						
                        if(menu.is(':visible')){					                                     
                            menu.fadeOut();					
                            enableScroll();
                            $('.header-wrap').css({ 'z-index': '99'});	
                            $('.call-form').show();
                            $('.successful-messadges').hide();						   					
                        }                      															 
                    }
                    window.myBtn.focus();	
                    $('form').each(function () {
						$(this).get(0).reset();
					})
                });
                return false;
            }
        });	            				
    });				
});
