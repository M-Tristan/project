import scopescss from './backEdit.module.scss'
import { Divider, Row, Col, InputNumber, Button } from 'antd';
// import { useDispatch } from 'react-redux';
import edit from '../../../redux/edit';
function BackEdit() {

  let canvas = edit.postInfo.canvas
  let editModule = edit.editModule
  let imageDom = <></>
  if (editModule.image) {
    imageDom = <img
      className={scopescss["image"]}
      src={editModule.image.src}
      alt='加载失败'
    />
  }
  return (

    <div className={scopescss['back-area']} >
      <Divider>画布</Divider>
      <Row>
        <Col span={2}></Col>
        <Col span={7}>
          <InputNumber value={canvas.width} disabled></InputNumber>
        </Col>
        <Col span={4}>宽</Col>
        <Col span={7}>
          <InputNumber value={canvas.height} disabled></InputNumber>

        </Col>
        <Col span={2}>高</Col>
        <Col span={2}></Col>
      </Row>

      <Divider>背景</Divider>
      <div className={scopescss["back-Info"]}>
        <div className={scopescss["back-image-area"]}>
          <div className={scopescss["image-info"]} style={{ backgroundColor: editModule.color }}>
            {imageDom}
          </div>
        </div>
      </div>

      <div className={scopescss["button-area"]}>
        <Button type="primary" size='large'>
          设置背景
        </Button>
        <Button type="primary" size='large'>
          背景裁剪
        </Button>
      </div >
    </div >
  )
}
export default BackEdit