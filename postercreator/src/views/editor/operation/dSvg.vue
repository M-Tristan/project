<template>
  <div
    class="svg-content"
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
    <div v-html="svgDom" v-if="pattern != 'edit'" class="inner-svg"></div>
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
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import operation from "./common/operation";
import regulator from "./regulator.vue";
import rotate from "./rotate.vue";
import Lock from "./lock.vue";
import SvgMap from "@/lib/svgMap";
import SVGParse from "@/lib/SVGParse";
import BaseCache from "@/lib/baseCache";
export default defineComponent({
  props: {
    svg: {
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
    onMounted(async () => {
      if (props.pattern != "edit") {
        let svgInfo = await SVGParse.loadSVGFromUrl(props.svg.src);
        svgContent.value = svgInfo.svg;
        props.svg.colorList = svgInfo.colorList;
      }
    });

    const svgContent = ref("");
    const store = useStore();
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const module: any = computed(() => {
      return props.svg;
    });

    const svgDom = computed(() => {
      if (props.pattern == "edit") {
        return "";
      }
      let svg = svgContent.value;
      module.value.colorList.forEach((color, index) => {
        let replace = `{{color${index}}}`;
        svg = svg.replace(new RegExp(replace, "gm"), color);
      });

      return svg;
    });

    watch(svgDom, () => {
      if (props.collect) {
        BaseCache.pushModule(module.value.id, svgDom.value);
      }
    });
    const { moduleMove } = operation();

    return { module, moduleMove, editModule, svgContent, svgDom };
  },
});
</script>

<style scoped>
.svg-content {
  position: absolute;
  display: inline-block;
  cursor: move;
  user-select: none;
}
.inner-svg {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
