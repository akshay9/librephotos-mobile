import React from 'react'
import { FlatList, View, Pressable, ListRenderItem } from 'react-native'
import { useSelector } from 'react-redux'
import { Box, Image, Text, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@/Theme'
import { useNavigation } from '@react-navigation/native'
import { updateToken } from '../Services/Auth'
import { AuthState } from '@/Store/Auth'
import AlbumServices from '../Services/Albums'

export type AlbumType = {
  id: string
  url: string
  title: string
}

type Props = {
  icon: string
  heading: string
  subHeading: string
  albums: AlbumType[]
  photoService: string
  iconSuffix?: string
}

const PreviewTile = ({
  icon,
  heading,
  subHeading,
  albums,
  photoService = '',
  iconSuffix = '',
}: Props) => {
  const { Colors, Layout, Common, Gutters } = useTheme()
  const navigation = useNavigation<any>()
  const authToken = useSelector(
    (state: { auth: AuthState }) => state.auth.access.token,
  )

  const handleItemPress = (item: AlbumType, index: number) => {
    navigation.push('PhotoList', {
      title: item.title,
    })
    AlbumServices[photoService](item, index)
  }

  const renderItem: ListRenderItem<AlbumType> = ({ item, index }) => {
    return (
      <Pressable
        key={index}
        style={[Common.timeline.albumItem]}
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
              borderRadius={7}
              onError={() => {
                updateToken()
              }}
            />
          </Box>
          <Text
            style={[Gutters.tinyTMargin]}
            fontSize={'lg'}
            color={Colors.text}
          >
            {item.title}
          </Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={[Common.backgroundDefault, Gutters.smallBPadding]}>
      <Pressable
        onPress={() => {
          navigation.push('AlbumList', {
            title: heading,
            albums: albums,
            photoService: photoService,
          })
        }}
      >
        <HStack style={[Gutters.regularLPadding]}>
          {icon && (
            <View style={[Layout.center]}>
              <Ionicons
                name={icon + iconSuffix}
                size={35}
                color={Colors.text}
              />
            </View>
          )}
          <View
            style={[
              Gutters.regularLMargin,
              Gutters.smallVMargin,
              Common.timeline.photoContainer,
            ]}
          >
            <Text fontSize={'xl'} color={Colors.text}>
              {heading}
            </Text>
            <Text italic fontSize={'sm'} color={Colors.textMuted}>
              {subHeading}
            </Text>
          </View>
          <View style={[Layout.center]}>
            <Ionicons name={'chevron-forward'} size={35} color={Colors.text} />
          </View>
        </HStack>
      </Pressable>
      <FlatList
        // refreshing={false}
        // onRefresh={() => {}}
        showsHorizontalScrollIndicator={false}
        data={albums}
        renderItem={renderItem}
        horizontal={true}
      />
    </View>
  )
}

PreviewTile.defaultProps = {
  iconSuffix: '',
}

export default PreviewTile
