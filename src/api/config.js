// export一些公共参数
export const commonParams = { // 这里定义一些通用参数，不用每个请求都要写的一些相同的参数
    // 每个请求相同的参数， 参数尽量的模拟的和qq音乐的一样
    g_tk: 5381,
    inChartset: 'utf-8',
    outChartset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}

// 还有一个通用的options，jsonp库里的方法接收的
export const options = {
    param: 'jsonpCallback' // jsonpCallback是qq音乐定义的接口
}

// 还要通常配置 errNumber为0
export const ERR_0K = 0 // 语义化 在很多大公司 腾讯、百度、滴滴里的返回数据code为0，返回成功标识