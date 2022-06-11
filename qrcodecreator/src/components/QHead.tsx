import './QHead.css'
import { Popover } from 'antd';
import canvasCoach from '../lib/canvasCoach';

interface type {
  option: any,
  logo: any,
  back: any
}
function QHead(props: type) {
  const buttonSelect = <>
    <div className='button-item' onClick={() => { download('png') }}>PNG</div>
    <div className='button-item' onClick={() => { download('jpeg') }}>JPEG</div>
  </>
  const download = (type: string) => {
    canvasCoach.downLoad(props.back, props.logo, type)
  }
  const toPosterCreator = () => {
    window.open('http://42.193.160.135/postcreator');
  }
  return (
    <div className='q-head'>
      <div className='logo'>QCODE</div>

      <div className='downLoad-area'><Popover content={buttonSelect}><i className='icon iconfont icon-xiazai downLoad-button'></i></Popover></div>

      <div className='postercreator' onClick={() => { toPosterCreator() }}>
        编辑海报
      </div>
    </div>
  )
}

export default QHead