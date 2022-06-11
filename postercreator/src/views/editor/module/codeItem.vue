<template>
  <div ref="code" class="code" @click="addCode">
    <img v-if="options.backImage" class="backImage" :src="options.backImage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as QRCode from "qrcode";
import ModuleUtil from "@/lib/ModuleUtil";
import { useStore } from "vuex";
import { operItem } from "@/interface/module";
import EditPositionUtil from "../lib/editPositionUtil";
export default defineComponent({
  props: {
    options: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    const store = useStore();
    let code = ref(null as unknown as HTMLElement);
    onMounted(() => {
      QRCode.toCanvas("二维码编辑", props.options, (err: any, canvas: any) => {
        code.value.append(canvas);
        if (err) throw err;
      });
    });
    const addCode = async () => {
      let codeInfo = <operItem>await ModuleUtil.getAddCodeInfo({
        text: "二维码编辑",
        colorDark: props.options.color.dark,
        colorLight: props.options.color.light,
        backImage: props.options.backImage,
        pointType: "normal",
        eyeType: "N-A",
      });
      let position = EditPositionUtil.getShowEditCenterPosition();
      codeInfo.top = position.top - codeInfo.height / 2;
      codeInfo.left = position.left - codeInfo.width / 2;
      store.commit("addCode", codeInfo);
      store.commit("setEditModule", codeInfo.id);
      store.commit("pushBack");
    };
    return { code, addCode };
  },
});
</script>

<style lang="scss" scoped>
.code {
  float: left;
  cursor: pointer;
  position: relative;
}
.backImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  height: 130px;
  z-index: -1;
}
</style>
 