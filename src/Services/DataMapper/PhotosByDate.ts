import { TimelineListItemType } from '@/Components/TimelineList'
import { imageGridReducer } from './ImageGridReducer'

export type SourcePhotoType = {
  aspectRatio: number
  birthTime: string
  date: string
  dominantColor: string
  id: string
  location: string
  rating: number
  type: 'image' | 'video'
  url: string
}

type SourcePhotosByDateType = {
  date: string
  id: string
  incomplete: boolean
  location: string
  numberOfItems: number
  items: Array<SourcePhotoType>
}

export const photoMapper = (photosResult: Array<SourcePhotosByDateType>) => {
  if (typeof photosResult === 'undefined' || photosResult.length < 1) {
    return []
  }

  let finalmap = photosResult.map(item => {
    return {
      id: item.date,
      title: item.date,
      data: imageGridReducer(item.items),
    } as TimelineListItemType
  })

  return finalmap
}
