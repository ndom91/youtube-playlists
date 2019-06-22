import React from 'react'
import ReactDOM from 'react-dom'
import Granim from 'react-granim'
import './index.css'
import Header from './components/header/header'
import Droptarget from './components/droptarget/droptarget'
import Playlist from './components/playlist/playlist'
import * as serviceWorker from './serviceWorker'

const granimColor = ({"default-state": {gradients: [['#FE802D', '#D04ED6'],['#D04ED6', '#FF9C3F']], transitionSpeed: 5000, loop: true}});

class Mainwrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videoList: [],
      listCount: 0
    }
  }

  playlistFn = (dataFromChild) => {
    // console.log('dataFromChild: ', dataFromChild)
    this.setState({
      videoList: dataFromChild
    })
  }

  render() {
    return <div draggable="false" className="container">
      <Header />
      <div className="item sidebar"></div>
      <Droptarget callbackFromParent={this.playlistFn} />
      <div className="item content-2"></div>
      <div className="item content-3"></div>
      <div id="playlist" className="item footer playlist" >
        <Playlist videoListP={this.state.videoList} />
      </div>      
      <Granim className="granim" states={granimColor} />
    </div>
  }
}

ReactDOM.render(
  <Mainwrapper />, 
  document.getElementById('root')
)

serviceWorker.unregister()
