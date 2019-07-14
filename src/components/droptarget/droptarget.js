import React from 'react'
import './droptarget.min.css'
import { toast } from 'react-toastify'

class Droptarget extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      videoList: [],
      listCount: 0
    }
  }

  dragoverHandler = (ev) => {
    ev.preventDefault()
    const el = document.getElementById('dropTarget')
    el.style.visibility = 'visible'
    ev.dataTransfer.dropEffect = 'link'
  }

  dropHandler = (ev) => {
    ev.preventDefault()
    ev.persist()
    var data = ev.dataTransfer.getData('text/plain')
    if (!data.includes('youtube')) {
      toast.warn('Must be a YouTube Link!')
      const el = document.getElementById('dropTarget')
      el.style.visibility = 'hidden'
      return
    }

    const list = [...this.state.videoList, data]

    this.setState({
      videoList: list,
      listCount: this.state.listCount + 1
    })

    this.props.callbackFromParent(list)

    const el = document.getElementById('dropTarget')
    el.style.visibility = 'hidden'
  }

  render () {
    return <div
      id='dropTarget'
      className='fullDroptarget'
      onDrop={this.dropHandler}
      onDragOver={this.dragoverHandler}
    >
      Drop YouTube Video Here
    </div>
  }
}

export default Droptarget
