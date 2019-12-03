import request from '@/utils/request'

import { INormalWork } from '@/models/postInfo'

export interface IAPINormalWork {
  id: string
  postId: string
  nowCount: number
  totalCount: number
  accurateTime: [number, number]
  remark: string
}

/**
 * 获取岗位信息
 */
export async function fetchNormalWork ({ id }: { id: string})  {
  const response = await request(`normalPostWork/${id}`)
  const normalWorks: INormalWork[] = response.map((normalWork: IAPINormalWork) => {
    /**
     * 过滤出时间信息
     */
    const [startTime, endTime] = normalWork.accurateTime
    return {
      id: normalWork.id,
      startTime,
      endTime,
      nowCount: normalWork.nowCount,
      totalCount: normalWork.totalCount,
      remark: normalWork.remark
    }
  })

  return normalWorks
}
