// build.js

const fs = require('fs')
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

deleteFiles()

esbuild
  .build({
    bundle: true,
    color: true,
    entryPoints: ['./src/main.js'],
    logLevel: 'error',
    minify: true,
    outfile: './dist/main.js',
    platform: 'node',
    sourcemap: false,
  })
  .then(e => {
    copyPage()
  })
  .catch(err => {
    console.error(JSON.stringify(err, null, 2))
  })
