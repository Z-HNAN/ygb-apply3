import request from '@/utils/request'

import { ApplyType } from '@/models/schedule'

const POST_TYPE_NORMAL = 1
const POST_TYPE_APARTMENT = 2

/**
 * 获取该学生的报名情况
 */
export async function fetchApplyList({ verifyRequest }: { verifyRequest: string}) {
  const response = await request(`posts/schedule`, {
    method: 'POST',
    data: {
      verifyRequest
    }
  })

  const applyList: ApplyType[] = response.map((apply: any) => {
    /**
     * 直接用来使用的值
     */
    const {
      id,
      postId,
      remark,
      contactName,
      contactPhone,
      title,
      content,
      postType: postTypeResponse,
      department: departmentResponse,
      accurateTime: accurateTimeResponse,
      descriptionTime: descriptionTimeResponse,
    } = apply

    /**
     * 需要被替换的值
     */
    let postType = ''
    let startTime = 0
    let endTime = 0
    let department = ''
    let apartment = ''
    let descriptionTime = ''

    if (postTypeResponse === POST_TYPE_NORMAL) {
      postType = 'normal'
      department = departmentResponse
      ;[startTime, endTime] = accurateTimeResponse
    } else if (postTypeResponse === POST_TYPE_APARTMENT) {
      postType = 'apartment'
      apartment = departmentResponse
      descriptionTime = descriptionTimeResponse
    }

    return {
      id,
      postId,
      remark,
      contactName,
      contactPhone,
      title,
      content,
      postType,
      startTime,
      endTime,
      department,
      apartment,
      descriptionTime,
    } as ApplyType
  })

  return applyList
}
