/**
 * @author: Jopet
 * @file: NxgSelect
 *
 * Contributors:

*/
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Popper from '@material-ui/core/Popper';
import RootRef from '@material-ui/core/RootRef';
import Fade from '@material-ui/core/Fade';

import useOnClickAway from 'components/useOnClickAway';
import useOnScroll from 'components/useOnScroll';
import styles from './styles';

function NxgSelect(inputProps) {
  const {
    id,
    renderField,
    PopperProps: inputPopperProps,
    onChange,
    closeMenuOnSelect,
    closeMenuOnClickAway,
    closeMenuOnScroll,
    children,
    defaultValue,
    className: inputClassName,
    classes,
    anchorReference,
    open: inputOpen,
    ...other
  } = inputProps;

  const className = classNames(
    classes.root,
    inputClassName,
  );

  // Hooks
  const anchorRef = useRef(null);
  const menuRef = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(inputOpen);

  // events

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const onSelect = (event, value) => {
    setValue(value);
    onChange({ event, value });

    if (closeMenuOnSelect) {
      closeMenu();
    }
  }

  // listeners
  useOnClickAway(anchorRef, () => {
    if (closeMenuOnClickAway) {
      closeMenu();
    }
  }, [menuRef]);

  useOnScroll(() => {
    if (closeMenuOnScroll) {
      closeMenu();
    }
  })

  /**
   * Component Props
   */
  // TODO: add className for default
  const fieldProps = {
    value,
    setIsOpen,
    isOpen,
    toggleMenu,
    anchorRef,
    className: classes.field,
  };

  const PopperProps = {
    id,
    ...inputPopperProps,
    anchorEl: anchorRef.current,
    open: isOpen,
    transition: true,
    style: {zIndex: 1}
  };

  const menuProps = {
    onSelect,
    anchorRef,
    menuClassName: classes.menu,
    optionClassName: classes.option,
  };

  const containerProps = {
    ...other,
    className,
    ref: anchorRef
  };

  let field = renderField(fieldProps);

  if (anchorReference === 'field') {
    field = (
      <RootRef rootRef={anchorRef}>
        {field}
      </RootRef>
    );
    delete containerProps.ref;
  }

  return (
    <div {...containerProps}>
      {field}
      <Popper {...PopperProps}>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <RootRef rootRef={menuRef}>
                {children(menuProps)}
              </RootRef>
            </Fade>
          )}
      </Popper>
    </div>
  )
};

NxgSelect.defaultProps = {
  PopperProps: {},
  closeMenuOnSelect: true,
  closeMenuOnClickAway: true,
  closeMenuOnScroll: false,
  anchorReference: 'field',
  onChange: (() => ({})),
  shouldUpdate: false,
}

NxgSelect.propTypes = {
  id: PropTypes.string.isRequired,
  anchorReference: PropTypes.oneOf(['field', 'container']),
  /**
   * Field to display.
   */
  renderField: PropTypes.oneOf([
    PropTypes.element,
    PropTypes.func
  ]).isRequired,
  /**
   * Properties applied to the `Popper` element.
   * Material UI popper props
   */
  PopperProps: PropTypes.shape({}),
    /**
   * The default value of the `Input` element.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
   * The value of the `Input` element, required for a controlled component.
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  ]),
  /**
   * Array of options that populate the select menu
   */
  options: PropTypes.arrayOf(
    PropTypes.oneOf([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        text: PropTypes.string
      }),
    ]).isRequired
  ),
  /**
   * Array of React Element Option that populate the select menu
   */
  children:  PropTypes.func.isRequired,
  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `value`.
   */
  onChange: PropTypes.func,

  onMenuClickAway: PropTypes.func,

  closeMenuOnSelect: PropTypes.bool,

  closeMenuOnClickAway: PropTypes.bool,

  closeMenuOnScroll: PropTypes.bool,

    /**
   * opens the popup
   *
   */
  open: PropTypes.bool,


};

export default withStyles(styles)(NxgSelect);
