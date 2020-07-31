[![NPM version](https://img.shields.io/npm/v/transfer-files-webpack-plugin.svg?style=flat)](https://www.npmjs.com/package/transfer-files-webpack-plugin)
[![Build Status](https://travis-ci.org/Ipxxiao/transfer-files-webpack-plugin.svg?branch=master)](https://travis-ci.org/Ipxxiao/transfer-files-webpack-plugin)
[![codecov](https://codecov.io/gh/Ipxxiao/transfer-files-webpack-plugin/branch/master/graph/badge.svg)](https://codecov.io/gh/Ipxxiao/transfer-files-webpack-plugin)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

transfer files plugin for webpack. sftp传输文件————webpack插件。

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE8+ Edge+                                                                                                                                                                                                      | last 10 versions                                                                                                                                                                                                  | last 10 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

## Install

``` base
npm i transfer-files-webpack-plugin -S
```

## Usage

``` javascript 
const TransferFilesPlugin = require('transfer-files-webpack-plugin')
```


``` javascript
new TransferFilesPlugin({
    server: {
        host: 'locahost',
        port: 443,
        username: '',
        password: '',
    },
})
```

## More
- [Docs](https://github.com/Ipxxiao/transfer-files-webpack-plugin/tree/master/docs)
- [Test](https://github.com/Ipxxiao/transfer-files-webpack-plugin/blob/master/__tests__/index.spec.ts)