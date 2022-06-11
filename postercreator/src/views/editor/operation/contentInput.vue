<template>
  <div
    class="content"
    :contenteditable="true"
    @input="contentChange"
    @blur="$emit('blur')"
    ref="contentInput"
    :style="{
      ...commonStyle,
      ...backImageStyle,
    }"
    v-once
    v-html="module.text"
  ></div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    module: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const contentInput = ref(null as unknown as HTMLElement);
    onMounted(() => {
      nextTick(() => {
        contentInput.value.focus();
        document.execCommand("selectAll");
      });
    });
    const contentChange = () => {
      emit("contentChange", {
        html: contentInput.value.innerHTML,
        text: contentInput.value.innerText,
        height: contentInput.value.clientHeight,
      });
    };
    return { contentInput, contentChange };
  },
});
</script>

<style lang="scss" scoped>
.content {
  word-break: break-word;
  white-space: pre-wrap;
  position: relative;
  left: 0;
  transform-origin: 0px 0px;
  &:focus {
    outline: none;
  }
}
</style>