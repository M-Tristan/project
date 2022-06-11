<template>
  <div class="canvas-list">
    <el-button @click="addCanvas">添加画布</el-button>

    <div
      class="canvas-item"
      v-for="(postInfo, index) in postList"
      :key="index"
      @click="selectPostByIndex(index)"
    >
      <i
        class="el-icon-delete delete-button"
        v-if="postList.length > 1"
        @click.stop="deletePostByIndex(index)"
      ></i>
      <image-item :postInfo="postInfo" :width="200"></image-item>
    </div>
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
    const postList = computed(() => {
      return store.state.postList;
    });
    const addCanvas = () => {
      store.commit("addCanvas");
      store.commit("initBack");
      store.commit("pushBack");
    };
    const selectPostByIndex = (index) => {
      store.commit("selectPostByIndex", index);
    };
    const deletePostByIndex = (index) => {
      store.commit("deletePostByIndex", index);
    };
    return { postList, addCanvas, selectPostByIndex, deletePostByIndex };
  },
});
</script>

<style scoped>
.canvas-list {
  margin-top: 10px;
  height: 100%;
  overflow: scroll;
}
.canvas-item {
  position: relative;
  display: inline-block;
  float: left;
  height: auto;
  width: 200px;
  margin-top: 10px;
  margin-left: 40px;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.308);
}
.delete-button {
  cursor: pointer;
  position: absolute;
  font-size: 20px;
  top: 5px;
  right: 5px;
  z-index: 99;
  color: rgb(255, 255, 255);
  filter: drop-shadow(1px 1px 0px black);
}
</style>
