const path = require('path')
const proxy = require('http-proxy').createServer({target: 'http://www.gokgs.com'});


module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/build' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    "snowpack-plugin-svgr"
  ],
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  routes: [{
    src: '/json-cors/access',
    dest: (req, res) => {
      proxy.web(req, res)
    }
  }
  ],
  optimize: {
    bundle: true,
  },
  devOptions: {
    open: 'none',
  },
  alias: {
    '@styles': path.join(__dirname, 'src/styles'),
    '@type': path.join(__dirname, 'src/types'),
    '@utils': path.join(__dirname, 'src/utils'),
    '@components': path.join(__dirname, 'src/components'),
    '@hooks': path.join(__dirname, 'src/hooks'),
    '@config': path.join(__dirname, 'src/configs'),
    '@icons': path.join(__dirname, 'src/icons'),
  },
  exclude: ['**/node_modules/**/*', '**/*.test.*', '**/*.stories.*'],
}
