import {request} from './request'

//创建订单
export function createOrder(params){
    return request({
        url:'/api/orders',
        method:'post',
        params,
    })
}

//获取订单预览
export function getOrderPreview(){
    return request({
        url:'/api/orders/preview',
    })
}

//订单支付，获取二维码
export function payOrder(order,parems){
    return request({
        url:`/api/orders/${order}/pay`,
        parems,
    })
}

//订单支付状态
export function payOrderStatus(order){
    return request({
        url:`/api/orders/${order}/status`,
    })
}

//获取订单列表
export function getOrderList(params){
    return request({
        url:'/api/orders',
        params,
    })
}

//订单详情
export function getOrderDetail(order){
    return request({
        url:`/api/orders/${order}`,
        params:{
            include:'user,orderDetails.goods'
        },
    })
}

//确认收货
export function confirmOrder(order){
    return request({
        url:`/api/orders/${order}/confirm`,
        method:'patch',
    })
}

//获取物流信息
export function viewExpress(order){
    return request({
        url:`/api/orders/${order}/express`,
    })
}