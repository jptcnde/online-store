import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function FilterButtonMenu(props) {
  const {
    onChange,
    onClose,
    label,
    items,
    name,
  } = props;

  const [anchorEl, setAnchorEl]  = useState(null);

  function handleClose() {
    onClose();
    setAnchorEl(null);
  };

  function handleChange(item) {
    onChange(item);
    handleClose();
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => setAnchorEl(e.target)}
        >{label}</Button>
      <Menu
          id={name}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        {items.map(item => (
          <MenuItem onClick={() => handleChange({ ...item, name})}>{item.text}</MenuItem>
        ))}
        </Menu>
    </>
  );
}

FilterButtonMenu.defaultProps = {
  onClose: () => {}
};

FilterButtonMenu.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(FilterButtonMenu);