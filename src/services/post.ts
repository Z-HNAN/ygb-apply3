/**
 * post service
 */
export async function delay(dalay: number = 0): Promise<any> {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve('OK')
    }, dalay)
  })
  
}
