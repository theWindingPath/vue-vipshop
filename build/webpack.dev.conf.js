'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const bodyParser = require('body-parser')
const axios = require('axios')

// 从slider.json里获取数据
var appData = require('../src/data/slider.json')
var sliderData = appData.slider
// 获取recommend数据
var recData = require('../src/data/recommend.json')
var recommendData = recData.recommend
// 获取旗舰店flagshipStore数据mock
var flagData= require('../src/data/flagshipStore.json')
var flagshipData = flagData.flagshipStore
// 获取商品数据
var prosData = require('../src/data/products.json')
var productsData = prosData.brand

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // 后端代理，转发ajax请求
    before(app) {
      app.use(bodyParser.urlencoded({extended: true}))
      const querystring = require('querystring')

      app.get('/api/getDiscList', function(req, res) { // 在前端部分，可以用axios.get('/api/getDiscList')获得下面res.json(data)的数据
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url, { // axios再node里发送的是http请求
          headers: {
            referer: 'https://c.y.qq.com/', // 和qq音乐的referer相同
            host: 'c.y.qq.com',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          params: req.query
        }).then((response) => { // 请求成功返回response（qq音乐歌单数据）
          res.json(response.data) // 从qq音乐服务器返回歌单数据的data部分通过res.json()传给前端
        }).catch((e) => {
          console.log(e)
        })
      })

      // 唯品会mock轮播图数据
      app.get('/api/getSlider', function(req, res) {
        res.json({
          error: 0,
          data: sliderData
        })
      })
      // 热门旗舰店数据mock
      app.get('/api/getRecommend', function(req, res) {
        res.json({
          error: 0,
          data: recommendData
        })
      })
      // 旗舰店数据
      app.get('/api/getFlagshipStore', function(req, res) {
        res.json({
          error: 0,
          data: flagshipData
        })
      })

      app.get('/api/getProducts', function(req, res) {
        res.json({
          error: 0,
          data: productsData
        })
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
