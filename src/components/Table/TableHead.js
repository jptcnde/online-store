import React, { useContext } from 'react';
import TblHead from '@material-ui/core/TableHead';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import classNames from 'classnames';
import TableRow from '@material-ui/core/TableRow';

import Context from './TableContext';

function TableHead(props) {
  const tblInstance = useContext(Context);
  const { columns, classes } = tblInstance;

  const { className: userClassName } = props;

  const className = classNames(userClassName);
  return (
    <TblHead {...props} className={className}>
      <TableRow>
        {columns
          .filter(column => column.show)
          .map((column, idx) => {
            const { onClick: onToggleSort } = column.getSortByToggleProps();
            const isSortActive = (column.sorted && column.sorted.id) === column.id;
            return (
              <TableCell key={idx}>
                <TableSortLabel
                  active={isSortActive}
                  direction={column.sortedDesc ? 'desc' : 'asc'}
                  onClick={!!column.canSortBy && onToggleSort}
                  className={classes.sortLabel}
                  classes={{
                    icon: classNames(classes.sortIcon, column.sortIconClassName),
                  }}
                >
                  {column.render('Header')}
                  {!isSortActive && column.canSortBy ? (
                    <span className={classes.sortLabelUnfoldArrowPanel}>
                      <UnfoldMore className={classes.sortLabelUnfoldArrow} />
                    </span>
                  ) : null}

                  {column.canFilter && column.render('Filter')}
                </TableSortLabel>
              </TableCell>
            );
          })}
      </TableRow>
    </TblHead>
  );
}

export default TableHead;
