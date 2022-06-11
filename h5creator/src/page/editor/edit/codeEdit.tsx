import scopescss from './codeEdit.module.scss'
import { Collapse, Input, Popover, Tabs } from 'antd';
import edit from '../../../redux/edit';
import { useCallback, useEffect, useState } from 'react';
import eventEmitter from '../../../lib/EventEmitter';
import ModuleAnimate from './moduleAnimate';
import _ from 'lodash';
import Position from './position';
import { SketchPicker } from 'react-color';
const { Panel } = Collapse;
const { TabPane } = Tabs;
/* eslint-disable react-hooks/exhaustive-deps */
function CodeEdit() {
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

  useEffect(() => {
    setModule({ ...edit.editModule })
  }, [edit.editModule])

  let [editModule, setModule] = useState(edit.editModule)
  // let setModule = useState(edit.editModule)[1]
  const modulechange = useCallback((key: string, value: any) => {
    let editModule = edit.editModule

    if (key === 'width' || key === 'height') {
      editModule['width'] = value
      editModule['height'] = value
    } else {
      editModule[key] = value
    }
    setModule({ ...editModule })
    eventEmitter.emit('changeModule', editModule.id)
  }, [])

  return (
    <Tabs defaultActiveKey="1" size='large' type='card' >
      <TabPane tab="二维码 " key="1">
        <div className={scopescss['image-area']}>
          <Collapse defaultActiveKey={['1']} ghost>



            <Panel header="二维码" key="1">
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>
                  内容
                </div>
                <div className={`${scopescss['oper-input']} flex justify-center  `}>
                  <div className={scopescss['text-item']}>
                    <Input placeholder="请输入二维码信息" value={editModule.text} onChange={(value) => { if (value.target.value) modulechange("text", value.target.value) }} />

                  </div>
                </div>
              </div>
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>
                  颜色
                </div>
                <div className={`${scopescss['oper-input']} flex justify-center`}>
                  <Popover placement="rightTop" content={<SketchPicker disableAlpha color={editModule.colorLight} onChange={(value) => { modulechange("colorLight", `${value.hex}`) }}></SketchPicker>} trigger="click">
                    <div className={scopescss['color-item']} style={{ backgroundColor: editModule.colorLight }}>

                    </div>
                  </Popover>

                  {
                    (() => {
                      if (editModule.backImage === undefined) {
                        return <Popover placement="rightTop" content={<SketchPicker disableAlpha color={editModule.colorDark} onChange={(value) => { modulechange("colorDark", `${value.hex}`) }}></SketchPicker>} trigger="click">
                          <div className={scopescss['color-item']} style={{ backgroundColor: editModule.colorDark }}>

                          </div>
                        </Popover>
                      } else {
                        return ""
                      }
                    })()
                  }

                </div>
              </div>
            </Panel>
          </Collapse>
          <Collapse defaultActiveKey={['2']} ghost>



            <Panel header="位置" key="2">
              <Position modulechange={modulechange}></Position>
            </Panel>
          </Collapse>
        </div>
      </TabPane >
      <TabPane tab="动画" key="2">
        <ModuleAnimate></ModuleAnimate>
      </TabPane>
      <TabPane tab="交互" key="3">
        待开发。。。
      </TabPane>
    </Tabs >

  )
}

export default CodeEdit