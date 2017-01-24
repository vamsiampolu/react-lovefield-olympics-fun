import React from 'react'
import '../node_modules/semantic-ui-css/semantic.css'
import { Container, Grid } from 'semantic-ui-react'
import QueryPanel from './components/QueryPanel'
import MedalTable from './components/MedalTable'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      formData: {}
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (formData) {
    this.setState({ formData })

  }

  render () {
    const { formData } = this.state
    return (<Container fluid>
      <Grid celled divided>
        <Grid.Row>
          <Grid.Column width={3}>
            <QueryPanel onSubmit={this.onSubmit} />
          </Grid.Column>
          <Grid.Column width={13}>
            <MedalTable perPage={10} formData={formData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>)
  }
}
