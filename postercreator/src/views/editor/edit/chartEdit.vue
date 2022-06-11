<template>
  <div class="chart-area">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="位置" name="2">
        <div class="oper-item">
          <div class="oper-name">旋转角度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              :min="0"
              :max="360"
              v-model="editModule.rotate"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">左边距</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.left"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">上边距</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.top"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">宽</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.width"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">高</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.height"
            ></input-number>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <lock-mask v-if="editModule.lock"></lock-mask>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, ref } from "vue";
import operation from "../operation/common/operation";
import lockMask from "./lockMask.vue";

export default defineComponent({
  components: { lockMask },
  setup() {
    const store = useStore();
    const { pushBack } = operation();
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    let activeNames = ref(["1"]);
    return { editModule, activeNames, pushBack };
  },
});
</script>

<style scoped>
.shape-area {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.oper-item {
  height: auto;
  margin-bottom: 5px;
  display: inline-block;
  width: 100%;
}
.oper-name {
  width: 30%;
  float: left;
}
.oper-input {
  width: 70%;
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>