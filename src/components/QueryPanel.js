import React from 'react'
import Form from 'react-jsonschema-form'
import { schema, widgets } from '../schema'

export default class QueryPanel extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (<Form
      schema={schema}
      widgets={widgets}
    />)
  }
}

