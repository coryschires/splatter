beforeEach(function() {
  this.addMatchers({
    toBeAColor: function(hexcode) {
      var m = this.actual.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
      return m[0] && m[1] <= 255 && m[1] >= 0 && m[2] <= 255 && m[2] >= 0 && m[3] <= 255 && m[3] >= 0
    },
    toHaveInlineStyle: function(property, value) {
      return this.actual.css(property) === value;
    }
  })
});