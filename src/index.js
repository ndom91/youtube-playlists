import React from 'react'
import ReactDOM from 'react-dom'
import Granim from 'react-granim'
import './index.css'
import Header from './components/header/header'
import Droptarget from './components/droptarget/droptarget'
import * as serviceWorker from './serviceWorker'

const granimColor = ({"default-state": {gradients: [['#FE802D', '#D04ED6'],['#D04ED6', '#FF9C3F']], transitionSpeed: 5000, loop: true}});


ReactDOM.render(
  <div className="container">
    <Header />
    <div className="item sidebar"></div>
    <Droptarget />
    <div className="item content-2"></div>
    <div className="item content-3"></div>
    <div className="item footer"></div>
    <Granim className="granim" states={granimColor} />
  </div>, 
  document.getElementById('root')
)

serviceWorker.unregister()
