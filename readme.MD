# px-rpx-vw-loader

px-rpx-vw-loader将项目中的rpx或者px单位转为vw，实现移动端自适应布局。

rpx的使用方法与微信小程序一样。

## 使用方法（以vue工程为例）
```javascript
// vue.config.js 配置文件
module.exports = {
    chainWebpack: (config) => {        
        config.module
            .rule('rpx')
            .test(/\.vue$/)
            .use('px-rpx-vw-loader')
            .loader('px-rpx-vw-loader')
            .options({
                // 根据设计稿尺寸修改，默认是750（iPhone 6）
                width: 750,
                // 转换单位
                unit: 'rpx',
                // 转换比例
                ratio: 1
            })
            .end();
    }
}
```
* width的取值是375到2160的正整数，默认是750，即iPhone 6的设计稿尺寸。
* unit是取值为'rpx' 或者 'px'的字符串，即将文件中的'rpx'或者'px'单位转为vw，默认取值是'rpx'。
* ratio是转换比例，取值是大于0的数值。对于iPhone 6 750的设计稿，页面采用'rpx'相对单位时，ratio设置为1即可。对于iPhone 6 750的设计稿，页面采用'px'单位时（需要根据设计稿标注的尺寸除以2），ratio设置为2即可，当然也可以按照设计稿直接设计稿上标注的像素值，ratio设置为1。

## 说明
vue文件中的template、js和style样式表中的样式单位统一采用rpx或者px，本loader实现转换为vw。

### class样式支持
* 对象语法
* 数组语法

### style样式支持
* 对象语法
* 数组语法

#### style的对象语法注意
禁止使用如下形式：
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'rpx' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}
```

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
data: {
  activeColor: 'red',
  fontSize: 30
}

请修改为如下形式：
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize }"></div>
data: {
  activeColor: 'red',
  fontSize: '30rpx'
}
```
即不能将数值和rpx分离，否则loader无法解析。

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize }"></div>
data: {
  activeColor: 'red',
  fontSize: '30px'
}
```
即不能将数值和px分离，否则loader无法解析。

### 示例(以vue工程为例)
[使用方法](https://cn.vuejs.org/v2/guide/class-and-style.html)

```html
<!--vue 文件--->
<template>
    <div class="root" v-bind:class="{ active: isActive }" v-bind:style="{ fontSize: fontSize }"></div>
</template>
<script>
export default {
    data() {
        return {
            isActive: true,
            fontSize: '30rpx'
        }
    }
};
</script>
<style>
.root{
    width:100%;
    height:87rpx;/*设计高度是多少,此处就填写多少*/
}
.active{
    font-size:20rpx;
}
</style>
```
or
```html
<!--vue 文件--->
<template>
    <div class="root" v-bind:class="{ active: isActive }" v-bind:style="{ fontSize: fontSize }"></div>
</template>
<script>
export default {
    data() {
        return {
            isActive: true,
            fontSize: '30px'
        }
    }
};
</script>
<style>
.root{
    width:100%;
    height:87px;/*设计高度是多少,此处就填写多少*/
}
.active{
    font-size:20px;
}
</style>
```