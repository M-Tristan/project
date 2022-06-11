
import * as QRCode from "qrcode";

interface color {
  dark: string,
  light: string,
}
interface codeParams {
  width: number,
  color: color,
  pointType?: string,
  eyeType?: string
}
const createQrcode = {
  size: 0,
  color: {} as any,
  points: [] as any,
  canvas: null as unknown as HTMLCanvasElement,
  ctx: null as unknown as CanvasRenderingContext2D,
  pointType: 'normal',
  eyeType: 'N-A',
  getCanvas() {
    return this.canvas
  },
  getContext() {
    return this.ctx
  },
  toDataURL(type) {
    return this.canvas.toDataURL(type)
  },
  create(text: string, option: codeParams) {
    let qrcodeData = QRCode.create(text, {})
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
    this.canvas.width = option.width
    this.canvas.height = option.width
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.render()
    return this

  },
  render() {
    this.drawPoints()
    this.drawCodeEye()
    let backcanvas = document.createElement('canvas')
    backcanvas.width = this.canvas.width
    backcanvas.height = this.canvas.height
    let ctx = backcanvas.getContext("2d") as CanvasRenderingContext2D
    ctx.fillStyle = this.color.light;
    ctx.fillRect(0, 0, backcanvas.width, backcanvas.height)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.drawImage(this.canvas, 0, 0, backcanvas.width, backcanvas.height)
    let pointcanvas = document.createElement('canvas')
    pointcanvas.width = this.canvas.width
    pointcanvas.height = this.canvas.height
    ctx = pointcanvas.getContext("2d") as CanvasRenderingContext2D
    ctx.fillStyle = this.color.dark;
    ctx.fillRect(0, 0, backcanvas.width, backcanvas.height)
    ctx.globalCompositeOperation = 'destination-in'
    ctx.drawImage(this.canvas, 0, 0, pointcanvas.width, pointcanvas.height)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(backcanvas, 0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(pointcanvas, 0, 0, this.canvas.width, this.canvas.height)
  },
  drawPoints() {
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
              if (points[pointIndex] === 1 && col < size - 1) {
                this.drawConnect(width, width * 0.8, (col + 0.6) * width, (row + 0.1) * width)
              } else {
                if (points[pointIndex - 2] === 0 && points[pointIndex - size - 1] === 1 && points[pointIndex - size] === 0 && points[pointIndex - size - 2] === 0) {
                  this.drawConnect(width * 0.8, width, (col + 0.1) * width, (row - 0.4) * width)
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
  drawliquid(left, top, width, direction) {
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
  drawConnect(width, height, left, top) {
    let ctx = this.ctx
    let color = "black"
    ctx.save()
    ctx.translate(left, top)
    ctx.rect(0, 0, width, height)
    ctx.fillStyle = color
    ctx.fill()
    ctx.restore()
  },
  drawstar(width, left, top) {
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
  drawrect(width, left, top) {
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
  drawcircle(width, left, top) {
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
    pozitionList.forEach(item => {
      switch (type) {
        case 'A':
          this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width })
          this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true })
          break
        case 'B':
          this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width, borderRadius: width * 2 })
          this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true })
          break;
        case 'C':
          this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width, borderRadius: width * 2 })
          this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true, borderRadius: width * 6 / 7 })
          break;
        case 'D':
          this.drawSquare({ left: item.left, top: item.top, width: width * 7, borderWidth: width, borderRadius: width * 2 })
          this.drawcircle(width * 3, item.left + width * 2, item.top + width * 2)
          break;
        case 'E':
          this.drawRing({ left: item.left, top: item.top, width: width * 7, borderWidth: width })
          this.drawcircle(width * 3, item.left + width * 2, item.top + width * 2)
          break;
        case 'F':
          this.drawRing({ left: item.left, top: item.top, width: width * 7, borderWidth: width })
          this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true, borderRadius: width * 3 / 7, rotate: Math.PI / 4 })
          break;
        case 'G':
          this.drawRing({ left: item.left, top: item.top, width: width * 7, borderWidth: width })

          // this.drawSquare({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true, borderRadius: width * 3 / 7, rotate: Math.PI / 4 })

          this.drawEyeStart({ left: item.left + width * 2, top: item.top + width * 2, width: width * 3, fill: true })
          break;
      }
    });

  },
  drawEyeStart(option) {
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
  drawRing(option) {
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
  drawSquare(option) {
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
    //     ctx.save()
    // ctx.translate(100,100)
    // ctx.beginPath();
    // ctx.arc(0,0,50,0,Math.PI*2)
    // ctx.fillStyle='red'
    // ctx.fill()
    // ctx.restore()
    // ctx.save()
    // ctx.translate(200,200)
    // ctx.beginPath();
    // ctx.arc(0,0,50,0,Math.PI*2)
    // ctx.fillStyle='red'
    // ctx.fill()
    // ctx.restore()
    // ctx.save()
    // ctx.translate(100,100)
    // ctx.beginPath();
    // ctx.moveTo(0,0)
    // ctx.lineTo(100,100)
    // ctx.lineTo(100,50)
    // ctx.arc(100,0,50,Math.PI/2,Math.PI)
    // ctx.lineTo(0,0)
    // ctx.fillStyle='red'
    // ctx.fill()
    // ctx.restore()
    // ctx.save()
    // ctx.translate(100,100)
    // ctx.beginPath();
    // ctx.moveTo(0,0)
    // ctx.lineTo(100,100)
    // ctx.lineTo(50,100)
    // ctx.arc(0,100,50,0,-Math.PI/2,true)
    // ctx.lineTo(0,0)
    // ctx.fillStyle='red'
    // ctx.fill()
    // ctx.restore()
  }

}

export default createQrcode