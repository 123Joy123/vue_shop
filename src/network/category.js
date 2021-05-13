import {request} from './request'

export function getCategory(){
    return request({
        url:'/api/goods',
        // method:get,

    })
}

export function getCategoryGoods(order='sales',cid=0,page=1){
    return request({
        url:'/api/goods?category='+cid+'&page='+page+'&'+order+'=1',
        // method:get,

    })
}