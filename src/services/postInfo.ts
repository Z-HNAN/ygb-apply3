import request from '@/utils/request'

/**
 * 学生报名岗位信息
 */
export async function apply(
  { workId, phone, verifyRequest }: { workId: string, phone: string, verifyRequest: string }
): Promise<any> {
  const response = await request(`apply`, {
    method: 'POST',
    data: { workId, phone, verifyRequest },
  })

  return {
    success: response.success,
    errorMsg: response.errorMsg,
  }
}

/**
 * 学生更改存储的手机号
 */
export async function changePhone(
  { phone, verifyRequest }: { phone: string, verifyRequest: string }
): Promise<any> {
  const response = await request(`student/phone`, {
    method: 'POST',
    data: { phone, verifyRequest },
  })

  return {
    success: response.success,
    errorMsg: response.errorMsg,
  }
}
