$(window).load(function() { // makes sure the whole site is loaded
  $('.loading-page').delay(1500).fadeOut('fast'); // will fade out the white DIV that covers the website.
    setTimeout( function(){
    $('#no-scrollbar').css('overflow-y','scroll'); //Non funzionava come il semplice delay e fadeout avendo il .css
      },1500);
});

/*Serve per il contatore*/
$({ Counter: 0 }).animate({
  Counter: $('#count').text()
    }, { 
      duration: 1500,
      easing: 'linear',
      step: function() {
        $('#count').text(Math.ceil(this.Counter));
          }
});

/*Animazione click dalla navbar*/
$(".navbar-collapse ul li a[href^='#']").on('click', function(e){
  target = this.hash;
  e.preventDefault();

  $('html,body').animate({
    scrollTop : $(this.hash).offset().top
    }, 600, function() {
       window.location.hash = target;
      });
 });

/*Animazione al click della freccia per tornare top*/
$(".up-arrow[href^='#']").on('click', function(e){
  target = this.hash;
  e.preventDefault();
  
  $('html,body').animate({
    scrollTop : $(this.hash).offset().top
    }, 600, function() {
       window.location.hash = target;
    });
});

AOS.init({disable: 'mobile'});
