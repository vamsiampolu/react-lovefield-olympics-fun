import React from 'react'
import { Table } from 'semantic-ui-react'
import Paginate from 'react-paginate'
import co from 'co'
import uuid from 'node-uuid'
import { dbPromise, selectWithConditionsAndLimit, getRowCount } from '../data'

function * query (perPage, offset, formData, needsTotal) {
  const db = yield dbPromise
  const rows = yield selectWithConditionsAndLimit(db, perPage, offset, formData)
  let total
  if (needsTotal) {
    total = yield getRowCount(db, formData)
  }
  return { total, rows }
}

export default class MedalTable extends React.Component {
  constructor (props) {
    super(props)
    this.onPageChange = this.onPageChange.bind(this)
    this.makeQuery = this.makeQuery.bind(this)
    this.state = {
      offset: 0,
      data: null,
      total: null
    }
  }

  makeQuery () {
    const perPage = this.props.perPage
    const offset = this.state.offset
    const formData = this.props.formData
    const total = this.state.total
    let it // go
    if (total == null) {
      it = query(perPage, offset, formData, true)
    } else {
      it = query(perPage, offset, formData)
    }

    const { rows: data, total: _total } = co(it)
    if (total != null) {
      this.setState({ data, total: _total })
    } else {
      this.setState({ data })
    }
  }

  onPageChange (data) {
    console.log(data)
    const perPage = this.props.perPage
    const offset = Math.ceil(data.selected * perPage)
    this.setState({ offset }, () => {
      this.makeQuery()
    })
  }

  render () {
    const { data, total } = this.state
    const columns = Object.keys(data[0])
    const headerCells = columns.map(header => <Table.HeaderCell key={uuid.v4()}>{header}</Table.HeaderCell>)

    const header = (<Table.Header>
      <Table.Row>{headerCells}</Table.Row>
    </Table.Header>)

    const bodyRows = data.map(row => {
      const rowCells = columns.map(column => {
        const value = row[column]
        return (<Table.Cell key={uuid.v4()}>{value}</Table.Cell>)
      })

      return (<Table.Row key={uuid.v4()}>{rowCells}</Table.Row>)
    })

    const body = (<Table.Body>{bodyRows}</Table.Body>)

    const footer = (<Paginate
      pageCount={total}
      pageRangeDisplay={5}
      marginPagesDisplayed={5}
      onPageChange={this.onPageChange}
    />)

    return (<Table>
      {header}
      {body}
      {footer}
    </Table>)
  }
}
