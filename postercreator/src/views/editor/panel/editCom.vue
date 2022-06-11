<template>
  <div
    :class="['editContent', { backgroundImage: pattern == 'show' }]"
    draggable="false"
    @mousedown.stop
    :style="{
      overflow: `${pattern == 'edit' ? 'none' : 'hidden'}`,
      transform: `scale(${scale / 100},${scale / 100}) `,
      width: canvas.width + 'px',
      height: canvas.height + 'px',
      left: `${editPosition.left}px`,
      top: `${editPosition.top}px`,
    }"
  >
    <background v-if="pattern == 'show'" :background="background"></background>
    <div
      class="patchMask"
      v-if="pattern == 'edit'"
      @mousedown="patchSelect"
    ></div>
    <d-group v-if="group && pattern == 'edit'" :group="group"></d-group>
    <template v-for="(layer, index) in layers" :key="index">
      <d-shape
        v-if="layer.type == 'shape'"
        :pattern="pattern"
        :shape="layer"
      ></d-shape>
      <d-chart
        v-if="layer.type == 'chart'"
        :pattern="pattern"
        :chart="layer"
      ></d-chart>
      <d-image
        v-if="layer.type == 'image'"
        :pattern="pattern"
        :image="layer"
        :collect="collectData"
      ></d-image>
      <d-text
        v-if="layer.type == 'text'"
        :pattern="pattern"
        :text="layer"
      ></d-text>
      <d-effect-text
        v-if="layer.type == 'effectText'"
        :pattern="pattern"
        :effectText="layer"
      ></d-effect-text>
      <d-code
        v-if="layer.type == 'code'"
        :pattern="pattern"
        :code="layer"
        :collect="collectData"
      ></d-code>
      <d-svg
        v-if="layer.type == 'svg'"
        :pattern="pattern"
        :svg="layer"
        :collect="collectData"
      ></d-svg>
    </template>
    <water-mask
      v-if="pattern == 'show' && watermark"
      :watermark="watermark"
    ></water-mask>
    <clipper v-if="clipOper && pattern == 'edit'"></clipper>
    <back-cliper :background="background" v-if="backClip"></back-cliper>
    <color-collect
      @colorTake="colorTake"
      v-if="pattern == 'edit' && takeColor"
    ></color-collect>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
} from "vue";
import dImage from "../operation/dImage.vue";
import dText from "../operation/dText.vue";
import clipper from "../operation/clipper.vue";
import DCode from "../operation/dCode.vue";
import Background from "../operation/background.vue";
import DChart from "../operation/dChart.vue";
import DShape from "../operation/dShape.vue";
import DGroup from "../operation/dGroup.vue";
import DSvg from "../operation/dSvg.vue";
import backCliper from "../operation/backCliper.vue";
import dEffectText from "../operation/dEffectText.vue";
import waterMask from "../operation/waterMask.vue";
import colorCollect from "./colorCollect.vue";
export default defineComponent({
  components: {
    dImage,
    clipper,
    dText,
    DCode,
    Background,
    DChart,
    DShape,
    DGroup,
    dEffectText,
    waterMask,
    backCliper,
    colorCollect,
    DSvg,
  },
  props: {
    pattern: {
      type: String,
      default: "edit",
    },
    collectData: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = useStore();
    const takeColor = ref(false);
    let colorFinish: Function;
    const colorTake = (color) => {
      takeColor.value = false;
      if (colorFinish) {
        colorFinish(color);
      }
    };
    if (props.pattern === "edit") {
      proxy?.$emitter.on("takeColor", (value, finishFn) => {
        takeColor.value = value;
        colorFinish = finishFn;
      });
    }

    let watermark = computed(() => {
      return store.state.postInfo.watermark;
    });
    const scale = computed(() => {
      return store.state.scale;
    });
    let editSize = computed(() => {
      return store.state.editSize;
    });
    let clipOper = computed(() => store.state.clipOper);
    let background = computed(() => {
      return store.state.postInfo.background;
    });

    let layers = computed(() => {
      return store.state.postInfo.layers;
    });

    let canvas = computed(() => {
      return store.state.postInfo.canvas;
    });
    let group = computed(() => {
      return store.state.group;
    });
    let editPosition = computed(() => {
      let left = 0;
      let top = 0;
      if ((canvas.value.width * scale.value) / 100 < editSize.value.width) {
        left =
          (editSize.value.width - (canvas.value.width * scale.value) / 100) / 2;
      }
      if ((canvas.value.height * scale.value) / 100 < editSize.value.height) {
        top =
          (editSize.value.height - (canvas.value.height * scale.value) / 100) /
          2;
      }
      return { left, top };
    });
    const patchSelect = () => {
      const event: MouseEvent = <MouseEvent>window.event;
      emit("patchSelect", {
        startTop: (event.offsetY / 100) * scale.value + editPosition.value.top,
        startLeft:
          (event.offsetX / 100) * scale.value + editPosition.value.left,
      });
    };

    const backClip = computed(() => {
      return store.state.backClip;
    });
    return {
      background: background,
      group,
      clipOper,
      canvas,
      editSize,
      editPosition,
      scale,
      layers,
      patchSelect,
      watermark,
      backClip,
      takeColor,
      colorTake,
    };
  },
});
</script>

<style lang="scss" scoped>
.editContent {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: absolute;
  transform-origin: left top;
  margin-bottom: 30px;
  .background {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      position: absolute;
    }
  }
}
.backgroundImage {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.308);
  background-color: #fff;
  background-size: 16px 16px;
  background-position: 0 0, 8px 8px;
  background-image: linear-gradient(
      to top right,
      #ccc 25%,
      transparent 0,
      transparent 75%,
      #ccc 0,
      #ccc
    ),
    linear-gradient(
      to top right,
      #ccc 25%,
      transparent 0,
      transparent 75%,
      #ccc 0,
      #ccc
    );
}
.patchMask {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
