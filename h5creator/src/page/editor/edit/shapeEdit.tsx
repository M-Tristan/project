import scopescss from './shapeEdit.module.scss'
import { Col, Collapse, InputNumber, Popover, Row, Slider, Tabs } from 'antd';
import edit from '../../../redux/edit';
import { useCallback, useEffect, useState } from 'react';
import eventEmitter from '../../../lib/EventEmitter';
import ModuleAnimate from './moduleAnimate';
import _ from 'lodash';
import Position from './position';
import { SketchPicker } from 'react-color';
const { TabPane } = Tabs;
const { Panel } = Collapse
/* eslint-disable react-hooks/exhaustive-deps */
function ShapeEdit() {
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
  return (
    <Tabs defaultActiveKey="1" size='large' type='card' >
      <TabPane tab="形状 " key="1">
        <div className={scopescss['image-area']}>
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="形状" key="1">
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>颜色
                </div>
                <div className={scopescss['oper-input']}>
                  <Popover placement="rightTop" content={<SketchPicker color={editModule.color} onChange={(value) => { modulechange("color", `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`) }}></SketchPicker>} trigger="click">
                    <div className={scopescss['color-bar']} style={{ backgroundColor: editModule.color }}>

                    </div>
                  </Popover>


                </div>
              </div>
              {(() => {
                if (editModule.sectorAngle) {
                  return <div className={scopescss['oper-item']}>
                    <div className={scopescss['oper-name']}>角度
                    </div>
                    <div className={scopescss['oper-input']}>
                      <Row>
                        <Col span={14}>
                          <Slider
                            min={1}
                            max={359}
                            step={1}
                            onChange={(value: any) => {
                              modulechange('sectorAngle', value)
                            }}
                            value={editModule.sectorAngle}

                          />
                        </Col>
                        <Col span={10}>
                          <InputNumber
                            min={1}
                            max={359}
                            step={1}
                            onChange={(value: any) => {
                              modulechange('sectorAngle', value)
                            }}
                            value={editModule.sectorAngle}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                } else if (editModule.angles) {
                  return <div className={scopescss['oper-item']}>
                    <div className={scopescss['oper-name']}>角数
                    </div>
                    <div className={scopescss['oper-input']}>
                      <Row>
                        <Col span={14}>
                          <Slider
                            min={2}
                            max={100}
                            step={1}
                            onChange={(value: any) => {
                              modulechange('angles', value)
                            }}
                            value={editModule.angles}

                          />
                        </Col>
                        <Col span={10}>
                          <InputNumber
                            min={2}
                            max={100}
                            step={1}
                            onChange={(value: any) => {
                              modulechange('angles', value)
                            }}
                            value={editModule.angles}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                } else if (editModule.sides) {
                  return <div className={scopescss['oper-item']}>
                    <div className={scopescss['oper-name']}>角数
                    </div>
                    <div className={scopescss['oper-input']}>
                      <Row>
                        <Col span={14}>
                          <Slider
                            min={3}
                            max={50}
                            step={1}
                            onChange={(value: any) => {
                              modulechange('sides', value)
                            }}
                            value={editModule.sides}

                          />
                        </Col>
                        <Col span={10}>
                          <InputNumber
                            min={3}
                            max={50}
                            step={1}
                            onChange={(value: any) => {
                              modulechange('sides', value)
                            }}
                            value={editModule.sides}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                } else if (editModule.petals) {
                  return <div className={scopescss['oper-item']}>
                    <div className={scopescss['oper-name']}>角数
                    </div>
                    <div className={scopescss['oper-input']}>
                      <Row>
                        <Col span={14}>
                          <Slider
                            min={3}
                            max={50}
                            step={1}
                            onChange={(value: any) => {
                              modulechange('petals', value)
                            }}
                            value={editModule.petals}

                          />
                        </Col>
                        <Col span={10}>
                          <InputNumber
                            min={3}
                            max={50}
                            step={1}
                            onChange={(value: any) => {
                              modulechange('petals', value)
                            }}
                            value={editModule.petals}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                }
              })()}
            </Panel>
            <Panel header="位置" key="2">
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

export default ShapeEdit