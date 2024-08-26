const themeColors = {
  primary: '#007bff',
  secondary: '#6c757d',
  black: '#000000',
  white: '#ffffff',
  blue: {
    100: '#cce4f6',
    200: '#99c9ed',
    300: '#66afe9',
    400: '#339ff1',
    500: '#007bff',
    600: '#0069d9',
    700: '#005cbf',
    800: '#004c99',
    900: '#003366',
  },
  gray: {
    100: '#f8f9fa',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
  },
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  transparent: 'transparent',
  current: 'currentColor',
};

export const colors = {
  ...themeColors,
  background: {
    primary: themeColors.white,
    secondary: themeColors.secondary,
  },
};
