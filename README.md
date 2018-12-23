# 圖片預加載插件

### 使用方式:

```javascript
const preLoad = new PreLoad(images, {
  // 有序加載 or 無序加載 "unordered", 若無設置為預設無序加載
  order: "ordered",
  // 每當圖片加載完執行
  each: count => {
    console.log(count + "張圖片加載完成");
  },
  // 全部照片加載完執行
  all: () => {
    console.log("全部圖片加載完成");
  }
});
```

### 使用方式 jQuery 插件版:

```javascript
$.PreLoad(images, {
  // 有序加載 or 無序加載 "unordered", 若無設置為預設無序加載
  order: "ordered",
  // 每當圖片加載完執行
  each: count => {
    console.log(count + "張圖片加載完成");
  },
  // 全部照片加載完執行
  all: () => {
    console.log("全部圖片加載完成");
  }
});
```
