# avatar-splitting 
![](https://img.shields.io/github/issues/HEternally/avatar-splitting.svg) ![](https://img.shields.io/github/stars/HEternally/avatar-splitting.svg) ![](https://img.shields.io/github/forks/HEternally/avatar-splitting.svg)

## Demo

[Demo](https://heternally.github.io/avatar-splitting/demo/index.html)

## 文档

 [中文](https://github.com/HEternally/avatar-splitting/blob/master/README_ZH.md)  [英文](https://github.com/HEternally/avatar-splitting/blob/master/README.md)

## 介绍

基于人像区域的蒙版(mask)图层的人像抠出方法，即将人和背景进行分离

## 安装方法

1. 可以直接从[GitHub](https://github.com/HEternally/avatar-splitting)下载
2. `Javascript`引入
```javascript
<script src="https://cdn.jsdelivr.net/npm/avatar-splitting@2.0.4/dist/avatar-splitting.min.js"></script>
```
3. 通过`npm`安装
```javascript
npm install --save-dev avatar-splitting

import avatar from 'avatar-splitting'
```
## 用法

1. 原图和蒙版同一张
![](http://mtapplet.meitudata.com/5d3594af6d16f939d0.jpg)
```javascript
avatar({
    image:'http://mtapplet.meitudata.com/5d3594af6d16f939d0.jpg', //必填 原图或是原图、mask合成图，可以传 url / base64，支持相对路径;
    exportType: 'base64', // 选填 导出图片方式，可以传 base64 / canvas 
    success(res) {
        console.log(res);// res 可能为 base64 或者 canvas节点
    },
    error(req) {
        // req 返回 错误原因 {code:0,msg:''}
        console.log(req);
    },
});
```
2. 原图和蒙版两张
可在[美图AI开放平台](https://ai.meitu.com/algorithm/bodyTechnology/segmentEx)上传原图获取蒙版图
![](https://oss.mtlab.meitu.com/mtopen/2QSdx418G5QLTEqCVAtbKrMGTWPcP8tY/MTU2Mzg3MjQwMA==/6fa1e1c5-27cc-4bc4-97de-64edf40a3996.jpg?1563875002917)
![](https://oss.mtlab.meitu.com/mtopen/2QSdx418G5QLTEqCVAtbKrMGTWPcP8tY/MTU2Mzg3MjQwMA==/c8c87d26-8d61-420c-aad0-31356af49aa1.jpg?1563875002794)

```javascript
avatar({
    image:'https://oss.mtlab.meitu.com/mtopen/2QSdx418G5QLTEqCVAtbKrMGTWPcP8tY/MTU2Mzg3MjQwMA==/6fa1e1c5-27cc-4bc4-97de-64edf40a3996.jpg?1563875002917', //必填 原图或是原图、mask合成图，可以传 url / base64，支持相对路径;
    maskImage: 'https://oss.mtlab.meitu.com/mtopen/2QSdx418G5QLTEqCVAtbKrMGTWPcP8tY/MTU2Mzg3MjQwMA==/c8c87d26-8d61-420c-aad0-31356af49aa1.jpg?1563875002794', // 选填 mask图，可以传url / base64，支持相对路径;
    exportType: 'canvas',
    success(res) {
        console.log(res);// res 可能为 base64 或者 canvas节点
    },
    error(req) {
        //{code:0,msg:''}
        console.log(req);
    },
});
```




## 版本

- `2.0.3 -- 修改README.md`
- `2.0.1 -- 支持双图模式（原图与mask分离）`
- `2.0.0 -- 正式版发布`
- `1.0.0 -- 测试版发布`