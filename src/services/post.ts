import request from '@/utils/request'

import { INormalPost } from '@/models/post'

/**
 * post service
 */

export interface IAPINormalPost {
  id: string
  /* 招工标题 */
  title: string
  department: string
  departmentId: string
  /* 总报名人数 */
  totalCount: number
  /* 现在报名人数 */
  nowCount: number
  /* 日期均为timestamp */
  startDate: number
  endDate: number
  /* 岗位拓展码，转换为二进制之后在进行相应的增减即可 */
  code: number
  /* 所展示的标签 */
  tags: string
  /* 岗位详情 */
  content: string
}

/**
 * 获取所有的普通岗位信息
 */
export async function fetchNormalPost(): Promise<any> {
  const response = await request(`normalPost`)

  /* 过滤数据 */
  const normalPosts: INormalPost[] = response.map((normalPost: IAPINormalPost) => {
    /**
     * 处理tags,按照`,`分割的方式
     * 处理code,转换成需要的样式
     */
    const tags = normalPost.tags.split(',')

    return {
      id: normalPost.id,
      title: normalPost.title,
      department: normalPost.department,
      departmentId: normalPost.departmentId,
      totalCount: normalPost.totalCount,
      nowCount: normalPost.nowCount,
      startDate: normalPost.startDate,
      endDate: normalPost.endDate,
      // code: normalPost.code,
      tags,
      content: normalPost.content,
    }
  })

  return normalPosts
}


export async function delay(dalay: number = 0): Promise<any> {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve('OK')
    }, dalay)
  })
  
}
