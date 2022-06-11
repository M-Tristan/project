/* eslint-disable react-hooks/exhaustive-deps */

import { CSSProperties, useEffect, useState } from "react"
import { button } from "../../../interface/module"


interface type {
  module: button,
  play: boolean

}
function Button(props: type) {
  const [module, setModule] = useState(props.module)
  const [animate, setAnimate] = useState({} as CSSProperties)

  useEffect(() => {
    setModule({ ...props.module })
    return () => { }
  }, [props.module])


  let style: React.CSSProperties = {
    width: module.width + 'px',
    height: module.height + 'px',
    left: module.left + 'px',
    top: module.top + 'px',
    transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    zIndex: module.zindex,
    position: `absolute`,
    display: `inline-block`
  }
  let shortBorder = module.width > module.height ? module.height : module.width
  let inputStyle: React.CSSProperties = {
    width: `100%`,
    height: `100%`,
    display: 'show',
    color: module.color,
    backgroundColor: module.backgroundColor,
    borderColor: module.borderColor,
    borderWidth: `${module.borderWidth}px`,
    borderStyle: 'solid',
    borderRadius: `${module.borderRadius * shortBorder / 100}px`,
    opacity: module.opacity
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
        animationDuration: `${enterAnimate.duration / 1000}s`
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
    <div style={style}>
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
        {
          (() => {
            if (module.buttonType === 'submit') {
              return <button style={inputStyle}>提交</button>
            } else if (module.buttonType === 'appreciate') {
              return <button style={{ ...inputStyle, ...{ fontSize: '25px' } }}>< i className='icon iconfont icon-dianzan2' style={{ fontSize: '25px' }}></i> 0</button>
            } else if (module.buttonType === 'link') {
              return <button style={inputStyle}>跳转链接</button>
            } else if (module.buttonType === 'views') {
              return <button style={{ ...inputStyle, ...{ fontSize: '25px' } }}>< i className='icon iconfont icon-yanjing1' style={{ fontSize: '25px' }}></i> 0</button>
            }

          })()
        }

      </div>

    </div>
  )
}
export default Button