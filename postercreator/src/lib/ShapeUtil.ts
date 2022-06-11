import PositionUtil from "@/lib/PositionUtil";

class ShapeUtil {
  static drawPolygon(module) {
    let points = PositionUtil.getShapesPoints(module.sides, 250);
    let canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 500
    let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index == 0) {
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
    return canvas.toDataURL()
  }
  static drawStart(module) {
    let points = PositionUtil.getStartShapesPoints(
      module.angles,
      250,
      150
    );
    let canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 500
    let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index == 0) {
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
    return canvas.toDataURL()
  }
  static drawSector(module) {
    let canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 500
    let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(
      250,
      250,
      250,
      0,
      (module.sectorAngle / 180) * Math.PI,
      true
    );
    ctx.closePath();
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = module.color;
    ctx.fill();
    return canvas.toDataURL()
  }
  static drawFlower(module) {
    let points = PositionUtil.getFlowerPointsByNum(module.petals, 250);
    let canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 500
    let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
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
    return canvas.toDataURL()
  }
  static drawCircle(module) {
    let canvas = document.createElement('canvas')
    canvas.width = 500
    canvas.height = 500
    let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.arc(250, 250, 250, 0, Math.PI * 2, false);
    ctx.lineWidth = 0.01;
    ctx.stroke();
    ctx.fillStyle = module.color;
    ctx.fill();
    return canvas.toDataURL()
  }
}

export default ShapeUtil