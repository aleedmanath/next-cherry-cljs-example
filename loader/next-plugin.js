const path = require('path')

const overrideWebpack = (nextConfig, f) => {
  return (webpackConfig, opts) => {
    if (nextConfig.webpack) webpackConfig = nextConfig.webpack(webpackConfig, opts)
    return f(webpackConfig)
  }
}

const withClojurescript = config => {
  return {
    ...config,
    webpack: overrideWebpack(config, webpackConfig => {
      // any rules for processing JS have  CLJS output goes through same process
      // perhaps only required loaders/optimizations could be considered
      const matchedJsRulesToCljs = webpackConfig.module.rules
        .filter(rule => {
          return rule.test && rule.test.test('.js')
        })
        .map(rule => {
          return {...rule, test: /\.(cljs)$/ }
        })
      
      console.log(
        "rules",
        webpackConfig.module.rules
        .filter(rule => {
          return rule.test && rule.test.test('.js')
        })
      )
      webpackConfig.module.rules = [
        ...webpackConfig.module.rules,
        ...matchedJsRulesToCljs,
        {
          test: /\.cljs$/,
          use: [{ loader: path.resolve(__dirname, './cljs-loader.js') }]
        }
      ]

      // Have cljs extension be aliased to js one in output
      webpackConfig.resolve.extensionAlias = {
        ...(webpackConfig.resolve.extensionAlias || {}),
        '.cljs': ['.jsx', 'js']
      }

      // Extension can be found without specifying it directly, just like any other JS input file 
      webpackConfig.resolve.extensions = [
        '.cljs', ...webpackConfig.resolve.extensions 
      ]

      return webpackConfig
    })
  }
}

module.exports = {
  withClojurescript
}


