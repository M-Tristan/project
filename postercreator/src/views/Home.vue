<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-input-number :min="1" :max="10" label="描述文字"></el-input-number>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
});
</script>
