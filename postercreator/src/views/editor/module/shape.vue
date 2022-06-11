<template>
  <div class="shape" @click="selectShape">
    <canvas ref="shape" width="140" height="140"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PositionUtil from "@/lib/PositionUtil";
import ModuleUtil from "@/lib/ModuleUtil";
import { operItem } from "@/interface/module";
import { useStore } from "vuex";
import EditPositionUtil from "../lib/editPositionUtil";
export default defineComponent({
  props: {
    type: {
      type: String,
      default: "polygon",
    },
  },
  setup(props) {
    const store = useStore();
    onMounted(() => {
      switch (props.type) {
        case "polygon":
          drawPolygon();
          break;
        case "star":
          drawStart();
          break;
        case "sector":
          drawSector();
          break;
        case "flower":
          drawFlower();
          break;
        case "circle":
          drawCircle();
          break;
      }
    });
    function drawFlower() {
      let points = PositionUtil.getFlowerPointsByNum(10, 70);
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(70, 70);
      points.forEach((item, index) => {
        let lastItem = item.lastCurPoint;
        let nextItem = item.nextCurPoint;
        ctx.quadraticCurveTo(lastItem.x, lastItem.y, item.x, item.y);
        ctx.quadraticCurveTo(nextItem.x, nextItem.y, 70, 70);
      });
      ctx.stroke();
    }
    function drawCircle() {
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(70, 70, 50, 0, Math.PI * 2, false);
      ctx.stroke();
    }
    function drawSector() {
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      var w = 140;
      var h = 140;
      ctx.beginPath();
      ctx.moveTo(w / 6, (h / 6) * 5);
      ctx.arc(w / 6, (h / 6) * 5, (w / 3) * 2, 0, -Math.PI / 2, true);
      ctx.closePath();
      ctx.stroke();
    }
    function drawStart() {
      let points = PositionUtil.getStartShapesPoints(5, 70, 30);
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index == 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.stroke();
    }
    function drawPolygon() {
      let points = PositionUtil.getShapesPoints(5, 70);
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index == 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.stroke();
    }
    let shape = ref((null as unknown) as HTMLCanvasElement);
    const selectShape = async () => {
      let shapeInfo = <operItem>await ModuleUtil.getShapeInfo(props.type);
      let position = EditPositionUtil.getShowEditCenterPosition();
      shapeInfo.top = position.top - shapeInfo.height / 2;
      shapeInfo.left = position.left - shapeInfo.width / 2;
      store.commit("addShape", shapeInfo);
      store.commit("setEditModule", shapeInfo.id);
      store.commit("pushBack");
    };
    return { shape, selectShape };
  },
});
</script>

<style scoped>
.shape {
  width: 140px;
  height: 140px;
  display: inline-block;
  float: left;
  cursor: pointer;
}
</style>
