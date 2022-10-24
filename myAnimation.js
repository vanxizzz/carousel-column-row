
export default function myAnimation(dom, objInfo, duration, cb) {
    let changeObj = {};
    let smoothTime = 16; //动画顺畅值，越高越不顺畅
    let num = Math.ceil(duration / smoothTime);
    let curObj = {};
    for (let prop in objInfo) {
        curObj[prop] = objInfo[prop][0];
        changeObj[prop] = parseFloat((objInfo[prop][1] - objInfo[prop][0]) / num);
    };

    let timer = setInterval(() => {
        if (--num < 0) {
            clearInterval(timer);
            for (let prop in changeObj) {
                if (prop !== 'opacity') {
                    dom.style[prop] = objInfo[prop][1] + 'px';
                } else {
                    dom.style[prop] = parseFloat(objInfo[prop][1] / 1000)
                }
            };
            cb && cb();
        } else {
            for (let prop in changeObj) {
                if (prop !== 'opacity') {
                    curObj[prop] = parseFloat(curObj[prop]) + changeObj[prop];
                    dom.style[prop] = curObj[prop] + 'px';
                } else {
                    curObj[prop] = parseFloat((curObj[prop] + changeObj[prop]));
                    console.log(curObj[prop])
                    dom.style[prop] = curObj[prop] / 1000;
                }
            };
        }
    }, smoothTime)

}

