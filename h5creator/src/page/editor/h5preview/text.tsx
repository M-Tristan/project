
import { CSSProperties, useEffect, useRef, useState } from "react"
import { text } from "../../../interface/module"


interface type {
  text: text,
  edit?: boolean,
  play: boolean
}
/* eslint-disable react-hooks/exhaustive-deps */
function Text(props: type) {
  const [module, setModule] = useState(props.text);
  let editcom = props.edit ? props.edit : false
  const [textContent] = useState(props.text.text)
  const contentInput = useRef<HTMLDivElement>(null)
  let fontScale = 1
  if (module.fontSize < 12) {
    fontScale = module.fontSize / 12
  }

  let style: CSSProperties = {
    width: module.width + 'px'
    , height: `${fontScale !== 1 ? module.height * fontScale + 'px' : 'auto'}`
    , left: module.left + 'px'
    , top: module.top + 'px',
    transform: `rotate(${module.rotate ? module.rotate : 0}deg)`
    , zIndex: module.zindex,
    // TextAlign: module.textAlign
    textAlign: module.textAlign as any,
    position: `absolute`,
  }
  let contentStyle: CSSProperties = {
    fontSize: `${module.fontSize}px`,
    transform: `scale(${fontScale})`,
    color: editcom ? `rgba(0,0,0,0)` : `${module.color}`,
    caretColor: module.color,
    width: `${module.width / fontScale}px`,
    fontWeight: module.bold ? 900 : 400,
    textDecoration: `${module.textDecoration}`,
    fontStyle: `${module.italic ? 'italic' : 'normal'
      } `,
    lineHeight: `${module.lineHeight} `,
    letterSpacing: `${module.letterSpacing}px`,
    opacity: module.opacity,
    fontFamily: module.fontFamily,
    wordBreak: `break-word`,
    whiteSpace: `normal`,
    position: `relative`,
    left: `0`,
    transformOrigin: `0px 0px`
  }
  let strokeContentStyle: CSSProperties = {
    position: 'absolute',
    zIndex: -1,
    fontSize: `${module.fontSize}px`,
    transform: `scale(${fontScale})`,
    color: editcom ? `rgba(0,0,0,0)` : `${module.color}`,
    caretColor: module.color,
    width: `${module.width / fontScale}px`,
    fontWeight: module.bold ? 900 : 400,
    textDecoration: `${module.textDecoration}`,
    fontStyle: `${module.italic ? 'italic' : 'normal'
      } `,
    lineHeight: `${module.lineHeight} `,
    letterSpacing: `${module.letterSpacing}px`,
    opacity: module.opacity,
    fontFamily: module.fontFamily,
    wordBreak: `break-word`,
    whiteSpace: `normal`,
    left: `0`,
    transformOrigin: `0px 0px`,
    WebkitTextStroke: `${module.strokeWidth}px ${module.strokeColor}`
  }

  const [animate, setAnimate] = useState({} as CSSProperties)
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

  useEffect(() => {
    setModule({ ...props.text })
    return () => {

    }
  }, [props.text])




  return (
    <div className='text-content ' style={{ ...style }} >
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
        <div className='content' style={{ ...strokeContentStyle }}  >
          {
            (() => {
              if (editcom) {
                return textContent
              } else {
                return module.text
              }
            })()
          }
        </div>
        <div className='content' style={{ ...contentStyle }} ref={contentInput} >
          {
            (() => {
              if (editcom) {
                return textContent
              } else {
                return module.text
              }
            })()
          }
        </div>
      </div>


    </div>
  )

}
export default Text
