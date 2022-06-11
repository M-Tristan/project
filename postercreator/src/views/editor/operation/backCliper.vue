<template>
  <div class="background" @mousedown="mouseDown">
    <img
      class="backImage"
      :style="{
        width: `${module.width}px`,
        height: `${module.height}px`,
        left: `-${module.left}px`,
        top: `-${module.top}px`,
      }"
      draggable="false"
      v-if="module"
      :src="module.src"
    />
    <back-regulator :module="module"></back-regulator>
  </div>
  <div class="show-area" @mousedown="mouseDown">
    <img
      class="backImage"
      :style="{
        width: `${module.width}px`,
        height: `${module.height}px`,
        left: `-${module.left}px`,
        top: `-${module.top}px`,
      }"
      draggable="false"
      v-if="module"
      :src="module.src"
    />
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import _ from "lodash";
import { useStore } from "vuex";
import backRegulator from "./backRegulator.vue";
export default defineComponent({
  components: { backRegulator },

  props: {
    background: {
      type: Object,
      default: new Object(),
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    watch(
      () => {
        return props.background.image;
      },
      () => {
        module.value = _.cloneDeep(props.background.image);
      }
    );
    const module = ref(_.cloneDeep(props.background.image));

    const store = useStore();

    const moveScale = computed(() => {
      return 100 / store.state.scale;
    });
    const mouseDown = () => {
      let canvas = store.state.postInfo.canvas;
      let event = <MouseEvent>window.event;
      let oriX = event.clientX;
      let oriY = event.clientY;
      let orileft = module.value.left;
      let oritop = module.value.top;
      window.onmousemove = (event: MouseEvent) => {
        let X = event.clientX;
        let Y = event.clientY;
        module.value.left = orileft - (X - oriX) * moveScale.value;
        module.value.top = oritop - (Y - oriY) * moveScale.value;
        if (module.value.left < 0) {
          module.value.left = 0;
        }
        if (module.value.top < 0) {
          module.value.top = 0;
        }
        if (module.value.left + canvas.width > module.value.width) {
          module.value.left = module.value.width - canvas.width;
        }
        if (module.value.top + canvas.height > module.value.height) {
          module.value.top = module.value.height - canvas.height;
        }
      };
      window.onmouseup = () => {
        window.onmousemove = null;
        window.onmouseup = null;
        module.value.left = Math.round(module.value.left);
        module.value.height = Math.round(module.value.height);
        module.value.width = Math.round(module.value.width);
        module.value.top = Math.round(module.value.top);
      };
    };
    const comformClip = () => {
      let background = _.cloneDeep(props.background);
      background.image = module.value;
      store.commit("setbackInfo", background);
      store.commit("setBackClip", false);
    };
    onMounted(() => {
      proxy?.$emitter.on("comformClip", comformClip);
    });
    onBeforeUnmount(() => {
      proxy?.$emitter.off("comformClip", comformClip);
    });
    return { mouseDown, module };
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
  .backImage {
    position: absolute;
    filter: brightness(50%);
  }
  z-index: 999;
}

.show-area {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  overflow: hidden;
  z-index: 999;
  .backImage {
    position: absolute;
  }
}
.oper-area {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: white;
  width: 200px;
  height: 30px;
}
</style>