import scopescss from './buttonEdit.module.scss'
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
function ButtonEdit() {
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
      <TabPane tab="按钮" key="1">
        <div className={scopescss['image-area']}>
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="样式" key="2">
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>
                  文字颜色
                </div>
                <div className={`${scopescss['oper-input']} flex justify-center`}>
                  <Popover placement="rightTop" content={<SketchPicker color={editModule.color} onChange={(value) => { modulechange("color", `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`) }}></SketchPicker>} trigger="click">
                    <div className={scopescss['color-item']} style={{ backgroundColor: editModule.color }}>

                    </div>
                  </Popover>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>
                  背景颜色
                </div>
                <div className={`${scopescss['oper-input']} flex justify-center`}>
                  <Popover placement="rightTop" content={<SketchPicker color={editModule.backgroundColor} onChange={(value) => { modulechange("backgroundColor", `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`) }}></SketchPicker>} trigger="click">
                    <div className={scopescss['color-item']} style={{ backgroundColor: editModule.backgroundColor }}>
                    </div>
                  </Popover>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>
                  边框颜色
                </div>
                <div className={`${scopescss['oper-input']} flex justify-center`}>
                  <Popover placement="rightTop" content={<SketchPicker color={editModule.borderColor} onChange={(value) => { modulechange("borderColor", `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`) }}></SketchPicker>} trigger="click">
                    <div className={scopescss['color-item']} style={{ backgroundColor: editModule.borderColor }}>
                    </div>
                  </Popover>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>边框尺寸
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={8}
                        step={0.01}
                        onChange={(value: any) => {
                          modulechange('borderWidth', value)
                        }}
                        value={editModule.borderWidth}

                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={8}
                        step={0.01}
                        onChange={(value: any) => {
                          modulechange('borderWidth', value)
                        }}
                        value={editModule.borderWidth}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>圆角半径
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={50}
                        step={1}

                        onChange={(value: any) => {
                          modulechange('borderRadius', value)
                        }}
                        value={editModule.borderRadius}

                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={50}
                        step={1}
                        formatter={value => `${value}%`}
                        onChange={(value: any) => {
                          modulechange('borderRadius', value)
                        }}
                        value={editModule.borderRadius}
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
            </Panel>
            <Panel header="位置" key="3">
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

export default ButtonEdit