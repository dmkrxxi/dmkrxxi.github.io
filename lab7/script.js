/*jslint browser: true, devel: true, this: true, jquery: true*/
$(document).ready(function(){
    "use strict";
    $('.slider-container').slick({
        infinite: true,     
        speed: 300,         
        arrows: true,       
        dots: true,         
        slidesToShow: 3,
        slidesToScroll: 1,  
        responsive: [
            {
                breakpoint: 1024, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});