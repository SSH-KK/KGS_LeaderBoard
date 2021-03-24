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
  routes: [
    {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    "bundle": true,
  },
  devOptions: {
    "open":"none",
  },
  alias:{
    "@styles":"./src/styles",
    "@types":"./src/types",
    "@utils":"./src/urils",
    "@components":"./src/components",
  }
};
