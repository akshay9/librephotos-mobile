import { ThemeColors, ThemeNavigationColors } from '@/Theme/theme.type'

const Colors: ThemeColors = {
  primary: 'white',
  secondary: '#2196f3',
  screenBackground: '#000000',
  modalBackground: '#212529',
  text: 'white',
  textLight: '#f8fafc',
  inputBackground: 'gray',
}

const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
}

export default {
  Colors,
  NavigationColors,
}
