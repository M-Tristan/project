<template>
  <div class="inputNumber">
    <input
      @keydown.stop
      ref="input"
      @keyup="upperCase"
      :value="value"
      @change="handleChange"
      class="input"
    />
    <div class="button-area">
      <div class="up button-item" @mouseup="closeInter" @mousedown="add">
        <i class="el-icon-caret-top"></i>
      </div>
      <div class="down button-item" @mouseup="closeInter" @mousedown="reduce">
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "input-number",
  props: {
    modelValue: {
      type: [Number, String],
      default: 0,
    },
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER,
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    let t: NodeJS.Timeout;
    let value = ref(Math.round(Number(props.modelValue) * 100) / 100);
    const add = () => {
      t = setInterval(() => {
        if (value.value >= props.max) {
          return;
        }
        value.value = Number((value.value + props.step).toFixed(2));
        emit("update:modelValue", value.value);
      }, 40);
    };
    let input = ref(null as unknown as HTMLInputElement);
    const reduce = () => {
      t = setInterval(() => {
        if (value.value <= props.min) {
          return;
        }

        value.value = Number((value.value - props.step).toFixed(2));

        emit("update:modelValue", value.value);
      }, 40);
    };
    const closeInter = () => {
      clearInterval(t);
      emit("finishChange");
    };
    const handleChange = () => {
      let inputValue = input.value.value;
      value.value = Number(inputValue);
      if (value.value < props.min) {
        value.value = props.min;
      }
      if (value.value > props.max) {
        value.value = props.max;
      }
      emit("update:modelValue", value.value);
    };
    const upperCase = () => {
      //用户只能输入正负数与小数
      let obj = input.value;
      var t = obj.value.charAt(0);
      obj.value = obj.value
        .replace(".", "$#$") //把第一个字符'.'替换成'$#$'
        .replace(/\./g, "") //把其余的字符'.'替换为空
        .replace("$#$", ".") //把字符'$#$'替换回原来的'.'
        .replace(/[^\d.]/g, "") //只能输入数字和'.'
        .replace(/^\./g, "") //不能以'.'开头
        .replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1"); //只保留2位小数
      if (t == "-") {
        obj.value = "-" + obj.value;
      }
    };
    watch(
      () => props.modelValue,
      (val) => {
        value.value = Math.round(Number(val) * 100) / 100;
      }
    );
    return { value, add, closeInter, reduce, handleChange, input, upperCase };
  },
});
</script>

<style lang="scss" scoped>
.inputNumber {
  width: 90%;
  border: 1px solid rgb(233, 233, 233);
  border-radius: 5px;
  height: 28px;
  display: flex;
  align-items: center;
  &:hover {
    border: 1px solid rgb(0, 174, 255);
  }
}
.input {
  width: 80%;
  background: none;
  outline: none;
  border: none;
  float: left;
  &:focus {
    border: none;
  }
}
.button-area {
  width: 23px;
  float: left;
  height: 28px;
  .button-item {
    height: 14px;
    line-height: 14px;
    cursor: pointer;
  }
}
</style>