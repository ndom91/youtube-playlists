import React from 'react'
import ReactDOM from 'react-dom'
import Granim from 'react-granim'
import './index.css'
import Header from './components/header/header'
import Droptarget from './components/droptarget/droptarget'
import Playlist from './components/playlist/playlist'
import Sidebar from './components/sidebar/sidebar'
import Player from './components/player/player'
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
    this.setState({
      videoList: dataFromChild
    })
  }

  makeVisible = e => {
    const el = document.getElementById('dropTarget')
    el.style.visibility = 'visible'
  }

  render() {
    return (
      <div onDragOver={this.makeVisible} className="container">
      <Droptarget  callbackFromParent={this.playlistFn} />
        <Header />
        <Sidebar videos={this.state.videoList} />
        <Player />
        <div id="playlist" className="item footer playlist" >
          <Playlist videoListP={this.state.videoList} />
        </div>      
        <Granim className="granim" states={granimColor} />
      </div>
    )
  }
}

ReactDOM.render(
  <Mainwrapper />, 
  document.getElementById('root')
)

serviceWorker.unregister()
