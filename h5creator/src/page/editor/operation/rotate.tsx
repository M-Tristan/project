import React from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
import eventEmitter from '../../../lib/EventEmitter'
import { EditUtil } from '../../../redux/edit'
import './rotate.scss'
interface type {
  module: any
}
function Rotate(props: type) {
  let scale = useSelector((state: any) => state.H5Edit.scale)
  let moveScale = 100 / scale
  let module = EditUtil.getModuleById(props.module.id) as any
  let rotatePositonX = function () {
    return (
      Math.sin(module.rotate * (Math.PI / 180)) *
      (module.height / 2 + moveScale * 2)
    );
  }();
  let rotatePositonY = function () {
    return (
      -Math.cos(module.rotate * (Math.PI / 180)) *
      (module.height / 2 + moveScale * 2)
    );
  }();
  const rotate = (event: React.MouseEvent) => {
    let oriX = event.clientX;
    let oriY = event.clientY;
    let orileft = rotatePositonX;
    let oritop = rotatePositonY;
    window.onmousemove = (event: MouseEvent) => {
      let X = event.clientX;
      let Y = event.clientY;
      let width = (X - oriX) * moveScale - orileft;
      let height = (Y - oriY) * moveScale - oritop;
      let deg = 0;
      if (width < 0 && height > 0) {
        deg = (-Math.atan(width / height) / Math.PI) * 180;
      } else if (width < 0 && height < 0) {
        deg = 180 - (Math.atan(width / height) / Math.PI) * 180;
      } else if (width > 0 && height < 0) {
        deg = 180 - (Math.atan(width / height) / Math.PI) * 180;
      } else {
        deg = 360 - (Math.atan(width / height) / Math.PI) * 180;
      }
      module.rotate = Math.round(deg);
      eventEmitter.emit('changeModule', module.id)
    };
    window.onmouseup = (event: MouseEvent) => {
      eventEmitter.emit('updateEditInfo', module.id)
      window.onmousemove = null;
      window.onmouseup = null;

    };
  };
  return (<i
    className="icon iconfont icon-shuaxin swing-button"
    onMouseDown={(e: React.MouseEvent) => { e.stopPropagation(); rotate(e) }}
    draggable="false"
    style={{
      transform: `translateX(-50%) scale(${moveScale})`,
      bottom: `${-80 * moveScale}px`,
    }}
  ></i>)
}
export default Rotate
