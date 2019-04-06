import React, { memo } from 'react';
import MuiGrid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
// eslint-disable-next-line import/no-extraneous-dependencies
import { compose as composeStyles, palette, typography, spacing, style} from '@material-ui/system';
import styled from 'components/styled';
import MuiTypography from '@material-ui/core/Typography';

const cursor = style({ prop: 'cursor'});

const Grid = styled(MuiGrid)(composeStyles(typography, palette, spacing));
const Typography = styled(MuiTypography)(composeStyles(typography, spacing, palette, cursor));

function PostOrder(props) {
  const {
    history,
  } = props;
  return (
    <Grid
      spacing={16}
      container bgcolor="colors.white" minHeight="70vh" p={5}  mt={2}>
      <Typography variant="headline">
        Thank you!
      </Typography>

      <Typography variant="body1" mt={3}>
        Your order has been successfully processed.
        An email confirmation containing all details on your order has been sent to
        your email address (remind to check your spam folder if you didn’t receive it).
        You can also check your order in “My Account” & {' '}
        <Typography
          onClick={() => history.push('/')}
          cursor="pointer"
          inline
          color="primary.main">
          Product Catalogue.
        </Typography>
      </Typography>
    </Grid>
  );
}

export default memo(PostOrder);