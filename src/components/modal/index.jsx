import React from 'react'

const Modal = (props) => {
  const { handleClose, handleAdd, show, children } = props

  return (
    <div
      className={`${
        show ? 'block' : 'hidden'
      } z-[200] transition rounded-lg border-8 border-white absolute top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2   bg-[linear-gradient(to_top,_#d299c2_0%,_#fef9d7_100%)] shadow-md`}
    >
      {children}
      <section className="absolute bottom-4 right-20 flex space-x-8">
        <button
          className="px-3 py-2 text-white font-semibold transition hover:bg-purple-600 bg-purple-400 shadow-md rounded-xl  ring-2 ring-purple-500 hover:ring-purple-800 hover:shadow-lg"
          onClick={handleAdd}
        >
          Add
        </button>
        <button
          className="px-3 py-2 text-white font-semibold  hover:bg-purple-600 transition bg-purple-400 shadow-md rounded-xl ring-2 ring-purple-500  hover:ring-purple-800 hover:shadow-lg"
          onClick={handleClose}
        >
          Close
        </button>
      </section>
    </div>
  )
}

export default Modal
