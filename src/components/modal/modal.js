import React from 'react'
import './modal.min.css'

class Modal extends React.Component {
  render() {
    const { handleClose, handleAdd, show, children } = this.props

    const showHideClassName = show
      ? 'modal display-block'
      : 'modal display-none'

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button className="btn-add" onClick={handleAdd}>
            Add
          </button>
          <button className="btn-close" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    )
  }
}

export default Modal
