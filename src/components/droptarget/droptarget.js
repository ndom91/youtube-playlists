import React from 'react' 
import './droptarget.css'

// http://react-dnd.github.io/react-dnd/docs/api/drop-target

class Droptarget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videoList: [],
      listCount: 0
    }
  }

  dragover_handler = (ev) => {
    ev.preventDefault();
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = "link"
  }

  drop_handler = (ev) => {
    ev.preventDefault();
    ev.persist()
    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text/plain");
    // console.log(data)
    if(!data.includes('youtube')) {
      alert('Must be a YouTube Link!')
      return
    }

    let list = [...this.state.videoList, data]

    this.setState({ 
      videoList: list,
      listCount: this.state.listCount + 1
    })

    this.props.callbackFromParent(list)
    
    // ev.target.appendChild(document.getElementById(data));
  }

  render() { 
    return <div 
          id="dropTarget" 
          className="item content-1 droptarget"
          onDrop={this.drop_handler}
          onDragOver={this.dragover_handler}
          >
            Drop Video URL Here
          </div>
    
  }
}

export default Droptarget