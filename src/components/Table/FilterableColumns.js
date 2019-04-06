/**
 * @author: Jopet
 * @file: Filterable Columns
*/
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import MuiGrid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { FormattedMessage } from 'react-intl';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiTypography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

import { compose as composeStyles, palette, spacing } from '@material-ui/system';
import styled from '../../../styles/styled';

import Box from '../Box';

const Grid = styled(MuiGrid)(composeStyles(spacing))
const Typography = styled(MuiTypography)(composeStyles(palette))

const styles = theme => ({
  button: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  checkboxLabel: {
    ...theme.typography.body2,
    textTransform: 'capitalize'
  }
})

function FilterableColumns(props) {
  const {
    onSubmit,
    onClose,
    columns: inputColumns = [],
    omittedColumns,
    anchorEl,
    classes,
    initialValues: userInitialValues = []
  } = props;

  const columns = useMemo(() =>
    inputColumns.filter(col => !omittedColumns.includes(col.id))
    .map(({
      filterable,
      id,
      Header,
    }) => ({
      filterable,
      id,
      Header: typeof Header === 'function' ? Header() : Header
    }))
  , [inputColumns])

  const initialValues = !userInitialValues.length
    ? columns.filter(col => col.filterable).map(col => col.id)
    : userInitialValues;

  const [filterableColumns, setFilterableColumns] = useState(
    columns.filter(col => col.filterable)
    .reduce((acc, col) => (acc[col.id] = initialValues.includes(col.id), acc), {})
  ) ;

  function handleCheck(e) {
    const { name } = e.currentTarget;
    setFilterableColumns({
      ...filterableColumns ,
      [name]: !filterableColumns[name]
    });
  }

  function clear() {
    setFilterableColumns(Object.keys(filterableColumns)
    .reduce((acc, col) => ((acc[col] = false, acc)), {...filterableColumns}));
  }

  function handleSubmit() {
    onSubmit({
      filterableColumns: Object.keys(filterableColumns).filter(key => !!filterableColumns[key]),
      nonFilterableColumns: [
        ...columns.filter(col => !col.filterable).map(col => col.id),
        ...omittedColumns
      ]
    });

  }

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box p={3} pb={1} maxWidth={292} width={257}>
        <Grid container >
          <Typography >
            <FormattedMessage id="you_can_choose_up_to_num_columns" values={{ intColumns: <b>{ 6}</b> }} />
          </Typography>
          {columns.map(({ id, Header}) => (
            <Grid container key={id}>
              <FormControlLabel
                classes={{
                  label: classes.checkboxLabel
                }}
                control={
                  <Checkbox
                    name={id}
                    disabled={columns.find(x => x.id === id && !x.filterable)}
                    checked={(id in filterableColumns) ? filterableColumns[id] :  true}
                    onChange={handleCheck}
                  />
                }
                label={Header}
              />
            </Grid>
          ))}
        </Grid>
        <Divider />
        <Grid container mt={1} justify="space-between">
          <Grid item md={4} onClick={clear}>
            <Button className={classes.button} onClick={onClose} >
              <Typography variant="body2" color="colors.buttonDarkBlue" >
                <FormattedMessage id="clear" />
              </Typography>
            </Button>
          </Grid>
          <Grid item md={4}>
            <Button  className={classes.button} onClick={onClose}>
              <Typography color="colors.buttonDarkBlue" variant="body2" >
                <FormattedMessage id="cancel" />
              </Typography>
            </Button>
          </Grid>
          <Grid item md={4}>
            <Button className={classes.button} onClick={handleSubmit}>
              <Typography variant="body2" color="colors.buttonDarkBlue" >
                <b><FormattedMessage id="submit" /></b>
              </Typography>
            </Button>
          </Grid>
        </Grid>

      </Box>
  </Popover>
  )
}

FilterableColumns.defaultProps ={
  omittedColumns: []
}

FilterableColumns.propTypes = {
  omittedColumns: PropTypes.arrayOf(PropTypes.string),
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    Header: PropTypes.oneOf([ PropTypes.string, PropTypes.func])})
  ),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired
}

export default withStyles(styles)(FilterableColumns);
