<template>
  <div class="bar-content">
    <div
      class="bar"
      ref="bar"
      :style="{
        backgroundImage: ` linear-gradient(90deg,${Gradient})`,
      }"
      @click="addColorItem"
    >
      <gradient-item
        v-for="colorItem in colorList"
        :key="colorItem"
        :maxWidth="200"
        :colorInfo="colorItem"
        @change="
          (info) => {
            changeItem(colorItem, info);
          }
        "
      ></gradient-item>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import gradientItem from "./gradientItem.vue";
import Color from "color-rgba";
import { gradientStop } from "@/interface/module";

export default defineComponent({
  components: { gradientItem },
  props: {
    gradient: {
      type: Array,
      require: true,
    },
  },
  setup(props) {
    const bar = ref(null as unknown as HTMLDivElement);
    const colorList = ref(props.gradient as Array<gradientStop>);
    colorList.value.forEach((item) => {
      let color = Color(item.color) as [number, number, number, number];
      item.color = `rgba(${color.join(",")})`;
    });

    const Gradient = computed(() => {
      colorList.value.sort((item, itemNext) => {
        return item.offset - itemNext.offset;
      });
      let res = "";
      colorList.value.forEach((item, index) => {
        res += `${item.color} ${item.offset * 100}%`;
        if (index < colorList.value.length - 1) {
          res += ",";
        }
      });
      return res;
    });
    const changeItem = (item, info) => {
      if (info.color) {
        item.color = info.color;
      }
      if (info.offset) {
        item.offset = info.offset;
      }
    };
    const addColorItem = () => {
      let colorItem: any = {};
      let event = <MouseEvent>window.event;
      let offset = event.offsetX / 200;
      colorItem.offset = offset;
      let next: any = undefined;
      let last: any = undefined;
      colorList.value.forEach((item) => {
        if (item.offset > offset) {
          if (!next || next.offset > item.offset) {
            next = item;
          }
        }
        if (item.offset < offset) {
          if (!last || last.offset < item.offset) {
            last = item;
          }
        }
      });
      if (last && next) {
        let rate = (offset - last.offset) / (next.offset - last.offset);
        let lastColor = Color(last.color) as [number, number, number, number];
        let nextColor = Color(next.color) as [number, number, number, number];
        let colorList = lastColor.map((item, index) => {
          if (index !== 3) {
            return Math.round((nextColor[index] - item) * rate) + item;
          } else {
            return (nextColor[index] - item) * rate + item;
          }
        });
        colorItem.color = `rgba(${colorList.join(",")})`;
      }
      if (!last && next) {
        colorItem.color = next.color;
      }
      if (last && !next) {
        colorItem.color = last.color;
      }
      colorList.value.push(colorItem);
      colorList.value.sort((item, itemNext) => {
        return item.offset - itemNext.offset;
      });
    };
    watch(
      () => {
        return props.gradient;
      },
      (nv, ov) => {
        colorList.value = nv as Array<gradientStop>;
      }
    );
    return {
      bar,
      colorList,
      Gradient,
      changeItem,
      addColorItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.bar {
  width: 200px;
  height: 10px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
}
.bar-content {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>