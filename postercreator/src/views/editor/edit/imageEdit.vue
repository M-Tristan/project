<template>
  <div class="image-area">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="图片" name="1">
        <div class="oper-item">
          <div class="oper-name">模糊</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.blur"
              :min="0"
              :max="50"
            ></input-number>
            <!-- <el-input-number size="mini" :min="0" :max="50" v-model="editModule.blur"></el-input-number> -->
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">透明度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.opacity"
              :min="0"
              :max="1"
              :step="0.01"
            ></input-number>
            <!-- <el-input-number size="mini" :min="0" :max="1" :step="0.01"  v-model="editModule.opacity"></el-input-number> -->
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">圆角</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.borderRadius"
              :min="0"
              :max="borderRadiusMax"
            ></input-number>
          </div>
        </div>
        <!-- <div class='oper-item'>
      <div class='oper-name'>
        翻转  
      </div>
      <div class='oper-input'>
        <div :class='["flip",{active:editModule.rotateX}]' @click="editModule.rotateX = !editModule.rotateX">
          <i class='el-icon-sort'></i>
        </div>
        <div :class='["flip",{active:editModule.rotateY}]' @click="editModule.rotateY = !editModule.rotateY">
            <i class='el-icon-sort transverse'></i>
        </div>
        
      
      </div>
    </div> -->
      </el-collapse-item>
      <el-collapse-item title="投影" name="2">
        <div v-if="editModule.shadow">
          <div class="oper-item">
            <div class="oper-name">投影颜色</div>
            <div class="oper-input">
              <div class="color-area">
                <color-picker
                  v-model="editModule.shadow.dropshadowColor"
                  size="mini"
                  show-alpha
                  :style="{
                    backgroundColor: editModule.shadow.dropshadowColor,
                  }"
                >
                </color-picker>
              </div>
            </div>
          </div>
          <div class="oper-item">
            <div class="oper-name">横向距离</div>
            <div class="oper-input">
              <input-number
                @finishChange="pushBack"
                v-model="editModule.shadow.dropshadowX"
              ></input-number>
            </div>
          </div>
          <div class="oper-item">
            <div class="oper-name">纵向距离</div>
            <div class="oper-input">
              <input-number
                @finishChange="pushBack"
                v-model="editModule.shadow.dropshadowY"
              ></input-number>
            </div>
          </div>
          <div class="oper-item">
            <div class="oper-name">模糊</div>
            <div class="oper-input">
              <input-number
                @finishChange="pushBack"
                v-model="editModule.shadow.dropshadowBlur"
              ></input-number>
            </div>
          </div>
          <el-button
            round
            style="width: 100%; margin-top: 20px"
            @click="removeShadow"
            >去除阴影</el-button
          >
        </div>
        <el-button
          v-else
          round
          style="width: 100%; margin-top: 20px"
          @click="addShadow"
          >添加阴影</el-button
        >
      </el-collapse-item>
      <el-collapse-item title="调整" name="3">
        <div class="oper-item">
          <div class="oper-name">亮度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.brightness"
              :min="0"
              :max="200"
            ></input-number>
          </div>
        </div>

        <div class="oper-item">
          <div class="oper-name">对比度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.contrast"
              :min="0"
              :max="5000"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">灰度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.grayscale"
              :min="0"
              :max="100"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">色相</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.hueRotate"
              :min="0"
              :max="360"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">反转</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.invert"
              :min="0"
              :max="100"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">饱和度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.filter.saturate"
              :min="0"
              :max="200"
            ></input-number>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="蒙版" name="4">
        <div class="mask-demo" @click="deleteMask">
          <svg
            t="1621497008046"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2975"
            width="70"
            height="70"
          >
            <path
              d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667zM885.333333 512c0 85.333333-29.866667 164.266667-78.933333 228.266667l-533.333333-514.133334c64-55.466667 149.333333-87.466667 238.933333-87.466666 204.8 0 373.333333 168.533333 373.333333 373.333333z m-746.666666 0c0-91.733333 34.133333-174.933333 87.466666-241.066667l535.466667 516.266667c-66.133333 59.733333-153.6 98.133333-251.733333 98.133333-202.666667 0-371.2-168.533333-371.2-373.333333z"
              p-id="2976"
            ></path>
          </svg>
        </div>

        <maskDemo
          v-for="(item, index) in maskList"
          :key="index"
          :src="item"
        ></maskDemo>
      </el-collapse-item>
      <el-collapse-item title="描边" name="8">
        <div v-if="editModule.stroke">
          <div class="oper-item">
            <div class="oper-name">颜色</div>
            <div class="oper-input">
              <div class="color-area">
                <color-picker
                  v-model="editModule.stroke.strokeColor"
                  size="mini"
                  show-alpha
                  :style="{
                    backgroundColor: editModule.stroke.strokeColor,
                  }"
                >
                </color-picker>
              </div>
            </div>
          </div>
          <div class="oper-item">
            <div class="oper-name">距离</div>
            <div class="oper-input">
              <input-number
                :min="0"
                v-model="editModule.stroke.strokeWidth"
              ></input-number>
            </div>
          </div>

          <el-button
            round
            style="width: 100%; margin-top: 20px"
            @click="removeStroke"
            >去除描边</el-button
          >
        </div>

        <el-button
          v-else
          round
          style="width: 100%; margin-top: 20px"
          @click="addStroke"
          >添加描边</el-button
        >
      </el-collapse-item>
      <el-collapse-item title="滤镜" name="7">
        <div class="filter-list">
          <div class="filter-item" @click="removeFilter">
            <svg
              t="1621497008046"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2975"
              width="70"
              height="70"
            >
              <path
                d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667zM885.333333 512c0 85.333333-29.866667 164.266667-78.933333 228.266667l-533.333333-514.133334c64-55.466667 149.333333-87.466667 238.933333-87.466666 204.8 0 373.333333 168.533333 373.333333 373.333333z m-746.666666 0c0-91.733333 34.133333-174.933333 87.466666-241.066667l535.466667 516.266667c-66.133333 59.733333-153.6 98.133333-251.733333 98.133333-202.666667 0-371.2-168.533333-371.2-373.333333z"
                p-id="2976"
              ></path>
            </svg>
          </div>
          <filter-item type="nostalgia" name="怀旧"></filter-item>
          <filter-item type="grayscale" name="灰度"></filter-item>
          <filter-item type="blackWhite" name="黑白"></filter-item>
          <filter-item type="darktone" name="暗调"></filter-item>
          <filter-item type="casting" name="熔铸"></filter-item>
          <filter-item type="brown" name="褐色"></filter-item>
          <filter-item type="comicStrip" name="连环画"></filter-item>
          <filter-item type="frozen" name="冰冻"></filter-item>
          <filter-item type="reverse" name="反转"></filter-item>
          <filter-item type="mosaic" name="马赛克"></filter-item>
          <filter-item type="removeRed" name="去红色"></filter-item>
          <filter-item type="removeGreen" name="去绿色"></filter-item>
          <filter-item type="removeBlue" name="去蓝色"></filter-item>
          <filter-item type="red" name="红色"></filter-item>
          <filter-item type="green" name="绿色"></filter-item>
          <filter-item type="blue" name="蓝色"></filter-item>
        </div>

        <!-- <filter-item></filter-item> -->
      </el-collapse-item>
      <!-- <el-collapse-item title="边框" name="3">
   <div class='oper-item'>
      <div class='oper-name'>
         颜色
      </div>
      <div class='oper-input'>
         <el-color-picker v-model="editModule.borderColor" size="mini" show-alpha></el-color-picker>
      </div>
    </div>
   <div class='oper-item'>
      <div class='oper-name'>
        大小  
      </div>
      <div class='oper-input'>
        <el-input-number size="mini" v-model="editModule.borderWidth"></el-input-number>
      </div>
    </div>
  </el-collapse-item> -->
      <el-collapse-item title="位置" name="5">
        <div class="oper-item">
          <div class="oper-name">旋转角度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.rotate"
              :min="0"
              :max="360"
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
      <el-collapse-item title="操作" name="6">
        <el-button type="info" plain size="mini" @click="clipImage"
          >裁剪</el-button
        >
      </el-collapse-item>
    </el-collapse>
  </div>
  <lock-mask v-if="editModule.lock"></lock-mask>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref } from "vue";
import maskDemo from "./maskDemo.vue";
import operation from "../operation/common/operation";
import LockMask from "./lockMask.vue";
import { getImageList } from "@/api/api";
import ColorPicker from "@/components/color-picker/index";
import filterItem from "@/components/filter/filterItem.vue";
export default defineComponent({
  components: {
    maskDemo,
    LockMask,
    ColorPicker,
    filterItem,
  },
  setup() {
    const store = useStore();
    const { pushBack } = operation();
    let activeNames = ref(["1"]);
    let value = ref(1);
    let color = ref("rgab(100,100,100,1)");
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const maskList = ref([]);
    onMounted(async () => {
      let res = await getImageList({ type: "mask" });
      maskList.value = res.map((item) => item.image_url);
    });
    const borderRadiusMax = computed(() => {
      if (editModule.value.width > editModule.value.height) {
        return editModule.value.height / 2;
      } else {
        return editModule.value.width / 2;
      }
    });
    const clipImage = () => {
      let clipOper = store.state.clipOper;
      store.commit("setClipOper", !clipOper);
    };
    const deleteMask = () => {
      store.commit("removeMask");
    };
    const removeFilter = () => {
      store.commit("removeFilter");
    };
    const addShadow = () => {
      editModule.value.shadow = {
        dropshadowX: 1,
        dropshadowY: 1,
        dropshadowBlur: 0,
        dropshadowColor: "rgba(0,0,0,1)",
      };
    };
    const removeStroke = () => {
      editModule.value.stroke = undefined;
    };
    const addStroke = () => {
      editModule.value.stroke = {
        strokeWidth: 10,
        strokeColor: "rgba(0,0,0,1)",
      };
    };
    const removeShadow = () => {
      editModule.value.shadow = undefined;
    };
    return {
      addStroke,
      removeStroke,
      removeShadow,
      activeNames,
      value,
      color,
      editModule,
      borderRadiusMax,
      clipImage,
      maskList,
      pushBack,
      deleteMask,
      removeFilter,
      addShadow,
    };
  },
});
</script>

<style lang="scss" scoped>
.oper-item {
  height: 40px;
}
.oper-name {
  width: 30%;
  float: left;
}
.oper-input {
  width: 70%;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.transverse {
  transform: rotate(90deg);
}
.flip {
  border-radius: 5px;
  width: 25px;
  height: 25px;
  background-color: rgb(187, 187, 187);
  color: white;
  font-size: 20px;
  float: left;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  color: rgb(5, 142, 255);
  background-color: rgb(0, 36, 112);
}
.image-area {
  padding-left: 10px;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
}
.color-area {
  width: 90%;
  height: 25px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px rgb(175, 175, 175);
}
.filter-list {
  height: 400px;
  overflow-y: scroll;
}
.mask-demo {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.171);
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
.filter-item {
  width: 100px;
  height: 130px;
  float: left;
  margin: 5px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 1px rgb(0, 0, 0);
}
</style>