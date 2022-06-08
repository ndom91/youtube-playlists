import Image from 'next/image'

export default function Header() {
  return (
    <div className="flex w-full justify-around rounded-md bg-purple-300 text-5xl text-white">
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
