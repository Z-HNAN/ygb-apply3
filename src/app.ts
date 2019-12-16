/**
 * plugin
 */
let plugins: any[] = []

// 开发环境
if (process.env.NODE_ENV === 'development') {
  plugins = [...plugins, require('dva-logger')()]
}

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      // err.preventDefault();
      // console.error(err.message);
    },
  },
  plugins,
}
