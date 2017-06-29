const path = require('path');
let appid, appkey, urlprefix, dev
var prod = process.env.NODE_ENV === 'production'

if (!prod) dev = '_DEV'
appid = process.env['LC_APPID' + dev]
appkey = process.env['LC_APPKEY' + dev]
urlprefix = process.env['LC_URLPRFIX' +dev]

console.log(appid, appkey, urlprefix)

module.exports = {
  output: prod ? 'prod' : 'dev',
  wpyExt: '.wpy',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  eslint: true,
  compilers: {
    less: {
      compress: true
    },
    /*sass: {
      outputStyle: 'compressed'
    },*/
    babel: {
      // sourceMap: true,
      presets: [
        'es2015',
        'stage-1'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
    replace: [
      {
        filter: /config\.js/,
        config: [{
          find: '__APPID__',
          replace: appid
        }, {
          find: '__APPKEY__',
          replace: appkey
        }, {
          find: '__URLPREFIX__',
          replace: urlprefix
        }]
      },
    ],
  }
}

if (prod) {

  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  module.exports.compilers['less'] = {compress: true}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
