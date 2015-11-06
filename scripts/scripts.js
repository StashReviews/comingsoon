/* Tooltips */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* Form Validation - REF: http://validity.thatscaptaintoyou.com/Demos/index.htm#CommonValidators */
$(function () {
  $("#reserveUsernameForm").validity(function() {
      $(".reserveUsernameInput").require().maxLength(20, "Sorry, usernames cannot be longer than 20 characters.").minLength(3, "Sorry, usernames cannot be less than 3 characters.");
      $(".reserveEmailInput").require().match("email");
  }); 
  $("#reserveUsernameTakenForm").validity(function() {
      $(".reserveUsernameInput").require().maxLength(20, "Sorry, usernames cannot be longer than 20 characters.").minLength(3, "Sorry, usernames cannot be less than 3 characters.");
      $(".reserveEmailInput").require().match("email");
  }); 
})

/* Rebranding Modal */
$(window).load(function(){
  $('#rebrandingModal').modal('show');
})


/* Reserve Username Modal */
$(".reserveBtn").on("click", function(){
  $('#rebrandingModal').modal('hide');
  $('#reserveUsernameModal').modal('show');
  $('#reserveEmailTakenModal').modal('hide');
  $('#reserveUsernameTakenModal').modal('hide');
  $('#reserveUsernameSuccessModal').modal('hide');
})


/* Smooth Scrolling */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


