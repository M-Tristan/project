import { useCallback, useEffect, useState } from 'react'
import eventEmitter from '../../../lib/EventEmitter'
import edit from '../../../redux/edit'
import scopescss from './animateEdit.module.scss'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
/* eslint-disable react-hooks/exhaustive-deps */
function AnimateEdit(prop: {
  part: number
}) {
  const dispatch = useDispatch()
  let editModule = edit.editModule
  let [position, setPozition] = useState({
    left: 350,
    top: 51
  })
  let [part, setPart] = useState(prop.part)
  useEffect(() => {
    setPart(prop.part)
  }, [prop.part])
  let style = {
    top: `${position.top}px`,
    left: `${position.left}px`
  }
  const moduleMove = () => {
    let event = window.event as MouseEvent
    let oriX = event.clientX
    // let oriY = event.clientY
    let orileft = position.left
    let oritop = position.top
    // let shouldPushBack = false
    window.onmousemove = (event: MouseEvent) => {
      let X = event.clientX
      // let Y = event.clientY
      setPozition({
        left: orileft + (X - oriX),
        top: oritop
      })
    }
    window.onmouseup = () => {
      window.onmousemove = null
      window.onmouseup = null
    }

  }

  const preAnimate = useCallback((item: any) => {
    eventEmitter.emit('previewAnimate', {
      type: item.type,
      duration: 1000,
      delay: 0,
      name: item.name,
      keyframe: item.keyframe,
      iterationCount: 1,
      infinite: false,
      moduleId: editModule.id
    })

  }, [editModule])

  const selectAnimate = useCallback((item: any) => {
    if (!editModule.animates) {
      editModule.animates = []
    }
    let index = editModule.animates.findIndex((animate: any) => animate.type === item.type)

    if (index === -1) {
      editModule.animates.push({
        type: item.type,
        duration: 1000,
        delay: 0,
        name: item.name,
        keyframe: item.keyframe,
        iterationCount: 1,
        infinite: false
      })

    } else {
      editModule.animates[index] = {
        ...editModule.animates[index],
        ...item
      }
    }
    editModule.animates = [...editModule.animates]
    eventEmitter.emit('previewAnimate', {
      type: item.type,
      duration: 1000,
      delay: 0,
      name: item.name,
      keyframe: item.keyframe,
      iterationCount: 1,
      infinite: false,
      moduleId: editModule.id
    })
    dispatch({ type: 'previewAnimation', keyframe: item.keyframe })

  }, [editModule])



  const animiteEnterList = [

    { name: '反弹入场', keyframe: 'bounceIn', type: 'enter' },
    { name: '反弹入场(下)', keyframe: 'bounceInDown', type: 'enter' },
    { name: '反弹入场(左)', keyframe: 'bounceInLeft', type: 'enter' },
    { name: '反弹入场(右)', keyframe: 'bounceInRight', type: 'enter' },
    { name: '反弹入场(上)', keyframe: 'bounceInUp', type: 'enter' },
    { name: '后方入场(下)', keyframe: 'backInDown', type: 'enter' },
    { name: '后方入场(左)', keyframe: 'backInLeft', type: 'enter' },
    { name: '后方入场(右)', keyframe: 'backInRight', type: 'enter' },
    { name: '后方入场(上)', keyframe: 'backInUp', type: 'enter' },
    { name: '褪色入场', keyframe: 'fadeIn', type: 'enter' },
    { name: '褪色入场(下)', keyframe: 'fadeInDown', type: 'enter' },
    { name: '褪色入场(左)', keyframe: 'fadeInLeft', type: 'enter' },
    { name: '褪色入场(右)', keyframe: 'fadeInRight', type: 'enter' },
    { name: '褪色入场(上)', keyframe: 'fadeInUp', type: 'enter' },
    { name: '褪色入场(上左)', keyframe: 'fadeInTopLeft', type: 'enter' },
    { name: '褪色入场(上右)', keyframe: 'fadeInTopRight', type: 'enter' },
    { name: '褪色入场(下左)', keyframe: 'fadeInBottomLeft', type: 'enter' },
    { name: '褪色入场(下右)', keyframe: 'fadeInBottomRight', type: 'enter' },
    { name: '光速入场(右))', keyframe: 'lightSpeedInRight', type: 'enter' },
    { name: '光速入场(左)', keyframe: 'lightSpeedInLeft', type: 'enter' },

    { name: '旋转入场', keyframe: 'rotateIn', type: 'enter' },
    { name: '旋转入场(下左)', keyframe: 'rotateInDownLeft', type: 'enter' },
    { name: '旋转入场(下右)', keyframe: 'rotateInDownRight', type: 'enter' },
    { name: '旋转入场(上左)', keyframe: 'rotateInUpLeft', type: 'enter' },
    { name: '旋转入场(上右)', keyframe: 'rotateInUpRight', type: 'enter' },

    { name: 'X轴翻转', keyframe: 'flipInX', type: 'enter' },
    { name: 'Y轴翻转', keyframe: 'flipInY', type: 'enter' },
    { name: '渐变和缩放', keyframe: 'zoomIn', type: 'enter' },
    { name: '渐变和移动', keyframe: 'slideInLeft', type: 'enter' },

  ]
  const animiteEmphasizeList = [
    { name: '翻转', keyframe: 'flip', type: 'emphasize' },
    { name: '反弹', keyframe: 'bounce', type: 'emphasize' },
    { name: '闪烁', keyframe: 'flash', type: 'emphasize' },
    { name: '脉搏', keyframe: 'pulse', type: 'emphasize' },
    { name: '橡皮筋', keyframe: 'rubberBand', type: 'emphasize' },
    { name: '晃动', keyframe: 'wobble', type: 'emphasize' },
    { name: '心跳', keyframe: 'heartBeat', type: 'emphasize' },
    { name: '果冻', keyframe: 'jello', type: 'emphasize' },
    { name: '惊喜', keyframe: 'tada', type: 'emphasize' },
    { name: 'X轴摇晃', keyframe: 'shakeX', type: 'emphasize' },
    { name: 'Y轴摇晃', keyframe: 'shakeY', type: 'emphasize' },
    { name: '旋转', keyframe: 'spin', type: 'emphasize' },
    { name: '球', keyframe: 'ball', type: 'emphasize' },
    { name: '旋转对角线', keyframe: 'rotate-diagonal-1', type: 'emphasize' },
    { name: '旋转对角线(反)', keyframe: 'rotate-diagonal-2', type: 'emphasize' },
    { name: '水平轴旋转', keyframe: 'rotate-hor-center', type: 'emphasize' },
    { name: '垂直轴旋转', keyframe: 'rotate-vert-center', type: 'emphasize' },
    { name: '振动(慢)', keyframe: 'vibrate-slow', type: 'emphasize' },
    { name: '振动(块)', keyframe: 'vibrate-fast', type: 'emphasize' },
    { name: '信号', keyframe: 'ping', type: 'emphasize' },

  ]
  const animiteOutList = [
    { name: '反弹退场', keyframe: 'bounceOut', type: 'leave' },
    { name: '反弹退场(下)', keyframe: 'bounceOutDown', type: 'leave' },
    { name: '反弹退场(左)', keyframe: 'bounceOutLeft', type: 'leave' },
    { name: '反弹退场(右)', keyframe: 'bounceOutRight', type: 'leave' },
    { name: '反弹退场(上)', keyframe: 'bounceOutUp', type: 'leave' },
    { name: '后方退场(下)', keyframe: 'backOutDown', type: 'leave' },
    { name: '后方退场(左)', keyframe: 'backOutLeft', type: 'leave' },
    { name: '后方退场(右)', keyframe: 'backOutRight', type: 'leave' },
    { name: '后方退场(上)', keyframe: 'backOutUp', type: 'leave' },
    { name: '褪色退场', keyframe: 'fadeOut', type: 'leave' },
    { name: '褪色退场(下)', keyframe: 'fadeOutDown', type: 'leave' },
    { name: '褪色退场(左)', keyframe: 'fadeOutLeft', type: 'leave' },
    { name: '褪色退场(右)', keyframe: 'fadeOutRight', type: 'leave' },
    { name: '褪色退场(上)', keyframe: 'fadeOutUp', type: 'leave' },
    { name: '褪色退场(上左)', keyframe: 'fadeOutTopLeft', type: 'leave' },
    { name: '褪色退场(上右)', keyframe: 'fadeOutTopRight', type: 'leave' },
    { name: '褪色退场(下左)', keyframe: 'fadeOutBottomLeft', type: 'leave' },
    { name: '褪色退场(下右)', keyframe: 'fadeOutBottomRight', type: 'leave' },
    { name: 'X轴翻转', keyframe: 'flipOutX', type: 'leave' },
    { name: 'Y轴翻转', keyframe: 'flipOutY', type: 'leave' },
    { name: '光速退场(右)', keyframe: 'lightSpeedOutRight', type: 'leave' },
    { name: '光速退场(左)', keyframe: 'lightSpeedOutLeft', type: 'leave' },

    { name: '旋转退场', keyframe: 'rotateOut', type: 'leave' },
    { name: '旋转退场(下左)', keyframe: 'rotateOutDownLeft', type: 'leave' },
    { name: '旋转退场(下右)', keyframe: 'rotateOutDownRight', type: 'leave' },
    { name: '旋转退场(上左)', keyframe: 'rotateOutUpLeft', type: 'leave' },
    { name: '旋转退场(上右)', keyframe: 'rotateOutUpRight', type: 'leave' },

    { name: '弹出', keyframe: 'bounceOut', type: 'leave' },
    { name: '链条', keyframe: 'hinge', type: 'leave' }
  ]

  const active = (index: number) => {
    if (part === index) {
      return scopescss['active']
    }
  }

  const animiteEnterDom = animiteEnterList.map((item, index) => {
    return <div className={scopescss['animite-item']} key={index} onClick={() => { selectAnimate(item) }} onMouseOver={() => { preAnimate(item) }}>{item.name}</div>
  })
  const animiteEmphasizeDom = animiteEmphasizeList.map((item, index) => {
    return <div className={scopescss['animite-item']} key={index} onClick={() => { selectAnimate(item) }} onMouseOver={() => { preAnimate(item) }}>{item.name}</div>
  })
  const animiteOutDom = animiteOutList.map((item, index) => {
    return <div className={scopescss['animite-item']} key={index} onClick={() => { selectAnimate(item) }} onMouseOver={() => { preAnimate(item) }}>{item.name}</div>
  })
  return (<div className={scopescss['animateEdit']} style={style} >
    <div className={scopescss['title']} onMouseDown={moduleMove}>
      动画
      <i className={`icon iconfont icon-guanbi ${scopescss['close-button']}`} onClick={() => { eventEmitter.emit('setShowAnimaEdit', -1) }}> </i>
    </div>
    <div className={scopescss['taps']}>
      <div className={classnames([scopescss['tap-item'], active(0)])} onClick={() => { setPart(0) }}>进入</div>
      <div className={classnames([scopescss['tap-item'], active(1)])} onClick={() => { setPart(1) }}>强调</div>
      <div className={classnames([scopescss['tap-item'], active(2)])} onClick={() => { setPart(2) }}>退出</div>
    </div>



    <div className={scopescss['animateList']}>
      {(() => {
        if (part === 0) return animiteEnterDom
        if (part === 1) return animiteEmphasizeDom
        if (part === 2) return animiteOutDom
      })()}

    </div>




  </div>)
}

export default AnimateEdit