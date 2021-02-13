const config = require('./config.json');

const {gitDescribe, gitDescribeSync} = require('git-describe');
process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash

module.exports = {
  publicPath: config.base,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/variables.scss";
          @import "@/scss/breakpoints.scss";
        `,
      },
    },
  },
  chainWebpack: (webpackConfig) => {
    webpackConfig.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        linkify: false,
        use: [
          // eslint-disable-next-line global-require
          [require('markdown-it-anchor'), {
            permalink: true,
            permalinkSymbol: '🔗',
            slugify: (s) => String(s).trim().toLowerCase().replace(/\s+/g, '-').replace(/([^\w\-]+)/g, ''),
          }],
          // eslint-disable-next-line global-require
          require('markdown-it-emoji'),
          // eslint-disable-next-line global-require
          require('markdown-it-highlightjs')
        ],
      });
  },
};
