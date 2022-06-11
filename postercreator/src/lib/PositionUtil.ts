import MathUtil from './MathUtil'
interface position {
  left: number,
  top: number
}
interface clip {
  left: number,
  top: number,
  width: number,
  height: number,
}
interface point {
  x: number,
  y: number
}
interface flowerPoint extends point {
  lastCurPoint: point,
  nextCurPoint: point
}
class PositionUtil {
  constructor() {

  }
  /**
   * 计算四个顶点的的位置
   * @param x 中心坐标X
   * @param y 中心坐标Y
   * @param w 宽
   * @param h 高
   * @param angle 角度
   * @returns 
   */
  static getPosition(x: number, y: number, w: number, h: number, angle: number) {
    let centerPoint = {
      top: y,
      left: x
    }

    let r = PositionUtil.getLengthToOrigin(w / 2, h / 2)
    let innerAngle = MathUtil.asin(h / 2 / r)
    let leftTop = {
      left: centerPoint.left - r * MathUtil.cos(angle + innerAngle),
      top: centerPoint.top - r * MathUtil.sin(angle + innerAngle)
    }
    let rightTop = {
      left: centerPoint.left + r * MathUtil.cos(innerAngle - angle),
      top: centerPoint.top - r * MathUtil.sin(innerAngle - angle)
    }
    let leftBottom = {
      left: centerPoint.left - r * MathUtil.cos(innerAngle - angle),
      top: centerPoint.top + r * MathUtil.sin(innerAngle - angle)
    }
    let rightBottom = {
      left: centerPoint.left + r * MathUtil.cos(angle + innerAngle),
      top: centerPoint.top + r * MathUtil.sin(angle + innerAngle)
    }
    let minLeft = leftTop.left
    let minTop = leftTop.top
    let maxLeft = leftTop.left
    let maxTop = leftTop.top
    let positionArray = new Array()
    positionArray.push(rightTop)
    positionArray.push(leftBottom)
    positionArray.push(rightBottom)
    positionArray.forEach(posi => {
      if (posi.left > maxLeft) {
        maxLeft = posi.left
      }
      if (posi.left < minLeft) {
        minLeft = posi.left
      }
      if (posi.top > maxTop) {
        maxTop = posi.top
      }
      if (posi.top < minTop) {
        minTop = posi.top
      }
    })
    return {
      leftTop,
      rightTop,
      leftBottom,
      rightBottom,
      most: {
        minLeft,
        minTop,
        maxLeft,
        maxTop
      }
    }

  }
  /**
  * 计算坐标点在指定角度的坐标系的位置
  * @param x 中心坐标X
  * @param y 中心坐标Y
  * @param w 宽
  * @param h 高
  * @param angle 角度
  * @returns 
  */
  static getPositionAtAngleCoordinate(x: number, y: number, coordinateAngle: number): position {
    let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    let sin = Math.abs(y / r)
    let angle = MathUtil.asin(sin)
    if (y > 0 && x > 0) {
      angle = angle
    } else if (y > 0 && x < 0) {
      angle = 180 - angle
    } else if (y < 0 && x < 0) {
      angle = angle + 180
    } else if (y < 0 && x > 0) {
      angle = 360 - angle
    }

    let realAngle = angle - coordinateAngle
    return {
      left: r * MathUtil.cos(realAngle),
      top: r * MathUtil.sin(realAngle)
    }
  }
  /**
   * 通过定点信息获得组合信息
   * @param point 
   * @param coordinateAngle 
   */
  static getGroupPositionInfo(points: position[], coordinateAngle: number) {
    let minLeft = Number.MAX_SAFE_INTEGER
    let maxLeft = Number.MIN_SAFE_INTEGER
    let minTop = Number.MAX_SAFE_INTEGER
    let maxTop = Number.MIN_SAFE_INTEGER
    points.forEach(point => {

      let newposition = PositionUtil.getPositionAtAngleCoordinate(point.left, point.top, coordinateAngle)
      if (newposition.left < minLeft) {
        minLeft = newposition.left
      }
      if (newposition.left > maxLeft) {

        maxLeft = newposition.left
      }
      if (newposition.top < minTop) {
        minTop = newposition.top
      }
      if (newposition.top > maxTop) {
        maxTop = newposition.top
      }
    })
    let centerLeft = (minLeft + maxLeft) / 2
    let centerTop = (minTop + maxTop) / 2
    let positon = PositionUtil.getPositionAtAngleCoordinate(centerLeft, centerTop, -coordinateAngle)
    positon.left -= (maxLeft - minLeft) / 2
    positon.top -= (maxTop - minTop) / 2
    return {
      ...positon,
      width: maxLeft - minLeft,
      height: maxTop - minTop,
      rotate: coordinateAngle
    }
  }
  /**
   * 获得两点之间的的信息
   */
  static getPositionInfoByTwoPoint(pointone: position, pointtwo: position) {
    let x = pointtwo.left - pointone.left
    let y = pointtwo.top - pointone.top
    let length = PositionUtil.getLengthToOrigin(x, y)
    let sin = Math.abs(y / length)

    let angle = MathUtil.asin(sin)
    if (y > 0 && x > 0) {
      angle = angle
    } else if (y > 0 && x < 0) {
      angle = 180 - angle
    } else if (y < 0 && x < 0) {
      angle = angle + 180
    } else if (y < 0 && x > 0) {
      angle = 360 - angle
    }
    if (length == 0) {
      angle = 0
    }
    return {
      length,
      angle
    }

  }
  /**
   * 
   * @param x 获得点到坐标系原点的距离
   * @param y 
   * @returns 
   */
  static getLengthToOrigin(x: number, y: number): number {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))

  }
  /**
   * 得到中心点坐标
   */
  static getCenterPosition(x: number, y: number, w: number, h: number): position {
    return {
      top: y + h / 2,
      left: x + w / 2
    }
  }
  /**
* 根据已知点，斜边长度，角度算自身坐标
* @param angle 
* @param Hypotenuse 
* @param posi 
* @returns 
*/
  static getPositionbyOther(angle: number, Hypotenuse: number, posi: position): position {
    return {
      left: posi.left - Hypotenuse * MathUtil.cos(angle),
      top: posi.top + Hypotenuse * MathUtil.sin(angle)
    }
  }
  /*
  * 根据自身坐标，斜边长度，角度对应点坐标
  * @param angle 
  * @param Hypotenuse 
  * @param posi 
  * @returns 
  */
  static getPositionbyCenter(angle: number, Hypotenuse: number, posi: position): position {
    return {
      left: posi.left - Hypotenuse * MathUtil.cos(angle),
      top: posi.top + Hypotenuse * MathUtil.sin(angle)
    }
  }
  /**
   * 通过中心点得到坐标位置
   * @param x 
   * @param y 
   * @param w 
   * @param h 
   * @returns 
   */
  static getPositionByCenter(x: number, y: number, w: number, h: number): position {
    return {
      left: x - w / 2,
      top: y - h / 2
    }
  }

  static getClipInfo(width: number, height: number, clip: clip): clip {
    let fullSize = MathUtil.getFullSize(width, height, clip.width / clip.height)
    let scale = fullSize.width / clip.width
    return {
      left: clip.left + (fullSize.width - width) / 2 / scale,
      top: clip.top + (fullSize.height - height) / 2 / scale,
      width: width / scale,
      height: height / scale,
    }

  }
  static getShapesPoints(num: number, r: number): point[] {
    let startRate = 0
    let averageAngle = 360 / num
    let index = 0
    let opints: point[] = []
    while (index < num) {
      opints.push({ y: r - r * MathUtil.cos(startRate), x: r - r * MathUtil.sin(startRate) })
      startRate += averageAngle
      index++
    }
    return opints
  }
  static getStartShapesPoints(num: number, outerR: number, innerR: number): point[] {
    let startRate = 0
    let averageAngle = 180 / num
    let index = 0
    let opints: point[] = []
    while (index < num * 2) {
      let r = innerR
      if (index % 2 == 0) {
        r = outerR
      }
      opints.push({ y: outerR - r * MathUtil.cos(startRate), x: outerR - r * MathUtil.sin(startRate) })
      startRate += averageAngle
      index++
    }
    return opints
  }
  static getFlowerPointsByNum(num: number, r: number): flowerPoint[] {
    num += num
    let startRate = 0
    let averageAngle = 360 / num
    let curveR = r / MathUtil.cos(averageAngle / 2)
    let index = 0
    let opints: flowerPoint[] = []
    while (index < num) {
      let lastCurPoint = { y: r - curveR * MathUtil.cos(startRate - averageAngle / 2), x: r - curveR * MathUtil.sin(startRate - averageAngle / 2) }
      let nextCurPoint = { y: r - curveR * MathUtil.cos(startRate + averageAngle / 2), x: r - curveR * MathUtil.sin(startRate + averageAngle / 2) }
      if (index % 2 != 1) {
        opints.push({ y: r - r * MathUtil.cos(startRate), x: r - r * MathUtil.sin(startRate), lastCurPoint, nextCurPoint })
      }

      startRate += averageAngle
      index++
    }
    return opints
  }
  static beContent(point: position, position: clip) {
    if (point.left > position.left && point.left < position.left + position.width && point.top > position.top && point.left < position.top + position.height) {
      return true
    }
    return false
  }
  static getSelectedByPosition(item: clip, position: clip): boolean {
    let minTop = item.top < position.top ? item.top : position.top
    let maxTop = (item.top + item.height) > (position.top + position.height) ? (item.top + item.height) : (position.top + position.height)
    let minleft = item.left < position.left ? item.left : position.left
    let maxLeft = (item.left + item.width) > (position.left + position.width) ? (item.left + item.width) : (position.left + position.width)
    // && (maxLeft-minleft) < (item.width + position.width)
    if ((maxTop - minTop) < (item.height + position.height) && (maxLeft - minleft) < (item.width + position.width)) {
      return true
    }
    return false
  }

}

export default PositionUtil