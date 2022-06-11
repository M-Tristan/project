import scopescss from './vedioEdit.module.scss'
import { Collapse, Tabs } from 'antd';
import edit from '../../../redux/edit';
import { useCallback, useEffect, useState } from 'react';
import eventEmitter from '../../../lib/EventEmitter';
import ModuleAnimate from './moduleAnimate';
import _ from 'lodash';
import Position from './position';
import { Input } from 'antd';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse
/* eslint-disable react-hooks/exhaustive-deps */
function VedioEdit() {
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
  let [iframelink, setIframelink] = useState(editModule.iframelink)
  // let setModule = useState(edit.editModule)[1]
  const modulechange = useCallback((key: string, value: any) => {
    let editModule = edit.editModule
    editModule[key] = value
    setModule({ ...editModule })
    eventEmitter.emit('changeModule', editModule.id)
  }, [])

  const commitLink = (link: string) => {
    let div = document.createElement('div')
    div.innerHTML = link
    let children: any = div.children[0]
    if (children && children.nodeName === 'IFRAME' && children.src.startsWith('https://v.qq.com/txp/iframe/player.html')) {
      edit.editModule.iframelink = link
      setModule({ ...edit.editModule })
      setIframelink(link)
      eventEmitter.emit('changeModule', editModule.id)
    } else {
      setModule({ ...editModule })
      setIframelink(editModule.iframelink)
    }


  }
  return (
    <Tabs defaultActiveKey="1" size='large' type='card' >
      <TabPane tab="外链视频" key="1">
        <div className={scopescss['image-area']}>
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel header="通用代码" key="1">
              <div className={scopescss['oper-item']}>
                <div className={scopescss['oper-name']}>
                  代码
                </div>
                <div className={`${scopescss['oper-input']}`}>
                  <TextArea onChange={(value) => {
                    let link = value.target.value
                    setIframelink(link)
                  }} value={iframelink} rows={4} onBlur={(value) => {
                    let link = value.target.value
                    commitLink(link)
                  }} />
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

export default VedioEdit