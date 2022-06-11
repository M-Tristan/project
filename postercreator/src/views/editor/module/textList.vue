<template>
  <div class="textList">
    <div class="text-item" @click="addText()">
      <i class="el-icon-plus"></i>添加文字
    </div>
    <div class="effect-text-item" @click="addText('rainbow')">
      <img src="~@/assets/rainbow.png" />
    </div>
    <div class="effect-text-item" @click="addText('light')">
      <img src="~@/assets/light.png" />
    </div>
    <div class="effect-text-item" @click="addText('stroke')">
      <img src="~@/assets/stroke.png" />
    </div>
    <div class="effect-text-item" @click="addText('shadow')">
      <img src="~@/assets/shadow.png" />
    </div>
    <div class="effect-text-item" @click="addText('gradual')">
      <img src="~@/assets/Gradual.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import ModuleUtil from "@/lib/ModuleUtil";
import EditPositionUtil from "../lib/editPositionUtil";
import { operItem } from "@/interface/module";
export default {
  setup() {
    const store = useStore();
    const addText = async (type?: string) => {
      let textInfo = <any>await ModuleUtil.getAddTextInfo("双击修改文字");
      let position = EditPositionUtil.getShowEditCenterPosition();
      textInfo.top = position.top - textInfo.height / 2;
      textInfo.left = position.left - textInfo.width / 2;

      switch (type) {
        case "rainbow":
          textInfo.color = "red";
          let textShadowList = [
            {
              hShadow: 2,
              vShadow: 2,
              blur: 0,
              color: "rgba(255, 132, 0, 1)",
            },
            {
              hShadow: 4,
              vShadow: 4,
              blur: 0,
              color: "yellow",
            },
            {
              hShadow: 6,
              vShadow: 6,
              blur: 0,
              color: "green",
            },
            {
              hShadow: 8,
              vShadow: 8,
              blur: 0,
              color: "rgba(0, 251, 209, 1)",
            },
            {
              hShadow: 10,
              vShadow: 10,
              blur: 0,
              color: "blue",
            },
            {
              hShadow: 12,
              vShadow: 12,
              blur: 0,
              color: "rgba(213, 0, 255, 1)",
            },
          ];
          textInfo.textShadowList = textShadowList;
          break;
        case "light":
          textInfo.color = "yellow";
          textInfo.bold = true;

          textInfo.textShadowList = [
            {
              hShadow: 0,
              vShadow: 0,
              blur: textInfo.fontSize,
              color: "yellow",
            },
          ];
          break;
        case "stroke":
          textInfo.color = "red";
          textInfo.bold = true;
          textInfo.strokeWidth = textInfo.fontSize / 5;
          textInfo.strokeColor = "black";
          break;
        case "shadow":
          textInfo.bold = true;
          textInfo.color = "white";
          textInfo.textShadowList = [
            {
              hShadow: textInfo.fontSize / 5,
              vShadow: textInfo.fontSize / 5,
              blur: textInfo.fontSize / 10,
              color: "black",
            },
          ];
          break;
        case "gradual":
          textInfo.bold = true;
          textInfo.color = "red";
          textInfo.gradient = [
            {
              offset: 0,
              color: "red",
            },
            {
              offset: 1,
              color: "yellow",
            },
          ];
          textInfo.gradientAngle = 90;
          break;
        default:
      }

      store.commit("addText", textInfo);
      store.commit("setEditModule", textInfo.id);
      store.commit("pushBack");
    };
    return {
      addText,
    };
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

.effect-text-item {
  width: 120px;
  height: 120px;
  margin: 5px;
  float: left;
  box-shadow: 0 0 8px rgba(161, 161, 161, 0.664);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transform: scale(1.1);
    transition: 0.1s;
  }
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
