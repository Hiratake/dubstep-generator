// dev.js

const fs = require('fs')
const bs = require('browser-sync').create()
const esbuild = require('esbuild')

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

deleteFiles()
buildScript(copyPage)

bs.watch('./src/index.html').on('change', () => {
  copyPage()
  bs.reload()
})
bs.watch('./src/**/*.js').on('change', () => {
  buildScript(bs.reload)
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
