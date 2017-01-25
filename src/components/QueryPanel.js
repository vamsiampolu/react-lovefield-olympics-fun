import React from 'react'
import Form from 'react-jsonschema-form'
import { Button } from 'semantic-ui-react'
import { widgets, fields, FieldTemplate, validate } from '../schema'

export default class QueryPanel extends React.Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      medals: [],
      msg: 'No results found'
    }
  }

  onSubmit ({ status, formData }) {
    if (status === 'initial') {
      this.props.onSubmit({})
    } else {
      const _formData = Object.assign({}, formData)
      this.props.onSubmit(_formData)
    }
  }

  onChange ({ formData }) {
    console.log(formData)
    this.props.onChange(formData)
  }

  render () {
    return (<Form
      className='ui form'
      schema={this.props.schema}
      fields={fields}
      validate={validate}
      formData={this.props.formData}
      FieldTemplate={FieldTemplate}
      onChange={this.onChange}
      widgets={widgets}
      onSubmit={this.onSubmit}
    >
      <div>
        <Button primary type='submit'>Submit</Button>
      </div>
    </Form>)
  }
}

