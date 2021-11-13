import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { useSelector } from 'react-redux'
import { ScrollView } from 'native-base'
import { LoadingSpinner, PreviewTile, TopBar } from '@/Components'
import { AlbumState } from '@/Store/Album'
import { defaultResponse, ResponseType } from '@/Services/utils/fetchData'
import {
  FetchAlbumsCustom,
  FetchAlbumsPeople,
  FetchAlbumsThing,
} from '@/Services/Albums'

const AlbumContainer = () => {
  const [initialLoading, setInitialLoading] = useState(true)
  const [{ loading, error }, setPageData] =
    useState<ResponseType>(defaultResponse)

  const albumPeople = useSelector(
    (state: { album: AlbumState }) => state.album.albumsPeople,
  )
  const albumThings = useSelector(
    (state: { album: AlbumState }) => state.album.albumsThing,
  )
  const myAlbums = useSelector(
    (state: { album: AlbumState }) => state.album.albumsCustom,
  )

  const handleRefresh = () => {
    return Promise.all([
      FetchAlbumsCustom(setPageData),
      FetchAlbumsPeople(setPageData),
      FetchAlbumsThing(setPageData),
    ])
  }

  useEffect(() => {
    handleRefresh().then(() => setInitialLoading(false))
  }, [setPageData])

  useEffect(() => {
    if (error) {
      console.log('Error Albums:', error) // TODO: Notify the user.
    }
  }, [error])

  return (
    <>
      <TopBar />
      {initialLoading ? (
        <LoadingSpinner />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
        >
          <PreviewTile
            icon="people"
            heading="People"
            subHeading={`about ${albumPeople?.length} people`}
            albums={albumPeople}
            photoService="FetchPhotosPersonAlbum"
          />
          {/* <PreviewTile
          icon="map"
          heading="Places"
          subHeading={`about ${albumPeople.length} places`}
          albums={albumPeopleMapper(albumPeople)}
        /> */}
          <PreviewTile
            icon="library"
            heading="Things"
            subHeading={`about ${albumThings?.length} things`}
            albums={albumThings}
            photoService="FetchPhotosThingAlbum"
          />
          <PreviewTile
            icon="bookmark"
            heading="My Albums"
            subHeading={`about ${myAlbums?.length} albums`}
            albums={myAlbums}
            photoService="FetchPhotosCustomAlbum"
          />
        </ScrollView>
      )}
    </>
  )
}

export default AlbumContainer
