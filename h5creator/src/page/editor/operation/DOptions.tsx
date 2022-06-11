/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { options } from '../../../interface/module'
import eventEmitter from '../../../lib/EventEmitter'
import edit from '../../../redux/edit'
import scope from './DOptions.module.scss'
import Regulator from './regulator'
import Rotate from './rotate'
interface type {
  module: options
  edit?: boolean,
  animate?: any
}
function DOptions(props: type) {
  const [module, setModule] = useState(props.module)
  const contentInput = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState({} as CSSProperties)
  let editcom = props.edit ? props.edit : false
  let editModule = edit.editModule
  let scale = useSelector((state: any) => state.H5Edit.scale)
  let moveScale = 100 / scale
  let shortBorder = module.width > module.height ? module.height : module.width
  const dispatch = useDispatch()
  useEffect(() => {
    setModule({ ...props.module })
  }, [props.module.id])
  useEffect(() => {
    const changeModule = (id: string) => {
      if (id === props.module.id) {
        setModule({ ...module })


      }

    }
    changeModule(props.module.id)

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
    opacity: editcom ? '0' : module.opacity,
    color: module.color
  }
  let headStyle: React.CSSProperties = {
    width: `100%`,
    padding: `5px`,
    color: module.titleColor,
    backgroundColor: module.titleBackgroundColor
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
  useEffect(() => {
    changeHeight()
  }, [props.module.title, props.module.selectList])

  const changeHeight = () => {
    if (!contentInput.current) {
      return;
    }
    let clientHeight = contentInput.current.clientHeight
    // console.log(module.height)
    props.module.height = clientHeight

    setModule({ ...props.module })

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

  return (
    <div className={scope['DOptions']} style={style} onMouseDown={() => { moduleMove() }}>
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
        <div style={optionStyle} ref={contentInput} >
          <div style={headStyle}>
            {module.title}
          </div>
          <div className={scope['options']} style={selectStyle}>

            {selectList}

          </div>
        </div>
      </div>
      {
        (() => {
          if (editModule.id === module.id && editcom)
            return <> <Regulator module={module} minHeight={20} minWidth={80}></Regulator><Rotate module={module}></Rotate></>
        })()
      }
    </div>
  )
}
export default DOptions