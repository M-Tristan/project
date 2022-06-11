/* eslint-disable react-hooks/exhaustive-deps */

import { CSSProperties, useEffect, useRef, useState } from 'react'
import { chart } from '../../../interface/module'
import * as echarts from "echarts";


interface type {
  module: chart,
  play: boolean

}
function Chart(props: type) {
  const [module, setModule] = useState(props.module)
  const [animate, setAnimate] = useState({} as CSSProperties)

  let myChart: any = null;
  const chart = useRef(null)
  useEffect(() => {
    setModule({ ...props.module })
    draw()
    return () => { }
  }, [props.module])
  const draw = () => {


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


  let style: React.CSSProperties = {
    width: module.width + 'px',
    height: module.height + 'px',
    left: module.left + 'px',
    top: module.top + 'px',
    transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    zIndex: module.zindex,
    position: `absolute`,
    display: `inline-block`,
    userSelect: `none`
  }
  let stopAnimate = false
  useEffect(() => {
    if (props.play) {
      implementAnimate()
    } else {
      setAnimate({
      })
    }

    return () => {
      stopAnimate = true
    }
  }, [module.animates, props.play])
  const implementAnimate = async () => {
    if (stopAnimate) {
      return
    }
    if (!module.animates) {
      return;
    }
    let enterAnimate = module.animates.find(
      (item: any) => item.type === "enter"
    );
    if (enterAnimate) {
      let duration = enterAnimate.duration
      setAnimate({
        animationName: enterAnimate.keyframe,
        animationDuration: `${enterAnimate.duration / 1000}s`
      })
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, duration);
      });
    }
    if (stopAnimate) {
      return
    }
    let emphasizeAnimate = module.animates.find(
      (item: any) => item.type === "emphasize"
    );
    if (emphasizeAnimate) {
      let duration = emphasizeAnimate.duration
      setAnimate({
        animationName: emphasizeAnimate.keyframe,
        animationDuration: `${emphasizeAnimate.duration / 1000}s`,
      })
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, duration);
      });
    }
    if (stopAnimate) {
      return
    }
    let leaveAnimate = module.animates.find(
      (item: any) => item.type === "leave"
    );
    if (leaveAnimate) {
      let duration = leaveAnimate.duration
      setAnimate({
        animationName: leaveAnimate.keyframe,
        animationDuration: `${leaveAnimate.duration / 1000}s`,
      })
      await new Promise<void>((res, rej) => {
        setTimeout(() => {
          res();
        }, duration);
      });
      setAnimate({
        opacity: 0

      })
    }
  }
  return (<div
    style={style}
  >
    <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
      <div
        ref={chart}
        style={{ width: module.width + 'px', height: module.height + 'px' }}
      ></div>
    </div>


  </div>)
}
export default Chart