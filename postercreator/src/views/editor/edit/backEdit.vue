

<template>
  <!-- -->
  <div class="back-area">
    <el-divider content-position="left">画布</el-divider>
    <div class="size-area">
      <div class="size-item">
        <input-number
          v-model="canvas.width"
          @finishChange="pushBack"
          :min="100"
          :max="15000"
        ></input-number>
        <span>宽</span>
      </div>
      <div class="size-item">
        <input-number
          v-model="canvas.height"
          @finishChange="pushBack"
          :min="100"
          :max="15000"
        ></input-number>
        <span>高</span>
      </div>
    </div>

    <el-divider content-position="left">背景</el-divider>
    <div class="back-Info">
      <div class="back-image-area">
        <div class="image-info" :style="{ backgroundColor: editModule.color }">
          <img
            class="image"
            v-if="editModule.image"
            :src="editModule.image.src"
          />
        </div>
      </div>
    </div>
    <div class="button-area" v-if="!backClip">
      <el-button type="primary" @click="setBack">设置背景</el-button>
      <el-button type="primary" v-if="editModule.image" @click="clipBackground"
        >背景裁剪</el-button
      >
    </div>
    <div class="button-area" v-if="backClip">
      <el-button type="primary" @click="confirmclip">确认裁剪</el-button>
      <el-button type="primary" @click="cancelClip">取消裁剪</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
} from "vue";
import operation from "../operation/common/operation";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    const store = useStore();
    const { pushBack } = operation();
    const editModule: any = computed(() => {
      return store.state.postInfo.background;
    });
    const canvas: any = computed(() => {
      return store.state.postInfo.canvas;
    });
    const setBack = () => {
      proxy?.$emitter.emit("selectModule", 5);
    };
    const backClip = computed(() => {
      return store.state.backClip;
    });
    const clipBackground = () => {
      store.commit("setBackClip", true);
    };
    const cancelClip = () => {
      store.commit("setBackClip", false);
    };
    const confirmclip = () => {
      proxy?.$emitter.emit("comformClip");
    };
    return {
      editModule,
      canvas,
      pushBack,
      setBack,
      backClip,
      clipBackground,
      cancelClip,
      confirmclip,
    };
  },
});
</script>

<style lang="scss" scoped>
// .back-area {r
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// }
.size-area {
  width: 100%;
  // float: left;
  display: flex;
  height: 40px;
  justify-content: space-around;
}
.size-item {
  width: 45%;
  float: left;
  display: inline-block;
}
.back-Info {
  margin-top: 40px;
  width: 100%;
  display: block;
}
.back-image-area {
  display: flex;
  justify-content: center;
}
.image-info {
  width: 200px;
  min-height: 50px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.281);
  .image {
    width: 200px;
  }
}
.button-area {
  width: 100%;
  margin-top: 40px;
}
</style>