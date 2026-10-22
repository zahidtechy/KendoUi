const os = require('os');
const path = require('path');

const chromeUserDataDir = path.join(os.tmpdir(), 'kendo-ui-chrome-ci').replace(/\\/g, '/');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: path.join(__dirname, './coverage/kendo-ui'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: process.env.CI ? ['progress'] : ['progress', 'kjhtml'],
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-software-rasterizer',
          '--no-first-run',
          '--no-default-browser-check',
          `--user-data-dir=${chromeUserDataDir}`
        ]
      }
    },
    captureTimeout: 120000,
    browserDisconnectTimeout: 10000,
    browserNoActivityTimeout: 60000,
    restartOnFileChange: true
  });
};
