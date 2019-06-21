import React from 'react' 
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './droptarget.css'

// http://react-dnd.github.io/react-dnd/docs/api/drop-target

class Droptarget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
      listCount: 1
    }

  }

  dragover_handler = (ev) => {
    ev.preventDefault();
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = "move"
  }

  drop_handler = (ev) => {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text/plain");
    // data = URL of dropped item
    console.log(data)
    // this.setState({ list.push})
    // ev.target.appendChild(document.getElementById(data));
  }

  render() { 
    return <div 
          id="dropTarget" 
          className="item content-1 droptarget"
          onDrop={this.drop_handler}
          onDragOver={this.dragover_handler}
          >
    </div>
    
  }
}

export default DragDropContext(HTML5Backend)(Droptarget)