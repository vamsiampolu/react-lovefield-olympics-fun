import './index.css'

import React from 'react'
import {render} from 'react-dom'
import lf from 'lovefield'

import App from './App'
import columnDomains from './data/column_domains'

render(<App />, document.querySelector('#app'))
