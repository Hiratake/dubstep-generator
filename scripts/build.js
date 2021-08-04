// build.js

const fs = require('fs')
const esbuild = require('esbuild')

const path = {
  page: {
    src: './src/index.html',
    dist: './dist/index.html',
  },
  script: {
    src: './src/main.js',
    dist: './dist/main.js',
  },
}

const deleteFiles = () => {
  fs.rmSync('./dist', { recursive: true, force: true })
}
const copyFiles = () => {
  fs.copyFile(path.page.src, path.page.dist, (err) => {
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
    entryPoints: [path.script.src],
    logLevel: 'error',
    minify: true,
    outfile: path.script.dist,
    platform: 'node',
    sourcemap: false,
  })
  .catch(err => {
    console.error(JSON.stringify(err, null, 2))
  })
  .then(e => {
    copyFiles()
  })
