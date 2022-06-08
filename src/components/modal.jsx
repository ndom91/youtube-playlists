export default function Modal({ handleClose, handleAdd, show, children }) {
  return (
    <div className="z-[200]">
      <div
        className={`${
          show ? 'block' : 'hidden'
        } absolute top-1/2 left-1/2 z-[200] translate-y-1/2 -translate-x-1/2 rounded-lg border-8 border-white bg-[linear-gradient(to_top,_#d299c2_0%,_#fef9d7_100%)]   shadow-md transition`}
      >
        {children}
        <section className="absolute bottom-4 right-20 flex space-x-8">
          <button
            className="rounded-xl bg-purple-400 px-3 py-2 font-semibold text-white shadow-md ring-2 ring-purple-500  transition hover:bg-purple-600 hover:shadow-lg hover:ring-purple-800"
            onClick={handleAdd}
          >
            Add
          </button>
          <button
            className="rounded-xl bg-purple-400 px-3 py-2  font-semibold text-white shadow-md ring-2 ring-purple-500 transition hover:bg-purple-600  hover:shadow-lg hover:ring-purple-800"
            onClick={handleClose}
          >
            Close
          </button>
        </section>
      </div>
      <div className="fixed top-0 left-0 h-full w-full bg-black opacity-60" />
    </div>
  )
}
