/**
 * 全局注入svg图片
 */

const context = (require as any).context("./svg", false, /\.svg$/)

context.keys().map(context)

