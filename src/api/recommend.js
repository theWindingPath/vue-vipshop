import jsonp from 'common/js/jsonp' // 引入jsonp.js 导出的方法，
import {commonParams, options} from './config' // 从config.js引入两个参数，es6语法
import axios from 'axios'

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

// 获取唯品会旗舰店数据(爱慕希)
export function getBrand() {
    const url = 'https://mst.vip.com/special/getVisProductDataV2'

    const data = {
        callback: 'jQuery21309027587205225693_1550344852014',
        brand_id: 3489862,
        warehouse: 'VIP_NH',
        product_ids: '635614557,635607248,635632670,635604494,635670621,635591318,635633132,635599612,2154395588,635630599,635607089,635633391,635615432,635669869,635628279,635615647,635621000,635627246,635607065,635597896',
        _: 1550344852029,
        mst_csrf_key: '4bf60879806078ce009c123c0927d720',
        area_id: 104104,
        fdc_area_id: 104104117
    }

    // return jsonp(url, data, {param: 'callback'})
    return jsonp(url, data)
}

// 兰缪旗舰店数据
export function getBrandLanmiu() {
    const url = 'https://mst.vip.com/special/getVisProductDataV2'

    const data = {
        callback: 'jQuery21309321831943810672_1550361528759',
        brand_id: 3526781,
        warehouse: 'VIP_NH',
        product_ids: '649552429,649553942,2156237091,649553020,649553004,649551122,649553476,2156237090,649554891,649551209,649553007,649551147,711429043,649553179,649552332,2155538820,649553026,649552454,649551202,649550639',
        _: 1550361528793,
        mst_csrf_key: '4bf60879806078ce009c123c0927d720',
        area_id: 104104,
        fdc_area_id: 104104117
    }

    // return jsonp(url, data, {param: 'callback'})
    return jsonp(url, data)
}

// 获取歌单数据
export function getDiscList() {
    const url = '/api/getDiscList'

    const data = Object.assign({}, commonParams, { // 合并参数（通用参数、自定义参数）到一个对象上
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })

    return axios.get(url, { // axios会自动将params的参数拼接到url上
        params: data
    }).then((res) => {
        return Promise.resolve(res.data) // 返回一个promise对象(数据在then())
    })
}

// 获取唯品会首页 数据 url(2019/01/18) https://mapi.vip.com/vips-mobile/rest/layout/h5/channel/data?f=www&width=640&height=460&net=wifi&changeResolution=2&channel_name=%E4%BB%8A%E6%97%A5%E6%8E%A8%E8%8D%90&app_name=shop_wap&app_version=4.0&mars_cid=1536838627386_802c21a056c29c27b8728bb3e72ea8c8&warehouse=VIP_NH&api_key=8cec5243ade04ed3a02c5972bcda0d3f&fdc_area_id=104104117&province_id=104104&city_id=104104101&saturn=&wap_consumer=A1&standby_id=www&source_app=yd_wap&mobile_platform=2&platform=2&client=wap&lightart_version=1&mobile_channel=mobiles-%7C%7C&menu_code=20181203001&_=1547765184013
// 之前日期的url                      https://mapi.vip.com/vips-mobile/rest/layout/h5/channel/data?f=www&width=640&height=460&net=wifi&changeResolution=2&channel_name=%E4%BB%8A%E6%97%A5%E6%8E%A8%E8%8D%90&app_name=shop_wap&app_version=4.0&mars_cid=1536838627386_802c21a056c29c27b8728bb3e72ea8c8&warehouse=VIP_NH&api_key=8cec5243ade04ed3a02c5972bcda0d3f&fdc_area_id=104104117&province_id=104104&city_id=104104101&saturn=&wap_consumer=A1&standby_id=www&source_app=yd_wap&mobile_platform=2&platform=2&client=wap&lightart_version=1&mobile_channel=mobiles-%7C%7C&menu_code=20181203001&_=1547765184013
export function getDailyRecomd() { // 今日推荐数据
    const url = 'https://mapi.vip.com/vips-mobile/rest/layout/h5/channel/data'

    const data = {
        f: 'www',
        width: 640,
        height: 460,
        net: 'wifi',
        changeResolution: 2,
        channel_name: '今日推荐',
        app_name: 'shop_wap',
        app_version: 4.0,
        mars_cid: '1536838627386_802c21a056c29c27b8728bb3e72ea8c8',
        fdc_area_id: 104104117,
        province_id: 104104,
        city_id: 104104101,
        saturn: '',
        wap_consumer: 'AI',
        standby_id: 'www',
        source_app: 'yd_wap',
        mobile_platform: 2,
        platform: 2,
        client: 'wap',
        lightart_version: 1,
        mobile_channel: 'mobiles-||',
        menu_code: 20181203001,
        _: 1547765184013
    }

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// mock数据
export function getSlider() {
    const url = '/api/getSlider'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
