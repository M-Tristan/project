import scope from './preview.module.scss'
import Page from '../h5preview/page'
import editInfo from '../../../redux/edit'
import { Button } from 'antd'
import eventEmitter from '../../../lib/EventEmitter'
import PageMoveIcon from './pagemoveIcon'
import { useEffect, useRef, useState } from 'react'
import * as QRCode from "qrcode";
interface type {
  jsonId: number
}
function Preview(props: type) {
  const postList = editInfo.postList
  const [pageIndex, setPageIndex] = useState(0)
  const pageDomList = postList.map((post, index) => {
    const { canvas } = post
    let pageStyle: React.CSSProperties = {
      position: 'absolute',
      width: `${canvas.width}px`,
      height: `${535 / 335 * canvas.width}px`,
      transform: `scale(${335 / canvas.width},${335 / canvas.width})`,
      transformOrigin: `0 0`,
      overflow: `hidden`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      top: `100%`

    }
    if (index === pageIndex) {
      pageStyle.animationName = 'moveIn'
      pageStyle.animationDuration = '1s'
      pageStyle.top = 0
    }
    return <div style={pageStyle} key={index}>
      <Page page={post} play={index === pageIndex} ></Page>
    </div>
  })
  const nextPage = () => {
    if (pageIndex + 1 >= postList.length) {
      return
    }
    setPageIndex(pageIndex + 1)
  }
  const previousPage = () => {
    if (pageIndex - 1 < 0) {
      return
    }
    setPageIndex(pageIndex - 1)
  }
  let code = useRef<HTMLDivElement>(null)
  useEffect(() => {
    QRCode.toCanvas(
      `http://42.193.160.135/h5creatormobile/#/?id=${props.jsonId}`,
      {
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      },
      (err: any, canvas: any) => {
        if (err) throw err;
        if (code.current !== null) {
          code.current.append(canvas);
          var image = new Image();
          image.src = canvas.toDataURL("image/png");
          image.style.width = "100%";
          image.style.height = "100%";
          code.current.innerHTML = "";
          code.current.append(image);
          return
        }

      }
    );
  }, [props.jsonId])

  return (
    <div className={scope["preview"]}>
      <div className={scope["phone-area"]}>
        <div className={scope["phone"]}>
          <img src={require('../../../assets/svg/phone.svg').default} alt='加载失败'></img>
          <div className={scope["previous-page"]} onClick={previousPage}>上一页</div>
          <div className={scope["next-page"]} onClick={nextPage}>下一页</div>
          <div className={scope["screen"]}>
            {pageDomList}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
            }}>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center'
              }}><PageMoveIcon onClick={nextPage}></PageMoveIcon></div>
            </div>
          </div>

        </div>
      </div>
      <div className={scope['edit-area']}>
        <div className={scope['code-area']}>
          <h2>扫描二维码预览</h2>
          <div ref={code} className={scope['editCode']}></div>
        </div>
        <div className={scope['button-area']}>
          <Button type="primary">发布</Button>
          <Button onClick={() => { eventEmitter.emit('hidePreview') }}>返回</Button>
        </div>
      </div>
    </div>
  )
}

export default Preview