import PropTypes from 'prop-types'
//
import { flexRender, applyHooks, applyPropHooks, mergeProps } from '../utils'

import { useTableState } from './useTableState'

const renderErr =
  'You must specify a render "type". This could be "Header", "Filter", or any other custom renderers you have set on your column.'

const propTypes = {
  // General
  data: PropTypes.array.isRequired,
  debug: PropTypes.bool
}

export const useTable = (props, ...plugins) => {
  // Validate props
  PropTypes.checkPropTypes(propTypes, props, 'property', 'useTable')

  // Destructure props
  let { data = [], state: userState, debug } = props

  debug = process.env.NODE_ENV === 'production' ? false : debug

  // Always provide a default state
  const defaultState = useTableState()

  // But use the users state if provided
  const state = userState || defaultState

  // These are hooks that plugins can use right before render
  const hooks = {
    beforeRender: [],
    columns: [],
    headers: [],
    headerGroups: [],
    rows: [],
    row: [],
    renderableRows: [],
    getTableProps: [],
    getRowProps: [],
    getHeaderRowProps: [],
    getHeaderProps: [],
    getCellProps: []
  }

  // The initial api
  let api = {
    ...props,
    data,
    state,
    hooks
  }

  // Loop through plugins to build the api out
  api = plugins.filter(Boolean).reduce((prev, next) => next(prev), api)

  // Run the beforeRender hook
  applyHooks(api.hooks.beforeRender, undefined, api);

  api.columns = applyHooks(api.hooks.columns, api.columns, api);

  api.headers = applyHooks(api.hooks.headers, api.headers, api);

  ;[...api.columns, ...api.headers].forEach(column => {
    // Give columns/headers rendering power
    column.render = (type, userProps = {}) => {
      if (!type) {
        throw new Error(renderErr)
      }
      return flexRender(column[type], {
        ...api,
        ...column,
        ...userProps
      })
    }

    // Give columns/headers getHeaderProps
    column.getHeaderProps = props =>
      mergeProps(
        {
          key: ['header', column.id].join('_')
        },
        applyPropHooks(api.hooks.getHeaderProps, column, api),
        props
      )
  })

  api.headerGroups = applyHooks(
    api.hooks.headerGroups,
    api.headerGroups,
    api
  ).filter((headerGroup, i) => {
    // Filter out any headers and headerGroups that don't have visible columns
    headerGroup.headers = headerGroup.headers.filter(header => {
      const recurse = columns =>
        columns.filter(column => {
          if (column.columns) {
            return recurse(column.columns)
          }
          return column.visible
        }).length
      if (header.columns) {
        return recurse(header.columns)
      }
      return header.visible
    })

    // Give headerGroups getRowProps
    if (headerGroup.headers.length) {
      headerGroup.getRowProps = (props = {}) =>
        mergeProps(
          {
            key: [`header${i}`].join('_')
          },
          applyPropHooks(api.hooks.getHeaderRowProps, headerGroup, api),
          props
        )
      return true
    }

    return false
  })

  // Run the rows (this could be a dangerous hook with a ton of data)
  api.rows = applyHooks(api.hooks.rows, api.rows, api)

  // This function is absolutely necessary and MUST be called on
  // any rows the user wishes to be displayed.
  api.prepareRow = row => {
    const { index } = row
    row.getRowProps = props =>
      mergeProps(
        { key: ['row', index].join('_') },
        applyHooks(api.hooks.getRowProps, row, api),
        props
      )

    row.cells = row.cells.filter(cell => cell.column.visible)

    row.cells.forEach(cell => {
      if (!cell) {
        return
      }

      const { column } = cell

      cell.getCellProps = props => {
        const columnPathStr = [index, column.id].join('_')
        return mergeProps(
          {
            key: ['cell', columnPathStr].join('_')
          },
          applyPropHooks(api.hooks.getCellProps, cell, api),
          props
        )
      }

      cell.render = (type, userProps = {}) => {
        if (!type) {
          throw new Error(
            'You must specify a render "type". This could be "Cell", "Header", "Filter", "Aggregated" or any other custom renderers you have set on your column.'
          )
        }
        return flexRender(column[type], {
          ...api,
          ...cell,
          ...userProps
        })
      }
    });

    return row;
  }

  api.getTableProps = userProps =>
    mergeProps(applyPropHooks(api.hooks.getTableProps, api), userProps)

  api.getRowProps = userProps =>
    mergeProps(applyPropHooks(api.hooks.getRowProps, api), userProps)

  return api
}
