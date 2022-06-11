<template>
  <div
    class="effect-text-content"
    @mousedown="moduleMove(module)"
    @dblclick="editMode = true"
    :style="{
      width: module.width + 'px',
      height: `${module.height}px`,
      left: module.left + 'px',
      top: module.top + 'px',
      zIndex: module.zindex,
      transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
    }"
  >
    <content-input
      v-if="editMode === true"
      @blur="editMode = false"
      @contentChange="contentChange"
      :module="module"
      :style="{
        fontSize: `${module.fontSize}px`,
        fontWeight: `${module.bold ? 900 : 400}`,
        textDecoration: `${module.textDecoration}`,
        fontStyle: `${module.italic ? 'italic' : 'normal'}`,
        opacity: module.opacity,
        fontFamily: module.fontFamily,
        color: `rgba(0,0,0,0.2)`,
      }"
    ></content-input>
    <svg
      v-if="pattern == 'show' && editMode == false"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      :width="module.width"
      :height="module.height"
    >
      <path
        :d="path"
        fill="none"
        stroke-width="1"
        :id="module.id"
        ref="pathDom"
      ></path>
      <text
        :style="{
          fontSize: `${module.fontSize}px`,
          fontWeight: `${module.bold ? 900 : 400}`,
          textDecoration: `${module.textDecoration}`,
          fontStyle: `${module.italic ? 'italic' : 'normal'}`,
          opacity: module.opacity,
          textShadow: textShadow,
          fontFamily: module.fontFamily,
        }"
        :fill="module.color"
        :stroke="module.strokeColor"
        :stroke-width="module.strokeWidth"
      >
        <textPath :xlink:href="`#${module.id}`" :textLength="textLength">
          {{ module.text }}
        </textPath>
      </text>
      <text
        :style="{
          fontSize: `${module.fontSize}px`,
          fontWeight: `${module.bold ? 900 : 400}`,
          textDecoration: `${module.textDecoration}`,
          fontStyle: `${module.italic ? 'italic' : 'normal'}`,
          opacity: module.opacity,

          fontFamily: module.fontFamily,
        }"
        :fill="module.color"
      >
        <textPath :xlink:href="`#${module.id}`" :textLength="textLength">
          {{ module.text }}
        </textPath>
      </text>
    </svg>
    <lock
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></lock>
    <regulator
      :module="module"
      v-if="
        editModule.id == module.id && pattern == 'edit' && editMode == false
      "
    ></regulator>
    <rotate
      :module="module"
      v-if="
        editModule.id == module.id && pattern == 'edit' && editMode == false
      "
    ></rotate>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import regulator from "./regulator.vue";
import rotate from "./rotate.vue";
import { useStore } from "vuex";
import operation from "./common/operation";
import { textShadow } from "@/interface/module";
import contentInput from "./contentInput.vue";
import Lock from "./lock.vue";
export default defineComponent({
  props: {
    effectText: {
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

  setup(props) {
    const pathDom = ref(null as unknown as SVGPathElement);
    const editMode = ref(false);
    const store = useStore();
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const module: any = computed(() => {
      return props.effectText;
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
    const { moduleMove } = operation();
    const path = computed(() => {
      let path = "";
      switch (module.value.shape) {
        case "circle":
          path = `M ${module.value.fontSize} ${
            module.value.height / 2
          } A 1 1 0 1 1 ${module.value.width - module.value.fontSize} ${
            module.value.height / 2
          } M ${module.value.width - module.value.fontSize} ${
            module.value.height / 2
          } A 1 1 0 1 1 ${module.value.fontSize} ${module.value.height / 2}`;
          break;
        case "heart":
          let r =
            (module.value.width - 3 * module.value.fontSize) /
            (2 + Math.sqrt(2));
          let rWidth = Math.sqrt(Math.pow(2 * r, 2) / 2);
          let top = 1.5 * module.value.fontSize + (1 + Math.sqrt(2) / 2) * r;
          let startPoint = {
            left: module.value.width / 2 - rWidth,
            top: module.value.height * 0.6,
          };
          path = `M ${startPoint.left} ${startPoint.top} A 1 1 0 1 1 ${
            startPoint.left + rWidth
          } ${startPoint.top - rWidth} M ${startPoint.left + rWidth} ${
            startPoint.top - rWidth
          } A 1 1 0 1 1 ${startPoint.left + 2 * rWidth} ${startPoint.top} M ${
            startPoint.left + 2 * rWidth
          } ${startPoint.top} C ${startPoint.left + rWidth},${
            startPoint.top + rWidth
          } ${startPoint.left + rWidth},${startPoint.top + rWidth} ${
            startPoint.left
          } ${startPoint.top}`;
          break;
        case "rectangle":
          path = `M ${module.value.fontSize} ${module.value.fontSize} L ${
            module.value.width - module.value.fontSize
          } ${module.value.fontSize} L ${
            module.value.width - module.value.fontSize
          } ${module.value.height - module.value.fontSize} L ${
            module.value.fontSize
          } ${module.value.height - module.value.fontSize} Z`;
          break;
      }
      return path;
    });

    const textLength = computed(() => {
      let svgPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      svgPath.setAttributeNS(null, "d", path.value);
      return (svgPath.getTotalLength() * module.value.lengthRate) / 100;
    });
    const selectModel = () => {
      store.commit("setEditModule", module.value.id);
    };
    const fontSize = computed(() => {
      return module.value.fontSize;
    });

    const contentChange = (params) => {
      module.value.html = params.html;
      module.value.text = params.text;
    };
    onMounted(() => {});
    return {
      moduleMove,
      editModule,
      module,
      path,
      textLength,
      pathDom,
      textShadow,
      selectModel,
      editMode,
      contentChange,
    };
  },
});
</script>

<style scoped>
.effect-text-content {
  position: absolute;
}
</style>