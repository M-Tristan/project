import { useState } from 'react'
import { Radio, Slider } from 'antd';
import './LogoStyle.css'
interface type {
  logo: any,
  changeLogo: Function
}
/* eslint-disable react-hooks/exhaustive-deps */
function LogoStyle(props: type) {
  const [logo, setLogo] = useState(props.logo)

  let logoImageList = ['https://lp-canvas-1304910572.file.myqcloud.com//455a912a-3144-4f22-b1a7-c68b73e2f5c4.jpeg',
    'https://lp-canvas-1304910572.file.myqcloud.com//fdce79e7-a159-49a0-80d2-9920f6abb1e5.jpeg',
    'https://lp-canvas-1304910572.file.myqcloud.com//ff87b768-eb72-4bf8-ada2-eb737be0ea8a.jpeg',
    'https://lp-canvas-1304910572.file.myqcloud.com//9afb3e28-1e16-434a-b365-0d6e9c32db76.jpeg']
  const selectLogoImage = (src: string) => {
    if (logo.src === src) {
      logo.src = undefined
      logo.render = false
    } else {
      logo.src = src
      logo.render = true
    }

    setLogo({ ...logo })
    props.changeLogo({ ...logo })
  }
  const changeBorder = (value: string) => {
    logo.border = value
    setLogo({ ...logo })
    props.changeLogo({ ...logo })
  }
  const changePosition = (value: string) => {
    logo.position = value
    setLogo({ ...logo })
    props.changeLogo({ ...logo })
  }

  const changeLogo = (value: number) => {
    logo.width = value
    setLogo({ ...logo })
    props.changeLogo({ ...logo })
  }
  let logoDom = logoImageList.map((item, index) => {
    return <img alt='' key={index} onClick={() => { selectLogoImage(item) }} className={`logoImage ${item === logo.src ? 'logoActive' : ''}`} src={item} />
  })
  return (
    <div className='LogoStyle'>
      <div className='info-item'>
        <div className='name'> Logo图片:</div>
        <div className='controll-item'>
          {logoDom}
        </div>
      </div>
      <div className='info-item'>
        <div className='name'> Logo效果:</div>
        <div className='controll-item'>
          <Radio.Group onChange={(value) => {
            changeBorder(String(value.target.value))
          }} value={logo.border}>
            <Radio value={'none'}>原图</Radio>
            <Radio value={'rect'}>矩形描边</Radio>
            <Radio value={'circle'}>圆形描边</Radio>
          </Radio.Group>
        </div>
      </div>

      <div className='info-item'>
        <div className='name'> Logo位置:</div>
        <div className='controll-item'>
          <Radio.Group onChange={(value) => {
            changePosition(String(value.target.value))
          }} value={logo.position}>
            <Radio value={'center'}>居中</Radio>
            <Radio value={'right-down'}>右下角</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className='info-item'>
        <div className='name'> Logo大小:</div>
        <div className='controll-item'>
          <Slider onChange={(value) => {
            changeLogo(value)
          }} min={1} max={100} defaultValue={logo.width} />
        </div>
      </div>
    </div>
  )
}

export default LogoStyle