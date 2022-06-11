<template>
  <div
    class="code-content"
    @mousedown="moduleMove(module)"
    :style="{
      width: module.width + 'px',
      height: module.height + 'px',
      left: module.left + 'px',
      top: module.top + 'px',
      transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
      zIndex: module.zindex,
    }"
  >
    <img
      class="backImage"
      draggable="false"
      v-if="module.backImage && pattern == 'show'"
      :src="module.backImage"
    />
    <div
      v-if="pattern == 'show'"
      ref="code"
      class="code"
      draggable="false"
    ></div>

    <lock
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></lock>
    <regulator
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></regulator>
    <rotate
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></rotate>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import regulator from "./regulator.vue";
import rotate from "./rotate.vue";
import operation from "./common/operation";
import Lock from "./lock.vue";
// import BaseCache from "../../lib/baseCache";
import BaseCache from "../../../lib/baseCache";
import _ from "lodash";
import createQrcode from "../../../lib/createQrcode";
export default defineComponent({
  props: {
    code: {
      type: Object,
      default: new Object(),
    },
    pattern: {
      type: String,
      default: "edit",
    },
    collect: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    regulator,
    rotate,
    Lock,
  },

  setup(props) {
    const store = useStore();
    const logoCanvas = document.createElement("canvas") as HTMLCanvasElement;
    logoCanvas.width = 200;
    logoCanvas.height = 200;
    const logoCtx = logoCanvas.getContext("2d") as CanvasRenderingContext2D;

    let code = ref(null as unknown as HTMLElement);
    onMounted(() => {
      if (module.value.logo) {
        let image = new Image();
        image.setAttribute("crossOrigin", "anonymous");
        image.src = module.value.logo;
        image.onload = () => {
          logoCtx.clearRect(0, 0, 200, 200);
          logoCtx.save();
          logoCtx.beginPath();
          logoCtx.arc(100, 100, 100, 0, Math.PI * 2);
          logoCtx.fillStyle = "white";
          logoCtx.fill();
          logoCtx.beginPath();
          logoCtx.arc(100, 100, 90, 0, Math.PI * 2);
          logoCtx.clip();
          logoCtx.drawImage(image, 5, 5, 190, 190);
          logoCtx.restore();
          draw();
        };
      } else {
        draw();
      }
    });
    let useCanvas: HTMLCanvasElement;
    let codeUrl = "";
    let codeImage: HTMLImageElement;
    const debouncePushModule = _.debounce(() => {
      BaseCache.pushModule(module.value.id, useCanvas.toDataURL());
    }, 200);
    const resetCode = () => {
      if (!useCanvas || !codeImage) {
        return;
      }
      let ctx = useCanvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.save();
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.drawImage(codeImage, 0, 0, 1000, 1000);
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = props.code.colorLight;
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = props.code.colorDark;
      ctx.fillRect(0, 0, 1000, 1000);
      ctx.restore();
      ctx.drawImage(logoCanvas, 400, 400, 200, 200);
      if (props.collect) {
        debouncePushModule();
      }
    };
    const draw = () => {
      if (props.pattern == "edit") {
        return;
      }
      let canvas = createQrcode
        .create(module.value.text, {
          width: 1000,
          color: {
            dark: "#ffffff00",
            light: "#ffffff",
          },
          pointType: module.value.pointType,
          eyeType: module.value.eyeType,
        })
        .getCanvas();
      code.value.innerHTML = "";
      code.value.append(canvas);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      useCanvas = canvas;
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(codeUrl);
        codeUrl = URL.createObjectURL(blob);
        codeImage = new Image();
        codeImage.src = codeUrl;
        codeImage.onload = () => {
          resetCode();
        };
      });
    };

    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const module: any = computed(() => {
      return props.code;
    });
    const text: any = computed(() => {
      return module.value.text;
    });
    const pointType: any = computed(() => {
      return module.value.pointType;
    });
    const eyeType: any = computed(() => {
      return module.value.eyeType;
    });
    const colorDark: any = computed(() => {
      return module.value.colorDark;
    });
    const colorLight: any = computed(() => {
      return module.value.colorLight;
    });
    watch([text, pointType, eyeType], () => {
      draw();
    });

    watch([colorDark, colorLight], () => {
      resetCode();
    });
    watch(
      () => {
        return module.value.logo;
      },
      (nv, ov) => {
        let image = new Image();
        image.setAttribute("crossOrigin", "anonymous");
        image.src = nv;
        image.onload = () => {
          logoCtx.clearRect(0, 0, 200, 200);
          logoCtx.save();
          logoCtx.beginPath();
          logoCtx.arc(100, 100, 100, 0, Math.PI * 2);
          logoCtx.fillStyle = "white";
          logoCtx.fill();
          logoCtx.beginPath();
          logoCtx.arc(100, 100, 90, 0, Math.PI * 2);
          logoCtx.clip();
          logoCtx.drawImage(image, 5, 5, 190, 190);
          logoCtx.restore();
          resetCode();
        };
      }
    );
    watch(
      () => {
        return module.value.width;
      },
      (nv, ov) => {
        module.value.height = nv;
      }
    );

    const { moduleMove } = operation();
    const selectModel = () => {
      store.commit("setEditModule", module.value.id);
    };
    return { module, moduleMove, editModule, selectModel, code };
  },
});
</script>

<style lang="scss" scoped>
.code-content {
  position: absolute;
  display: inline-block;
  cursor: move;
  user-select: none;
}
.backImage {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
}
.code {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
