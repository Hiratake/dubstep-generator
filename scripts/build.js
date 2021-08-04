// build.js

require('fs')
  .rmSync('./dist', { recursive: true, force: true })

require('esbuild')
  .build({
    bundle: true,
    color: true,
    entryPoints: ['./src/main.js'],
    logLevel: 'error',
    minify: true,
    outfile: 'dist/main.js',
    platform: 'node',
    sourcemap: false,
  })
  .catch(err => {
    console.error(JSON.stringify(err, null, 2))
  })
  .then(e => {
    console.log('Build start...')
  })
