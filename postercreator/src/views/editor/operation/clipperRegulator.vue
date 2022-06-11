<template>
  <div class="item-list">
    <div
      class="item"
      @mousedown.stop="controlshape('left-top')"
      :style="{
        cursor: cursor.leftTop,
        left: 0 + 'px',
        top: 0 + 'px',
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>
    <div
      class="item-vertical"
      @mousedown.stop="controlshape('left-middle')"
      :style="{
        cursor: cursor.leftMiddle,
        left: 0 + 'px',
        top: module.height / 2 + 'px',
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>
    <div
      class="item"
      @mousedown.stop="controlshape('left-down')"
      :style="{
        cursor: cursor.leftDown,
        left: 0 + 'px',
        top: module.height + 'px',
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>
    <div
      class="item-Horizontal"
      @mousedown.stop="controlshape('middle-top')"
      :style="{
        cursor: cursor.middleTop,
        left: module.width / 2 + 'px',
        top: 0 + 'px',
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>
    <div
      class="item-Horizontal"
      @mousedown.stop="controlshape('middle-down')"
      :style="{
        cursor: cursor.middleDown,
        left: module.width / 2 + 'px',
        top: module.height + 'px',
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>
    <div
      class="item"
      @mousedown.stop="controlshape('right-top')"
      :style="{
        cursor: cursor.rightTop,
        left: module.width + 'px',
        top: '0px',
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>
    <div
      class="item-vertical"
      @mousedown.stop="controlshape('right-middle')"
      :style="{
        cursor: cursor.rightMiddle,
        left: module.width + 'px',
        top: module.height / 2 + 'px',
        transform: `translateX(-50%) translateY(-50%) scale(${moveScale})`,
      }"
    ></div>
    <div
      class="item"
      @mousedown.stop="controlshape('right-down')"
      :style="{
        cursor: cursor.rightDown,
        left: module.width + 'px',
        top: module.height + 'px',
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
  setup(props, { emit }) {
    const store = useStore();
    const moveScale = computed(() => {
      return 100 / store.state.scale;
    });

    const module: any = computed(() => {
      return props.module;
    });
    // module.value.rotate = 0
    let cursor = computed(() => {
      let result: any = {};
      if (
        (module.value.rotate < 25 && module.value.rotate >= 0) ||
        (module.value.rotate < 360 && module.value.rotate >= 340)
      ) {
        result.leftTop = "nw-resize";
        result.middleTop = "n-resize";
        result.rightTop = "ne-resize";
        result.rightMiddle = "e-resize";
        result.rightDown = "nw-resize";
        result.middleDown = "n-resize";
        result.leftDown = "ne-resize";
        result.leftMiddle = "e-resize";
      }
      if (module.value.rotate < 70 && module.value.rotate >= 25) {
        result.leftTop = "n-resize";
        result.middleTop = "ne-resize";
        result.rightTop = "e-resize";
        result.rightMiddle = "nw-resize";
        result.rightDown = "n-resize";
        result.middleDown = "ne-resize";
        result.leftDown = "e-resize";
        result.leftMiddle = "nw-resize";
      }
      if (module.value.rotate < 115 && module.value.rotate >= 70) {
        result.leftTop = "ne-resize";
        result.middleTop = "e-resize";
        result.rightTop = "nw-resize";
        result.rightMiddle = "n-resize";
        result.rightDown = "ne-resize";
        result.middleDown = "e-resize";
        result.leftDown = "nw-resize";
        result.leftMiddle = "n-resize";
      }
      if (module.value.rotate < 160 && module.value.rotate >= 115) {
        result.leftTop = "e-resize";
        result.middleTop = "nw-resize";
        result.rightTop = "n-resize";
        result.rightMiddle = "ne-resize";
        result.rightDown = "e-resize";
        result.middleDown = "nw-resize";
        result.leftDown = "n-resize";
        result.leftMiddle = "ne-resize";
      }
      if (module.value.rotate < 205 && module.value.rotate >= 160) {
        result.leftTop = "nw-resize";
        result.middleTop = "n-resize";
        result.rightTop = "ne-resize";
        result.rightMiddle = "e-resize";
        result.rightDown = "nw-resize";
        result.middleDown = "n-resize";
        result.leftDown = "ne-resize";
        result.leftMiddle = "e-resize";
      }
      if (module.value.rotate < 250 && module.value.rotate >= 205) {
        result.leftTop = "n-resize";
        result.middleTop = "ne-resize";
        result.rightTop = "e-resize";
        result.rightMiddle = "nw-resize";
        result.rightDown = "n-resize";
        result.middleDown = "ne-resize";
        result.leftDown = "e-resize";
        result.leftMiddle = "nw-resize";
      }
      if (module.value.rotate < 295 && module.value.rotate >= 250) {
        result.leftTop = "ne-resize";
        result.middleTop = "e-resize";
        result.rightTop = "nw-resize";
        result.rightMiddle = "n-resize";
        result.rightDown = "ne-resize";
        result.middleDown = "e-resize";
        result.leftDown = "nw-resize";
        result.leftMiddle = "n-resize";
      }
      if (module.value.rotate < 340 && module.value.rotate >= 295) {
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
      const event: MouseEvent = <MouseEvent>window.event;
      let oriX = event.clientX;
      let oriY = event.clientY;
      let oriTop = module.value.top;
      let oriLeft = module.value.left;
      let width = module.value.width;
      let height = module.value.height;
      let cos = Math.cos((module.value.rotate / 180) * Math.PI);
      let sin = Math.sin((module.value.rotate / 180) * Math.PI);
      let oriShowTop = module.value.showTop;
      let oriShowLeft = module.value.showLeft;
      let showWidth = module.value.showWidth;
      let showHeigth = module.value.showHeigth;
      if (direction == "right-down") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let Y = event.clientY;
          let newWidth =
            width +
            (X - oriX) * moveScale.value * cos +
            (Y - oriY) * moveScale.value * sin;
          let newHeight =
            height -
            (X - oriX) * moveScale.value * sin +
            (Y - oriY) * moveScale.value * cos;
          if (newHeight + oriShowTop >= showHeigth) {
            newHeight = showHeigth - oriShowTop;
          }
          if (newWidth + oriShowLeft >= showWidth) {
            newWidth = showWidth - oriShowLeft;
          }
          module.value.width = newWidth > 20 ? newWidth : 20;
          module.value.left =
            oriLeft - ((module.value.width - width) * (1 - cos)) / 2;
          module.value.top = oriTop + ((module.value.width - width) * sin) / 2;
          module.value.height = newHeight > 40 ? newHeight : 40;
          module.value.left =
            module.value.left - ((module.value.height - height) * sin) / 2;
          module.value.top =
            module.value.top - ((module.value.height - height) * (1 - cos)) / 2;
        };
      } else if (direction == "right-middle") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let Y = event.clientY;
          let newWidth =
            width +
            (X - oriX) * moveScale.value * cos +
            (Y - oriY) * moveScale.value * sin;
          if (newWidth + oriShowLeft >= showWidth) {
            newWidth = showWidth - oriShowLeft;
          }
          module.value.width = newWidth > 20 ? newWidth : 20;
          module.value.left =
            oriLeft - ((module.value.width - width) * (1 - cos)) / 2;
          module.value.top = oriTop + ((module.value.width - width) * sin) / 2;
        };
      } else if (direction == "right-top") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let Y = event.clientY;
          let newWidth =
            width +
            (X - oriX) * moveScale.value * cos +
            (Y - oriY) * moveScale.value * sin;
          let newHeight =
            height +
            (X - oriX) * moveScale.value * sin -
            (Y - oriY) * moveScale.value * cos;
          if (oriShowTop - newHeight + height <= 0) {
            newHeight = oriShowTop + height;
          }
          if (newWidth + oriShowLeft >= showWidth) {
            newWidth = showWidth - oriShowLeft;
          }
          module.value.width = newWidth > 20 ? newWidth : 20;
          module.value.left =
            oriLeft - ((module.value.width - width) * (1 - cos)) / 2;
          module.value.top = oriTop + ((module.value.width - width) * sin) / 2;
          module.value.height = newHeight > 40 ? newHeight : 40;
          module.value.left =
            module.value.left + ((module.value.height - height) * sin) / 2;
          module.value.top =
            module.value.top - ((module.value.height - height) * (1 + cos)) / 2;
          module.value.showTop = oriShowTop - module.value.height + height;
        };
      } else if (direction == "middle-down") {
        window.onmousemove = (event: MouseEvent) => {
          let Y = event.clientY;
          let X = event.clientX;
          let newHeight =
            height -
            (X - oriX) * moveScale.value * sin +
            (Y - oriY) * moveScale.value * cos;
          if (newHeight + oriShowTop >= showHeigth) {
            newHeight = showHeigth - oriShowTop;
          }
          module.value.height = newHeight > 40 ? newHeight : 40;
          module.value.left =
            oriLeft - ((module.value.height - height) * sin) / 2;
          module.value.top =
            oriTop - ((module.value.height - height) * (1 - cos)) / 2;
        };
      } else if (direction == "middle-top") {
        window.onmousemove = (event: MouseEvent) => {
          let Y = event.clientY;
          let X = event.clientX;
          let newHeight =
            height +
            (X - oriX) * moveScale.value * sin -
            (Y - oriY) * moveScale.value * cos;
          if (oriShowTop - newHeight + height <= 0) {
            newHeight = oriShowTop + height;
          }
          module.value.height = newHeight > 40 ? newHeight : 40;
          module.value.left =
            oriLeft + ((module.value.height - height) * sin) / 2;
          module.value.top =
            oriTop - ((module.value.height - height) * (1 + cos)) / 2;
          module.value.showTop = oriShowTop - module.value.height + height;
        };
      } else if (direction == "left-top") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let Y = event.clientY;
          let newWidth =
            width -
            (X - oriX) * moveScale.value * cos -
            (Y - oriY) * moveScale.value * sin;
          let newHeight =
            height +
            (X - oriX) * moveScale.value * sin -
            (Y - oriY) * moveScale.value * cos;
          if (oriShowLeft - newWidth + width <= 0) {
            newWidth = oriShowLeft + width;
          }
          if (oriShowTop - newHeight + height <= 0) {
            newHeight = oriShowTop + height;
          }
          module.value.width = newWidth > 20 ? newWidth : 20;
          module.value.left =
            oriLeft - ((module.value.width - width) * (cos + 1)) / 2;
          module.value.top = oriTop - ((module.value.width - width) * sin) / 2;
          module.value.height = newHeight > 40 ? newHeight : 40;
          module.value.left =
            module.value.left + ((module.value.height - height) * sin) / 2;
          module.value.top =
            module.value.top - ((module.value.height - height) * (1 + cos)) / 2;
          module.value.showTop = oriShowTop - module.value.height + height;
          module.value.showLeft = oriShowLeft - module.value.width + width;
        };
      } else if (direction == "left-middle") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let Y = event.clientY;
          let newWidth =
            width -
            (X - oriX) * moveScale.value * cos -
            (Y - oriY) * moveScale.value * sin;
          if (oriShowLeft - newWidth + width <= 0) {
            newWidth = oriShowLeft + width;
          }
          module.value.width = newWidth > 20 ? newWidth : 20;
          module.value.left =
            oriLeft - ((module.value.width - width) * (cos + 1)) / 2;
          module.value.top = oriTop - ((module.value.width - width) * sin) / 2;
          module.value.showLeft = oriShowLeft - module.value.width + width;
        };
      } else if (direction == "left-down") {
        window.onmousemove = (event: MouseEvent) => {
          let X = event.clientX;
          let Y = event.clientY;
          let newWidth =
            width -
            (X - oriX) * moveScale.value * cos -
            (Y - oriY) * moveScale.value * sin;
          let newHeight =
            height -
            (X - oriX) * moveScale.value * sin +
            (Y - oriY) * moveScale.value * cos;
          if (oriShowLeft - newWidth + width <= 0) {
            newWidth = oriShowLeft + width;
          }
          if (newHeight + oriShowTop >= showHeigth) {
            newHeight = showHeigth - oriShowTop;
          }
          module.value.width = newWidth > 20 ? newWidth : 20;
          module.value.left =
            oriLeft - ((module.value.width - width) * (cos + 1)) / 2;
          module.value.top = oriTop - ((module.value.width - width) * sin) / 2;
          module.value.height = newHeight > 40 ? newHeight : 40;
          module.value.left =
            module.value.left - ((module.value.height - height) * sin) / 2;
          module.value.top =
            module.value.top - ((module.value.height - height) * (1 - cos)) / 2;
          module.value.showLeft = oriShowLeft - module.value.width + width;
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
    return { cursor, moveScale, controlshape };
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
  border: 1px solid rgb(129, 129, 129);
}
.item-Horizontal {
  position: absolute;
  width: 30px;
  height: 5px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(129, 129, 129);
}
.item-vertical {
  position: absolute;
  width: 5px;
  height: 30px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(129, 129, 129);
}
</style>