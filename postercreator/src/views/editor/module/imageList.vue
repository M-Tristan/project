<template>
  <div v-infinite-scroll="search">
    <div class="image-item" v-for="(url, index) in imageList" :key="index">
      <!-- @click="selectImage(url)" -->
      <!-- @mouseup="dragEnd" -->
      <el-image
        @mousedown="dragImage(url)"
        style="width: 120px; height: 120px"
        :src="url"
        fit="contain"
        draggable="false"
      ></el-image>
    </div>
    <img
      v-if="showdragImage"
      :src="dragImageInfo.src"
      draggable="false"
      :style="{
        position: 'fixed',
        zIndex: 999,
        left: dragImageInfo.left - (dragImageInfo.width * scale) / 2 + 'px',
        top: dragImageInfo.top - (dragImageInfo.height * scale) / 2 + 'px',
        width: dragImageInfo.width * scale + 'px',
      }"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import ModuleUtil from "@/lib/ModuleUtil";
import { useStore } from "vuex";
import { operItem } from "@/interface/module";
import { getImageList } from "@/api/api";
import EditPositionUtil from "../lib/editPositionUtil";
export default defineComponent({
  setup() {
    const store = useStore();
    let pageNo = 1;
    let pageSize = 30;
    onMounted(async () => {
      search();
    });
    const scale = computed(() => {
      return store.state.scale / 100;
    });
    const search = async () => {
      let res = await getImageList({ type: "img", pageNo: pageNo++, pageSize });
      let list = res.map((item) => {
        return item.image_url.replace(
          "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com",
          "https://lp-canvas-1304910572.file.myqcloud.com/"
        );
      });
      imageList.value = [...imageList.value, ...list];
    };
    const imageList = ref(<any>[]);
    const selectImage = async (url: string) => {
      window.onmousemove = null;
      window.onmouseup = null;
      let imageInfo = <operItem>await ModuleUtil.getAddImageInfo(url);
      let position = EditPositionUtil.getShowEditCenterPosition();
      imageInfo.top = position.top - imageInfo.height / 2;
      imageInfo.left = position.left - imageInfo.width / 2;
      store.commit("addImage", imageInfo);
      store.commit("setEditModule", imageInfo.id);
      store.commit("pushBack");
    };
    const dragImageInfo = ref(null as any);
    const showdragImage = ref(false);
    const dragImage = async (url: string) => {
      let imageInfo = <operItem>await ModuleUtil.getAddImageInfo(url);
      dragImageInfo.value = imageInfo;
      window.onmousemove = (event: MouseEvent) => {
        showdragImage.value = true;
        dragImageInfo.value.left = event.clientX;
        dragImageInfo.value.top = event.clientY;
      };
      window.onmouseup = (event: MouseEvent) => {
        if (showdragImage.value === false) {
          selectImage(url);
          window.onmousemove = null;
          window.onmouseup = null;
          return;
        }
        let postion = EditPositionUtil.getCanvasPositionByClientPosition(
          event.clientX,
          event.clientY
        );
        if (postion) {
          imageInfo.left = postion.left / scale.value - imageInfo.width / 2;
          imageInfo.top = postion.top / scale.value - imageInfo.height / 2;
          store.commit("addImage", imageInfo);
          store.commit("setEditModule", imageInfo.id);
          store.commit("pushBack");
        }
        window.onmousemove = null;
        window.onmouseup = null;
        showdragImage.value = false;
      };
    };
    const dragEnd = () => {
      window.onmousemove = null;
      window.onmouseup = null;
    };
    return {
      imageList,
      selectImage,
      search,
      dragImage,
      dragImageInfo,
      showdragImage,
      scale,
      dragEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
.image-item {
  width: 120px;
  height: 120px;
  margin: 5px;
  float: left;
  box-shadow: 0 0 8px rgba(161, 161, 161, 0.664);
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.1s;
  }
}
</style>
