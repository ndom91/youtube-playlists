import React from 'react' 
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './droptarget.css'

// http://react-dnd.github.io/react-dnd/docs/api/drop-target

class Droptarget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      active: ''
    }
  }

  render() { 
    return <div className="item content-1 droptarget">
      {/* <DropTarget backend={HTML5Backend}></DropTarget> */}
    </div>
    
  }
}

export default DragDropContext(HTML5Backend)(Droptarget)