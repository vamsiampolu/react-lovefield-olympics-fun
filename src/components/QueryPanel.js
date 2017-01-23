import React from 'react'
import Form from 'react-jsonschema-form'
import { Button } from 'semantic-ui-react'
import { schema, widgets, fields, FieldTemplate } from '../schema'

export default class QueryPanel extends React.Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (formData) {
    console.log(formData)
  }

  render () {
    const formData = {}
    return (<Form
      className='ui form'
      schema={schema}
      fields={fields}
      formData={formData}
      FieldTemplate={FieldTemplate}
      widgets={widgets}
      onSubmit={this.onSubmit}
    >
      <div>
        <Button primary type='submit'>Submit</Button>
      </div>
    </Form>)
  }
}

