// dev.js

const fs = require('fs')
const chokidar = require('chokidar')
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

chokidar
  .watch(path.page.src)
  .on('change', () => {
    copyFiles()
  })

esbuild
  .build({
    bundle: true,
    color: true,
    entryPoints: [path.script.src],
    logLevel: 'error',
    minify: true,
    outfile: path.script.dist,
    platform: 'node',
    sourcemap: true,
    watch: {
      onRebuild: (err, res) => {
        if (!err) {
          if (res) {
            if (res.warnings) {
              res.warnings.forEach(e => {
                console.error('Error: ', e.text)
                console.error(
                  'Path: ',
                  `${e.location.file}:${e.location.line}:${e.location.column}`,
                )
                console.error(' -> ', e.location.lineText)
              })
            }
          }
        }
      },
    },
  })
  .catch(err => {
    console.error(JSON.stringify(err, null, 2))
  })
  .then(e => {
    copyFiles()
  })
