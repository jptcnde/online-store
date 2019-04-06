import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MuiStarIcon from '@material-ui/icons/StarRate';
import composeAll from '1-liners/composeAll';
import { connect } from 'react-redux';
import Box from 'components/Box';
// eslint-disable-next-line import/no-extraneous-dependencies
import { sizing, compose as composeStyles, spacing, palette, style, display, typography } from '@material-ui/system';
import styled from 'components/styled';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MuiGrid from '@material-ui/core/Grid';
import MuiDivider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';
import Corousel from './Corousel';
import { select } from '../../store';
import toTitleCase from '../../utils/toTitleCase';

const cursor = style({ prop: 'cursor' });

const Grid = styled(MuiGrid)(composeStyles(sizing, spacing, palette));
const Typography = styled(MuiTypography)(composeStyles(cursor, palette, typography));
const Img = styled('img')(sizing);
const Divider = styled(MuiDivider)(spacing);
const StarIcon = styled(MuiStarIcon)(composeStyles(typography, spacing, palette));

function ProductDetail(props) {
  const {
    selected: {
      id,
      product: {
        designer,
        brand,
        range,
        city,
        season,
        image,
        sizes,
      },
      price,
      retailPrice,
      status
    },
    completeOrder,
    history
  } = props;

  const STATUS_COLORS = {
    'pending': 'colors.orange',
    'fulfilled': 'colors.green',
    'available': 'primary.main'
  };

  return (
    <Grid
      spacing={16}
      container bgcolor="colors.white" minHeight="70vh" p={2} pt={3} mt={2}>
      <Grid item xs={7}>
        <Corousel image={image} />
      </Grid>
      <Grid item xs={5}>
        <Typography variant="headline">
          {`${brand} - ${designer}`}
        </Typography>

        <Grid mt={1} container={12}>
          <Grid item xs={6} container alignItems="center">
            <StarIcon fontSize="body2" color="colors.orange" />
            <StarIcon fontSize="body2" color="colors.orange" />
            <StarIcon fontSize="body2" color="colors.orange" />
            &nbsp;&nbsp;
            <Typography variant="caption" color="primary.main" inline cursor="pointer">
              116 ratings
            </Typography>
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <Typography variant="caption" color="primary.main" inline cursor="pointer">
              617 Answered Questions
            </Typography>
          </Grid>

        </Grid>

        <Grid item mt={1} container>
          <Grid item xs={6}>
            <Typography variant="caption" inline>
              Location:
            </Typography>
              {'  '}
            <Typography variant="body1" fontSize="caption.fontSize" inline>
              {city}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" inline>
              Free Shipping
            </Typography>
          </Grid>
        </Grid>

        <Divider mt={2} />

        <Grid mt={4}>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              <Typography variant="h4" color="colors.orange">
                {`S$ ${price}`}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="primary.main" inline>
                Available sizes
              </Typography>
              {' - '}
              <Typography variant="caption" color="primary.main" inline>
                {sizes.join(', ')}
              </Typography>
            </Grid>
          </Grid>



          <Box mt={.5}>
            <Typography variant="caption" inline>
              Retail Price:
            </Typography>
              {'  '}
            <Typography variant="body1" fontSize="caption.fontSize" inline>
              {`S$ ${retailPrice}`}
            </Typography>
          </Box>

          <Grid item xs={12} mt={6} container alignItems="center">
            <Grid item xs={6} >
              <Typography variant="caption" inline>
                Season:
              </Typography>
                {'  '}
              <Typography variant="body1" fontSize="caption.fontSize" inline>
                {season}
              </Typography>
            </Grid>
            <Grid item xs={6} >
              <Typography variant="caption" inline>
                Status:
              </Typography>
                {'  '}
              <Typography
                variant="body1"
                color={STATUS_COLORS[status]}
                fontSize="caption.fontSize" inline>
                {toTitleCase(status)}
              </Typography>
            </Grid>
          </Grid>

        </Grid>

        <Divider mt={4} />

        <Box mt={5}>
          {(() => {
            if (status === 'fulfilled') {
              return (
                <Button
                  onClick={() =>  history.push('/')}
                  fullWidth variant="contained" color="primary">
                  Go back to Catalogue
                </Button>
              );
            }

            return (
              <Button
                onClick={() => {
                  completeOrder(id);
                  history.push('/post-order');
                }}
                fullWidth variant="contained" color="primary">
                {status === 'pending' ? 'Fulfill Order' : 'Purchase'}
              </Button>
            );
          })()}

        </Box>
      </Grid>
    </Grid>
  );
}

ProductDetail.propTypes = {
  selected: PropTypes.shape({}).isRequired,
};

const mapState = (state) => ({
  selected: select.orderDetail.getSelected(state)
});

const mapDispatch = ({ orderDetail: { completeOrder }}) => ({
  completeOrder
});

export default composeAll([
  connect(mapState, mapDispatch),
  memo
])(ProductDetail);