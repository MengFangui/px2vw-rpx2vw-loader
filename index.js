// loader-utils工具包
var utils = require('loader-utils');

function toFixed(number, precision) {
    var multiplier = Math.pow(10, precision + 1),
        wholeNumber = Math.floor(number * multiplier);
    return Math.round(wholeNumber / 10) * 10 / multiplier;
}

module.exports = function (source) {
    // source是compile传递给Loader的文件原内容
    // 缓存数据
    if (this.cacheable) this.cacheable();
    // 获取配置参数
    const options = utils.getOptions(this);
    const opts = options || {};
    // 设计稿尺寸（默认750）
    const width = opts.width || 750,
        // 设计稿单位（默认rpx）
        unit = opts.unit || 'rpx',
        // px换算rpx比例系数(默认是2)
        ratio = opts.ratio || 1,
        // 精度
        unitPrecision = opts.unitPrecision || 6;
    if (width < 375 || width > 2160 || isNaN(width)) {
        console.error('Please check the width parameter. It should be a number between 375 and 2160')
        // 不做任何处理
        return source
    }
    if (unit !== 'rpx' && unit !== 'px') {
        console.error('Please check the unit parameter. It should be rpx or px')
        // 不做任何处理
        return source
    }
    if (ratio < 0 || isNaN(ratio)) {
        console.error('Please check the ratio parameter. It should be a number and it should be greater than 0')
        // 不做任何处理
        return source
    }
    // 输入的精度不是正整数的话 不处理
    if (!(/(^[1-9]\d*$)/.test(unitPrecision))) {
        console.error('Please check the unitPrecision parameter. It should be a a positive integer')
        // 不做任何处理
        return source
    }
    const scale = 100 / width;
    // 正则表达式 /\b\d+(\.\d+)?rpx\b/g
    // 或者 /\b\d+(\.\d+)?px\b/g
    // ？表示(\.\d+)出现0次或者1次，即小数点出现0次数或者1次
    const matchPXExp = new RegExp("\\b\\d+(\\.\\d+)?" + unit + "\\b", 'g');

    // 返回处理后的内容
    return source.replace(matchPXExp, function (match) {
        // 获取rpx前面的数值
        var pxValue = 0
        if (unit === 'rpx') {
            pxValue = parseFloat(match.slice(0, match.length - 3));
        } else {
            pxValue = parseFloat(match.slice(0, match.length - 2));
        }
        // 只处理数值，NaN不处理
        if (!isNaN(pxValue)) {
            // return (pxValue * ratio * scale).toFixed(6) + 'vw';
            return toFixed(pxValue * ratio * scale, unitPrecision) + 'vw';
        }
    });
};
