
import { CSSProperties, useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { text } from "../../../interface/module"
import './dText.scss'
import Regulator from './regulator'
import Rotate from './rotate'
import edit from "../../../redux/edit"
import eventEmitter from "../../../lib/EventEmitter"

interface type {
  text: text,
  edit?: boolean,
  animate?: any
}
/* eslint-disable react-hooks/exhaustive-deps */
function DText(props: type) {

  let text = props.text
  const [module, setModule] = useState(props.text);
  useEffect(() => {
    setModule({ ...props.text })
  }, [props.text.id])
  useEffect(() => {

    const changeModule = (id: string) => {
      if (id === props.text.id) {
        setModule({ ...props.text })
      }
    }
    eventEmitter.on('changeModule', changeModule)
    return () => {
      eventEmitter.off('changeModule', changeModule)
    }
  }, [props.text]) // eslint-disable-line react-hooks/exhaustive-deps
  let editcom = props.edit ? props.edit : false
  const [textContent] = useState(props.text.text)
  const dispatch = useDispatch()
  const contentInput = useRef<HTMLDivElement>(null)
  let editModule = edit.editModule

  let scale = useSelector((state: any) => state.H5Edit.scale)
  let moveScale = 100 / scale
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
    textAlign: module.textAlign as any
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
    WebkitTextStroke: `${editcom ? 0 : module.strokeWidth}px ${module.strokeColor}`
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

  }
  const [animate, setAnimate] = useState({} as CSSProperties)
  useEffect(() => {
    let previewAnimate = props.animate
    if (previewAnimate) {
      setAnimate({
        animationName: previewAnimate.keyframe,
        animationDuration: `${previewAnimate.duration / 1000}s`
      })
    } else {
      if (animate) {
        setAnimate({})
      }
    }

  }, [props.animate])// eslint-disable-line react-hooks/exhaustive-deps
  // console.log(1234)
  const changeHeight = () => {
    if (!contentInput.current) {
      return;
    }
    let clientHeight = contentInput.current.clientHeight
    text.height = clientHeight
    setModule({ ...text })
  }
  useEffect(() => {
    setTimeout(() => { changeHeight() })

  }, [module.fontSize, module.lineHeight, module.letterSpacing, module.width])// eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    setModule({ ...props.text })
  }, [props.text])

  const moduleMove = useCallback(() => {
    let module = props.text
    let event = window.event as MouseEvent
    let oriX = event.clientX
    let oriY = event.clientY
    let orileft = module.left
    let oritop = module.top
    dispatch({ type: 'setEditModule', moduleId: module.id })
    window.onmousemove = (event: MouseEvent) => {
      let X = event.clientX
      let Y = event.clientY
      module.left = orileft + (X - oriX) * moveScale
      module.top = oritop + (Y - oriY) * moveScale
      eventEmitter.emit('changeModule', module.id)
    }
    window.onmouseup = () => {
      eventEmitter.emit('updateEditInfo', module.id)
      window.onmousemove = null
      window.onmouseup = null
      module.left = Math.round(module.left)
      module.height = Math.round(module.height)
      module.width = Math.round(module.width)
      module.top = Math.round(module.top)

    }
  }, [props.text, moveScale])


  return (
    <div className='text-content ' style={style} onMouseDown={() => { moduleMove() }} >

      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
        <div className='content' onInput={(value) => {

          text.text = (value.target as HTMLDivElement).innerText
          changeHeight()
          eventEmitter.emit('changeModule', module.id)
        }}
          onBlur={(value) => {
            text.text = (value.target as HTMLDivElement).innerText
            eventEmitter.emit('changeModule', module.id)
          }}
          suppressContentEditableWarning contentEditable="true" style={strokeContentStyle}>
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
        <div className='content' onInput={(value) => {

          text.text = (value.target as HTMLDivElement).innerText
          changeHeight()
          eventEmitter.emit('changeModule', module.id)
        }}
          onBlur={(value) => {
            text.text = (value.target as HTMLDivElement).innerText
            eventEmitter.emit('changeModule', module.id)
          }}
          suppressContentEditableWarning contentEditable="true" style={contentStyle} ref={contentInput} >
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
        {
          (() => {
            if (editModule.id === module.id && editcom)
              return <> <Regulator minHeight={6} module={module} changeWidth={changeHeight}></Regulator><Rotate module={module}></Rotate></>
          })()
        }

      </div>

    </div>
  )

}
export default DText
