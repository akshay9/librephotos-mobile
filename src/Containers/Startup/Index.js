import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Text } from 'native-base'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Theme'
import InitStartup from '@/Store/Startup/Init'
import { Brand } from '@/Components'

const IndexStartupContainer = () => {
  const { Colors, Layout, Gutters, Fonts } = useTheme()

  const { t } = useTranslation()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(InitStartup.action())
  }, [dispatch])

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      <Text color={Colors.text} style={Fonts.textCenter}>
        {t('welcome')}
      </Text>
    </View>
  )
}

export default IndexStartupContainer
