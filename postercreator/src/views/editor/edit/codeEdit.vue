<template>
  <div class="image-area">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="二维码" name="1">
        <div class="oper-item">
          <div class="oper-name">内容</div>
          <div class="oper-input">
            <el-tag
              type="info"
              class="code-content"
              @click="editCodeContent(editModule.text)"
              >{{ editModule.text }}</el-tag
            >
          </div>
        </div>
        <div class="oper-item">
          <div class="oper-name">颜色</div>
          <div class="oper-input">
            <div class="block-color">
              <color-picker
                v-model="editModule.colorLight"
                color-format="hex"
                :show-alpha="false"
                :style="{
                  backgroundColor: editModule.colorLight,
                }"
              ></color-picker>
            </div>
            <div class="block-color" v-if="!editModule.backImage">
              <color-picker
                v-model="editModule.colorDark"
                color-format="hex"
                :show-alpha="false"
                :style="{
                  backgroundColor: editModule.colorDark,
                }"
              ></color-picker>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="码点" name="2">
        <div
          @click="editModule.pointType = 'normal'"
          :class="['image-item', { active: editModule.pointType === 'normal' }]"
        >
          <svg
            t="1628748684128"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1835"
            width="200"
            height="200"
          >
            <path d="M123 99h800v800H123z" p-id="1836" fill="#333333"></path>
          </svg>
        </div>
        <div
          class="image-item"
          @click="editModule.pointType = 'rect'"
          :class="['image-item', { active: editModule.pointType === 'rect' }]"
        >
          <svg
            t="1628748517355"
            class="icon icon-item"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1592"
            width="200"
            height="200"
          >
            <path d="M64 64h896v896H64z" fill="#333333" p-id="1593"></path>
          </svg>
        </div>
        <div
          class="image-item"
          @click="editModule.pointType = 'circle'"
          :class="['image-item', { active: editModule.pointType === 'circle' }]"
        >
          <svg
            t="1628748744175"
            class="icon icon-item"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2937"
            width="200"
            height="200"
          >
            <path
              d="M512 512m-512 0a100 100 0 1 0 1024 0 100 100 0 1 0-1024 0Z"
              p-id="2938"
              fill="#333333"
            ></path>
          </svg>
        </div>
        <div
          class="image-item"
          @click="editModule.pointType = 'star'"
          :class="['image-item', { active: editModule.pointType === 'star' }]"
        >
          <img src="@/assets/star.jpg" />
        </div>
        <div
          class="image-item"
          @click="editModule.pointType = 'horizontalBar'"
          :class="[
            'image-item',
            { active: editModule.pointType === 'horizontalBar' },
          ]"
        >
          <img src="@/assets/horizontalbar.jpg" />
        </div>
        <div
          class="image-item"
          @click="editModule.pointType = 'verticalBar'"
          :class="[
            'image-item',
            { active: editModule.pointType === 'verticalBar' },
          ]"
        >
          <img src="@/assets/verticalBar.jpg" />
        </div>
        <div
          class="image-item"
          @click="editModule.pointType = 'crossBar'"
          :class="[
            'image-item',
            { active: editModule.pointType === 'crossBar' },
          ]"
        >
          <img src="@/assets/crossBar.jpg" />
        </div>
        <div
          class="image-item"
          @click="editModule.pointType = 'complementary'"
          :class="[
            'image-item',
            { active: editModule.pointType === 'complementary' },
          ]"
        >
          <img src="@/assets/complementaryBar.jpg" />
        </div>

        <div
          class="image-item"
          @click="editModule.pointType = 'liquid'"
          :class="['image-item', { active: editModule.pointType === 'liquid' }]"
        >
          <img src="@/assets/liquid.jpg" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="码眼" name="3">
        <div
          @click="editModule.eyeType = 'N-A'"
          :class="['image-item', { active: editModule.eyeType === 'N-A' }]"
        >
          <img src="@/assets/N-A.jpg" />
        </div>
        <div
          @click="editModule.eyeType = 'N-B'"
          :class="['image-item', { active: editModule.eyeType === 'N-B' }]"
        >
          <img src="@/assets/N-B.jpg" />
        </div>
        <div
          @click="editModule.eyeType = 'N-C'"
          :class="['image-item', { active: editModule.eyeType === 'N-C' }]"
        >
          <img src="@/assets/N-C.jpg" />
        </div>
        <div
          @click="editModule.eyeType = 'N-D'"
          :class="['image-item', { active: editModule.eyeType === 'N-D' }]"
        >
          <img src="@/assets/N-D.jpg" />
        </div>
        <div
          @click="editModule.eyeType = 'N-E'"
          :class="['image-item', { active: editModule.eyeType === 'N-E' }]"
        >
          <img src="@/assets/N-E.jpg" />
        </div>
        <div
          @click="editModule.eyeType = 'N-F'"
          :class="['image-item', { active: editModule.eyeType === 'N-F' }]"
        >
          <img src="@/assets/N-F.jpg" />
        </div>
        <div
          @click="editModule.eyeType = 'N-G'"
          :class="['image-item', { active: editModule.eyeType === 'N-G' }]"
        >
          <img src="@/assets/N-G.jpg" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="logo" name="4">
        <div
          @click="editModule.logo = item"
          :class="['image-item', { active: editModule.logo === item }]"
          v-for="(item, index) in logoList"
          :key="index"
        >
          <img :src="item" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="位置" name="5">
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
              v-model="editModule.width"
            ></input-number>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  <el-dialog
    title="二维码信息"
    v-model="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-input @keydown.stop type="textarea" v-model="showContent"></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeCodeContent">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <lock-mask v-if="editModule.lock"></lock-mask>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, ref } from "vue";
import operation from "../operation/common/operation";
import lockMask from "./lockMask.vue";
import ColorPicker from "@/components/color-picker/index";
import { getImageList } from "@/api/api";
export default defineComponent({
  components: { lockMask, ColorPicker },
  setup() {
    const store = useStore();
    const { pushBack } = operation();
    let activeNames = ref(["1"]);
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const showContent = ref("");
    const editCodeContent = (content: string) => {
      showContent.value = content;
      dialogVisible.value = true;
    };
    let dialogVisible = ref(false);
    const changeCodeContent = () => {
      editModule.value.text = showContent.value;
      dialogVisible.value = false;
      pushBack();
    };
    const logoList = ref([]);
    onMounted(async () => {
      let res = await getImageList({ type: "logo" });
      logoList.value = res.map((item) =>
        item.image_url.replace(
          "https://lp-canvas-1304910572.cos.ap-guangzhou.myqcloud.com",
          "https://lp-canvas-1304910572.file.myqcloud.com/"
        )
      );
    });

    return {
      logoList,
      editModule,
      dialogVisible,
      editCodeContent,
      showContent,
      changeCodeContent,
      activeNames,
      pushBack,
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

.code-content {
  width: 90%;
  overflow: hidden;
}
.block-color {
  height: 25px;
  width: 25px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px rgb(175, 175, 175);
}
.image-item {
  width: 100px;
  height: 100px;
  box-shadow: 0 0 4px rgb(128, 128, 128);
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  .icon-item {
    width: 80%;
    height: 80%;
  }
  img {
    width: 80%;
    height: 80%;
  }
}
.active {
  &::after {
    content: " ";
    border: 2px solid blue;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>