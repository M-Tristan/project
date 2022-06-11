<template>
  <div
    class="chart-content"
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
    <div
      v-if="pattern == 'show'"
      ref="chart"
      :style="{ width: module.width + 'px', height: module.height + 'px' }"
    ></div>
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
import {
  computed,
  defineComponent,
  onBeforeUpdate,
  onMounted,
  ref,
  watch,
} from "vue";
import regulator from "./regulator.vue";
import rotate from "./rotate.vue";
import * as echarts from "echarts";
import operation from "./common/operation";
import Lock from "./lock.vue";
export default defineComponent({
  props: {
    chart: {
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
    let myChart;
    onMounted(() => {
      draw();
    });
    const draw = () => {
      if (props.pattern == "edit") {
        return;
      }
      if (myChart) {
        myChart.dispose();
      }

      let chartDom = chart.value;
      myChart = echarts.init(chartDom);
      myChart.setOption(module.value.option);
    };
    const store = useStore();
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    let chart = ref(null as unknown as HTMLElement);
    const module: any = computed(() => {
      return props.chart;
    });
    const { moduleMove } = operation();
    const selectModel = () => {
      store.commit("setEditModule", module.value.id);
    };
    watch(
      () => {
        return module.value.width;
      },
      (nv, ov) => {
        draw();
      }
    );
    watch(
      () => {
        return module.value.height;
      },
      (nv, ov) => {
        draw();
      }
    );
    return { module, chart, editModule, moduleMove, selectModel };
  },
});
</script>

<style scoped>
.chart-content {
  position: absolute;
  display: inline-block;
  cursor: move;
  user-select: none;
}
</style>