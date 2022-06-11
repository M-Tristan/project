import { v4 as uuidv4 } from 'uuid';
import editInfo from '../redux/edit'
// interface codeBaseInfo{
//   text:string,
//   colorDark:string,
//   colorLight:string,
//   backImage?:string
// }
interface codeBaseInfo {
  text: string,
  colorDark: string,
  colorLight: string,
  backImage?: string
}

class ModuleUtil {
  static getAddTextInfo(text: string) {
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 140,
        height: 26,
        top: 10,
        left: 10,
        rotate: 0,
        fontSize: 20,
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


  static getAddImageInfo(src: string) {

    return new Promise((resolve, reject) => {
      let image = new Image()
      image.src = src
      image.onload = () => {
        let ratew = editInfo.postInfo.canvas.width / 3 / image.naturalWidth
        let rateh = editInfo.postInfo.canvas.height / 3 / image.naturalHeight
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
          dropshadowX: 0,
          dropshadowY: 0,
          dropshadowBlur: 0,
          dropshadowColor: 'rgba(0,0,0,1)',
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
  static getAddCodeInfo(code: codeBaseInfo) {
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 200,
        height: 200,
        top: 10,
        left: 10,
        rotate: 0,
        lock: false,
        ...code
      })
    })
  }
  static getChartInfo(type: string) {
    return new Promise((resolve, reject) => {
      let option
      if (type === 'pie') {
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
      if (type === 'bar') {
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
        width: 300,
        height: 300,
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
  static getShapeInfo(type: string) {
    return new Promise((resolve, reject) => {
      let res: any = {
        id: uuidv4(),
        width: 300,
        height: 300,
        top: 10,
        left: 10,
        rotate: 0,
        opacity: 1,
        lock: false,
        shapeType: type,
        color: 'rgba(255, 255, 255, 1)'
      }
      if (type === 'polygon') {
        res.sides = 5
      } else if (type === 'star') {
        res.angles = 5
      } else if (type === 'sector') {
        res.sectorAngle = 270
      } else if (type === 'flower') {
        res.petals = 8
      }

      resolve(res)
    })
  }
  static getBackImageInfo(url: string) {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.src = url
      img.onload = function () {
        let canvas = editInfo.postInfo.canvas
        let naturalWidth = img.naturalWidth
        let naturalHeight = img.naturalHeight
        let widthrate = canvas.width / naturalWidth
        let heightrate = canvas.height / naturalHeight
        let useRate = widthrate > heightrate ? widthrate : heightrate
        useRate *= 2
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
  static getInputInfo() {
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 140,
        height: 26,
        top: 10,
        left: 10,
        rotate: 0,
        color: 'rgba(0,0,0,1)',
        backgroundColor: 'rgba(255,255,255,1)',
        borderColor: `rgba(0,0,0,1)`,
        borderRadius: 0,
        borderWidth: 0,
        placeholder: '文本',
        opacity: 1,
        lock: false,
        inputType: 'text',
        required: false
      })
    })
  }

  static getTextAreaInfo() {
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 140,
        height: 26,
        top: 10,
        left: 10,
        rotate: 0,
        color: 'rgba(0,0,0,1)',
        backgroundColor: 'rgba(255,255,255,1)',
        opacity: 1,
        lock: false,
        inputType: 'textarea',
        placeholder: '文本',
        borderColor: `rgba(0,0,0,1)`,
        borderRadius: 0,
        borderWidth: 0,
        required: false
      })
    })
  }

  static getSelectInfo() {
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 140,
        height: 26,
        top: 10,
        left: 10,
        rotate: 0,
        color: 'rgba(0,0,0,1)',
        backgroundColor: 'rgba(255,255,255,1)',
        opacity: 1,
        lock: false,
        inputType: 'select',
        selectList: [{ id: uuidv4(), value: '请输入内容' }, { id: uuidv4(), value: '请输入内容' }, { id: uuidv4(), value: '请输入内容' }],
        placeholder: '请选择',
        borderColor: `rgba(0,0,0,1)`,
        borderRadius: 0,
        borderWidth: 0,
        required: false
      })
    })
  }

  static getOptionsInfo(type: string) {
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 140,
        height: 80,
        top: 10,
        left: 10,
        rotate: 0,
        titleColor: 'rgba(255,255,255,1)',
        titleBackgroundColor: 'rgb(89, 199, 249)',
        backgroundColor: 'rgba(255,255,255,1)',
        color: `rgba(0,0,0,1)`,
        borderColor: `rgba(0,0,0,1)`,
        borderRadius: 0,
        borderWidth: 0,
        opacity: 1,
        lock: false,
        inputType: type,
        title: '标题演示',
        selectList: [{ id: uuidv4(), value: '选项1' }, { id: uuidv4(), value: '选项2' }, { id: uuidv4(), value: '选项3' }]
      })
    })
  }

  static getButtonInfo(type: string) {
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 140,
        height: 80,
        top: 10,
        left: 10,
        rotate: 0,
        color: 'rgba(0,0,0,1)',
        backgroundColor: 'rgba(255,255,255,1)',
        opacity: 1,
        lock: false,
        buttonType: type,
        borderColor: `rgba(0,0,0,1)`,
        borderRadius: 0,
        borderWidth: 0,
      })
    })
  }

  static getDateInfo(type: string) {
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 140,
        height: 30,
        top: 10,
        left: 10,
        rotate: 0,
        color: 'rgba(0,0,0,1)',
        backgroundColor: 'rgba(255,255,255,0)',
        opacity: 1,
        lock: false,
        dateType: type,
        borderColor: `rgba(0,0,0,1)`,
        borderRadius: 0,
        borderWidth: 0,
      })
    })
  }

  static getVedioInfo() {
    return new Promise((resolve, reject) => {
      resolve({
        id: uuidv4(),
        width: 200,
        height: 200,
        top: 10,
        left: 10,
        rotate: 0,
        iframelink: '',
        opacity: 1,
        lock: false
      })
    })
  }


}
export default ModuleUtil