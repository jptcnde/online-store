import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRounded from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRounded from '@material-ui/icons/ArrowForwardIosRounded';
import Grid from '@material-ui/core/Grid';
import Context from './TableContext';

function Pagination(props) {
  const tblInstance = useContext(Context);
  const {
    canPreviousPage,
    previousPage,
    nextPage,
    canNextPage,
    classes,
    state: [{ pageIndex, pageSize }],
    manualPagination,
    totalRecords: userTotalRecords,
    rows,
  } = tblInstance;

  const { className: userClassName, ...otherProps } = props;

  const className = classNames(classes.paginationPanel, userClassName);

  const totalRecords = manualPagination ? userTotalRecords : rows.length;

  const startIndex = (pageIndex * pageSize) + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalRecords) ;

  if (!rows.length) { return <center><br /><Typography variant="body1" inline>Not available</Typography></center>; }

  return (
    <Grid container  xs={12} justify="center" alignItems="center" {...otherProps} className={className} >
      <Grid item>
        <Zoom in={canPreviousPage}>
          <IconButton  onClick={() => previousPage()} className={classes.paginationAction}>
            <ArrowBackIosRounded  />
          </IconButton>
        </Zoom>
      </Grid>
      <Grid item>
        <Typography  variant="body1">
          {`Showing ${startIndex} - ${endIndex} out of ${totalRecords}`}
        </Typography>
      </Grid>
      <Grid item>
        <Zoom in={canNextPage}>
          <IconButton  onClick={() => nextPage()} className={classes.paginationAction}>
            <ArrowForwardIosRounded  />
          </IconButton>
        </Zoom>
      </Grid>
    </Grid>
  )
}

Pagination.propTypes = {
  canPreviousPage: PropTypes.bool.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  totalRecords: PropTypes.number.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  canNextPage: PropTypes.bool.isRequired,
  className: PropTypes.string,
}



export default Pagination;
