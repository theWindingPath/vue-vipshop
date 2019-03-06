var express = require('express')
var compression = require('compression')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()

// 从slider.json里获取数据
var appData = require('./src/data/slider.json')
var sliderData = appData.slider
// 获取recommend数据
var recData = require('./src/data/recommend.json')
var recommendData = recData.recommend
// 获取旗舰店flagshipStore数据mock
var flagData= require('./src/data/flagshipStore.json')
var flagshipData = flagData.flagshipStore
// 获取商品数据
var prosData = require('./src/data/products.json')
var productsData = prosData.brand

apiRouters = express.Router()

// 唯品会mock轮播图数据
apiRouters.get('/getSlider', function(req, res) {
    res.json({
        error: 0,
        data: sliderData
    })
})
// 热门旗舰店数据mock
apiRouters.get('/getRecommend', function(req, res) {
    res.json({
        error: 0,
        data: recommendData
    })
})
// 旗舰店数据
apiRouters.get('/getFlagshipStore', function(req, res) {
    res.json({
        error: 0,
        data: flagshipData
    })
})

apiRouters.get('/getProducts', function(req, res) {
    res.json({
        error: 0,
        data: productsData
    })
})

app.use('/api', apiRouters)

app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})