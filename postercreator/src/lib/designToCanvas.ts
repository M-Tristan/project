import store from '../store/index'
import ImageUtil from './ImageUtil'
import _ from 'lodash'
import MathUtil from './MathUtil'
import fontList from '../lib/fontList'
import * as echarts from "echarts";
import ShapeUtil from './ShapeUtil'
import FilterUtil from './filterUtil'
import BaseCache from './baseCache'
import jsPDF from "jspdf";
import createQrcode from './createQrcode'
let fontMap = {}
fontList.forEach(item => {
  fontMap[item.fontFamily] = item
})

function getAndEncode(url) {
  var TIMEOUT = 30000
  return new Promise(function (resolve) {
    var request = new XMLHttpRequest()
    request.onreadystatechange = done
    request.ontimeout = timeout
    request.responseType = 'blob'
    request.timeout = TIMEOUT
    request.open('GET', url, true)
    request.send()
    function done() {
      if (request.readyState !== 4) return
      if (request.status !== 200) {
        resolve("")
      }
      /**
       * 读取文件信息
       */
      var encoder = new FileReader() as any
      encoder.onloadend = function () {
        var content = encoder.result.split(/,/)[1]
        resolve(content)

      }
      // console.log(request.response)
      // console.log(URL.createObjectURL(request.response))
      encoder.readAsDataURL(request.response)
    }
    function timeout() {
      resolve("")
    }
  })
}
class DesignToCanvas {
  /**
   * 加载字体
   */
  static async loadFont(index) {
    let postInfo = _.cloneDeep(store.state.postList[index])
    let fontInfoList = <any>[]
    postInfo.layers.forEach(layer => {
      if (layer.type === 'text' || layer.type === 'effectText') {
        if (fontMap[layer.fontFamily]) {
          fontInfoList.push(fontMap[layer.fontFamily])
        }
      }
    })
    fontInfoList = [...new Set(fontInfoList)]
    let fontface = ''
    for (let index = 0; index < fontInfoList.length; index++) {
      let info = fontInfoList[index]
      let res = BaseCache.getFontByFamily(info.fontFamily)
      if (!res) {
        res = await getAndEncode(info.url)
        BaseCache.pushFont(info.fontFamily, info.url)
      }
      fontface += `@font-face {
        font-family: ${info.fontFamily};
        src:url("data:application/font-woff;base64,${res}")
    }`
    }
    // fontInfoList.forEach(async (info) => {

    // });
    return `<style>${fontface}</style>`
  }
  static async loadFontByPost(postInfo) {
    let fontInfoList = <any>[]
    postInfo.layers.forEach(layer => {
      if (layer.type === 'text' || layer.type === 'effectText') {
        if (fontMap[layer.fontFamily]) {
          fontInfoList.push(fontMap[layer.fontFamily])
        }
      }
    })
    fontInfoList = [...new Set(fontInfoList)]
    let fontface = ''
    for (let index = 0; index < fontInfoList.length; index++) {

      let info = fontInfoList[index]
      let res = BaseCache.getFontByFamily(info.fontFamily)
      if (!res) {
        res = await getAndEncode(info.url)
        BaseCache.pushFont(info.fontFamily, info.url)
      }
      fontface += `@font-face {
        font-family: ${info.fontFamily};
        src:url("data:application/font-woff;base64,${res}")
    }`
    }
    // fontInfoList.forEach(async (info) => {

    // });
    return `<style>${fontface}</style>`

  }
  static async getBackDom(background) {
    let style = `width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${background.color}`
    let image = ''
    if (background.image && background.image.src) {
      let imageBase64 = BaseCache.getImageBySrc(background.image.src)
      if (!imageBase64) {
        imageBase64 = await ImageUtil.toBase64(background.image.src)
        BaseCache.pushImage(background.image.src)
      }

      let backStyle = `
      position: absolute;
      width: ${background.image.width}px;
      height:${background.image.height}px;
      left:-${background.image.left}px;
      top:-${background.image.top}px`
      image = `<img style = '${backStyle}' src='${imageBase64}' />`
    }
    return `<div style="${style}">
    ${image}
    </div>`
  }
  static async getImageDom(module) {
    const imageSize = (() => {
      let crop = module.crop;
      return MathUtil.getFullSize(
        module.width,
        module.height,
        crop.width / crop.height
      );
    })()
    let image = new Image()
    let maskImage = new Image()
    image.setAttribute('crossOrigin', 'anonymous');
    maskImage.setAttribute('crossOrigin', 'anonymous');
    let dropShadow = ''
    if (module.shadow) {
      dropShadow = `drop-shadow(${module.shadow.dropshadowX}px ${module.shadow.dropshadowY}px ${module.shadow.dropshadowBlur}px  ${module.shadow.dropshadowColor})`;
    }
    let style = `
      position: absolute;
      width: ${module.width}px;
      height:${module.height}px;
      left:${module.left}px;
      top: ${module.top}px;
      transform: rotate(${module.rotate ? module.rotate : 0}deg);
      z-index: ${module.zindex};
      filter: ${dropShadow}  blur(${module.blur}px) brightness(${module.filter.brightness}%) contrast(${module.filter.contrast}%) grayscale(${module.filter.grayscale}%) hue-rotate(${module.filter.hueRotate}deg) invert(${module.filter.invert}%) saturate(${module.filter.saturate}%)  ;
      opacity: ${module.opacity};
      overflow: hidden;
      border-radius: ${module.borderRadius}px;
      opacity: ${module.opacity}
    `
    let imageStyle = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: ${imageSize.width}px;
    height: ${imageSize.height}px`


    if (module.mask != undefined && module.mask != null) {
      maskImage.src = module.mask.src.replace("https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com", "https://lp-canvas-1304910572.file.myqcloud.com/")
      await new Promise<void>((res, rej) => { maskImage.onload = () => { res() } })
    }
    image.src = module.src.replace("https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com", "https://lp-canvas-1304910572.file.myqcloud.com/")
    await new Promise<void>((res, rej) => { image.onload = () => { res() } })
    let base64 = BaseCache.getModule(module.id)
    if (base64) {
      let imageDom = `<img style='${imageStyle}' src='${base64}' />`
      let dom = `<div style='${style}'>
      ${imageDom}
      </div>`
      return dom
    }
    let imageCanvas = document.createElement("canvas")
    let crop = module.crop;
    imageCanvas.setAttribute("width", String(crop.width));
    imageCanvas.setAttribute("height", String(crop.height));
    let ctx = imageCanvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.drawImage(image, -crop.left, -crop.top);

    if (module.filterInfo) {
      let filterInfo = module.filterInfo;
      switch (filterInfo.type) {
        case "blackWhite":
          FilterUtil.blackWhite(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "reverse":
          FilterUtil.reverse(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "mosaic":
          FilterUtil.mosaic(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "removeRed":
          FilterUtil.removeRed(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "removeGreen":
          FilterUtil.removeGreen(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "removeBlue":
          FilterUtil.removeBlue(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "grayscale":
          FilterUtil.grayscale(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "red":
          FilterUtil.red(ctx as CanvasRenderingContext2D, imageCanvas);
          break;
        case "green":
          FilterUtil.green(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "blue":
          FilterUtil.blue(ctx as CanvasRenderingContext2D, imageCanvas);
          break;
        case "nostalgia":
          FilterUtil.nostalgia(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "casting":
          FilterUtil.casting(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );
          break;
        case "frozen":
          FilterUtil.frozen(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );

          break;
        case "comicStrip":
          FilterUtil.comicStrip(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );

          break;
        case "brown":
          FilterUtil.brown(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );

          break;
        case "darktone":
          FilterUtil.darktone(
            ctx as CanvasRenderingContext2D,
            imageCanvas
          );

          break;

        default:
      }
    }
    if (module.mask != undefined && module.mask != null) {
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(maskImage, 0, 0, crop.width, crop.height);
    }
    base64 = imageCanvas.toDataURL()
    BaseCache.pushModule(module.id, base64)
    let imageDom = `<img style='${imageStyle}' src='${base64}' />`
    let dom = `<div style='${style}'>
    ${imageDom}
    </div>`
    return dom

  }
  static async getTextDom(module) {
    const fontScale = (() => {
      let fontSize = module.fontSize;
      if (fontSize < 12) {
        return fontSize / 12;
      }
      return 1;
    })()
    const textShadow = (() => {
      let textShadowList = module.textShadowList;
      let result = "";
      textShadowList.forEach((item, index) => {
        if (index == 0) {
          result =
            result +
            `${item.hShadow}px ${item.vShadow}px ${item.blur}px ${item.color}`;
        } else {
          result =
            result +
            `,${item.hShadow}px ${item.vShadow}px ${item.blur}px ${item.color}`;
        }
      });
      return result;
    })();
    let style = `
    position: absolute;
    width: ${module.width}px;
    height: ${fontScale != 1 ? module.height * fontScale + 'px' : 'auto'};
    left: ${module.left}px;
    top: ${module.top}px;
    transform: rotate(${module.rotate ? module.rotate : 0}deg);
    z-index: ${module.zindex};
    text-align: ${module.textAlign};`
    let StrokecontentStyle = `word-break: break-word;
    white-space: pre-wrap;
    position: absolute;
    z-index: -1;
    left: 0;
    font-size: ${module.fontSize}px;
    transform: scale(${fontScale});
    color: ${module.color};
    caret-color:  ${module.color};
    width: ${module.width / fontScale}px;
    font-weight: ${module.bold ? 900 : 400};
    font-style: ${module.italic ? 'italic' : 'normal'};
    line-height: ${module.lineHeight};
    letter-spacing: ${module.letterSpacing}px;
    opacity:${module.opacity};
    text-shadow: ${textShadow};
    -webkit-text-stroke:${module.strokeWidth}px ${module.strokeColor};
    text-stroke: ${module.strokeWidth}px ${module.strokeColor};
    font-family: ${module.fontFamily}`
    let backImageStyle = ``

    if (module.backImage) {
      let imageBase64 = BaseCache.getImageBySrc(module.backImage)
      if (!imageBase64) {
        imageBase64 = await ImageUtil.toBase64(module.backImage)
        BaseCache.pushImage(module.backImage)
      }

      backImageStyle = `background-image:url('${imageBase64}');
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-text-fill-color:transparent;
      -webkit-background-clip: text;`
    }
    if (module.gradient) {
      let gradientList = module.gradient;
      let Gradient = "";
      gradientList.forEach((item, index) => {
        Gradient += `${item.color} ${item.offset * 100}%`;
        if (index < gradientList.length - 1) {
          Gradient += ",";
        }
      });
      backImageStyle = `background-image:linear-gradient(${module.gradientAngle}deg,${Gradient});
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-text-fill-color:transparent;
      -webkit-background-clip: text;`
    }
    let dom = document.createElement("div")
    dom.innerHTML = module.html
    let contentStyle = backImageStyle + `word-break: break-word;
    white-space: pre-wrap;
    position: relative;
    left: 0;
    transform-origin: 0px 0px;
    font-size: ${module.fontSize}px;
    
    transform: scale(${fontScale});
    color: ${module.color};
    caret-color: ${module.color};
    width: ${module.width / fontScale}px;
    font-weight: ${module.bold ? 900 : 400};
    text-decoration: ${module.textDecoration};
    font-style: ${module.italic ? 'italic' : 'normal'};
    line-height: ${module.lineHeight};
    letter-spacing: ${module.letterSpacing}px;
    opacity: ${module.opacity};
    text-shadow: ${textShadow};
    font-family: ${module.fontFamily}`
    let StrokeDom = ''
    if (module.strokeWidth !== 0) {

      StrokeDom = `<div style="${StrokecontentStyle}">${new XMLSerializer().serializeToString(dom)}</div>`
    }
    let textDom = `<div style="${style}">
      ${StrokeDom}
      <div style="${contentStyle}">${new XMLSerializer().serializeToString(dom)}</div>
    </div>`

    return textDom
  }
  static async getCodeDom(module) {
    let style = `
    position: absolute;
    display: inline-block;
    width: ${module.width}px;
    height:${module.height}px;
    left:${module.left}px;
    top: ${module.top}px;
    transform: rotate(${module.rotate ? module.rotate : 0}deg);
    z-index: ${module.zindex};
    `
    let backDom = ''
    let codeBase64 = BaseCache.getModule(module.id)
    if (module.backImage) {
      let backStyle = `
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: -1;
      `
      let imageBase64 = BaseCache.getImageBySrc(module.backImage)
      if (!imageBase64) {
        imageBase64 = await ImageUtil.toBase64(module.backImage)
        BaseCache.pushImage(module.backImage)
      }

      backDom = `<img style='${backStyle}' src='${imageBase64}'/>`
    }
    if (!codeBase64) {
      await new Promise<void>((res, rej) => {
        let canvas = createQrcode
          .create(module.text, {
            width: 1000,
            color: {
              dark: "#ffffff00",
              light: "#ffffff",
            },
            pointType: module.pointType,
            eyeType: module.eyeType,
          })
          .getCanvas();
        codeBase64 = canvas.toDataURL("image/png");
        res()

      })

    }


    return `<div style='${style}'>
    ${backDom}
    <img style='width: 100%;height: 100%;' src='${codeBase64}' />
    </div>`

  }
  static async getChartDom(module) {
    let style = `
    width: ${module.width}px;
    height: ${module.height}px;
    left: ${module.left}px;
    top: ${module.top}px;
    transform: rotate(${module.rotate ? module.rotate : 0}deg);
    z-index: ${module.zindex};
    position: absolute;
    display: inline-block;
    `
    let chartDom = document.createElement("div")
    chartDom.style.width = `${module.width}px`
    chartDom.style.height = `${module.height}px`
    let myChart = echarts.init(chartDom);
    myChart.setOption(module.option);
    let chartBase64 = myChart.getDataURL()
    return `<div style = '${style}'>
    <img style='width:100%;height:100%'  src='${chartBase64}' />
    </div>`
  }
  static async getShapeDom(module) {
    let style = `
    width:${module.width}px;
    height: ${module.height}px;
    left: ${module.left}px;
    top: ${module.top}px;
    transform: rotate(${module.rotate ? module.rotate : 0}deg);
    z-index: ${module.zindex};
    position: absolute;
    display: inline-block;
    `
    let shapeBase64 = ''
    switch (module.shapeType) {
      case "polygon":
        shapeBase64 = ShapeUtil.drawPolygon(module);
        break;
      case "star":
        shapeBase64 = ShapeUtil.drawStart(module);

        break;
      case "sector":
        shapeBase64 = ShapeUtil.drawSector(module);

        break;
      case "flower":
        shapeBase64 = ShapeUtil.drawFlower(module);

        break;
      case "circle":
        shapeBase64 = ShapeUtil.drawCircle(module);

        break;
    }
    return `<div style='${style}'>
    <img style='width:100%;height:100%'  src='${shapeBase64}' />
    </div>`

  }
  static async getEffectTextDom(module) {
    const textShadow = (() => {
      let textShadowList = module.textShadowList
      let result = "";
      textShadowList.forEach((item, index) => {
        if (index == 0) {
          result =
            result +
            `${item.hShadow}px ${item.vShadow}px ${item.blur}px ${item.color}`;
        } else {
          result =
            result +
            `,${item.hShadow}px ${item.vShadow}px ${item.blur}px ${item.color}`;
        }
      });
      return result;
    })();
    let style = `
    position: absolute;
    width: ${module.width}px;
    height:${module.height}px;
    left: ${module.left}px;
    top: ${module.top}px;
    z-index: ${module.zindex};
    transform: rotate(${module.rotate ? module.rotate : 0}deg);
    `
    let textStyle = `
      font-size: ${module.fontSize}px;
      font-weight: ${module.bold ? 900 : 400};
      text-decoration: ${module.textDecoration};
      font-style: ${module.italic ? 'italic' : 'normal'};
      opacity: ${module.opacity};
      font-family: ${module.fontFamily}
    `
    let textStrokeStyle = `
    font-size: ${module.fontSize}px;
    font-weight: ${module.bold ? 900 : 400};
    text-decoration: ${module.textDecoration};
    font-style: ${module.italic ? 'italic' : 'normal'};
    opacity: ${module.opacity};
    text-shadow: ${textShadow};
    font-family: ${module.fontFamily}
  `
    const path = (() => {
      let path = "";
      switch (module.shape) {
        case "circle":
          path = `M ${module.fontSize} ${module.height / 2
            } A 1 1 0 1 1 ${module.width - module.fontSize} ${module.height / 2
            } M ${module.width - module.fontSize} ${module.height / 2
            } A 1 1 0 1 1 ${module.fontSize} ${module.height / 2}`;
          break;
        case "heart":
          let r =
            (module.width - 3 * module.fontSize) /
            (2 + Math.sqrt(2));
          let rWidth = Math.sqrt(Math.pow(2 * r, 2) / 2);
          let top = 1.5 * module.fontSize + (1 + Math.sqrt(2) / 2) * r;
          let startPoint = {
            left: module.width / 2 - rWidth,
            top: module.height * 0.6,
          };
          path = `M ${startPoint.left} ${startPoint.top} A 1 1 0 1 1 ${startPoint.left + rWidth
            } ${startPoint.top - rWidth} M ${startPoint.left + rWidth} ${startPoint.top - rWidth
            } A 1 1 0 1 1 ${startPoint.left + 2 * rWidth} ${startPoint.top} M ${startPoint.left + 2 * rWidth
            } ${startPoint.top} C ${startPoint.left + rWidth},${startPoint.top + rWidth
            } ${startPoint.left + rWidth},${startPoint.top + rWidth} ${startPoint.left
            } ${startPoint.top}`;
          break;
        case "rectangle":
          path = `M ${module.fontSize} ${module.fontSize} L ${module.width - module.fontSize
            } ${module.fontSize} L ${module.width - module.fontSize
            } ${module.height - module.fontSize} L ${module.fontSize
            } ${module.height - module.fontSize} Z`;
          break;
      }
      return path;
    })()
    const textLength = (() => {
      let svgPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      svgPath.setAttributeNS(null, "d", path);
      return (svgPath.getTotalLength() * module.lengthRate) / 100;
    })();
    let dom = `<div style='${style}'>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="${module.width}"
    height="${module.height}">
    <path
    d="${path}"
    fill="none"
    stroke-width="1"
    id="${module.id}"
  ></path>
  <text
    style="${textStrokeStyle}"
    fill="${module.color}"
    stroke="${module.strokeColor}"
    stroke-width="${module.strokeWidth}"
  >
    <textPath xlink:href="#${module.id}" textLength="${textLength}">
     ${module.text}
    </textPath>
  </text>
  <text
  style="${textStyle}"
  fill="${module.color}"
>
  <textPath xlink:href="#${module.id}" textLength="${textLength}">
   ${module.text}
  </textPath>
</text>
    </svg>
</div>`
    return new XMLSerializer().serializeToString(new DOMParser().parseFromString(dom, 'text/xml'))
  }
  static async getLayerDom(layers) {
    let dom = ''
    let index = 0
    while (index < layers.length) {
      let layer = layers[index++]
      if (layer.type === 'image') {
        let imageDom = await DesignToCanvas.getImageDom(layer)
        dom += imageDom
      } else if (layer.type === 'text') {
        let textDom = await DesignToCanvas.getTextDom(layer)
        dom += textDom
      } else if (layer.type === 'code') {
        let codeDom = await DesignToCanvas.getCodeDom(layer)
        dom += codeDom
      } else if (layer.type === 'chart') {
        let chartDom = await DesignToCanvas.getChartDom(layer)
        dom += chartDom
      } else if (layer.type === 'shape') {
        let shapeDom = await DesignToCanvas.getShapeDom(layer)
        dom += shapeDom
      } else if (layer.type === 'svg') {
        let svgDom = await DesignToCanvas.getSvgItemDom(layer)
        dom += svgDom
      } else if (layer.type === 'effectText') {
        let effectTextDom = await DesignToCanvas.getEffectTextDom(layer)
        let div = document.createElement("div")
        div.innerHTML = effectTextDom
        dom += new XMLSerializer().serializeToString(div.children[0]).replace(/#/g, '%23').replace(/\n/g, '%0A')
      }

    }
    return dom

  }
  static async getwaterMaskDom(watermark) {
    const getWaterMak = () => {
      let toolCanvas: HTMLCanvasElement = document.createElement("canvas");
      let toolCtx: CanvasRenderingContext2D = toolCanvas.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      if (!watermark) {
        return "";
      }
      let fontSize = watermark.fontSize;
      let space = watermark.space;
      let rotate = watermark.rotate;
      let color = watermark.color;
      toolCtx.font = `${fontSize}px Arial`;
      let text = watermark.text;
      let length = toolCtx.measureText(text).width;
      let cross = ((length + space) * watermark.cross) / 100;
      let canvas = document.createElement("canvas");
      canvas.setAttribute("height", String((fontSize + space) * 2));
      canvas.setAttribute("width", String((length + space) * 2));
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.save();
      // ctx.rotate((90 * Math.PI) / 180);
      for (let i = -10; i < 10; i++) {
        for (let k = -10; k < 10; k++) {
          let crossValue = 0;
          if (k % 2 == 0) {
            crossValue = cross;
          }
          ctx.restore();
          ctx.save();
          ctx.textBaseline = "top";
          ctx.font = `${fontSize}px Arial`;
          ctx.translate(
            i * (length + space) + crossValue,
            k * (fontSize + space)
          );
          ctx.rotate((rotate * Math.PI) / 180);
          ctx.fillStyle = color;
          ctx.fillText(text, 0, 0);
        }
      }
      return canvas.toDataURL();
    };
    let imageDate = getWaterMak()
    if (!watermark) {
      return ""
    }
    let style = `width: 100%;
                  height: 100%;
                  position: absolute;
                  z-index: 9000;
                  top: 0;
                  left: 0;
                  background-image: url(${imageDate});
                   opacity: ${watermark.opacity / 100}`
    // console.log(`<div style="${style}">/div>`)
    return `<div style="${style}"></div>`
  }
  static async getSvgItemDom(module) {
    let svg = BaseCache.getModule(module.id)
    let contentStyle = `
      width: ${module.width}px;
      height: ${module.height}px;
      left: ${module.left}px;
      top: ${module.top}px;
      transform: rotate(${module.rotate ? module.rotate : 0}deg);
      z-index: ${module.zindex};
      position: absolute;
      display: inline-block
    `

    let dom = `
    <div style = '${contentStyle}' >
      ${svg}
    </div>
    `
    return dom

  }
  static async getSvgByIndex(index) {
    let post = _.cloneDeep(store.state.postList[index])
    const svg = await DesignToCanvas.getSvgByPostInfo(post, true)
    return svg
  }
  static async getSvgByPostInfo(post, loadfont?: boolean) {
    let canvas = post.canvas
    let backDom = await DesignToCanvas.getBackDom(post.background)
    let layerDom = await DesignToCanvas.getLayerDom(post.layers)
    let waterMask = await DesignToCanvas.getwaterMaskDom(post.watermark)
    let fonts = ''
    if (loadfont) {
      fonts = await DesignToCanvas.loadFontByPost(post)
    }

    // let fonts = ''
    const svg = `<svg   width='${canvas.width}' height='${canvas.height}' xmlns='http://www.w3.org/2000/svg'><foreignObject x='0' y='0' width='${canvas.width}' height='${canvas.height}'><div xmlns='http://www.w3.org/1999/xhtml'>
    ${backDom}${layerDom}${waterMask}${fonts}
    </div></foreignObject></svg>`
    return new XMLSerializer().serializeToString(new DOMParser().parseFromString(svg, 'text/xml'))
  }
  static async downLoadByIndex(index, type) {
    let svg = await DesignToCanvas.getSvgByIndex(index)
    // let dom = document.createElement('div')
    // dom.innerHTML = svg
    // console.dir(dom.children[0])
    // let canvas = document.createElement('canvas')
    // canvas.width = 1000
    // canvas.height = 1000
    // let ctx = canvas.getContext("2d")
    // ctx?.drawImage(dom.children[0] as SVGImageElement, 0, 0, 1000, 1000)
    // document.body.appendChild(canvas)
    // let svgInfo = new XMLSerializer().serializeToString(dom.children[0])
    let svgInfo = svg
    svgInfo = svgInfo.replace(/#/g, '%23').replace(/\n/g, '%0A')
    let imageBase64 = await ImageUtil.toBase64(`data:image/svg+xml;charset=utf-8,${svgInfo}`, type)

    var link = document.createElement('a');
    link.href = imageBase64 as string;
    link.download = `图片${new Date().getTime()}.${type}`;
    link.click()

  }
  static async downLoadALL(type: string) {

    // let load = ElLoading.service({ fullscreen: true, text: '图片生成中', background: 'rgba(0, 0, 0, 0.1)', spinner: 'el-icon-loading', })
    let length = store.state.postList.length
    let index = 0

    if (type === 'pdf') {
      var doc = new jsPDF('landscape', 'px')
      while (index < length) {
        let post = _.cloneDeep(store.state.postList[index])
        let canvas = post.canvas
        let svg = await DesignToCanvas.getSvgByIndex(index++)
        let scale = 1
        if (canvas.width * canvas.height > 5000 * 5000) {
          scale = Math.sqrt((5000 * 5000) / (canvas.width * canvas.height))
        }
        if (canvas.width > canvas.height) {
          doc.addPage([canvas.width * scale, canvas.height * scale], "landscape")
        } else {
          doc.addPage([canvas.width * scale, canvas.height * scale], "portrait")
        }

        let svgInfo = svg
        svgInfo = svgInfo.replace(/#/g, '%23').replace(/\n/g, '%0A')
        let image = new Image()
        image.src = `data:image/svg+xml;charset=utf-8,${svgInfo}`
        let imageBase64 = await ImageUtil.toBase64(`data:image/svg+xml;charset=utf-8,${svgInfo}`, type, scale) as string
        doc.addImage(imageBase64, 'PNG', 0, 0, canvas.width * scale, canvas.height * scale);
      }
      doc.deletePage(1)
      doc.save(`${new Date().getTime()}.pdf`)

    } else {
      while (index < length) {
        await DesignToCanvas.downLoadByIndex(index++, type)
      }
    }


  }
}


export default DesignToCanvas