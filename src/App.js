import React from 'react'
import '../node_modules/semantic-ui-css/semantic.css'
import { Container, Grid } from 'semantic-ui-react'
import co from 'co'
import deepDiff from 'deep-diff'
import omit from 'object.omit'
import compose from 'ramda/src/compose'
import reduce from 'ramda/src/reduce'
import flatten from 'ramda/src/flatten'
import map from 'ramda/src/map'
import QueryPanel from './components/QueryPanel'
import MedalTable from './components/MedalTable'
import { schema } from './schema'
import { dbPromise, formPanelQuery } from './data/index'

function * formQuery (column, formData) {
  try {
    const db = yield dbPromise
    const formDataArr = yield formPanelQuery(db, column, formData)
    const removableColumns = [ 'color', 'gender', column ]
    const createEmptyProperty = property => ({
      [property]: {
        ...schema.properties[property],
        enum: [ undefined ]
      }
    })
    const emptyPropertiesArr = compose(map(createEmptyProperty), Object.keys)(schema.properties)
    let emptyProperties = Object.assign({}, ...emptyPropertiesArr)
    emptyProperties = omit(emptyProperties, removableColumns)
    console.log(emptyProperties)
    const reduceProperty = (state, item) => {
      const propertyName = Object.keys(item)[0]
      const propertyValue = item[propertyName]
      if (propertyName === 'year') {
        if (column !== 'fromYear') {
          state['fromYear'].enum = [ ...state['fromYear'].enum, propertyValue ]
        }

        if (column !== 'toYear') {
          state['toYear'].enum = [ ...state['toYear'].enum, propertyValue ]
        }
      } else {
        state[propertyName].enum = [ ...state[propertyName].enum, propertyValue ]
      }

      return state
    }
    const reduceFlattened = compose(reduce(reduceProperty, emptyProperties), flatten)
    const flattenedData = reduceFlattened(formDataArr)
    return flattenedData
  } catch (err) {
    console.error(err)
  }
}

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      formData: {
        fromYear: undefined,
        toYear: undefined,
        hostingCity: [],
        discipline: undefined,
        event: undefined,
        color: undefined,
        gender: undefined
      },
      schema: schema
    }
  }

  onSubmit (formData) {
    this.setState({ formData })
  }

  onChange (formData) {
    console.log(deepDiff(this.state.formData, formData))
    const [ diff ] = deepDiff(this.state.formData, formData)
    if (diff != null && diff.path != null && diff.path[0] != null) {
      const column = diff.path[0]
      co(formQuery(column, formData))
        .then(data => {
          const properties = Object.assign({}, schema.properties, data)
          const newSchema = Object.assign({}, schema, { properties })
          debugger
          this.setState({ schema: newSchema, formData })
        })
        .catch(err => {
          console.log(' An error occured when making a query for the form panel')
          console.error(err)
        })
    }
  }

  render () {
    const { formData, schema } = this.state
    return (<Container fluid>
      <Grid celled divided>
        <Grid.Row>
          <Grid.Column width={3}>
            <QueryPanel schema={schema} formData={formData} onChange={this.onChange} onSubmit={this.onSubmit} />
          </Grid.Column>
          <Grid.Column width={13}>
            <MedalTable perPage={10} formData={formData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>)
  }
}
