import Droptarget from '@/components/droptarget'

export default function Dropzone({ visible, addVideoOnDrop, closeDropzone }) {
  return (
    <div
      className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center"
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
