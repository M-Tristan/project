/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import * as QRCode from "qrcode";
import { code } from '../../../interface/module'
import Regulator from './regulator'
import Rotate from './rotate'
import './dCode.scss'
import { useDispatch, useSelector } from 'react-redux';
import edit from '../../../redux/edit';
import eventEmitter from '../../../lib/EventEmitter';
interface type {
  module: code
  edit?: boolean,
  animate?: any
}
function DCode(props: type) {
  const [module, setModule] = useState(props.module)
  useEffect(() => {
    setModule({ ...props.module })
  }, [props.module.id])
  useEffect(() => {

    const changeModule = (id: string) => {
      if (id === props.module.id) {
        setModule({ ...props.module })
      }
    }
    eventEmitter.on('changeModule', changeModule)
    return () => {
      eventEmitter.off('changeModule', changeModule)
    }
  }, [props.module])

  let editcom = props.edit ? props.edit : false
  const [animate, setAnimate] = useState({} as CSSProperties)
  let scale = useSelector((state: any) => state.H5Edit.scale)
  let moveScale = 100 / scale
  let editModule = edit.editModule
  let code = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  // eslint-disable-next-line jsx-a11y/alt-text
  let backImg = module.backImage && !editcom ? <img
    className="backImage"
    draggable="false"
    src={module.backImage}
  /> : ''
  const moduleMove = useCallback(() => {
    let module = props.module
    let event = window.event as MouseEvent
    let oriX = event.clientX
    let oriY = event.clientY
    let orileft = module.left
    let oritop = module.top
    dispatch({ type: 'setEditModule', moduleId: module.id })
    // let shouldPushBack = false
    window.onmousemove = (event: MouseEvent) => {
      let X = event.clientX
      let Y = event.clientY
      module.left = orileft + (X - oriX) * moveScale
      module.top = oritop + (Y - oriY) * moveScale
      // setModule({ ...module as text })
      eventEmitter.emit('changeModule', module.id)

      // shouldPushBack = true
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
  }, [props.module, moveScale])
  const draw = useCallback(() => {
    let module = props.module
    if (editcom) {
      return
    }
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


  }, [props.module, props.module.colorDark, props.module.colorLight])
  useEffect(() => {


    draw()

  }, [props.module.colorDark, props.module.colorLight, props.module.text])
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
  let style = {
    width: module.width + 'px',
    height: module.height + 'px',
    left: module.left + 'px',
    top: module.top + 'px',
    transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    zIndex: module.zindex,
  }
  return (<div
    className="code-content"
    onMouseDown={() => { moduleMove() }}
    style={style}

  >
    <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
      {backImg}
      <div
        ref={code}
        className="code"
        draggable="false"
      ></div>
      {
        (() => {
          if (editModule.id === module.id && editcom)
            return <> <Regulator module={module}></Regulator><Rotate module={module}></Rotate></>
        })()
      }

    </div>

  </div>)
}

export default DCode