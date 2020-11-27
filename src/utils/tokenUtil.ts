import {getNowTime} from './time';
export  function isTokenExpires():boolean{
    //token
    let bzz_token = localStorage.getItem('bzz_token');
    //token过期时间
    let expiresIn = localStorage.getItem('expiresIn');
    if(expiresIn == null){
        expiresIn = '0';
    }
    //最后一次请求时间
    let lastRequestTime = localStorage.getItem('lastRequestTime');
    if(lastRequestTime == null){
        lastRequestTime = '0';
    }
    //第一次登录时间
    let loginTime = localStorage.getItem('loginTime');
    if(loginTime == null){
        loginTime = '0';
    }
    //有效
    if(lastRequestTime > loginTime && lastRequestTime < loginTime + expiresIn){
        //每次请求判断一下是否到了 刷新时间，默认距离过期时间10分钟刷新一下token,或者延长token
        let refrushTime = parseInt(loginTime) + parseInt(expiresIn) - parseInt(lastRequestTime) ;
        if(refrushTime < 60*10 ){
            localStorage.setItem('lastRequestTime',getNowTime+'');
            //请求延长token
        }
        return true;
    }



    return true;
}

