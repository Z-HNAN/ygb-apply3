import { createSelector } from 'reselect'
import { IConnectState } from '@/models/connect.d'
import { ApartmentPostType } from '@/models/post'

export interface ApartmentPostListType {
  id: string,
  title: string,
  nowCount: number,
  totalCount: number,
}

/**
 * 当前是否选中了楼宇号
 */
export const hiddenSelector = createSelector(
  [
    (state: IConnectState) => state.postInfo.apartmentId
  ],
  (apartmentId) => {
    return apartmentId === null
  }
)


/**
 * 选出公寓中心楼宇号对应的岗位信息
 */
export const apartmentPostListSelector = createSelector(
  [
    hiddenSelector,
    (state: IConnectState) => state.postInfo.apartmentId as string,
    (state: IConnectState) => state.post.apartmentPosts
  ],
  (hidden, apartmentId, apartmentPostsObj) => {
    if (hidden === true ) { return [] }

    const apartmentPosts: ApartmentPostType[] = apartmentPostsObj[apartmentId] || []
    const apartmentPostList: ApartmentPostListType[] = apartmentPosts.map((apartmentPost) => ({
      id: apartmentPost.id,
      title: apartmentPost.title,
      nowCount: apartmentPost.nowCount,
      totalCount: apartmentPost.totalCount
    } as ApartmentPostListType))

    return apartmentPostList
  }
)
