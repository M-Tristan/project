<template>
  <div
    class="group-content"
    @mousedown="moveEvent"
    :style="{
      width: module.width + 'px',
      height: module.height + 'px',
      left: module.left + 'px',
      top: module.top + 'px',
      transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    }"
  >
    <lock :module="module"></lock>
    <regulator
      :module="module"
      @change="sizeChange"
      v-if="!module.lock"
    ></regulator>
    <rotate
      @change="resetGroupItem"
      :module="module"
      v-if="!module.lock"
    ></rotate>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  watch,
} from "vue";
import regulator from "./regulator.vue";
import rotate from "./rotate.vue";
import operation from "./common/operation";
import MathUtil from "@/lib/MathUtil";
import PositionUtil from "@/lib/PositionUtil";
import Lock from "./lock.vue";
export default defineComponent({
  components: {
    regulator,
    rotate,
    Lock,
  },
  props: {
    group: {
      type: Object,
      default: new Object(),
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    let parameter = {
      groupInfos: <any>[],
    };
    const store = useStore();
    const module: any = computed(() => {
      return props.group;
    });
    const { moduleMove } = operation();

    const resetOperItems = () => {
      parameter = {
        groupInfos: [],
      };
      let groupIds = <any>[];

      let layers = {} as any;
      let moduleCenerPosition = PositionUtil.getCenterPosition(
        module.value.left,
        module.value.top,
        module.value.width,
        module.value.height
      );
      store.state.postInfo.layers.forEach((item) => {
        layers[item.id] = item;
      });
      module.value.operItems = [];
      module.value.layerIds.forEach((layerId) => {
        let operItem = layers[layerId];
        if (operItem.groupId && operItem.groupId !== module.value.id) {
          groupIds.push(operItem.groupId);
        }
        let itemLengthInfo = PositionUtil.getPositionInfoByTwoPoint(
          moduleCenerPosition,
          PositionUtil.getCenterPosition(
            operItem.left,
            operItem.top,
            operItem.width,
            operItem.height
          )
        );
        let innerAngle = itemLengthInfo.angle - module.value.rotate;
        let groupItem: any = {
          centerLeft:
            (itemLengthInfo.length * MathUtil.cos(innerAngle) +
              module.value.width / 2) /
            module.value.width,
          centerTop:
            (module.value.height / 2 +
              itemLengthInfo.length * MathUtil.sin(innerAngle)) /
            module.value.height,
          height: operItem.height / module.value.height,
          operItem: operItem,
          rotate: operItem.rotate - module.value.rotate,
          width: operItem.width / module.value.width,
        };
        if (operItem.type == "text" || operItem.type == "effectText") {
          groupItem.fontSize = operItem.fontSize / module.value.width;
          groupItem.letterSpacing = operItem.letterSpacing / module.value.width;
        }
        module.value.operItems.push(groupItem);
        parameter[operItem.id] = groupItem;
      });
      groupIds = new Set(groupIds);
      groupIds.forEach((id) => {
        const group = store.state.postInfo.groups.find((item) => {
          return item.id === id;
        });

        parameter.groupInfos.push({
          id: id,
          rotate: group.rotate - module.value.rotate,
          group: group,
        });
      });
    };
    onBeforeUnmount(() => {
      proxy?.$emitter.off("resetOperItems", resetOperItems);
    });
    onMounted(() => {
      proxy?.$emitter.on("resetOperItems", resetOperItems);
      if (!module.value.operItems) {
        resetOperItems();
        store.commit("initGroupSize");
      }
      // Window.prototype.onanimationend = () => {
      //   store.commit("initGroupSize");
      // };
    });
    const resetGroupItem = () => {
      if (!module.value.operItems) {
        resetOperItems();
      }
      parameter.groupInfos.forEach((item) => {
        item.group.rotate = (item.rotate + module.value.rotate) % 360;
      });
      module.value.operItems.forEach((item) => {
        item.operItem.rotate = (item.rotate + module.value.rotate) % 360;
        let width = (item.centerLeft - 0.5) * module.value.width;
        let height = (0.5 - item.centerTop) * module.value.height;
        let hypotenuse = MathUtil.getHypotenuse(width, height);
        let innerAngle = 0;
        if (item.centerTop != 0.5) {
          innerAngle = MathUtil.atan(height / width) - 180;
        }
        if (item.centerLeft < 0.5) {
          innerAngle += 180;
        }
        let angle = innerAngle - module.value.rotate;
        let centerPosition = PositionUtil.getPositionbyCenter(
          angle,
          hypotenuse,
          {
            left: module.value.left + module.value.width / 2,
            top: module.value.top + module.value.height / 2,
          }
        );
        item.operItem.left = centerPosition.left - item.operItem.width / 2;
        item.operItem.top = centerPosition.top - item.operItem.height / 2;
      });
    };
    const sizeChange = () => {
      if (!module.value.operItems) {
        resetOperItems();
      }
      module.value.operItems.forEach((item) => {
        item.operItem.width = item.width * module.value.width;
        item.operItem.height = item.height * module.value.height;
        if (
          item.operItem.type == "text" ||
          item.operItem.type == "effectText"
        ) {
          item.operItem.fontSize = item.fontSize * module.value.width;
          item.operItem.letterSpacing = item.letterSpacing * module.value.width;
        }
      });
      resetGroupItem();
    };
    const moveEvent = () => {
      moduleMove(module.value);
      // ();
    };

    watch(
      () => module.value.layerIds,
      (nv, ov) => {
        resetOperItems();
        resetGroupItem();
      }
    );
    watch(
      () => module.value.left,
      (nv, ov) => {
        resetGroupItem();
      }
    );
    watch(
      () => module.value.top,
      (nv, ov) => {
        resetGroupItem();
      }
    );
    watch(
      () => module.value.id,
      (nv, ov) => {
        resetOperItems();
        resetGroupItem();
      }
    );
    return { module, moveEvent, sizeChange, resetGroupItem };
  },
});
</script>

<style scoped>
.group-content {
  position: absolute;
  /* border: 1px solid blue; */
  /* background-color: rgba(0, 255, 255, 0.356); */
  z-index: 0;
}
</style>
