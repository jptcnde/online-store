import React from 'react';
import {
  spacing, compose, palette,
  sizing, flexbox, typography,
  display, borders
} from '@material-ui/system';
import styled from './styled';

function Box(props) {
  const { component, children, ...otherProps } = props;

  const Component = styled(component)(
    compose(
      flexbox,
      spacing,
      palette,
      sizing,
      typography,
      display,
      borders
    ),
  );

  return <Component {...otherProps}>{children}</Component>;
}

Box.defaultProps = {
  component: 'div'
};

export default Box;

