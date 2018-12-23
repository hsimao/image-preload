(function($) {
  function PreLoad(images, options) {
    this.images = typeof image === "string" ? [images] : images;
    this.defaults = {
      order: "unordered", // 加載方式，預設無序加載
      each: null, // 每一張圖片加載完後執行
      all: null // 全部圖片加載完後執行
    };
    this.options = $.extend({}, this.defaults, options);
    // 判斷需執行有序加載或有序加載
    if (this.options.order === "unordered") {
      this._unordered();
    } else {
      this._ordered();
    }
  }

  // 無順序加載
  PreLoad.prototype._unordered = function() {
    const { images, options } = this;
    let count = 0;

    $(images).each((i, src) => {
      const imgObj = new Image();
      $(imgObj).on("load error", () => {
        // 如果有設置each才執行each() 的callback函式
        options.each && options.each(count);

        // 如果已經加載到最後一張
        if (count >= images.length - 1) {
          // 如果有設置all才執行all() 的callback函式
          options.all && options.all();
        }
        count++;
      });
      imgObj.src = src;
    });
  };

  // 有序加載
  PreLoad.prototype._ordered = function() {
    const { images, options } = this;
    let count = 0;

    _load();
    function _load() {
      const imgObj = new Image();
      $(imgObj).on("load error", () => {
        // 如果有設置each才執行each() 的callback函式
        options.each && options.each(count);
        if (count >= images.length) {
          // 如果有設置all才執行all() 的callback函式
          options.all && options.all();
        } else {
          _load();
        }
        count++;
      });
      imgObj.src = images[count];
    }
  };

  // 將方法加入jqeury內
  $.extend({
    PreLoad: function(images, options) {
      new PreLoad(images, options);
    }
  });
})(jQuery);
