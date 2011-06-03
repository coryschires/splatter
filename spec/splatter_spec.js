describe("jquery.splatter", function() {
  var callee;
  
  beforeEach(function() {
    setFixtures('<div id="callee"></div>')
    callee = $('#callee');
  });
  
  describe('plugin evocation', function() {
    it("should apply a class of 'splatter_box' to the callee", function() {
      expect(callee.splatter()).toHaveClass('splatter_box')
    });
    it("should apply a css position of relative to the callee", function() {
      expect(callee.splatter()).toHaveInlineStyle('position', 'relative')
    });
    it("should create create 20 splats", function() {
      var splat_count = callee.splatter().find('span').length;
      expect(splat_count).toEqual(20)
    });
    it("should apply a class of 'splat' to each splat", function() {
      var splat = callee.splatter().find('span').first();
      expect(splat).toHaveClass('splat');
    });
    it("should absolutely position each 'splat'", function() {
      var splat = callee.splatter().find('span').first();
      expect(splat).toHaveInlineStyle('position', 'absolute');
    });
    it("should set each 'splat' to overflow hidden", function() {
      var splat = callee.splatter().find('span').first();
      expect(splat).toHaveInlineStyle('overflow', 'hidden');
    });
  });
  
  describe('randomized font size', function() {
    it("should be no smaller than 20", function() {
      var font_size = callee.splatter().find('span').first().css('font-size').replace('px','');
      expect(font_size).toBeGreaterThan(19);
    });
    it("should be no larger than 300", function() {
      var font_size = callee.splatter().find('span').first().css('font-size').replace('px','');
      expect(font_size).toBeLessThan(301);
    });
    it("should be randomized", function() {
      var font_size_one = callee.splatter().find('span').first().css('font-size').replace('px','');
      var font_size_two = callee.splatter().find('span').last().css('font-size').replace('px','');
      expect(font_size_one).not.toEqual(font_size_two);
    });
  });
  
  describe('randomized positioning', function() {
    it("should have a top value greater than 0", function() {
      var top = callee.splatter().find('span').first().css('top').replace('px','');
      expect(top).toBeGreaterThan(0);
    });
    it("should have a top value less than the window height", function() {
      var top = callee.splatter().find('span').first().css('top').replace('px','');
      expect(top).toBeLessThan($(window).height);
    });
    it("should have a left value greater than 0", function() {
      var left = callee.splatter().find('span').first().css('left').replace('px','');
      expect(left).toBeGreaterThan(0);
    });
    it("should have a left value less than the window height", function() {
      var left = callee.splatter().find('span').first().css('left').replace('px','');
      expect(left).toBeLessThan($(window).width);
    });
    it("should have a randomized top value", function() {
      var top_one = callee.splatter().find('span').first().css('top').replace('px','');
      var top_two = callee.splatter().find('span').last().css('top').replace('px','');
      expect(top_one).not.toEqual(top_two);
    });
    it("should have a randomized left value", function() {
      var left_one = callee.splatter().find('span').first().css('left').replace('px','');
      var left_two = callee.splatter().find('span').last().css('left').replace('px','');
      expect(left_one).not.toEqual(left_two);
    });
  });
  
  describe('randomized color', function() {
    it("should be a valid rgb value", function() {
      var color = callee.splatter().find('span').first().css('color');
      expect(color).toBeAColor();
    });
    it("should be a randomized", function() {
      var color_one = callee.splatter().find('span').first().css('color');
      var color_two = callee.splatter().find('span').last().css('color');
      expect(color_one).not.toEqual(color_two);
    });
  });
  
  describe('configuration options', function() {
    it("splat_count option should specify the number of splats created", function() {
      var splat_count = callee.splatter({ splat_count: 45 }).find('span').length;
      expect(splat_count).toEqual(45);
    });
    it("min_font_size option should specify the minimum font size", function() {
      var font_size = callee.splatter({ min_font_size: 200 }).find('span').first().css('font-size').replace('px', '');
      expect(font_size).toBeGreaterThan(199);
    });
    it("min_font_size option should specify the maximum font size", function() {
      var font_size = callee.splatter({ max_font_size: 50 }).find('span').first().css('font-size').replace('px', '');
      expect(font_size).toBeLessThan(51);
    });
    it("height option should height of the splatter box", function() {
      var height = callee.splatter({ height: 100 }).height();
      expect(height).toEqual(100);
    });
    it("width option should width of the splatter box", function() {
      var width = callee.splatter({ width: 100 }).width();
      expect(width).toEqual(100);
    });
    it("splats option should allow you to pass an array of strings to use instead of stars", function() {
      var splatter = callee.splatter({ 
        splats: ['ruby', 'javascript', 'pearl', 'python', 'java']
      });
      var languages = splatter.find('.splat').map(function() {
        return $(this).text();
      }).get().reverse();
      expect(languages).toEqual(['ruby', 'javascript', 'pearl', 'python', 'java']);
    });
    it("colors option should allow you to pass an array of colors to use instead of random colors", function() {
      function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) { return ("0" + parseInt(x).toString(16)).slice(-2); }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
      }
      var splatter = callee.splatter({ 
        colors: ['#cccccc', '#e0e0e0', '#333333', '#666666', '#999999']
      });
      
      var colors = splatter.find('.splat').map(function() {
        return $(this).css('color');
      }).get().reverse();
      
      $.each(colors, function(index, color) {
        expect(['#cccccc', '#e0e0e0', '#333333', '#666666', '#999999']).toContain(rgb2hex(color));
      });
    });
    
    it("position option should allow you to specify a css top and left value for all splats", function() {
      callee.splatter({
        splat_count: 1,
        position: { top: 12, left: 10 }
      });
      var splat = callee.find('.splat');
      expect(splat.css('top')).toEqual('12px');
      expect(splat.css('left')).toEqual('10px');
    });
    
    describe('custom attributes', function() {
      it("should should apply the specified attribute name to each splat", function() {
        var splat = callee.splatter({ 
          custom_attributes: [{name: "data-custom", values: ['bar']}]
        }).find('.splat').first();
        expect(splat).toHaveAttr('data-custom');
      });
      it("should should randomly apply one of the specified values to the attribute", function() {
        var splats = callee.splatter({ 
          custom_attributes: [{name: "data-custom", values: ['foo', 'bar', 'baz']}]
        }).find('.splat');
        
        splats.each(function() {
          expect(['foo', 'bar', 'baz']).toContain( $(this).attr('data-custom') );
        });
      });
    });
    
    

  });
});