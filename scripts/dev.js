// dev.js

require('esbuild')
  .build({
    bundle: true,
    color: true,
    entryPoints: ['./src/'],
    logLevel: 'error',
    minify: true,
    outfile: 'dist/index.js',
    platform: 'node',
    sourcemap: true,
    watch: {
      onRebuild: (err, res) => {
        if (!err) {
          if (res) {
            console.log(new Date().toLocaleString(), 'build succeeded.')
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
    console.log('Build start...')
  })
