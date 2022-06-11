<template>
  <div>
    <div @click="selectImage" class="svgarea">
      <img :src="src" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import SVGParse from "@/lib/SVGParse";
import SvgMap from "@/lib/svgMap";
import ModuleUtil from "@/lib/ModuleUtil";
import { useStore } from "vuex";
import EditPositionUtil from "../lib/editPositionUtil";
import { operItem } from "@/interface/module";
export default defineComponent({
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    const selectImage = async () => {
      // let res = await SVGParse.getSVGColorFromUrl(props.src);
      // SvgMap[props.src] = svgString;
      let svgInfo = <operItem>await ModuleUtil.getAddSvgInfo(props.src);

      let position = EditPositionUtil.getShowEditCenterPosition();
      svgInfo.top = position.top - svgInfo.height / 2;
      svgInfo.left = position.left - svgInfo.width / 2;
      store.commit("addSvg", svgInfo);
      store.commit("setEditModule", svgInfo.id);
      store.commit("pushBack");
    };

    return { selectImage };
  },
});
</script>

<style lang="scss" scoped>
.svgarea {
  width: 82px;
  height: 82px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
