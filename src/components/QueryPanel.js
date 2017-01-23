import React from 'react'
import Form from 'react-jsonschema-form'
import { Button } from 'semantic-ui-react'
import { schema, widgets, fields, FieldTemplate, validate } from '../schema'
import co from 'co'
import { dbPromise, selectAll } from '../data/index'

function * showAllMedals () {
  try {
    const db = yield dbPromise
    const medals = yield selectAll(db)
    const message = `${medals.length} Medals were found`
    return { medals, message }
  } catch (error) {
    console.error(error)
  }
}

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

  onSubmit (formData) {
    console.log(formData)
    if (formData.status === 'initial') {
      co(showAllMedals)
        .then(data => {
          console.log(data)
          this.setState(data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  onChange (formData) {
    console.log(formData)
  }

  render () {
    return (<Form
      className='ui form'
      schema={schema}
      fields={fields}
      validate={validate}
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

