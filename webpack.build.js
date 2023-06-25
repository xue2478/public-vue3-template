const glob = require('glob')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const list = {
  pt3: './packages/index.js'
}
// 多入口文件
async function entryList(dirpath, list) {
  const files = glob.sync(`${dirpath}/**/index.js`)
  for (let file of files) {
    if (file) {
      let name = file.split(/\//)
      name = name[name.length - 2]
      name = 'pt3' + name.charAt(0).toUpperCase() + name.slice(1)
      list[name] = `./${file}`
    }
  }
}
entryList('packages/lib/components', list)
module.exports = {
  mode: 'development',
  entry: list,
  output: {
    filename: '[name].umd.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'pt3UI', //d导出变量的字段名
    libraryTarget: 'umd'
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `
                @import "/packages/theme/global-variables.module.scss";
              `,
              sassOptions: {
                includePaths: [__dirname]
              }
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx?$/, //匹配js文件
        exclude: /node_modules/, //忽略node_modules文件夹
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.svg$/, //匹配js文件
        exclude: /node_modules/, //忽略node_modules文件夹
        use: {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]'
          }
        }
      }
    ]
  },
  externals: ['vue', 'element-plus', 'vue-router']
}
