import { ThemeOptions } from '@mui/material/styles'
import { Inter } from 'next/font/google'
import palette from './palette'

const InterSite = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
})

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: palette.background,
    },
    common: {
      black: palette.black,
      white: palette.white,
    },
    primary: {
      light: palette.primaryLight,
      main: palette.primary,
      dark: palette.primaryDark,
    },
    secondary: {
      light: palette.secondaryLight,
      main: palette.secondary,
      dark: palette.secondaryDark,
    },
    warning: {
      light: palette.warningLight,
      main: palette.warning,
      dark: palette.warningDark,
    },
    error: {
      main: palette.error,
      dark: palette.errorDark,
    },
    success: {
      light: palette.successLight,
      main: palette.success,
      dark: palette.successDark,
    },
    info: {
      light: palette.primaryLight,
      main: palette.primary,
      dark: palette.primaryDark,
    },
    grey: {
      300: palette.greyLight,
      500: palette.grey,
      700: palette.greyDark,
    },
  },
  typography: {
    fontFamily: [InterSite.style.fontFamily, 'san-serif'].join(','),
    h1: {
      fontSize: '2em',
    },
    h2: {
      fontSize: '1.741em',
    },
    h3: {
      fontSize: '1.516em',
    },
    h4: {
      fontSize: '1.320em',
    },
    h5: {
      fontSize: '1.149em',
    },
    h6: {
      fontSize: '1em',
    },
    body1: {
      fontSize: '1em',
      lineHeight: '1.4em',
    },
    body2: {
      fontSize: '0.875em',
    },
    subtitle1: {
      fontWeight: 800,
      textTransform: 'capitalize',
      fontSize: '1em',
    },
    subtitle2: {
      fontWeight: 800,
      textTransform: 'capitalize',
      fontSize: '0.875em',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        docked: {
          flex: 1,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: palette.greyDark,
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: palette.greyLight,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: palette.greyMain,
            border: `4px solid ${palette.greyLight}`,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: palette.greyMain,
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: palette.greyMain,
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: palette.greyMain,
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: palette.greyMain,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: palette.greyLight,
          },
          '&:focus': {
            backgroundColor: palette.secondaryLight,
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)', // Example selected background color
          },
        },
      },
    },
  },
}
