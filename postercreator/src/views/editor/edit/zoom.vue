<template>
  <div @mousedown.stop class="InputNumber">
    <div>
      <i @click="reduce" class="el-icon-minus"></i>
    </div>
    <div>{{ scale }}%</div>
    <div>
      <i @click="increase" class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const scale = computed(() => {
      return store.state.scale;
    });
    const increase = () => {
      if (scale.value >= 400) {
        return;
      }
      if (scale.value < 10) {
        store.commit("setScale", scale.value + 1);
        return;
      }
      store.commit("setScale", scale.value + 10);
    };

    const reduce = () => {
      if (scale.value <= 1) {
        return;
      }
      if (scale.value < 20 && scale.value > 10) {
        store.commit("setScale", 10);
      }
      if (scale.value <= 10) {
        store.commit("setScale", scale.value - 1);
        return;
      }
      store.commit("setScale", scale.value - 10);
    };

    return { increase, reduce, scale };
  },
});
</script>

<style lang="scss" scoped>
.InputNumber {
  overflow: hidden;
  position: absolute;
  width: 158px;
  height: 38px;
  background: #fdfdfd;
  border-radius: 19px;
  right: 240px;
  bottom: 10px;
  z-index: 99;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgb(190, 190, 190);
  color: rgb(0, 0, 0);
}
</style>
