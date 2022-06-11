import { button, chart, code, datetime, image, input, options, postInfo, shape, text, vedio } from "../../../interface/module"
import Background from './background'
import Text from './text'
import Image from './image'
import Code from './code'
import Chart from "./chart"
import Shape from "./shape"
import Button from "./button"
import Input from "./Input"
import Options from "./options"
import Vedio from "./vedio"
import DateTime from "./dateTime"
interface type {
  page: postInfo
  play: boolean
}
function Page(props: type) {
  let page = props.page
  const { canvas, layers, background } = page
  let canvasStyle: React.CSSProperties = {
    width: `${canvas.width}px`,
    height: `${canvas.height}px`,
    position: 'relative'

  }
  let layersDom = layers.map((item, index) => {

    if (item.type === 'text') {
      return <Text text={item as text} key={index} play={props.play}></Text>
    } else if (item.type === 'image') {
      return <Image module={item as image} key={index} play={props.play}></Image>
    } else if (item.type === 'code') {
      return <Code module={item as code} key={index} play={props.play}></Code>
    } else if (item.type === 'chart') {
      return <Chart module={item as chart} key={index} play={props.play}></Chart>
    } else if (item.type === 'shape') {
      return <Shape module={item as shape} key={index} play={props.play}></Shape>
    } else if (item.type === 'button') {
      return <Button module={item as button} key={index} play={props.play}></Button>
    } else if (item.type === 'input') {
      return <Input module={item as input} key={index} play={props.play}></Input>
    } else if (item.type === 'options') {
      return <Options module={item as options} key={index} play={props.play}></Options>
    } else if (item.type === 'vedio') {
      return <Vedio module={item as vedio} key={index} play={props.play}></Vedio>
    } else if (item.type === 'datetime') {
      return <DateTime module={item as datetime} key={index} play={props.play}></DateTime>
    }



    return <></>

  })
  return (
    <div style={canvasStyle}>
      <Background background={background}></Background>
      {layersDom}

    </div>
  )

}
export default Page