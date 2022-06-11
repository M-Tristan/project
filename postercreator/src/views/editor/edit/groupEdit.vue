<template>
  <div class="group-edit">
    <el-divider content-position="left">组合</el-divider>
    <el-button type="primary" v-if="!group.id" @click="setGroup"
      >成组</el-button
    >
    <el-button type="primary" v-if="group.id" @click="closeGroup"
      >拆分组</el-button
    >
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent } from "vue";
import { v4 as uuids4 } from "uuid";
export default defineComponent({
  setup() {
    const store = useStore();
    const group = computed(() => {
      return store.state.group;
    });
    const setGroup = () => {
      // store.state.group.id = groupId;
      // store.state.group.operItems.forEach((item) => {
      //   item.operItem.groupId = groupId;
      // });
      store.commit("addGroup");
    };
    const closeGroup = () => {
      store.commit("closeGroup");
    };
    return { setGroup, closeGroup, group };
  },
});
</script>

<style scoped>
.group-edit {
  margin-bottom: 10px;
}
</style>