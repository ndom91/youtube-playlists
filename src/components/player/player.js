import React from 'react' 
import './player.css'

// http://react-dnd.github.io/react-dnd/docs/api/drop-target

class Player extends React.Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //   }
  // }

  render() { 
    return <div 
          id="dropTarget" 
          className="item droptarget"
          >
          </div>
    
  }
}

export default Player