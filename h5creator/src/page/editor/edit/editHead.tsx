import './editHead.scss'
import { EditUtil } from '../../../redux/edit'
import eventEmitter from '../../../lib/EventEmitter'
import { useDispatch } from 'react-redux'
function EditHead() {
  const dispatch = useDispatch()
  return (
    <div className='edit-head'>
      <div className='logo'>
        LOGO
      </div>
      <div>
        <div className='process-button' onClick={() => { EditUtil.saveJson() }}>
          <i className='icon iconfont icon-cloud-upload-line icon-button'></i>
          保存进度
        </div>
        <div className='process-button' onClick={() => { dispatch({ type: 'delete' }) }}>
          <i className='icon iconfont icon-delete-line icon-button'></i>

        </div>
        {/* <div className='animate-button'>
          <i className='icon iconfont icon-donghua icon-button'></i>
          动画
        </div> */}
        <div className='preview-button' onClick={() => { eventEmitter.emit('showPreview') }}>
          <i className=' icon iconfont icon-qidong icon-button'></i>
          预览
        </div>
      </div>



    </div >



  )
}
export default EditHead