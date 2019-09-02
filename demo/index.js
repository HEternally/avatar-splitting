import  avatar  from '../src/index';

window.onload = function(){
    let $btn = document.getElementById('btn');
    let $btn2 = document.getElementById('btn2');
    // let $origin = document.getElementById('origin');
    let $result = document.getElementById('result');
    let $result2 = document.getElementById('result2');
    $btn.addEventListener('click',function(){
        avatar({
            image:'http://mtapplet.meitudata.com/5d3594af6d16f939d0.jpg',
            exportType: 'base64', // 选填 导出图片方式，可以传 base64 / canvas 
            success(res) {
                // res 可能为 base64 或者 canvas节点
                let img = document.createElement('img');
                img.className = 'image';
                img.src = res;
                $result.appendChild(img);
                // $result.appendChild(res);
            },
            error(req) {
                // req 返回 错误原因 {code:0,msg:''}
                console.log(req);
            },
        });
    });
    $btn2.addEventListener('click',function() {
        avatar({
            image:'https://camo.githubusercontent.com/e2a7016b6b8ee0b5b87b99ce66a2d56d1129ea28/68747470733a2f2f6f73732e6d746c61622e6d656974752e636f6d2f6d746f70656e2f32515364783431384735514c54457143564174624b724d4754575063503874592f4d5455324d7a67334d6a51774d413d3d2f36666131653163352d323763632d346263342d393764652d3634656466343061333939362e6a70673f31353633383735303032393137', //必填 原图或是原图、mask合成图，可以传 url / base64，支持相对路径;
            maskImage: 'https://camo.githubusercontent.com/f7a4d4fd516e71a83e31278d18e74e4dab64198e/68747470733a2f2f6f73732e6d746c61622e6d656974752e636f6d2f6d746f70656e2f32515364783431384735514c54457143564174624b724d4754575063503874592f4d5455324d7a67334d6a51774d413d3d2f63386338376432362d386436312d343230632d616164302d3331333536616634396161312e6a70673f31353633383735303032373934', // 选填 mask图，可以传url / base64，支持相对路径;
            exportType: 'canvas',
            success(res) {
                $result2.appendChild(res);
            },
            error(req) {
                //{code:0,msg:''}
                console.log(req);
            },
        });
    });
};
