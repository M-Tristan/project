<template>
  <div
    class="navigate"
    :style="{
      height: `${navigateHeight}px`,
    }"
  >
    <image-item :postInfo="postInfo" :width="100"></image-item>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import ImageItem from "../panel/ImageItem.vue";
export default defineComponent({
  components: {
    ImageItem,
  },
  setup() {
    const store = useStore();
    let postInfo = computed(() => {
      return store.state.postInfo;
    });
    const navigateHeight = computed(() => {
      let rate = 100 / postInfo.value.canvas.width;
      return postInfo.value.canvas.height * rate + 40;
    });

    return { postInfo, navigateHeight };
  },
});
</script>

<style scoped>
.navigate {
  position: absolute;
  text-align: center;
  padding-top: 20px;
  padding-left: 30px;
  right: 240px;
  width: 160px;
  bottom: 100px;
  background-color: rgba(0, 0, 0, 0.767);
  border-radius: 5px;
  box-sizing: border-box;
}
</style>