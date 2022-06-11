<template>
  <div
    class="text-content"
    @mousedown="moveEvent"
    :style="{
      width: module.width + 'px',
      height: `${fontScale != 1 ? module.height * fontScale + 'px' : 'auto'}`,
      left: module.left + 'px',
      top: module.top + 'px',
      transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
      zIndex: module.zindex,
      textAlign: `${module.textAlign}`,
    }"
  >
    <div
      class="Strokecontent"
      v-if="module.strokeWidth != 0"
      :style="{
        ...commonStyle,
        ...{
          textStroke: `${pattern == 'edit' ? 0 : module.strokeWidth}px ${
            module.strokeColor
          }`,
        },
        ...backImageStyle,
      }"
      v-html="module.html"
    ></div>
    <content-input
      v-if="contenteditable === true"
      @blur="contenteditable = false"
      @contentChange="contentChange"
      :style="{
        ...commonStyle,
        ...backImageStyle,
      }"
      :module="module"
    ></content-input>

    <div
      v-show="contenteditable === false"
      class="content"
      @dblclick="dbClickEvent"
      ref="contentShow"
      :style="{
        ...commonStyle,
        ...backImageStyle,
      }"
      v-html="module.html"
    ></div>
    <lock
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></lock>
    <regulator
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
      @changeHeight="changeHeight"
    ></regulator>
    <rotate
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></rotate>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import regulator from "./regulator.vue";
import rotate from "./rotate.vue";
import contentInput from "./contentInput.vue";
import operation from "./common/operation";
import { textShadow } from "@/interface/module";
import Lock from "./lock.vue";
export default defineComponent({
  props: {
    text: {
      type: Object,
      default: new Object(),
    },
    pattern: {
      type: String,
      default: "edit",
    },
  },
  components: {
    regulator,
    rotate,
    Lock,
    contentInput,
  },
  setup(props, ctx) {
    const store = useStore();
    const contenteditable = ref(false);
    onMounted(() => {
      changeHeight();
    });
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const module: any = computed(() => {
      return props.text;
    });
    const { moduleMove, resetGroupItem } = operation();
    const selectModel = () => {
      store.commit("setEditModule", module.value.id);
    };

    const contentShow = ref(null as unknown as HTMLElement);
    const changeHeight = () => {
      if (props.pattern != "edit") {
        return;
      }

      if (contentShow.value) {
        module.value.height = contentShow.value.clientHeight;
      }

      if (store.state.group) {
        resetGroupItem(store.state.group);
      }
    };
    const fontSize = computed(() => {
      return module.value.fontSize;
    });
    const lineHeight = computed(() => {
      return module.value.lineHeight;
    });
    const letterSpacing = computed(() => {
      return module.value.letterSpacing;
    });
    const backImageStyle = computed(() => {
      if (module.value.backImage && props.pattern == "show") {
        return {
          backgroundImage: `url('${module.value.backImage}')`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`,
          WebkitTextFillColor: `transparent`,
          WebkitBackgroundClip: `text`,
        };
      }
      if (module.value.gradient && props.pattern == "show") {
        let gradientList = module.value.gradient;
        let Gradient = "";
        gradientList.forEach((item, index) => {
          Gradient += `${item.color} ${item.offset * 100}%`;
          if (index < gradientList.length - 1) {
            Gradient += ",";
          }
        });
        return {
          backgroundImage: `linear-gradient(${module.value.gradientAngle}deg,${Gradient})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`,
          WebkitTextFillColor: `transparent`,
          WebkitBackgroundClip: `text`,
        };
      }
      return {};
    });
    const fontScale = computed(() => {
      let fontSize = module.value.fontSize;
      if (fontSize < 12) {
        return fontSize / 12;
      }
      return 1;
    });
    const textShadow = computed(() => {
      let textShadowList = module.value.textShadowList;

      if (textShadowList.length == 0 || props.pattern == "edit") {
        return "none";
      }
      let result = "";
      textShadowList.forEach((item: textShadow, index: number) => {
        if (index == 0) {
          result =
            result +
            `${item.hShadow}px ${item.vShadow}px ${item.blur}px ${item.color}`;
        } else {
          result =
            result +
            `,${item.hShadow}px ${item.vShadow}px ${item.blur}px ${item.color}`;
        }
      });
      return result;
    });
    const contentChange = (params) => {
      console.log(params);
      module.value.html = params.html;
      module.value.text = params.text;
      module.value.height = params.height;

      if (store.state.group) {
        resetGroupItem(store.state.group);
        store.commit("initGroupSize");
      }
      // changeHeight();
      // if (store.state.group) {

      // }
    };
    const dbClickEvent = () => {
      contenteditable.value = true;
    };
    const moveEvent = () => {
      if (contenteditable.value) {
        return;
      }
      moduleMove(module.value);
    };
    watch([fontSize, lineHeight, letterSpacing], (nv, ov) => {
      nextTick(() => {
        changeHeight();
      });
    });
    const commonStyle = computed(() => {
      return {
        fontSize: `${module.value.fontSize}px`,
        transform: `scale(${fontScale.value})`,
        color: `${
          props.pattern == "show" ? module.value.color : "rgba(0,0,0,0)"
        }`,
        caretColor: module.value.color,
        width: `${module.value.width / fontScale.value}px`,
        fontWeight: `${module.value.bold ? 900 : 400}`,
        textDecoration: `${module.value.textDecoration}`,
        fontStyle: `${module.value.italic ? "italic" : "normal"}`,
        lineHeight: `${module.value.lineHeight}`,
        letterSpacing: `${module.value.letterSpacing}px`,
        opacity: module.value.opacity,
        textShadow: textShadow.value,
        fontFamily: module.value.fontFamily,
      };
    });

    return {
      module,
      moduleMove,
      editModule,
      selectModel,
      changeHeight,
      contentInput,
      fontScale,
      textShadow,
      contentChange,
      contenteditable,
      dbClickEvent,
      moveEvent,
      backImageStyle,
      commonStyle,
      contentShow,
    };
  },
});
</script>

<style lang="scss" scoped>
.text-content {
  position: absolute;
}
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
.Strokecontent {
  word-break: break-word;
  white-space: pre-wrap;
  position: absolute;
  z-index: -1;
  left: 0;
  transform-origin: 0px 0px;
}
</style>
