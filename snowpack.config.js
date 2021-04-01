const path = require('path')

module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/build' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
  ],
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
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
  },
  exclude: ['**/node_modules/**/*', '**/*.test.*', '**/*.stories.*'],
}
