function codestroll() {
  // 创建一个 div 元素
  const div = document.createElement("div");
  // 设置 div 元素的样式类名为 figure-bg
  div.className = "figure-bg";
  // 设置 div 元素的样式属性
  div.style.cssText =
    "position:fixed;top:0;left:0;z-index:1;width:100%;height:100%;pointer-events:none;background: url(/assets/bg.svg) center/cover no-repeat;";
  // 将 div 元素添加到文档的 body 元素中
  document.body.appendChild(div);
}

export default codestroll;
