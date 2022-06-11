/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import * as QRCode from "qrcode";
import { code } from '../../../interface/module'
interface type {
  module: code,
  play: boolean
}
function DCode(props: type) {
  const [module, setModule] = useState(props.module)
  const [animate, setAnimate] = useState({} as CSSProperties)
  let code = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line jsx-a11y/alt-text
  let backImg = module.backImage ? <img
    className="backImage"
    draggable="false"
    src={module.backImage}
  /> : ''
  const draw = useCallback(() => {
    let module = props.module
    QRCode.toCanvas(
      module.text,
      {
        margin: 1,
        width: 1000,
        color: {
          dark: module.colorDark,
          light: module.colorLight,
        },
      },
      (err: any, canvas: any) => {
        if (err) throw err;
        if (code.current !== null) {
          code.current.append(canvas);
          var image = new Image();
          image.src = canvas.toDataURL("image/png");
          image.style.width = "100%";
          image.style.height = "100%";
          code.current.innerHTML = "";
          code.current.append(image);
          return
        }

      }
    );
  }, [props.module])

  useEffect(() => {
    setModule({ ...props.module })
    draw()
    return () => { }
  }, [props.module])


  let style = {
    width: module.width + 'px',
    height: module.height + 'px',
    left: module.left + 'px',
    top: module.top + 'px',
    transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    zIndex: module.zindex,
  }

  let stopAnimate = false
  useEffect(() => {
    if (props.play) {
      implementAnimate()
    } else {
      setAnimate({
      })
    }

    return () => {
      stopAnimate = true
    }
  }, [module.animates, props.play])
  const implementAnimate = async () => {
    if (stopAnimate) {
      return
    }
    if (!module.animates) {
      return;
    }
    let enterAnimate = module.animates.find(
      (item: any) => item.type === "enter"
    );
    if (enterAnimate) {
      let duration = enterAnimate.duration
      setAnimate({
        animationName: enterAnimate.keyframe,
        animationDuration: `${enterAnimate.duration / 1000}s`,
      })
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, duration);
      });
    }
    if (stopAnimate) {
      return
    }
    let emphasizeAnimate = module.animates.find(
      (item: any) => item.type === "emphasize"
    );
    if (emphasizeAnimate) {
      let duration = emphasizeAnimate.duration
      setAnimate({
        animationName: emphasizeAnimate.keyframe,
        animationDuration: `${emphasizeAnimate.duration / 1000}s`,
      })
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, duration);
      });
    }
    if (stopAnimate) {
      return
    }
    let leaveAnimate = module.animates.find(
      (item: any) => item.type === "leave"
    );
    if (leaveAnimate) {
      let duration = leaveAnimate.duration
      setAnimate({
        animationName: leaveAnimate.keyframe,
        animationDuration: `${leaveAnimate.duration / 1000}s`,
      })
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, duration);
      });
      setAnimate({
        opacity: 0

      })
    }
  }
  return (<div
    className="code-content"

    style={style}

  >
    <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
      {backImg}
      <div
        ref={code}
        className="code"
        draggable="false"
      ></div>
    </div>


  </div>)
}

export default DCode