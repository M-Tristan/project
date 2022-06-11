import scopescss from './textEdit.module.scss'
import { Collapse, Slider, InputNumber, Row, Col, Popover, Tabs } from 'antd'
import fontList from '../../../lib/fontList'
import edit from '../../../redux/edit'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'
import ModuleAnimate from './moduleAnimate'
import { useCallback, useEffect, useState } from 'react'
import eventEmitter from '../../../lib/EventEmitter'
import _ from 'lodash'
import Position from './position'
const { TabPane } = Tabs;
const { Panel } = Collapse
/* eslint-disable react-hooks/exhaustive-deps */
function TextEdit() {

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

  let activeness = useCallback((bool: boolean) => {
    if (bool) {
      return scopescss['active']
    } else {
      return ''
    }
  }, [])



  let fontActive = useCallback((bool: boolean) => {
    if (bool) {
      return scopescss['fontActive']
    } else {
      return ''
    }
  }, [])


  const modulechange = useCallback((key: string, value: any) => {
    let editModule = edit.editModule
    editModule[key] = value
    setModule({ ...editModule })
    eventEmitter.emit('changeModule', editModule.id)
  }, [])

  const handleColorChange = useCallback((value: any, attribute?: string) => {
    let rgba = `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`
    if (attribute === undefined) {
      modulechange('color', rgba)
    } else {
      modulechange(String(attribute), rgba)
    }

  }, [])


  const selectFont = useCallback((item: any) => {

    if (!item.load) {
      let fullname = item.fontFamily;
      let style = document.createElement("style");
      style.type = "text/css";
      style.innerText =
        "@font-face {font-family:" +
        fullname +
        ";src:url(" +
        item.url +
        ")};font-display: swap";
      document.getElementsByTagName("head")[0].appendChild(style);
      item.load = true;
    }

    editModule.fontFamily = item.fontFamily;
    modulechange('fontFamily', item.fontFamily)
    setModule({ ...editModule })
  }, [])



  const changeDecoration = useCallback((type: string) => {
    if (editModule.textDecoration === type) {
      editModule.textDecoration = "none";
    } else {
      editModule.textDecoration = type;
    }
    setModule({ ...editModule })
    eventEmitter.emit('changeModule', editModule.id)
  }, [])


  const fontlist = fontList.map((item, index) => {
    return <div className={classnames([scopescss['font-item'], fontActive(editModule.fontFamily === item.fontFamily)])} onClick={() => { selectFont(item) }} key={index} >
      {item.name}
    </div >
  })
  return (
    <Tabs defaultActiveKey="1" size='large' type='card' >
      <TabPane tab=" 文字 " key="1">
        <div className={scopescss['image-area']}>
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="文本" key="1">

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>字号
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={1}
                        max={1000}
                        onChange={(value: any) => {
                          modulechange('fontSize', value)
                        }}
                        value={editModule.fontSize}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={1}
                        max={1000}
                        onChange={(value: any) => {
                          modulechange('fontSize', value)
                        }}
                        value={editModule.fontSize}
                      />
                    </Col>
                  </Row>
                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>
                  颜色

                </div>
                <div className={scopescss['oper-input']}>
                  <Popover placement="rightTop" content={<SketchPicker color={editModule.color} onChange={(value) => { handleColorChange(value, 'color') }}></SketchPicker>} trigger="click">
                    <div className={scopescss['font-color']} style={{ backgroundColor: editModule.color }}>

                    </div>
                  </Popover>


                </div>
              </div>

              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>装饰
                </div>
                <div className={scopescss['decoration']}>
                  <div className="decoration">
                    <div
                      className={classnames(scopescss['flip'], activeness(editModule.bold))}
                      onClick={() => { modulechange('bold', !editModule.bold) }}
                    >
                      <i className="icon iconfont icon-bold"></i>
                    </div>
                    <div
                      className={classnames(scopescss['flip'], activeness(editModule.italic))}
                      onClick={() => { modulechange('italic', !editModule.italic) }}
                    >
                      <i className="icon iconfont icon-zitixieti"></i>
                    </div>
                    <div
                      className={classnames(scopescss['flip'], activeness(editModule.textDecoration === 'underline'))}
                      onClick={() => { changeDecoration('underline') }}
                    >
                      <i className="icon iconfont icon-zitixiahuaxian"></i>
                    </div>
                    <div
                      className={classnames(scopescss['flip'], activeness(editModule.textDecoration === 'line-through'))}
                      onClick={() => { changeDecoration('line-through') }}
                    >
                      <i className="icon iconfont icon-strikethrough"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>对齐
                </div>
                <div className={scopescss['decoration']}>
                  <div className="decoration">
                    <div
                      className={classnames(scopescss['flip'], activeness(editModule.textAlign === 'left'))}
                      onClick={() => { modulechange('textAlign', 'left') }}
                    >
                      <i className="icon iconfont icon-zuoduiqi"></i>
                    </div>
                    <div
                      className={classnames(scopescss['flip'], activeness(editModule.textAlign === 'center'))}
                      onClick={() => { modulechange('textAlign', 'center') }}
                    >
                      <i className="icon iconfont icon-juzhongduiqi"></i>
                    </div>
                    <div
                      className={classnames(scopescss['flip'], activeness(editModule.textAlign === 'right'))}
                      onClick={() => { modulechange('textAlign', 'right') }}
                    >
                      <i className="icon iconfont icon-youduiqi"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>行间距
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={1}
                        max={10}
                        step={0.01}
                        onChange={(value: any) => {
                          modulechange('lineHeight', value)
                        }}
                        value={editModule.lineHeight}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={1}
                        max={10}
                        onChange={(value: any) => {
                          modulechange('lineHeight', value)
                        }}
                        value={editModule.lineHeight}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>字间距
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Slider
                        min={0}
                        max={500}
                        onChange={(value: any) => {
                          modulechange('letterSpacing', value)
                        }}
                        value={editModule.letterSpacing}
                      />
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={1}
                        max={500}
                        onChange={(value: any) => {
                          modulechange('letterSpacing', value)
                        }}
                        value={editModule.letterSpacing}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>不透明度
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
            <Panel header="字体" key="2">
              <div className={scopescss["font-list"]}>
                {fontlist}

              </div>
            </Panel>
            <Panel header="修饰" key="3">
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>描边
                </div>
                <div className={scopescss['oper-input']}>
                  <Row>
                    <Col span={14}>
                      <Popover placement="rightTop" content={<SketchPicker color={editModule.strokeColor} onChange={(value) => { handleColorChange(value, 'strokeColor') }}></SketchPicker>} trigger="click">
                        <div className={scopescss['stroke-color']} style={{ backgroundColor: editModule.strokeColor }}>

                        </div>
                      </Popover>
                    </Col>
                    <Col span={10}>
                      <InputNumber
                        min={0}
                        max={10}
                        onChange={(value: any) => {
                          modulechange('strokeWidth', value)
                        }}
                        value={editModule.strokeWidth}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Panel>
            <Panel header="位置" key="4">

              <Position modulechange={modulechange}></Position>
            </Panel>
          </Collapse>
        </div >
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

export default TextEdit