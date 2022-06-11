/* eslint-disable react-hooks/exhaustive-deps */

import { CSSProperties, useEffect, useState } from "react"
import { options } from "../../../interface/module"
import scope from './options.module.scss'
interface type {
  module: options
  play: boolean
}
function Options(props: type) {
  const [module, setModule] = useState(props.module)
  const [animate, setAnimate] = useState({} as CSSProperties)
  let shortBorder = module.width > module.height ? module.height : module.width
  let style = {
    width: module.width + 'px',
    left: module.left + 'px',
    top: module.top + 'px',
    transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    zIndex: module.zindex,
  }
  let optionStyle: React.CSSProperties = {
    width: `100%`,
    boxSizing: `border-box`,
    overflow: `hidden`,
    borderColor: module.borderColor,
    borderWidth: `${module.borderWidth}px`,
    borderStyle: 'solid',
    borderRadius: `${module.borderRadius * shortBorder / 100}px`,
    opacity: module.opacity,
    color: module.color
  }
  let headStyle: React.CSSProperties = {
    width: `100%`,
    padding: `5px`,
    color: module.titleColor,
    backgroundColor: module.titleBackgroundColor
  }




  let selectStyle: React.CSSProperties = {
    backgroundColor: module.backgroundColor,
  }

  let selectList
  if (module.selectList) {
    selectList = module.selectList.map((item: any) => {
      return <div key={item.id} className={scope["option-group"]}>
        <label className={scope["option-label"]} >
          <input className={scope["option"]} type={module.inputType}></input>
          <span>{item.value}</span>
        </label>
      </div>
    })
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
    <div className={scope['DOptions']} style={style} >
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
        <div style={optionStyle} >
          <div style={headStyle}>
            {module.title}
          </div>
          <div className={scope['options']} style={selectStyle}>

            {selectList}

          </div>
        </div>
      </div>

    </div>
  )
}
export default Options