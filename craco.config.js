const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      style: 'css',
      options: {
        lessLoaderOptions: {
          modifyVars: { '@primary-color': '#1DA57A' },
          javascriptEnabled: true,
        },
      },
    },
  ],
};