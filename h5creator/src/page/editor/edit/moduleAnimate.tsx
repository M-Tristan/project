import scope from './moduleAnimate.module.scss'
import { Card, InputNumber, Checkbox } from 'antd';
import edit from '../../../redux/edit';
import { animate } from '../../../interface/module';
import eventEmitter from '../../../lib/EventEmitter';

// type: string,
// duration: number,
// delay: number,
// keyframe: string,
// name: string

function ModuleAnimate() {
  let editModule = edit.editModule
  if (!editModule.animates) {
    editModule.animates = []
  }
  let enterAnimate = editModule.animates.find(
    (item: any) => item.type === "enter"
  );
  let emphasizeAnimate = editModule.animates.find(
    (item: any) => item.type === "emphasize"
  );
  let leaveAnimate = editModule.animates.find(
    (item: any) => item.type === "leave"
  );
  const changeAttr = (animate: any, key: string, value: any) => {
    animate[key] = value
    eventEmitter.emit('updateEditInfo', editModule.id)
  }
  const preview = (animate: any) => {
    editModule.animates = [...editModule.animates]
    eventEmitter.emit('previewAnimate', {
      type: animate.type,
      duration: 1000,
      delay: 0,
      name: animate.name,
      keyframe: animate.keyframe,
      iterationCount: 1,
      infinite: false,
      moduleId: editModule.id
    })
  }
  const infinity = (animate: animate, value: any) => {
    animate.infinite = value.target.checked
  }
  let enterAnimateEdit = enterAnimate ? <Card title={enterAnimate.name} style={{ width: 300 }} extra={<span onClick={() => { preview(enterAnimate) }} className={scope['preview']} >预览</span>}>
    <div className={scope['animateInput']}>
      时间:<InputNumber min={0} max={10000} value={enterAnimate.duration} onChange={(value) => { changeAttr(enterAnimate, 'duration', value) }} />
    </div>
    <div className={scope['animateInput']}>
      延迟:<InputNumber min={0} max={10000} value={enterAnimate.delay} onChange={(value) => { changeAttr(enterAnimate, 'delay', value) }} />
    </div>
    {/* <div className={scope['animateInput']}>
      次数:<InputNumber min={0} max={10000} value={enterAnimate.iterationCount} onChange={(value) => { changeAttr(enterAnimate, 'iterationCount', value) }} />
    </div>
    <div className={scope['animateInput']}>
      循环:<Checkbox onChange={(value) => { infinity(enterAnimate, value) }} ></Checkbox>
    </div> */}
  </Card> : <></>

  let emphasizeAnimateEdit = emphasizeAnimate ? <Card title={emphasizeAnimate.name} style={{ width: 300 }} extra={<span onClick={() => { preview(emphasizeAnimate) }} className={scope['preview']} >预览</span>}>
    <div className={scope['animateInput']}>
      时间:<InputNumber min={0} max={10000} value={emphasizeAnimate.duration} onChange={(value) => { changeAttr(emphasizeAnimate, 'duration', value) }} />
    </div>
    <div className={scope['animateInput']}>
      延迟:<InputNumber min={0} max={10000} value={emphasizeAnimate.delay} onChange={(value) => { changeAttr(emphasizeAnimate, 'delay', value) }} />
    </div>
    <div className={scope['animateInput']}>
      次数:<InputNumber min={0} max={10000} value={emphasizeAnimate.iterationCount} onChange={(value) => { changeAttr(emphasizeAnimate, 'iterationCount', value) }} />
    </div>
    <div className={scope['animateInput']}>
      循环:<Checkbox onChange={(value) => { infinity(emphasizeAnimate, value) }} ></Checkbox>
    </div>
  </Card> : <></>

  let leaveAnimateEdit = leaveAnimate ? <Card title={leaveAnimate.name} style={{ width: 300 }} extra={<span onClick={() => { preview(leaveAnimate) }} className={scope['preview']} >预览</span>}>
    <div className={scope['animateInput']}>
      时间:<InputNumber min={0} max={10000} value={leaveAnimate.duration} onChange={(value) => { changeAttr(leaveAnimate, 'duration', value) }} />
    </div>
    <div className={scope['animateInput']}>
      延迟:<InputNumber min={0} max={10000} value={leaveAnimate.delay} onChange={(value) => { changeAttr(leaveAnimate, 'delay', value) }} />
    </div>
    <div className={scope['animateInput']}>
      次数:<InputNumber min={0} max={10000} value={leaveAnimate.iterationCount} onChange={(value) => { changeAttr(leaveAnimate, 'iterationCount', value) }} />
    </div>
    <div className={scope['animateInput']}>
      循环:<Checkbox onChange={(value) => { infinity(leaveAnimate, value) }} ></Checkbox>
    </div>
  </Card> : <></>
  return (
    <div className={scope['moduleAnimate']}>
      <Card title="进场动画" bordered={false} style={{ width: 300 }} extra={<i className='icon iconfont icon-yulan1' onClick={() => { eventEmitter.emit('setShowAnimaEdit', 0) }}></i>}>
        {enterAnimateEdit}
      </Card>
      <Card title="强调动画" bordered={false} style={{ width: 300 }} extra={<i className='icon iconfont icon-yulan1' onClick={() => { eventEmitter.emit('setShowAnimaEdit', 1) }}></i>}>
        {emphasizeAnimateEdit}
      </Card>
      <Card title="出场动画" bordered={false} style={{ width: 300 }} extra={<i className='icon iconfont icon-yulan1' onClick={() => { eventEmitter.emit('setShowAnimaEdit', 2) }}></i>}>
        {leaveAnimateEdit}
      </Card>

    </div>
  )

}

export default ModuleAnimate