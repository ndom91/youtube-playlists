import Droptarget from '@/components/droptarget'

export default function Dropzone({ visible, addVideoOnDrop, closeDropzone }) {
  return (
    <div
      className="absolute top-0 left-0 h-full w-full pointer-events-none flex justify-center items-center"
      style={{
        backgroundColor: visible ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0)',
        visibility: visible ? 'visible' : 'hidden',
      }}
      id="dropzone"
    >
      <Droptarget
        visible={visible}
        closeDropzone={closeDropzone}
        addVideoOnDrop={addVideoOnDrop}
      />
    </div>
  )
}
