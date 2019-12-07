import request from '@/utils/request'

import { INormalPost, ApartmentPostType, ApartmentWorkType } from '@/models/post'

/**
 * post service
 */

 /**
  * normalPost的API返回形式
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

/**
 * 获取指定的公寓中心下的岗位信息
 */
export async function fetchApartmentPost(
  { apartmentId }: { apartmentId: string }
): Promise<any> {
  const response = await request(`apartmentPost/${apartmentId}`)
  
  /**
   * 过滤数据
   */
  const apartmentPostsalPosts: ApartmentPostType[] = response.map((aprtmentPost: any) => {
    /**
     * 需要计算的人数信息
     */
    let nowCount = 0
    let totalCount = 0

    /**
     * 处理tags,按照`,`分割的方式
     * 处理code,转换成需要的样式
     */
    const tags = aprtmentPost.tags.split(',')

    /**
     * 过滤具体的工作信息
     */
    const works: ApartmentWorkType[] = aprtmentPost.works.map((apartmentWork: any) => {
      nowCount += apartmentWork.nowCount
      totalCount += apartmentWork.totalCount

      return {
        id: apartmentWork.id,
        descriptionTime: apartmentWork.descriptionTime,
        nowCount: apartmentWork.nowCount,
        totalCount: apartmentWork.totalCount,
        remark: apartmentWork.remark,
      }
    })

    /**
     * 过滤最终的公寓岗位结构
     */
    return {
      id: aprtmentPost.id,
      title: aprtmentPost.title,
      apartment: aprtmentPost.apartment,
      apartmentId: aprtmentPost.apartmentId,
      totalCount,
      nowCount,
      date: aprtmentPost.date,
      tags,
      content: aprtmentPost.content,
      works,
    }
  })

  return apartmentPostsalPosts
}


export async function delay(dalay: number = 0): Promise<any> {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve('OK')
    }, dalay)
  })
  
}
