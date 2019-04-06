/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Carousel  } from 'react-responsive-carousel';
import Typography from '@material-ui/core/Typography';

function ProductCorousel(props) {
  const {
    image: {
      front,
      side,
      back,
      detail1,
      detail2,
    }
  } = props;

  return (
    <Carousel>
      <div>
        <img src={front} alt="front image" />
        <Typography variant="caption">
          Front
        </Typography>
      </div>
      <div>
        <img src={side} alt="side image" />
        <Typography variant="caption">
          Side
        </Typography>
      </div>
      <div>
        <img src={back} alt="back image" />
        <Typography variant="caption">
          Back
        </Typography>
      </div>
      <div>
        <img src={detail1} alt="detail1" />
        <Typography variant="caption">
          Detail1
        </Typography>
      </div>
      <div>
        <img src={detail2} alt="detail2" />
        <Typography variant="caption">
          Detail2
        </Typography>
      </div>
    </Carousel>
  );
}

ProductCorousel.propTypes = {
  image: PropTypes.shape({
    front: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired,
    detail1: PropTypes.string.isRequired,
    detail2: PropTypes.string.isRequired,
  }).isRequired,
}

export default memo(ProductCorousel);