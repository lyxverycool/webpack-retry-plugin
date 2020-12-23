# webpack-retry-chunk-load-plugin

A webpack plugin to retry loading of async chunks that failed to load

## require

"assets-retry":https://github.com/Nikaple/assets-retry

## Usage

```javascript
// webpack.config.js
const { WebpackRetryPlugin } = require('webpack-retry-plugin');
const { resolve } = require('path')
const resolvePath = (relativePath) => resolve(process.cwd(), relativePath)

plugins: [
  new RetryChunkLoadPlugin({
    jsOutPath: resolvePath(`dist/js/assets-retry.js`),
    htmlFile: resolvePath(`dist/index.html`),
    outputPath: '/js/assets-retry.js',
    script: `
    <script>
      window.assetsRetryStatistics = window.assetsRetry({
        domain: [document.domain],
        maxRetryCount: 1,
        onFail: function (currentUrl) {
        if (currentUrl.indexOf('css') < 0) return
        window.location.reload()
      }
    })
    </script>`
  })
];
```

### Webpack compatibility

| Webpack version  | webpack-retry-plugin version                                |
| 4.x              | 1.x |

## License

MIT
