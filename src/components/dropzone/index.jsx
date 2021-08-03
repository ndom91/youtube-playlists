import Droptarget from '@/components/droptarget'
import * as S from './styled'

const Dropzone = ({ visible, addVideoOnDrop, closeDropzone }) => {
  return (
    <S.DroptargetWrapper
      style={{
        backgroundColor: visible ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0)',
        visibility: visible ? 'visible' : 'hidden',
      }}
      id="dropzone"
      className="fullDroptarget"
    >
      <Droptarget
        visible={visible}
        closeDropzone={closeDropzone}
        addVideoOnDrop={addVideoOnDrop}
      />
    </S.DroptargetWrapper>
  )
}

export default Dropzone
