import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  amountListRequest,
  categoryGoodsCountRequest,
  categoryGoodsFavorRequest,
  categoryGoodsSaleRequest,
  goodsSaleTop10Request,
  goodsAddressSaleRequest
} from '@/api/analysis/analysis'

export const useAnalysisStore = defineStore('analysis', () => {
  const amountList = ref<any>([])
  const categoryGoodsCount = ref<any>([])
  const categoryGoodsSale = ref<any>([])
  const categoryGoodsFavor = ref<any>([])
  const goodsSaleTop10 = ref<any>([])
  const goodsAddressSale = ref<any>([])
  async function getAmountList() {
    let res = await amountListRequest()
    amountList.value = res
  }
  async function getCategoryGoodsCount() {
    let res = await categoryGoodsCountRequest()
    categoryGoodsCount.value = res
  }
  async function getCategoryGoodsSale() {
    let res = await categoryGoodsSaleRequest()
    categoryGoodsSale.value = res
  }
  async function getCategoryGoodsFavor() {
    let res = await categoryGoodsFavorRequest()
    categoryGoodsFavor.value = res
  }
  async function getGoodsSaleTop10() {
    let res = await goodsSaleTop10Request()
    goodsSaleTop10.value = res
  }
  async function getGoodsAddressSale() {
    let res = await goodsAddressSaleRequest()
    goodsAddressSale.value = res
  }

  return {
    amountList,
    categoryGoodsCount,
    categoryGoodsFavor,
    categoryGoodsSale,
    goodsSaleTop10,
    goodsAddressSale,
    getAmountList,
    getCategoryGoodsCount,
    getCategoryGoodsFavor,
    getCategoryGoodsSale,
    getGoodsSaleTop10,
    getGoodsAddressSale
  }
})
