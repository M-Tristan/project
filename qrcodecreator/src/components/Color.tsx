import './Color.css'
import { Radio, Checkbox } from 'antd';
import { useState } from 'react';
import _ from 'lodash'
interface type {
  option: any,
  changeOption: Function
}
function Color(props: type) {
  let [option, setOption] = useState(props.option)
  let [darkColor, setDarkColor] = useState(props.option.color.dark)
  let [lightColor, setLightColor] = useState(props.option.color.light)
  let [colorStep1, setColorStep1] = useState(props.option.gradualColor.colorStep1)
  let [colorStep2, setColorStep2] = useState(props.option.gradualColor.colorStep2)
  let [direction, setDirection] = useState(props.option.direction)

  let [type, setType] = useState(props.option.type)
  const debounceChangeOption = _.debounce((option) => { props.changeOption(option) }, 200)
  const changeProperty = (Property: string, value: any) => {
    // option[Property] = value
    props.option[Property] = value
    setOption({ ...props.option })
    debounceChangeOption({ ...props.option })
  }
  const changeType = (value: string) => {
    if (value === 'texture' && props.option.backImage === "") {
      props.option.backImage = imageList[0]
    }
    setType(value)
    props.option.type = value
    debounceChangeOption({ ...props.option })
  }
  const changeDarkColor = (color: string) => {
    setDarkColor(color)
    props.option.color.dark = color
    debounceChangeOption({ ...props.option })
  }
  const changeLightColor = (color: string) => {
    setLightColor(color)
    props.option.color.light = color
    debounceChangeOption({ ...props.option })
  }
  const changeDirection = (direction: string) => {
    setDirection(direction)
    props.option.direction = direction
    debounceChangeOption({ ...props.option })
  }
  const changeBackImage = (item: string) => {
    props.option.backImage = item
    debounceChangeOption({ ...props.option })
  }

  const changeGradual = (propty: string, value: string) => {
    if (propty === 'colorStep1') {
      setColorStep1(value)
      props.option.gradualColor.colorStep1 = value
    } else {
      setColorStep2(value)
      props.option.gradualColor.colorStep2 = value
    }
    debounceChangeOption({ ...props.option })
  }
  let imageList = ['https://lp-canvas-1304910572.file.myqcloud.com/4fd1cb57-9925-45c2-b6c2-aafdc6d40d12.jpg', 'https://lp-canvas-1304910572.file.myqcloud.com/3a388009-a22d-41cf-8cb6-5d9e1cf7871f.jpg', 'https://lp-canvas-1304910572.file.myqcloud.com/eff943ef-9d51-4b0c-b109-f8f312fd841b.jpg', 'https://lp-canvas-1304910572.file.myqcloud.com/331fcaad-3b97-44c2-b0c0-5af943311d2d.jpg', 'https://lp-canvas-1304910572.file.myqcloud.com/7566b5ef-7f01-4d83-ae48-a95ef66d80bc.jpg', 'https://lp-canvas-1304910572.file.myqcloud.com/128f8283-3853-4028-9fba-8773a718ec85.jpg', 'https://lp-canvas-1304910572.file.myqcloud.com/8d276142-8dc0-465b-846d-aa87e313f0e4.jpg', 'https://lp-canvas-1304910572.file.myqcloud.com/dff807b2-f2a8-467f-9f8f-17c55f8d2c30.jpg', 'https://lp-canvas-1304910572.file.myqcloud.com/0ef87533-2bfd-4e68-9f6e-844396ef43a4.jpg', 'https://lp-canvas-1304910572.file.myqcloud.com/37b98a24-1583-4860-b199-2e00f3b5fe01.jpeg', 'https://lp-canvas-1304910572.file.myqcloud.com/a29322bf-6aa2-4f7c-865d-5acee717af7a.jpeg', 'https://lp-canvas-1304910572.file.myqcloud.com/395225e1-d133-453e-bade-7e6261315e25.jpeg', 'https://lp-canvas-1304910572.file.myqcloud.com/ee3d408f-bcc0-490b-a7c0-816918736ca1.jpeg', 'https://lp-canvas-1304910572.file.myqcloud.com/6cbb7435-da5f-4602-98c7-44e86329c3c0.jpeg']

  let colorDom: JSX.Element[] | JSX.Element = <></>
  if (type === 'color') {
    colorDom = <div>

      <input className='color-picker' type='color' value={darkColor} onChange={(e) => {
        changeDarkColor(e.target.value)
      }}></input>
    </div>
  } else if (type === 'gradual') {
    colorDom = (
      <>
        <div className='gradual-item'>??????1???<input className='color-picker' type='color' value={colorStep1} onChange={(e) => {
          changeGradual('colorStep1', e.target.value)
        }}></input></div>
        <div className='gradual-item'>??????2???<input className='color-picker' type='color' value={colorStep2} onChange={(e) => {
          changeGradual('colorStep2', e.target.value)
        }}></input></div>
        <div>
          ????????????: <Radio.Group value={direction} onChange={(v) => {
            changeDirection(v.target.value)
          }}>
            <Radio value={'vertical'}>??????</Radio>
            <Radio value={'horizontal'}>??????</Radio>
            <Radio value={'opposite'}>??????</Radio>
            <Radio value={'center'}>??????</Radio>
          </Radio.Group>
        </div>
      </>
    )
  } else if (type === 'texture') {

    colorDom = imageList.map((item, index) => {
      return <img className={`texture-back ${props.option.backImage === item ? 'backImageActive' : ''}`} alt="" onClick={() => {
        changeBackImage(item)
      }} src={item} key={index}></img>
    })
  }

  return <div className='ColorStyle'>
    <div className='info-item'>
      <div className='name'> ???????????????:</div>
      <div className='controll-item'>
        <Radio.Group value={type} onChange={(value) => { changeType(value.target.value) }}>
          <Radio value={'color'}>??????</Radio>
          <Radio value={'gradual'}>?????????</Radio>
          <Radio value={'texture'}>???????????????</Radio>
        </Radio.Group>
        <div className='colorDom'>
          {colorDom}
        </div>
        <div>
          <Checkbox checked={option.fillColor} onChange={(e) => {
            changeProperty('fillColor', e.target.checked)
          }} >???????????????</Checkbox>
        </div>
      </div>
    </div>
    <div className='info-item'>
      <div className='name'> ?????????:</div>
      <div className='controll-item'>
        <input className='color-picker' type='color' value={lightColor} onChange={(e) => {
          changeLightColor(e.target.value)
        }}></input>
      </div>
    </div>
    <div className='info-item'>
      <div className='name'> ?????????:</div>
      <div className='controll-item'>
        <input className='color-picker' type='color' value={option.outEyeColor} onChange={(e) => {
          changeProperty('outEyeColor', e.target.value)
        }}></input>
      </div>
    </div>
    <div className='info-item'>
      <div className='name'> ?????????:</div>
      <div className='controll-item'>
        <input className='color-picker' type='color' value={option.innerEyeColor} onChange={(e) => {
          changeProperty('innerEyeColor', e.target.value)
        }}></input>
      </div>
    </div>
  </div>
}
export default Color