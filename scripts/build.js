// build.js

require('esbuild')
  .build({
    bundle: true,
    color: true,
    entryPoints: ['./src/'],
    logLevel: 'error',
    minify: true,
    outfile: 'dist/index.js',
    platform: 'node',
    sourcemap: false,
  })
  .catch(err => {
    console.error(JSON.stringify(err, null, 2))
  })
