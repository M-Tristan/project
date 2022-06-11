/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shape } from '../../../interface/module'
import eventEmitter from '../../../lib/EventEmitter'
import PositionUtil from '../../../lib/PositionUtil'
import edit from '../../../redux/edit'
import shapeScss from './dShape.module.scss'
import Regulator from './regulator'
import Rotate from './rotate'
interface type {
  module: shape
  edit?: boolean,
  animate?: any
}
function DShape(props: type) {
  const [module, setModule] = useState(props.module)
  useEffect(() => {
    setModule({ ...props.module })
  }, [props.module.id])
  useEffect(() => {
    const changeModule = (id: string) => {
      if (id === props.module.id) {
        setModule({ ...module })
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
  let editModule = edit.editModule
  let scale = useSelector((state: any) => state.H5Edit.scale)
  let moveScale = 100 / scale
  // const dispatch = useDispatch()
  const shape = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    draw()
    return () => {

    };
  }, [module.color, module.sectorAngle, module.angles, module.sides, module.petals]);
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
  const draw = () => {
    if (editcom) {
      return
    }
    switch (module.shapeType) {
      case "polygon":
        drawPolygon();
        break;
      case "star":
        drawStart();
        break;
      case "sector":
        drawSector();
        break;
      case "flower":
        drawFlower();
        break;
      case "circle":
        drawCircle();
        break;
    }
  };
  function drawPolygon() {
    let points = PositionUtil.getShapesPoints(module.sides ? module.sides : 3, 250);
    let canvas = shape.current;
    if (!canvas) {
      return
    }
    if (!canvas) {
      return
    }
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.closePath();
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = module.color;
    ctx.fill();
  }
  function drawStart() {
    let points = PositionUtil.getStartShapesPoints(
      module.angles ? module.angles : 0,
      250,
      150
    );
    let canvas = shape.current;
    if (!canvas) {
      return
    }
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.closePath();
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = module.color;
    ctx.fill();
  }
  function drawSector() {
    let canvas = shape.current;
    if (!canvas) {
      return
    }
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(
      250,
      250,
      250,
      0,
      module.sectorAngle ? (module.sectorAngle / 180) * Math.PI : 0,
      true
    );
    ctx.closePath();
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = module.color;
    ctx.fill();
  }
  function drawFlower() {
    let points = PositionUtil.getFlowerPointsByNum(module.petals ? module.petals : 5, 250);
    let canvas = shape.current;
    if (!canvas) {
      return
    }
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.moveTo(249, 249);
    points.forEach((item, index) => {
      let lastItem = item.lastCurPoint;
      let nextItem = item.nextCurPoint;
      ctx.quadraticCurveTo(lastItem.x, lastItem.y, item.x, item.y);
      ctx.quadraticCurveTo(nextItem.x, nextItem.y, 250, 250);
    });
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = module.color;
    ctx.fill();
  }
  function drawCircle() {
    let canvas = shape.current;
    if (!canvas) {
      return
    }
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.arc(250, 250, 250, 0, Math.PI * 2, false);
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = module.color;
    ctx.fill();
  }
  const moduleMove = useCallback(() => {
    let module = props.module
    let event = window.event as MouseEvent
    let oriX = event.clientX
    let oriY = event.clientY
    let orileft = module.left
    let oritop = module.top
    dispatch({ type: 'setEditModule', moduleId: module.id })
    window.onmousemove = (event: MouseEvent) => {
      let X = event.clientX
      let Y = event.clientY
      module.left = orileft + (X - oriX) * moveScale
      module.top = oritop + (Y - oriY) * moveScale
      eventEmitter.emit('changeModule', module.id)
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
  return (
    <div
      className={shapeScss['shape-content']}
      onMouseDown={() => { moduleMove() }}
      style={style}

    >
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>

        <canvas

          ref={shape}
          width="500"
          height="500"
          className={shapeScss.shape}
        ></canvas>
        {
          (() => {
            if (editModule.id === module.id && editcom)
              return <> <Regulator module={module}></Regulator><Rotate module={module}></Rotate></>
          })()
        }

      </div>

    </div>
  )

}
export default DShape