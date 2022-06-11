<template>
  <div class="module">
    <div
      :class="['module-item', { active: moduleId == 1 }]"
      @click="moduleId = 1"
    >
      <i class="iconfont icon-wenben modelu-icon"></i>
      <span class="module-name">文字</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 2 }]"
      @click="moduleId = 2"
    >
      <i class="iconfont icon-tupian modelu-icon"></i>
      <span class="module-name">图片</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 3 }]"
      @click="moduleId = 3"
    >
      <i class="iconfont icon-erweima modelu-icon"></i>
      <span class="module-name">二维码</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 4 }]"
      @click="moduleId = 4"
    >
      <i class="el-icon-star-off modelu-icon"></i>
      <span class="module-name">素材</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 8 }]"
      @click="moduleId = 8"
    >
      <i class="icon iconfont icon-vector modelu-icon"></i>
      <span class="module-name">矢量图</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 5 }]"
      @click="moduleId = 5"
    >
      <i class="iconfont icon-background modelu-icon"></i>
      <span class="module-name">背景</span>
    </div>

    <div
      :class="['module-item', { active: moduleId == 6 }]"
      @click="moduleId = 6"
    >
      <i class="el-icon-s-check modelu-icon"></i>
      <span class="module-name">水印</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 9 }]"
      @click="moduleId = 9"
    >
      <i class="icon iconfont icon-shangchuan2 modelu-icon"></i>
      <span class="module-name">上传</span>
    </div>
    <div
      :class="['module-item', { active: moduleId == 7 }]"
      @click="moduleId = 7"
    >
      <i class="el-icon-film modelu-icon"></i>
      <span class="module-name">导航器</span>
    </div>

    <el-popover
      placement="right"
      :width="300"
      trigger="manual"
      v-model:visible="visible"
    >
      <template #reference>
        <div class="tips-area" @click="visible = !visible">
          <i class="icon iconfont icon-caidan"></i>
          <span class="module-name">快捷键</span>
        </div>
      </template>
      <div
        class="none-select"
        @mouseenter="visible = true"
        @mouseleave="visible = false"
      >
        <el-row :gutter="20">
          <el-col :span="6">移动</el-col>
          <el-col :span="18">↑↓←→</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">快速移动</el-col>
          <el-col :span="18">shlft+↑↓←→</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">复制</el-col>
          <el-col :span="18">Ctrl+C</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">粘贴</el-col>
          <el-col :span="18">Ctrl+V</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">剪切</el-col>
          <el-col :span="18">Ctrl+X</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">撤销</el-col>
          <el-col :span="18">Ctrl+Z</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">重做</el-col>
          <el-col :span="18">Ctrl+Shlft+Z</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">删除</el-col>
          <el-col :span="18">Delete/Backspace</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">全选</el-col>
          <el-col :span="18">Ctrl+A</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">多选</el-col>
          <el-col :span="18">Ctrl/Shlft+点选</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">成组</el-col>
          <el-col :span="18">Ctrl+G</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">拆分组</el-col>
          <el-col :span="18">Ctrl+Shlft+G</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">上移一层</el-col>
          <el-col :span="18">Ctrl+]</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">移到顶层</el-col>
          <el-col :span="18">Ctrl+Shlft+]</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">下移一层</el-col>
          <el-col :span="18">Ctrl+[</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">移到底层</el-col>
          <el-col :span="18">Ctrl+Shlft+[</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">适应窗口</el-col>
          <el-col :span="18">Ctrl+0</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">画布放大</el-col>
          <el-col :span="18">Ctrl++/Ctrl+滚轮</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">画布缩小</el-col>
          <el-col :span="18">Ctrl+-/Ctrl+滚轮</el-col>
        </el-row>
      </div>
    </el-popover>

    <div class="module-material">
      <background-list v-if="moduleId == 5"></background-list>
      <image-list v-if="moduleId == 2"></image-list>
      <text-list v-if="moduleId == 1"></text-list>
      <qr-code-list v-if="moduleId == 3"></qr-code-list>
      <material-list v-if="moduleId == 4"></material-list>
      <watermarkList v-if="moduleId == 6"></watermarkList>
      <canvas-list v-show="moduleId == 7"></canvas-list>
      <svg-list v-if="moduleId == 8"></svg-list>
      <upload-list v-show="moduleId == 9"></upload-list>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  defineComponent,
  getCurrentInstance,
  ref,
} from "vue";
import backgroundList from "./backgroundList.vue";
import imageList from "./imageList.vue";
import QrCodeList from "./qrCodeList.vue";
import textList from "./textList.vue";
import materialList from "./materialList.vue";
import canvasList from "./canvasList.vue";
import watermarkList from "./watermarkList.vue";
import svgList from "./svgList.vue";
import uploadList from "./uploadList.vue";
export default defineComponent({
  components: {
    backgroundList,
    imageList,
    textList,
    QrCodeList,
    materialList,
    canvasList,
    watermarkList,
    svgList,
    uploadList,
  },
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    proxy?.$emitter.on("selectModule", (index) => {
      moduleId.value = index;
    });
    let moduleId = ref(1);
    const visible = ref(false);
    return { moduleId, visible };
  },
});
</script>

<style lang="scss" scoped>
.module {
  position: relative;
  height: 100%;
  user-select: none;
}
.none-select {
  user-select: none;
}
.module-material {
  z-index: 2000;
  width: 300px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 100%;
  border-right: 1px solid rgb(235, 235, 235);
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: rgb(255, 255, 255);
}
.module-item {
  position: relative;
  cursor: pointer;
  width: 65px;
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .modelu-icon {
    font-size: 25px;
  }
  .module-name {
    font-size: 12px;
  }
  &:hover {
    color: rgb(0, 162, 255);
  }
}
.active {
  &::after {
    content: " ";
    display: inline-block;
    width: 3px;
    height: 100%;
    background-color: rgb(0, 174, 255);
    position: absolute;
    top: 0;
    right: 0;
  }
}

.tips-area {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  i {
    font-size: 30px;
  }
}
</style>
