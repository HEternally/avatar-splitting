export default function avatar(options) {
    let image = options.image;
    let maskImage = options.maskImage;
    let vertical = false;
    if (!image) {
        console.error('Image cannot be empty!');
        return;
    } else if (typeof image != 'string') {
        console.error('Image must be a string type!');
        return;
    }
    if (maskImage != '' && typeof maskImage != 'undefined') {
        if (typeof maskImage != 'string') {
            console.error('maskImage must be a string type!');
            return;
        } else {
            vertical = true;
        }
    } else {
        vertical = false;
    }
    let option = extend({
        exportType : 'base64',
        success(){},
        error(){},
    }, options);
    let maskImg = new Image;
    maskImg.crossOrigin = '*';

    maskImg.onload = function () {
        let maskCanvas = document.createElement('canvas'),
            maskCtx = maskCanvas.getContext('2d');
        maskCanvas.width = maskImg.width;
        maskCanvas.height = `${vertical ? maskImg.height  : maskImg.height / 2} `;
        maskCtx.drawImage(maskImg, 0, `${vertical ? 0 : maskCanvas.height}`, maskImg.width, maskCanvas.height, 0, 0, maskImg.width, maskCanvas.height);
        let maskImageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);

        let originImg = new Image;
        originImg.crossOrigin = '*';

        originImg.onload = function () {
            let originCanvas = document.createElement('canvas'),
                originCtx = originCanvas.getContext('2d');
            originCanvas.width = `${vertical ? maskImg.width : originImg.width}`;
            originCanvas.height = `${vertical ? maskCanvas.height : originImg.height/2}`;
            originCtx.drawImage(originImg, 0, 0,originImg.width, `${vertical ? originImg.height : originImg.height / 2}`, 0, 0, `${vertical ? maskImg.width : originImg.width}`, `${vertical ? maskImg.height : originImg.height / 2}`);
            let originImgData = originCtx.getImageData(0, 0, originCanvas.width, originCanvas.height),
                resultBase64 = get_alpha_image(originImgData, maskImageData, option);
            option.success(resultBase64);
        };

        originImg.src = image + '?' + new Date().getTime();

        originImg.onerror = () => {
            option.error({code:0,msg:'load image error'});
        };
    };

    maskImg.src = `${vertical ? maskImage : image}` + '?' + new Date().getTime();

    maskImg.onerror = () => {
        option.error({code:0,msg:'load image error'});
    };
}

function extend(opt1, opt2) {
    for (let i in opt2) {
        if (opt2.hasOwnProperty(i)) {
            if (typeof opt2[i] == 'object') {
                if (typeof opt1[i] !== 'object' || opt1[i] === null) {
                    opt1[i] = {};
                }
                extend(opt1[i], opt2[i]);
            } else {
                opt1[i] = opt2[i];
            }
        }
    }
    return opt1;
}

function get_alpha_image(srcImage, maskImage, option) {
    let canvas = document.createElement('canvas'),
        result = canvas.getContext('2d').createImageData(srcImage);
    let size = srcImage.width * srcImage.height * 4,
        MT_RED = 0,
        MT_GREEN = 1,
        MT_BLUE = 2,
        MT_ALPHA = 3;

    for (var i = 0; i < size; i += 4) {
        result.data[i + MT_RED] = srcImage.data[MT_RED + i];
        result.data[i + MT_GREEN] = srcImage.data[MT_GREEN + i];
        result.data[i + MT_BLUE] = srcImage.data[MT_BLUE + i];
        result.data[i + MT_ALPHA] = maskImage.data[i];
    }

    let resultCanvas = document.createElement('canvas'),
        resultCtx = resultCanvas.getContext('2d');
    resultCanvas.width = result.width;
    resultCanvas.height = result.height;
    resultCtx.putImageData(result, 0, 0, 0, 0, resultCanvas.width, resultCanvas.height);

    if (option.exportType == 'canvas') {
        return resultCanvas;
    } else {
        return resultCanvas.toDataURL('image/png');
    }
}