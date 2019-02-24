$(document).ready(function () {
  let dropdown = $('#tags');
  $.getJSON("javascript/json/tags.json", function(json) {
    $.each(json, function (key, entry) {
      dropdown.append($('<option></option>').attr('value', entry).text(entry));
    })
  });

  dropdown.on('change', function() {
    if(dropdown.selectedIndex != 0) {
      dropdown.before('<div class="tag_added">'+ dropdown.val() +'<button class="tag_button" type="button" style="display:none;">x</button></div>');
      dropdown.find('option[value="' + dropdown.val() + '"]').prop("disabled", true);
      filterByTag();
      dropdown.val('');
    }
  });

  $(document).on('mouseenter', '.tag_added', function () {
    $(this).find(".tag_button").show();
  }).on('mouseleave', '.tag_added', function () {
    $(this).find(".tag_button").hide();
  });
  
  $(document).on('click', '.tag_button', function() {
    let div_text = $(this).closest('.tag_added').text();
    div_text = div_text.substring(0, div_text.length - 1);
    $(this).closest('.tag_added').remove();
    dropdown.find('option[value="' + div_text + '"]').prop("disabled", false);
    if ($('.tag_added').length == 0) {
      $('.show_more').show();
      var tr = $('.films').find('tr');
      tr.hide();
      for (var j = 0; j < 15; j++) {
        tr.eq(j).show();
      };
      inputSearch();
    } else {
      inputSearch();
      filterByTag();
    };
  });
  
  function filterByTag() {
    var input, tr, td, button_show, tag_added, tag_added_array, film_tags_array, i, j, k, matches, tr_array;
    input = $('#search');
    tr = $('.films').find('tr');
    button_show = $('.show_more');
    tag_added = $('.tag_added');
    tag_added_array = tag_added.text().split('x');
    if (input.val() == '') {
      matches = 0;
      for (i = 0; i < tr.length; i++) {
        td = $('.film_tags').eq(i).text();
        film_tags_array = td.split(',');
        for (j = 0; j < tag_added_array.length - 1; j++) {
          for (k = 0; k < film_tags_array.length; k++) {
            if (tag_added_array[j] == film_tags_array[k]) {
              matches++;
            }
          }
        }
        if (matches == tag_added_array.length - 1) {
          tr.eq(i).show();
          matches = 0;
        } else {
          tr.eq(i).hide();
          matches = 0;
        }
      }
      button_show.hide();
    } else {
      matches = 0;
      if (tr.is(':visible')) {
        tr_array = $('.films').find('tr:visible');
        for (i = 0; i < tr_array.length; i++) {
          td = tr_array.find('.film_tags').eq(i).text();
          film_tags_array = td.split(',');
          for (j = 0; j < tag_added_array.length - 1; j++) {
            for (k = 0; k < film_tags_array.length; k++) {
              if (tag_added_array[j] == film_tags_array[k]) {
                matches++;
              }
            }
          }
          if (matches == tag_added_array.length - 1) {
            tr_array.eq(i).show();
            matches = 0;
          } else {
            tr_array.eq(i).hide();
            matches = 0;
          }
        }
     };
   }
  };
  
  function inputSearch() {
    var input, filter, tr, td, i, txtValue, button_show, tag_added, tag_added_array, tr_array;
    input = $('#search');
    filter = input.val().toUpperCase();
    tr = $('.films').find('tr');
    button_show = $('.show_more');
    tag_added = $('.tag_added');
    tag_added_array = tag_added.text().split('x');
    if( tag_added_array == '') {
      for (i = 0; i < tr.length; i++) {
        td = $('.film').eq(i);
        txtValue = td.text();
        if (txtValue.toUpperCase().indexOf(filter) > - 1){
          tr.eq(i).show();
        } else {
          tr.eq(i).hide();
        }
        button_show.hide();
      }
    } else {
      if (tr.is(':visible')) {
        tr_array = $('.films').find('tr:visible');
        for (i = 0; i < tr_array.length; i++) {
          td = tr_array.find('.film').eq(i);
          txtValue = td.text();
          if (txtValue.toUpperCase().indexOf(filter) > - 1){
            tr_array.eq(i).show();
          } else {
            tr_array.eq(i).hide();
          }
          button_show.hide();
        }
      }
      filterByTag();
    }
    if (input.val() == '') {
      tr.hide();
      for (var j = 0; j < 15; j++) {
        tr.eq(j).show()
      }
      button_show.show();
    }
    filterByTag();
  };
  
  $(document).on('keyup', '#search', inputSearch);
});