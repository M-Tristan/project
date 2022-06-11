import EditCom from './editCom'
import scope from './postItem.module.scss'
import { CSSProperties } from 'react'
import { postInfo } from '../../../interface/module'
interface type {
  postInfo: postInfo
}
function PostItem(props: type) {
  let postInfo = props.postInfo
  let scalestyle: CSSProperties = {
    transform: `scale(${240 / postInfo.canvas.width})`,
    position: 'relative',
    transformOrigin: `0px 0px`,
    top: 0,
    left: 0,
    pointerEvents: 'none'
  }

  return (
    <div className={scope['postItem']} style={{
      height: `${240 / postInfo.canvas.width * postInfo.canvas.height}px`
    }}>
      <div style={scalestyle}>
        <EditCom scale={100} postInfo={postInfo} edit={false} position={{ left: 0, top: 0 }}></EditCom>
      </div>

    </div>
  )

}
export default PostItem