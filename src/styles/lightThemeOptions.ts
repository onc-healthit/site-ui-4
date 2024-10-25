import { ThemeOptions } from '@mui/material/styles'
import { Inter } from 'next/font/google'
import palette from './palette'

const InterSite = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
})

export const lightThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0, // Extra small devices (portrait phones)
      sm: 600, // Small devices (landscape phones)
      md: 960, // Medium devices (tablets)
      lg: 1280, // Large devices (desktops)
      xl: 1920, // Extra large devices (large desktops)
    },
  },
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
      fontSize: '.95em',
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
          scrollbarColor: '#00000020',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#00000020',
            width: '4px',
            borderRadius: 32,
            height: '4px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 16,
            backgroundColor: '#00000040',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#00000060',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#00000060',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#00000060',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            borderRadius: 8,
          },
        },
        a: {
          '&:visited': {
            color: '#B142F5',
          },
        },
      },
    },
    // If we don't want to override this globally, can revert to using a local override in SiteHome
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          color: palette.white,
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
            backgroundColor: '#e4f1fe',
          },
          '&:selected': {
            backgroundColor: palette.secondaryDark,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: palette.primary,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: palette.white,
          '&.Mui-selected': {
            color: palette.white,
            backgroundColor: palette.primaryDark,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: palette.error,
        },
      },
    },
    MuiTouchRipple: {
      styleOverrides: {
        ripple: {
          backgroundColor: palette.secondary,
        },
        rippleVisible: {
          backgroundColor: palette.secondary,
        },
      },
    },
  },
}
