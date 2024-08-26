import { CustomTheme } from './theme';

declare module '@chakra-ui/react' {
  export interface ThemeOverride extends CustomTheme {}
}