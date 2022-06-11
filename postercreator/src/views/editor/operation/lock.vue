<template>
  <div
    class="lock"
    v-if="module.lock"
    :style="{ width: module.width + 'px', height: module.height + 'px' }"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    module: {
      type: Object,
      default: new Object(),
    },
  },
  setup() {
    return {};
  },
});
</script>

<style  scoped>
.lock {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid red;
}
</style>