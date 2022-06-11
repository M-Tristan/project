<template>
  <div class="image-area">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="文本" name="1">
        <div class="oper-item">
          <div class="oper-name">字号</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.fontSize"
              :min="6"
              :max="1000"
            ></input-number>
          </div>
        </div>
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
        <div class="oper-item">
          <div class="oper-name">装饰</div>
          <div class="decoration">
            <div
              :class="['flip', { active: editModule.bold }]"
              @click="editModule.bold = !editModule.bold"
            >
              <i class="icon iconfont icon-bold"></i>
            </div>
            <div
              :class="['flip', { active: editModule.italic }]"
              @click="editModule.italic = !editModule.italic"
            >
              <i class="icon iconfont icon-zitixieti"></i>
            </div>
            <div
              :class="[
                'flip',
                { active: editModule.textDecoration == 'underline' },
              ]"
              @click="changeDecoration('underline')"
            >
              <i class="icon iconfont icon-zitixiahuaxian"></i>
            </div>
            <div
              :class="[
                'flip',
                { active: editModule.textDecoration == 'line-through' },
              ]"
              @click="changeDecoration('line-through')"
            >
              <i class="icon iconfont icon-strikethrough"></i>
            </div>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">对齐</div>
          <div class="decoration">
            <div
              :class="['flip', { active: editModule.textAlign == 'left' }]"
              @click="editModule.textAlign = 'left'"
            >
              <i class="icon iconfont icon-zuoduiqi"></i>
            </div>
            <div
              :class="['flip', { active: editModule.textAlign == 'center' }]"
              @click="editModule.textAlign = 'center'"
            >
              <i class="icon iconfont icon-juzhongduiqi"></i>
            </div>
            <div
              :class="['flip', { active: editModule.textAlign == 'right' }]"
              @click="editModule.textAlign = 'right'"
            >
              <i class="icon iconfont icon-youduiqi"></i>
            </div>
            <!-- <div :class='["flip",{active:editModule.textAlign == "justify"}]' @click="editModule.textAlign = 'justify'">
            <i class='icon iconfont icon-zuoyouduiqi'></i>
          </div> -->
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">行间距</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.lineHeight"
              :min="1"
              :max="10"
              :step="0.1"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">字间距</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.letterSpacing"
              :min="0"
              :max="100"
              :step="1"
            ></input-number>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">不透明度</div>
          <div class="oper-input">
            <input-number
              @finishChange="pushBack"
              v-model="editModule.opacity"
              :min="0"
              :max="1"
              :step="0.01"
            ></input-number>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="字体" name="2">
        <div class="font-list">
          <div
            :class="[
              'font-item',
              { fontActive: editModule.fontFamily == item.fontFamily },
            ]"
            v-for="(item, index) in fonts"
            :key="index"
            @click="selectFont(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="修饰" name="3">
        <div class="oper-item">
          <div class="oper-name">描边</div>
          <div class="oper-input">
            <div class="block-color">
              <color-picker
                v-model="editModule.strokeColor"
                show-alpha
                :style="{
                  backgroundColor: editModule.strokeColor,
                }"
              ></color-picker>
            </div>

            <div class="strokeWidth">
              <input-number
                @finishChange="pushBack"
                v-model="editModule.strokeWidth"
                :min="0"
                :max="50"
              ></input-number>
            </div>
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">阴影</div>
          <div class="oper-input">
            <div class="add-area">
              <i
                class="el-icon-circle-plus-outline add-icon"
                @click="addTextShadow"
              ></i>
            </div>
            <div
              class="text-shadow"
              v-for="(shadow, index) in editModule.textShadowList"
              :key="index"
            >
              <div class="item">
                <div class="block-color">
                  <color-picker
                    v-model="shadow.color"
                    show-alpha
                    :style="{
                      backgroundColor: shadow.color,
                    }"
                  ></color-picker>
                </div>
              </div>
              <div class="item">
                <input-number
                  @finishChange="pushBack"
                  v-model="shadow.hShadow"
                  :min="0"
                  :max="50"
                ></input-number>
              </div>
              <div class="item">
                <input-number
                  @finishChange="pushBack"
                  v-model="shadow.vShadow"
                  :min="0"
                  :max="50"
                ></input-number>
              </div>
              <div class="item">
                <input-number
                  @finishChange="pushBack"
                  v-model="shadow.blur"
                  :min="0"
                  :max="50"
                ></input-number>
              </div>
              <div class="item">
                <i
                  class="el-icon-delete delete-icon"
                  @click="deleteTextShadow(index)"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="路径" name="4">
        <div
          :class="['shapeItem', { shapeActive: !editModule.shape }]"
          @click="addDeformation()"
        >
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

        <div
          :class="['shapeItem', { shapeActive: editModule.shape == 'heart' }]"
          @click="addDeformation('heart')"
        >
          <svg
            t="1621496033225"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2671"
            width="70"
            height="70"
          >
            <path
              d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z m0 63.146667c-41.44 0-70.261333 15.189333-116.96 55.04-2.165333 1.845333-14.4 12.373333-17.941334 15.381333a32.32 32.32 0 0 1-41.770666 0c-3.541333-3.018667-15.776-13.536-17.941334-15.381333-46.698667-39.850667-75.52-55.04-116.96-55.04C230.186667 180.48 149.333333 281.258667 149.333333 426.698667 149.333333 537.6 262.858667 675.242667 493.632 834.826667a32.352 32.352 0 0 0 36.736 0C761.141333 675.253333 874.666667 537.6 874.666667 426.698667c0-145.44-80.853333-246.218667-206.88-246.218667z"
              p-id="2672"
            ></path>
          </svg>
        </div>
        <div
          :class="['shapeItem', { shapeActive: editModule.shape == 'circle' }]"
          @click="addDeformation('circle')"
        >
          <svg
            t="1621496833862"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2804"
            width="70"
            height="70"
          >
            <path
              d="M512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667-191.029333 426.666667-426.666667 426.666667z m0-64c200.298667 0 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667z"
              p-id="2805"
            ></path>
          </svg>
        </div>
        <div
          :class="[
            'shapeItem',
            { shapeActive: editModule.shape == 'rectangle' },
          ]"
          @click="addDeformation('rectangle')"
        >
          <svg
            t="1621498552660"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8221"
            width="70"
            height="70"
          >
            <path
              d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z"
              p-id="8222"
            ></path>
          </svg>
        </div>
        <div class="oper-item" v-if="editModule.type == 'effectText'">
          <div class="oper-name">长度</div>
          <div class="oper-input">
            <input-number
              v-if="editModule.type == 'effectText'"
              @finishChange="pushBack"
              v-model="editModule.lengthRate"
              :min="10"
              :max="100"
            ></input-number>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="贴图" v-if="editModule.type === 'text'" name="5">
        <text-back-image></text-back-image>
      </el-collapse-item>
      <el-collapse-item title="渐变" v-if="editModule.type === 'text'" name="6">
        <gradient-bar
          v-if="editModule.gradient"
          :gradient="editModule.gradient"
        ></gradient-bar>
        <div class="oper-item" v-if="editModule.gradient">
          <div class="oper-name">角度</div>
          <div class="oper-input">
            <input-number
              :min="0"
              :max="360"
              v-model="editModule.gradientAngle"
            ></input-number>
          </div>
        </div>

        <el-button
          style="width: 90%"
          round
          v-if="!editModule.gradient"
          @click="addTextGradient"
          >添加渐变</el-button
        >
        <el-button
          style="width: 90%"
          round
          v-if="editModule.gradient"
          @click="removeTextGradient"
          >取消渐变</el-button
        >
      </el-collapse-item>
      <el-collapse-item title="位置" name="7">
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
import { computed, defineComponent, ref, watch } from "vue";
import _ from "lodash";
import operation from "../operation/common/operation";
import ModuleUtil from "@/lib/ModuleUtil";
import fontList from "@/lib/fontList";
import lockMask from "./lockMask.vue";
import TextBackImage from "./textBackImage.vue";
import ColorPicker from "@/components/color-picker/index";
import GradientBar from "../../../components/gradientBar/gradientBar.vue";
import BaseCache from "@/lib/baseCache";
// import Colorpicker from "@/components/colorpicker/colorpicker.vue";
export default defineComponent({
  components: { lockMask, TextBackImage, ColorPicker, GradientBar },
  setup() {
    const store = useStore();
    const { pushBack } = operation();
    let activeNames = ref(["1"]);
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const changeDecoration = (type: string) => {
      if (editModule.value.textDecoration == type) {
        editModule.value.textDecoration = "none";
      } else {
        editModule.value.textDecoration = type;
      }
    };
    const fonts = ref(fontList);
    const addTextShadow = () => {
      if (editModule.value.textShadowList.length == 0) {
        editModule.value.textShadowList.push({
          hShadow: 1,
          vShadow: 1,
          blur: 0,
          color: "rgba(0, 0, 0, 1)",
        });
      } else {
        let lastShadow =
          editModule.value.textShadowList[
            editModule.value.textShadowList.length - 1
          ];
        editModule.value.textShadowList.push({
          hShadow: lastShadow.hShadow + 1,
          vShadow: lastShadow.vShadow + 1,
          blur: 0,
          color: "rgba(0, 0, 0, 1)",
        });
      }
    };
    const deleteTextShadow = (index: number) => {
      editModule.value.textShadowList.splice(index, 1);
    };
    const addDeformation = (shape: string) => {
      if (!shape) {
        ModuleUtil.effectTextToText(editModule.value.id);
        return;
      }
      if (editModule.value.type == "text") {
        ModuleUtil.textToEffectText(editModule.value.id, shape);
      } else {
        editModule.value.shape = shape;
      }
    };
    const selectFont = (item) => {
      editModule.value.fontFamily = item.fontFamily;
      if (item.load) {
        return;
      }
      let fullname = item.fontFamily;
      let style = document.createElement("style");
      style.type = "text/css";
      style.innerText =
        "@font-face {font-family:" +
        fullname +
        ";src:url(" +
        item.url +
        ")};font-display: swap";
      document.getElementsByTagName("head")[0].appendChild(style);
      item.load = true;
      BaseCache.pushFont(fullname, item.url);
    };
    const addTextGradient = () => {
      store.commit("addTextGradient");
    };
    const removeTextGradient = () => {
      store.commit("removeTextGradient");
    };
    return {
      activeNames,
      editModule,
      changeDecoration,
      addTextShadow,
      deleteTextShadow,
      pushBack,
      addDeformation,
      fonts,
      selectFont,
      addTextGradient,
      removeTextGradient,
    };
  },
});
</script>

<style lang="scss" scoped>
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
.decoration {
  width: 70%;
  display: flex;
  justify-content: space-around;
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
  color: rgb(255, 255, 255);
  background-color: rgb(0, 36, 112);
}
.text-shadow {
  width: 100%;
  display: flex;
}
.add-area {
  height: 20px;
  width: 100%;
}
.add-icon {
  font-size: 20px;
  float: right;
  cursor: pointer;
}
.delete-icon {
  cursor: pointer;
}
.strokeWidth {
  display: inline-block;
  float: left;
  width: 70%;
  margin-left: 10px;
}
.font-list {
  max-height: 300px;
  overflow: scroll;
}
.fontActive {
  background-color: rgb(0, 3, 158);
  color: rgb(255, 255, 255);
}
.font-item {
  cursor: pointer;
  &:hover {
    background-color: rgba(243, 243, 243, 0.52);
    color: #000;
  }
}
.shapeItem {
  width: 70px;
  height: 70px;
  float: left;
  margin-left: 10px;
  cursor: pointer;
  background-color: rgb(228, 228, 228);
  border-radius: 5px;
  margin-bottom: 5px;
}
.shapeActive {
  background-color: rgb(5, 161, 251);
}
.color-area {
  width: 90%;
  height: 25px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px rgb(175, 175, 175);
}
.stroke-color {
  height: 25px;
  width: 25px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px rgb(175, 175, 175);
}
.block-color {
  height: 25px;
  width: 25px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px rgb(175, 175, 175);
}
</style>