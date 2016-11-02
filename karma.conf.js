const collectPackages = require('./main/core/Resources/scripts/lib/collect-packages')
const buildConfig = require('./main/core/Resources/scripts/lib/webpack')

const rootDir = __dirname + '/../../..'
const webpack = buildConfig(rootDir, collectPackages(rootDir), true)

// this plugin ensures any babel compilation error will be correctly reported
// and will prevent the test suite from running
// (see https://github.com/webpack/karma-webpack/issues/49)
webpack.plugins.push(function () {
  this.plugin('done', stats => {
    if (stats.compilation.errors.length > 0) {
      if (stats.compilation.errors[0].name === 'ModuleBuildError') {
        // assume it's a babel syntax error and rethrow it
        throw stats.compilation.errors[0].error.error
      }

      throw new Error(stats.compilation.errors[0].message)
    }
  })
})

module.exports = config => {
  const base = {
    basePath: '',
    frameworks: ['mocha'],
    files: [
      {
        pattern: 'main/core/Resources/modules/es6-shim/index.js',
        watched: false
      },
      '*/*/Resources/**/*test.js'
    ],
    exclude: [
      // tmp excludes (legacy/node tests)
      'main/core/Resources/scripts/test/**/*',
      'main/core/Resources/public/js/tests/**/*',
      'plugin/result/**/*'
    ],
    preprocessors: {
      'main/core/Resources/modules/es6-shim/index.js': ['webpack'],
      './*/*/Resources/**/[^.]+.js': ['coverage'],
      './*/*/Resources/**/*test.js': ['webpack']
    },
    reporters: ['dots', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    },
    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    failOnEmptyTestSuite: false,
    concurrency: Infinity,
    webpack,
    webpackServer: {
      quiet: true
    }
  }

  // see https://swizec.com/blog/how-to-run-javascript-tests-in-chrome-on-travis/swizec/6647
  if (process.env.TRAVIS) {
    base.browsers = ['ChromeTravis'];
  }

  config.set(base)
}
