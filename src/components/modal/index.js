import React from 'react'
import * as S from './styled'

const Modal = (props) => {
  const { handleClose, handleAdd, show, children } = props

  const showHideClassName = show ? 'display-block' : 'display-none'

  return (
    <S.Modal className={showHideClassName}>
      <section>
        {children}
        <S.ModalBtn className="btn-add" onClick={handleAdd}>
          Add
        </S.ModalBtn>
        <S.ModalBtn className="btn-close" onClick={handleClose}>
          Close
        </S.ModalBtn>
      </section>
    </S.Modal>
  )
}

export default Modal
