import './index.css'

import React from 'react'
import {render} from 'react-dom'
import co from 'co'
import { dbPromise, insertMedals, selectAll } from './data/index'
import App from './App'
import medals from './data/olympic_medalists'

function * initialGenerator () {
  try {
    const db = yield dbPromise
    const rows = yield selectAll(db)
    const exists = rows.length > 0

    if (!exists) {
      const promise = yield insertMedals(medals, db)
      console.log(promise)
    }
  } catch (ex) {
    console.log('Initial insertion data')
    console.error(ex)
  }
  render(<App />, document.querySelector('#app'))
}

co(initialGenerator)
