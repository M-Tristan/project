import { operItem } from "@/interface/module"
import MathUtil from "@/lib/MathUtil"
import PositionUtil from "@/lib/PositionUtil"
import _ from "lodash"
import { computed } from "vue"
import { useStore } from "vuex"

const operation = () => {
  const store = useStore()
  const moveScale = computed(() => {
    return 100 / store.state.scale
  })
  const moduleMove = (module: operItem) => {
    let event = <MouseEvent>window.event
    let controlModule = module
    if (event.ctrlKey || event.shiftKey) {
      store.commit("multiplechoice", controlModule.id);
      return
    }

    if (controlModule.type != 'group') {
      store.commit("setEditModule", controlModule.id);
      store.state.group = undefined
    }
    if (module.groupId) {
      let editmodule = store.state.postInfo.groups.find(item => {
        return item.id == module.groupId
      })
      store.state.group = editmodule
      module = store.state.group
      resetOperItems(module);
      store.commit("initGroupSize");
      resetOperItems(module);
    }
    if (module.lock) {
      return
    }


    let oriX = event.clientX
    let oriY = event.clientY
    let orileft = module.left
    let oritop = module.top
    let shouldPushBack = false
    window.onmousemove = (event: MouseEvent) => {
      let X = event.clientX
      let Y = event.clientY
      module.left = orileft + (X - oriX) * moveScale.value
      module.top = oritop + (Y - oriY) * moveScale.value
      shouldPushBack = true
      if (store.state.group) {
        resetGroupItem(module)
      }
    }
    window.onmouseup = () => {
      window.onmousemove = null
      window.onmouseup = null
      module.left = Math.round(module.left)
      module.height = Math.round(module.height)
      module.width = Math.round(module.width)
      module.top = Math.round(module.top)
      if (store.state.group) {
        resetGroupItem(module)
      }

      if (!controlModule.groupId && controlModule.type != 'group') {
        store.state.group = undefined
      }
      if (shouldPushBack) {
        pushBack()
      }

    }
  }
  const pushBack = () => {
    store.commit('pushBack');
  }
  /**
   * 初始化组合内图层信息
   * @param module 
   */
  const resetOperItems = (module: any) => {
    let layers = {} as any;
    let moduleCenerPosition = PositionUtil.getCenterPosition(
      module.left,
      module.top,
      module.width,
      module.height
    );
    store.state.postInfo.layers.forEach((item) => {
      layers[item.id] = item;
    });
    module.operItems = [];
    module.layerIds.forEach((layerId) => {
      let operItem = layers[layerId];
      let itemLengthInfo = PositionUtil.getPositionInfoByTwoPoint(
        moduleCenerPosition,
        PositionUtil.getCenterPosition(
          operItem.left,
          operItem.top,
          operItem.width,
          operItem.height
        )
      );
      let innerAngle = itemLengthInfo.angle - module.rotate;
      let groupItem: any = {
        centerLeft:
          (itemLengthInfo.length * MathUtil.cos(innerAngle) +
            module.width / 2) /
          module.width,
        centerTop:
          (module.height / 2 +
            itemLengthInfo.length * MathUtil.sin(innerAngle)) /
          module.height,
        height: operItem.height / module.height,
        operItem: operItem,
        rotate: operItem.rotate - module.rotate,
        width: operItem.width / module.width,
      };
      if (operItem.type == "text" || operItem.type == "effectText") {
        groupItem.fontSize = operItem.fontSize / module.width;
        groupItem.letterSpacing = operItem.letterSpacing / module.width;
      }
      module.operItems.push(groupItem);
    });
  };
  /**
   * 重置图层位置大小
   * @param module 
   */
  const resetGroupItem = (module: any) => {
    if (!module.operItems) {
      resetOperItems(module);
    }
    module.operItems.forEach((item) => {
      item.operItem.rotate = (item.rotate + module.rotate) % 360;
      let width = (item.centerLeft - 0.5) * module.width;
      let height = (0.5 - item.centerTop) * module.height;
      let hypotenuse = MathUtil.getHypotenuse(width, height);
      let innerAngle = 0;
      if (item.centerTop != 0.5) {
        innerAngle = MathUtil.atan(height / width) - 180;
      }
      if (item.centerLeft < 0.5) {
        innerAngle += 180;
      }
      let angle = innerAngle - module.rotate;
      let centerPosition = PositionUtil.getPositionbyCenter(
        angle,
        hypotenuse,
        {
          left: module.left + module.width / 2,
          top: module.top + module.height / 2,
        }
      );
      item.operItem.left = centerPosition.left - item.operItem.width / 2;
      item.operItem.top = centerPosition.top - item.operItem.height / 2;
    });
  };
  const debouncePushBack = _.debounce(() => {
    pushBack()
  }, 500)
  return { moduleMove, pushBack, debouncePushBack, resetGroupItem }
}

export default operation