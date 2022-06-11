import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import ModuleUtil from '../../../lib/ModuleUtil';
import PositionUtil from '../../../lib/PositionUtil';
import shapeScss from './Shape.module.scss'
interface type {
  type: string
}
function Shape(props: type) {
  const shape = useRef<HTMLCanvasElement>(null)
  const dispatch = useDispatch()
  useEffect(() => {
    switch (props.type) {
      case 'polygon':
        drawPolygon();
        break
      case 'star':
        drawStart();
        break
      case 'sector':
        drawSector();
        break
      case 'flower':
        drawFlower();
        break
      case 'circle':
        drawCircle();
        break
    }
    return () => {

    };
  });
  function drawFlower() {
    let points = PositionUtil.getFlowerPointsByNum(10, 70)
    let canvas = shape.current as HTMLCanvasElement
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.moveTo(70, 70);
    points.forEach((item, index) => {
      let lastItem = item.lastCurPoint
      let nextItem = item.nextCurPoint
      ctx.quadraticCurveTo(lastItem.x, lastItem.y, item.x, item.y);
      ctx.quadraticCurveTo(nextItem.x, nextItem.y, 70, 70);
    })
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fill();
  }
  function drawCircle() {
    let canvas = shape.current as HTMLCanvasElement
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.beginPath();
    ctx.arc(70, 70, 50, 0, Math.PI * 2, false);
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fill();
  }
  function drawSector() {
    let canvas = shape.current as HTMLCanvasElement
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    var w = 140;
    var h = 140;
    ctx.beginPath();
    ctx.moveTo(w / 6, h / 6 * 5);
    ctx.arc(w / 6, h / 6 * 5, w / 3 * 2, 0, -Math.PI / 2, true);
    ctx.closePath();
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fill();
  }
  function drawStart() {
    let points = PositionUtil.getStartShapesPoints(5, 70, 30)
    let canvas = shape.current as HTMLCanvasElement
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {

        ctx.lineTo(point.x, point.y);
      }

    })
    ctx.closePath()
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fill();
  }
  function drawPolygon() {
    let points = PositionUtil.getShapesPoints(5, 70)
    let canvas = shape.current as HTMLCanvasElement
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {

        ctx.lineTo(point.x, point.y);
      }

    })
    ctx.closePath()
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fill();
  }
  const selectShape = async () => {
    let shapeInfo = await ModuleUtil.getShapeInfo(props.type);
    dispatch({ type: "addShape", shape: shapeInfo });
  };
  return (
    <div className={shapeScss.shape} onClick={selectShape}>
      <canvas ref={shape} width="140" height="140"></canvas>
    </div>
  )
}
Shape.defaultProps = {
  type: 'polygon'
};


export default Shape