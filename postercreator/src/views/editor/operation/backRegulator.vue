<template>
  <div
    class="item-list"
    draggable="false"
    v-if="(!module.lock && !group) || module.type == 'group'"
  >
    <div
      class="item"
      @mousedown.stop="controlshape('left-top')"
      :style="{
        cursor: cursor.leftTop,
        left: `-${module.left}px`,
        top: `-${module.top}px`,
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>

    <div
      class="item"
      @mousedown.stop="controlshape('left-down')"
      :style="{
        cursor: cursor.leftDown,
        left: `-${module.left}px`,
        top: module.height - module.top + 'px',
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>

    <div
      class="item"
      @mousedown.stop="controlshape('right-top')"
      :style="{
        cursor: cursor.rightTop,
        left: module.width - module.left + 'px',
        top: `-${module.top}px`,
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>

    <div
      class="item"
      @mousedown.stop="controlshape('right-down')"
      :style="{
        cursor: cursor.rightDown,
        left: module.width - module.left + 'px',
        top: module.height - module.top + 'px',
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: {
    module: {
      type: Object,
      default: new Object(),
    },
  },
  setup(props) {
    const store = useStore();
    const moveScale = computed(() => {
      return 100 / store.state.scale;
    });
    const module: any = computed(() => {
      return props.module;
    });
    const group: any = computed(() => {
      return store.state.group;
    });
    let cursor = computed(() => {
      let rotate = 0;
      let result: any = {};
      if ((rotate < 25 && rotate >= 0) || (rotate < 360 && rotate >= 340)) {
        result.leftTop = "nw-resize";
        result.middleTop = "n-resize";
        result.rightTop = "ne-resize";
        result.rightMiddle = "e-resize";
        result.rightDown = "nw-resize";
        result.middleDown = "n-resize";
        result.leftDown = "ne-resize";
        result.leftMiddle = "e-resize";
      }
      if (rotate < 70 && rotate >= 25) {
        result.leftTop = "n-resize";
        result.middleTop = "ne-resize";
        result.rightTop = "e-resize";
        result.rightMiddle = "nw-resize";
        result.rightDown = "n-resize";
        result.middleDown = "ne-resize";
        result.leftDown = "e-resize";
        result.leftMiddle = "nw-resize";
      }
      if (rotate < 115 && rotate >= 70) {
        result.leftTop = "ne-resize";
        result.middleTop = "e-resize";
        result.rightTop = "nw-resize";
        result.rightMiddle = "n-resize";
        result.rightDown = "ne-resize";
        result.middleDown = "e-resize";
        result.leftDown = "nw-resize";
        result.leftMiddle = "n-resize";
      }
      if (rotate < 160 && rotate >= 115) {
        result.leftTop = "e-resize";
        result.middleTop = "nw-resize";
        result.rightTop = "n-resize";
        result.rightMiddle = "ne-resize";
        result.rightDown = "e-resize";
        result.middleDown = "nw-resize";
        result.leftDown = "n-resize";
        result.leftMiddle = "ne-resize";
      }
      if (rotate < 205 && rotate >= 160) {
        result.leftTop = "nw-resize";
        result.middleTop = "n-resize";
        result.rightTop = "ne-resize";
        result.rightMiddle = "e-resize";
        result.rightDown = "nw-resize";
        result.middleDown = "n-resize";
        result.leftDown = "ne-resize";
        result.leftMiddle = "e-resize";
      }
      if (rotate < 250 && rotate >= 205) {
        result.leftTop = "n-resize";
        result.middleTop = "ne-resize";
        result.rightTop = "e-resize";
        result.rightMiddle = "nw-resize";
        result.rightDown = "n-resize";
        result.middleDown = "ne-resize";
        result.leftDown = "e-resize";
        result.leftMiddle = "nw-resize";
      }
      if (rotate < 295 && rotate >= 250) {
        result.leftTop = "ne-resize";
        result.middleTop = "e-resize";
        result.rightTop = "nw-resize";
        result.rightMiddle = "n-resize";
        result.rightDown = "ne-resize";
        result.middleDown = "e-resize";
        result.leftDown = "nw-resize";
        result.leftMiddle = "n-resize";
      }
      if (rotate < 340 && rotate >= 295) {
        result.leftTop = "e-resize";
        result.middleTop = "nw-resize";
        result.rightTop = "n-resize";
        result.rightMiddle = "ne-resize";
        result.rightDown = "e-resize";
        result.middleDown = "nw-resize";
        result.leftDown = "n-resize";
        result.leftMiddle = "ne-resize";
      }
      return result;
    });
    const controlshape = (direction: string) => {
      let canvas = store.state.postInfo.canvas;
      const event: MouseEvent = <MouseEvent>window.event;
      let oriX = event.clientX;
      let oriTop = module.value.top;
      let oriLeft = module.value.left;
      let width = module.value.width;
      let height = module.value.height;
      let rate = width / height;
      let oriMinTopHeight = module.value.height - oriTop;
      let oriMinLeftWidth = module.value.width - oriLeft;
      if (direction == "right-down") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let minWidth = oriLeft + canvas.width;
          let minHeight = oriTop + canvas.height;
          if (minWidth / rate >= minHeight) {
            minHeight = minWidth / rate;
          } else {
            minWidth = minHeight * rate;
          }

          let newWidth = width + (X - oriX) * moveScale.value;
          let newHeight = module.value.width / rate;
          if (newWidth < minWidth || newHeight < minHeight) {
            module.value.width = minWidth;
            module.value.height = minHeight;
          } else {
            module.value.width = newWidth;
            module.value.height = newHeight;
          }
        };
      } else if (direction == "right-top") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let minWidth = oriLeft + canvas.width;
          let minHeight = oriMinTopHeight;
          if (minWidth / rate >= minHeight) {
            minHeight = minWidth / rate;
          } else {
            minWidth = minHeight * rate;
          }
          let newWidth = width + (X - oriX) * moveScale.value;
          let newHeight = module.value.width / rate;
          if (newWidth < minWidth || newHeight < minHeight) {
            module.value.width = minWidth;
            module.value.height = minHeight;
            module.value.top = oriTop + module.value.height - height;
          } else {
            module.value.width = newWidth;
            module.value.height = newHeight;
            module.value.top = oriTop + module.value.height - height;
          }
        };
      } else if (direction == "left-top") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let minWidth = oriMinLeftWidth;
          let minHeight = oriMinTopHeight;
          if (minWidth / rate >= minHeight) {
            minHeight = minWidth / rate;
          } else {
            minWidth = minHeight * rate;
          }
          let newWidth = width - (X - oriX) * moveScale.value;
          let newHeight = module.value.width / rate;
          if (newWidth < minWidth || newHeight < minHeight) {
            module.value.width = minWidth;
            module.value.height = minHeight;
            module.value.left = oriLeft + module.value.width - width;
            module.value.top = oriTop + module.value.height - height;
          } else {
            module.value.width = newWidth;
            module.value.height = newHeight;
            module.value.left = oriLeft + module.value.width - width;
            module.value.top = oriTop + module.value.height - height;
          }
        };
      } else if (direction == "left-down") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let minHeight = oriTop + canvas.height;
          let minWidth = oriMinLeftWidth;
          if (minWidth / rate >= minHeight) {
            minHeight = minWidth / rate;
          } else {
            minWidth = minHeight * rate;
          }
          let newWidth = width - (X - oriX) * moveScale.value;
          let newHeight = module.value.width / rate;
          if (newWidth < minWidth || newHeight < minHeight) {
            module.value.width = minWidth;
            module.value.height = minHeight;
            module.value.left = oriLeft + module.value.width - width;
          } else {
            module.value.width = newWidth;
            module.value.height = newHeight;
            module.value.left = oriLeft + module.value.width - width;
          }
        };
      }

      window.onmouseup = () => {
        window.onmousemove = null;
        window.onmouseup = null;

        module.value.left = Math.round(module.value.left);
        module.value.height = Math.round(module.value.height);
        module.value.width = Math.round(module.value.width);
        module.value.top = Math.round(module.value.top);
      };
    };
    return { cursor, moveScale, controlshape, group };
  },
});
</script>

<style lang="scss" scoped>
.item {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(0, 194, 253);
  z-index: 999;
  cursor: pointer;
}

.item-list {
  border: 1px solid rgb(0, 140, 255);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
}
</style>