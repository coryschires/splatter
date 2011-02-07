/**
 * Splatter - jQuery plugin which creates a bunch of asterisks of
 * random size and color – which hopfully look cool.
 * 
 * Homepage: http://coryschires.com/jquery-splatter-plugin/
 * Source Code: https://github.com/coryschires/splatter
 * 
 * Copyright (c) 2011 Cory Schires (coryschires.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Version: 0.1.0
 */

(function($) {

  $.splatter = {
    defaults: {
      custom_attributes: [],
      colors: [],
      splats: [],
      hover_on: function() {},
      hover_off: function() {},
      splat_count: 20,
      min_font_size: 20,
      max_font_size: 300,
      height: $(window).height(),
      width: $(window).width()
    }
  }

    $.fn.extend({
        splatter: function(config) {

            var config = $.extend({}, $.splatter.defaults, config);
            
            config.splat_count = function() {
              return config.splats.length > 0 ? config.splats.length : config.splat_count
            }();
            
            // private functions
            var randomized_font_size = function() {
              var min = config.min_font_size;
              var max = config.max_font_size;
              return Math.floor( Math.random() * (max - min) ) + min;
            };

            var randomized_top = function() {
              return Math.floor( Math.random() * config.height);
            };
            
            var randomized_right = function() {
              return Math.floor( Math.random() * config.width);
            };
            
            var radomized_color = function() {
              
              if (config.colors.length > 0) {
                return config.colors[Math.floor( Math.random() * config.colors.length)];
              } else {
                var red = Math.floor( Math.random() * 256);
                var green = Math.floor( Math.random() * 256);
                var blue = Math.floor( Math.random() * 256);

                return 'rgb('+ red +','+ green +','+ blue +')';
              }
            };
            
            var determine_splat_type = function() {
              return config.splats.length > 0 ? config.splats.pop() : '*';
            };
            
            var apply_custom_attributes = function(splat) {
              if (config.custom_attributes.length > 0) {
                $.each(config.custom_attributes, function(index, attr) {
                  var value = attr.values[Math.floor( Math.random() * attr.values.length)]
                  splat.attr(attr.name, value);
                });
              }
            };
            
            var apply_hover_events = function(splat) {
              splat.hover(function() {
                config.hover_on(splat);
              }, function() {
                config.hover_off(splat);
              });
            }
            
            // begin plugin loop
            return this.each(function() {
                var splatter_box = $(this);
                
                splatter_box
                  .addClass('splatter_box')
                  .css({
                    'position': 'relative',
                    'height': config.height,
                    'width': config.width
                });
                
                for (var i=0; i < config.splat_count; i++) {
                  var splat = $('<span>')
                    .text(determine_splat_type())
                    .addClass('splat')
                    .css({
                      'position': 'absolute',
                      'font-size': randomized_font_size(),
                      'top': randomized_top(),
                      'left': randomized_right(),
                      'color': radomized_color()
                    });
                  
                  apply_custom_attributes(splat);
                  
                  apply_hover_events(splat);
                  
                  splatter_box.append(splat);
                };
                
            })
        }
    })

})(jQuery);