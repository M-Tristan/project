import { useDispatch } from 'react-redux';
import ModuleUtil from '../../../lib/ModuleUtil';
import { SketchPicker } from 'react-color'
import './backgroundList.scss'
import editInfo from '../../../redux/edit';
import { Popover } from 'antd';
import { useEffect, useState } from 'react';
import { getImageList } from '../../../api/api';
function BackgroundList() {
  const dispatch = useDispatch()
  const colorList = ['red', 'green', 'blue', 'black', 'white', 'gray', 'yellow', 'gold', 'greenyellow', 'brown', 'aqua']
  const [imageList, setImageList] = useState([])
  useEffect(() => {
    searchImageList()
    return () => { }
  }, [])
  const searchImageList = async () => {
    let res = await getImageList({ type: 'back' })
    let imageList = res.map((item: any) => { return item.image_url })
    setImageList(imageList)
  }
  const selectColor = (color: string) => {
    dispatch({ type: 'selectBackColor', color: color })
  };
  const selectBack = async (url: string) => {
    let imageInfo = await ModuleUtil.getBackImageInfo(url);
    dispatch({ type: "addBackImage", image: imageInfo });
  };
  const handleColorChange = (value: any) => {
    let rgba = `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`
    selectColor(rgba)

  }
  let backgroundColor = editInfo.postInfo.background.color
  let imageDom = imageList.map((item, index) => {
    return <div className='image-item' key={index} onClick={() => { selectBack(item) }}>
      <img src={item} alt='加载失败' />
    </div>
  })
  let colorDom = colorList.map((item, index) => {
    return <div className='color-item' onClick={() => { selectColor(item) }} key={index} style={{ 'backgroundColor': item }} ></div>
  })
  let selectedColorDom = <div className='color-item'  >
    <div className='selected-item' style={{ 'backgroundColor': backgroundColor }}>

    </div>
  </div>
  return (
    <>
      <div className='color-List'>
        {colorDom}
        <Popover placement="rightTop" content={<SketchPicker color={backgroundColor} onChange={handleColorChange}></SketchPicker>} trigger="click">
          {selectedColorDom}
        </Popover>


      </div>
      {imageDom}
    </>
  )
}

export default BackgroundList