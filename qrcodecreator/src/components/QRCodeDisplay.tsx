
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import createQrcode from 'createqrcode';
import './QRCodeDisplay.css'
import canvasCoach from '../lib/canvasCoach'
interface type {
  text: string,
  option: any,
  custom?: any,
  logo: any,
  back: any
}
function QRCodeDisplay(props: type) {
  let codeCanvas = useRef(null as unknown as HTMLCanvasElement)
  let logoCanvas = useRef(null as unknown as HTMLCanvasElement)
  let [back, setBack] = useState(props.back)
  let [logoStyle, setLogoStyle] = useState({
    left: `50%`,
    top: `50%`,
    transform: `translateX(-50%) translateY(-50%)`,
    width: '10%'
  } as any)
  const painTexture = async (canvas: HTMLCanvasElement, color?: string) => {
    let codeCtx = canvas.getContext('2d') as CanvasRenderingContext2D
    codeCtx.globalCompositeOperation = "source-in";
    if (props.option.type === 'color' || color) {
      let colorCanvas = document.createElement('canvas')
      colorCanvas.setAttribute('width', '1000')
      colorCanvas.setAttribute('height', '1000')
      const colorCtx = colorCanvas.getContext('2d') as CanvasRenderingContext2D
      colorCtx.fillStyle = color ? color : props.option.color.dark;
      colorCtx.fillRect(0, 0, 1000, 1000);
      codeCtx.drawImage(colorCanvas, 0, 0, 1000, 1000)
    } else if (props.option.type === 'gradual') {
      let gradualCanvas = document.createElement('canvas')
      gradualCanvas.setAttribute('width', '1000')
      gradualCanvas.setAttribute('height', '1000')
      const gradualCtx = gradualCanvas.getContext('2d') as CanvasRenderingContext2D
      var grd: CanvasGradient
      switch (props.option.direction) {
        case 'vertical':
          grd = gradualCtx.createLinearGradient(0, 0, 0, 1000);
          break;
        case 'horizontal':
          grd = gradualCtx.createLinearGradient(0, 0, 1000, 0);
          break;
        case 'opposite':
          grd = gradualCtx.createLinearGradient(0, 0, 1000, 1000);
          break;
        default:
          grd = gradualCtx.createRadialGradient(500, 500, 0, 500, 500, 500 * Math.sqrt(2));
      }
      grd.addColorStop(0, props.option.gradualColor.colorStep1);
      grd.addColorStop(1, props.option.gradualColor.colorStep2);
      gradualCtx.fillStyle = grd;
      gradualCtx.fillRect(0, 0, 1000, 1000);
      codeCtx.drawImage(gradualCanvas, 0, 0, 1000, 1000)
    } else {
      let image = new Image()
      image.setAttribute('crossOrigin', 'Anonymous')
      image.src = props.option.backImage
      await new Promise<void>((res, rej) => {
        image.onload = () => {
          // canvasCoach.backImage = image
          res()
        }
      })
      codeCtx.drawImage(image, 0, 0, 1000, 1000)

    }
  }
  const drawCode = async () => {
    let canvas: HTMLCanvasElement
    let innerEye: HTMLCanvasElement
    let externalEye: HTMLCanvasElement
    let pointsCanvas: HTMLCanvasElement
    let text = props.text === '' ? ' ' : props.text
    let qcode = createQrcode
      .create(text, props.option, props.custom.render !== true ? undefined : props.custom)
    canvas = qcode.canvas
    innerEye = qcode.innerEye
    externalEye = qcode.externalEye
    pointsCanvas = qcode.pointsCanvas
    if (!codeCanvas.current) {
      return
    }
    canvas.style.maxHeight = '100%'
    canvas.style.maxWidth = '100%'

    if (props.custom.render !== true) {
      await painTexture(pointsCanvas)
      await painTexture(innerEye, props.option.fillColor ? undefined : props.option.innerEyeColor)
      await painTexture(externalEye, props.option.fillColor ? undefined : props.option.outEyeColor)
      let canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
      canvasCtx.drawImage(pointsCanvas, 0, 0, canvas.width, canvas.height)
      canvasCtx.drawImage(innerEye, 0, 0, canvas.width, canvas.height)
      canvasCtx.drawImage(externalEye, 0, 0, canvas.width, canvas.height)
    }

    let ctx = codeCanvas.current.getContext('2d')
    if (!ctx) {
      return
    }
    ctx.clearRect(0, 0, 1000, 1000)
    ctx.fillStyle = props.option.color.light;
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.drawImage(canvas, 0, 0, 1000, 1000)
    canvasCoach.canvas = codeCanvas.current
  }
  useEffect(() => {
    drawCode()
  }, [props.text, props.option, props.custom])
  useEffect(() => {
    let logo = props.logo
    let ctx = logoCanvas.current.getContext("2d") as CanvasRenderingContext2D
    if (logo.render) {

      ctx.clearRect(0, 0, 1000, 1000)
      let image = new Image()
      image.setAttribute('crossOrigin', 'Anonymous')
      image.src = logo.src
      image.onload = () => {
        if (logo.border === 'circle') {
          ctx.save()
          ctx.beginPath();
          ctx.arc(500, 500, 500, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
          ctx.beginPath();
          ctx.arc(500, 500, 450, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(image, 0, 0, 1000, 1000);
          ctx.restore()
        } else if (logo.border === 'rect') {
          ctx.save()
          ctx.drawImage(image, 0, 0, 1000, 1000);
          ctx.beginPath();
          ctx.lineWidth = 100
          ctx.strokeStyle = "white";
          ctx.rect(0, 0, 1000, 1000)
          ctx.stroke();
          ctx.restore()

        } else {
          ctx.drawImage(image, 0, 0, 1000, 1000);
        }
        canvasCoach.logo = logoCanvas.current

      }
    } else {
      ctx.clearRect(0, 0, 1000, 1000)
    }
  }, [props.logo.src, props.logo.border])
  useEffect(() => {
    let logo = props.logo
    if (logo.render) {

      if (logo.position === 'center') {
        logoStyle = {
          left: `50%`,
          top: `50%`,
          transform: `translateX(-50%) translateY(-50%)`,
          width: `${logo.width}%`
        }
      } else {
        logoStyle = {
          right: 0,
          bottom: 0,
          width: `${logo.width}%`
        }
      }
      setLogoStyle({ ...logoStyle })
    }
  }, [props.logo.position, props.logo.width, props.logo.src])
  useEffect(() => {
    setBack({ ...props.back })
  }, [props.back])
  let backDom = <></>
  if (back.render) {
    let image = new Image()
    image.setAttribute('crossOrigin', 'Anonymous')
    image.src = back.src
    canvasCoach.backImage = image
    let width = 100 + back.size
    backDom = <div className='backImageContent' style={{ width: `${width}%` }}>
      <img alt='' className='backImage' src={back.src}></img>
    </div>
  }
  return (
    <div className='QRCodeDisplay'>
      <div className='QRCodeDisplayContent'>
        <div className='canvasContent'>
          {backDom}
          <canvas ref={codeCanvas} width='1000' height='1000' className='codeCanvas'></canvas>
          <canvas ref={logoCanvas} width='1000' height='1000' className='LogoCanvas' style={logoStyle}></canvas>
        </div>
      </div>
    </div>
  )
}
export default QRCodeDisplay