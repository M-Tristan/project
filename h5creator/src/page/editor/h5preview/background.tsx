import { background } from "../../../interface/module"


interface type {
  background: background
}
function Background(props: type) {
  // let editModule = edit.editModule
  let background = props.background
  let backImage = background.image ? <img
    className="backImage"
    alt='加载失败'
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
      style={{
        backgroundColor: background.color,
        width: `100%`,
        height: `100%`,
        position: `absolute`,
        left: `0`,
        top: `0`,
      }}
    >
      {
        backImage
      }
    </div>
  )
}
export default Background