import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from './TableRow';


import Context from './TableContext';


function TblBody({ children, ...props }) {
  const tblInstance = useContext(Context);

  const { page, prepareRow, onRowClick, classes } = tblInstance;

  function render(row, idx) {
    const rowProps = {
      className: classNames(classes.tblRow, onRowClick && classes.selectableRow)
    };

    if (onRowClick) {
      rowProps.onClick = () => onRowClick(row);
    }

    return (
      <TableRow {...rowProps} key={idx}>
        {row.cells.map((cell, cellIndex) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={cellIndex}>
              {cell.render('Cell')}
            </TableCell>
          )
        })}
      </TableRow>
    );
  }

  if (!page.length) { return null; }

  const tblRows = page.map(row => prepareRow(row));

  if (!children) {
    return (
      <TableBody {...props}>
        {page.map(render)}
      </TableBody>
    )
  }

  return typeof children === 'function'
    ? <TableBody {...props}>{children({ tblRows, ...tblInstance })}</TableBody>
    : <TableBody {...props}>{children}</TableBody>
}

TblBody.displayName = 'TableBody';

TblBody.defaultProps = {
  onRowClick: null,
}

TblBody.propTypes = {
  onRowClick: PropTypes.func,
  children: PropTypes.oneOf([PropTypes.element, PropTypes.func])
}

export default TblBody;
