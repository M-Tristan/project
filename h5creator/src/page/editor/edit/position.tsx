import { Col, InputNumber, Row, Slider } from "antd"
import edit from "../../../redux/edit"
import scopescss from './position.module.scss'
interface type {
  modulechange: Function
}
function Position(props: type) {
  let modulechange = props.modulechange
  let editModule = edit.editModule
  return (<>
    <div className={scopescss['oper-item']}>
      <div className={scopescss['oper-name']}>旋转角度
      </div>
      <div className={scopescss['oper-input']}>
        <Row>
          <Col span={14}>
            <Slider
              min={0}
              max={360}

              onChange={(value: any) => {
                modulechange('rotate', value)
              }}
              value={editModule.rotate}
            />
          </Col>
          <Col span={10}>
            <InputNumber
              min={0}
              max={360}
              onChange={(value: any) => {
                modulechange('rotate', value)
              }}
              value={editModule.rotate}
            />
          </Col>
        </Row>
      </div>
    </div>

    <div className={scopescss['oper-item']}>
      <div className={scopescss['oper-name']}>上边距
      </div>
      <div className={scopescss['oper-input']}>
        <Row>
          <Col span={14}>
            <Slider
              min={-2000}
              max={2000}
              onChange={(value: any) => {
                modulechange('top', value)
              }}
              value={editModule.top}
            />
          </Col>
          <Col span={10}>
            <InputNumber
              min={-2000}
              max={2000}
              onChange={(value: any) => {
                modulechange('top', value)
              }}
              value={editModule.top}
            />
          </Col>
        </Row>
      </div>
    </div>

    <div className={scopescss['oper-item']}>
      <div className={scopescss['oper-name']}>左边距
      </div>
      <div className={scopescss['oper-input']}>
        <Row>
          <Col span={14}>
            <Slider
              min={-2000}
              max={2000}

              onChange={(value: any) => {
                modulechange('left', value)
              }}
              value={editModule.left}
            />
          </Col>
          <Col span={10}>
            <InputNumber
              min={-2000}
              max={2000}
              onChange={(value: any) => {
                modulechange('left', value)
              }}
              value={editModule.left}
            />
          </Col>
        </Row>
      </div>
    </div>

    <div className={scopescss['oper-item']}>
      <div className={scopescss['oper-name']}>宽
      </div>
      <div className={scopescss['oper-input']}>
        <Row>
          <Col span={14}>
            <Slider
              min={editModule.fontSize}
              max={2000}

              onChange={(value: any) => {
                modulechange('width', value)
              }}
              value={editModule.width}
            />
          </Col>
          <Col span={10}>
            <InputNumber
              min={editModule.fontSize}
              max={2000}
              onChange={(value: any) => {
                modulechange('width', value)
              }}
              value={editModule.width}
            />
          </Col>
        </Row>
      </div>
    </div>

    <div className={scopescss['oper-item']}>
      <div className={scopescss['oper-name']}>高
      </div>
      <div className={scopescss['oper-input']}>
        <Row>
          <Col span={14}>
            <Slider
              min={0}
              max={2000}
              disabled={editModule.type === 'text' || editModule.type === 'options'}
              value={editModule.height}
              onChange={(value: any) => {
                modulechange('height', value)
              }}
            />
          </Col>
          <Col span={10}>
            <InputNumber
              min={0}
              max={2000}
              disabled={editModule.type === 'text' || editModule.type === 'options'}
              value={editModule.height}
              onChange={(value: any) => {
                modulechange('height', value)
              }}
            />
          </Col>

        </Row>
      </div>
    </div>
  </>)
}

export default Position