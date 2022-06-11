import scopescss from './chartEdit.module.scss'
import { Collapse, Tabs } from 'antd';
import edit from '../../../redux/edit';
import { useCallback, useEffect, useState } from 'react';
import eventEmitter from '../../../lib/EventEmitter';
import ModuleAnimate from './moduleAnimate';
import _ from 'lodash';
import Position from './position';
const { Panel } = Collapse;
const { TabPane } = Tabs;
/* eslint-disable react-hooks/exhaustive-deps */
function ChartEdit() {
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
  // let [editModule, setModule] = useState(edit.editModule)
  let setModule = useState(edit.editModule)[1]
  const modulechange = useCallback((key: string, value: any) => {
    let editModule = edit.editModule
    editModule[key] = value
    setModule({ ...editModule })
    eventEmitter.emit('changeModule', editModule.id)
  }, [])

  return (
    <Tabs defaultActiveKey="1" size='large' type='card' >
      <TabPane tab="图标 " key="1">
        <div className={scopescss['image-area']}>
          <Collapse defaultActiveKey={['1']} ghost>

            <Panel header="位置" key="1">
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

export default ChartEdit