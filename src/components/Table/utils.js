import React from 'react';

export { default as getBy } from 'lodash/get';
export { default as setBy } from 'lodash/set';


export function defaultOrderByFn(arr, funcs, dirs) {
  return [...arr].sort((rowA, rowB) => {
    for (let i = 0; i < funcs.length; i += 1) {
      const sortFn = funcs[i]
      const desc = dirs[i] === false || dirs[i] === 'desc'
      const sortInt = sortFn(rowA, rowB)
      if (sortInt !== 0) {
        return desc ? -sortInt : sortInt
      }
    }
    return dirs[0] ? rowA.index - rowB.index : rowB.index - rowA.index
  })
}

export function defaultSortByFn(a, b) {
  // force null and undefined to the bottom
  a = a === null || a === undefined ? '' : a
  b = b === null || b === undefined ? '' : b
  // force any string values to lowercase
  a = typeof a === 'string' ? a.toLowerCase() : a
  b = typeof b === 'string' ? b.toLowerCase() : b
  // Return either 1 or -1 to indicate a sort priority
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  // returning 0, undefined or any falsey value will defer to the next
  // sorting mechanism or eventually the columns index via the orderByFn
  return 0
}

export function getFirstDefined(...args) {
  return args.find(arg => typeof arg !== 'undefined');
}

export function defaultGroupByFn(rows, grouper) {
  return rows.reduce((prev, row, i) => {
    const resKey =
      typeof grouper === 'function'
        ? grouper(row.values, i)
        : row.values[grouper]
    prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : []
    prev[resKey].push(row)
    return prev
  }, {})
}

export function defaultFilterFn(row, id, value, column) {
  return row.values[id] !== undefined
    ? String(row.values[id])
      .toLowerCase()
      .includes(String(value).toLowerCase())
    : true
}

export function flexRender(Comp, props) {
  if (typeof Comp !== 'function') {
    return Comp;
  }
  return Object.getPrototypeOf(Comp).isReactComponent
    ? <Comp {...props} />
    : Comp(props)
}

export const mergeProps = (...groups) => {
  let props = {}
  groups.forEach(({ className, ...rest } = {}) => {
    props = {
      ...props,
      ...rest,
      className: [props.className, className].filter(Boolean).join(' ')
    }
  })
  return props
}

export const applyHooks = (hooks, initial, ...args) =>
  hooks.reduce((prev, next) => next(prev, ...args), initial)

export const applyPropHooks = (hooks, ...args) =>
  hooks.reduce((prev, next) => mergeProps(prev, next(...args)), {})

export function sum(arr) {
  return arr.reduce((prev, curr) => prev + curr, 0)
}
