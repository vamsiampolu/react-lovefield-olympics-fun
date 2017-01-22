import React from 'react'
import '../node_modules/semantic-ui-css/semantic.css'
import { Container, Grid } from 'semantic-ui-react'
import QueryPanel from './components/QueryPanel'

let App = React.createClass({
  render () {
    return (<Container fluid>
      <Grid celled divided>
        <Grid.Row>
          <Grid.Column width={3}>
            <QueryPanel />
          </Grid.Column>
          <Grid.Column width={13}>
            <h1>This will render the table once the query has been made</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>)
  }
})

export default App
