import scopescss from './optionsEdit.module.scss'
import { v4 as uuidv4 } from 'uuid';
import { Col, Collapse, InputNumber, Popover, Radio, Row, Slider, Tabs } from 'antd';
import edit from '../../../redux/edit';
import { useCallback, useEffect, useState } from 'react';
import eventEmitter from '../../../lib/EventEmitter';
import ModuleAnimate from './moduleAnimate';
import _ from 'lodash';
import Position from './position';
import TextArea from 'antd/lib/input/TextArea';
import { SketchPicker } from 'react-color';
const { TabPane } = Tabs;
const { Panel } = Collapse
/* eslint-disable react-hooks/exhaustive-deps */
function OptionsEdit() {
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
  const addSelect = () => {
    editModule.selectList.push({ id: uuidv4(), value: '请输入内容' })
    edit.editModule.selectList = [...editModule.selectList]
    setModule({ ...editModule })
    eventEmitter.emit('changeModule', editModule.id)

  }
  const deleteSelect = (item: any) => {
    _.remove(editModule.selectList, function (select) {
      return select === item;
    });
    edit.editModule.selectList = [...editModule.selectList]
    setModule({ ...editModule });
    eventEmitter.emit('changeModule', editModule.id)
  }
  const changeOptionValue = (value: any, item: any) => {
    item.value = value.currentTarget.value;
    edit.editModule.selectList = [...editModule.selectList]
    setModule(edit.editModule);
    eventEmitter.emit('changeModule', editModule.id)
  }
  let selectList = <></>

  selectList = editModule.selectList.map((item: any) => {
    return <div className='text-center my-1 ' key={item.id}>
      <TextArea maxLength={50} style={{ width: '85%' }} rows={2} defaultValue={item.value} onChange={(value) => { changeOptionValue(value, item) }} />
      <div className='float-right flex flex-col'>
        <i className='icon iconfont icon-xianquanguanbi' onClick={() => { deleteSelect(item) }}></i>
        <i className='icon iconfont icon-lujing172'></i>
      </div>
    </div>
  })

  return (
    <Tabs defaultActiveKey="1" size='large' type='card' >
      <TabPane tab="下拉框 " key="1">
        <div className={scopescss['OptionsEdit-area']}>
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="基本" key="1">
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>标题
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={24} >
                      <div className='text-center'>
                        <TextArea maxLength={50} style={{ width: '95%' }} rows={2} defaultValue={editModule.title} onChange={(value) => { modulechange('title', value.currentTarget.value) }} />

                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>选择模式
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={24} >
                      <div className='text-center'>
                        <Radio.Group onChange={(value) => { modulechange('inputType', value.target.value) }} value={editModule.inputType}>
                          <Radio value={"radio"}>单选</Radio>
                          <Radio value={"checkbox"}>多选</Radio>
                        </Radio.Group>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>选项设置
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={24} >
                      {selectList}
                      <div className='text-center'>
                        <i onClick={addSelect} className='icon iconfont icon-yulan1 cursor-pointer'></i>
                        <span onClick={addSelect} className='cursor-pointer'>添加选项</span>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Panel>
            <Panel header="样式" key="2">
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>
                  标题颜色
                </div>
                <div className={`${scopescss['oper-input']} flex justify-center`}>
                  <Popover placement="rightTop" content={<SketchPicker color={editModule.titleColor} onChange={(value) => { modulechange("titleColor", `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`) }}></SketchPicker>} trigger="click">
                    <div className={scopescss['color-item']} style={{ backgroundColor: editModule.titleColor }}>

                    </div>
                  </Popover>
                </div>
              </div>
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>
                  主题颜色
                </div>
                <div className={`${scopescss['oper-input']} flex justify-center`}>
                  <Popover placement="rightTop" content={<SketchPicker color={editModule.titleBackgroundColor} onChange={(value) => { modulechange("titleBackgroundColor", `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`) }}></SketchPicker>} trigger="click">
                    <div className={scopescss['color-item']} style={{ backgroundColor: editModule.titleBackgroundColor }}>

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

export default OptionsEdit