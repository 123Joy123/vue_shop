// import { get } from 'core-js/core/dict'
import {request} from './request'

export function getHomeAllData(){
    return request({
        url:'/api/index',
        // method:get,

    })
}