import React from 'react'
import './modal.min.css'

const Modal = props => {
  const { handleClose, handleAdd, show, children } = props

  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button className='modal-btn btn-add' onClick={handleAdd}>
          Add
        </button>
        <button className='modal-btn btn-close' onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  )
}

export default Modal
