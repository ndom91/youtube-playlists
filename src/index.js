import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Store from './components/store'

import * as serviceWorker from './components/serviceWorker'

const Wrapper = () => {
  return (
    <Store.Container>
      <App />
    </Store.Container>
  )
}

serviceWorker.register()

ReactDOM.render(<Wrapper />, document.getElementById('root'))
