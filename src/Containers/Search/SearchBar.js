import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Button,
  Input,
  HStack,
  IconButton,
  Icon,
  Text,
  StatusBar,
  Center,
} from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@/Theme'
import { useNavigation } from '@react-navigation/native'
import FindPhotos from '../../Store/Search/FindPhotos'
import UpdateQuery from '../../Store/Search/UpdateQuery'

const SearchBar = ({ showBack = false, showMenu = false }) => {
  const { Colors, Gutters, Layout, Images } = useTheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = ({ nativeEvent: { text, eventCount, target } }) => {
    dispatch(FindPhotos.action({ searchQuery: text }))
  }

  const handleBack = e => {
    setSearchQuery('')
    dispatch(UpdateQuery.action({ searchQuery: '' }))
    // navigation.goBack()
  }

  return (
    <>
      <StatusBar backgroundColor={Colors.transparent} barStyle="dark-content" />

      {/* <Box safeAreaTop backgroundColor="#6200ee" /> */}

      <HStack
        bg={Colors.screenBackground}
        px={2}
        py={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack size={1}>
          {searchQuery.length > 0 && (
            <IconButton
              mr={2}
              icon={
                <Icon
                  size="sm"
                  as={<Ionicons name="arrow-back" />}
                  color="black"
                />
              }
              onPress={handleBack}
            />
          )}
        </HStack>
        <Center flexGrow={1}>
          <Input
            _focus={{
              borderColor: 'grey',
            }}
            returnKeyType="search"
            autoFocus={true}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            value={searchQuery}
            clearButtonMode="while-editing"
            style={[Gutters.smallHMargin]}
            placeholder="Search"
            variant="filled"
            borderRadius={10}
            py={2}
            px={2}
            InputLeftElement={
              <Icon size="md" ml={2} as={<Ionicons name="ios-search" />} />
            }
          />
        </Center>
        {showMenu && (
          <HStack mx={2} size={1}>
            <Button variant="outline" size="sm" title="Go">
              Go
            </Button>
          </HStack>
        )}
      </HStack>
    </>
  )
}

export default SearchBar