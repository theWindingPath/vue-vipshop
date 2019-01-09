// 在这个文件dom.js里写一些dom操作相关的代码
// 手动添加样式
export function addClass(el, className) {
    if (hasClass(el, className)) { // 判断
        return false // 如果有，则直接返回，什么都不做，下面代码不会执行
    }
    // Element.className是一个字符串变量,表示当前元素的class属性的值,可以是由空格分隔的多个class属性值.
    // split() 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。
    // 如<div class="slider-item001 slider-item002"> 这个div的el.className是字符串 'slider-item001 slider-item002'
    // el.className.split(' ')调用后，返回 数组 ['slider-item001', 'slider-item002']
    let newClass = el.className.split(' ') // 用空格拆开，将字符串根据空格，拆开成数组，
    newClass.push(className) // 调用数组push方法，则现在newClass=['slider-item001', 'slider-item002', 'slider-item-new']
    // join() 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。
    el.className = newClass.join(' ') // 将获得的字符串数组，通过join根据空格' '，组合成一个字符串，赋值到el（dom对象）上的className
}

export function hasClass(el, className) { // 判断el（dom对象）如果已有将要添加的class，则不需要添加
    // 创建正则，classname可以是开头、或者空白字符在它前面，classname后面可以跟空白字符、或者是结束
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className) // 测试el的className里是否有这个，有则返回true
}