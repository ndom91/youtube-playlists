import Image from 'next/image'

export default function Header() {
  return (
    <div className="flex w-full justify-around rounded-md border-[6px] border-orange-100 bg-orange-50 text-5xl text-white">
      <Image
        priority
        src="/header.png"
        alt="logo"
        width="448px"
        height="177px"
      />
    </div>
  )
}
