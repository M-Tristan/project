<template>
  <div
    class="mask"
    :style="{
      backgroundImage: `url(${imageDate})`,
      opacity: watermark.opacity / 100,
    }"
  >
    <!-- <img :src="imageDate" /> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    watermark: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    let toolCanvas: HTMLCanvasElement = document.createElement("canvas");
    let toolCtx: CanvasRenderingContext2D = toolCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    let watermark = computed(() => {
      return props.watermark;
    });
    const getWaterMak = () => {
      if (!watermark.value) {
        return "";
      }
      let fontSize = watermark.value.fontSize;
      let space = watermark.value.space;
      let rotate = watermark.value.rotate;
      toolCtx.font = `${fontSize}px Arial`;
      let text = watermark.value.text;
      let color = watermark.value.color;
      let length = toolCtx.measureText(text).width;
      let cross = ((length + space) * watermark.value.cross) / 100;
      let canvas = document.createElement("canvas");
      canvas.setAttribute("height", String((fontSize + space) * 2));
      canvas.setAttribute("width", String((length + space) * 2));
      let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.save();
      // ctx.rotate((90 * Math.PI) / 180);
      for (let i = -10; i < 10; i++) {
        for (let k = -10; k < 10; k++) {
          let crossValue = 0;
          if (k % 2 == 0) {
            crossValue = cross;
          }
          ctx.restore();
          ctx.save();
          ctx.textBaseline = "top";
          ctx.font = `${fontSize}px Arial`;
          ctx.translate(
            i * (length + space) + crossValue,
            k * (fontSize + space)
          );
          ctx.rotate((rotate * Math.PI) / 180);
          ctx.fillStyle = color;
          ctx.fillText(text, 0, 0);
        }
      }
      return canvas.toDataURL();
    };
    const imageDate = ref("");
    onMounted(() => {
      imageDate.value = getWaterMak();
    });
    watch(
      [
        computed(() => watermark.value.fontSize),
        computed(() => watermark.value.space),
        computed(() => watermark.value.text),
        computed(() => watermark.value.opacity),
        computed(() => watermark.value.rotate),
        computed(() => watermark.value.cross),
        computed(() => watermark.value.color),
      ],
      () => {
        imageDate.value = getWaterMak();
      }
    );
    return { imageDate, watermark };
  },
});
</script>

<style lang="scss" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 300;
  top: 0;
  left: 0;
}
</style>
