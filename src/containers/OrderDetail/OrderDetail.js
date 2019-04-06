import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MuiTypography from '@material-ui/core/Typography';
import MuiGrid from '@material-ui/core/Grid';
import MuiDivider from '@material-ui/core/Divider';
import styled from 'components/styled';
import Table from 'components/Table';
import Box from 'components/Box';
// eslint-disable-next-line import/no-extraneous-dependencies
import { sizing, compose as composeStyles, spacing, palette, style, display } from '@material-ui/system';
import composeAll from '1-liners/composeAll';
import { connect } from 'react-redux';
import Filters from './Filters';
import { select } from '../../store';

import { getFilteredData } from './selectors';

const textTransform = style({ prop: 'textTransform', cssPropery: 'text-transform'});

const Typography = styled(MuiTypography)(composeStyles(sizing, spacing, palette, textTransform, display));
const Grid = styled(MuiGrid)(composeStyles(sizing, spacing, palette));
const Divider = styled(MuiDivider)(spacing);

const columns = [
  {
    Header: 'Branding',
    id: 'branding',
    accessor: data => data,
    Cell: (cell) => (
      <Grid container>
          <Typography variant="caption" color="colors.deepPurple">
            {cell.value.product.brand}
          </Typography>
        <Grid item xs={12}>

        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" color="colors.deepPurple">
            {cell.value.product.season}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" color="colors.deepPurple">
            {cell.value.product.type}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <Typography variant="body2" color="colors.green">
            {'Available at  '}
            <b>{cell.value.location.join(', ')}</b>
          </Typography>
        </Grid>
      </Grid>
    )
  },
  {
    Header: 'Parts',
    id: 'parts',
    accessor: data => data,
    Cell: (cell) => (
      <Grid container direction="column">
        <Grid item>
          <Typography variant="caption" color="colors.orange" >
            {`${cell.value.product.city} - ${cell.value.product.range} - ${cell.value.size}`}
          </Typography>
        </Grid>

        <Grid item mt={4} >
          <Typography variant="body2" color="colors.green" textTransform="capitalize" >
            {cell.value.status}
          </Typography>
        </Grid>
      </Grid>
    )
  }
];

function OrderDetail(props) {
  const {
    orderDetails, selectItem,
    history,
  } = props;

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setData(orderDetails);
  }, [orderDetails]);

  useEffect(() => {
    setData(getFilteredData(orderDetails, filters));
  }, [filters]);

  function handleFilterChange({ name, value }) {
    setFilters(old => ({
      ...old,
      [name]: value
    }));
  }

  function handleRowClick({ original: dataItem }) {
    selectItem(dataItem);
    history.push('/product-detail');
  }

  const tableProps = {
    data,
    columns,
    onRowClick: handleRowClick
  };

  return (
    <Grid bgcolor="colors.white" p={2} mt={2}>
      <Divider mt={2} />
      <Box mt={2}>
        <Filters
          onChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
        />
      </Box>
      <Divider mt={2} />

      <Box mt={2} p={3} bgcolor="colors.cloudWhite">
        <Box bgcolor="colors.white" pb={1}>
          <Table {...tableProps} />
        </Box>

      </Box>

    </Grid>

  );
}

OrderDetail.propTypes = {
  orderDetails: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectItem: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapState = (state) => ({
  orderDetails: select.orderDetail.getOrderDetails(state)
});

const mapDispatch = ({ orderDetail: { selectItem }}) => ({
  selectItem
});

export default composeAll([
  connect(mapState, mapDispatch),
  memo
])(OrderDetail);