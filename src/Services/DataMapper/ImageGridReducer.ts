import { ImageType } from '@/Components/ImageGrid'
import { SourcePhotoType } from './PhotosByDate'

export const imageGridReducer = (sectionData: Array<SourcePhotoType>) => {
  if (typeof sectionData === 'undefined' || sectionData.length < 1) {
    return []
  }

  let finalmap = sectionData.map((item, index) => {
    return {
      id: index,
      url: item.url,
    } as ImageType
  })

  return finalmap
}
