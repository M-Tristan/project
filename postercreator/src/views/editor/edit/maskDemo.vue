<template>
  <div :class="['mask-demo', { active: active }]" @click="selectMask">
    <canvas ref="canvasDom" width="100" height="100"></canvas>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref } from "vue";
import operation from "../operation/common/operation";

export default defineComponent({
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const { pushBack } = operation();
    const canvasDom = ref(null as unknown as HTMLCanvasElement);

    onMounted(() => {
      let image = new Image();
      image.src = props.src;
      image.onload = function () {
        draw(image);
      };
    });
    function draw(image) {
      let canvas = canvasDom.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.fillStyle = "rgb(0, 153, 255)";
      ctx.fillRect(0, 0, 100, 100);
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(image, 0, 0, 100, 100);
    }
    const selectMask = () => {
      editModule.value.mask = {
        type: "normal",
        src: props.src,
      };
    };
    const active = computed(() => {
      if (!editModule.value.mask) {
        return false;
      }

      return editModule.value.mask.src === props.src;
    });
    return { canvasDom, selectMask, active };
  },
});
</script>

<style lang="scss" scoped>
.mask-demo {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.171);
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
.active {
  background-color: rgb(255, 208, 0);
}
</style>