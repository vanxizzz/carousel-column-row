
# 文件目录
- temp.html => **使用例子**
- index.js => **轮播图源码**
- initStyle.js => **一些css样式初始化**
- myAnimation.js => **动画函数**

```js
import Carousel from 'carousel-column-row'
let carousel = new Carousel();
carousel.create(slideWrapper, config);
```
#  slideWrapper元素选择器，
- 如：'#slide-wrapper' 


# config一些配置（都有默认值）

## 1、datas图片信息数组
```
datas: [
    {href: '#aa', src: '1.jpg'},
    {href: '#aa', src: '2.jpg'},
]
```
## 2、direction轮播方向，column(上下) || row（左右）
- 默认row

## 3、imgW图片宽度、imgH图片高度
- 默认是sliderWrapper的宽高
```
imgW: 300,
imgH: 300
```
## 4、showArrow：bool，是否展示左右（上下）按钮
- 默认true

## 5、lastArrow左（上）按钮、nextArrow右（下）按钮
- 原理 **dom[prop] = obj[prop]**
```
lastArrow: {
    innerText: ' ← ',
    className: 'myLastArrow'
    id: 'aaaa'
    ...
}
nextArrow: {...}
```
## 6、duration: 轮播到下一张图所需要的时间(单位毫秒)
- 默认500

## 7、interval：多久后继续轮播，默认1000
- 默认1000
## 8、isAuto：bool，是否自动轮播
- 默认true
## 9、mouseSlide: bool，鼠标滑轮是否可以轮播
- 默认false
## 10、curIndex当前图片索引
- 默认0


   
  
  
 