<template>
  <div class="textList">
    <div class="text-item" @click="addWaterMask">
      <i class="el-icon-plus"></i>普通水印
    </div>

    <div class="editArea" v-if="watermark">
      <el-row :gutter="20">
        <el-col :span="6"><div class="tips">水印内容</div></el-col>
        <el-col :span="18">
          <el-input
            :maxlength="15"
            v-model="watermark.text"
            placeholder="请输入内容"
          ></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6"><div class="tips">旋转</div></el-col>
        <el-col :span="18">
          <el-slider :max="360" v-model="watermark.rotate"></el-slider
        ></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6"><div class="tips">大小</div></el-col>
        <el-col :span="18">
          <el-slider
            :min="12"
            :max="200"
            v-model="watermark.fontSize"
          ></el-slider
        ></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6"><div class="tips">透明度</div></el-col>
        <el-col :span="18">
          <el-slider v-model="watermark.opacity"></el-slider
        ></el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6"><div class="tips">间距</div></el-col>
        <el-col :span="18">
          <el-slider :max="200" v-model="watermark.space"></el-slider
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="tips">交错</div></el-col>
        <el-col :span="18">
          <el-slider v-model="watermark.cross"></el-slider
        ></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6"><div class="tips">颜色</div></el-col>
        <el-col :span="18">
          <div class="color-area">
            <color-picker
              v-model="watermark.color"
              size="mini"
              show-alpha
              :style="{
                backgroundColor: watermark.color,
              }"
            >
            </color-picker>
          </div>
        </el-col>
      </el-row>

      <el-button
        round
        style="width: 100%; margin-top: 20px"
        @click="removeWaterMask"
        >去除水印</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import ColorPicker from "@/components/color-picker/index";
export default {
  components: {
    ColorPicker,
  },
  setup() {
    const store = useStore();
    let watermark = computed(() => {
      return store.state.postInfo.watermark;
    });
    const addWaterMask = () => {
      store.commit("addWaterMask");
    };
    const removeWaterMask = () => {
      store.commit("removeWaterMask");
    };
    return { addWaterMask, watermark, removeWaterMask };
  },
};
</script>

<style lang="scss" scoped>
.text-item {
  font-size: 20px;
  width: 100%;
  cursor: pointer;
  &:hover {
    color: rgb(0, 162, 255);
  }
}
.tips {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: 12px;
}
.editArea {
  padding: 20px;
}
.color-area {
  width: 90%;
  height: 25px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px rgb(175, 175, 175);
}
</style>
