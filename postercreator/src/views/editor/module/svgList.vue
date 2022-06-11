<template>
  <div>
    <div class="image-item" v-for="(url, index) in imageList" :key="index">
      <svgitem :src="url"></svgitem>
    </div>
  </div>
</template>

<script lang="ts">
import { getImageList } from "@/api/api";
import { defineComponent, onMounted, ref } from "vue";
import svgitem from "./svgitem.vue";
export default defineComponent({
  components: {
    svgitem,
  },
  setup() {
    onMounted(() => {
      search();
    });
    let pageNo = 1;
    let pageSize = 30;
    const search = async () => {
      let res = await getImageList({ type: "svg", pageNo: pageNo++, pageSize });
      let list = res.map((item) =>
        item.image_url.replace(
          "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com",
          "https://lp-canvas-1304910572.file.myqcloud.com/"
        )
      );
      imageList.value = [...imageList.value, ...list];
    };
    const imageList = ref(<any>[]);
    return { imageList };
  },
});
</script>

<style lang="scss" scoped>
.image-item {
  width: 80px;
  height: 80px;
  margin: 5px;
  float: left;
  border: 1px solid rgb(230, 230, 230);
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.1s;
  }
}
</style>