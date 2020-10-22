/**
 * 工具包
 * @authors Your Name (you@example.org)
 * @date    2020-04-06 16:43:51
 * @version $Id$
 */

//获取屏幕宽高
export function getClientSize(){
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    let w = document.documentElement.clientWidth || document.body.clientWidth;
    return {
        width:w,
        height:h
    }
}

//按时间排序
export function sortTime(array,key){
    return array.sort(function(a,b) {
      var x = a[key];
      var y = b[key];
      return ((x>y)?-1:((x<y)?1:0));
    })
}

//问题终结状态转换
export function formatEnd () {
    return end == 0 ? '已终结' : '未终结';
}
