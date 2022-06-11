import { Divider } from "antd"
import scope from './componentList.module.scss'
import ModuleUtil from '../../../lib/ModuleUtil';
import { useDispatch } from "react-redux";
function ComponentList() {
  const dispatch = useDispatch()
  const addInput = async () => {
    let inputInfo = await ModuleUtil.getInputInfo()
    dispatch({ type: 'addInput', input: inputInfo })
  }
  const addTextArea = async () => {
    let inputInfo = await ModuleUtil.getTextAreaInfo()
    dispatch({ type: 'addInput', input: inputInfo })
  }
  const addSelect = async () => {
    let inputInfo = await ModuleUtil.getSelectInfo()
    dispatch({ type: 'addInput', input: inputInfo })
  }

  const addRadio = async () => {
    let radioInfo = await ModuleUtil.getOptionsInfo('radio')
    dispatch({ type: 'addOption', option: radioInfo })
  }
  const addCheckBox = async () => {
    let radioInfo = await ModuleUtil.getOptionsInfo('checkbox')
    dispatch({ type: 'addOption', option: radioInfo })
  }

  const addSubmitButton = async () => {
    let buttonInfo = await ModuleUtil.getButtonInfo('submit')
    dispatch({ type: 'addButton', button: buttonInfo })
  }

  const addAppreciateButton = async () => {
    let buttonInfo = await ModuleUtil.getButtonInfo('appreciate')
    dispatch({ type: 'addButton', button: buttonInfo })
  }

  const addLinkButton = async () => {
    let buttonInfo = await ModuleUtil.getButtonInfo('link')
    dispatch({ type: 'addButton', button: buttonInfo })
  }
  const addViewButton = async () => {
    let buttonInfo = await ModuleUtil.getButtonInfo('views')
    dispatch({ type: 'addButton', button: buttonInfo })
  }

  const addTime = async () => {
    let timeInfo = await ModuleUtil.getDateInfo('time')
    dispatch({ type: 'addTime', datetime: timeInfo })
  }

  const addDate = async () => {
    let timeInfo = await ModuleUtil.getDateInfo('date')
    dispatch({ type: 'addTime', datetime: timeInfo })
  }

  const addVedio = async () => {
    let vedioInfo = await ModuleUtil.getVedioInfo()
    dispatch({ type: 'addVedio', vedio: vedioInfo })
  }
  return (<div className={scope['componentList']}>
    <Divider>表单</Divider>
    <div className={scope['item']} onClick={addInput}>
      <i className='icon iconfont icon-shurukuang2'></i>
      <span>输入框</span>
    </div>
    <div className={scope['item']} onClick={addTextArea}>
      <i className='icon iconfont icon-duohangshurukuang'></i>
      <span>段落文本</span>
    </div>
    <div className={scope['item']} onClick={addRadio}>
      <i className='icon iconfont icon-danxuankuang4'></i>
      <span>单选</span>
    </div>
    <div className={scope['item']} onClick={addCheckBox}>
      <i className='icon iconfont icon-icon_duoxuankuangzu'></i>
      <span>多选</span>
    </div>
    <div className={scope['item']} onClick={addSelect}>
      <i className='icon iconfont icon-liebiao1'></i>
      <span>下拉列表</span>
    </div>
    <div className={scope['item']} onClick={addSubmitButton}>
      <i className='icon iconfont icon-shoudong'></i>
      <span>提交按钮</span>
    </div>
    {/* <div className={scope['item']}>
      <i className={`icon iconfont icon-biaodan ${scope['disabled']}`}></i>
      <span>快捷表单</span>
    </div> */}
    <Divider>互动</Divider>
    {/* <div className={scope['item']}>
      <i className={`icon iconfont icon-dongtai01 ${scope['disabled']}`}></i>
      <span>地图</span>
    </div> */}
    <div className={scope['item']} onClick={addAppreciateButton}>
      <i className='icon iconfont icon-dianzan2'></i>
      <span>点赞</span>
    </div>
    <div className={scope['item']} onClick={addLinkButton}>
      <i className='icon iconfont icon--_lianjie'></i>
      <span>跳转路径</span>
    </div>
    <div className={scope['item']} onClick={addVedio}>
      <i className='icon iconfont icon-shipin7'></i>
      <span>外链视频</span>
    </div>
    <div className={scope['item']} onClick={addViewButton}>
      <i className='icon iconfont icon-eye'></i>
      <span>浏览次数</span>
    </div>
    <div className={scope['item']} onClick={addTime}>
      <i className='icon iconfont icon-time-line'></i>
      <span>实时时间</span>
    </div>
    <div className={scope['item']} onClick={addDate}>
      <i className='icon iconfont icon-ic_calendar'></i>
      <span>实时日期</span>
    </div>

    <Divider>特殊效果</Divider>
    <div className={scope['item']}>
      <i className={`icon iconfont icon-lifangti ${scope['disabled']}`} ></i>
      <span>立体方块</span>
    </div>
    <div className={scope['item']}>
      <i className={`icon iconfont icon-xuanzhuanzhizhongxin ${scope['disabled']}`} ></i>
      <span>旋转木马</span>
    </div>
    <div className={scope['item']}>
      <i className={`icon iconfont icon-tucengbofang1 ${scope['disabled']}`} ></i>
      <span>一镜到底</span>
    </div>
    <div className={scope['item']}>
      <i className={`icon iconfont icon-quanjingtu ${scope['disabled']}`} ></i>
      <span>3D全景</span>
    </div>
  </div>)
}

export default ComponentList