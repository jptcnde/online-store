/**
 * @author: Jopet
 * @file: From Account
 * Contributors:

*/
import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
/**
 * Imported Components
 */
import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useDebounce from 'components/useDebounce';
import styled from 'components/styled';
import Select from 'components/Select';

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  spacing,
  compose as composeStyles,
  palette,
  sizing,
} from '@material-ui/system';

const Grid = styled(MuiGrid)(composeStyles(spacing, palette, sizing));
const Typography = styled(MuiTypography)(palette);



function FilterButtonSearchable(props) {
  const {
    items: inputItems,
    label,
    name,
    onChange,
  } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [value, setValue] = useState({});
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = ({ value: item }) => {
    setValue(item);
    onChange({ ...item, name });
  };

  const items = debouncedSearchTerm
  ? inputItems.filter(({ text }) => RegExp(`${searchTerm}`, 'ig').test(text))
  : inputItems;


  return (
    <Select
      // eslint-disable-next-line
      onClose={() => setSearchTerm('')}
      onChange={handleChange}
      defaultValue={value || {}}
      PopperProps={{ placement: 'bottom-start'}}
      renderField={({ toggleMenu }) =>
        <Button variant="outlined" onClick={() => {
          toggleMenu();
          setSearchTerm('');
        }}>{label}</Button>
      }
    >
      {({ onSelect, menuClassName, optionClassName }) => (
        <Paper>
          <Grid
            style={{ width:  350 }}
            container
            bgcolor="background.paper"
            className={menuClassName}
            alignContent="flex-start"
            pb={2}
          >
            <Grid container item xs={12} px={2.5} py={2}>
              <TextField
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                fullWidth
                placeholder="Search brand..."
                label="Brand" />
            </Grid>
            {items.map((item, idx) => (
              <Grid
                // eslint-disable-next-line react/no-array-index-key
                key={`${item.value}-${idx}`}
                container
                item
                xs={12} px={3} pt={2} mt={1}
                onClick={e => onSelect(e, item)}
                className={optionClassName}
                justify="space-between"
                alignItems="baseline"
              >
                <Typography variant="body1">
                  {item.text}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Select>
  );
}

FilterButtonSearchable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired,
};




export default memo(FilterButtonSearchable);
