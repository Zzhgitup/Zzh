// 创建全屏背景遮罩的函数
function figure() {
  /*  // 创建一个 div 元素
  const div = document.createElement("div");
  // 设置 div 元素的样式类名为 figure-bg
  div.className = "figure-bg";
  // 设置 div 元素的样式属性
  div.style.cssText =
    "position:fixed;top:0;left:0;z-index:1;width:100%;height:100%;pointer-events:none;background: url(/assets/bg.svg) center/cover no-repeat;";
  // 将 div 元素添加到文档的 body 元素中
  document.body.appendChild(div);
} */
  const cvs = document.createElement("canvas");
  cvs.style.backgroundColor = "transparent";
  console.log("执行code");
  document.body.appendChild(cvs);
  cvs.width;
  /* const cvs = document.getElementById("canvas"); */
  const ctx = cvs.getContext("2d");

  cvs.width = (window.innerWidth * devicePixelRatio) | 1;
  cvs.height = window.innerHeight * devicePixelRatio;
  cvs.id = "ribbon";
  cvs.style.cssText =
    "position:fixed;top:0;left:0;z-index: 1;width:100%;height:100%;pointer-events:none;";
  // create canvas
  const fontSize = 15 * devicePixelRatio;
  ctx.font = `${fontSize}px Cambria, Cochin, Georgia, Times, "Times New Roman", serif`;
  const columCount = Math.floor(cvs.width / fontSize);
  const charIndex = new Array(columCount).fill(0);
  document.body.appendChild(cvs);
  function getRandomChar() {
    const str = "0123456789abcdefghijklmnopqrstuvwxyz";
    return str[Math.floor(Math.random() * str.length)];
  }

  function draw() {
    ctx.fillStyle = "rgba(228,228,236,0.1)";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "#6BE445";
    ctx.textBaseline = "top";
    for (let i = 0; i < columCount; i++) {
      const x = i * fontSize;
      const y = charIndex[i] * fontSize;
      ctx.fillText(getRandomChar(), x, y);
      if (y > cvs.height && Math.random() > 0.99) {
        charIndex[i] = 0;
      } else {
        charIndex[i]++;
      }
    }
  }
  setInterval(() => {
    draw();
  }, 50);
}

// 导出 figure 函数作为默认导出
export default figure;
