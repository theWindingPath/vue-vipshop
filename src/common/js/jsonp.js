// 封装jsonp方法
import originJSONP from 'jsonp' // 引入jsonp库，自定义命名为 originJSONP

// 传给服务端的是一个地址，url往往是带参数的，jsonp库需要我们把url先拼好，data是url上的一些参数，
export default function jsonp(url, data, option) { // 对外暴露方法jsonp，接收三个参数，和GitHub上的jsonp方法不同
    // 将data拼到url上，url要有问号?，如果没有问号，则手动拼上?
    // indexOf() 方法返回调用  String 对象中第一次出现的指定值的索引，开始在 fromIndex进行搜索。如果未找到该值，则返回-1。
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    // 我们封装的jsonp方法返回一个promise对象
    return new Promise((resolve, reject) => { // promise两个参数（是函数）resolve（成功调用），reject（失败调用）
        // 在promise里调用jsonp库的方法，发送jsonp跨域请求
        originJSONP(url, option, (err, data) => { // jsonp请求失败err为true，!err则表示请求成功
            if (!err) { // jsonp请求成功，调用promise的resolve函数，
                resolve(data) // 将jsonp请求成功返回的data放到promise对象上，在外面promise.then()获得返回的数据data
            } else {
                reject(err) // 失败返回错误信息
            }
        })
    })
}

function param(data) { // param函数作用是 将data拼到url上
    let url = '' // 保存拼接返回的url 定义为空字符串
    for (var k in data) { // for in 遍历对象 data是对象，url参数
        // 有时候data键值对里的值会是 undefined
        let value = data[k] !== undefined ? data[k] : '' // 如果data[k] 对应的值为undefined，则赋值为空字符串''
        // url拼接方式是 &aaa=bbb&ccc=ddd，使用encodeURIComponent对获得的值进行编码
        // encodeURIComponent()是对统一资源标识符（URI）的组成部分进行编码的方法。
        url += `&${k}=${encodeURIComponent(value)}` // 使用es6语法``拼接字符串
        // url += '&' + k + '=' + encodeURIComponent(value) // 常规拼接字符串
    }
    // 如果url有data，要将第一个 & 去掉
    // substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
    // url.substring(1)里从0计算，第一个0对应的为&（需要去掉）,返回第二个元素（下标1）直到末尾字符串
    return url ? url.substring(1) : '' // substring() 去掉字符串里的字符
}