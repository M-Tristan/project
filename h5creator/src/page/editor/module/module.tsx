import { useState } from 'react';
import './module.scss'
import TextList from './textList'
import ImageList from './imageList'
import classnames from 'classnames'
import QrcodeList from './qrCodeList'
import BackgroundList from './backgroundList'
import MaterialList from './materialList'
import PostList from './PostList'
import ComponentList from './componentList';
function Module() {
  const [moduleId, setModuleId] = useState(1);
  let moduleList = <></>
  switch (moduleId) {
    case 1:
      moduleList = <TextList></TextList>
      break;
    case 2:
      moduleList = <ImageList></ImageList>
      break;
    case 3:
      moduleList = <QrcodeList></QrcodeList>
      break;
    case 4:
      moduleList = <MaterialList></MaterialList>
      break;
    case 5:
      moduleList = <ComponentList></ComponentList>
      break;
    case 6:
      moduleList = <BackgroundList></BackgroundList>
      break;
    case 7:
      moduleList = <PostList></PostList>
      break;
  }

  return (
    <div className='module'>
      <div onClick={() => { setModuleId(1) }} className={
        classnames({
          'module-item': true,
          'active': moduleId === 1
        })
      }>
        <i className='iconfont icon-wenben modelu-icon'></i>
        <span className='module-name'>文字</span>
      </div>
      <div onClick={() => { setModuleId(2) }} className={
        classnames({
          'module-item': true,
          'active': moduleId === 2
        })
      }>
        <i className='iconfont icon-tupian modelu-icon'></i>
        <span className='module-name'>图片</span>
      </div>
      <div onClick={() => { setModuleId(3) }} className={
        classnames({
          'module-item': true,
          'active': moduleId === 3
        })
      } >
        <i className='iconfont icon-erweima modelu-icon'></i>
        <span className='module-name '>二维码</span>
      </div>
      <div onClick={() => { setModuleId(4) }} className={
        classnames({
          'module-item': true,
          'active': moduleId === 4
        })
      }>
        <i className='iconfont icon-application-group-fill modelu-icon'></i>
        <span className='module-name'>素材</span>
      </div>

      <div onClick={() => { setModuleId(5) }} className={
        classnames({
          'module-item': true,
          'active': moduleId === 5
        })
      } >
        <i className='icon iconfont icon-application-line modelu-icon'></i>
        <span className='module-name'>组件</span>
      </div>
      <div onClick={() => { setModuleId(6) }} className={
        classnames({
          'module-item': true,
          'active': moduleId === 6
        })
      } >
        <i className='iconfont icon-background modelu-icon'></i>
        <span className='module-name'>背景</span>
      </div>
      <div onClick={() => { setModuleId(7) }} className={
        classnames({
          'module-item': true,
          'active': moduleId === 7
        })
      } >
        <i className='iconfont icon-caidan modelu-icon'></i>
        <span className='module-name'>导航器</span>
      </div>
      <div className='module-material'>
        {moduleList}
      </div>
    </div>
  )
}

export default Module