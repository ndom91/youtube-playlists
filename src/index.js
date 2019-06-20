import React from 'react'
import ReactDOM from 'react-dom'
import Granim from 'react-granim'
import './index.css'
import Header from './components/header/header'
import * as serviceWorker from './serviceWorker'

const granimColor = ({"default-state": {gradients: [['#FE802D', '#D04ED6'],['#D04ED6', '#FF9C3F']], transitionSpeed: 5000, loop: true}});


ReactDOM.render(
  <div className="container">
    <Header className="header" />
    <div className="sidebar"></div>
    <div className="content-1"></div>
    <div className="content-2"></div>
    <div className="content-3"></div>
    <div className="footer"></div>
    <Granim className="granim" states={granimColor} />
  </div>, 
  document.getElementById('root')
)

serviceWorker.unregister()
