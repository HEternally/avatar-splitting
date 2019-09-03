# avatar-splitting 
![](https://img.shields.io/github/issues/HEternally/avatar-splitting.svg) ![](https://img.shields.io/github/stars/HEternally/avatar-splitting.svg) ![](https://img.shields.io/github/forks/HEternally/avatar-splitting.svg)

## Demo

[Demo](https://heternally.github.io/avatar-splitting/demo/index.html)

## Document

 [Chinese](https://github.com/HEternally/avatar-splitting/blob/master/README_ZH.md)  [English](https://github.com/HEternally/avatar-splitting/blob/master/README.md)

## Introduction
A portrait extraction method based on a mask layer of a portrait area, which separates the person from the background
## Installation

1. Can be downloaded directly from [GitHub](https://github.com/HEternally/avatar-splitting)
2. `Javascript` introduction
```javascript
<script src="https://cdn.jsdelivr.net/npm/avatar-splitting@2.0.4/dist/avatar-splitting.min.js"></script>
```
3. Installed via `npm`
```javascript
npm install --save-dev avatar-splitting

import avatar from 'avatar-splitting'
```
## Usage

1. The original picture and the mask are the same
![](http://mtapplet.meitudata.com/5d3594af6d16f939d0.jpg)
```javascript
avatar({
    image:'http://mtapplet.meitudata.com/5d3594af6d16f939d0.jpg', //Required, original image or original image, mask composite image, can pass url, support relative path;
    exportType: 'base64', // Optional, export image mode, you can pass base64 / canvas
    success(res) {
        console.log(res);// Res may be base64 or canvas node
    },
    error(req) {
        // Req back error reason {code:0,msg:''}
        console.log(req);
    },
});
```
2. Original image and mask two
The original image can be uploaded on the [Mito AI open platform](https://ai.meitu.com/algorithm/bodyTechnology/segmentEx) to obtain the mask.
![](https://oss.mtlab.meitu.com/mtopen/2QSdx418G5QLTEqCVAtbKrMGTWPcP8tY/MTU2Mzg3MjQwMA==/6fa1e1c5-27cc-4bc4-97de-64edf40a3996.jpg?1563875002917)
![](https://oss.mtlab.meitu.com/mtopen/2QSdx418G5QLTEqCVAtbKrMGTWPcP8tY/MTU2Mzg3MjQwMA==/c8c87d26-8d61-420c-aad0-31356af49aa1.jpg?1563875002794)

```javascript
avatar({
    image:'https://oss.mtlab.meitu.com/mtopen/2QSdx418G5QLTEqCVAtbKrMGTWPcP8tY/MTU2Mzg3MjQwMA==/6fa1e1c5-27cc-4bc4-97de-64edf40a3996.jpg?1563875002917', //Required, original image or original image, mask composite image, can pass url, support relative path;
    maskImage: 'https://oss.mtlab.meitu.com/mtopen/2QSdx418G5QLTEqCVAtbKrMGTWPcP8tY/MTU2Mzg3MjQwMA==/c8c87d26-8d61-420c-aad0-31356af49aa1.jpg?1563875002794', // Optional, mask map, can pass url, support relative path;
    exportType: 'canvas',
    success(res) {
        console.log(res);// Res may be base64 or canvas node
    },
    error(req) {
        // Req back error reason {code:0,msg:''}
        console.log(req);
    },
});
```




## Version

- `2.0.3 -- Modify README.md`
- `2.0.1 -- Support dual image mode (the original image is separated from the mask)`
- `2.0.0 -- Official release`
- `1.0.0 -- Beta release`
