
import * as QRCode from "qrcode";
import { QRCodeErrorCorrectionLevel } from "qrcode";
import imageCache from "./imageCache";

interface color {
  dark: string,
  light: string,
}
interface codeParams {
  width: number,
  color: color,
  pointType?: string,
  eyeType?: string,
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel
}
const createQrcode = {
  size: 0,
  color: {} as any,
  points: [] as any,
  canvas: null as unknown as HTMLCanvasElement,
  innerEye: null as unknown as HTMLCanvasElement,
  externalEye: null as unknown as HTMLCanvasElement,
  pointsCanvas: null as unknown as HTMLCanvasElement,
  ctx: null as unknown as CanvasRenderingContext2D,
  pointType: 'normal',
  eyeType: 'N-A',
  custom: undefined as any,
  getCanvas() {
    return this.canvas
  },
  getInnerEye() {
    return this.innerEye
  },
  getExternalEye() {
    return this.externalEye
  },
  getPointsCanvas() {
    return this.pointsCanvas
  },
  getContext() {
    return this.ctx
  },
  toDataURL(type: string) {
    return this.canvas.toDataURL(type)
  },
  create(text: string, option: codeParams, custom?: any) {
    let qrcodeData = QRCode.create(text, { errorCorrectionLevel: option.errorCorrectionLevel })
    this.custom = custom
    this.color = option.color
    if (option.eyeType) {
      this.eyeType = option.eyeType
    }
    if (option.pointType) {
      this.pointType = option.pointType
    }

    let modules = qrcodeData.modules
    this.points = modules.data
    this.size = modules.size
    this.canvas = document.createElement('canvas') as HTMLCanvasElement
    this.externalEye = document.createElement('canvas') as HTMLCanvasElement
    this.innerEye = document.createElement('canvas') as HTMLCanvasElement
    this.pointsCanvas = document.createElement('canvas') as HTMLCanvasElement

    this.canvas.width = option.width
    this.canvas.height = option.width
    this.externalEye.width = option.width
    this.externalEye.height = option.width
    this.innerEye.width = option.width
    this.innerEye.height = option.width
    this.pointsCanvas.width = option.width
    this.pointsCanvas.height = option.width
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    if (this.custom) {
      this.ctx.save()
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, option.width, option.width);
      this.ctx.restore()
      this.renderCustom()
    } else {
      this.render()
    }

    return this

  },
  renderCustom() {
    this.drawCustomPoints()
    this.drawCodeEye()
  },
  render() {
    this.drawPoints()
    let pointsctx = this.pointsCanvas.getContext('2d') as CanvasRenderingContext2D
    pointsctx.drawImage(this.canvas, 0, 0, this.pointsCanvas.width, this.pointsCanvas.height)
    this.drawCodeEye()
    this.ctx.drawImage(this.externalEye, 0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.innerEye, 0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.pointsCanvas, 0, 0, this.canvas.width, this.canvas.height)
  },
  drawCustomPoints() {
    let imageList = this.custom.P1List
    let imageIndex = 0
    let imageP2List = this.custom.P2List
    let imageP2Index = 0
    let imageP3List = this.custom.P3List
    let imageP3Index = 0
    let imageP4List = this.custom.P4List
    let imageP4Index = 0
    let imageP5List = this.custom.P5List
    let imageP5Index = 0
    let imageP6List = this.custom.P6List
    let imageP6Index = 0
    let drawed: any = {}
    let pointIndex = 0
    let size = this.size
    let points = this.points
    let width = this.canvas.width / this.size
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        pointIndex++

        if ((row < 7 && col < 7) || (row < 7 && col > this.size - 8) || (row > this.size - 8 && col < 7)) {
          continue
        }
        let point = points[pointIndex - 1]
        if (point === 1) {
          if (drawed[`${col}-${row}`] === true) {
            continue
          }
          if (points[pointIndex - 1] === 1
            && imageP5List.length !== 0
            && points[pointIndex] === 1
            && points[pointIndex + 1] === 1
            && drawed[`${col + 1}-${row}`] !== true
            && drawed[`${col + 2}-${row}`] !== true
            && col < size - 2) {
            let length = imageP5List.length
            let image = imageCache[imageP5List[imageP5Index++ % length]]
            this.drawImage(image, { left: col * width, top: row * width, width: width * 3, height: width })
            drawed[`${col}-${row}`] = true
            drawed[`${col + 1}-${row}`] = true
            drawed[`${col + 2}-${row}`] = true

          } else if (points[pointIndex - 1] === 1
            && imageP6List.length !== 0
            && points[pointIndex + size - 1] === 1
            && points[pointIndex + 2 * size - 1] === 1
            && drawed[`${col}-${row + 1}`] !== true
            && drawed[`${col}-${row + 2}`] !== true
            && row < size - 2) {
            let length = imageP6List.length
            let image = imageCache[imageP6List[imageP6Index++ % length]]
            this.drawImage(image, { left: col * width, top: row * width, width: width, height: width * 3 })
            drawed[`${col}-${row}`] = true
            drawed[`${col}-${row + 1}`] = true
            drawed[`${col}-${row + 2}`] = true

          }
          else if (points[pointIndex - 1] === 1
            && imageP2List.length !== 0
            && points[pointIndex] === 1
            && points[pointIndex + size - 1] === 1
            && points[pointIndex + size] === 1
            && drawed[`${col + 1}-${row}`] !== true
            && drawed[`${col}-${row + 1}`] !== true
            && drawed[`${col + 1}-${row + 1}`] !== true
            && col < size - 1) {
            let length = imageP2List.length
            let image = imageCache[imageP2List[imageP2Index++ % length]]
            this.drawImage(image, { left: col * width, top: row * width, width: width * 2 })
            drawed[`${col}-${row}`] = true
            drawed[`${col + 1}-${row}`] = true
            drawed[`${col}-${row + 1}`] = true
            drawed[`${col + 1}-${row + 1}`] = true
          } else if (points[pointIndex - 1] === 1
            && imageP3List.length !== 0
            && points[pointIndex] === 1
            && drawed[`${col + 1}-${row}`] !== true
            && col < size - 1) {
            let length = imageP3List.length
            let image = imageCache[imageP3List[imageP3Index++ % length]]
            this.drawImage(image, { left: col * width, top: row * width, width: width * 2, height: width })
            drawed[`${col}-${row}`] = true
            drawed[`${col + 1}-${row}`] = true

          }
          else if (

            points[pointIndex - 1] === 1
            && imageP4List.length !== 0
            && points[pointIndex + size - 1] === 1
            && drawed[`${col}-${row + 1}`] !== true) {
            let length = imageP4List.length
            let image = imageCache[imageP4List[imageP4Index++ % length]]
            this.drawImage(image, { left: col * width, top: row * width, width: width, height: width * 2 })
            drawed[`${col}-${row}`] = true
            drawed[`${col}-${row + 1}`] = true

          }
          else {
            let length = imageList.length
            let image = imageCache[imageList[imageIndex++ % length]]
            this.drawImage(image, { left: col * width, top: row * width, width: width })
            drawed[`${col}-${row}`] = true
          }


        }
      }
    }
  },
  drawPoints() {

    let pointIndex = 0
    let size = this.size
    let points = this.points
    let width = this.canvas.width / this.size
    let complementary: any = {}
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        pointIndex++

        if ((row < 7 && col < 7) || (row < 7 && col > this.size - 8) || (row > this.size - 8 && col < 7)) {
          continue
        }
        let point = points[pointIndex - 1]
        if (point === 1) {
          switch (this.pointType) {
            case 'normal':
              this.drawrect(width, col * width, row * width)
              break;
            case 'star':
              this.drawstar(width, col * width, row * width)
              break;
            case 'rect':
              this.drawrect(width * 0.8, (col + 0.1) * width, (row + 0.1) * width)
              break;
            case 'circle':
              this.drawcircle(width, col * width, row * width)
              break;
            case 'horizontalBar':
              this.drawcircle(width * 0.8, (col + 0.1) * width, (row + 0.1) * width)
              if (points[pointIndex] === 1 && col < size - 1) {
                this.drawConnect(width, width * 0.8, (col + 0.6) * width, (row + 0.1) * width)
              }
              break;
            case 'verticalBar':
              this.drawcircle(width * 0.8, (col + 0.1) * width, (row + 0.1) * width)
              if (points[pointIndex + size - 1] === 1) {
                this.drawConnect(width * 0.8, width, (col + 0.1) * width, (row + 0.6) * width)
              }
              break;
            case 'crossBar':
              this.drawcircle(width * 0.8, (col + 0.1) * width, (row + 0.1) * width)
              if (points[pointIndex] === 1 && col < size - 1) {
                this.drawConnect(width, width * 0.8, (col + 0.6) * width, (row + 0.1) * width)
              }
              if (points[pointIndex + size - 1] === 1) {
                this.drawConnect(width * 0.8, width, (col + 0.1) * width, (row + 0.6) * width)
              }
              break;
            case 'complementary':
              this.drawcircle(width * 0.8, (col + 0.1) * width, (row + 0.1) * width)
              if (points[pointIndex] === 1 && col < size - 1 && !complementary[`${col + 1}-${row}`] && (!complementary[`${col}-${row}`] || complementary[`${col}-${row}`].type !== 1)) {
                this.drawConnect(width, width * 0.8, (col + 0.6) * width, (row + 0.1) * width)
                complementary[`${col}-${row}`] = {
                  type: 0
                }
                complementary[`${col + 1}-${row}`] = {
                  type: 0
                }
              } else {
                if (points[pointIndex + size - 1] && (!complementary[`${col}-${row}`] || complementary[`${col}-${row}`].type !== 0)) {
                  this.drawConnect(width * 0.8, width, (col + 0.1) * width, (row + 0.6) * width)
                  complementary[`${col}-${row}`] = {
                    type: 1
                  }
                  complementary[`${col}-${row + 1}`] = {
                    type: 1
                  }
                }
              }

              break;
            case 'liquid':
              this.drawcircle(width, col * width, row * width)
              if (points[pointIndex] === 1 && col < size - 1) {
                this.drawConnect(width, width, (col + 0.6) * width, row * width)
              }
              if (points[pointIndex + size - 1] === 1) {
                this.drawConnect(width, width, col * width, (row + 0.6) * width)
              }

              if (points[pointIndex + size] === 1 && col < size - 1) {
                this.drawliquid((col + 0.5) * width, (row + 0.5) * width, width, 'right')
              }
              if (points[pointIndex + size - 2] === 1 && col > 0) {
                this.drawliquid((col - 0.5) * width, (row + 0.5) * width, width, 'left')
              }
              break;
          }
        }
      }
    }

  },
  drawliquid(left: number, top: number, width: number, direction: string) {
    let ctx = this.ctx
    let color = "black"
    if (direction === 'right') {
      ctx.save()
      ctx.translate(left, top)
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(width / 2, 0)
      ctx.arc(width, 0, width / 2, Math.PI, Math.PI / 2, true)
      ctx.lineTo(width, width)
      ctx.lineTo(width / 2, width)
      ctx.arc(0, width, width / 2, 0, -Math.PI / 2, true)
      ctx.lineTo(0, 0)
      ctx.fillStyle = color
      ctx.fill()
      ctx.restore()
    }

    if (direction === 'left') {
      ctx.save()
      ctx.translate(left, top)
      ctx.beginPath()
      ctx.moveTo(width, 0)
      ctx.lineTo(width / 2, 0)
      ctx.arc(0, 0, width / 2, 0, Math.PI / 2, false)
      ctx.lineTo(0, width)
      // ctx.lineTo(0, width / 2)
      ctx.arc(width, width, width / 2, Math.PI, Math.PI * 3 / 2, false)
      ctx.lineTo(width, 0)
      ctx.fillStyle = color
      ctx.fill()
      ctx.restore()
    }

  },
  drawConnect(width: number, height: number, left: number, top: number) {
    let ctx = this.ctx
    let color = "black"
    ctx.save()
    ctx.translate(left, top)
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  drawstar(width: number, left: number, top: number) {
    let ctx = this.ctx
    let color = "black"
    ctx.save()
    ctx.translate(left, top)
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.quadraticCurveTo(width / 2 - width / 8, width / 2 - width / 8, 0, width / 2);
    ctx.quadraticCurveTo(width / 2 - width / 8, width / 2 + width / 8, width / 2, width);
    ctx.quadraticCurveTo(width / 2 + width / 8, width / 2 + width / 8, width, width / 2);
    ctx.quadraticCurveTo(width / 2 + width / 8, width / 2 - width / 8, width / 2, 0);
    ctx.closePath();
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  drawrect(width: number, left: number, top: number) {
    let ctx = this.ctx
    let color = "black"
    ctx.save()
    ctx.translate(left, top)
    ctx.beginPath();
    ctx.rect(0, 0, width, width)
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  drawcircle(width: number, left: number, top: number) {
    let ctx = this.ctx
    let color = "black"
    ctx.save()
    ctx.translate(left, top)
    ctx.beginPath();
    ctx.arc(width / 2, width / 2, width / 2, 0, 2 * Math.PI);
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  drawCodeEye() {
    if (this.custom) {
      this.drawCustomEye()
      return
    }
    switch (this.eyeType) {
      case 'N-A':
        this.drawEyeBorder('A')
        break
      case 'N-B':
        this.drawEyeBorder('B')
        break
      case 'N-C':
        this.drawEyeBorder('C')
        break
      case 'N-D':
        this.drawEyeBorder('D')
        break
      case 'N-E':
        this.drawEyeBorder('E')
        break
      case 'N-F':
        this.drawEyeBorder('F')
        break
      case 'N-G':
        this.drawEyeBorder('G')
        break
    }


  },
  drawCustomEye() {
    let length = this.custom.eyeList.length

    let width = this.canvas.width / this.size
    let pozitionList = [] as Array<any>
    pozitionList.push({
      left: 0,
      top: 0
    })
    pozitionList.push({
      left: width * (this.size - 7),
      top: 0
    })
    pozitionList.push({
      top: width * (this.size - 7),
      left: 0
    })
    pozitionList.forEach((item, index) => {
      let eyeImage = imageCache[this.custom.eyeList[index % length]]
      this.drawImage(eyeImage, { left: item.left, top: item.top, width: width * 7 })
    })
  },
  drawImage(image: HTMLImageElement, option: any) {
    let ctx = this.ctx
    let left = option.left
    let top = option.top
    let width = option.width
    let height = option.height ? option.height : option.width
    ctx.drawImage(image, left, top, width, height)
  },
  drawEyeBorder(type: string) {
    let width = this.canvas.width / this.size
    let pozitionList = [] as Array<any>
    pozitionList.push({
      left: 0,
      top: 0
    })
    pozitionList.push({
      left: width * (this.size - 7),
      top: 0
    })
    pozitionList.push({
      top: width * (this.size - 7),
      left: 0
    })
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    pozitionList.forEach(item => {
      switch (type) {
        case 'A':
          this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width })

          break
        case 'B':
          this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width, borderRadius: width * 2 })

          break;
        case 'C':
          this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width, borderRadius: width * 2 })

          break;
        case 'D':
          this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width, borderRadius: width * 2 })

          break;
        case 'E':
          this.drawRing({ left: item.left, top: item.top, width: width * 7, borderWidth: width })

          break;
        case 'F':
          this.drawRing({ left: item.left, top: item.top, width: width * 7, borderWidth: width })

          break;
        case 'G':
          this.drawRing({ left: item.left, top: item.top, width: width * 7, borderWidth: width })

          break;
      }
    });
    let externalEyeCtx = this.externalEye.getContext('2d') as CanvasRenderingContext2D
    externalEyeCtx.drawImage(this.canvas, 0, 0, this.externalEye.width, this.externalEye.height)

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    pozitionList.forEach(item => {
      switch (type) {
        case 'A':

          this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true })
          break
        case 'B':

          this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true })
          break;
        case 'C':

          this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true, borderRadius: width * 6 / 7 })
          break;
        case 'D':

          this.drawcircle(width * 3, item.left + width * 2, item.top + width * 2)
          break;
        case 'E':

          this.drawcircle(width * 3, item.left + width * 2, item.top + width * 2)
          break;
        case 'F':

          this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true, borderRadius: width * 3 / 7, rotate: Math.PI / 4 })
          break;
        case 'G':

          this.drawEyeStart({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true })
          break;
      }
    });

    let innerEyeCtx = this.innerEye.getContext('2d') as CanvasRenderingContext2D
    innerEyeCtx.drawImage(this.canvas, 0, 0, this.innerEye.width, this.innerEye.height)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  drawEyeStart(option: any) {
    let ctx = this.ctx
    let left = option.left
    let top = option.top
    let width = option.width
    let color = "black"
    ctx.save()
    ctx.translate(left + width / 2, top + width / 2)
    ctx.beginPath()
    ctx.moveTo(-width / 2, -width / 2)
    ctx.quadraticCurveTo(0, -width / 4, width / 2, -width / 2)
    ctx.quadraticCurveTo(width / 4, 0, width / 2, width / 2)
    ctx.quadraticCurveTo(0, width / 4, -width / 2, width / 2)
    ctx.quadraticCurveTo(-width / 4, 0, -width / 2, -width / 2)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  drawRing(option: any) {
    let ctx = this.ctx
    let left = option.left
    let top = option.top
    let R = option.width / 2
    let color = "black"
    let width = option.width
    let borderWidth = option.borderWidth ? option.borderWidth : width / 7
    ctx.save()
    ctx.translate(left + width / 2, top + width / 2)
    ctx.beginPath()
    ctx.arc(0, 0, R, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
    ctx.beginPath()
    ctx.arc(0, 0, R - borderWidth, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  drawSquare(option: any) {
    let ctx = this.ctx
    let left = option.left
    let top = option.top
    let width = option.width
    let borderWidth = option.borderWidth ? option.borderWidth : width / 7
    let color = "black"
    let rotate = option.rotate ? option.rotate : 0
    let fill = option.fill
    let borderRadius = option.borderRadius ? option.borderRadius : 0
    ctx.save()
    ctx.translate(left + width / 2, top + width / 2)
    ctx.rotate(rotate)
    ctx.beginPath()
    ctx.moveTo(-width / 2 + borderRadius, -width / 2)
    ctx.arc(width / 2 - borderRadius, -width / 2 + borderRadius, borderRadius, -Math.PI / 2, 0)
    ctx.arc(width / 2 - borderRadius, width / 2 - borderRadius, borderRadius, 0, Math.PI / 2)
    ctx.arc(-width / 2 + borderRadius, width / 2 - borderRadius, borderRadius, Math.PI / 2, Math.PI)
    ctx.arc(-width / 2 + borderRadius, -width / 2 + borderRadius, borderRadius, Math.PI, Math.PI * 3 / 2)
    // ctx.arc(0, 0, 50, 0, Math.PI * 2)
    // ctx.arc(0, 0, 50, 0, Math.PI * 2)
    ctx.closePath()

    ctx.fillStyle = color
    ctx.fill()
    if (!fill) {
      let scale = (width - 2 * borderWidth) / width
      ctx.beginPath()
      ctx.scale(scale, scale)
      ctx.moveTo(-width / 2 + borderRadius, -width / 2)
      ctx.arc(width / 2 - borderRadius, -width / 2 + borderRadius, borderRadius, -Math.PI / 2, 0)
      ctx.arc(width / 2 - borderRadius, width / 2 - borderRadius, borderRadius, 0, Math.PI / 2)
      ctx.arc(-width / 2 + borderRadius, width / 2 - borderRadius, borderRadius, Math.PI / 2, Math.PI)
      ctx.arc(-width / 2 + borderRadius, -width / 2 + borderRadius, borderRadius, Math.PI, Math.PI * 3 / 2)
      ctx.closePath()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'white'
      ctx.fill()
    }

    ctx.restore()
  },
  liquid() {
  }

}

export default createQrcode