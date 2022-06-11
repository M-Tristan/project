


import { button, chart, code, datetime, image, input, options, postInfo, shape, text, vedio } from '../../../interface/module'
import DText from '../operation/dText'
import DImage from '../operation/dImage'
import DCode from '../operation/dCode'
import './editCom.scss'
import DChart from '../operation/dChart'
import DShape from '../operation/dShape'
import Background from '../operation/background'
import classnames from 'classnames'
import { useEffect, useState } from 'react'
import eventEmitter from '../../../lib/EventEmitter'
import DInput from '../operation/DInput'
import DOptions from '../operation/DOptions'
import DButton from '../operation/DButton'
import DDateTime from '../operation/DDateTime'
import DVedio from '../operation/DVedio'
import Clipper from '../operation/clipper'
import { useSelector } from 'react-redux'
import edit from '../../../redux/edit'
// const svg = require('../../../assets/svg/phone.svg');
interface type {
  edit?: boolean,
  position?: any,
  postInfo: postInfo,
  scale?: number
}
function EditCom(props: type) {
  let scale = useSelector((state: any) => state.H5Edit.scale)
  if (props.scale) {
    scale = props.scale
  }
  let editcom = props.edit ? props.edit : false
  let position = props.position ? props.position : { left: 100, top: 10 }
  let postInfo = props.postInfo
  let background = postInfo.background
  let canvas = postInfo.canvas
  let clipperOper = useSelector((state: any) => state.H5Edit.clipOper)
  let style = {
    overflow: editcom ? `` : `hidden`,
    transform: `scale(${scale / 100},${scale / 100})`,
    width: `${canvas.width}px`
    , height: `${canvas.height}px`
    , left: `${position.left}px`
    , top: `${position.top}px`
  }
  const [previewInfo, setPreviewInfo] = useState<any>({})
  useEffect(() => {
    let t: any
    let listen = (previewInfo: any) => {
      clearTimeout(t)
      setPreviewInfo({})
      setTimeout(() => { setPreviewInfo(previewInfo) })
      t = setTimeout(() => {
        setPreviewInfo({})
      }, previewInfo.duration)

    }
    eventEmitter.on('previewAnimate', listen)
    return () => {
      eventEmitter.off('previewAnimate', listen)

    }
  }, [])
  // eslint-disable-next-line array-callback-return
  let layersDom = postInfo.layers.map((item, index) => {
    let animate
    if (item.id === previewInfo.moduleId) {
      animate = previewInfo
    }
    if (item.type === 'text') {
      return <DText edit={editcom} text={item as text} key={item.id} animate={animate}></DText>
    } else if (item.type === 'image') {
      if (clipperOper && item.id === edit.editModule.id) {
        return <div key={item.id}></div>
      } else {
        return <DImage edit={editcom} module={item as image} animate={animate} key={item.id}></DImage>
      }

    } else if (item.type === 'code') {
      return <DCode edit={editcom} module={item as code} animate={animate} key={item.id}></DCode>
    } else if (item.type === 'chart') {
      return <DChart edit={editcom} module={item as chart} animate={animate} key={item.id}></DChart>
    } else if (item.type === 'shape') {
      return <DShape edit={editcom} module={item as shape} animate={animate} key={item.id}></DShape>
    } else if (item.type === 'input') {
      return <DInput edit={editcom} module={item as input} animate={animate} key={item.id}></DInput>
    } else if (item.type === 'options') {
      return <DOptions edit={editcom} module={item as options} animate={animate} key={item.id}></DOptions>
    } else if (item.type === 'button') {
      return <DButton edit={editcom} module={item as button} animate={animate} key={item.id}></DButton>
    } else if (item.type === 'datetime') {
      return <DDateTime edit={editcom} module={item as datetime} animate={animate} key={item.id}></DDateTime>
    } else if (item.type === 'vedio') {
      return <DVedio edit={editcom} module={item as vedio} animate={animate} key={item.id}></DVedio>
    }
  })
  let clipperDom = clipperOper && editcom ? <Clipper></Clipper> : <></>
  return (
    <div className={classnames(['editContent', { backgroundImage: !editcom }])} style={style}>

      {
        (() => {
          if (!editcom) {
            return <Background background={background}></Background>
          }
        })()
      }

      {layersDom}

      {clipperDom}
    </div>
  )
}

export default EditCom