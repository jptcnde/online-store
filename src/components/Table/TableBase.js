import React, { useEffect }  from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './styles';

import {
  useTable,
  useColumns,
  useRows,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
  useFlexLayout,
} from './TableHooks';

import TableContext from './TableContext';

function TableBase(props) {
  const { Provider } = TableContext;

  const { classes } = useStyles(styles);
  const {
    children,
    onSort,
    onPageChange,
    onRowClick,
    plugins: userPlugins,
    ...otherProps
  } = props;

  const plugins = [
    useColumns,
    useRows,
    useGroupBy,
    useFilters,
    useSortBy,
    usePagination,
    useFlexLayout,
    useExpanded,
    ...userPlugins,
  ]

  const instance = useTable(
    otherProps,
    ...plugins,
  );

  const {
    state: [{ pageIndex, pageSize, sortBy }],
  } = instance;

  useEffect(() => {
    onSort(sortBy);
  }, [sortBy]);

  useEffect(() => {
    onPageChange({ sortBy, pageIndex, pageSize, });
  }, [pageIndex, pageSize]);

  const providerValue = {
    ...otherProps,
    ...instance,
    onRowClick,
    classes,
  }

  return (
    <Provider value={providerValue}>
      {typeof children === 'function' ? children(providerValue) : children}
    </Provider>
  )
}

TableBase.Context = TableContext;


TableBase.defaultProps = {
  onSort: () => {},
  onPageChange: () => {},
  totalRecords: 0,
  plugins: [],
}

TableBase.propTypes = {
  orderByFn: PropTypes.func,
  sortByFn: PropTypes.func,
  onSort: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowClick: PropTypes.func,
  manualSorting: PropTypes.bool,
  manualPagination: PropTypes.bool,
  disableMultiSort: PropTypes.bool,
  disableSorting: PropTypes.bool,
  defaultSortDesc: PropTypes.string,
  className: PropTypes.string,
  // only work on pagination
  totalRecords: PropTypes.number,

  children: PropTypes.oneOf([PropTypes.element, PropTypes.func]),
  // hooks
  plugins: PropTypes.arrayOf(PropTypes.func),
}
/**
 * ``` jsx
 * columns : {
 *  sorted: false,
 *  sortDesc: '',
 *  canSortBy: bool,
 *  sortIndex:
 *  id,
 *  Cell: [func],
 *  Header: [func, string]
 * }
 * ```
 */



export default TableBase;
