import { IConfig } from 'umi-types'

const config: IConfig = {
  define: {
    // eolinker 手动录入mock数据
    'process.env.base_url': 'https://result.eolinker.com/vRJhDJJ6a49449fb6d6ebec64f0d81e35cee482ddd17675?uri=',
    // eolinker 随机mock数据
    // 'process.env.base_url': 'https://mockapi.eolinker.com/vRJhDJJ6a49449fb6d6ebec64f0d81e35cee482ddd17675/',
  }
}

export default config
