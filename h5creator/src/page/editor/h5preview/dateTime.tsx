/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, useEffect, useState } from 'react'
import { datetime } from '../../../interface/module'
import scope from './dateTime.module.scss'
import day from 'dayjs'
interface type {
  module: datetime
  play: boolean
}
function DateTime(props: type) {
  const [module, setModule] = useState(props.module)
  const [animate, setAnimate] = useState({} as CSSProperties)
  const [info, setInfo] = useState("")
  useEffect(() => {
    let t = setInterval(() => {
      setInfo(day().format('YYYY-MM-DD HH:mm:ss'))
    })
    return () => {
      clearInterval(t)
    }
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
    <div className={scope['DDateTime']} style={style} >
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
        <div style={inputStyle}>
          {info}
        </div>
      </div>

    </div>
  )
}
export default DateTime