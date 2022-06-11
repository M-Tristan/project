<template>
  <div class="image-list">
    <div class="image-item" @click="cancelImage">
      <svg
        t="1621497008046"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2975"
        width="70"
        height="70"
      >
        <path
          d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667zM885.333333 512c0 85.333333-29.866667 164.266667-78.933333 228.266667l-533.333333-514.133334c64-55.466667 149.333333-87.466667 238.933333-87.466666 204.8 0 373.333333 168.533333 373.333333 373.333333z m-746.666666 0c0-91.733333 34.133333-174.933333 87.466666-241.066667l535.466667 516.266667c-66.133333 59.733333-153.6 98.133333-251.733333 98.133333-202.666667 0-371.2-168.533333-371.2-373.333333z"
          p-id="2976"
        ></path>
      </svg>
    </div>

    <div
      @click="selectImage(src)"
      class="image-item"
      v-for="(src, index) in imageList"
      :key="index"
    >
      <img :src="src" />
    </div>
  </div>
</template>

<script lang="ts">
import BaseCache from "@/lib/baseCache";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import operation from "../operation/common/operation";

export default defineComponent({
  setup() {
    const store = useStore();

    let imageList = [
      "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/aa24d266-a59f-49b5-8046-8f2b5412f436.jpeg",
      "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/14f0a1b4-c455-42c8-b7c7-c0bd041e1c11.jpeg",
      "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/f75952ad-7964-4536-8083-170649e5812d.jpeg",
      "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/ecc95708-a219-4625-a3a6-07bee5826b90.jpeg",
      "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com/90cae961-782f-4681-9d47-9312be7c0d37.jpeg",
    ];
    const selectImage = (src) => {
      BaseCache.pushImage(src);
      store.commit("setTextBack", src);
    };
    const cancelImage = () => {
      store.commit("cancelTextBack");
    };
    return { imageList, selectImage, cancelImage };
  },
});
</script>

<style lang="scss" scoped>
.image-item {
  width: 100px;
  height: 100px;
  float: left;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(163, 163, 163, 0.692);
  img {
    max-height: 100%;
    max-width: 100%;
  }
}
.image-list {
  max-height: 300px;
  overflow-y: scroll;
}
</style>