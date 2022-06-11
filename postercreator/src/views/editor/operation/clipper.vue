<template>
  <div
    v-show="showBack"
    class="clipper"
    :style="{
      width: showImage.showWidth + 'px',
      height: showImage.showHeigth + 'px',
      top: editModule.top + 'px',
      left: editModule.left + 'px',
      transform: `rotate(${editModule.rotate ? editModule.rotate : 0}deg)`,
    }"
  >
    <img
      draggable="false"
      class="image"
      :src="showImage.src"
      :style="{
        width: showImage.showWidth + 'px',
        height: showImage.showHeigth + 'px',
        transform: `rotateY(${editModule.rotateY ? 180 : 0}deg) rotateX(${
          editModule.rotateX ? 180 : 0
        }deg)`,
      }"
    />
    <div class="org-image-area"></div>
  </div>
  <div
    class="showImage"
    :style="{
      width: showImage.width + 'px',
      height: showImage.height + 'px',
      top: showImage.top + 'px',
      left: showImage.left + 'px',
      transform: `rotate(${showImage.rotate ? showImage.rotate : 0}deg)`,
    }"
  >
    <div class="image-content">
      <img
        draggable="false"
        class="display-image"
        :src="showImage.src"
        :style="{
          width: showImage.showWidth + 'px',
          height: showImage.showHeigth + 'px',
          top: `${-showImage.showTop}px`,
          left: `${-showImage.showLeft}px`,
          transform: `rotateY(${showImage.rotateY ? 180 : 0}deg) rotateX(${
            showImage.rotateX ? 180 : 0
          }deg)`,
        }"
      />
    </div>
    <clipper-regulator :module="showImage"></clipper-regulator>
  </div>
  <div
    class="button-area"
    :style="{
      top: `${buttonInfo.most.minTop - 50}px`,
      left: `${(buttonInfo.most.minLeft + buttonInfo.most.maxLeft) / 2}px`,
    }"
  >
    <div class="ensure-button" @click="ensureClip">
      <i class="el-icon-check"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import PositionUtil from "@/lib/PositionUtil";
import MathUtil from "@/lib/MathUtil";
import clipperRegulator from "./clipperRegulator.vue";
import _ from "lodash";
import operation from "./common/operation";
export default defineComponent({
  setup() {
    let showBack = ref(false);
    const store = useStore();
    const { pushBack } = operation();
    const editModule: any = reactive(_.cloneDeep(store.state.editModule));
    const showImage = reactive({ ...editModule });
    let crop = PositionUtil.getClipInfo(
      editModule.width,
      editModule.height,
      editModule.crop
    );
    let imageScale = editModule.width / crop.width;
    showImage.oriTop = showImage.top;
    showImage.oriLeft = showImage.left;
    showImage.showTop = crop.top * imageScale;
    showImage.showLeft = crop.left * imageScale;

    let image = new Image();
    image.src = store.state.editModule.src;
    // const nature = reactive({
    //   naturalWidth: 0,
    //   naturalHeight: 0,
    // });
    image.onload = () => {
      showImage.showWidth = image.naturalWidth * imageScale;
      showImage.showHeigth = image.naturalHeight * imageScale;
      let innerCenter = PositionUtil.getCenterPosition(
        showImage.showLeft,
        showImage.showTop,
        showImage.width,
        showImage.height
      );
      let hypotenuse = MathUtil.getHypotenuse(
        innerCenter.left - showImage.showWidth / 2,
        showImage.showHeigth / 2 - innerCenter.top
      );
      let innerAngle = 0;
      if (showImage.showHeigth / 2 - innerCenter.top != 0) {
        innerAngle = MathUtil.atan(
          (showImage.showHeigth / 2 - innerCenter.top) /
            (innerCenter.left - showImage.showWidth / 2)
        );
      }
      if (innerCenter.left - showImage.showWidth / 2 < 0) {
        innerAngle += 180;
      }
      let showCenter = PositionUtil.getCenterPosition(
        showImage.left,
        showImage.top,
        showImage.width,
        showImage.height
      );
      let centerPosition = PositionUtil.getPositionbyOther(
        innerAngle - showImage.rotate,
        hypotenuse,
        showCenter
      );
      let realPosition = PositionUtil.getPositionByCenter(
        centerPosition.left,
        centerPosition.top,
        showImage.showWidth,
        showImage.showHeigth
      );
      editModule.top = realPosition.top;
      editModule.left = realPosition.left;
      showBack.value = true;
    };
    const buttonInfo = computed(() => {
      return PositionUtil.getPosition(
        showImage.left + showImage.width / 2,
        showImage.top + showImage.height / 2,
        showImage.width,
        showImage.height,
        showImage.rotate
      );
    });
    const ensureClip = () => {
      let image = new Image();
      image.src = showImage.src;
      image.onload = () => {
        let imageEdit = store.state.editModule;
        let rateW = crop.width / editModule.width;
        let rateY = crop.height / editModule.height;
        imageEdit.crop = {
          width: showImage.width * rateW,
          height: showImage.height * rateY,
          left: showImage.showLeft * rateW,
          top: showImage.showTop * rateY,
        };
        imageEdit.top = showImage.top;
        imageEdit.left = showImage.left;
        imageEdit.width = showImage.width;
        imageEdit.height = showImage.height;
        let clipOper = store.state.clipOper;
        store.commit("setClipOper", !clipOper);
      };
    };

    return { editModule, showImage, buttonInfo, ensureClip, showBack };
  },
  components: {
    clipperRegulator,
  },
});
</script>
<style lang="scss" scoped>
.clipper {
  position: absolute;
  z-index: 999;
}
.org-image-area {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.473);
  left: 0;
  top: 0;
}
.image {
  width: 100%;
  height: 100%;
}
.showImage {
  position: absolute;
  z-index: 1000;
  .image-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    pointer-events: none;
  }
  .display-image {
    position: absolute;
  }
}
.ensure-button {
  width: 20px;
  height: 25px;
  background-color: white;
  color: #000;
  font-size: 20px;
  border: 1px solid rgb(158, 158, 158);
  border-radius: 5px;
}
.button-area {
  position: absolute;
  z-index: 1000;
}
</style>
