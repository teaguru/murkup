import SVGInjector from 'svg-injector'

let Common = function() {
  this.init();
};

Common.prototype = {
  init: function() {
    this.svgStoreToPage();
  },

  svgStoreToPage: () => {
    let mySVGsToInject = document.querySelectorAll('.svg-sprite');
    SVGInjector(mySVGsToInject);
  }
};

new Common;


