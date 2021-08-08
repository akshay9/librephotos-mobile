import { StyleSheet } from 'react-native'

export default function ({ Colors, Gutters, Layout }) {
  const base = {
    ...Layout.center,
    ...Gutters.largeHPadding,
    height: 40,
    backgroundColor: Colors.primary,
  }

  const photoItem = {
    width: '32.3%',
    height: 140,
    margin: 2,
  }

  return StyleSheet.create({
    base,
    photoItem,
  })
}