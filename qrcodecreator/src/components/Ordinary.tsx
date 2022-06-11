import { useState } from 'react'
import './Ordinary.css'
interface type {
  option: any,
  changeOption: Function
}
function Ordinary(props: type) {
  // pointType: 'normal',
  // eyeType: 'N-A',
  const [pointType, setPointType] = useState(props.option.pointType)
  const [eyeType, setEyeType] = useState(props.option.eyeType)
  const changePointType = (type: string) => {
    let option = props.option
    setPointType(type)
    option.pointType = type
    props.changeOption({ ...option })
  }
  const changeEyeType = (type: string) => {
    let option = props.option
    setEyeType(type)
    option.eyeType = type
    props.changeOption({ ...option })
  }
  return (
    <div className='Ordinary'>
      <div className='info-item'>
        <div className='name'> 码点:</div>
        <div className='controll-item'>
          <div
            onClick={() => { changePointType('normal') }}
            className={`image-item ${pointType === 'normal' ? 'Ordinary-active' : ''}`}>
            <svg

              className="svg-item"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1592"
              width="200"
              height="200"
            >
              <path d="M64 64h896v896H64z" fill="black" p-id="1593"></path>
            </svg>
          </div>
          <div
            onClick={() => { changePointType('rect') }}
            className={`image-item ${pointType === 'rect' ? 'Ordinary-active' : ''}`}>
            <svg

              className="svg-item"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1835"
              width="200"
              height="200"
            >
              <path d="M123 99h800v800H123z" p-id="1836" fill="black"></path>
            </svg>
          </div>

          <div
            onClick={() => { changePointType('circle') }}
            className={`image-item ${pointType === 'circle' ? 'Ordinary-active' : ''}`}>
            <svg
              className="svg-item"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2937"
              width="200"
              height="200"
            >
              <path
                d="M512 512m-512 0a100 100 0 1 0 1024 0 100 100 0 1 0-1024 0Z"
                p-id="2938"
                fill="black"
              ></path>
            </svg>
          </div>
          <img onClick={() => { changePointType('verticalBar') }} alt='' className={`image-item ${pointType === 'verticalBar' ? 'Ordinary-active' : ''}`} src={require("../assets/image/verticalBar.jpg").default}></img>
          <img onClick={() => { changePointType('liquid') }} alt='' className={`image-item ${pointType === 'liquid' ? 'Ordinary-active' : ''}`} src={require("../assets/image/liquid.jpg").default}></img>
          <img onClick={() => { changePointType('horizontalBar') }} alt='' className={`image-item ${pointType === 'horizontalBar' ? 'Ordinary-active' : ''}`} src={require("../assets/image/horizontalbar.jpg").default}></img>
          <img onClick={() => { changePointType('crossBar') }} alt='' className={`image-item ${pointType === 'crossBar' ? 'Ordinary-active' : ''}`} src={require("../assets/image/crossBar.jpg").default}></img>
          <img onClick={() => { changePointType('complementary') }} alt='' className={`image-item ${pointType === 'complementary' ? 'Ordinary-active' : ''}`} src={require("../assets/image/complementaryBar.jpg").default}></img>
          <img onClick={() => { changePointType('star') }} alt='' className={`image-item ${pointType === 'star' ? 'Ordinary-active' : ''}`} src={require("../assets/image/star.jpg").default}></img>
        </div>
      </div >
      <div className='info-item'>
        <div className='name'> 码眼:</div>
        <div className='controll-item'>
          <img alt='' onClick={() => { changeEyeType('N-A') }} className={`image-item ${eyeType === 'N-A' ? 'Ordinary-active' : ''}`} src={require("../assets/image/N-A.jpg").default}></img>
          <img alt='' onClick={() => { changeEyeType('N-B') }} className={`image-item ${eyeType === 'N-B' ? 'Ordinary-active' : ''}`} src={require("../assets/image/N-B.jpg").default}></img>
          <img alt='' onClick={() => { changeEyeType('N-C') }} className={`image-item ${eyeType === 'N-C' ? 'Ordinary-active' : ''}`} src={require("../assets/image/N-C.jpg").default}></img>
          <img alt='' onClick={() => { changeEyeType('N-D') }} className={`image-item ${eyeType === 'N-D' ? 'Ordinary-active' : ''}`} src={require("../assets/image/N-D.jpg").default}></img>
          <img alt='' onClick={() => { changeEyeType('N-E') }} className={`image-item ${eyeType === 'N-E' ? 'Ordinary-active' : ''}`} src={require("../assets/image/N-E.jpg").default}></img>
          <img alt='' onClick={() => { changeEyeType('N-F') }} className={`image-item ${eyeType === 'N-F' ? 'Ordinary-active' : ''}`} src={require("../assets/image/N-F.jpg").default}></img>
          <img alt='' onClick={() => { changeEyeType('N-G') }} className={`image-item ${eyeType === 'N-G' ? 'Ordinary-active' : ''}`} src={require("../assets/image/N-G.jpg").default}></img>
        </div>
      </div>
    </div >
  )
}

export default Ordinary