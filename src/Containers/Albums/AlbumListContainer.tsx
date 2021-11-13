import React from 'react'
import { useSelector } from 'react-redux'
import { View, FlatList, ListRenderItem } from 'react-native'
import { Box, Pressable, Image, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/Theme'
import { TopBar } from '@/Components'
import { updateToken } from '@/Services/Auth'
import { AuthState } from '@/Store/Auth'
import { AlbumType } from '@/Components/PreviewTile'
import { ImageType } from '@/Components/ImageGrid'
import AlbumServices from '@/Services/Albums'

export interface AlbumListItemType extends AlbumType {
  photos?: ((album: AlbumType) => void) | ImageType[]
}

const AlbumListContainer = ({
  route: {
    params: { title = 'Albums', albums = [] as AlbumType[], photoService = '' },
  },
}) => {
  const { Common, Colors, Gutters, Layout } = useTheme()
  const navigation = useNavigation<any>()
  const authToken = useSelector(
    (state: { auth: AuthState }) => state.auth.access.token,
  )

  const handleItemPress = (item: AlbumType, index: number) => {
    navigation.push('PhotoList', {
      title: albums[index].title,
    })
    AlbumServices[photoService](item, index)
  }

  const renderItem: ListRenderItem<AlbumType> = ({ item, index }) => {
    return (
      <Pressable
        key={index}
        style={[Common.timeline.photoItem]}
        onPress={() => handleItemPress(item, index)}
      >
        <View style={[Layout.center]}>
          <Box
            shadow={5}
            bg={Colors.screenBackground}
            borderRadius={10}
            boxSize={'80%'}
          >
            <Image
              style={[Layout.fullSize]}
              source={{
                uri: item.url,
                method: 'GET',
                headers: {
                  Authorization: 'Bearer ' + authToken,
                },
              }}
              alt="Image"
              borderRadius={10}
              onError={() => {
                updateToken()
              }}
            />
          </Box>
          <Text
            textAlign="center"
            style={[Gutters.tinyTMargin]}
            fontSize={'sm'}
            numberOfLines={1}
            color={Colors.text}
          >
            {item.title}
          </Text>
        </View>
      </Pressable>
    )
  }

  return (
    <>
      <TopBar title={title} showBack={true} />
      <FlatList
        style={[
          Gutters.smallVPadding,
          { backgroundColor: Colors.screenBackground },
        ]}
        removeClippedSubviews={true}
        // refreshing={false}
        // onRefresh={() => {}}
        data={albums}
        renderItem={renderItem}
        numColumns={3}
        ListFooterComponent={
          <View
            style={[
              Layout.center,
              Gutters.regularTPadding,
              Gutters.largeBPadding,
            ]}
          >
            <Text fontSize="sm" italic color={Colors.textMuted}>
              Thats all folks!
            </Text>
          </View>
        }
      />
    </>
  )
}

export default AlbumListContainer
