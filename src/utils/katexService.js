/**
 * Created by luowei on 10/22/15.
 */
import katex from 'katex';
import store from 'control';


let images = {
    geqslant: require('static/images/symbol_largerandequal.svg'),
    leqslant: require('static/images/symbol_smallerandequal.svg'),
    cdots: require('static/images/cdots.svg'),
    green:{
        geqslant: require('static/images/geqslant-green.svg'),
        leqslant: require('static/images/leqslant-green.svg'),
        cdots: require('static/images/cdots-green.svg')
    }
}

let matchingRule = /(\d*(\\dfrac|\\sqrt){+)+({?[0-9a-zA-Z\\pi]*\^*[+-]?}?(\\sqrt|\\dfrac)*)*/g;

// function parseTex(rawString) {
//   if (!!rawString) {
//     return rawString.replace(/\$([^\$]*)\$/gm, function(match, tex) {
//       try {
//         return katex.renderToString(tex, {displayMode: false});
//       } catch(e) {
//         console.log(e);
//       }
//     });
//   }
// }

let parseTex = (rawString) => {
    if(!!rawString){
      rawString.replace(/\$([^\$]*)\$/gm, (match, text) => {
        let matchingResultArr = text.match(matchingRule);
        let result = '$' + text + '$';
        if(matchingResultArr && matchingResultArr.length){
          let replacedStr = ('<div class="katex-higher">' + result + '</div>').hexEncode();
          rawString = rawString.hexEncode().replace(new RegExp(result.hexEncode(), 'g'), replacedStr).hexDecode();
        } else {
          let replacedStr = ('<div class="katex-flat">' + result + '</div>').hexEncode();
          rawString = rawString.hexEncode().replace(new RegExp(result.hexEncode(), 'g'), replacedStr).hexDecode();
        }
      });
    }

    if (!!rawString) {
      return rawString.replace(/\$([^\$]*)\$/gm, (match, tex) => {
        return katex.renderToString(tex, {displayMode: false});
      });
    }
};

/**
 *  符号转译的桥接方法
 *  @author James lv
 *  @creatdate 2016-02-25T15:14:17+0800
 *  @param     {[type]}                 rawString [Katex String]
 *  @param     {Boolean}                isGreen   [是否替换成绿色图片]
 *  @return    {[type]}                           [description]
 */
let parseTexBridge = (rawString, isGreen)=>{
    let htmlStr = parseTex(rawString);
    if(store.getState().getIn(['exercise', 'UI', 'isShowImgSymbol']))
        htmlStr = symbolToImg(htmlStr, isGreen);
    return htmlStr;
}

/**
 *  分析已有的HTML结构并且将 大于等于号、小于等于号 替换成对应图片。
 *  @author James lv
 *  @creatdate 2016-02-25T15:09:47+0800
 *  @param     {[String]}                 htmlStr [已有的HTML结构]
 *  @param     {Boolean}                isGreen [是否替换成绿色图片]
 *  @return    {[String]}                         [处理后的HTML字符串]
 */
let symbolToImg = (htmlStr, isGreen)=>{
    let leqslantReg = new RegExp('<span class="mrel amsrm">⩽</span>', 'g'),      // 小于
        geqslantReg = new RegExp('<span class="mrel amsrm">⩾</span>', 'g'),      // 大于
        cdotsReg    = new RegExp('<span class="minner">⋯</span>', 'g');          // 省略号
    let leqslantImg = isGreen ? images.green.leqslant : images.leqslant,
        geqslantImg = isGreen ? images.green.leqslant : images.geqslant,
        cdotsImg    = isGreen ? images.green.cdots : images.cdots;
    htmlStr = htmlStr.replace(leqslantReg, '<i style="background-image:url('+leqslantImg+');" class="katex-spec-symbol"></i>')
                     .replace(geqslantReg, '<i style="background-image:url('+geqslantImg+');" class="katex-spec-symbol"></i>')
                     .replace(cdotsReg, '<i style="background-image:url('+cdotsImg+');" class="katex-spec-symbol"></i>');
    return htmlStr;
}

//扩展String
String.prototype.hexEncode = function(){
  var hex, i;
  var result = "";
  for (i=0; i<this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ("000"+hex).slice(-4);
  }
  return result
}
String.prototype.hexDecode = function(){
  var j;
  var hexes = this.match(/.{1,4}/g) || [];
  var back = "";
  for(j = 0; j<hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }
  return back;
}


module.exports = parseTexBridge;