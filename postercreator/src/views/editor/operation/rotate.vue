<template>
  <i
    class="el-icon-refresh swing-button"
    @mousedown.stop="rotate"
    draggable="false"
    v-if="(!module.lock && !group) || module.type == 'group'"
    :style="{
      transform: `translateX(-50%) scale(${moveScale})`,
      bottom: `${-80 * moveScale}px`,
    }"
  ></i>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import operation from "./common/operation";

export default defineComponent({
  props: {
    module: {
      type: Object,
      default: new Object(),
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const { pushBack } = operation();
    const moveScale = computed(() => {
      return 100 / store.state.scale;
    });
    const module: any = computed(() => {
      return props.module;
    });
    const group: any = computed(() => {
      return store.state.group;
    });
    let rotatePositonX = computed(() => {
      return (
        Math.sin(module.value.rotate * (Math.PI / 180)) *
        (module.value.height / 2 + moveScale.value * 2)
      );
    });
    let rotatePositonY = computed(() => {
      return (
        -Math.cos(module.value.rotate * (Math.PI / 180)) *
        (module.value.height / 2 + moveScale.value * 2)
      );
    });

    const rotate = (event: MouseEvent) => {
      let oriX = event.clientX;
      let oriY = event.clientY;
      let orileft = rotatePositonX.value;
      let oritop = rotatePositonY.value;
      let shouldPushBack = false;
      window.onmousemove = (event: MouseEvent) => {
        shouldPushBack = true;
        let X = event.clientX;
        let Y = event.clientY;
        let width = (X - oriX) * moveScale.value - orileft;
        let height = (Y - oriY) * moveScale.value - oritop;
        let deg = 0;
        if (width < 0 && height > 0) {
          deg = (-Math.atan(width / height) / Math.PI) * 180;
        } else if (width < 0 && height < 0) {
          deg = 180 - (Math.atan(width / height) / Math.PI) * 180;
        } else if (width > 0 && height < 0) {
          deg = 180 - (Math.atan(width / height) / Math.PI) * 180;
        } else {
          deg = 360 - (Math.atan(width / height) / Math.PI) * 180;
        }
        module.value.rotate = Math.round(deg);
        emit("change");
      };
      window.onmouseup = (event: MouseEvent) => {
        window.onmousemove = null;
        window.onmouseup = null;
        emit("change");
        if (shouldPushBack) {
          pushBack();
        }
      };
    };
    return { moveScale, rotate, group };
  },
});
</script>

<style lang="scss" scoped>
.swing-button {
  font-size: 20px;
  color: rgb(0, 0, 0);
  background-color: white;
  position: absolute;

  left: 50%;
  border-radius: 50%;

  cursor: pointer;
}
</style>