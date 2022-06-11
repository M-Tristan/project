import MathUtil from "../lib/MathUtil";
import PositionUtil from "../lib/PositionUtil";

let layerInfo = {}
let groupParameter = {}
class EditUtil {
  /**
   * 得到所有图层信息
   * @param {} state
   * @returns
   */
  static getLayers(state) {
    layerInfo = {}
    const layers = <any>[];
    state.postInfo.layers.forEach(ele => {
      layers[ele.zindex] = ele
    })
    let index = layers.length - 1
    const newLayers = <any>[]
    const groupInfo = {}
    while (index >= 0) {
      const item = layers[index--]

      if (item) {
        layerInfo[item.id] = item
        if (item.groupId) {
          if (groupInfo[item.groupId]) {
            groupInfo[item.groupId].unshift(item)
          } else {
            const group = [item]
            layerInfo[item.groupId] = group
            groupInfo[item.groupId] = group
            newLayers.push(group)
          }
        } else {
          newLayers.push(item)
        }
      }
    }
    return newLayers.reverse()
  }
  /**
 * 重新调整图层
 * @param {} state
 */
  static adjustLayers(state) {
    const newLayers = EditUtil.getLayers(state)
    console.log(newLayers)
    EditUtil.initLayer(newLayers)
  }
  /**
* 初始化图层
* @param {*} newLayers
*/
  static initLayer(newLayers) {
    newLayers.flat(Infinity).forEach((ele, index) => {
      if (ele) {
        ele.zindex = index
      }
    })
  }

  /**
 * 图层上移
 * @param {*} state
 * @param {*} id
 * @returns
 */
  static upper(state, id) {
    const newLayers = EditUtil.getLayers(state)
    const length = newLayers.length
    let editModel = layerInfo[id]
    if (editModel.groupId) {
      editModel = layerInfo[editModel.groupId]
    }
    const index = newLayers.findIndex(item => { return editModel === item })
    if (index === length - 1) {
      return
    }
    [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]]
    EditUtil.initLayer(newLayers)
  }

  /**
 * 图层下移
 * @param {*} state
 * @param {*} id
 * @returns
 */
  static down(state, id) {
    const newLayers = EditUtil.getLayers(state)
    let editModel = layerInfo[id]
    if (editModel.groupId) {
      editModel = layerInfo[editModel.groupId]
    }

    const index = newLayers.findIndex(item => { return editModel === item })
    if (index === 0) {
      return
    }
    [newLayers[index], newLayers[index - 1]] = [newLayers[index - 1], newLayers[index]]
    EditUtil.initLayer(newLayers)
  }

  /**
 * 图层置顶
 * @param {*} state
 * @param {*} id
 * @returns
 */
  static top(state, id) {
    const newLayers = EditUtil.getLayers(state)
    let editModel = layerInfo[id]
    if (editModel.groupId) {
      editModel = layerInfo[editModel.groupId]
    }

    const length = newLayers.length
    const index = newLayers.findIndex(item => { return editModel === item })
    if (index === length - 1) {
      return
    }
    const layer = newLayers.splice(index, 1)
    newLayers.push(layer)
    EditUtil.initLayer(newLayers)
  }

  /**
 * 图层置底
 * @param {*} state
 * @param {*} id
 * @returns
 */
  static bottom(state, id) {
    const newLayers = EditUtil.getLayers(state)
    let editModel = layerInfo[id]
    if (editModel.groupId) {
      editModel = layerInfo[editModel.groupId]
    }
    const index = newLayers.findIndex(item => { return editModel === item })
    if (index === 0) {
      return
    }
    const layer = newLayers.splice(index, 1)
    newLayers.unshift(layer)
    EditUtil.initLayer(newLayers)
  }

  /**
   * 水平分布
   * @param {}} state
   * @param {*} layers
   */
  static horizontaldistribution(state, layers) {
    const groupWidth = state.group.width
    let allWidth = 0
    const positionArr = <any>[]
    let groupMap = {}
    layers.forEach(item => {
      if (item.groupId) {
        if (groupMap[item.groupId]) {
          return
        }
        groupMap[item.groupId] = item
        item = state.postInfo.groups.find(group => {
          return group.id === item.groupId
        })
        EditUtil.initGroupSize(state, item)
      }
      const res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
      allWidth += (res.most.maxLeft - res.most.minLeft)
      positionArr.push({
        top: res.most.minTop,
        left: res.most.minLeft,
        width: res.most.maxLeft - res.most.minLeft,
        height: res.most.maxTop - res.most.minTop,
        layer: item
      })
    })
    positionArr.sort((layero, layerw) => { return layero.left - layerw.left })
    let sizeRate = groupWidth / allWidth
    let left = 0
    positionArr.forEach((item, index) => {
      if (item.layer.type === 'group') {

        EditUtil.initGroupParameter(state, item.layer)

      }
      let otherLength = groupWidth - item.width * sizeRate
      item.layer.left = state.group.left + left - (1 - sizeRate) * item.width * left / otherLength + item.width / 2 - item.layer.width / 2
      left += item.width * sizeRate
      if (item.layer.type === 'group') {
        EditUtil.resetGroupItem(state, item.layer)
      }

    })
  }

  /**
   * 垂直分布
   * @param {}} state
   * @param {*} layers
   */
  static verticaldistribution(state, layers) {
    const groupHeight = state.group.height
    let allHeight = 0
    const positionArr = <any>[]
    let groupMap = {}
    layers.forEach(item => {
      if (item.groupId) {
        if (groupMap[item.groupId]) {
          return
        }
        groupMap[item.groupId] = item
        item = state.postInfo.groups.find(group => {
          return group.id === item.groupId
        })
        EditUtil.initGroupSize(state, item)
      }
      const res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
      allHeight += (res.most.maxTop - res.most.minTop)
      positionArr.push({
        top: res.most.minTop,
        left: res.most.minLeft,
        width: res.most.maxLeft - res.most.minLeft,
        height: res.most.maxTop - res.most.minTop,
        layer: item
      })
    })
    positionArr.sort((layero, layerw) => { return layero.top - layerw.top })
    let sizeRate = groupHeight / allHeight
    let top = 0
    positionArr.forEach((item, index) => {
      if (item.layer.type === 'group') {
        EditUtil.initGroupParameter(state, item.layer)

      }
      let otherLength = groupHeight - item.height * sizeRate
      item.layer.top = state.group.top + top - (1 - sizeRate) * item.height * top / otherLength + item.height / 2 - item.layer.height / 2
      top += item.height * sizeRate
      // console.log(item)
      if (item.layer.type === 'group') {
        // EditUtil.initGroupParameter(state, item.layer)
        EditUtil.resetGroupItem(state, item.layer)
      }
    })
  }
  /**
* 初始化组合内图层信息
* @param {*} state
* @param {*} group
*/
  static initGroupParameter(state, group) {
    EditUtil.getLayers(state)
    groupParameter = {

    }
    const moduleCenerPosition = PositionUtil.getCenterPosition(
      group.left,
      group.top,
      group.width,
      group.height
    )
    group.layerIds.forEach(id => {
      const item = layerInfo[id]
      if (!item) {
        return
      }
      const itemLengthInfo = PositionUtil.getPositionInfoByTwoPoint(
        moduleCenerPosition,
        PositionUtil.getCenterPosition(
          item.left,
          item.top,
          item.width,
          item.height
        )
      )
      const innerAngle = itemLengthInfo.angle - group.rotate
      const itemInfo: any = {}
      itemInfo.width = item.width / group.width
      itemInfo.height = item.height / group.height
      itemInfo.centerLeft = (itemLengthInfo.length * MathUtil.cos(innerAngle) +
        group.width / 2) /
        group.width
      itemInfo.centerTop = (group.height / 2 +
        itemLengthInfo.length * MathUtil.sin(innerAngle)) /
        group.height
      itemInfo.rotate = item.rotate - group.rotate
      if (item.type === 'text') {
        itemInfo.fontSize = item.fontSize / group.width
        itemInfo.letterSpacing = item.letterSpacing / group.width
      }
      groupParameter[item.id] = itemInfo
    })
  }

  /**
 * 重置组合内图层位置，大小
 * @param {*} state
 * @param {*} group
 */
  static resetGroupItem(state, group) {
    group.layerIds.forEach(id => {
      const item = layerInfo[id]
      const orgItem = groupParameter[item.id]
      item.rotate = (orgItem.rotate + group.rotate) % 360
      const width = (orgItem.centerLeft - 0.5) * group.width
      const height = (0.5 - orgItem.centerTop) * group.height
      const hypotenuse = MathUtil.getHypotenuse(width, height)
      const innerAngle = MathUtil.atan(height / width) - 180
      let angle = innerAngle - group.rotate
      if (orgItem.centerLeft < 0.5) {
        angle += 180
      }
      const centerPosition = PositionUtil.getPositionbyCenter(angle, hypotenuse, {
        left: group.left + group.width / 2,
        top: group.top + group.height / 2
      })
      item.left = centerPosition.left - item.width / 2
      item.top = centerPosition.top - item.height / 2
      item.width = group.width * orgItem.width
      item.height = group.height * orgItem.height
      if (item.type === 'text') {
        item.fontSize = group.width * orgItem.fontSize
        item.letterSpacing = group.width * orgItem.letterSpacing
      }
    })
  }

  /**
   * 初始化组合大小，位置信息
   * @param {*} state
   * @param {*} group
   */
  static initGroupSize(state, group) {
    if (!group) {
      return
    }
    const pointList = <any>[]
    const layers = state.postInfo.layers
    group.layerIds.forEach(id => {
      const item = layers.find(layer => { return layer.id === id })
      const res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
      pointList.push(res.leftTop)
      pointList.push(res.leftBottom)
      pointList.push(res.rightTop)
      pointList.push(res.rightBottom)
    })
    const anglePositionInfo = PositionUtil.getGroupPositionInfo(pointList, state.group.rotate)
    group.width = anglePositionInfo.width
    group.height = anglePositionInfo.height
    group.top = anglePositionInfo.top
    group.left = anglePositionInfo.left
  }
}
export default EditUtil