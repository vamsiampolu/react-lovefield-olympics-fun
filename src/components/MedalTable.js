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
  console.log(rows)
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
    console.log(nextProps.formData === this.props.formData)
    this.makeQuery(nextProps, true)
  }

  makeQuery ({ perPage, formData }, needsTotal) {
    const offset = this.state.offset
    let it
    if (needsTotal) {
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
    const offset = Math.ceil((data.selected - 1) * perPage)
    this.setState({ offset }, () => {
      const formData = this.props.formData
      this.makeQuery({ perPage, formData })
    })
  }

  render () {
    const { data, total } = this.state
    if (data && data.length > 0) {
      console.log(this.state.total)
      let columns = Object.keys(data[0])
      columns = columns.filter(item => {
        return !(['eventGender', 'gender'].includes(item))
      })
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
              pageClassName='item cursor'
              previousClassName='item cursor'
              nextClassName='item cursor'
              breakClassName='break item cursor'
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
