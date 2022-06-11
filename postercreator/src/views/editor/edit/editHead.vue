<template>
  <div class="edit-head">
    <div class="logo">POSTER</div>
    <div class="psd-upload" @click="loadPsd">导入PSD</div>
    <div class="history-area">
      <div class="reverse">
        <i
          :class="[
            'icon',
            'iconfont',
            'icon-chexiaoyou',
            'icon-history',
            { disabled: backList.length <= 1 },
          ]"
          @click="back"
        ></i>
      </div>
      <i
        :class="[
          'icon',
          'iconfont',
          'icon-chexiaoyou',
          'icon-history',
          { disabled: nextList.length < 1 },
        ]"
        @click="next"
      ></i>
    </div>
    <div class="operation">
      <el-popover
        placement="bottom"
        :width="200"
        trigger="click"
        v-if="canDelete"
      >
        <template #reference>
          <div class="positionAjust">位置调整</div>
        </template>
        <div @click="positionAjust('left')" class="position-item">左对齐</div>
        <div @click="positionAjust('right')" class="position-item">右对齐</div>
        <div @click="positionAjust('horizontally')" class="position-item">
          水平居中
        </div>
        <div @click="positionAjust('verticalcenter')" class="position-item">
          垂直居中
        </div>
        <div @click="positionAjust('top')" class="position-item">顶部对齐</div>
        <div @click="positionAjust('bottom')" class="position-item">
          底部对齐
        </div>
        <div v-if="distribution">
          <div
            @click="positionAjust('verticaldistribution')"
            class="position-item"
          >
            垂直分布
          </div>
          <div
            @click="positionAjust('horizontaldistribution')"
            class="position-item"
          >
            水平分布
          </div>
        </div>
      </el-popover>
      <div class="space" v-if="canDelete">|</div>
      <el-popover
        placement="bottom"
        :width="100"
        trigger="click"
        v-if="canDelete"
      >
        <template #reference>
          <div class="layerAjust">
            <i class="icon iconfont icon-tuceng1"></i>
          </div>
        </template>
        <div @click="layerAdjustment('up')" class="layer-item">上移</div>
        <div @click="layerAdjustment('down')" class="layer-item">下移</div>
        <div @click="layerAdjustment('top')" class="layer-item">置顶</div>
        <div @click="layerAdjustment('bottom')" class="layer-item">置底</div>
      </el-popover>

      <div class="lockAjust" v-if="canLock" @click="lock">
        <i class="icon el-icon-unlock"></i>
      </div>
      <div class="lockAjust" v-if="editModule.lock" @click="unlock">
        <i class="icon el-icon-lock"></i>
      </div>
      <div class="deleteAjust" v-if="canDelete" @click="deletelayer">
        <i class="icon el-icon-delete"></i>
      </div>
      <div class="deleteAjust" v-if="canCopy" @click="copy">
        <i class="icon el-icon-document-copy"></i>
      </div>
    </div>

    <el-popover placement="bottom" width="100" trigger="click">
      <div class="downloadType" @click="download('png')">png</div>
      <div class="downloadType" @click="download('jpg')">jpg</div>
      <div class="downloadType" @click="download('pdf')">pdf(文件过大)</div>
      <template #reference>
        <div class="download">
          <!-- @click="download" -->
          <i class="icon iconfont icon-xiazai"></i>
        </div>
      </template>
    </el-popover>
    <div class="qrcodecreator" @click="toQrcodeCreator">编辑二维码</div>
  </div>
  <el-dialog title="生成中..." v-model="downloadDialog" width="70%" center>
    <el-progress :percentage="percentage"></el-progress>
  </el-dialog>
</template>

<script lang="ts">
import { useStore } from "vuex";
import {
  ComponentInternalInstance,
  computed,
  defineComponent,
  getCurrentInstance,
  ref,
} from "vue";
import operation from "../operation/common/operation";
import DesignToCanvas from "@/lib/designToCanvas";
import fontUtil from "@/lib/fontUtil";
import { readPsd } from "ag-psd";
import { v4 as uuidv4 } from "uuid";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const store = useStore();
    const { pushBack } = operation();
    const backList = computed(() => {
      return store.state.backList;
    });
    const nextList = computed(() => {
      return store.state.nextList;
    });
    const back = () => {
      if (backList.value.length <= 1) {
        return;
      }
      store.commit("back");
      store.commit("setEditModuleToBack");
    };
    const next = () => {
      if (nextList.value.length < 1) {
        return;
      }
      store.commit("next");
      store.commit("setEditModuleToBack");
    };
    const positionAjust = (type) => {
      let group = store.state.group;
      if (group && !group.id) {
        if (group.rotate !== 0) {
          store.commit("initAlignGroupSize");
          proxy?.$emitter.emit("resetOperItems");
        }
      }

      store.commit("positionAdjustment", type);
      if (group && !group.id) {
        store.commit("initAlignGroupSize");
        proxy?.$emitter.emit("resetOperItems");
      }
      // store.commit("pushBack");
    };
    const layerAdjustment = (type) => {
      store.commit("layerAdjustment", type);
      store.commit("pushBack");
    };
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const lock = () => {
      store.commit("lock");
      store.commit("pushBack");
    };
    const unlock = () => {
      store.commit("unlock");
      store.commit("pushBack");
    };
    const deletelayer = () => {
      store.commit("delete");
      store.commit("pushBack");
    };
    const copy = () => {
      store.commit("copy");
      store.commit("paste");
      store.commit("pushBack");
    };
    const download = (type) => {
      percentage.value = 0;
      downloadDialog.value = true;
      let t = setInterval(() => {
        percentage.value += 1;
        if (percentage.value == 99) {
          clearInterval(t);
        }
      }, 50);
      setTimeout(async () => {
        await DesignToCanvas.downLoadALL(type);
        clearInterval(t);
        percentage.value = 100;
        setTimeout(() => {
          downloadDialog.value = false;
        }, 1000);
      });
    };
    const canCopy = computed(() => {
      return store.getters.canCopy;
    });
    const canDelete = computed(() => {
      return store.getters.canDelete;
    });
    const canLock = computed(() => {
      return store.getters.canLock;
    });
    const distribution = computed(() => {
      return store.getters.distribution;
    });
    const downloadDialog = ref(false);
    const percentage = ref(0);

    const loadPsd = () => {
      let input = document.createElement("input") as HTMLInputElement;
      input.type = "file";
      input.accept = ".psd";
      input.onchange = async () => {
        let psdFile = (input.files as FileList)[0];
        let buffer = await psdFile.arrayBuffer();
        const psd = readPsd(buffer);
        let post: any = {};
        post.canvas = {};
        post.canvas.width = psd.width;
        post.canvas.height = psd.height;
        let layers = getLayers(psd.children as Array<any>);
        for (let index = 0; index < layers.length; index++) {
          layers[index].zindex = index + 1;
          if (!layers[index].canvas) {
            continue;
          }
          let canvas = layers[index].canvas;
          let width = canvas.width;
          let height = canvas.height;
          let pxNum = width * height;
          if (pxNum > 2000 * 2000) {
            let rate = Math.sqrt(4000000 / pxNum);
            let newCanvas = document.createElement(
              "canvas"
            ) as HTMLCanvasElement;
            newCanvas.width = width * rate;
            newCanvas.height = height * rate;
            let ctx = newCanvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
            canvas = newCanvas;
            layers[index].crop.width = width * rate;
            layers[index].crop.height = height * rate;
          }
          await new Promise<void>((res, rej) => {
            canvas.toBlob((blob) => {
              let url = URL.createObjectURL(blob);
              layers[index].src = url;
              res();
            });
          });
        }
        post.layers = layers;
        post.background = {
          id: uuidv4(),
          type: "back",
          color: `white`,
          opacity: 1,
        };
        store.commit("addPost", post);
        setTimeout(() => {
          store.commit("selectLastPost");
        }, 1000);
      };
      input.click();
    };
    const getFillColor = (colorInfo: any) => {
      if (!colorInfo) {
        return "rgba(255,255,255,1)";
      }
      return `rgba(${colorInfo.r},${colorInfo.g},${colorInfo.b},1)`;
    };
    const getLayers = (layersInfo: Array<any>) => {
      let layers: Array<any> = [];
      layersInfo.forEach((layerInfo) => {
        if (layerInfo.hidden) {
          return;
        }
        if (layerInfo.canvas) {
          if (layerInfo.text) {
            fontUtil.loadFont(layerInfo.text.style.font.name);
            let layer: any = {
              id: uuidv4(),
              width: layerInfo.canvas.width * 1.1,
              height: layerInfo.canvas.height,
              top: layerInfo.top,
              left: layerInfo.left,
              rotate: 0,
              lock: false,
              blur: 0,
              opacity: 1,
              type: "text",
              fontFamily: layerInfo.text.style.font.name,
              color: getFillColor(layerInfo.text.style.fillColor),
              text: layerInfo.text.text,
              html: layerInfo.text.text,
              fontSize:
                layerInfo.text.style.fontSize * layerInfo.text.transform[0],
              bold: layerInfo.text.style.fauxBold,
              italic: layerInfo.text.style.fauxItalic,
              textDecoration: layerInfo.text.style.underline
                ? "underline"
                : "none",
              lineHeight: 1,
              textAlign: "left",
              letterSpacing: 0,
              textShadowList: [],
              strokeWidth: 0,
              strokeColor: "rgba(0,0,0,1)",
            };
            layers.push(layer);
          } else {
            let layer: any = {
              id: uuidv4(),
              width: layerInfo.canvas.width,
              height: layerInfo.canvas.height,
              top: layerInfo.top,
              left: layerInfo.left,
              rotate: 0,
              lock: false,
              canvas: layerInfo.canvas,
              blur: 0,
              opacity: 1,
              borderRadius: 0,
              rotateY: false,
              rotateX: false,
              type: "image",
              crop: {
                width: layerInfo.canvas.width,
                height: layerInfo.canvas.height,
                left: 0,
                top: 0,
              },
              filter: {
                brightness: 100,
                contrast: 100,
                grayscale: 0,
                hueRotate: 0,
                invert: 0,
                saturate: 100,
              },
            };
            layers.push(layer);
          }
        } else {
          if (layerInfo.children) {
            let layerList = getLayers(layerInfo.children);
            layers = [...layers, ...layerList];
          }
        }
      });
      return layers;
    };
    const toQrcodeCreator = () => {
      window.open("http://42.193.160.135/qrcodecreator/");
    };
    return {
      backList,
      nextList,
      back,
      next,
      pushBack,
      positionAjust,
      layerAdjustment,
      editModule,
      lock,
      unlock,
      deletelayer,
      download,
      canCopy,
      copy,
      canDelete,
      canLock,
      distribution,
      downloadDialog,
      percentage,
      loadPsd,
      toQrcodeCreator,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.edit-head {
  user-select: none;
  width: 100%;
  height: 50px;
  background-color: rgb(0, 225, 255);
  background-image: linear-gradient(90deg, rgb(0, 234, 255), rgb(89, 0, 255));
}
.logo {
  width: 200px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  float: left;
  font-size: 40px;
  color: rgb(255, 255, 255);
  font-weight: 900;
  background-image: -webkit-linear-gradient(
    bottom,
    rgb(224, 224, 224),
    #ffffff,
    rgb(224, 224, 224)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.history-area {
  display: inline-block;
  float: left;
  height: 50px;
  width: 100px;
  line-height: 50px;
  color: white;
  user-select: none;
}

.icon-history {
  font-size: 25px;
  cursor: pointer;
}

.reverse {
  transform: rotateY(180deg);
  display: inline-block;
  margin-right: 20px;
}
.disabled {
  color: #8f8f8f;
}
.operation {
  float: left;
  height: 50px;
  width: 300px;
  user-select: none;
}
.positionAjust {
  float: left;
  line-height: 40px;
  width: 80px;
  color: white;
  font-size: 16px;
  font-family: SourceHanSansCN-Regular;
  cursor: pointer;
  padding: 5px;
  font-weight: 900;
  user-select: none;
  &:hover {
    background-color: #8f8f8f5d;
  }
}
.layerAjust {
  float: left;
  line-height: 40px;
  height: 50px;
  width: 40px;
  color: white;
  cursor: pointer;
  padding: 5px;
  user-select: none;
  // font-weight: 900;
  &:hover {
    background-color: #8f8f8f5d;
  }
  .icon {
    font-size: 25px;
  }
}
.lockAjust {
  float: left;
  line-height: 45px;
  height: 50px;
  width: 40px;
  color: white;
  cursor: pointer;
  padding: 5px;
  user-select: none;
  // font-weight: 900;
  &:hover {
    background-color: #8f8f8f5d;
  }
  .icon {
    font-size: 20px;
  }
}
.deleteAjust {
  float: left;
  line-height: 45px;
  height: 50px;
  width: 40px;
  color: white;
  cursor: pointer;
  padding: 5px;
  user-select: none;
  // font-weight: 900;
  &:hover {
    background-color: #8f8f8f5d;
  }
  .icon {
    font-size: 20px;
  }
}
.position-item {
  width: 100px;
  float: left;
  color: black;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  font-weight: 900;
  user-select: none;
  &:hover {
    background-color: #8f8f8f32;
  }
}
.layer-item {
  width: 70px;
  float: left;
  color: black;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  font-weight: 900;
  user-select: none;
  &:hover {
    background-color: #8f8f8f32;
  }
}
.space {
  color: white;
  font-weight: 900;
  width: 10px;
  line-height: 50px;
  float: left;
  user-select: none;
}
.download {
  width: 50px;
  float: right;
  line-height: 50px;
  cursor: pointer;
  color: white;
  user-select: none;
  .icon {
    font-size: 30px;
  }
  &:hover {
    color: aqua;
  }
}
.downloadType {
  text-align: center;
  font-size: 16px;
  line-height: 25px;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: rgb(98, 198, 255);
    color: white;
  }
}

.psd-upload {
  color: white;
  width: 100px;
  float: left;
  cursor: pointer;
  height: 100%;
  font-weight: 900;
  font-family: SourceHanSansCN-Regular;
  &:hover {
    background-color: rgba(0, 0, 0, 0.096);
    color: white;
  }
  display: flex;
  align-items: center;
  justify-content: center;
}
.qrcodecreator {
  float: right;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  color: white;
  cursor: pointer;
  font-weight: 900;
  font-size: 15px;
  margin-right: 100px;
}
</style>
