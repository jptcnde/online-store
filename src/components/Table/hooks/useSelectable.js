
import { useState, useEffect } from 'react';

function useSelectable(props) {
  const {
    selected: initialSelected = [],
    onSelect,
    uniq = true
  } = props;

  const [selected, setSelected] = useState(initialSelected)

  useEffect(() => {onSelect(selected)}, [selected]);

  function set(items) {
    if (uniq) {
      setSelected([...new Set(items)])
      return;
    }
    setSelected(items);
  }

  function select(item) {
    const idx = selected.indexOf(item);
    if (idx === -1) {
      set([ ...selected, item ]);
      return;
    }

    set(selected.filter(x => x !== selected[idx]))

  }

  function selectMany(items) {
    set(items);
  }

  return {
    selected,
    select,
    selectMany
  }
}

export default useSelectable;

