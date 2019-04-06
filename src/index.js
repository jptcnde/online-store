import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';
import ThemeContext from './components/ThemeContext';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import store from './store';

const ROOT_DOM = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ThemeContext.Provider value={theme}>
          <App />
        </ThemeContext.Provider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
, ROOT_DOM);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
