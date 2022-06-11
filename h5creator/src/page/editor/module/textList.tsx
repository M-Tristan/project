import './textList.scss'
import { connect, useDispatch } from 'react-redux'
import ModuleUtil from '../../../lib/ModuleUtil'
function TextList(){
    
    const dispatch = useDispatch()
    const addText = async () => {
      let textInfo = await ModuleUtil.getAddTextInfo('双击修改文字')
      dispatch({type:'addText',text:textInfo})
     }
    return (
        <div className='textList'>
            <div className='text-item' onClick = {addText}>
                添加文字
            </div>
        </div>
    )
}

export default connect()(TextList)