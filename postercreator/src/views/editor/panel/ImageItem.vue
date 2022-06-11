<template>
  <div
    class="image-content"
    :style="{
      width: canvas.width * scale + 'px',
      height: canvas.height * scale + 'px',
    }"
  >
    <div
      class="editContent"
      @mousedown.stop
      draggable="false"
      :style="{
        transform: `scale(${scale},${scale}) `,
        backgroundColor: `#fff`,
        backgroundSize: `16px 16px`,
        backgroundPosition: `0 0,8px 8px`,
        backgroundImage: `linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc)`,
        width: canvas.width + 'px',
        height: canvas.height + 'px',
      }"
    >
      <background :background="background"></background>
      <template v-for="(layer, index) in layers" :key="index">
        <d-shape
          v-if="layer.type == 'shape'"
          pattern="show"
          :shape="layer"
        ></d-shape>
        <d-chart
          v-if="layer.type == 'chart'"
          pattern="show"
          :chart="layer"
        ></d-chart>
        <d-image
          v-if="layer.type == 'image'"
          pattern="show"
          :image="layer"
        ></d-image>
        <d-text
          v-if="layer.type == 'text'"
          pattern="show"
          :text="layer"
        ></d-text>
        <d-effect-text
          v-if="layer.type == 'effectText'"
          pattern="show"
          :effectText="layer"
        ></d-effect-text>
        <d-code
          v-if="layer.type == 'code'"
          pattern="show"
          :code="layer"
        ></d-code>
        <d-svg v-if="layer.type == 'svg'" pattern="show" :svg="layer"></d-svg>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import dImage from "../operation/dImage.vue";
import dText from "../operation/dText.vue";
import clipper from "../operation/clipper.vue";
import DCode from "../operation/dCode.vue";
import Background from "../operation/background.vue";
import DChart from "../operation/dChart.vue";
import DShape from "../operation/dShape.vue";
import dEffectText from "../operation/dEffectText.vue";
import DSvg from "../operation/dSvg.vue";
export default defineComponent({
  components: {
    dImage,
    clipper,
    dText,
    DCode,
    Background,
    DChart,
    DShape,
    dEffectText,
    DSvg,
  },
  props: {
    postInfo: {
      type: Object,
      default: new Object(),
    },
    width: {
      type: Number,
      default: 150,
    },
  },
  setup(props) {
    const store = useStore();
    const scale = computed(() => {
      return props.width / canvas.value.width;
    });
    let clipOper = computed(() => store.state.clipOper);
    let background = computed(() => {
      return props.postInfo.background;
    });
    // let codes = computed(()=>{
    //   return props.postInfo.codes
    // })
    // let texts = computed(()=>{
    //   return props.postInfo.texts
    // })
    // let images = computed(()=>{
    //   return props.postInfo.images
    // })
    // let charts = computed(()=>{
    //   return props.postInfo.charts
    // })
    //  let shapes = computed(()=>{
    //   return props.postInfo.shapes
    // })
    // let effectTexts = computed(()=>{
    //   return store.state.postInfo.effectTexts
    // })
    let layers = computed(() => {
      return props.postInfo.layers;
    });
    let canvas = computed(() => {
      return props.postInfo.canvas;
    });

    return {
      // images:images,
      // texts:texts,
      // codes:codes,
      // charts:charts,
      // shapes:shapes,
      background: background,
      clipOper,
      canvas,
      scale,
      layers,
      // effectTexts
    };
  },
});
</script>

<style lang="scss" scoped>
.image-content {
  display: inline-block;
  position: relative;
  float: left;
  pointer-events: none;
}
.editContent {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  transform-origin: left top;
  overflow: hidden;
  float: left;
  display: inline-block;
  .background {
    position: relative;
    img {
      position: absolute;
    }
  }
}
</style>
