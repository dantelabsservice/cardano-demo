import { extendTheme, ThemeComponents } from '@chakra-ui/react';

import { colors } from './colors';
import * as CustomComponents from './components';
import { globalStyle } from './global-style';
import { sizes, space } from './sizes';
import { fonts, fontSizes } from './typography';
import { textStyles } from './text-styles';

const components: ThemeComponents = {
  ...CustomComponents,
};

const themeValues = {
  components,
  colors,
  fonts,
  fontSizes,
  sizes,
  space,
  textStyles,
  styles: { global: globalStyle },
};

export const theme = extendTheme(themeValues);

type CustomTheme = typeof themeValues;

export type { CustomTheme };
