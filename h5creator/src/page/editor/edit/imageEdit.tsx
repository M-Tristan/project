import scopescss from './imageEdit.module.scss'
import { Collapse, Slider, InputNumber, Row, Col, Popover, Tabs, Button } from 'antd';
import { SketchPicker } from 'react-color'
import edit from '../../../redux/edit';
import { useCallback, useEffect, useState } from 'react';
import eventEmitter from '../../../lib/EventEmitter';
import ModuleAnimate from './moduleAnimate';
import _ from 'lodash';
import Position from './position';
import { useDispatch } from 'react-redux';
const { Panel } = Collapse;
const { TabPane } = Tabs;
/* eslint-disable react-hooks/exhaustive-deps */
function ImageEdit() {
  const dispatch = useDispatch()
  useEffect(() => {

    const changeModule = _.debounce((id: string) => {
      if (id === edit.editModule.id) {
        setModule({ ...edit.editModule })
      }
    }, 10)

    eventEmitter.on('updateEditInfo', changeModule)
    return () => {
      eventEmitter.off('updateEditInfo', changeModule)
    }
  }, [])
  let [editModule, setModule] = useState(edit.editModule)
  const modulechange = useCallback((key: string, value: any) => {
    let editModule = edit.editModule
    editModule[key] = value
    setModule({ ...editModule })
    eventEmitter.emit('changeModule', editModule.id)
  }, [])
  const filterchange = (key: string, value: any) => {
    editModule.filter[key] = value
    setModule({ ...editModule })
    eventEmitter.emit('changeModule', editModule.id)
  }

  const borderRadiusMax = function () {
    if (editModule.width > editModule.height) {
      return editModule.height / 2;
    } else {
      return editModule.width / 2;
    }
  }();
  return (
    <Tabs defaultActiveKey="1" size='large' type='card' >
      <TabPane tab="图片 " key="1">

        <div className={scopescss['image-area']}>
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="图片" key="1">

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>模糊
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={50}
                        onChange={(value: any) => {
                          modulechange('blur', value)
                        }}
                        value={editModule.blur}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={50}
                        onChange={(value: any) => {
                          modulechange('blur', value)
                        }}
                        value={editModule.blur}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>透明度
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(value: any) => {
                          modulechange('opacity', value)
                        }}
                        value={editModule.opacity}

                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(value: any) => {
                          modulechange('opacity', value)
                        }}
                        value={editModule.opacity}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>圆角
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={borderRadiusMax}
                        onChange={(value: any) => {
                          modulechange('borderRadius', value)
                        }}
                        value={editModule.borderRadius}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={borderRadiusMax}
                        onChange={(value: any) => {
                          modulechange('borderRadius', value)
                        }}
                        value={editModule.borderRadius}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

            </Panel>

            <Panel header="调整" key="2">

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>亮度
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider

                        min={0}
                        max={200}
                        onChange={(value: any) => {
                          filterchange('brightness', value)
                        }}
                        value={editModule.filter.brightness}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={200}
                        onChange={(value: any) => {
                          filterchange('brightness', value)
                        }}
                        value={editModule.filter.brightness}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>对比度
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={200}
                        onChange={(value: any) => {
                          filterchange('contrast', value)
                        }}
                        value={editModule.filter.contrast}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={200}
                        onChange={(value: any) => {
                          filterchange('contrast', value)
                        }}
                        value={editModule.filter.contrast}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>灰度
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={100}
                        onChange={(value: any) => {
                          filterchange('grayscale', value)
                        }}
                        value={editModule.filter.grayscale}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={100}
                        onChange={(value: any) => {
                          filterchange('grayscale', value)
                        }}
                        value={editModule.filter.grayscale}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>色相
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={360}
                        onChange={(value: any) => {
                          filterchange('hueRotate', value)
                        }}
                        value={editModule.filter.hueRotate}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={360}
                        onChange={(value: any) => {
                          filterchange('hueRotate', value)
                        }}
                        value={editModule.filter.hueRotate}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>反转
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={100}
                        onChange={(value: any) => {
                          filterchange('invert', value)
                        }}
                        value={editModule.filter.invert}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={100}
                        onChange={(value: any) => {
                          filterchange('invert', value)
                        }}
                        value={editModule.filter.invert}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>饱和度
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={200}
                        onChange={(value: any) => {
                          filterchange('saturate', value)
                        }}
                        value={editModule.filter.saturate}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={200}
                        onChange={(value: any) => {
                          filterchange('saturate', value)
                        }}
                        value={editModule.filter.saturate}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

            </Panel>

            <Panel header="阴影" key="3">

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>颜色
                </div>
                <div className={scopescss['oper-input']}>
                  <Popover placement="rightTop" content={<SketchPicker color={editModule.dropshadowColor} onChange={(value) => { modulechange("dropshadowColor", `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`) }}></SketchPicker>} trigger="click">
                    <div className={scopescss['shadow-color']} style={{ backgroundColor: editModule.dropshadowColor }}>

                    </div>
                  </Popover>


                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>横向距离
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={1}
                        max={1000}
                        onChange={(value: any) => {
                          modulechange('dropshadowX', value)
                        }}
                        value={editModule.dropshadowX}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={1}
                        max={1000}
                        onChange={(value: any) => {
                          modulechange('dropshadowX', value)
                        }}
                        value={editModule.dropshadowX}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>纵向距离
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={1000}
                        onChange={(value: any) => {
                          modulechange('dropshadowY', value)
                        }}
                        value={editModule.dropshadowY}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={1000}
                        onChange={(value: any) => {
                          modulechange('dropshadowY', value)
                        }}
                        value={editModule.dropshadowY}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>模糊
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={1000}
                        onChange={(value: any) => {
                          modulechange('dropshadowBlur', value)
                        }}
                        value={editModule.dropshadowBlur}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={1000}
                        onChange={(value: any) => {
                          modulechange('dropshadowBlur', value)
                        }}
                        value={editModule.dropshadowBlur}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

            </Panel>
            <Panel header="操作" key="4">
              <div className='text-center'><Button type="primary" onClick={() => { dispatch({ type: "setClipOper", value: true }) }}>裁剪</Button></div>
            </Panel>
            <Panel header="位置" key="5">
              <Position modulechange={modulechange}></Position>
            </Panel>
          </Collapse>
        </div>

      </TabPane>
      <TabPane tab="动画" key="2">
        <ModuleAnimate></ModuleAnimate>
      </TabPane>
      <TabPane tab="交互" key="3">
        待开发。。。
      </TabPane>
    </Tabs>

  )
}

export default ImageEdit