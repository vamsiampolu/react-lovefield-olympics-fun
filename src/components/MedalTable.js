import React from 'react'
import { Table } from 'semantic-ui-react'
import Paginate from 'react-paginate'
import co from 'co'
import uuid from 'node-uuid'
import { dbPromise, selctWithConditionsAndLimit, getRowCount } from '../data/index'

function * query (perPage, offset, formData, needsTotal) {
  const db = yield dbPromise
  const rows = yield selctWithConditionsAndLimit(db, perPage, offset, formData)
  let total
  if (needsTotal) {
    [ total ] = yield getRowCount(db, formData)
    total = total['COUNT(*)']
  }
  debugger
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

  componentWillReceiveProps (nextProps) {
    this.makeQuery(nextProps)
  }

  makeQuery ({ perPage, formData }) {
    const offset = this.state.offset
    const total = this.state.total
    let it // go
    if (total == null) {
      it = query(perPage, offset, formData, true)
    } else {
      it = query(perPage, offset, formData)
    }

    co(it)
      .then(results => {
        const { rows: data, total: _total } = results
        if (_total != null) {
          const pageCount = Math.ceil(_total / perPage)
          this.setState({ data, pageCount: pageCount, total: _total })
        } else {
          this.setState({ data })
        }
      })
      .catch(error => {
        console.error(error)
      })
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
    if (data && data.length > 0) {
      console.log(this.state.total)
      const columns = Object.keys(data[0])
      const headerCells = columns.map(header => <Table.HeaderCell key={uuid.v4()}>{header.toUpperCase()}</Table.HeaderCell>)

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

      const footer = (<Table.Footer>
        <Table.Row>
          <Table.Cell colSpan='3'>
            <Paginate
              pageCount={total}
              pageRangeDisplay={5}
              marginPagesDisplayed={5}
              onPageChange={this.onPageChange}
              containerClassName='ui floated right  pagination menu'
              pageClassName='item'
              previousClassName='item'
              nextClassName='item'
              breakClassName='break item'
            />
          </Table.Cell>
        </Table.Row>
      </Table.Footer>)

      return (<Table celled singleLine collapsing>
        {header}
        {body}
        {footer}
      </Table>)
    }
    return null
  }
}
