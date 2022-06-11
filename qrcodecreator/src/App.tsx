
import './App.css';
import QRCodeDisplay from './components/QRCodeDisplay';
import QHead from './components/QHead';
import QEdit from './components/QEdit';
import { useState } from 'react';

function App() {
  const [option, setOption] = useState({
    width: 1000,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
    gradualColor: {
      colorStep1: "#ffffff",
      colorStep2: "#000000",
    },
    outEyeColor: "#000000",
    innerEyeColor: "#000000",
    direction: 'vertical',
    backImage: "",
    type: 'color',
    pointType: 'normal',
    eyeType: 'N-A',
    errorCorrectionLevel: 'L',
    fillColor: false
  })
  const [custom, setCustom] = useState({ eyeList: [], P1List: [], P2List: [], P3List: [], P4List: [], P5List: [], P6List: [] } as any)
  const [logo, setLogo] = useState({ border: 'none', position: 'center', width: 10 } as any)
  const [back, setBack] = useState({ size: 50 } as any)
  const [text, setText] = useState('二维码内容')
  const changeText = (text: string) => {
    setText(text)
  }
  const changeOption = (option: any) => {

    setOption({ ...option })
  }
  const changeLogo = (option: any) => {
    setLogo({ ...option })
  }
  const changeBack = (back: any) => {
    setBack({ ...back })
  }
  const changeCustom = (param: any) => {
    custom.render = param.render
    custom.eyeList = param.eyeList
    custom.P1List = param.P1List
    custom.P2List = param.P2List
    custom.P3List = param.P3List
    custom.P4List = param.P4List
    custom.P5List = param.P5List
    custom.P6List = param.P6List
    setCustom({ ...custom })
  }
  return (
    <div className="App">
      <QHead back={back} logo={logo} option={option}></QHead>
      <QRCodeDisplay back={back} logo={logo} text={text} option={option} custom={custom}></QRCodeDisplay>
      <QEdit changeBack={(param: any) => { changeBack(param) }}
        custom={custom}
        back={back}
        logo={logo}
        changeLogo={(param: any) => { changeLogo(param) }}
        changeCustom={(param: any) => { changeCustom(param) }}
        changeText={(text: string) => { changeText(text) }}
        changeOption={(option: any) => { changeOption(option) }}
        text={text}
        option={option}></QEdit>
    </div>
  );
}

export default App;
