//品牌管理
import request from '@/utils/request'

export const reqTradeMarkList = (page,limit) => request({url:`/admin/product/baseTrademark/${page}/${limit}`})
