/* eslint-disable jsx-a11y/alt-text */
import { background } from '../../../interface/module'
import './background.module.scss'
interface type {
  background: background
}
function Background(props: type) {
  // let editModule = edit.editModule
  let background = props.background
  let backImage = background.image ? <img
    className="backImage"
    style={{
      width: `${background.image.width}px`,
      height: `${background.image.height}px`,
      left: `-${background.image.left}px`,
      top: `-${background.image.top}px`,
    }}
    draggable="false"
    src={background.image.src}
  /> : <></>
  return (
    <div
      className="background"
      style={{
        backgroundColor: background.color,
      }}

    >
      {
        backImage
      }
    </div>
  )
}
export default Background