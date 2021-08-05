// dev.js

const fs = require('fs')
const esbuild = require('esbuild')
const sass = require('sass')
const fibers = require('fibers')
const { ESLint } = require('eslint')
const bs = require('browser-sync').create()

const deleteFiles = () => {
  fs.rmSync('./dist', { recursive: true, force: true })
}

const copyPage = () => {
  fs.copyFile('./src/index.html', './dist/index.html', (err) => {
    if (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  })
}

const buildScript = (callback = null) => {
  esbuild
    .build({
      bundle: true,
      color: true,
      entryPoints: ['./src/main.js'],
      logLevel: 'error',
      minify: true,
      outfile: './dist/main.js',
      platform: 'node',
      sourcemap: true,
    })
    .then(e => {
      if (callback) {
        callback()
      }
    })
    .catch(err => {
      console.error(JSON.stringify(err, null, 2))
    })
}

const lintingScript = () => {
  (async () => {
    const eslint = new ESLint()
    const results = await eslint.lintFiles(['**/*.js'])
    const formatter = await eslint.loadFormatter('stylish')
    const resultText = formatter.format(results)
    console.log(resultText)
  })().catch((err) => {
    console.error(err)
  })
}

const compileStyle = () => {
  sass
    .render({
      file: './src/sass/main.scss',
      outFile: 'main.css',
      outputStyle: 'expanded',
      sourceMap: true,
      fiber: fibers,
    }, (err, result) => {
      if (err) {
        console.error(err)
      }
      else {
        fs.writeFile('./dist/main.css', result.css.toString(), (e) => {
          if (e) {
            console.error(e)
          }
        })
        fs.writeFile('./dist/main.css.map', result.map.toString(), (e) => {
          if (e) {
            console.error(e)
          }
        })
      }
    })
}

deleteFiles()
lintingScript()
buildScript(copyPage)
compileStyle()

bs.watch('./src/index.html').on('change', () => {
  copyPage()
  bs.reload()
})
bs.watch('./src/**/*.js').on('change', () => {
  lintingScript()
  buildScript(bs.reload)
})
bs.watch('./src/**/*.scss').on('change', () => {
  compileStyle()
  bs.reload()
})
bs.init({
  server: {
    baseDir: './dist',
  },
  open: false,
  ui: false,
  notify: false,
  logPrefix: '',
})
