<template>
  <div align="left">
    <code-item
      v-for="(option, index) in options"
      :key="index"
      :options="option"
    ></code-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import CodeItem from "./codeItem.vue";
import {getImageList} from '@/api/api'
export default defineComponent({
  setup() {
    onMounted(async ()=>{
      let res = await getImageList({type:'code'})
      let backCodeList = res.map(item=>{
        return  {
        width: 130,
        color: {
          dark: `#ff000000`,
          light: `#ffffff`,
        },
        backImage:item.image_url
      }
      })
      options.value = [...options.value,...backCodeList]
    })
    const options = ref([
      {
        width: 130,
        color: {
          dark: `#000000`,
          light: `#ffffff`,
        },
      },
      {
        width: 130,
        color: {
          dark: `#ff0000`,
          light: `#ffffff`,
        },
      },
      {
        width: 130,
        color: {
          dark: `#0062ff`,
          light: `#ffffff`,
        },
      },
      {
        width: 130,
        color: {
          dark: `#06aa00`,
          light: `#ffffff`,
        },
      }
     
    ]);

    return { options };
  },
  components: {
    CodeItem,
  },
});
</script>

<style lang="scss" scoped>
* {
  color: #ff000000;
}
</style>