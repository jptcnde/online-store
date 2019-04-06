import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import composeAll from '1-liners/composeAll';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// eslint-disable-next-line import/no-extraneous-dependencies
import { sizing, compose as composeStyles, spacing } from '@material-ui/system';
import NotFoundPage from '../NotFound';
import OrderDetail from '../OrderDetail';
import ProductDetail from '../ProductDetail';
import PostOrder from '../PostOrder';
import styled from '../../components/styled';
import useStyles from '../../components/useStyles';

const Main = styled('main')(composeStyles(sizing, spacing));

const styles = theme => ({
  '@global': {
    '#root': {
      backgroundColor: theme.palette.colors.cloudWhite
    }
  }
});

function App(props) {
  const { configureData } = props;
  useStyles(styles);
  useEffect(() => {
    configureData();
  }, []);

  return (
    <>
      <CssBaseline />
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h5" color="inherit" noWrap>
            Online Store
            </Typography>
        </Toolbar>
      </AppBar>
      <Main maxWidth={1024} margin="0 auto" mt={4}>
        <Switch>
          <Route exact path="/" component={OrderDetail} />
          <Route exact path="/product-detail" component={ProductDetail} />
          <Route exact path="/post-order" component={PostOrder} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Main>
    </>

  );
}

App.propTypes = {
  configureData: PropTypes.func.isRequired,
};

const mapDispatch = ({ app: {  configureData }}) => ({
  configureData
});

export default composeAll([
  connect(null,mapDispatch),
  memo
])(App);