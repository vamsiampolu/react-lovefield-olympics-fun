import React from 'react'
import Form from 'react-jsonschema-form'
import { schema, uiSchema } from '../schema'

export default class QueryPanel extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (<Form
      schema={schema}
      uiSchema={uiSchema}
    />)
  }
}

