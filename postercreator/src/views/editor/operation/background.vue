<template>
  <div
    class="background"
    :style="{
      backgroundColor: background.color,
    }"
  >
    <img
      class="backImage"
      :style="{
        width: `${background.image.width}px`,
        height: `${background.image.height}px`,
        left: `-${background.image.left}px`,
        top: `-${background.image.top}px`,
      }"
      draggable="false"
      v-if="background.image"
      :src="background.image.src"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    background: {
      type: Object,
      default: new Object(),
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}
.backImage {
  position: absolute;
}
</style>