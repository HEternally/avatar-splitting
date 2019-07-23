(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.avatar = {}));
}(this, function (exports) { 'use strict';

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    function avatar(options) {
        var image = options.image;
        var maskImage = options.maskImage;
        var vertical = false;
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
        var option = extend({
            exportType: 'base64',
            success: function success() {},
            error: function error() {}
        }, options);
        var maskImg = new Image();
        maskImg.crossOrigin = '*';

        maskImg.onload = function () {
            var maskCanvas = document.createElement('canvas'),
                maskCtx = maskCanvas.getContext('2d');
            maskCanvas.width = maskImg.width;
            maskCanvas.height = (vertical ? maskImg.height : maskImg.height / 2) + ' ';
            maskCtx.drawImage(maskImg, 0, '' + (vertical ? 0 : maskCanvas.height), maskImg.width, maskCanvas.height, 0, 0, maskImg.width, maskCanvas.height);
            var maskImageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);

            var originImg = new Image();
            originImg.crossOrigin = '*';

            originImg.onload = function () {
                var originCanvas = document.createElement('canvas'),
                    originCtx = originCanvas.getContext('2d');
                originCanvas.width = '' + (vertical ? maskImg.width : originImg.width);
                originCanvas.height = '' + (vertical ? maskCanvas.height : originImg.height / 2);
                originCtx.drawImage(originImg, 0, 0, originImg.width, '' + (vertical ? originImg.height : originImg.height / 2), 0, 0, '' + (vertical ? maskImg.width : originImg.width), '' + (vertical ? maskImg.height : originImg.height / 2));
                var originImgData = originCtx.getImageData(0, 0, originCanvas.width, originCanvas.height),
                    resultBase64 = get_alpha_image(originImgData, maskImageData, option);
                option.success(resultBase64);
            };

            originImg.src = image + '?' + new Date().getTime();

            originImg.onerror = function () {
                option.error({ code: 0, msg: 'load image error' });
            };
        };

        maskImg.src = '' + (vertical ? maskImage : image) + '?' + new Date().getTime();

        maskImg.onerror = function () {
            option.error({ code: 0, msg: 'load image error' });
        };
    }

    function extend(opt1, opt2) {
        for (var i in opt2) {
            if (opt2.hasOwnProperty(i)) {
                if (_typeof(opt2[i]) == 'object') {
                    if (_typeof(opt1[i]) !== 'object' || opt1[i] === null) {
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
        var canvas = document.createElement('canvas'),
            result = canvas.getContext('2d').createImageData(srcImage);
        var size = srcImage.width * srcImage.height * 4,
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

        var resultCanvas = document.createElement('canvas'),
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

    exports.default = avatar;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=avatar-splitting.js.map
