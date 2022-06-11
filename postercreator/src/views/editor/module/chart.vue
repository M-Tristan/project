<template>
  <div class="chart" @click="selectChart">
    <div class="mask"></div>
    <div class="chart-content">
      <div ref="dom" style="width: 280px; height: 280px"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import * as echarts from "echarts";
import { pie, bar } from "./common/chartsDemo";
import ModuleUtil from "@/lib/ModuleUtil";
import { useStore } from "vuex";
import { operItem } from "@/interface/module";
import EditPositionUtil from "../lib/editPositionUtil";
export default defineComponent({
  props: {
    type: {
      type: String,
      default: "pie",
    },
  },
  setup(props) {
    const store = useStore();
    onMounted(() => {
      let chartDom = dom.value;
      var myChart = echarts.init(chartDom);
      let option: any = pie;
      switch (props.type) {
        case "pie":
          option = pie;
          break;
        case "bar":
          option = bar;
          break;
      }

      myChart.setOption(option);
    });
    let dom = ref((null as unknown) as HTMLElement);
    const selectChart = async () => {
      let chartInfo = <operItem>await ModuleUtil.getChartInfo(props.type);
      let position = EditPositionUtil.getShowEditCenterPosition();
      chartInfo.top = position.top - chartInfo.height / 2;
      chartInfo.left = position.left - chartInfo.width / 2;
      store.commit("addChart", chartInfo);
      store.commit("setEditModule", chartInfo.id);
      store.commit("pushBack");
    };
    return { dom, selectChart };
  },
});
</script>

<style scoped>
.chart {
  display: inline-block;
  float: left;
  width: 140px;
  height: 140px;
  position: relative;
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
  cursor: pointer;
}
.chart-content {
  transform: scale(0.5, 0.5);
  transform-origin: 0 0;
}
</style>
