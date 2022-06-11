import BaseCache from './baseCache'
import fontList from './fontList'
const fontMap = {}
fontList.forEach(item => {
  fontMap[item.fontFamily] = item
})

const loadFont = (fontFamily) => {
  let item = fontMap[fontFamily]
  if (item && !item.load) {

    let fullname = item.fontFamily;
    let style = document.createElement("style");
    style.type = "text/css";
    style.innerText =
      "@font-face {font-family:" +
      fullname +
      ";src:url(" +
      item.url +
      ")};font-display: swap";
    document.getElementsByTagName("head")[0].appendChild(style);
    item.load = true;
    BaseCache.pushFont(fullname, item.url);
  }
}

export default { loadFont }