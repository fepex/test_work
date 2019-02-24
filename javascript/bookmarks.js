$(document).ready(function () {
  
  setTimeout(function() {
    if(localStorage.length > 0) {
      var tr = $('.films tr');
      for (var i = 0; i < tr.length; i++) {
        if(localStorage.getItem(i) != null) {
          tr.eq(i).find('.star').addClass('bookmarked').removeClass('unBookmarked').html('&starf;');
        }
      }
    }
  }, 200);
  
  $(document).on('click', '.unBookmarked', function() {
    $(this).html('&starf;');
    $(this).addClass('bookmarked');
    $(this).removeClass('unBookmarked');
    var ls_key = $(this).closest('tr').index().toString();
    var ls_val = $(this).closest('tr').find('td.film').text();
    localStorage.setItem(ls_key, ls_val);
  });
  
  $(document).on('click', '.bookmarked', function() {
    $(this).html('&star;');
    $(this).addClass('unBookmarked');
    $(this).removeClass('bookmarked');
    var ls_key = $(this).closest('tr').index().toString();
    localStorage.removeItem(ls_key);
    var bookmark_button = $('.bookmarks_button');
    if (bookmark_button.hasClass('active')) {
      $(this).closest('tr').hide();
    }
  });
  
});