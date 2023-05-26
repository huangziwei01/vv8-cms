<template>
  <div class="my-table">
    <div class="header">
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div class="headerHandler">
        <slot name="headerHandler"></slot>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scoped">
            <slot :name="propItem.slotName" :row="scoped.row">
              {{ scoped.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
const props = defineProps({
  title: {
    type: String
  },
  tableData: {
    type: Array,
    default: () => {}
  },
  propList: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: true
  },
  childrenProps: {
    type: Object,
    default: () => {}
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['selection-change'])

const handleSelectionChange = (value: any) => {
  emit('selection-change', value)
  console.log(value)
}
</script>

<style scoped lang="less">
.my-table {
  background-color: #fff !important;
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .headerHandler {
      padding: 10px;
    }
  }

  .footer {
    padding-top: 10px;
    display: flex;
    justify-content: right;
  }
}
</style>
