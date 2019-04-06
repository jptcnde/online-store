export default  (theme) => ({
  tblRow: {
    height: 84,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.07)',
    }
  },
  sortIcon: {
    transition: 'none'
  },
  sortLabel: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'flex-start',
    fontSize: 18
  },
  sortLabelUnfoldArrowPanel: {
    display: 'inline-block',
    position: 'relative',
    top: 1,
    left: 3,
  },
  sortLabelUnfoldArrow: {
    fontSize: 18,
  },
  paginationPanel: {
    marginTop: 20,
  },
  paginationAction: {
    margin: '0 10px',
    padding: 8,
    '& svg': {
      fontSize: 18
    }
  },
  selectableRow: {
    cursor: 'pointer'
  }
})
