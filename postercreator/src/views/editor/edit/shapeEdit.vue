<template>
  <div class="shape-area">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="形状" name="1">
        <div class="oper-item">
          <div class="oper-name">颜色</div>
          <div class="oper-input">
            <div class="color-area">
              <color-picker
                v-model="editModule.color"
                size="mini"
                show-alpha
                :style="{
                  backgroundColor: editModule.color,
                }"
              >
              </color-picker>
            </div>
          </div>
        </div>
        <div class="oper-item" v-if="editModule.sectorAngle">
          <div class="oper-name">角度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              :min="1"
              :max="359"
              v-model="editModule.sectorAngle"
            ></input-number>
          </div>
        </div>
        <div class="oper-item" v-if="editModule.angles">
          <div class="oper-name">角数</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              :min="2"
              :max="50"
              v-model="editModule.angles"
            ></input-number>
          </div>
        </div>
        <div class="oper-item" v-if="editModule.sides">
          <div class="oper-name">边数</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              :min="3"
              :max="50"
              v-model="editModule.sides"
            ></input-number>
          </div>
        </div>
        <div class="oper-item" v-if="editModule.petals">
          <div class="oper-name">花瓣数</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              :min="5"
              :max="50"
              v-model="editModule.petals"
            ></input-number>
          </div>
        </div>
      </el-collapse-item>

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
import ColorPicker from "@/components/color-picker/index";
export default defineComponent({
  components: { lockMask, ColorPicker },
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
/* .shape-area {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
} */
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
.block-color {
  height: 25px;
  width: 25px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px rgb(175, 175, 175);
}
.color-area {
  width: 90%;
  height: 25px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px rgb(175, 175, 175);
}
</style>