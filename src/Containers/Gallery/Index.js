import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native'
import { Button, HStack, ScrollView } from 'native-base'
import { useTheme } from '@/Theme'
import FetchAlbumByDate from '@/Store/Album/FetchByDate'
import FetchPhotosWithoutDate from '@/Store/Album/FetchPhotosWithoutDate'
import FetchRecentlyAdded from '@/Store/Album/FetchRecentlyAdded'
import FetchFavourites from '@/Store/Album/FetchFavourites'
import FetchHidden from '@/Store/Album/FetchHidden'
import FetchPublic from '@/Store/Album/FetchPublic'
import TimelineList from '@/Components/TimelineList'
import { TopBar } from '@/Components'
import ImageGrid from '@/Components/ImageGrid'

const CategoryType = {
  PhotosByDate: 'With Timestamp',
  PhotosWithoutDate: 'Without Timestamp',
  Recent: 'Recently Added',
  Favourite: 'Favourites',
  Public: 'Public Photos',
  Hidden: 'Hidden',
}

const GalleryContainer = () => {
  const { Common, Layout } = useTheme()
  const dispatch = useDispatch()

  const albums = useSelector(state => state.album)
  const albumByDate = useSelector(state => state.album.albumByDate)
  const albumWithoutDate = useSelector(state => state.album.albumWithoutDate)
  const albumRecentlyAdded = useSelector(
    state => state.album.albumRecentlyAdded,
  )
  const albumFavourites = useSelector(state => state.album.albumFavourites)
  const albumPublic = useSelector(state => state.album.albumPublic)
  const albumHidden = useSelector(state => state.album.albumHidden)
  const photosByDate = albumByDate
  const photosWithoutDate = albumWithoutDate?.results

  const [category, setCategory] = useState(CategoryType.PhotosByDate)

  useEffect(() => {
    console.log('Fetching Category: ' + category)
    switch (category) {
      case CategoryType.PhotosByDate:
        dispatch(FetchPhotosWithoutDate.action())
        break
      case CategoryType.PhotosWithoutDate:
        dispatch(FetchAlbumByDate.action())
        break
      case CategoryType.Recent:
        dispatch(FetchRecentlyAdded.action())
        break
      case CategoryType.Favourite:
        dispatch(FetchFavourites.action())
        break
      case CategoryType.Public:
        dispatch(FetchPublic.action())
        break
      case CategoryType.Hidden:
        dispatch(FetchHidden.action())
        break
    }
  }, [dispatch, category])

  useEffect(() => {
    dispatch(FetchAlbumByDate.action())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderButton = (index, buttonCategory) => {
    return (
      <Button
        key={index}
        size="xs"
        variant={category === buttonCategory ? 'solid' : 'outline'}
        colorScheme="dark"
        onPress={() => setCategory(buttonCategory)}
      >
        {buttonCategory}
      </Button>
    )
  }

  const renderContent = () => {
    switch (category) {
      case CategoryType.PhotosByDate:
        return (
          <TimelineList
            data={photosByDate}
            onRefresh={() => dispatch(FetchAlbumByDate.action())}
            refreshing={albums.loading}
          />
        )
      case CategoryType.PhotosWithoutDate:
        return (
          <ImageGrid
            data={photosWithoutDate}
            numColumns={3}
            displayError={true}
            onRefresh={() => dispatch(FetchPhotosWithoutDate.action())}
            refreshing={albums.loading}
          />
        )
      case CategoryType.Recent:
        return (
          <ImageGrid
            data={albumRecentlyAdded?.results}
            numColumns={3}
            displayError={true}
            onRefresh={() => dispatch(FetchAlbumByDate.action())}
            refreshing={albums.loading}
          />
        )
      case CategoryType.Favourite:
        return (
          <TimelineList
            data={albumFavourites}
            onRefresh={() => dispatch(FetchFavourites.action())}
            refreshing={albums.loading}
          />
        )
      case CategoryType.Public:
        return (
          <TimelineList
            data={albumPublic}
            onRefresh={() => dispatch(FetchPublic.action())}
            refreshing={albums.loading}
          />
        )
      case CategoryType.Hidden:
        return (
          <TimelineList
            data={albumHidden}
            onRefresh={() => dispatch(FetchHidden.action())}
            refreshing={albums.loading}
          />
        )
    }
  }

  return (
    <>
      <TopBar />
      <View style={[Common.backgroundDefault, Layout.colCenter]}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack
            space={{ base: 3, md: 4 }}
            mx={{ base: 5, md: 0 }}
            my={{ base: 2, md: 0 }}
            style={[Common.backgroundDefault]}
          >
            {Object.values(CategoryType).map((buttonCategory, index) =>
              renderButton(index, buttonCategory),
            )}
          </HStack>
        </ScrollView>
      </View>
      <View style={[Layout.fill, Common.backgroundDefault]}>
        {renderContent()}
      </View>
    </>
  )
}

export default GalleryContainer
