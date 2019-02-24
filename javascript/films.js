$(document).ready(function () {
  let table = $('.films');
  $.getJSON("javascript/json/films.json", function(json) {
    $.each(json, function (key, entry) {
      var title = entry.title;
      var tags = entry.tags;
      var row = $('<tr><td class="film">' + title + '</td><td class="star unBookmarked">&star;</td><td class="film_tags">' + tags + '</tr><');//&starf;
      table.append(row);
      if (key > 14) {
        table.find('tr').eq(key).hide();
      }
    })
  });
  
  
  $(document).on('click', '.button.show_more', function() {
    let i = table.find('tr:visible').length;
    let j = i + 15;
    while (i < j) {
      table.find('tr').eq(i).show();
      i++;
    }
    if (table.find('tr').eq(-1).is(':visible')) {
      $(this).hide();
    }
  });
  
});