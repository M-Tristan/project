/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, useEffect, useRef, useState } from 'react'
import { shape } from '../../../interface/module'
import eventEmitter from '../../../lib/EventEmitter'
import PositionUtil from '../../../lib/PositionUtil'
interface type {
  module: shape,
  play: boolean
}
function Shape(props: type) {
  const [module, setModule] = useState(props.module)
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



  const [animate, setAnimate] = useState({} as CSSProperties)


  const shape = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    draw()
    return () => {

    };
  }, []);

  const draw = () => {

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
        animationDuration: `${enterAnimate.duration / 1000}s`,
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
  return (
    <div


      style={style}

    >
      <div style={{ ...animate, ...{ width: `100%`, height: `100%` } }}>
        <canvas
          style={{
            width: ` 100%`,
            height: `100%`
          }}
          ref={shape}
          width="500"
          height="500"

        ></canvas>

      </div>


    </div>
  )

}
export default Shape