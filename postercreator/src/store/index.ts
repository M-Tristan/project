import { createStore } from 'vuex'
import { background, canvas, chart, code, image, operItem, shape, text, effectText, group } from '../interface/module'
import { v4 as uuids4 } from 'uuid';
import PositionUtil from '../lib/PositionUtil';
import _ from 'lodash'
import EditUtil from './EditUtil';
export default createStore({
  state: {
    postInfo: {
      layers: new Array<operItem>(),
      groups: new Array<group>(),
      background: <background>new Object(),
      canvas: <canvas>new Object(),
      watermark: undefined as any
    },
    postList: new Array<any>(),
    backList: new Array<any>(),
    nextList: new Array<any>(),
    editModule: <any>new Object(),//当前编辑模块
    clipOper: false,
    backClip: false,
    group: undefined as any,
    editSize: { width: 800, height: 800 },
    scale: 100,
    copyLayers: new Array<any>()
  },
  mutations: {
    /**
     * 
     * @param state 保存背景信息
     * @param info 
     */
    setbackInfo(state, info) {
      state.postInfo.background = info
    },
    /**
     * 背景裁切操作
     * @param state 
     * @param status 
     */
    setBackClip(state, status) {
      state.backClip = status
    },
    /**
     * 图层层级调整
     * @param state 
     * @param type 
     */
    layerAdjustment(state, type) {
      let editModule = state.editModule
      switch (type) {
        case "up":
          EditUtil.upper(state, editModule.id)
          break;
        case "down":
          EditUtil.down(state, editModule.id)
          break;
        case "top":
          EditUtil.top(state, editModule.id)
          break;
        case "bottom":
          EditUtil.bottom(state, editModule.id)
          break;
      }

    },
    /**
     * 对齐方式调整
     * @param state 
     * @param type 
     */
    positionAdjustment(state, type) {
      function align(Module) {
        let editModule = Module
        if (editModule.groupId) {
          editModule = state.postInfo.groups.find(group => {
            return group.id === editModule.groupId
          })

          EditUtil.initGroupParameter(state, editModule)
        }
        const res = PositionUtil.getPosition(editModule.left + editModule.width / 2, editModule.top + editModule.height / 2, editModule.width, editModule.height, editModule.rotate)
        const itemPositionInfo = {
          top: res.most.minTop,
          left: res.most.minLeft,
          width: res.most.maxLeft - res.most.minLeft,
          height: res.most.maxTop - res.most.minTop
        }
        switch (type) {
          case 'top':
            editModule.top -= (itemPositionInfo.top - range.top)
            break
          case 'left':
            editModule.left -= (itemPositionInfo.left - range.left)
            break
          case 'right':
            editModule.left -= (itemPositionInfo.left + itemPositionInfo.width - range.left - range.width)
            break
          case 'bottom':
            editModule.top -= (itemPositionInfo.top + itemPositionInfo.height - range.top - range.height)
            break
          case 'verticalcenter':
            editModule.left -= (itemPositionInfo.left + itemPositionInfo.width / 2 - range.left - range.width / 2)
            break
          case 'horizontally':
            editModule.top -= (itemPositionInfo.top + itemPositionInfo.height / 2 - range.top - range.height / 2)
            break
          case 'horizontaldistribution':
            break
          case 'verticaldistribution':
            break
        }
        if (editModule.type === 'group') {
          EditUtil.resetGroupItem(state, editModule)
        }
      }
      const canvas = state.postInfo.canvas
      const layeyinfo: any = {}
      const layers = state.postInfo.layers
      layers.forEach(item => {
        layeyinfo[item.id] = item
      })
      let range = {
        top: 0,
        left: 0,
        width: canvas.width,
        height: canvas.height
      }
      const editModuleList = <any>[]
      if (state.group && !state.group.id) {
        range = {
          top: state.group.top,
          left: state.group.left,
          width: state.group.width,
          height: state.group.height
        }
        state.group.layerIds.forEach((item: string) => {
          editModuleList.push(layeyinfo[item])
        })
      } else {
        if (state.editModule.type != 'back') {
          editModuleList.push(state.editModule)
        } else {
          editModuleList.push(layeyinfo[state.group.layerIds[0]])
        }

      }
      if (type === 'horizontaldistribution') {
        EditUtil.horizontaldistribution(state, editModuleList)
      } else if (type === 'verticaldistribution') {
        EditUtil.verticaldistribution(state, editModuleList)
      } else {
        editModuleList.forEach(item => {
          align(item)
        })
      }
    },
    /**
     * 重做
     * @param state 
     */
    next(state) {
      let postState = state.nextList.pop()
      state.backList.push(postState)
      let postIndex = postState.postIndex
      state.postList = _.cloneDeep(postState.postList)
      state.postInfo = state.postList[postIndex]
    },
    /**
     * 撤销
     * @param state 
     */
    back(state) {
      let postState = state.backList.pop()
      let postIndex = postState.postIndex
      state.nextList.push(postState)
      state.postList = _.cloneDeep(state.backList[state.backList.length - 1].postList)
      state.postInfo = state.postList[postIndex]
    },
    /**
     * 加入历史
     * @param state 
     */
    pushBack(state) {
      state.backList.push({
        postIndex: state.postList.findIndex(post => { return post === state.postInfo }),
        postInfo: _.cloneDeep(state.postInfo),
        postList: _.cloneDeep(state.postList)
      })
      state.nextList = []
    },
    /**
     * 删除海报
     * @param state 
     * @param index 
     */
    deletePostByIndex(state, index) {
      state.postList.splice(index, 1)
      state.postInfo = state.postList[0]
    },
    /**
     * 选择海报
     * @param state 
     * @param index 
     */
    selectPostByIndex(state, index) {
      state.postInfo = state.postList[index]
      state.editModule = state.postInfo.background
    },
    /**
    * 选择最后一页海报
    * @param state 
    * @param index 
    */
    selectLastPost(state) {
      state.postInfo = state.postList[state.postList.length - 1]
      state.editModule = state.postInfo.background
    },
    /**
     * 添加海报
     * @param state 
     * @param post 
     */
    addPost(state, post) {
      state.postList.push(post)
      // state.postInfo = post
      // state.editModule = state.postInfo.background
    },
    /**
     * 调整放大倍率
     * @param state 
     * @param scale 
     */
    setScale(state, scale) {
      if (scale < 1) {
        scale = 1
      }
      if (scale > 400) {
        scale = 400
      }
      if (scale > 10) {
        scale = Math.floor(scale / 10) * 10
      }
      state.scale = scale
    },
    /**
     * 调整编辑器尺寸
     * @param state 
     * @param size 
     */
    setEditSize(state, size) {
      state.editSize.width = size.width
      state.editSize.height = size.height
    },
    /**
     * 添加图标
     * @param state 
     * @param chart 
     */
    addChart(state, chart: chart) {
      chart.type = 'chart'
      chart.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(chart)
    },
    /**
     * 添加变形文字
     * @param state '
     * @param effectText 
     */
    addEffectText(state, effectText: effectText) {
      effectText.type = 'effectText'
    },
    /**
     * 添加形状
     * @param state 
     * @param shape 
     */
    addShape(state, shape: shape) {
      shape.type = 'shape'
      shape.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(shape)
    },
    /**
     * 添加图片
     * @param state 
     * @param image 
     */
    addImage(state, image: image) {
      image.type = 'image'
      image.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(image)
    },
    /**
         * 添加SVG
         * @param state 
         * @param image 
         */
    addSvg(state, svg: any) {
      svg.type = 'svg'
      svg.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(svg)
    },
    /**
     * 添加图片
     * @param state 
     * @param text 
     */
    addText(state, text: text) {
      text.type = 'text'
      text.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(text)
    },
    /**
     * 添加二维码
     * @param state 
     * @param code 
     */
    addCode(state, code: code) {
      code.type = 'code'
      code.zindex = state.postInfo.layers.length
      state.postInfo.layers.push(code)
    },
    /**
     * 添加背景
     * @param state 
     * @param back 
     */
    addBack(state, back: background) {
      back.type = 'back'
      state.postInfo.background = back
    },
    /**
     * 添加画布
     * @param state 
     * @param canvas 
     */
    addCanvas(state) {
      let canvas = { width: 1000, height: 1000 }
      if (state.postList[0]) {
        canvas = { ...state.postList[0].canvas }
      }

      let postInfo = {
        groups: new Array<group>(),
        layers: new Array<operItem>(),
        background: <background>new Object(),
        canvas: <canvas>new Object(),
        watermark: undefined
      }
      postInfo.canvas = canvas
      state.postList.push(postInfo)

      state.postInfo = postInfo
    },
    /**
     * 
     * @param state 设置组合
     */
    addGroup(state) {
      let groupId = uuids4();
      let group = {} as group
      group.type = 'group'
      state.group.id = groupId
      group.id = state.group.id
      group.layerIds = state.group.layerIds
      group.layerIds.forEach(id => {
        let layer = state.postInfo.layers.find(item => item.id == id)
        if (layer) {
          layer.groupId = groupId
        }
      })
      group.top = state.group.top
      group.left = state.group.left
      group.width = state.group.width
      group.height = state.group.height
      group.rotate = state.group.rotate
      state.group = group
      state.postInfo.groups.push(group)
      EditUtil.adjustLayers(state)
    },
    /**
     * 拆分组
     * @param state 
     * 
     */
    closeGroup(state) {
      let id = state.group['id']
      delete state.group['id']
      state.group.layerIds.forEach(id => {
        let layer = state.postInfo.layers.find(item => item.id == id)
        if (layer) {
          delete layer['groupId']
        }
      })
      state.postInfo.groups = state.postInfo.groups.filter(group => {
        return group.id !== id
      })
    },
    /**
     * 设置编辑模块
     * @param state 
     * @param moduleId 
     */
    setEditModule(state, moduleId: string) {
      state.editModule = <operItem>state.postInfo.layers.find(item => item.id == moduleId)
      if (state.editModule.groupId) {
        let groupId = state.editModule.groupId
        let group = state.postInfo.groups.find(item => {
          return item.id == state.editModule.groupId
        })
        if (!state.group || state.group.id != groupId) {
          state.group = group
        }
      }
    },
    /**
     * 编辑背景
     * @param state 
     */
    setEditModuleToBack(state) {
      state.editModule = state.postInfo.background
    },
    /**
     * 图片裁剪操作
     * @param state 
     * @param val 
     */
    setClipOper(state, val: boolean) {
      state.clipOper = val
    },
    /**
     * 初始化背景
     * @param state 
     */
    initBack(state) {
      state.postInfo.background = {
        id: uuids4(),
        type: 'back',
        color: `white`,
        opacity: 1,
      }
    },
    /**
     * 添加背景图
     * @param state 
     * @param image 
     */
    addBackImage(state, image) {
      state.postInfo.background.image = image
    },
    /**
     * 批量选择
     * @param state 
     * @param position 
     */
    batchSelect(state, position) {
      state.group = { layerIds: new Array<string>(), rotate: 0, type: 'group' }

      let positionInfo = {
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height
      }
      let minLeft = Number.MAX_SAFE_INTEGER
      let maxLeft = Number.MIN_SAFE_INTEGER
      let minTop = Number.MAX_SAFE_INTEGER
      let maxTop = Number.MIN_SAFE_INTEGER
      // let pointList: { left: number, top: number }[] = []
      state.postInfo.layers.forEach(item => {
        if (item.lock) {
          return
        }
        let res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
        let itemPositionInfo = {
          top: res.most.minTop,
          left: res.most.minLeft,
          width: res.most.maxLeft - res.most.minLeft,
          height: res.most.maxTop - res.most.minTop
        }

        if (PositionUtil.getSelectedByPosition(itemPositionInfo, positionInfo)) {
          // console.log(item)
          if (minLeft > itemPositionInfo.left) {
            minLeft = itemPositionInfo.left
          }
          if (minTop > itemPositionInfo.top) {
            minTop = itemPositionInfo.top
          }
          if (maxLeft < itemPositionInfo.left + itemPositionInfo.width) {
            maxLeft = itemPositionInfo.left + itemPositionInfo.width
          }
          if (maxTop < itemPositionInfo.top + itemPositionInfo.height) {
            maxTop = itemPositionInfo.top + itemPositionInfo.height
          }

          if (item.groupId) {

            let group = state.postInfo.groups.find(group => {
              return group.id === item.groupId
            })
            if (group) {
              state.group.layerIds = [...state.group.layerIds, ...group.layerIds]
            }
          } else {
            state.group.layerIds.push(item.id)

          }

        }
      })

      if (state.group.layerIds.length == 0) {
        state.group = undefined
      } else {
        state.group.left = minLeft
        state.group.top = minTop
        state.group.width = maxLeft - minLeft
        state.group.height = maxTop - minTop
      }
    },
    /**
     * 初始化组合尺寸
     * @param state 
     */
    initGroupSize(state) {
      let pointList: { left: number, top: number }[] = []
      state.group.operItems.forEach(operItem => {
        let item = operItem.operItem
        let res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
        pointList.push(res.leftTop)
        pointList.push(res.leftBottom)
        pointList.push(res.rightTop)
        pointList.push(res.rightBottom)
      })
      let anglePositionInfo = PositionUtil.getGroupPositionInfo(pointList, state.group.rotate)
      state.group.width = anglePositionInfo.width
      state.group.height = anglePositionInfo.height
      state.group.top = anglePositionInfo.top
      state.group.left = anglePositionInfo.left
      state.group.operItems = undefined
    },
    /**
     * 做操作
     * @param state 
     */
    lock(state) {
      if (state.group) {
        state.group.layerIds.forEach(id => {
          let layer = state.postInfo.layers.find(item => item.id === id)
          if (layer) {
            layer.lock = true
          }

        })
        if (state.group.id) {
          state.group.lock = true
        } else {
          state.group = undefined
        }
      } else {
        state.editModule.lock = true

      }

    },
    /**
     * 解锁
     * @param state 
     */
    unlock(state) {
      if (state.group) {
        state.group.layerIds.forEach(id => {
          let layer = state.postInfo.layers.find(item => item.id === id)
          if (layer) {
            layer.lock = false
          }

        })
        if (state.group.id) {
          state.group.lock = false
        } else {
          state.group = undefined
        }
      } else {
        state.editModule.lock = false

      }
    },
    /**
     * 删除
     * @param state 
     */
    delete(state) {
      if (state.group) {
        state.group.layerIds.forEach(id => {
          state.postInfo.layers = state.postInfo.layers.filter(item => item.id !== id)
          state.group = undefined
        })
      } else {
        let index = state.editModule.zindex
        state.postInfo.layers.splice(index, 1)
        state.postInfo.layers = [...state.postInfo.layers]
        state.postInfo.layers.forEach((item, index) => {
          item.zindex = index
        })

      }
      state.editModule = state.postInfo.background

    },
    /**
     * 复制
     * @param state 
     */
    copy(state) {
      state.copyLayers = []

      if (state.group) {

        state.group.layerIds.forEach(id => {
          let layer = state.postInfo.layers.find(item => item.id == id)

          if (layer) {

            state.copyLayers.push(_.cloneDeep(layer))
          }
        })
      } else {
        state.copyLayers.push(_.cloneDeep(state.editModule))
      }
    },
    /**
     * 
     * @param state 剪切
     */
    shear(state) {
      state.copyLayers = []

      if (state.group) {

        state.group.layerIds.forEach(id => {
          let layer = state.postInfo.layers.find(item => item.id == id)

          if (layer) {

            state.copyLayers.push(_.cloneDeep(layer))
            state.postInfo.layers = state.postInfo.layers.filter(item => { return item != layer })
          }
        })
        state.editModule = state.postInfo.background
        state.group = undefined
      } else {
        state.postInfo.layers = state.postInfo.layers.filter(item => { return item != state.editModule })
        state.copyLayers.push(_.cloneDeep(state.editModule))
        state.editModule = state.postInfo.background

      }
    },
    /**
     * 粘贴
     * @param state 
     */
    paste(state) {
      if (state.copyLayers.length > 0) {
        state.copyLayers.forEach(layer => {
          let newLayer = _.cloneDeep(layer)
          newLayer.id = uuids4()
          newLayer.zindex = state.postInfo.layers.length
          newLayer.left += 2
          newLayer.top += 2
          delete newLayer['groupId']
          state.postInfo.layers.push(newLayer)
        })
      }
    },
    /**
* 初始化对齐操作图层位置，大小
* @param {*} state
*/
    initAlignGroupSize(state) {
      const pointList = <any>[]
      const layers = state.postInfo.layers
      state.group.rotate = 0
      state.group.layerIds.forEach(id => {
        let item: any = layers.find(layer => { return layer.id === id })
        if (!item) {
          return
        }
        if (item.groupId) {

          item = state.postInfo.groups.find(group => {
            return group.id === item.groupId
          })
          EditUtil.initGroupSize(state, item)
        }
        const res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
        pointList.push(res.leftTop)
        pointList.push(res.leftBottom)
        pointList.push(res.rightTop)
        pointList.push(res.rightBottom)
      })
      const anglePositionInfo = PositionUtil.getGroupPositionInfo(pointList, state.group.rotate)
      state.group.width = anglePositionInfo.width
      state.group.height = anglePositionInfo.height
      state.group.top = anglePositionInfo.top
      state.group.left = anglePositionInfo.left
      // state.group.operItems = undefined
    },
    /**
     * 添加水印
     * @param state 
     */
    addWaterMask(state) {
      state.postInfo.watermark = {
        fontSize: 12,
        space: 4,
        opacity: 10,
        rotate: 10,
        text: 'postcreator',
        cross: 0,
        color: 'rgba(0, 0, 0, 1)'
      }
    },
    /**
     * 去除水印
     * @param state 
     */
    removeWaterMask(state) {
      state.postInfo.watermark = undefined
    },
    /**
     * 横轴移动
     * @param state 
     */
    moveLeft(state, step) {


      if (state.group) {
        if ((state.group && state.group.lock == true)) {
          return
        }
        state.group.left += step
      } else {
        if (state.editModule.type === 'back' || state.editModule.lock) {
          return
        }
        state.editModule.left += step
      }


    },
    /**
   * 纵轴移动
   * @param state 
   */
    moveTop(state, step) {


      if (state.group) {
        if ((state.group && state.group.lock == true)) {
          return
        }
        state.group.top += step
      } else {
        if (state.editModule.type === 'back' || state.editModule.lock) {
          return
        }
        state.editModule.top += step
      }


    },
    /**
     * 全选
     * @param state 
     */
    selectAll(state) {
      let group: any = { layerIds: new Array<string>(), rotate: 0, type: 'group' }


      let minLeft = Number.MAX_SAFE_INTEGER
      let maxLeft = Number.MIN_SAFE_INTEGER
      let minTop = Number.MAX_SAFE_INTEGER
      let maxTop = Number.MIN_SAFE_INTEGER
      // let pointList: { left: number, top: number }[] = []
      state.postInfo.layers.forEach(item => {
        if (item.lock) {
          return
        }
        let res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
        let itemPositionInfo = {
          top: res.most.minTop,
          left: res.most.minLeft,
          width: res.most.maxLeft - res.most.minLeft,
          height: res.most.maxTop - res.most.minTop
        }

        if (minLeft > itemPositionInfo.left) {
          minLeft = itemPositionInfo.left
        }
        if (minTop > itemPositionInfo.top) {
          minTop = itemPositionInfo.top
        }
        if (maxLeft < itemPositionInfo.left + itemPositionInfo.width) {
          maxLeft = itemPositionInfo.left + itemPositionInfo.width
        }
        if (maxTop < itemPositionInfo.top + itemPositionInfo.height) {
          maxTop = itemPositionInfo.top + itemPositionInfo.height
        }

        group.layerIds.push(item.id)
      })

      if (group.layerIds.length != 0) {
        group.left = minLeft
        group.top = minTop
        group.width = maxLeft - minLeft
        group.height = maxTop - minTop
        state.group = group
      }

    },
    /**
     * 多选
     * @param state 
     * @param id 
     */
    multiplechoice(state, moduleId) {
      if (state.editModule && state.editModule.type === 'back') {
        state.editModule = <operItem>state.postInfo.layers.find(item => item.id == moduleId)
        if (state.editModule.groupId) {
          let groupId = state.editModule.groupId
          let group = state.postInfo.groups.find(item => {
            return item.id == state.editModule.groupId
          })
          if (!state.group || state.group.id != groupId) {
            state.group = group
          }
        }
        return
      }
      let layerIds: Array<any> = []
      let group: any = { layerIds: new Array<string>(), rotate: 0, type: 'group' }
      let minLeft = Number.MAX_SAFE_INTEGER
      let maxLeft = Number.MIN_SAFE_INTEGER
      let minTop = Number.MAX_SAFE_INTEGER
      let maxTop = Number.MIN_SAFE_INTEGER
      if (state.group) {
        layerIds = [moduleId, ...state.group.layerIds]
      } else {
        layerIds = [moduleId, state.editModule.id]
      }
      let layerMap: any = {}
      state.postInfo.layers.forEach(item => {
        layerMap[item.id] = item
      })
      layerIds.forEach(id => {
        if (layerMap[id]?.lock) {
          return
        }
        let item = layerMap[id]
        let res = PositionUtil.getPosition(item.left + item.width / 2, item.top + item.height / 2, item.width, item.height, item.rotate)
        let itemPositionInfo = {
          top: res.most.minTop,
          left: res.most.minLeft,
          width: res.most.maxLeft - res.most.minLeft,
          height: res.most.maxTop - res.most.minTop
        }

        if (minLeft > itemPositionInfo.left) {
          minLeft = itemPositionInfo.left
        }
        if (minTop > itemPositionInfo.top) {
          minTop = itemPositionInfo.top
        }
        if (maxLeft < itemPositionInfo.left + itemPositionInfo.width) {
          maxLeft = itemPositionInfo.left + itemPositionInfo.width
        }
        if (maxTop < itemPositionInfo.top + itemPositionInfo.height) {
          maxTop = itemPositionInfo.top + itemPositionInfo.height
        }
        if (item.groupId) {

          let itemgroup = state.postInfo.groups.find(group => {
            return group.id === item.groupId
          })
          if (itemgroup) {
            group.layerIds = [...group.layerIds, ...itemgroup.layerIds]
          }
        } else {
          group.layerIds.push(item.id)

        }


      })
      group.layerIds = [...new Set(group.layerIds)]
      if (group.layerIds.length != 0) {
        if (group.layerIds.length === 1) {
          state.editModule = layerMap[group.layerIds[0]]
          state.group = undefined
          return
        }
        group.left = minLeft
        group.top = minTop
        group.width = maxLeft - minLeft
        group.height = maxTop - minTop
        state.group = group
      }

    },
    setTextBack(state, src) {
      if (state.editModule.type === 'text') {
        state.editModule.backImage = src
        delete state.editModule.gradient
        delete state.editModule.gradientAngle
      }

    },
    cancelTextBack(state, src) {
      if (state.editModule.type === 'text') {
        delete state.editModule.backImage
      }

    },
    /**
    * 
    * @param state 添加文字渐变
    */
    addTextGradient(state) {
      let editModule = state.editModule
      if (editModule.type !== 'text') {
        return
      }
      delete editModule.backImage
      editModule.gradient = [{ offset: 0, color: editModule.color }, { offset: 1, color: 'rgb(255,255,255)' }]
      editModule.gradientAngle = 90
    },
    /**
    * 
    * @param state 删除文字渐变
    */
    removeTextGradient(state) {
      let editModule = state.editModule
      if (editModule.type !== 'text') {
        return
      }
      delete editModule.gradient
      delete editModule.gradientAngle
    },
    removeMask(state) {
      delete state.editModule.mask
    },
    addFilter(state, type) {
      state.editModule.filterInfo = { type: type }
    },
    removeFilter(state) {
      delete state.editModule.filterInfo
    }
  },
  getters: {
    canCopy(state) {
      if (state.editModule && state.editModule.lock) {
        return false
      }
      if (state.group && state.group.lock) {
        return false
      }
      if (state.group || (state.editModule && state.editModule.type !== 'back')) {

        return true
      }
      return false
    },
    canPast(state) {
      if (state.copyLayers.length > 0) {
        return true
      }
      return false
    },
    canDelete(state) {
      if (state.editModule && state.editModule.lock) {
        return false
      }
      if (state.group && state.group.lock) {
        return false
      }
      if (state.group || (state.editModule && state.editModule.type !== 'back')) {
        return true
      }
      return false
    },
    canLock(state) {
      if (state.editModule && state.editModule.lock) {
        return false
      }
      if (state.group && state.group.lock) {
        return false
      }
      if (state.group || (state.editModule && state.editModule.type !== 'back')) {
        return true
      }
      return false
    },
    /**
   * 是否能进行分布操作
   * @param {} state
   */
    distribution(state) {
      const layerInfo: any = {}
      const moduleIds: any = []
      const layers = state.postInfo.layers
      layers.forEach(item => {
        layerInfo[item.id] = item
      })
      if (!state.group || state.group.id) {
        return false
      }
      state.group.layerIds.forEach(item => {
        if (layerInfo[item].groupId) {
          moduleIds.push(layerInfo[item].groupId)
        } else {
          moduleIds.push(item)
        }
      })
      return [...new Set(moduleIds)].length > 2
    },

  },
  actions: {

  },
  modules: {
  }
})
