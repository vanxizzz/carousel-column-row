import initStyle from './initStyle.js'
import myAnimation from './myAnimation.js'


function Carousel(params) { }
Carousel.prototype.create = function (slideWrapper, config = {}) {
    this.direction = config.direction || 'row';
    this.slideWrapper = document.querySelector(slideWrapper);//必传
    this.imgsWrapper = this.createImgsWrapper();

    if (!this.slideWrapper) {
        return;
    }
    this.dotsWrapper = this.createDotsWrapper();
    this.dots = [];//按钮数组

    if (config.showArrow !== false) {
        this.lastArrow = this.createOneArrow('last', config.lastArrow);
        this.nextArrow = this.createOneArrow('next', config.nextArrow);
    }
    this.imgW = config.imgW || this.slideWrapper.offsetWidth;
    this.imgH = config.imgH || this.slideWrapper.offsetHeight;
    this.imgsWrapper.style.width = this.imgW + 'px';
    this.imgsWrapper.style.height = this.imgH * config.datas.length + 'px';
    this.datas = config.datas || [];
    this.duration = config.duration || 500;//两张图运动的时间
    this.isAuto = config.isAuto === false ? false : true;
    this.interval = config.interval || 1000;//每次切换时间的间隔

    this.mouseSlide = config.mouseSlide || false;
    this.curIndex = config.curIndex || 0;
    this.timer = null;//定时器
    this.isPlaying = false;
    this.firstTempImg = null;
    this.endTempImg = null;
    this.init();
}
/* init初始化一些事件和其他操作 */
Carousel.prototype.init = function () {
    this.mouseSlide && (document.onwheel = (e) => {
        if (this.isPlaying) return;
        clearInterval(this.timer);
        if (e.wheelDeltaY > 0) {
            this.lastSwitch();
        } else {
            this.nextSwitch();
        }
    });
    this.lastArrow && (this.lastArrow.onclick = () => {
        if (this.isPlaying) return;
        clearInterval(this.timer);
        this.lastSwitch();
    });
    this.nextArrow && (this.nextArrow.onclick = () => {
        if (this.isPlaying) return;
        clearInterval(this.timer);
        this.nextSwitch();
    });
    this.initSlideWrapper();
    this.createDoms(this.datas);
    this.changeDot();
    this.autoPlay();
}
/* 初始化一下slideWrapper */
Carousel.prototype.initSlideWrapper = function () {

    renderStyle(this.slideWrapper, initStyle.slideWrapper);
}
/* 创建包裹图片的盒子 */
Carousel.prototype.createImgsWrapper = function () {
    let imgsWrapper = document.createElement('div');
    renderStyle(imgsWrapper, initStyle.imgsWrapper)
    this.slideWrapper.appendChild(imgsWrapper);
    return imgsWrapper;
}
/* 创建一个左/右/上/下按钮 */
Carousel.prototype.createOneArrow = function (arrowDirection, info) {
    let arrowDom = document.createElement('div');

    if (info) {
        if (!info.className && !info.id) {
            renderStyle(arrowDom, initStyle.arrow)
            if (this.direction === 'column') {
                renderStyle(arrowDom, {
                    left: '50%',
                    transform: 'translateX(-50%)'
                })
                if (arrowDirection === 'last') {
                    arrowDom.style.top = '10px';
                    arrowDom.innerText = '↑';
                } else {
                    arrowDom.style.bottom = '10px';
                    arrowDom.innerText = '↓';
                }

            } else if (this.direction === 'row') {
                renderStyle(arrowDom, {
                    top: '50%',
                    transform: 'translateY(-50%)'
                })
                if (arrowDirection === 'last') {
                    arrowDom.style.left = '10px';
                    arrowDom.innerText = '←';
                } else {
                    arrowDom.style.right = '10px';
                    arrowDom.innerText = '→';
                }
            }
        }
    } else {
        renderStyle(arrowDom, initStyle.arrow)
        if (this.direction === 'column') {
            renderStyle(arrowDom, {
                left: '50%',
                transform: 'translateX(-50%)'
            })
            if (arrowDirection === 'last') {
                arrowDom.style.top = '10px';
                arrowDom.innerText = '↑';
            } else {
                arrowDom.style.bottom = '10px';
                arrowDom.innerText = '↓';
            }

        } else if (this.direction === 'row') {
            renderStyle(arrowDom, {
                top: '50%',
                transform: 'translateY(-50%)'
            })
            if (arrowDirection === 'last') {
                arrowDom.style.left = '10px';
                arrowDom.innerText = '←';
            } else {
                arrowDom.style.right = '10px';
                arrowDom.innerText = '→';
            }
        }
    }
    renderProp(arrowDom, info);
    this.slideWrapper.appendChild(arrowDom);
    return arrowDom
}
/* 生成圆点的父级盒子 */
Carousel.prototype.createDotsWrapper = function () {
    let dotsWrapper = document.createElement('div');
    if (this.direction === 'column') {
        renderStyle(dotsWrapper, initStyle.dotsWrapper.column)
    } else if (this.direction === 'row') {
        renderStyle(dotsWrapper, initStyle.dotsWrapper.row)
    }
    this.slideWrapper.appendChild(dotsWrapper);
    return dotsWrapper;
}
/* 批量生产一些按钮、图片 */
Carousel.prototype.createDoms = function (datas) {
    for (let i = 0; i < datas.length; i++) {
        this.createOneImg(datas[i], i);
        this.createOneDot(i);
    };
}
/* 创建一个a标签，里边包裹图片 */
Carousel.prototype.createOneImg = function (info, i, firstTag) {
    let imgHrefDom = document.createElement('a');
    imgHrefDom.href = info.href || 'javascript:;';
    renderStyle(imgHrefDom, {
        position: 'absolute'
    })
    if (this.direction === 'column') {
        if (firstTag) {
            imgHrefDom.style.top = -this.imgH + 'px';
        } else {
            imgHrefDom.style.top = i * this.imgH + 'px';
        }
        imgHrefDom.style.left = 0;
    } else if (this.direction === 'row') {
        if (firstTag) {
            imgHrefDom.style.left = -this.imgW + 'px';
        } else {
            imgHrefDom.style.left = i * this.imgW + 'px';
        }
        imgHrefDom.style.top = 0;
    }
    let imgDom = new Image();
    imgHrefDom.appendChild(imgDom);
    renderStyle(imgDom, {
        width: this.imgW + 'px',
        height: this.imgH + 'px',
        verticalAlign: 'middle'
    })
    imgDom.style.width = this.imgW + 'px';
    imgDom.style.height = this.imgH + 'px';
    imgDom.style.verticalAlign = 'middle';

    imgDom.onload = () => {
        if (firstTag) {
            let firstA = this.imgsWrapper.children[0];
            this.imgsWrapper.insertBefore(imgHrefDom, firstA);
        } else {
            this.imgsWrapper.appendChild(imgHrefDom);
        }
    }
    imgDom.src = info.src;
    return imgHrefDom;
}
/* 创建一个圆点按钮 */
Carousel.prototype.createOneDot = function (index) {

    let dot = document.createElement('div');
    if (this.direction === 'column') {
        renderStyle(dot, initStyle.dot.column())
    } else if (this.direction === 'row') {
        renderStyle(dot, initStyle.dot.row())
    }
    if (index === this.curIndex) {
        dot.style.backgroundColor = '#f40'
    }
    dot.onclick = () => {
        if (this.curIndex === index) {
            return false;
        }
        clearInterval(this.timer);
        this.curIndex = index;
        this.switchImg(() => { this.autoPlay() });
    }
    this.dotsWrapper.appendChild(dot);
    this.dots.push(dot);
}
/* 自动播放 */
Carousel.prototype.autoPlay = function (params) {

    clearInterval(this.timer);
    if (!this.isAuto) {
        return false;
    }
    if (this.isPlaying) {
        return;
    }
    this.timer = setInterval(() => {

        this.nextSwitch();

    }, this.interval)
}
/* 改变当前圆点按钮样式 */
Carousel.prototype.changeDot = function () {

    for (let i = 0; i < this.dots.length; i++) {
        this.dots[i].style.backgroundColor = '#fff';
    };
    this.dots[this.curIndex % this.datas.length].style.backgroundColor = '#f40';
}
/* 切换动画函数 */
Carousel.prototype.switchImg = function (cb) {
    let objInfo = null;
    if (this.direction === 'column') {
        objInfo = { top: [this.imgsWrapper.offsetTop, -this.curIndex * this.imgH] }
    } else if (this.direction === 'row') {
        objInfo = { left: [this.imgsWrapper.offsetLeft, -this.curIndex * this.imgW] }
    }
    myAnimation(
        this.imgsWrapper,
        objInfo,
        this.duration,
        () => {
            cb && cb();
            this.changeDot();
        }
    )
}
/* 切换到下张图片函数 */
Carousel.prototype.nextSwitch = function () {
    this.isPlaying = true;
    clearInterval(this.timer);
    let cb = () => {
        this.isPlaying = false;
        this.autoPlay();
    };
    this.curIndex++;
    if (this.curIndex === this.datas.length - 1) {
        if (!this.endTempImg) {
            this.endTempImg = this.createOneImg(this.datas[0], this.datas.length);
        }
    } else if (this.curIndex === this.datas.length) {
        if (!this.endTempImg) {
            this.endTempImg = this.createOneImg(this.datas[0], this.datas.length);
        }
        cb = () => {
            this.curIndex = 0;
            if (this.direction === 'column') {
                this.imgsWrapper.style.top = 0;
            } else if (this.direction === 'row') {
                this.imgsWrapper.style.left = 0;
            }
            this.isPlaying = false;
            this.autoPlay();
        }
    }
    this.switchImg(cb);

}
/* 切换到上张图片函数 */
Carousel.prototype.lastSwitch = function () {
    this.isPlaying = true;
    clearInterval(this.timer);
    let cb = () => {
        this.isPlaying = false;
        this.autoPlay();
    };
    this.curIndex--;
    if (this.curIndex === 0) {
        if (!this.firstTempImg) {
            this.firstTempImg = this.createOneImg(this.datas[this.datas.length - 1], null, true);
        }
        cb = () => {
            this.isPlaying = false;
            this.autoPlay();
        }
    } else if (this.curIndex === -1) {
        if (!this.firstTempImg) {
            this.firstTempImg = this.createOneImg(this.datas[this.datas.length - 1], null, true);
        }
        cb = () => {
            this.curIndex = this.datas.length - 1;
            if (this.direction === 'column') {
                this.imgsWrapper.style.top = -this.curIndex * this.imgH + 'px';
            } else if (this.direction === 'row') {
                this.imgsWrapper.style.left = -this.curIndex * this.imgW + 'px';
            }
            this.isPlaying = false;
            this.autoPlay();
        }
    }
    this.switchImg(cb);
}


function renderStyle(dom, obj) {
    if (!obj) return;
    for (let prop in obj) {
        if (dom.style[prop] !== obj[prop]) {
            dom.style[prop] = obj[prop];
        }
    };
}
function renderProp(dom, obj) {
    if (!obj) return;
    for (let prop in obj) {
        dom[prop] = obj[prop]
    };
}

export default Carousel;


