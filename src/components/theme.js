import {  createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import deepPurple from '@material-ui/core/colors/deepPurple';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import common from '@material-ui/core/colors/common';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    colors: {
      white: common.white,
      black: common.black,
      cloudWhite: '#f8fafb',
      deepPurple: deepPurple[500],
      green: green[500],
      orange: orange[500]
    }
  },
  typography: {
    useNextVariants: true,
    caption: {
      color: grey[600],
      fontSize: 12,
      fontWeight: 'normal',
      letterSpacing: 'normal',
      lineHeight: 18 / 12,
    },
  },
});


export default theme;