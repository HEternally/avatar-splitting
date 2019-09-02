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
            image:'images/test1.jpg', //必填 原图或是原图、mask合成图，可以传 url / base64，支持相对路径;
            maskImage: 'images/test2.jpg', // 选填 mask图，可以传url / base64，支持相对路径;
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
