import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import * as serviceWorker from './components/serviceWorker'

const Wrapper = () => {
  return <App />
}

serviceWorker.register()

ReactDOM.render(<Wrapper />, document.getElementById('root'))
