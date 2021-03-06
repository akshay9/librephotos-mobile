import React from 'react'
import { View } from 'react-native'
import { Spinner, Text } from 'native-base'
import { useTheme } from '@/Theme'

const LoadingSpinner = ({ height, width, mode }) => {
  const { Common, Colors, Layout, Gutters } = useTheme()

  return (
    <View style={[Layout.fullSize, Layout.center, Common.backgroundDefault]}>
      <Spinner
        color={Colors.primary}
        size="lg"
        accessibilityLabel="Loading posts"
      />
      <Text style={[Gutters.smallTMargin]} color={Colors.text}>
        Loading...
      </Text>
    </View>
  )
}

export default LoadingSpinner
