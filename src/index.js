const { resolve } = require('path')
const fs = require('fs')
const resolvePath = (relativePath) => resolve(process.cwd(), relativePath)
const assetsRetry = fs.readFileSync(require.resolve('assets-retry'))

const initalOption = {
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
}

class WebpackRetryPlugin {
  constructor(options = {}) {
    const { outputPath, htmlFile, script, jsOutPath } = options
    this.outputPath = outputPath || initalOption.outputPath
    this.script = script || initalOption.script
    this.htmlFile = htmlFile || initalOption.htmlFile
    this.jsOutPath = jsOutPath || initalOption.jsOutPath
  }

  apply(compiler) {
    compiler.plugin('done', () => {
      this.writeFile()
      this.updateTemplate()
    })
  }

  updateTemplate() {
    if (!this.htmlFile) {
      return
    }
    try {
      const scriptString = `<script type="text/javascript" src="${this.outputPath}"></script>`
      const html = fs.readFileSync(this.htmlFile, 'utf-8')
      let newHtml = html.replace('</body>', `</body>${this.script}`)
      newHtml = newHtml.replace('</title>', `</title>${scriptString}`)
      fs.writeFileSync(this.htmlFile, newHtml, {
        encoding: 'utf-8'
      })
    } catch (error) {
      throw error
    }
  }

  writeFile() {
    try {
      fs.writeFile(this.jsOutPath, assetsRetry, () => { })
    } catch (error) {
      throw error
    }
  }
}

module.exports = WebpackRetryPlugin
