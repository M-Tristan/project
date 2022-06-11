<template>
  <div class="color-collect">
    <svg
      v-if="showColorTop"
      class="color-show"
      :width="200 * moveScale"
      :height="200 * moveScale"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      :style="{
        left: left - 100 * moveScale + 'px',
        top: top - 100 * moveScale + 'px',
      }"
    >
      <circle
        :cx="100 * moveScale"
        :cy="100 * moveScale"
        :r="60 * moveScale"
        :stroke="color"
        :stroke-width="20 * moveScale"
        fill="rgba(0,0,0,0)"
      />
    </svg>
    <div
      class="mask"
      @mousemove="move"
      @mouseenter="showColorTop = true"
      @mouseleave="showColorTop = false"
      @click="selectColor"
    ></div>
  </div>
</template>

<script lang="ts">
import DesignToCanvas from "@/lib/designToCanvas";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup(props, { emit }) {
    const left = ref(0);
    const top = ref(0);
    const store = useStore();
    const moveScale = computed(() => {
      return 100 / store.state.scale;
    });
    const color = ref("black");
    const showColorTop = ref(false);
    const move = (event: MouseEvent) => {
      left.value = event.offsetX;
      top.value = event.offsetY;
      let colordata = ctx?.getImageData(event.offsetX, event.offsetY, 1, 1)
        .data as Uint8ClampedArray;
      color.value = `rgb(${colordata[0]},${colordata[1]},${colordata[2]})`;
    };
    const canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = store.state.postInfo.canvas.width;
    canvas.height = store.state.postInfo.canvas.height;
    let finishDraw = false;
    const draw = async () => {
      let svg = await DesignToCanvas.getSvgByPostInfo(
        store.state.postInfo,
        false
      );
      svg = svg.replace(/#/g, "%23").replace(/\n/g, "%0A");
      let image = new Image();
      image.src = `data:image/svg+xml;charset=utf-8,${svg}`;
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        finishDraw = true;
      };
    };
    draw();
    const selectColor = (event: MouseEvent) => {
      if (finishDraw) {
        left.value = event.offsetX;
        top.value = event.offsetY;
        let colordata = ctx?.getImageData(event.offsetX, event.offsetY, 1, 1)
          .data as Uint8ClampedArray;
        color.value = `rgb(${colordata[0]},${colordata[1]},${colordata[2]})`;
        emit("colorTake", color.value);
      }
    };
    return { left, top, move, color, showColorTop, selectColor, moveScale };
  },
});
</script>

<style lang="scss" scoped>
.color-collect {
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.mask {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.color-show {
  position: absolute;
  filter: drop-shadow(0px 0px 2px white)
    drop-shadow(0px 0px 4px rgb(143, 143, 143));
}
</style>
