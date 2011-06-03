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
      custom_attributes: [],                    // specify custom attributes to add to splats which can be used to store data
      colors: [],                               // specify the colors to be randomly applied to the splats
      splats: [],                               // specify strings to be used as splats – defaults to * 
      hover_on: function() {},                  // add a custom function to be called when hovering on a splat
      hover_off: function() {},                 // add a custom function to be called when hovering off a splat
      splat_count: 20,                          // number of splats that will be drawn
      min_font_size: 20,                        // minimum font size for splats
      max_font_size: 300,                       // maximum font size for splats
      height: $(window).height(),               // height of splatter
      width: $(window).width(),                 // width of splatter
      position: { top: false, left: false }     // explicitly set top and left position of all splats – useful if, for example, 
                                                //    you'd like to draw a splat inside a click event (credit github.com/mithro)
    }
  }

    $.fn.extend({
        splatter: function(config) {

            var config = $.extend({}, $.splatter.defaults, config);
            
            config.splat_count = function() {
              return config.splats.length > 0 ? config.splats.length : config.splat_count
            }();
            
            // private functions
            var css_font_size = function() {
              var min = config.min_font_size;
              var max = config.max_font_size;
              return Math.floor( Math.random() * (max - min) ) + min;
            };

            var css_top = function() {
              return config.position.top ? config.position.top : Math.floor( Math.random() * config.height);
            };
            
            var css_left = function() {
              return config.position.left ? config.position.left : Math.floor( Math.random() * config.width);
            };
            
            var css_color = function() {
              
              if (config.colors.length > 0) {
                return config.colors[Math.floor( Math.random() * config.colors.length)];
              } else {
                var red = Math.floor( Math.random() * 256);
                var green = Math.floor( Math.random() * 256);
                var blue = Math.floor( Math.random() * 256);

                return 'rgb('+ red +','+ green +','+ blue +')';
              }
            };
            
            var splat_text = function() {
              return config.splats.length > 0 ? config.splats.pop() : '*';
            };
            
            var draw_splat = function() {
              var font_size = css_font_size();
              var line_height = (font_size * 0.78)+'px' 
              var height = config.splats.length == 0 ? (font_size * 0.31) : (font_size * 1)

              var splat = $('<span>')
                .text(splat_text())
                .addClass('splat')
                .css({
                  'font-size': font_size,
                  'color': css_color(), 
                  'overflow': 'hidden',
                  'line-height': line_height,
                  'height': height,
                  'position': 'absolute', 
                  'top': css_top(), 
                  'left': css_left()
                });

              return splat;
            }
            
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
                  
                  var splat = draw_splat();
                  
                  apply_custom_attributes(splat);
                  
                  apply_hover_events(splat);
                  
                  splatter_box.append(splat);
                };
            })
        }
    })

})(jQuery);