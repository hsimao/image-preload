// 圖片預加載

function PreLoad(images, options) {
  if (!images) throw Error("請設定images");
  // 如果傳入為單張圖片字串，就自動包成陣列
  this.images = typeof images === "string" ? [images] : images;

  // 使用者可自訂的參數預設值
  this.defaults = {
    order: "unordered", // 加載方式，預設無序加載
    each: null, // callback 每一張圖片加載完後執行
    all: null // callback 全部圖片加載完後執行
  };
  // 自訂callback覆蓋defaults
  this.options = Object.assign(this.defaults, options);

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

  function _handleNext() {
    // 如果有設置each才執行each的callback函式
    options.each && options.each(count);

    // 如果已經加載到最後一張
    if (count >= images.length - 1) {
      // 如果有設置all才執行all的callback函式
      options.all && options.all();
    }
    count++;
  }

  images.forEach(src => {
    if (typeof src !== "string") return;
    const imgObj = new Image();

    // 監聽load跟error，都繼續執行下一張預加載
    imgObj.addEventListener("load", _handleNext);
    imgObj.addEventListener("error", _handleNext);

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
    imgObj.addEventListener("load", () => {
      // 如果有設置each才執行each() 的callback函式
      options.each && options.each(count);

      // 如果已經加載到最後一張
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

// ======
// 使用方式
/*
const preLoad = new PreLoad(images, {
  order: "ordered", // 有序加載
  each: count => {
    // 每張照片加載完成執行，count為當前已加載完的數量
    console.log(count);
  },
  all: () => {
    console.log("全部圖片加載完成");
  }
});
 */
