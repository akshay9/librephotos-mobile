import React from 'react'
import { useSelector } from 'react-redux'
import TimelineList from '../../Components/TimelineList'
import { TopBar } from '../../Components'
import ImageGrid from '../../Components/ImageGrid'
import LoadingSpinner from '../../Components/LoadingSpinner'
import { AlbumState } from '@/Store/Album'

const PhotoListContainer = ({
  route: {
    params: { title = 'Albums' },
  },
}) => {
  const photoViewData = useSelector(
    (state: { album: AlbumState }) => state.album.photoViewData,
  )

  return (
    <>
      <TopBar title={title} showBack={true} />
      {!photoViewData.loading ? (
        photoViewData.dataType === 'timeline' ? (
          <TimelineList data={photoViewData.data} />
        ) : (
          <ImageGrid data={photoViewData.data} displayError={true} />
        )
      ) : (
        <LoadingSpinner />
      )}
    </>
  )
}

export default PhotoListContainer
