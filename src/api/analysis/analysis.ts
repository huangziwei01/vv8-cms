import MYRequest from '@/service/index'

enum AnalysisAPI {
  amountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  goodsSaleTop10 = '/goods/sale/top10',
  goodsAddressSale = '/goods/address/sale'
}

export function amountListRequest() {
  return MYRequest.get({
    url: AnalysisAPI.amountList
  })
}

export function categoryGoodsCountRequest() {
  return MYRequest.get({
    url: AnalysisAPI.categoryGoodsCount
  })
}

export function categoryGoodsSaleRequest() {
  return MYRequest.get({
    url: AnalysisAPI.categoryGoodsSale
  })
}

export function categoryGoodsFavorRequest() {
  return MYRequest.get({
    url: AnalysisAPI.categoryGoodsFavor
  })
}

export function goodsSaleTop10Request() {
  return MYRequest.get({
    url: AnalysisAPI.goodsSaleTop10
  })
}

export function goodsAddressSaleRequest() {
  return MYRequest.get({
    url: AnalysisAPI.goodsAddressSale
  })
}
