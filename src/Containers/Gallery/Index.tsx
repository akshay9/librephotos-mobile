import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native'
import { Button, HStack, ScrollView } from 'native-base'
import { useTheme } from '@/Theme'
import TimelineList from '@/Components/TimelineList'
import { TopBar } from '@/Components'
import ImageGrid from '@/Components/ImageGrid'
import { GalleryState } from '@/Store/Gallery'
import {
  FetchPhotosFavourites,
  FetchPhotosHidden,
  FetchPhotosPublic,
  FetchPhotosRecentlyAdded,
  FetchPhotosWithDate,
  FetchPhotosWithoutDate,
} from '@/Services/Gallery'
import { defaultResponse, ResponseType } from '@/Services/utils/fetchData'

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

  const [{ loading, error }, setPageData] =
    useState<ResponseType>(defaultResponse)

  const photosByDate = useSelector(
    (state: { gallery: GalleryState }) => state.gallery.photosWithTimestamp,
  )
  const photosWithoutDate = useSelector(
    (state: { gallery: GalleryState }) => state.gallery.photosWithoutTimestamp,
  )
  const photosRecentlyAdded = useSelector(
    (state: { gallery: GalleryState }) => state.gallery.photosRecentlyAdded,
  )
  const photosFavourites = useSelector(
    (state: { gallery: GalleryState }) => state.gallery.photosFavourites,
  )
  const photosPublic = useSelector(
    (state: { gallery: GalleryState }) => state.gallery.photosPublic,
  )
  const PhotosHidden = useSelector(
    (state: { gallery: GalleryState }) => state.gallery.photosHidden,
  )

  const [category, setCategory] = useState(CategoryType.PhotosByDate)

  useEffect(() => {
    console.log('Fetching Category: ' + category)
    switch (category) {
      case CategoryType.PhotosByDate:
        FetchPhotosWithDate(setPageData)
        break
      case CategoryType.PhotosWithoutDate:
        FetchPhotosWithoutDate(setPageData)
        break
      case CategoryType.Recent:
        FetchPhotosRecentlyAdded(setPageData)
        break
      case CategoryType.Favourite:
        FetchPhotosFavourites(setPageData)
        break
      case CategoryType.Public:
        FetchPhotosPublic(setPageData)
        break
      case CategoryType.Hidden:
        FetchPhotosHidden(setPageData)
        break
    }
  }, [dispatch, category])

  useEffect(() => {
    FetchPhotosWithDate(setPageData)
  }, [])

  useEffect(() => {
    // TODO: create error popup
    if (error) {
      console.log('Error', error)
    }
  }, [error])

  const renderButton = (index: string, buttonCategory: string) => {
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
            onRefresh={() => FetchPhotosWithDate(setPageData)}
            refreshing={loading}
          />
        )
      case CategoryType.PhotosWithoutDate:
        return (
          <ImageGrid
            data={photosWithoutDate}
            numColumns={3}
            displayError={true}
            onRefresh={() => FetchPhotosWithoutDate(setPageData)}
            refreshing={loading}
          />
        )
      case CategoryType.Recent:
        return (
          <ImageGrid
            data={photosRecentlyAdded}
            numColumns={3}
            displayError={true}
            onRefresh={() => FetchPhotosRecentlyAdded(setPageData)}
            refreshing={loading}
          />
        )
      case CategoryType.Favourite:
        return (
          <TimelineList
            data={photosFavourites}
            onRefresh={() => FetchPhotosFavourites(setPageData)}
            refreshing={loading}
          />
        )
      case CategoryType.Public:
        return (
          <TimelineList
            data={photosPublic}
            onRefresh={() => FetchPhotosPublic(setPageData)}
            refreshing={loading}
          />
        )
      case CategoryType.Hidden:
        return (
          <TimelineList
            data={PhotosHidden}
            onRefresh={() => FetchPhotosHidden(setPageData)}
            refreshing={loading}
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
              renderButton(index + '', buttonCategory),
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
