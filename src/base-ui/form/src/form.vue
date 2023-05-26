<template>
  <div class="my-form">
    <div class="header">
      <slot name="header"> </slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="(item, index) in formItems" :key="index">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              class="form-item"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeHolder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOption"
                  :modelValue="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeHolder"
                  style="width: 100%"
                  v-bind="item.otherOption"
                  :modelValue="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.label }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOption"
                  :modelValue="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType, computed } from 'vue'
import { IFormItem } from '../types'
// interface props {
//   modelValue: any
//   labelWidth: string
//   formItems: IFormItem[]
//   itemStyle: any
//   colLayout: any
// }
// const props = withDefaults(defineProps<props>(), {
//   modelValue: {},
//   labelWidth: '80px',
//   itemStyle: { padding: '10px 40px' },
//   colLayout: {
//     xl: 6, // ≥1920px
//     lg: 8, // ≥1200px
//     md: 12, // ≥992px
//     sm: 24, // ≥768px
//     xs: 24 // <768px
//   }
// })

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Object,
    default: () => {}
  },
  labelWidth: {
    type: String,
    default: () => '80px'
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 40px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // ≥1920px
      lg: 8, // ≥1200px
      md: 12, // ≥992px
      sm: 24, // ≥768px
      xs: 24 // <768px
    })
  }
})
const emit = defineEmits(['update:modelValue'])

const handleValueChange = (val: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: val })
}
</script>

<style scoped lang="less">
// .my-form {
// }
</style>
