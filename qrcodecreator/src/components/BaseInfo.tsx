import './BaseInfo.css'
import { Input, Radio } from 'antd';
import { useState } from 'react';
const { TextArea } = Input;
interface type {
  text: string,
  option: any,
  changeText: Function,
  changeOption: Function
}
function BaseInfo(props: type) {
  const [text, setText] = useState(props.text)
  const [option, setOtion] = useState({ ...props.option })
  const inputEvent = (value: string) => {

    setText(value)
    props.changeText(value)
  }
  const changeLevel = (value: string) => {
    option.errorCorrectionLevel = value
    setOtion({ ...option })
    props.changeOption({ ...option })
  }
  return (
    <div className='BaseInfo'>
      <div className='info-item'>
        <div className='name'> 文本内容:</div>
        <div className='controll-item'>
          <TextArea
            value={text}
            onChange={(e) => { inputEvent(e.target.value) }}
            placeholder="输入文本"
            autoSize={{ minRows: 3, maxRows: 5 }}
            maxLength={100}
          />
        </div>
      </div>
      <div className='info-item'>
        <div className='name'> 容错率:</div>
        <div className='controll-item'>
          <Radio.Group onChange={(e) => { changeLevel(e.target.value) }} value={option.errorCorrectionLevel}>
            <Radio value={'L'}>最低(可遮7%)</Radio>
            <Radio value={'M'}>低(可遮15%)</Radio>
            <Radio value={'Q'}>中等(可遮25%)</Radio>
            <Radio value={'H'}>高(可遮30%)</Radio>
          </Radio.Group>
        </div>
      </div>
    </div>
  )
}

export default BaseInfo