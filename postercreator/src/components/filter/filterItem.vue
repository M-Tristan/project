<template>
  <div class="content" @click="addFilter">
    <div class="selected" v-show="active"></div>
    <div class="filter-item">
      <canvas width="100" height="100" ref="itemcanvas"></canvas>
    </div>
    <div>{{ name }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import FilterUtil from "../../lib/filterUtil";
export default defineComponent({
  props: {
    type: String,
    name: String,
  },
  setup(props) {
    const store = useStore();
    const editModule: any = computed(() => {
      return store.state.editModule;
    });
    const itemcanvas = ref(null as unknown as HTMLCanvasElement);
    const draw = () => {
      const path = "/src/assets/Cheetah.jpeg"
      let imagesrc = import.meta.globEager('/src/assets/Cheetah.jpeg')[path].default;
      console.log(imagesrc)
      let image = new Image();
      image.src = imagesrc;
      image.onload = () => {
        let ctx = itemcanvas.value.getContext("2d");
        ctx?.drawImage(image, 0, 0, 100, 100);
        switch (props.type) {
          case "blackWhite":
            FilterUtil.blackWhite(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );
            break;
          case "reverse":
            FilterUtil.reverse(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );
            break;
          case "mosaic":
            FilterUtil.mosaic(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );
            break;
          case "removeRed":
            FilterUtil.removeRed(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );
            break;
          case "removeGreen":
            FilterUtil.removeGreen(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );
            break;
          case "removeBlue":
            FilterUtil.removeBlue(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );
            break;
          case "grayscale":
            FilterUtil.grayscale(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );
            break;
          case "red":
            FilterUtil.red(ctx as CanvasRenderingContext2D, itemcanvas.value);
            break;
          case "green":
            FilterUtil.green(ctx as CanvasRenderingContext2D, itemcanvas.value);
            break;
          case "blue":
            FilterUtil.blue(ctx as CanvasRenderingContext2D, itemcanvas.value);
            break;
          case "nostalgia":
            FilterUtil.nostalgia(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );
            break;
          case "casting":
            FilterUtil.casting(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );
            break;
          case "frozen":
            FilterUtil.frozen(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );

            break;
          case "comicStrip":
            FilterUtil.comicStrip(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );

            break;
          case "brown":
            FilterUtil.brown(ctx as CanvasRenderingContext2D, itemcanvas.value);

            break;
          case "darktone":
            FilterUtil.darktone(
              ctx as CanvasRenderingContext2D,
              itemcanvas.value
            );

            break;

          default:
        }
      };
    };

    onMounted(() => {
      draw();
    });

    const active = computed(() => {
      if (!editModule.value.filterInfo) {
        return false;
      }
      return editModule.value.filterInfo.type === props.type;
    });
    const addFilter = () => {
      store.commit("addFilter", props.type);
    };
    return { itemcanvas, addFilter, active };
  },
});
</script>

<style lang="scss" scoped>
.filter-item {
  width: 100px;
  height: 100px;
  box-shadow: 0 0 4px rgb(185, 185, 185);
  cursor: pointer;
}
.content {
  width: 100px;
  height: 130px;
  float: left;
  margin: 5px;
  position: relative;
}
.selected {
  width: 100%;
  height: 100%;
  border: 2px solid rgb(0, 162, 255);
  background-color: rgba(0, 255, 255, 0);
  position: absolute;
  top: 0;
  left: 0;
}
</style>