import React, { Fragment } from 'react';
import classNames from 'classnames';

import Tbl from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';

import TableBase from './TableBase';
import TableHead from './TableHead';
import TableRow from './TableRow';
import Pagination from './Pagination';
import TableBody from './TableBody';

function Table(props) {
  const {
    children,
    className,
    component,
    ...otherProps
  } = props;

  if (children) {
    return (
      <TableBase {...props}>
        {({ classes }) => (
          <div
            component={component}
            className={classNames(classes.root, className)}
          >
            {children}
          </div>
        )}
      </TableBase>
    )
  }

  return (
    <TableBase {...otherProps}>
      {({ classes }) => (
        <Fragment>
          <Tbl
            component={component}
            className={classNames(classes.root, className)}>
            <TableHead />
            <TableBody />
          </Tbl>
          <Pagination />
        </Fragment>
      )}
    </TableBase>
  )
}

Table.Container = Tbl;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Pagination = Pagination;
Table.Row = TableRow;
Table.Cell = TableCell;


export default Table;
