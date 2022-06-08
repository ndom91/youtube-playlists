import Image from 'next/image'

export default function Header() {
  return (
    <div className="bg-purple-300 rounded-md text-5xl text-white flex justify-around">
      <Image
        priority
        src="/header.png"
        alt="logo"
        width="500px"
        height="150px"
      />
    </div>
  )
}
