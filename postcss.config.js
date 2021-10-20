module.exports = (ctx) => ({
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    cssnano: ctx.env === 'production' ? { preset: ['default', { discardComments: { removeAll: true } }] } : false,
  },
});
