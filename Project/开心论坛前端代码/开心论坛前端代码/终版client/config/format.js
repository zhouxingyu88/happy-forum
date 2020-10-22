/**
 * 过滤器
 * @authors Your Name (you@example.org)
 * @date    2020-04-06 10:47:39
 * @version $Id$
 */

const vFilter = {
  // 性别
  sexFormat: function (val) {
    if (val === '0') {
      return '男';
    } else if (val === '1') {
      return '女';
    }
  }
}