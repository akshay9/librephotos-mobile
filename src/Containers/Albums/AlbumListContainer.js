import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList } from 'react-native'
import { Box, Pressable, Image, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/Theme'
import { useTranslation } from 'react-i18next'
import { TopBar } from '@/Components'
import { updateToken } from '@/Services/Auth'

const AlbumListContainer = ({
  route: {
    params: { title = 'Albums', albums = [], photos = () => null },
  },
}) => {
  const { t } = useTranslation()
  const { Common, Colors, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const authToken = useSelector(state => state.auth.access.token)

  const handleItemPress = (item, index, section) => {
    photos(item)
    navigation.push('PhotoList', {
      title: albums[index].title,
    })
  }

  const renderItem = ({ item, index, section, seperators }) => {
    return (
      <Pressable
        key={index}
        style={[Common.timeline.photoItem]}
        onPress={() => handleItemPress(item, index, section)}
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
            <Text fontSize="sm" italic>
              Thats all folks!
            </Text>
          </View>
        }
      />
    </>
  )
}

export default AlbumListContainer