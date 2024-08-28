import { CSSObject } from '@chakra-ui/react';

export const globalStyle: CSSObject = {
  html: {
    fontSize: '16px',
  },
  'html, body': {
    backgroundColor: 'gray.50',
    color: 'primary.black',
  },
  body: {
    minWidth: '320px',
    fontFamily: 'body',
    fontSize: 'sm',
  },
  '*': {
    boxSizing: 'border-box',
    scrollbarColor: '#555 transparent',
  },
};
