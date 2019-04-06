import React, { memo } from 'react';
import MuiGrid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import composeAll from '1-liners/composeAll';
import { connect } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { compose as composeStyles, palette, typography } from '@material-ui/system';
import styled from 'components/styled';
import { Sizes, ProductTypes, Seasons, Locations, OrderStatus, Range } from '../../constants';
import FilterButtonMenu from './FilterButtonMenu';
import FilterButtonSearchable from './FilterButtonSearchable';
import toTitleCase from '../../utils/toTitleCase';
import { select } from '../../store';

const Grid = styled(MuiGrid)(composeStyles(typography, palette));

function Filters(props) {
  const { products, onChange, filters, setFilters} = props;
  // const [filters, setFilters] = useState({});

  function handleChange(item) {
    onChange(item);
  }

  return (
    <Grid container>
      <Grid item xs={10} container spacing={16}>
        <Grid item>
          <FilterButtonSearchable
            name="brand"
            items={products.map(({ brand, id }) => ({ value: brand, text: brand, id }))}
            onChange={handleChange}
            label={filters.brand || 'Brand'}
          />
        </Grid>
        <Grid item>
          <FilterButtonMenu
            name="location"
            items={Locations.map(value => ({ value, text: value }))}
            onChange={handleChange}
            label={filters.location || 'Location'}
          />
        </Grid>

        <Grid item>
          <FilterButtonMenu
            name="range"
            items={Range.map(value => ({ value, text: value }))}
            onChange={handleChange}
            label={filters.range || 'Range'}
          />
        </Grid>

        <Grid item>
          <FilterButtonMenu
            name="size"
            items={Sizes.map(value => ({ value, text: value }))}
            onChange={handleChange}
            label={filters.size || 'Size'}
          />
        </Grid>

        <Grid item>
          <FilterButtonMenu
            name="status"
            items={OrderStatus.map(value => ({ value, text: toTitleCase(value) }))}
            onChange={handleChange}
            label={filters.status  ? toTitleCase(filters.status) : 'Status'}
          />
        </Grid>

        <Grid item>
          <FilterButtonMenu
            name="season"
            items={Seasons.map(value => ({ value, text: value }))}
            onChange={handleChange}
            label={filters.season || 'Season'}
          />
        </Grid>

        <Grid item>
          <FilterButtonMenu
            name="type"
            items={ProductTypes.map(value => ({ value, text: value }))}
            onChange={handleChange}
            label={filters.type || 'Type'}
          />
        </Grid>


      </Grid>

      <Grid item xs={2} textAlign="right">
        <Button color="primary"
          onClick={() => setFilters({})}
        >
          Clear Filters
        </Button>
      </Grid>
    </Grid>

  );
}

const mapState = (state) => ({
  products: select.orderDetail.getProducts(state),
});

Filters.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func.isRequired
};

export default composeAll([
  connect(mapState),
  memo
])(Filters);