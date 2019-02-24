$(document).ready(function() {
  
  $(document).on('click', '.bookmarks_button', function() {
    var film_button, tr, i, search, tags, show_more;
    film_button = $('.films_button');
    search = $('.search');
    tags = $('.tags');
    tr = $('.films tr');
    show_more = $('.show_more');
    $(this).addClass('active');
    film_button.removeClass('active');
    search.hide();
    tags.hide();
    show_more.hide();
    for (i = 0; i < tr.length; i++) {
      if (tr.eq(i).find('.bookmarked').length > 0) {
        tr.eq(i).show();
      } else {
        tr.eq(i).hide();
      }
    }
  });
  
  $(document).on('click', '.films_button', function() {
    var bookmark_button, tr, i, search, tags, show_more;
    bookmark_button = $('.bookmarks_button');
    search = $('.search');
    tags = $('.tags');
    tr = $('.films tr');
    show_more = $('.show_more');
    $(this).addClass('active');
    bookmark_button.removeClass('active');
    search.show();
    tags.show();
    show_more.show();
    tr.hide();
    for (i = 0; i < 15 ; i++) {
      tr.eq(i).show();
    }
  });
  
});