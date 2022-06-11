import './Edit.scss'
import EditHead from './edit/editHead'
import Module from './module/module'
import Zoom from './edit/zoom'
import EditCom from './panel/editCom'
import TextEdit from './edit/textEdit'
import ImageEdit from './edit/imageEdit'
import CodeEdit from './edit/codeEdit'
import ShapeEdit from './edit/shapeEdit'
import ChartEdit from './edit/chartEdit'
import BackEdit from './edit/backEdit'
import AnimateEdit from './edit/animateEdit'
import edit from '../../redux/edit'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import qs from 'querystring'
import { queryTemplateById, queryJsonById } from '../../api/api'
import { useCallback, useEffect, useRef, useState } from 'react'
import { EditUtil } from '../../redux/edit'
import eventEmitter from '../../lib/EventEmitter'
import { ResizeObserver } from 'resize-observer';
import Preview from './panel/preview'
import InputEdit from './edit/inputEdit'
import OptionsEdit from './edit/optionsEdit'
import ButtonEdit from './edit/buttonEdit'
import DateTimeEdit from './edit/dateTimeEdit'
import VedioEdit from './edit/vedioEdit'
/* eslint-disable react-hooks/exhaustive-deps */
function Edit() {
  const scale = useSelector((state: any) => state.H5Edit.scale)
  const [postInfo, setPostInfo] = useState({ ...edit.postInfo })
  let location = useLocation()
  const [showAnimaEdit, setShowAnimaEdit] = useState(-1)
  const [preview, setPreview] = useState(false)
  const [position, setPosition] = useState({ left: 100, top: 10 })
  const dispatch = useDispatch()
  const canvasarea = useRef<HTMLDivElement>(null)
  let search = qs.parse(location.search.substring(1, location.search.length))
  const [jsonId, setJsonId] = useState(0)
  const observeDom = useCallback(() => {
    const resizeobserver = new ResizeObserver(() => {
      let areaDom = canvasarea.current as HTMLDivElement
      let canvas = edit.postInfo.canvas
      if (canvas.width < areaDom.offsetWidth) {
        position.left = (areaDom.offsetWidth - canvas.width * scale / 100) / 2
      } else {
        position.left = 0
      }
      if (canvas.height < areaDom.offsetHeight) {
        position.top = (areaDom.offsetHeight - canvas.height * scale / 100) / 2
      } else {
        position.top = 0
      }
      setPosition({ ...position })
    });
    resizeobserver.observe(canvasarea.current as HTMLDivElement);
  }, [edit.postInfo, scale])
  useEffect(() => {

    setPostInfo({ ...edit.postInfo })
    observeDom()
  }, [edit.postInfo, scale, observeDom])
  useEffect(() => {

    setPostInfo({ ...edit.postInfo })

  }, [edit.postInfo.layers])
  useEffect(() => {
    async function init() {
      let res = await queryTemplateById(search)
      EditUtil.saveModelInfo(res.data)
      let jsonId = res.data.jsonId
      setJsonId(jsonId)
      let jsonRes = await queryJsonById({ id: jsonId })
      dispatch({
        type: 'initEdit',
        page: JSON.parse(jsonRes.data.json)
      })


    }
    observeDom()
    init()
    let listenone: { (value: any): void; (...args: any[]): void }, listentwo: { (): void; (...args: any[]): void }, listenthree: { (): void; (...args: any[]): void };
    eventEmitter.on('setShowAnimaEdit', listenone = (value: any) => { setShowAnimaEdit(value) })
    eventEmitter.on('showPreview', listentwo = () => { setPreview(true) })
    eventEmitter.on('hidePreview', listenthree = () => { setPreview(false) })
    return () => {
      eventEmitter.off('setShowAnimaEdit', listenone)
      eventEmitter.off('showPreview', listentwo)
      eventEmitter.off('hidePreview', listenthree)
    };
  }, []);

  let EditDom: JSX.Element = <></>
  switch (edit.editModule.type) {
    case 'text':
      EditDom = <TextEdit></TextEdit>
      break
    case 'image':
      EditDom = <ImageEdit></ImageEdit>
      break
    case 'code':
      EditDom = <CodeEdit></CodeEdit>
      break
    case 'shape':
      EditDom = <ShapeEdit></ShapeEdit>
      break
    case 'chart':
      EditDom = <ChartEdit></ChartEdit>
      break
    case 'back':
      EditDom = <BackEdit></BackEdit>
      break
    case 'input':
      EditDom = <InputEdit></InputEdit>
      break
    case 'options':
      EditDom = <OptionsEdit></OptionsEdit>
      break
    case 'button':
      EditDom = <ButtonEdit></ButtonEdit>
      break
    case 'datetime':
      EditDom = <DateTimeEdit></DateTimeEdit>
      break
    case 'vedio':
      EditDom = <VedioEdit></VedioEdit>
      break


  }
  let animateDom = showAnimaEdit !== -1 ? <AnimateEdit part={showAnimaEdit}></AnimateEdit> : <></>
  let previewDom = preview ? <Preview jsonId={Number(jsonId)}></Preview> : <></>
  useSelector(state => state)
  return (

    <div className='main'>

      <EditHead></EditHead>

      <div className='module-area'>
        <Module></Module>
      </div>

      <div ref={canvasarea} className='canvas-area'>
        <EditCom position={position} postInfo={postInfo}></EditCom>
        <EditCom edit position={position} postInfo={postInfo}></EditCom>

      </div>
      {/* <EditCom></EditCom> */}
      <Zoom></Zoom>
      {animateDom}
      <div className='edit-area'>

        {EditDom}
      </div>
      {previewDom}
    </div>
  );
}

export default Edit;
