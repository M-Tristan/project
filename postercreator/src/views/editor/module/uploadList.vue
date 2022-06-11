<template>
  <div>
    <div>
      <el-button
        round
        style="width: 100%; margin-top: 10px"
        @click="uploadImage"
        >上传图片(png/jpg)</el-button
      >
    </div>
    <div>
      <el-button round style="width: 100%; margin-top: 10px" @click="uploadSVG"
        >上传SVG</el-button
      >
    </div>
    <div>
      <el-button round style="width: 100%; margin-top: 10px" @click="uploadPSD"
        >上传psd(大小不超过500M)</el-button
      >
    </div>

    <div class="image-item" v-for="(url, index) in imageList" :key="index">
      <!-- @click="selectImage(url)" -->
      <!-- @mouseup="dragEnd" -->
      <!-- @mousedown="dragImage(url)" -->
      <el-image
        @click="selectImage(url)"
        style="width: 120px; height: 120px"
        :src="url"
        fit="contain"
        draggable="false"
      ></el-image>
    </div>
    <div class="image-item" v-for="(url, index) in svgList" :key="index">
      <!-- @click="selectImage(url)" -->
      <!-- @mouseup="dragEnd" -->
      <!-- @mousedown="dragImage(url)" -->
      <el-image
        @click="selectSvg(url)"
        style="width: 120px; height: 120px"
        :src="url"
        fit="contain"
        draggable="false"
      ></el-image>
    </div>
  </div>
</template>

<script lang="ts">
import { operItem } from "@/interface/module";
import ModuleUtil from "@/lib/ModuleUtil";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import EditPositionUtil from "../lib/editPositionUtil";
import { readPsd } from "ag-psd";
export default defineComponent({
  setup() {
    const store = useStore();
    let input = document.createElement("input") as HTMLInputElement;
    input.type = "file";
    let imageList = ref([] as Array<string>);
    let svgList = ref([] as Array<string>);
    const uploadImage = () => {
      input.onchange = () => {
        imageList.value.push(URL.createObjectURL((input.files as FileList)[0]));
      };
      input.accept = ".png,.jpeg,.jpg";
      input.click();
    };

    const uploadSVG = () => {
      input.onchange = () => {
        svgList.value.push(URL.createObjectURL((input.files as FileList)[0]));
      };
      input.accept = ".svg";
      input.click();
    };

    const uploadPSD = () => {
      input.onchange = async () => {
        let psdFile = (input.files as FileList)[0];
        let buffer = await psdFile.arrayBuffer();
        const psd = readPsd(buffer);
        let canvas = psd.canvas;
        if (canvas) {
          let width = canvas.width;
          let height = canvas.height;
          let pxNum = width * height;
          if (pxNum > 2000 * 2000) {
            let rate = Math.sqrt(4000000 / pxNum);
            let newCanvas = document.createElement(
              "canvas"
            ) as HTMLCanvasElement;
            newCanvas.width = width * rate;
            newCanvas.height = height * rate;
            let ctx = newCanvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
            canvas = newCanvas;

            canvas.toBlob((blob) => {
              // console.log(blob);
              let url = URL.createObjectURL(blob);
              imageList.value.push(url);
            });
          } else {
            canvas.toBlob((blob) => {
              // console.log(blob);
              let url = URL.createObjectURL(blob);
              imageList.value.push(url);
            });
          }
        }
        if (psd.children) {
          parseChildren(psd.children);
        }
      };
      input.accept = ".psd";
      input.click();
    };
    const parseChildren = (layers: Array<any>) => {
      layers.forEach((item) => {
        if (item.canvas && !item.text) {
          let canvas = item.canvas;
          let width = canvas.width;
          let height = canvas.height;
          let pxNum = width * height;
          if (pxNum > 2000 * 2000) {
            let rate = Math.sqrt(4000000 / pxNum);
            let newCanvas = document.createElement(
              "canvas"
            ) as HTMLCanvasElement;
            newCanvas.width = width * rate;
            newCanvas.height = height * rate;
            let ctx = newCanvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
            canvas = newCanvas;

            canvas.toBlob((blob) => {
              // console.log(blob);
              let url = URL.createObjectURL(blob);
              imageList.value.push(url);
            });
          } else {
            canvas.toBlob((blob) => {
              // console.log(blob);
              let url = URL.createObjectURL(blob);
              imageList.value.push(url);
            });
          }
        }
        if (item.children) {
          parseChildren(item.children);
        }
      });
    };
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

    const selectSvg = async (src: string) => {
      let svgInfo = <operItem>await ModuleUtil.getAddSvgInfo(src);
      let position = EditPositionUtil.getShowEditCenterPosition();
      svgInfo.top = position.top - svgInfo.height / 2;
      svgInfo.left = position.left - svgInfo.width / 2;
      store.commit("addSvg", svgInfo);
      store.commit("setEditModule", svgInfo.id);
      store.commit("pushBack");
    };
    return {
      uploadImage,
      imageList,
      selectImage,
      uploadPSD,
      uploadSVG,
      svgList,
      selectSvg,
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
