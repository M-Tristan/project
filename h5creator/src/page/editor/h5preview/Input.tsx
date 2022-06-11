/* eslint-disable react-hooks/exhaustive-deps */

import { CSSProperties, useEffect, useState } from "react"
import { input } from "../../../interface/module"

interface type {
  module: input,
  play: boolean
}
function Input(props: type) {
  const [module, setModule] = useState(props.module)
  const [animate, setAnimate] = useState({} as CSSProperties)




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
  useEffect(() => {
    setModule({ ...props.module })
    return () => { }
  }, [props.module])

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
    <div style={style} >
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
        {
          (() => {
            if (module.inputType === 'textarea') {
              return <textarea style={inputStyle} defaultValue={module.placeholder} ></textarea>
            } else if (module.inputType === 'select') {

              return <select style={inputStyle}>
                <option defaultValue="text">{module.placeholder}</option>
              </select>
            } else {
              return <input className='none-input' style={inputStyle} defaultValue={module.placeholder} type={module.inputType}></input>

            }

          })()
        }
      </div>

    </div>
  )
}
export default Input