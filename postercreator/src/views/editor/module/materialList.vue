<template>
  <div align="left">
    <el-divider content-position="left">表格</el-divider>
    <div class="item">
      <chart type="pie"></chart>
      <chart type="bar"></chart>
    </div>
    <el-divider content-position="left">图形</el-divider>
    <div class="item">
      <shape type="polygon"></shape>
      <shape type="star"></shape>
      <shape type="sector"></shape>
      <shape type="flower"></shape>
      <shape type="circle"></shape>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import chart from "./chart.vue";
import shape from "./shape.vue";
export default defineComponent({
  components: {
    chart,
    shape,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.item {
  display: inline-block;
}
</style>