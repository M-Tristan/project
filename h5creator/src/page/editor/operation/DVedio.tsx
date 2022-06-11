/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vedio } from '../../../interface/module'
import eventEmitter from '../../../lib/EventEmitter'
import edit from '../../../redux/edit'
import scope from './DVedio.module.scss'
import Regulator from './regulator'
import Rotate from './rotate'
interface type {
  module: vedio
  edit?: boolean,
  animate?: any
}
function DVedio(props: type) {
  const [module, setModule] = useState(props.module)
  const [animate, setAnimate] = useState({} as CSSProperties)
  const vedioDom = useRef<HTMLDivElement>(null)
  let editcom = props.edit ? props.edit : false
  let shortBorder = module.width > module.height ? module.height : module.width
  let editModule = edit.editModule
  let scale = useSelector((state: any) => state.H5Edit.scale)
  let moveScale = 100 / scale
  const dispatch = useDispatch()
  useEffect(() => {
    if (vedioDom.current) {
      vedioDom.current.innerHTML = props.module.iframelink
    }


    return () => { }
  }, [props.module.iframelink])
  useEffect(() => {
    setModule({ ...props.module })
  }, [props.module.id])
  useEffect(() => {
    const changeModule = (id: string) => {
      if (id === props.module.id) {
        setModule({ ...module })
      }
    }
    eventEmitter.on('changeModule', changeModule)
    return () => {
      eventEmitter.off('changeModule', changeModule)
    }
  }, [props.module])
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
  let inputStyle: React.CSSProperties = {
    width: `100%`,
    height: `100%`,
    display: editcom ? 'none' : 'show'
  }
  const moduleMove = useCallback(() => {
    let module = props.module
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
  }, [props.module, moveScale])

  return (
    <div className={scope['DDateTime']} style={style} onMouseDown={() => { moduleMove() }}>
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
        {(() => {
          if (module.iframelink === "") {
            return <div style={inputStyle}>
              <div className={scope['none-vedio']}>
                <i className="icon iconfont icon-shipinbofangyingpian" style={{ fontSize: `${shortBorder / 2}px` }}></i>
              </div>
            </div>
          } else {
            return <div style={inputStyle} className={scope['vedio-area']} ref={vedioDom}>

            </div>

          }

        })()}
      </div>
      {
        (() => {
          if (editModule.id === module.id && editcom)
            return <> <Regulator module={module} minHeight={20} minWidth={80}></Regulator><Rotate module={module}></Rotate></>
        })()
      }
    </div >
  )
}
export default DVedio