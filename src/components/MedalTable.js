import React from 'react'
import { Table } from 'semantic-ui-react'
import Paginate from 'react-paginate'
import co from 'co'

export default class MedalTable extends React.Component {
  constructor (props) {
    super(props)
    this.onPageChange = this.onPageChange.bind(this)
    this.queryDatabase = this.queryDatabase.bind(this)
    this.state = {
      offset: 0,
      data: null
    }
  }

  onPageChange (data) {
    console.log(data)
    const perPage = this.props.perPage
    const offset = Math.ceil(data.selected * perPage)
    this.setState({ offset }, () => {
      console.log(' This is where I will query the lovefield database')
    })
  }

  queryDatabase (formData) {
    console.log('Use this.props.formData for the where condition within the query')
  }

  render () {
  }
}
