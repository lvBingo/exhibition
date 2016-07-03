import $ from 'jquery';

/**
 *  等到一个 0 到 num - 1 的随机数
 *  @author James lv
 *  @creatdate 2016-01-11T19:27:17+0800
 *  @param     {[type]}                 num [description]
 *  @return    {[type]}                     [description]
 */
export function getRandom (num) {
    return Math.floor(Math.random() * num)
}



var ua = navigator.userAgent.toLowerCase();
/**
 *  用户浏览器类型
 *  @type {Object}
 */
export var BROWSER = {
    isAndorid: ua.indexOf("android") != -1 ? 1 : 0,
    isiOS: !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/),
    isiPhone: ua.indexOf('iphone') > -1 || ua.indexOf('mac') > -1,
    isiPad: ua.indexOf('ipad') > -1,

    isWeChat: ua.indexOf("micromessenger") != -1 ? 1 : 0
}

export var endCssAnimate = function(ele, fn) {
    $(ele).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', fn);
}