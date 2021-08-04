// build.js

const fs = require('fs')

fs.rmSync('./dist', { recursive: true, force: true })

require('esbuild')
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
    fs.copyFile('./src/index.html', './dist/index.html', (err) => {
      if (err) {
        console.error(JSON.stringify(err, null, 2))
      }
    })
  })
  .catch(err => {
    console.error(JSON.stringify(err, null, 2))
  })

require('sass')
  .render({
    file: './src/sass/main.scss',
    outFile: 'main.css',
    outputStyle: 'compressed',
    sourceMap: false,
    fiber: require('fibers'),
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
    }
  })
