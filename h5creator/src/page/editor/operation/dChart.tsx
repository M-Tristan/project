/* eslint-disable react-hooks/exhaustive-deps */

import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { chart } from '../../../interface/module'
import chartscss from './dChart.module.scss'
import * as echarts from "echarts";
import { useDispatch, useSelector } from 'react-redux';
import Regulator from './regulator';
import Rotate from './rotate';
import edit from '../../../redux/edit';
import eventEmitter from '../../../lib/EventEmitter';
import React from 'react';
interface type {
  module: chart,
  edit?: boolean,
  animate?: any
}
function DChart(props: type) {
  const [module, setModule] = useState(props.module)
  useEffect(() => {
    setModule({ ...props.module })
  }, [props.module.id])
  useEffect(() => {
    const changeModule = (id: string) => {
      if (id === props.module.id) {
        setModule({ ...props.module })
      }
    }
    eventEmitter.on('changeModule', changeModule)
    return () => {
      eventEmitter.off('changeModule', changeModule)
    }
  }, [props.module])

  let editcom = props.edit ? props.edit : false
  const [animate, setAnimate] = useState({} as CSSProperties)
  const dispatch = useDispatch()
  let scale = useSelector((state: any) => state.H5Edit.scale)
  let moveScale = 100 / scale
  let editModule = edit.editModule
  let myChart: any = null;
  const chart = useRef(null)
  const draw = () => {

    if (editcom) {
      return
    }
    if (myChart) {
      myChart.dispose();
    }

    let chartDom = chart.current;
    if (chartDom) {
      myChart = echarts.init(chartDom);
      myChart.setOption(module.option as echarts.EChartsCoreOption);
    }

  };

  useEffect(() => {
    draw()
    return () => {

      if (myChart) {
        myChart.dispose();
      }
    };
  }, [module.width, module.height]);
  useEffect(() => {
    let previewAnimate = props.animate
    if (previewAnimate) {
      setAnimate({
        animationName: previewAnimate.keyframe,
        animationDuration: `${previewAnimate.duration / 1000}s`
      })
    } else {
      if (animate) {
        setAnimate({})
      }
    }

  }, [props.animate])// eslint-disable-line react-hooks/exhaustive-deps
  const moduleMove = useCallback(() => {
    let module = props.module
    let event = window.event as MouseEvent
    let oriX = event.clientX
    let oriY = event.clientY
    let orileft = module.left
    let oritop = module.top
    dispatch({ type: 'setEditModule', moduleId: module.id })
    // let shouldPushBack = false
    window.onmousemove = (event: MouseEvent) => {
      let X = event.clientX
      let Y = event.clientY
      module.left = orileft + (X - oriX) * moveScale
      module.top = oritop + (Y - oriY) * moveScale
      // setModule({ ...module as text })
      eventEmitter.emit('changeModule', module.id)

      // shouldPushBack = true
    }
    window.onmouseup = () => {
      eventEmitter.emit('updateEditInfo', module.id)
      window.onmousemove = null
      window.onmouseup = null
      module.left = Math.round(module.left)
      module.height = Math.round(module.height)
      module.width = Math.round(module.width)
      module.top = Math.round(module.top)


    }
  }, [props.module, moveScale])
  let style = {
    width: module.width + 'px',
    height: module.height + 'px',
    left: module.left + 'px',
    top: module.top + 'px',
    transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    zIndex: module.zindex,
  }
  return (<div
    className={chartscss['chart-content']}
    onMouseDown={() => { moduleMove() }}
    style={style}
  >

    <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
      <div
        ref={chart}
        style={{ width: module.width + 'px', height: module.height + 'px' }}
      ></div>
      {
        (() => {
          if (editModule.id === module.id && editcom)
            return <> <Regulator module={module}></Regulator><Rotate module={module}></Rotate></>
        })()
      }
    </div>
  </div>)
}
export default DChart