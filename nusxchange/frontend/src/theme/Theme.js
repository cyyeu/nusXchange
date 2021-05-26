import { createMuiTheme } from '@material-ui/core/styles'

const Theme = createMuiTheme({
  palette: {
    common: { black: '#000', white: 'rgba(255, 255, 255, 1)' },
    background: {
      paper: 'rgba(255, 255, 255, 1)',
      default: 'rgba(255, 255, 255, 1)',
    },
    primary: {
      light: '#7986cb',
      main: 'rgba(65, 65, 0, 1)',
      dark: 'rgba(36, 28, 18, 1)',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
    secondary: {
      light: 'rgba(255, 222, 158, 1)',
      main: 'rgba(240, 171, 32, 1)',
      dark: 'rgba(238, 143, 29, 1)',
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
