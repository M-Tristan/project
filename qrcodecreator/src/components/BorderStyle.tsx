import './BorderStyle.css'
import { Slider } from 'antd';
import { useState } from 'react';
interface type {
  changeBack: Function,
  back: any,
}
function BorderStyle(props: type) {
  let imageList = ['https://lp-canvas-1304910572.file.myqcloud.com/d9c8068b-5fd3-48e3-a1c8-48bf7f659e0b.png',
    'https://lp-canvas-1304910572.file.myqcloud.com/fbe13b5f-8d44-4b7c-b622-0d288e047338.png',
    'https://lp-canvas-1304910572.file.myqcloud.com/4ec86394-5d91-48b2-867e-a5b6889e55f4.png',
    'https://lp-canvas-1304910572.file.myqcloud.com/8b1a6502-2ee5-4aa3-a1fa-cda510c8ad02.png',
    'https://lp-canvas-1304910572.file.myqcloud.com/38170a2a-dd7c-48ee-b7d5-4349cec9253b.png',
    'https://lp-canvas-1304910572.file.myqcloud.com/f05d316b-2822-45d0-a4d9-a1574540fdb5.png',
    'https://lp-canvas-1304910572.file.myqcloud.com/7f106898-a57c-43de-a034-ee859cdd6071.png',
    'https://lp-canvas-1304910572.file.myqcloud.com/940cd2af-ba0c-426a-914d-d023d07ffd2c.png',
    'https://lp-canvas-1304910572.file.myqcloud.com/3b74287f-1be4-4caa-90d0-135d81114d44.png',
    'https://lp-canvas-1304910572.file.myqcloud.com/fc356b7d-4abc-4d80-84a8-381b2e223461.png']
  const [back, setBack] = useState(props.back as any)
  const selectBack = (src: string) => {
    if (back.src === src) {
      back.src = undefined
      back.render = false
    } else {
      back.src = src
      back.render = true
    }

    setBack({ ...back })
    props.changeBack({ ...back })
  }
  const changeSize = (value: number) => {
    back.size = value
    back.render = true
    setBack({ ...back })
    props.changeBack({ ...back })
  }

  let imageDom = imageList.map((item, index) => {
    return <img alt="" className={`border-image ${back.src === item ? 'back-active' : ''}`} onClick={() => {
      selectBack(item)
    }} src={item} key={index}></img>
  })
  return (
    <div className='BorderStyle'>
      <div className='info-item'>
        <div className='name'> 外框样式:</div>
        <div className='controll-item'>
          {imageDom}
        </div>
      </div>
      <div className='info-item'>
        <div className='name'> 外框大小:</div>
        <div className='controll-item'>
          <Slider min={1} onChange={(value) => {
            changeSize(value)
          }} max={100} defaultValue={back.size} />
        </div>
      </div>
    </div>
  )
}

export default BorderStyle