// 圖片預加載

function PreLoad(images, options) {
  if (!images) throw Error("請設定images");
  // 如果傳入為單張圖片字串，就自動包成陣列
  this.images = typeof images === "string" ? [images] : images;

  // 預設callback 函示為空
  this.defaults = {
    each: null, // 每一張圖片加載完後執行
    all: null // 全部圖片加載完後執行
  };
  // 自訂callback覆蓋defaults
  this.options = Object.assign(this.defaults, options);

  this._unoredered();
}

// 無順序加載
PreLoad.prototype._unoredered = function() {
  const images = this.images;
  const options = this.options;
  const length = this.images.length;
  let count = 0;

  images.forEach(src => {
    if (typeof src !== "string") return;
    const imgObj = new Image();

    imgObj.addEventListener("load", () => {
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

// ======
// 使用方式
/*
const preLoad = new PreLoad(images, {
  each: count => {
    // 每張照片加載完成執行，count為當前已加載完的數量
    console.log(count);
  },
  all: () => {
    console.log("全部圖片加載完成");
  }
});
 */
