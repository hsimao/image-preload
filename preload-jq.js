(function($) {
  console.log($);

  function PreLoad(images, options) {
    this.images = typeof image === "string" ? [images] : images;
    this.defaults = {
      each: null, // 每一張圖片加載完後執行
      all: null // 全部圖片加載完後執行
    };
    this.options = $.extend({}, this.defaults, options);
    this._unoredered();
  }

  // 無順序加載
  PreLoad.prototype._unoredered = function() {
    const images = this.images;
    const options = this.options;
    const length = this.images.length;
    let count = 0;

    $(images).each((i, src) => {
      const imgObj = new Image();
      $(imgObj).on("load error", () => {
        // 如果有設置each才執行each() 的callback函式
        options.each && options.each(count);

        // 如果已經加載到最後一張
        if (count >= length - 1) {
          // 如果有設置all才執行all() 的callback函式
          options.all && options.all();
        }
        count++;
      });
      imgObj.src = src;
    });
  };

  // 將方法加入jqeury內
  $.extend({
    PreLoad: function(images, options) {
      new PreLoad(images, options);
    }
  });
})(jQuery);
