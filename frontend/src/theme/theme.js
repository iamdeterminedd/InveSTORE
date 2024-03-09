import { extendTheme } from '@chakra-ui/react';
import styles from './styles.js';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  styles,
  config,
  colors: {
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    gray: {
      50: '#f7fafc',
      900: '#171923',
    },
  },
  components: {
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: 'white',
          },
          td: {
            borderColor: 'gray.200',
          },
        },
      },
    },
  },
});

export default theme;
