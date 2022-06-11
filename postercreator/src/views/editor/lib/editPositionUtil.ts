import store from '@/store/index';


class EditPositionUtil {
  static positionFunc = (): any => { }
  constructor() {

  }
  static setPositionFunction(func) {
    EditPositionUtil.positionFunc = func
  }
  static getCanvasPositionByClientPosition(left: number, top: number) {
    let position = EditPositionUtil.positionFunc()
    let canvasArea = position.canvasArea
    let edit = position.edit
    if (left < canvasArea.left || left > canvasArea.left + canvasArea.width) {
      return undefined
    }
    if (top < canvasArea.top || top > canvasArea.top + canvasArea.height) {
      return undefined
    }
    let positionLeft = left - canvasArea.left - edit.left + canvasArea.scrollLeft
    let positionTop = top - canvasArea.top - edit.top + canvasArea.scrollTop
    if (positionLeft > edit.width || positionLeft < 0) {
      return undefined
    }
    if (positionTop > edit.height || positionTop < 0) {
      return undefined
    }
    return {
      top: positionTop,
      left: positionLeft
    }
  }
  static getShowEditCenterPosition() {

    let position = EditPositionUtil.positionFunc()
    let canvasArea = position.canvasArea
    let edit = position.edit
    let top = canvasArea.scrollTop - edit.top + canvasArea.height / 2
    let left = canvasArea.scrollLeft - edit.left + canvasArea.width / 2
    return {
      top: top / store.state.scale * 100,
      left: left / store.state.scale * 100,
    }
  }

}

export default EditPositionUtil