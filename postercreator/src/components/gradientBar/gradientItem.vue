<template>
  <div
    class="item"
    @mousedown.stop="move"
    @click.stop
    :style="{
      left: `${left}px`,
      backgroundColor: colorInfo.color,
    }"
  >
    <!-- size="mini"
                show-alpha
                :style="{
                  backgroundColor: editModule.color,
                }" -->
    <color-picker v-model="colorInfo.color" show-alpha></color-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import ColorPicker from "@/components/color-picker/index";
import { gradientStop } from "@/interface/module";

export default defineComponent({
  components: {
    ColorPicker,
  },
  props: {
    maxWidth: {
      type: [Number, String],
    },
    colorInfo: {
      type: Object as PropType<gradientStop>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const left = ref(
      Number(props.colorInfo.offset) * Number(props.maxWidth) - 7
    );
    const move = () => {
      let event = <MouseEvent>window.event;
      let oriX = event.clientX;
      let orileft = left.value;
      window.onmousemove = (event: MouseEvent) => {
        let X = event.clientX;
        let offset = orileft + X - oriX;
        left.value = offset;
        if (offset < -7) {
          left.value = -7;
        }
        if (offset > Number(props.maxWidth) - 7) {
          left.value = Number(props.maxWidth) - 7;
        }
        emit("change", {
          offset: (left.value + 7) / Number(props.maxWidth),
        });
      };
      window.onmouseup = () => {
        window.onmousemove = null;
        window.onmouseup = null;
      };
    };

    return { left, move };
  },
});
</script>

<style lang="scss" scoped>
.item {
  width: 14px;
  height: 14px;
  border-radius: 7px;
  box-shadow: 0 0 4px rgb(129, 129, 129);
  border: 2px solid white;
  position: absolute;

  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>