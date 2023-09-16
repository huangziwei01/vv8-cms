<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <my-card :title="productCategoryPie">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </my-card>
      </el-col>
      <el-col :span="10">
        <my-card :title="$t('scatter')">
          <scatter-chart />
        </my-card>
      </el-col>
      <el-col :span="7">
        <my-card :title="$t('productCategoryRose')">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </my-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="row">
      <el-col :span="12">
        <my-card :title="$t('sale')">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </my-card>
      </el-col>
      <el-col :span="12">
        <my-card :title="$t('collection')">
          <bar-echart v-bind="categoryGoodsSale"></bar-echart>
        </my-card>
      </el-col>
    </el-row>
    <div class="echarts" ref="echartsRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, computed, watchEffect } from 'vue'
import MyCard from '@/base-ui/card'
import {
  IEchartXAxisLabel,
  IEchartValueData
} from '@/components/page-charts/types'
import pieEchart from '@/components/page-charts/src/pie-echart.vue'
import roseEchart from '@/components/page-charts/src/rose-echart.vue'
import lineEchart from '@/components/page-charts/src/line-echart.vue'
import barEchart from '@/components/page-charts/src/bar-echart.vue'
import scatterChart from '@/components/page-charts/src/scatter-chart.vue'

import { useAnalysisStore } from '@/store/analysis/analysis'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const productCategoryPie = i18n.t('productCategoryPie')

const analysisStore = useAnalysisStore()
analysisStore.getCategoryGoodsCount()
analysisStore.getCategoryGoodsSale()
analysisStore.getGoodsAddressSale()
const categoryGoodsCount = computed(() => {
  return analysisStore.categoryGoodsCount?.map((item: any) => {
    return { value: item.goodsCount, name: item.name }
  })
})
const goodsAddressSale = computed(() => {
  return analysisStore.categoryGoodsCount?.map((item: any) => {
    return { value: item.count, name: item.address }
  })
})
const categoryGoodsSale = computed(() => {
  const labels: IEchartXAxisLabel[] = []
  const values: IEchartValueData[] = []
  if (analysisStore.categoryGoodsSale) {
    for (const item of analysisStore.categoryGoodsSale) {
      labels.push(item.name)
      values.push(item.goodsSale)
    }
  }
  return { labels, values }
})

// watchEffect(() => {
//   console.log(categoryGoodsFavor.value)
// })
</script>

<style scoped lang="less">
.dashboard {
  .row {
    margin-top: 20px;
  }
}
</style>
