import scope from './OwnModel.module.scss'
import { queryTemplate } from '../../api/api'
import { useEffect, useState } from 'react'
/* eslint-disable react-hooks/exhaustive-deps */
function OwnModel() {
  let [modellist, setModellist] = useState([] as any)
  const editModel = (item: any) => {
    window.open(`#/edit?id=${item.id}`, '_blank')
  }
  let modellistDom = modellist.map((item: any, index: any) => {
    return (<div className={scope['model-item']} key={index} >
      <div className={scope['cover-img']}>
        <img src={item.coverImg} alt='加载失败' />
      </div>
      <div className={scope['title']} onMouseEnter={() => { }}>
        {item.name}
      </div>
      <div className={scope['edit']}>
        <div className={scope['edit-button']} onMouseEnter={() => { }}>
          <div className={scope['edit-item']} onClick={() => { editModel(item) }}>
            <i className='icon iconfont icon-shezhi1' ></i>
            编辑
          </div>
          <div className={scope['edit-item']}>
            <i className='icon iconfont icon-shanchu'></i>
            删除
          </div>
        </div>
      </div>
    </div>)
  })
  const init = async () => {
    let res = await queryTemplate({})
    setModellist(res.data)
  }

  useEffect(() => {
    init()

  }, [])


  return (
    <div className={scope['OwnModel']}>
      {modellistDom}

    </div>
  )

}

export default OwnModel