import imgCache from 'imgcache.js';
import _ from 'lodash';
// let img182 = require('static/lALOBeoTB0jMtg_182_72.png')
// console.log(img182)

/**
 *  在移动端缓存图片，并且添加click事件，将Retina图片处理为1倍大小
 *  @author James lv
 *  @creatdate 2016-01-08T13:53:51+0800
 *  @return    {[type]}                 [description]
 */
imgCache.onionCacheImages = function() {
  let imgs = document.querySelectorAll('.question-desc img, .answer-explain img');
  _.each(imgs, function(img) {
    let url=img.src,//img182,
        retinaImgWidth = img.getAttribute('data-width');    // 处理Retina图片标记
    let hasQuestionMark;
    if(!retinaImgWidth)       // 如果图片不是Retina图片
      url += '?imageMogr2/thumbnail/540x540';
    else{
      img.setAttribute('style', 'width:'+ (retinaImgWidth / 2) + 'px');     // 将Retina图片缩小至1/2
      img.classList.add('katex-img');
    }
    img.setAttribute('data-url', url);
    img.setAttribute('alt', '图片加载失败，点击刷新');
    img.src = url;
    hasQuestionMark = /\?/.test(url);
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      img.src = img.getAttribute('data-url') + (hasQuestionMark ? '&' : '?') + 'time=' + new Date().getTime();
    });
    cacheImg(img);
  });
};

function cacheImg(target) {
  imgCache.isCached(target.src, function(path, success) {
    if (success) {
      imgCache.useCachedFile(target);
    } else {
      imgCache.cacheFile(target.src, function() {
        imgCache.useCachedFile(target);
      });
    }
  });
};

module.exports = imgCache;