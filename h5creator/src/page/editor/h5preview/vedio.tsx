/* eslint-disable react-hooks/exhaustive-deps */

import { CSSProperties, useEffect, useRef, useState } from "react"
import { vedio } from "../../../interface/module"
import scope from './vedio.module.scss'
interface type {
  module: vedio
  play: boolean
}
function Vedio(props: type) {
  const [module, setModule] = useState(props.module)
  const [animate, setAnimate] = useState({} as CSSProperties)
  const vedioDom = useRef<HTMLDivElement>(null)
  let shortBorder = module.width > module.height ? module.height : module.width
  useEffect(() => {


    if (props.module.iframelink && vedioDom.current) {
      vedioDom.current.innerHTML = props.module.iframelink
    }



    return () => { }
  }, [])
  useEffect(() => {
    setModule({ ...props.module })
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
  let inputStyle: React.CSSProperties = {
    width: `100%`,
    height: `100%`,
    display: 'show'
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
  return (
    <div className={scope['DDateTime']} style={style} >
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>

        <div style={inputStyle} className={scope['vedio-area']} ref={vedioDom}>
          <div className={scope['none-vedio']}>
            <i className="icon iconfont icon-shipinbofangyingpian" style={{ fontSize: `${shortBorder / 2}px` }}></i>
          </div>
        </div>




      </div>

    </div>
  )
}
export default Vedio