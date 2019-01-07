import jsonp from 'common/js/jsonp' // 引入jsonp.js 导出的方法，
import {commonParams, options} from './config' // 从config.js引入两个参数，es6语法

// 封装方法 抓取线上数据
export function getRecommend() {
    // 实质url是前面一段
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg' // 线上抓取数据的url

    const data = Object.assign({}, commonParams, { // es6语法，将用到的参数拼接到data里
        // 除了公共参数commonParams，还要这个url（请求歌单数据的url）需要的参数
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })

    // 调用我们封装好的jsonp函数（jsonp.js里的），它返回一个promise对象
    // 这里函数返回一个promise对象
    return jsonp(url, data, options)
}