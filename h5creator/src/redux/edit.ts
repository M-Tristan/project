
import { operItem, postInfo } from "../interface/module"
import { v4 as uuidv4 } from 'uuid';
import { updateJsonById } from '../api/api'
import { message } from 'antd';
let modelInfo: any = {}
let editInfo = {
  postInfo: {

  } as postInfo,
  postList: new Array<postInfo>(),
  editModule: {} as any,//当前编辑模块
}

export class EditUtil {
  static addPage() {
    let page = {
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
    editInfo.postInfo = page
    editInfo.editModule = page.background
    editInfo.postList.push(page)
  }
  static selectPageByIndex(index: number) {
    let page = editInfo.postList[index]
    editInfo.postInfo = page
    editInfo.editModule = page.background
  }
  static deletePageByIndex(index: number) {
    editInfo.postList.splice(index, 1)
    let page = editInfo.postList[0]
    editInfo.postInfo = page
    editInfo.editModule = page.background
  }

  static getModuleById(id: string) {
    return editInfo.postInfo.layers.find(item => item.id === id)
  }
  static getNewPageJson() {
    return JSON.stringify([{
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
    }])
  }
  static saveModelInfo(info: any) {
    modelInfo = info
  }
  static async saveJson() {
    let res = await updateJsonById({ id: modelInfo.jsonId, json: JSON.stringify(editInfo.postList) })
    if (res === 200) {
      message.success('保存成功')
    } else {
      message.success(res.msg)
    }

  }


}

export default editInfo