import { createMuiTheme } from '@material-ui/core/styles'

const Theme = createMuiTheme({
  palette: {
    common: { black: '#000', white: 'rgba(255, 255, 255, 1)' },
    background: {
      paper: 'rgba(255, 255, 255, 1)',
      default: 'rgba(255, 255, 255, 1)',
    },
    primary: {
      light: 'rgba(84, 81, 81, 1)',
      main: 'rgba(51, 49, 49, 0.93)',
      dark: 'rgba(51, 49, 49, 1)',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
    secondary: {
      light: 'rgba(223, 158, 140, 1)',
      main: 'rgba(234, 139, 113, 1)',
      dark: 'rgba(231, 126, 99, 1)',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
})

export default Theme
