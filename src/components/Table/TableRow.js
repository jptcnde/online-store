import React  from 'react';
import TblRow from '@material-ui/core/TableRow';

function TableRow(props) {
  const { children, ...otherProps } = props;
  return (
    <TblRow
      {...otherProps}>
      {children}
    </TblRow>
  );
}

export default TableRow;
