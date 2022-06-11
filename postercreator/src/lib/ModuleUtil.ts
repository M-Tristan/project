interface codeBaseInfo {
  text: string,
  colorDark: string,
  colorLight: string,
  backImage?: string,
  pointType: string,
  eyeType: string,
}
import { v4 as uuidv4 } from 'uuid';
import store from './../store/index';
import BaseCache from './baseCache';

class ModuleUtil {
  constructor() {

  }
  static getAddImageInfo(src: string) {
    src = src.replace("https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com", "https://lp-canvas-1304910572.file.myqcloud.com/")
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.src = src
      image.onload = () => {
        let postInfo = store.state.postInfo
        let ratew = postInfo.canvas.width / 3 / image.naturalWidth
        let rateh = postInfo.canvas.height / 3 / image.naturalHeight
        let rate = ratew > rateh ? rateh : ratew
        resolve({
          id: uuidv4(),
          width: image.naturalWidth * rate,
          height: image.naturalHeight * rate,
          top: 10,
          left: 10,
          src: src,
          rotate: 0,
          blur: 0,
          opacity: 1,
          lock: false,
          borderRadius: 0,
          rotateY: false,
          rotateX: false,
          // shadow: {
          //   dropshadowX: 0,
          //   dropshadowY: 0,
          //   dropshadowBlur: 0,
          //   dropshadowColor: 'rgba(0,0,0,0)',
          // },
          crop: {
            width: image.naturalWidth,
            height: image.naturalHeight,
            left: 0,
            top: 0
          },
          filter: {
            brightness: 100,
            contrast: 100,
            grayscale: 0,
            hueRotate: 0,
            invert: 0,
            saturate: 100
          }
          // borderWidth:0,
          // borderColor:'rgba(0,0,0,0)',
        })
      }
    })



  }
  static getAddSvgInfo(src: string) {
    src = src.replace("https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com", "https://lp-canvas-1304910572.file.myqcloud.com/")

    return new Promise((resolve, reject) => {
      let image = new Image()
      image.src = src
      image.onload = () => {
        let postInfo = store.state.postInfo
        let ratew = postInfo.canvas.width / 3 / image.naturalWidth
        let rateh = postInfo.canvas.height / 3 / image.naturalHeight
        let rate = ratew > rateh ? rateh : ratew
        resolve({
          id: uuidv4(),
          width: image.naturalWidth * rate,
          height: image.naturalHeight * rate,
          top: 10,
          left: 10,
          src: src,
          rotate: 0,
          colorList: [],
          lock: false,
        })
      }

    })
  }
  static getAddTextInfo(text: string) {
    let canvas = store.state.postInfo.canvas
    let ratew = canvas.width / 500
    let rateh = canvas.height / 500
    let rate = ratew > rateh ? rateh : ratew
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 140 * rate,
        height: 26 * rate,
        top: 10,
        left: 10,
        rotate: 0,
        fontSize: 20 * rate,
        fontFamily: 'SourceHanSansCN-Regular',
        color: 'rgba(0,0,0,1)',
        text: text,
        html: text,
        bold: false,
        italic: false,
        textDecoration: 'none',
        lineHeight: 1,
        textAlign: 'left',
        letterSpacing: 0,
        opacity: 1,
        lock: false,
        textShadowList: [],
        strokeWidth: 0,
        strokeColor: 'rgba(0,0,0,1)'
      })
    })
  }
  static getAddCodeInfo(code: codeBaseInfo) {
    if (code.backImage) {
      BaseCache.pushImage(code.backImage)
    }

    let canvas = store.state.postInfo.canvas
    let width = canvas.width / 3
    let height = canvas.height / 3
    let length = width > height ? height : width

    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: length,
        height: length,
        top: 10,
        left: 10,
        rotate: 0,
        lock: false,
        ...code
      })
    })
  }
  static textToEffectText(id: string, shape: string) {
    let text: any
    let layers = store.state.postInfo.layers
    let index = 0

    while (index < layers.length) {
      if (layers[index].id == id) {
        text = layers[index]
        break
      }
      index++
    }
    // layers.splice(index,1)
    let ctx = document.createElement("canvas").getContext("2d") as CanvasRenderingContext2D
    ctx.font = `${text.fontSize}px ${text.fontFamily}`;
    let c = ctx.measureText(text.text).width
    switch (shape) {
      case 'circle':
        let r = c / 2 / Math.PI
        text.width = 2 * r + 2 * text.fontSize
        text.height = 2 * r + 2 * text.fontSize
        break;
      case 'heart':
        let rate = c / 350
        text.width = 200 * rate + 3 * text.fontSize
        text.height = 160 * rate + 3 * text.fontSize
        break;
      case 'rectangle':
        text.width = c / 4 + 2 * text.fontSize
        text.height = c / 4 + 2 * text.fontSize
        break;
    }

    text.lengthRate = 100
    text.shape = shape
    delete text['html']
    store.commit('addEffectText', text);
  }
  static effectTextToText(id: string) {
    let text: any
    let layers = store.state.postInfo.layers
    let index = 0
    while (index < layers.length) {
      if (layers[index].id == id) {
        text = layers[index]
        break
      }
      index++
    }
    // layers.splice(index,1)
    text.html = text.text
    text.type = 'text'
    delete text['shape']
    // store.state.postInfo.texts.push(text)
  }
  static getBackImageInfo(url: string) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.src = url
      img.onload = function () {
        let canvas = store.state.postInfo.canvas
        let naturalWidth = img.naturalWidth
        let naturalHeight = img.naturalHeight
        let widthrate = canvas.width / naturalWidth
        let heightrate = canvas.height / naturalHeight
        let useRate = widthrate > heightrate ? widthrate : heightrate
        let imageInfo = {
          width: useRate * img.naturalWidth,
          height: useRate * img.naturalHeight,
          top: (useRate * img.naturalHeight - canvas.height) / 2,
          left: (useRate * img.naturalWidth - canvas.width) / 2,
          src: url,
          blur: 0
        }
        resolve(imageInfo)
      }
    })
  }

  static getChartInfo(type) {
    let canvas = store.state.postInfo.canvas
    let width = canvas.width / 3
    let height = canvas.height / 3
    let length = width > height ? height : width
    return new Promise((resolve, reject) => {
      let option
      if (type == 'pie') {
        option = {
          animation: false,
          series: [
            {
              name: '标题',
              type: 'pie',
              radius: ['40%', '70%'],
              itemStyle: {
                borderRadius: 20,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 100, name: '模块一' },
                { value: 50, name: '模块二' },
              ]
            }
          ]
        }
      }
      if (type == 'bar') {
        option = {
          animation: false,
          xAxis: {
            type: 'category',
            data: ['1', '2', '3', '4', '5', '6', '7']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [5, 5, 6, 6, 7, 7, 8],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }]
        };
      }
      resolve({
        id: uuidv4(),
        width: length,
        height: length,
        top: 10,
        left: 10,
        rotate: 0,
        opacity: 1,
        lock: false,
        option,
        chartType: 'pie'
      })
    })
  }
  static getShapeInfo(type) {
    let canvas = store.state.postInfo.canvas
    let width = canvas.width / 3
    let height = canvas.height / 3
    let length = width > height ? height : width
    return new Promise((resolve, reject) => {
      let res: any = {
        id: uuidv4(),
        width: length,
        height: length,
        top: 10,
        left: 10,
        rotate: 0,
        opacity: 1,
        lock: false,
        shapeType: type,
        color: 'red'
      }
      if (type == 'polygon') {
        res.sides = 5
      } else if (type == 'star') {
        res.angles = 6
      } else if (type == 'sector') {
        res.sectorAngle = 140
      } else if (type == 'flower') {
        res.petals = 8
      }

      resolve(res)
    })
  }
}
export default ModuleUtil