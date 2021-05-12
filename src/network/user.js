import {request} from './request'
export function register(){
    return request({
        url:'/api/auth/register',
        method:'post',
        data,
    })
}
export function login(){
    return request({
        url:'/api/auth/login',
        method:'post',
        data,
    })
}