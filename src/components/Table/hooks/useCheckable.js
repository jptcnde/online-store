import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import useSelectable from './useSelectable';
import { useExpanded } from './useExpanded';

export default function useCheckable(props) {
  const {
    columns: inputColumns,
    checkedItems: inputSelected = [],
    onCheckChange,
    showAllCheckedItems,
    ...other
  } = props;

  const { gotoPage  } = props;

  const { selected, select, selectMany } = useSelectable({ selected: inputSelected, onSelect: onCheckChange });

  const allSelected = (data) => data.every(x => selected.includes(x));

  useEffect(() => {
    if (showAllCheckedItems) {
      gotoPage(0);
    }
  }, [showAllCheckedItems])

  function toggleSelectAll(data) {
    if (allSelected(data)) {
      selectMany([]);
      return;
    }
    selectMany(data);
  }

  const columns = [
    {
      id: 'check-action',
      // eslint-disable-next-line react/display-name
      Header: (cell) => {
        return (
          <Checkbox
            checked={allSelected(cell.page.map(row => row.original))}
            onClick={() => toggleSelectAll(cell.page.map(row => row.original))}
            value=""
          />
        )
      },
      // eslint-disable-next-line react/display-name
      Cell: (cell) => {
        return (
          <Checkbox
            checked={selected.includes(cell.row.original)}
            onClick={() => select(cell.row.original)}
            value=""
          />
        )
      },
      canSortBy: false,
      show: true,
    },
    ...inputColumns,
  ];

  return useExpanded({
    ...other,
    columns,
  })
}
