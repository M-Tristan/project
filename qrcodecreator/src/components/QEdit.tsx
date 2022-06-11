import { useState } from 'react'
import BaseInfo from './BaseInfo'
import BorderStyle from './BorderStyle'
import Color from './Color'
import LogoStyle from './LogoStyle'
import Ordinary from './Ordinary'
import Personalize from './Personalize'
import './QEdit.css'
interface type {
  text: string,
  option: any,
  logo: any,
  back: any,
  changeText: Function,
  changeOption: Function,
  changeCustom: Function,
  changeLogo: Function,
  changeBack: Function,
  custom: any
}
function QEdit(props: type) {
  const [selectIndex, setSelectIndex] = useState(1)
  let editContent: JSX.Element = <></>
  if (selectIndex === 1) {
    editContent = <BaseInfo changeOption={(option: any) => { props.changeOption(option) }} changeText={(text: string) => { props.changeText(text) }} text={props.text} option={props.option}></BaseInfo>
  } else if (selectIndex === 2) {
    editContent = <Ordinary changeOption={(option: any) => { props.changeOption(option) }} option={props.option}></Ordinary>
  } else if (selectIndex === 3) {
    editContent = <LogoStyle logo={props.logo} changeLogo={(option: any) => { props.changeLogo(option) }}></LogoStyle>
  } else if (selectIndex === 4) {
    editContent = <BorderStyle changeBack={(option: any) => { props.changeBack(option) }} back={props.back}></BorderStyle>
  } else if (selectIndex === 5) {
    editContent = <Personalize custom={props.custom} changeCustom={(param: any) => {
      props.changeCustom(param)
    }}></Personalize>
  } else if (selectIndex === 6) {
    editContent = <Color changeOption={(option: any) => { props.changeOption(option) }} option={props.option}></Color>
  }
  return (
    <div className='QEdit border-l-2 border-gray-200'>
      <div className='taps flex '>
        <div onClick={() => { setSelectIndex(1) }} className={`tap-item ${selectIndex === 1 ? 'active' : ''}`}>基础</div>
        <div onClick={() => { setSelectIndex(2) }} className={`tap-item ${selectIndex === 2 ? 'active' : ''}`}>通用</div>
        <div onClick={() => { setSelectIndex(6) }} className={`tap-item ${selectIndex === 6 ? 'active' : ''}`}>颜色</div>
        <div onClick={() => { setSelectIndex(3) }} className={`tap-item ${selectIndex === 3 ? 'active' : ''}`}>logo</div>
        <div onClick={() => { setSelectIndex(4) }} className={`tap-item ${selectIndex === 4 ? 'active' : ''}`}>边框</div>
        <div onClick={() => { setSelectIndex(5) }} className={`tap-item ${selectIndex === 5 ? 'active' : ''}`}>个性化</div>
      </div>
      <div>
        {editContent}
      </div>
    </div>
  )
}

export default QEdit