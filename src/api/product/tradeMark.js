//品牌管理
import request from '@/utils/request'

// 获取商品列表接口
export const reqTradeMarkList = (page,limit) => request({url:`/admin/product/baseTrademark/${page}/${limit}`})

// 更新商品接口
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if(tradeMark.id){
    return request({url:'/admin/product/baseTrademark/update', method:'put', data:tradeMark})
  }else{
    return request({url:'/admin/product/baseTrademark/save', method:'post', data:tradeMark})
  }
}

// 删除商品接口
export const reqRemoveTradeMark = (id) =>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})