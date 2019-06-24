import React from 'react' 
import './droptarget.css'

class Droptarget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videoList: [],
      listCount: 0
    }
  }

  dragover_handler = (ev) => {
    ev.preventDefault()
    const el = document.getElementById('dropTarget')
    el.style.visibility = 'visible'
    ev.dataTransfer.dropEffect = "link"
  }

  drop_handler = (ev) => {
    ev.preventDefault()
    ev.persist()
    var data = ev.dataTransfer.getData("text/plain")
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
    
    const el = document.getElementById('dropTarget')
    el.style.visibility = 'hidden'
  }

  render() { 
    return <div 
          id="dropTarget" 
          className="fullDroptarget"
          onDrop={this.drop_handler}
          onDragOver={this.dragover_handler}
          >
            Drop YouTube Video Here
          </div>
  }
}

export default Droptarget