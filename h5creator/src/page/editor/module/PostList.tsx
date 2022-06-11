import PostItem from "../panel/postItem";
import edit, { EditUtil } from '../../../redux/edit'
import { Button } from 'antd';
import scope from './PostList.module.scss'
import { useDispatch } from "react-redux";
function PostList() {
  const dispatch = useDispatch()
  let postListCom = edit.postList.map((item, index) => {
    return <div className={scope['post-item']} key={index} onClick={() => { EditUtil.selectPageByIndex(index); dispatch({ type: 'updatEdit' }) }}>
      <i
        onClick={(event) => { event.stopPropagation(); EditUtil.deletePageByIndex(index); dispatch({ type: 'updatEdit' }) }}
        className={`icon iconfont icon-delete-line ${scope['delete-button']} `}
      ></i>
      <PostItem postInfo={item} ></PostItem>
    </div>
  })
  const addPage = () => {
    EditUtil.addPage()
    dispatch({ type: 'updatEdit' })
  }
  return (
    <>
      <div className={scope['add-button']}><Button onClick={addPage}>添加页面</Button></div>
      {postListCom}
    </>
  )

}
export default PostList