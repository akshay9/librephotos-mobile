import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Pressable, View, Modal, Image, FlatList } from 'react-native'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'
import { useTheme } from '@/Theme'
import { getConfig } from '../Config'
import NoResultsError from './NoResultsError'
import { updateToken } from '../Services/Auth'
import PagerView from 'react-native-pager-view'

const ImageGrid = ({
  data,
  numColumns = 3,
  displayError = false,
  onRefresh = () => {},
  refreshing = false,
}) => {
  const { Common, Layout } = useTheme()

  const [zoomViewVisible, setZoomViewVisible] = useState(false)
  const [isImageZoomed, setImageZoomed] = useState(false)
  const [currImage, setCurrImage] = useState({ item: {} })

  const authToken = useSelector(state => state.auth.access.token)
  const config = useSelector(state => state.config)

  const COLUMNS = numColumns // Currently only columns=3 supported

  const handleImagePress = (item, index, section) => {
    setZoomViewVisible(true)
    setCurrImage({ item, index, section })
  }

  const handleImageLoadFail = () => {
    updateToken()
  }

  const handleZoomChange = (evt, gestureState, zoomState) => {
    if (zoomState.zoomLevel !== 1) {
      setImageZoomed(true)
    } else {
      setImageZoomed(false)
    }
  }

  const renderPhoto = ({ item, index, section, seperators }) => {
    return (
      <Pressable
        key={index}
        style={[Common.timeline.photoItem]}
        onPress={() => handleImagePress(item, index, section)}
      >
        <Image
          style={Layout.fullSize}
          source={{
            uri:
              getConfig(config.baseurl).MEDIA_URL +
              '/square_thumbnails/' +
              item.url,
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + authToken,
            },
          }}
          onError={handleImageLoadFail}
        />
      </Pressable>
    )
  }

  const renderViewPagerItem = (item, index, arr) => {
    return (
      <View style={[Layout.fill]} key={index}>
        <ReactNativeZoomableView
          maxZoom={2}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          pinchToZoomInSensitivity={1}
          zoomCenteringLevelDistance={3}
          movementSensibility={1.3}
          bindToBorders={true}
          captureEvent={true}
          doubleTapZoomToCenter={true}
          onDoubleTapAfter={handleZoomChange}
          onZoomEnd={handleZoomChange}
          style={[
            Layout.fullSize,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: 'black',
            },
          ]}
        >
          <Image
            style={Layout.fullSize}
            source={{
              uri:
                getConfig(config.baseurl).MEDIA_URL +
                '/thumbnails_big/' +
                item.url,
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + authToken,
              },
            }}
            resizeMode={'contain'}
            onError={handleImageLoadFail}
          />
        </ReactNativeZoomableView>
      </View>
    )
  }

  return (
    <>
      {data && data.length > 0 && (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={(item, index) => index}
          numColumns={COLUMNS}
          data={data}
          renderItem={renderPhoto}
        />
      )}
      {(typeof data !== 'object' ||
        typeof data.length === 'undefined' ||
        data.length < 1) &&
        displayError && (
          <NoResultsError refreshing={refreshing} onRefresh={onRefresh} />
        )}

      <Modal
        animationType="fade"
        transparent={false}
        visible={zoomViewVisible}
        onRequestClose={() => {
          setZoomViewVisible(!zoomViewVisible)
        }}
      >
        <PagerView
          style={[Layout.fill]}
          scrollEnabled={!isImageZoomed}
          initialPage={currImage.index}
        >
          {data && data.length > 0 && data.map(renderViewPagerItem)}
        </PagerView>
      </Modal>
    </>
  )
}

export default ImageGrid
