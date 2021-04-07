/**
 * @file
 * Custom scripts for theme.
 */
(function ($, Drupal, window, document, undefined) {

  // Horizontal Dropdown in top navbar
  Drupal.behaviors.red_navbar_secondary = {
    attach: function (context) {
      var $context = $(context);
      var mq = window.matchMedia("(min-width: 768px)");

      $('#roof-top, .block--sitebranding, #navbar-primary .navbar-nav > li:not(.dropdown)').on('mouseenter', function () {
        if (mq.matches) {
          $context.find('.dropdown').removeClass('open');
          $('#navbar-secondary').hide();
        };
      });

      $context.find('.dropdown').once('red_navbar_secondary').each(function () {
        var dropdown = this;

        // Show dropdown on hover and focus.
        $(this).on('mouseenter.red.dropdown', function (e) {
          var menuid = $(dropdown).data('menuid');
          var target = $('[data-parent="' + menuid + '"]', '#navbar-secondary');
          if (mq.matches) $('#navbar-secondary').show();
          $('#navbar-secondary .navbar-nav').hide();
          target.show();
          $('.dropdown', '#navbar-primary .navbar-nav').removeClass('open');
          $(dropdown).addClass('open');
        });
        $('#site-header').on('mouseleave.red.dropdown', function (e) {
          if ($(dropdown).hasClass('open')) {
            var menuid = $(dropdown).data('menuid');
            var target = $('[data-parent="' + menuid + '"]', '#navbar-secondary');
            $('#navbar-secondary').hide();
            target.hide();
            $(dropdown).removeClass('open');
          }
        });

        $(this).on('keydown.red.dropdown', function (e) {
          // Prevent up/down arrow from doing anything -- they conflict with
          // using focus to show the dropdown, and the default Bootstrap keydown
          // handler will trigger our click handler to visit the link.
          if (e.keyCode == 38 || e.keyCode == 40) {
            return false;
          }
          // Show/hide dropdown with spacebar.
          if (e.keyCode == 32) {
            $('>[data-toggle="dropdown"]', dropdown).dropdown('toggle');
            return false;
          }
          // Hide the dropdown with the escape hey.
          if (e.keyCode == 27) {
            // Leave focus on the parent after it's hidden.
            $('>[data-toggle="dropdown"]', dropdown).focus();
            hide();
            return false;
          }
        });

        // Allow a.dropdown-toggle to be clickable.
        if ($(this).has('> a.dropdown-toggle')) {
          $(this).on('click.red.dropdown', function (e) {
            var $target = $(e.target);
            if ($target.parent().get(0) == dropdown && $target.is('a.dropdown-toggle') && $target.attr('href')) {
              e.preventDefault();
              window.location.href = $target.attr('href');
            }
          });
        }
      });
    }
  }

  Drupal.behaviors.red_navbar_collapsed = {
    attach: function (context) {
      $('.navbar-collapse').on('hide.bs.collapse', function () {
        $('#navbar-secondary').hide();
      });
    }
  }

  Drupal.behaviors.red_make_product_box_link = {
    attach: function (context) {
      $('.box', '.product-covers').once('red-product-box').each(function () {
        var url = $(this).find('h3 > a').attr('href');
        $(this).on('click', function () {
          location.href = url;
        });
      });
      $('.box', '.view-id-articles.view-display-id-page_1').once('red-product-box').each(function () {
        var url2 = $(this).find('.views-field-title a').attr('href');
        $(this).on('click', function () {
          location.href = url2;
        });
      });
      $('.box', '.view-id-projects.view-display-id-page_1').once('red-product-box').each(function () {
        var url2 = $(this).find('.views-field-title a').attr('href');
        $(this).on('click', function () {
          location.href = url2;
        });
      });
      $('.box', '.view--taxonomy-term--page-1 .col-md-4').once('red-product-box').each(function () {
        var url = $(this).find('.product__field-cover > a').attr('href');
        $(this).on('click', function () {
          location.href = url;
        });
      });
      $('.box', '.paragraph--type--image-card').once('red-product-box').each(function () {
        var url = $(this).find('.image-card__field-link > a').attr('href');
        $(this).on('click', function () {
          location.href = url;
        });
      });
    }
  }

  Drupal.behaviors.red_animated_scroll = {
    attach: function (context) {
      var $root = $('html, body');
      $('a', '#navbar-secondary').click(function () {
        var url = $.attr(this, 'href');
        if (url.indexOf('#') !== -1) {
          var target = '#' + url.substring(url.indexOf('#') + 1);
          $root.animate({
            scrollTop: $(target).offset().top
          }, 700, 'swing');
          return false;
        };
      });
    }
  }

  Drupal.behaviors.red_force_hover = {
    attach: function (context) {
      $('a', '.card-box').on('mouseenter mouseover', function () {
        $(this).parent('.card-overlay').focus();
      });
    }
  }

  Drupal.behaviors.red_fit_cover_height = {
    attach: function (context) {
      $(window).on('load resize', function (e) {
        $('.box', '.col-md-4.view__row').each(function () {
          var image_height = $(this).find('.views-field-field-cover img').height();
          if ($(this).find('.views-field-field-cover img').length === 0) {
            image_height = $(this).find('.product__field-cover img').height();
          };
          $(this).find('.covering').height(image_height);
        });
      });
    }
  }

  Drupal.behaviors.red_open_finder = {
    attach: function (context) {
      $('#finder-btn').click(function () {
        $('#finder').removeClass('hide');
      });
      $('.close-btn', '#finder').click(function () {
        $('#finder').addClass('hide');
      })
    }
  }

  var removeDuplicates = function (selector) {
    var els = document.querySelectorAll(selector);
    var originalEl = els[0];
    for (var i = 0; i < els.length; i++) {
      if (els[i] !== originalEl) {
        els[i].parentNode.removeChild(els[i]);
      }
    }
  }

  $(function () {
    // 중복 제거
    // netClimber 목록 화면 -- /taxonomy/term/4
    netClimberSub = $('.view--taxonomy-term--page-1 .view-display-id-attachment_1');
    if (netClimberSub.length > 0) {
      doubleMasts = [31, 32, 33];
      quadMasts = [36, 37, 38];
      targets = doubleMasts.concat(quadMasts);
      $.each(targets, function(i, item) {
        removeDuplicates('.views__row .product--' + item);
      });
    }
    // netClimber 정렬 화면 -- /taxonomy/term/4/sort
    netClimberSort = $('.view--taxonomy-term--page-2 .view-display-id-attachment_2');
    if (netClimberSort.length > 0) {
      singleMasts = [19, 20, 21, 22, 23, 179, 415, 182, 183, 184, 185, 180, 24, 25, 26, 27, 181, 28, 29, 30];
      doubleMasts = [31, 32, 33];
      quadMasts = [36, 37, 38];
      targets = singleMasts.concat(doubleMasts, quadMasts);
      $.each(targets, function(i, item) {
        removeDuplicates('.draggable.product--' + item);
      });
    }

    // termRoot
    termRoot = $('.view--taxonomy-term--page-1');
    if (termRoot.length > 0) {
      var seen = {};
      $('.view__row').each(function () {
        var txt = $(this).attr('class');
        if (seen[txt]) {
          $(this).remove();
        } else {
          seen[txt] = true;
        }
      });
    }
    // termRootSort
    termRootSort = $('.view--taxonomy-term--page-2');
    if (termRootSort.length > 0) {
      var seen = {};
      $('tr.draggable').each(function () {
        var txt = $(this).attr('class');
        if (seen[txt]) {
          $(this).remove();
        } else {
          seen[txt] = true;
        }
      });
    }
  });

})(jQuery, Drupal, this, this.document);
