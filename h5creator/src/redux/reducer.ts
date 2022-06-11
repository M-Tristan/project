
import { combineReducers } from 'redux'
import editInfo from './edit'
import { v4 as uuidv4 } from 'uuid';
import { operItem } from '../interface/module';
let initState: any = {
  clipOper: false,
  scale: 100,
  keyframe: ""
}
function H5Edit(state = initState, action: any) {
  switch (action.type) {
    case 'addText':
      addText(state, action.text)
      return { ...state }
    case 'addImage':
      addImage(state, action.image)
      return { ...state }
    case 'addCode':
      addCode(state, action.code)
      return { ...state }
    case 'addChart':
      addChart(state, action.chart)
      return { ...state }
    case 'addShape':
      addShape(state, action.shape)
      return { ...state }
    case 'selectBackColor':
      selectBackColor(state, action.color)
      return { ...state }
    case 'addBackImage':
      addBackImage(state, action.image)
      return { ...state }
    case 'addInput':
      addInput(state, action.input)
      return { ...state }
    case 'addOption':
      addOption(state, action.option)
      return { ...state }
    case 'addButton':
      addButton(state, action.button)
      return { ...state }
    case 'addTime':
      addDateTime(state, action.datetime)
      return { ...state }
    case 'addVedio':
      addVedio(state, action.vedio)
      return { ...state }

    case 'initEdit':
      initEdit(action.page)
      return { ...state }
    case 'setEditModule':
      setEditModule(state, action.moduleId)
      return { ...state }
    case 'previewAnimation':
      state.keyframe = action.keyframe
      return { ...state }
    case 'delete':
      deleteModule(state)
      return { ...state }
    case 'updatEdit':
      // console.log(editInfo)
      return { ...state }
    case 'setClipOper':
      state.clipOper = action.value
      return { ...state }
    case 'setScale':
      state.scale = action.value
      return { ...state }
    default:
      return state
  }
}
initEdit()
function addBackImage(state: any, image: any) {
  editInfo.postInfo.background.image = image
  editInfo.postInfo.background.color = undefined
  editInfo.editModule = editInfo.postInfo.background
}
function selectBackColor(state: any, color: any) {
  editInfo.postInfo.background.color = color
  editInfo.postInfo.background.image = undefined
  editInfo.editModule = editInfo.postInfo.background
}
function addShape(state: any, shape: any) {
  shape.type = 'shape'
  shape.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(shape)
  editInfo.editModule = shape
}
function addChart(state: any, chart: any) {
  chart.type = 'chart'
  chart.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(chart)
  editInfo.editModule = chart
}
function addInput(state: any, input: any) {
  input.type = 'input'
  input.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(input)
  editInfo.editModule = input
}
function addOption(state: any, input: any) {
  input.type = 'options'
  input.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(input)
  editInfo.editModule = input
}
function addButton(state: any, button: any) {
  button.type = 'button'
  button.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(button)
  editInfo.editModule = button
}
function addDateTime(state: any, datetime: any) {
  datetime.type = 'datetime'
  datetime.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(datetime)
  editInfo.editModule = datetime
}
function addVedio(state: any, vedio: any) {
  vedio.type = 'vedio'
  vedio.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(vedio)
  editInfo.editModule = vedio
}

function addCode(state: any, code: any) {
  code.type = 'code'
  code.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(code)
  editInfo.editModule = code
}
function addImage(state: any, image: any) {
  image.type = 'image'
  image.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(image)
  editInfo.editModule = image
}
function addText(state: any, text: any) {
  text.type = 'text'
  text.zindex = editInfo.postInfo.layers.length
  editInfo.postInfo.layers.push(text)
  editInfo.editModule = text

}
function setEditModule(state: any, moduleId: string) {
  editInfo.editModule = editInfo.postInfo.layers.find(item => item.id === moduleId)

}
function deleteModule(state: any) {
  let postInfo = editInfo.postInfo
  postInfo.layers.forEach((item, index) => {
    item.zindex = index
  })

  postInfo.layers = postInfo.layers.filter(layer => {
    return layer.id !== editInfo.editModule.id
  })
  postInfo.layers.forEach((item, index) => {
    item.zindex = index
  })
  editInfo.editModule = postInfo.background
}
function initEdit(pages = [] as any) {
  let page = pages[0]
  if (!page) {
    page = {
      layers: [] as operItem[],
      background: {
        id: uuidv4(),
        type: 'back',
        opacity: 1
      },
      canvas: {
        width: 375,
        height: 630
      }
    }
  }
  //  console.log(page)
  editInfo.postInfo = page
  editInfo.editModule = page.background
  editInfo.postList = pages
}


export default combineReducers({
  H5Edit
})
