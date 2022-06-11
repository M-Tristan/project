import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ModuleUtil from '../../../lib/ModuleUtil';
import { getImageList } from '../../../api/api'
import './imageList.scss'
function ImageList() {
  const dispatch = useDispatch()
  const addImage = async (url: string) => {
    let imageInfo = await ModuleUtil.getAddImageInfo(url);
    dispatch({ type: 'addImage', image: imageInfo })
  }
  const [imagelist, setImageList] = useState([])
  useEffect(() => {
    searchImageList()
    return () => { }
  }, [])
  const searchImageList = async () => {
    let res = await getImageList({})
    let imageList = res.map((item: any) => { return item.image_url })
    setImageList(imageList)
  }

  let imageDom = imagelist.map((item, index) => {
    return <div className='image-item' key={index}>
      <img src={item} alt='加载失败' onClick={() => { addImage(item) }}></img>
    </div>

  })
  return (<>
    {imageDom}
  </>

  )
}
export default ImageList