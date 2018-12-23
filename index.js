const images = [
  "https://images.unsplash.com/photo-1545457060-fa0ce5cffdc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
  "https://images.unsplash.com/photo-1522509585149-c9cd39d1ff08?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60",
  "https://images.unsplash.com/photo-1496283748916-d4cf2877b269?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1496047017858-c558b925d95c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1526&q=80",
  "https://images.unsplash.com/photo-1527432734427-46138a6ef2df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
];

// const images = [
//   "./image/01.jpeg",
//   "./image/02.jpeg",
//   "./image/03.jpeg",
//   "./image/04.jpeg",
//   "./image/05.jpeg"
// ];

let index = 0;
let length = images.length;

const pages = document.querySelector(".pages");
const img = document.getElementById("img");
const progress = document.querySelector(".progress");
const loading = document.querySelector(".loading");
let btns = document.querySelectorAll(".btn");
btns = [...btns];

// 使用PerLoad插件
const preLoad = new PreLoad(images, {
  order: "ordered", // 有序加載
  each: count => {
    // 每張照片加載完成執行，count為當前已加載完的數量
    progress.innerText = Math.round(((count + 1) / length) * 100) + "%";
  },
  all: () => {
    console.log("全部圖片加載完成");
    loading.style.display = "none";
  }
});

// 使用jQuery PerLoad插件
// $.PreLoad(images, {
//   order: "ordered", // 有序加載
//   each: count => {
//     progress.innerText = Math.round(((count + 1) / length) * 100) + "%";
//   },
//   all: () => {
//     console.log("全部圖片加載完成");
//     loading.style.display = "none";
//   }
// });

btns.forEach(item => {
  item.addEventListener("click", event => {
    event.preventDefault();

    const type = event.target.getAttribute("data-type");
    if (type === "prev") {
      console.log("上一張");
      index--;
      // Math.max 返回最大值，如果index小於0則會返回0
      index = Math.max(0, index);
      // 精簡版(合併index--) index = Math.max(0, --index);;
    } else {
      index++;
      // Math.min 返回最小值，如果index大於圖片長度，則返回圖片長度
      index = Math.min(length - 1, index);
      // 精簡版(合併index++)  index = Math.min(length - 1, ++index);
      console.log("下一張");
    }

    img.setAttribute("src", images[index]);
    pages.innerText = `第 ${index + 1} 頁`;
  });
});
