<template>
  <div
    class="shape-content"
    @mousedown="moduleMove(module)"
    :style="{
      width: module.width + 'px',
      height: module.height + 'px',
      left: module.left + 'px',
      top: module.top + 'px',
      transform: `rotate(${module.rotate ? module.rotate : 0}deg)`,
      zIndex: module.zindex,
    }"
  >
    <canvas
      v-if="pattern == 'show'"
      ref="shape"
      width="500"
      height="500"
      class="shape"
    ></canvas>
    <lock
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></lock>
    <regulator
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></regulator>
    <rotate
      :module="module"
      v-if="editModule.id == module.id && pattern == 'edit'"
    ></rotate>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import PositionUtil from "@/lib/PositionUtil";
import regulator from "./regulator.vue";
import rotate from "./rotate.vue";
import operation from "./common/operation";
import Lock from "./lock.vue";
export default defineComponent({
  props: {
    shape: {
      type: Object,
      default: new Object(),
    },
    pattern: {
      type: String,
      default: "edit",
    },
  },
  components: {
    regulator,
    rotate,
    Lock,
  },
  setup(props) {
    onMounted(() => {
      draw();
    });
    const draw = () => {
      if (props.pattern == "edit") {
        return;
      }
      switch (props.shape.shapeType) {
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
    };
    function drawPolygon() {
      let points = PositionUtil.getShapesPoints(module.value.sides, 250);
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index == 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.lineWidth = 0.01;
      ctx.stroke();
      ctx.fillStyle = module.value.color;
      ctx.fill();
    }
    function drawStart() {
      let points = PositionUtil.getStartShapesPoints(
        module.value.angles,
        250,
        150
      );
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index == 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.lineWidth = 0.01;
      ctx.stroke();
      ctx.fillStyle = module.value.color;
      ctx.fill();
    }
    function drawSector() {
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);
      ctx.beginPath();
      ctx.moveTo(250, 250);
      ctx.arc(
        250,
        250,
        250,
        0,
        (module.value.sectorAngle / 180) * Math.PI,
        true
      );
      ctx.closePath();
      ctx.lineWidth = 0.01;
      ctx.stroke();
      ctx.fillStyle = module.value.color;
      ctx.fill();
    }
    function drawFlower() {
      let points = PositionUtil.getFlowerPointsByNum(module.value.petals, 250);
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);
      ctx.beginPath();
      ctx.moveTo(249, 249);
      points.forEach((item, index) => {
        let lastItem = item.lastCurPoint;
        let nextItem = item.nextCurPoint;
        ctx.quadraticCurveTo(lastItem.x, lastItem.y, item.x, item.y);
        ctx.quadraticCurveTo(nextItem.x, nextItem.y, 250, 250);
      });
      ctx.lineWidth = 0.01;
      ctx.stroke();
      ctx.fillStyle = module.value.color;
      ctx.fill();
    }
    function drawCircle() {
      let canvas = shape.value;
      let ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);
      ctx.beginPath();
      ctx.arc(250, 250, 250, 0, Math.PI * 2, false);
      ctx.lineWidth = 0.01;
      ctx.stroke();
      ctx.fillStyle = module.value.color;
      ctx.fill();
    }
    const store = useStore();
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    let shape = ref(null as unknown as HTMLCanvasElement);
    const { moduleMove } = operation();
    const selectModel = () => {
      store.commit("setEditModule", module.value.id);
    };
    const module: any = computed(() => {
      return props.shape;
    });
    watch(
      () => module.value.color,
      (nv, ov) => {
        draw();
      }
    );
    watch(
      () => module.value.sectorAngle,
      (nv, ov) => {
        draw();
      }
    );
    watch(
      () => module.value.angles,
      (nv, ov) => {
        draw();
      }
    );
    watch(
      () => module.value.sides,
      (nv, ov) => {
        draw();
      }
    );
    watch(
      () => module.value.petals,
      (nv, ov) => {
        draw();
      }
    );

    return { module, editModule, shape, moduleMove, selectModel };
  },
});
</script>

<style scoped>
.shape-content {
  position: absolute;
  display: inline-block;
  cursor: move;
  user-select: none;
}
.shape {
  width: 100%;
  height: 100%;
}
</style>